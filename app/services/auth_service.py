import secrets
import hashlib
from datetime import datetime, timedelta
from functools import wraps
from app.database import get_db
from flask import current_app, request, redirect
from app.services.password_policy_service import (
    check_password_reuse,
    generate_temporary_password,
    get_policy,
    is_password_expired,
    password_expiry_for_role,
    password_warning_days,
    validate_password,
)
from app.services.user_validation_service import validate_user_fields
from werkzeug.security import check_password_hash, generate_password_hash


VALID_ROLES = {'user', 'admin', 'superadmin'}


def hash_password(password):
    return generate_password_hash(password)


def _legacy_hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


def _is_legacy_hash(password_hash):
    return len(password_hash or '') == 64 and all(ch in '0123456789abcdef' for ch in password_hash.lower())


def _verify_password(user, password):
    password_hash = user['password_hash']
    if _is_legacy_hash(password_hash):
        if password_hash != _legacy_hash_password(password):
            return False

        db = get_db()
        db.execute(
            'UPDATE users SET password_hash = ? WHERE id = ?',
            (hash_password(password), user['id'])
        )
        db.commit()
        current_app.logger.info('Upgraded legacy password hash user_id=%s username=%s', user['id'], user['username'])
        return True

    return check_password_hash(password_hash, password)


def _parse_datetime(value):
    if not value:
        return None
    if isinstance(value, datetime):
        return value
    try:
        return datetime.fromisoformat(str(value).replace('Z', '+00:00')).replace(tzinfo=None)
    except ValueError:
        return None


def log_auth_event(event_type, user=None, username=None, remote_addr=None, details=None):
    try:
        db = get_db()
        db.execute(
            '''
            INSERT INTO auth_events (user_id, username, event_type, remote_addr, details)
            VALUES (?, ?, ?, ?, ?)
            ''',
            (
                user['id'] if user else None,
                username or (user['username'] if user else None),
                event_type,
                remote_addr,
                details,
            )
        )
        db.commit()
    except Exception:
        current_app.logger.exception('Failed to write auth event type=%s username=%s', event_type, username)


def users_exist():
    db = get_db()
    row = db.execute('SELECT COUNT(*) AS count FROM users').fetchone()
    return bool(row and row['count'])


def get_user_by_username(username):
    db = get_db()
    return db.execute(
        'SELECT * FROM users WHERE lower(username) = lower(?)', ((username or '').strip(),)
    ).fetchone()


def _is_locked(user):
    locked_until = _parse_datetime(user['locked_until'] if 'locked_until' in user.keys() else None)
    return locked_until and locked_until > datetime.now()


def _register_failed_login(user):
    db = get_db()
    now = datetime.now()
    policy = get_policy()
    window_minutes = int(policy['lockout_window_minutes'])
    max_attempts = int(policy['lockout_failed_attempts'])
    lockout_minutes = int(policy['lockout_duration_minutes'])
    window_started = _parse_datetime(user['failed_login_window_started_at'] if 'failed_login_window_started_at' in user.keys() else None)
    count = int(user['failed_login_count'] or 0)

    if not window_started or now - window_started > timedelta(minutes=window_minutes):
        window_started = now
        count = 1
    else:
        count += 1

    locked_until = None
    if count >= max_attempts:
        locked_until = now + timedelta(minutes=lockout_minutes)

    db.execute(
        '''
        UPDATE users
        SET failed_login_count = ?,
            failed_login_window_started_at = ?,
            locked_until = ?,
            updated_at = ?
        WHERE id = ?
        ''',
        (count, window_started, locked_until, now, user['id'])
    )
    db.commit()
    return locked_until


def _reset_failed_login(user_id):
    db = get_db()
    db.execute(
        '''
        UPDATE users
        SET failed_login_count = 0,
            failed_login_window_started_at = NULL,
            locked_until = NULL,
            updated_at = ?
        WHERE id = ?
        ''',
        (datetime.now(), user_id)
    )
    db.commit()


def authenticate(username, password, remote_addr=None):
    user = get_user_by_username(username)

    if user is None:
        return None, 'invalid_credentials'

    if not int(user['is_active'] if 'is_active' in user.keys() and user['is_active'] is not None else 1):
        log_auth_event('login_inactive_blocked', user=user, remote_addr=remote_addr)
        return None, 'inactive'

    if _is_locked(user):
        log_auth_event('login_locked_blocked', user=user, remote_addr=remote_addr)
        return None, 'locked'

    if not _verify_password(user, password):
        locked_until = _register_failed_login(user)
        log_auth_event('login_failed', user=user, remote_addr=remote_addr)
        if locked_until:
            log_auth_event('account_locked', user=user, remote_addr=remote_addr)
            return None, 'locked'
        return None, 'invalid_credentials'

    _reset_failed_login(user['id'])
    user = get_user_by_username(username)
    return user, None


def verify_login(username, password):
    user, error = authenticate(username, password)
    if error:
        return None

    return user


def create_session(user_id):
    token = secrets.token_hex(32)
    expires_at = datetime.now() + timedelta(hours=current_app.config['TOKEN_EXPIRE_HOURS'])

    db = get_db()
    db.execute(
        'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)',
        (token, user_id, expires_at)
    )
    db.commit()

    return token


def get_user_by_token(token):
    db = get_db()
    row = db.execute('''
        SELECT u.id, u.username, u.display_name, u.role,
               u.first_name, u.last_name, u.employee_id, u.email,
               u.is_active, u.must_change_password,
               u.password_changed_at, u.password_expires_at,
               u.locked_until
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP AND COALESCE(u.is_active, 1) = 1
    ''', (token,)).fetchone()

    return row


def get_login_redirect(user):
    if int(user['must_change_password'] or 0) or is_password_expired(user['password_expires_at']):
        return '/change-password'
    if user['role'] == 'superadmin':
        return '/users'
    return '/customer-list'


def build_login_state(user):
    expired = is_password_expired(user['password_expires_at'])
    must_change = bool(int(user['must_change_password'] or 0) or expired)
    return {
        'must_change_password': must_change,
        'password_expired': expired,
        'password_warning_days': None if must_change else password_warning_days(user['password_expires_at']),
        'redirect_to': get_login_redirect(user),
    }


def delete_session(token):
    db = get_db()
    db.execute('DELETE FROM sessions WHERE token = ?', (token,))
    db.commit()


def create_user(username, password, role='user', first_name='', last_name='', employee_id='', email='', created_by=None, must_change_password=True):
    validated, field_errors = validate_user_fields(
        {
            'username': username,
            'role': role,
            'first_name': first_name,
            'last_name': last_name,
            'employee_id': employee_id,
            'email': email,
        },
        require_role=False,
    )
    if field_errors:
        raise ValueError(' '.join(field_errors))

    role = (validated['role'] or 'user').strip().lower()
    if role not in VALID_ROLES:
        raise ValueError('Invalid role.')

    username = validated['username']
    employee_id = validated['employee_id']
    email = validated['email']
    first_name = validated['first_name']
    last_name = validated['last_name']
    display_name = ' '.join(part for part in [first_name, last_name] if part).strip() or username

    errors = validate_password(
        password,
        {
            'username': username,
            'employee_id': employee_id,
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'display_name': display_name,
        },
        allow_temporary=must_change_password,
    )
    if errors:
        raise ValueError(' '.join(errors))

    now = datetime.now()
    expires_at = now if must_change_password else password_expiry_for_role(role, now)
    db = get_db()
    cur = db.execute(
        '''
        INSERT INTO users (
            username, password_hash, display_name, role,
            first_name, last_name, employee_id, email,
            is_active, must_change_password,
            password_changed_at, password_expires_at,
            created_by, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?)
        ''',
        (
            username,
            hash_password(password),
            display_name,
            role,
            first_name,
            last_name,
            employee_id,
            email,
            1 if must_change_password else 0,
            now,
            expires_at,
            created_by,
            now,
        )
    )
    user_id = cur.lastrowid
    db.execute(
        'INSERT INTO password_history (user_id, password_hash) VALUES (?, ?)',
        (user_id, hash_password(password))
    )
    db.commit()
    log_auth_event('user_created', user={'id': user_id, 'username': username}, details=f'role={role}')
    return user_id


def create_user_with_temporary_password(user_data, created_by=None):
    temp_password = generate_temporary_password()
    user_id = create_user(
        username=user_data.get('username'),
        password=temp_password,
        role=user_data.get('role', 'user'),
        first_name=user_data.get('first_name', ''),
        last_name=user_data.get('last_name', ''),
        employee_id=user_data.get('employee_id', ''),
        email=user_data.get('email', ''),
        created_by=created_by,
        must_change_password=True,
    )
    return user_id, temp_password


def change_password(user_id, current_password, new_password):
    db = get_db()
    user = db.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    if not user:
        return False, ['User not found.']
    if not _verify_password(user, current_password):
        return False, ['Current password is not correct.']

    errors = validate_password(
        new_password,
        {
            'username': user['username'],
            'employee_id': user['employee_id'],
            'email': user['email'],
            'first_name': user['first_name'],
            'last_name': user['last_name'],
            'display_name': user['display_name'],
        },
        allow_temporary=False,
    )
    if check_password_hash(user['password_hash'], new_password) or check_password_reuse(db, user_id, new_password):
        errors.append('New password must be different from the previous password.')
    if errors:
        return False, errors

    now = datetime.now()
    new_hash = hash_password(new_password)
    db.execute(
        '''
        UPDATE users
        SET password_hash = ?,
            must_change_password = 0,
            password_changed_at = ?,
            password_expires_at = ?,
            updated_at = ?
        WHERE id = ?
        ''',
        (new_hash, now, password_expiry_for_role(user['role'], now), now, user_id)
    )
    db.execute('INSERT INTO password_history (user_id, password_hash) VALUES (?, ?)', (user_id, new_hash))
    db.commit()
    log_auth_event('password_changed', user=user)
    return True, []


def list_users():
    db = get_db()
    rows = db.execute(
        '''
        SELECT id, username, display_name, role, first_name, last_name, employee_id, email,
               is_active, must_change_password, password_changed_at, password_expires_at,
               failed_login_count, locked_until, created_at, updated_at
        FROM users
        ORDER BY role = 'superadmin' DESC, username ASC
        '''
    ).fetchall()
    return [dict(row) for row in rows]


def set_user_active(user_id, is_active):
    db = get_db()
    db.execute('UPDATE users SET is_active = ?, updated_at = ? WHERE id = ?', (1 if is_active else 0, datetime.now(), user_id))
    db.commit()
    log_auth_event('user_enabled' if is_active else 'user_disabled', user={'id': user_id, 'username': None})


def unlock_user(user_id):
    db = get_db()
    db.execute(
        '''
        UPDATE users
        SET failed_login_count = 0,
            failed_login_window_started_at = NULL,
            locked_until = NULL,
            updated_at = ?
        WHERE id = ?
        ''',
        (datetime.now(), user_id)
    )
    db.commit()
    log_auth_event('account_unlocked', user={'id': user_id, 'username': None})


def reset_user_password(user_id):
    db = get_db()
    user = db.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
    if not user:
        raise ValueError('User not found.')
    temp_password = generate_temporary_password()
    now = datetime.now()
    password_hash = hash_password(temp_password)
    db.execute(
        '''
        UPDATE users
        SET password_hash = ?,
            must_change_password = 1,
            password_changed_at = ?,
            password_expires_at = ?,
            failed_login_count = 0,
            failed_login_window_started_at = NULL,
            locked_until = NULL,
            updated_at = ?
        WHERE id = ?
        ''',
        (password_hash, now, now, now, user_id)
    )
    db.execute('INSERT INTO password_history (user_id, password_hash) VALUES (?, ?)', (user_id, password_hash))
    db.commit()
    log_auth_event('password_reset', user=user)
    return temp_password


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get(current_app.config.get('AUTH_COOKIE_NAME', 'token'))

        if not token:
            return redirect('/login')

        user = get_user_by_token(token)

        if user is None:
            return redirect('/login')

        if request.path != '/change-password' and get_login_redirect(user) == '/change-password':
            return redirect('/change-password')

        return f(*args, **kwargs)
    return decorated_function


def role_required(*roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.cookies.get(current_app.config.get('AUTH_COOKIE_NAME', 'token'))

            if not token:
                return redirect('/login')

            user = get_user_by_token(token)

            if user is None:
                return redirect('/login')

            if request.path != '/change-password' and get_login_redirect(user) == '/change-password':
                return redirect('/change-password')

            if user['role'] not in roles:
                return redirect('/unauthorized')

            return f(*args, **kwargs)
        return decorated_function
    return decorator
