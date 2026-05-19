import re
import secrets
import string
from datetime import datetime, timedelta
from app.database import get_db
from werkzeug.security import check_password_hash


SPECIAL_CHARS = "!@#$%^&*_-+="

DEFAULT_POLICY = {
    'min_password_length': 12,
    'required_character_groups': 3,
    'password_history_count': 1,
    'user_max_age_days': 75,
    'admin_max_age_days': 30,
    'superadmin_max_age_days': 30,
    'temporary_password_length': 12,
    'lockout_failed_attempts': 6,
    'lockout_window_minutes': 30,
    'lockout_duration_minutes': 30,
    'expiry_warning_days': '7,5,3,2,1',
    'forbid_user_identifiers': 1,
    'forbid_name_identifiers': 1,
    'forbid_numeric_sequences': 1,
}

POLICY_LIMITS = {
    'min_password_length': {'min': 8, 'max': 128},
    'required_character_groups': {'min': 3, 'max': 4},
    'password_history_count': {'min': 1, 'max': 12},
    'user_max_age_days': {'min': 1, 'max': 75},
    'admin_max_age_days': {'min': 1, 'max': 30},
    'superadmin_max_age_days': {'min': 1, 'max': 30},
    'temporary_password_length': {'min': 12, 'max': 64},
    'lockout_failed_attempts': {'min': 1, 'max': 6},
    'lockout_window_minutes': {'min': 1, 'max': 30},
    'lockout_duration_minutes': {'min': 30, 'max': 1440},
    'forbid_user_identifiers': {'min': 0, 'max': 1},
    'forbid_name_identifiers': {'min': 0, 'max': 1},
    'forbid_numeric_sequences': {'min': 0, 'max': 1},
}


def _coerce_int(value, default):
    try:
        return int(value)
    except (TypeError, ValueError):
        return int(default)


def _normalize_warning_days(value):
    if isinstance(value, list):
        raw_days = value
    else:
        raw_days = str(value or '').split(',')
    days = sorted({int(day) for day in raw_days if str(day).strip().isdigit() and 1 <= int(day) <= 30}, reverse=True)
    return ','.join(str(day) for day in days) or DEFAULT_POLICY['expiry_warning_days']


def _seed_policy_defaults(db):
    for key, value in DEFAULT_POLICY.items():
        db.execute(
            'INSERT OR IGNORE INTO password_policy_settings (key, value) VALUES (?, ?)',
            (key, str(value))
        )


def get_policy():
    db = get_db()
    _seed_policy_defaults(db)
    rows = db.execute('SELECT key, value FROM password_policy_settings').fetchall()
    raw = {row['key']: row['value'] for row in rows}
    policy = {}
    for key, default in DEFAULT_POLICY.items():
        if key == 'expiry_warning_days':
            policy[key] = _normalize_warning_days(raw.get(key, default))
        else:
            policy[key] = _coerce_int(raw.get(key, default), default)
    return policy


def update_policy_settings(data, updated_by=None):
    current = get_policy()
    updates = {}
    errors = []

    for key, value in (data or {}).items():
        if key not in DEFAULT_POLICY:
            continue
        if key == 'expiry_warning_days':
            updates[key] = _normalize_warning_days(value)
            continue

        numeric = _coerce_int(value, current.get(key, DEFAULT_POLICY[key]))
        limits = POLICY_LIMITS.get(key)
        if limits and (numeric < limits['min'] or numeric > limits['max']):
            errors.append(f'{key} must be between {limits["min"]} and {limits["max"]}.')
            continue
        updates[key] = numeric

    if errors:
        return False, errors, current

    db = get_db()
    now = datetime.now()
    for key, value in updates.items():
        db.execute(
            '''
            INSERT INTO password_policy_settings (key, value, updated_by, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(key) DO UPDATE SET
                value = excluded.value,
                updated_by = excluded.updated_by,
                updated_at = excluded.updated_at
            ''',
            (key, str(value), updated_by, now)
        )
    db.commit()
    return True, [], get_policy()


def password_max_age_days(role):
    policy = get_policy()
    role = (role or 'user').lower()
    if role == 'superadmin':
        return int(policy['superadmin_max_age_days'])
    if role == 'admin':
        return int(policy['admin_max_age_days'])
    return int(policy['user_max_age_days'])


def password_expiry_for_role(role, from_time=None):
    base = from_time or datetime.now()
    return base + timedelta(days=password_max_age_days(role))


def password_warning_days(expires_at):
    if not expires_at:
        return None
    if isinstance(expires_at, str):
        try:
            expires_at = datetime.fromisoformat(expires_at.replace('Z', '+00:00')).replace(tzinfo=None)
        except ValueError:
            return None
    warning_days = [int(day) for day in get_policy()['expiry_warning_days'].split(',') if day]
    remaining = (expires_at.date() - datetime.now().date()).days
    return remaining if remaining in warning_days else None


def is_password_expired(expires_at):
    if not expires_at:
        return False
    if isinstance(expires_at, str):
        try:
            expires_at = datetime.fromisoformat(expires_at.replace('Z', '+00:00')).replace(tzinfo=None)
        except ValueError:
            return False
    return datetime.now() >= expires_at


def validate_password(password, user_context=None, allow_temporary=False):
    user_context = user_context or {}
    policy = get_policy()
    errors = []
    min_length = int(policy['min_password_length'])

    if not password:
        return ['Password is required.']

    if len(password) < min_length:
        errors.append(f'Password must be at least {min_length} characters.')

    groups = [
        bool(re.search(r'[A-Z]', password)),
        bool(re.search(r'[a-z]', password)),
        bool(re.search(r'[0-9]', password)),
        any(ch in SPECIAL_CHARS for ch in password),
    ]
    required_groups = int(policy['required_character_groups'])
    if sum(groups) < required_groups:
        errors.append(f'Password must include at least {required_groups} of uppercase, lowercase, number, and special character.')

    lowered = password.lower()
    identifiers = []
    if int(policy['forbid_user_identifiers']):
        for key in ('username', 'employee_id', 'email'):
            value = str(user_context.get(key) or '').strip().lower()
            local_part = value.split('@', 1)[0] if key == 'email' else value
            if local_part:
                identifiers.append((key.replace('_', ' '), local_part))

    if int(policy['forbid_name_identifiers']):
        for key in ('first_name', 'last_name'):
            value = str(user_context.get(key) or '').strip().lower()
            if value:
                identifiers.append((key.replace('_', ' '), value))
        display_name = str(user_context.get('display_name') or '').strip().lower()
        for token in re.split(r'\s+', display_name):
            if token:
                identifiers.append(('display name', token))

    for label, value in identifiers:
        if len(value) >= 3 and value in lowered:
            errors.append(f'Password must not contain {label}.')
            break

    if int(policy['forbid_numeric_sequences']):
        digit_groups = ''.join(ch if ch.isdigit() else ' ' for ch in password).split()
        for group in digit_groups:
            if len(group) < 4:
                continue
            for start in range(0, len(group) - 3):
                chunk = group[start:start + 4]
                ascending = all(int(chunk[i + 1]) - int(chunk[i]) == 1 for i in range(3))
                descending = all(int(chunk[i]) - int(chunk[i + 1]) == 1 for i in range(3))
                if ascending or descending:
                    errors.append('Password must not contain obvious numeric sequences such as 1234 or 4321.')
                    break
            if any('numeric sequences' in error for error in errors):
                break

    if not allow_temporary and password == 'P@ssw0rd01':
        errors.append('Temporary password cannot be used as a permanent password.')

    return errors


def check_password_reuse(db, user_id, new_password, history_limit=None):
    limit = int(history_limit or get_policy()['password_history_count'])
    rows = db.execute(
        '''
        SELECT password_hash
        FROM password_history
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT ?
        ''',
        (user_id, limit)
    ).fetchall()
    return any(check_password_hash(row['password_hash'], new_password) for row in rows)


def generate_temporary_password(length=None):
    policy = get_policy()
    length = max(int(length or policy['temporary_password_length']), 12)
    alphabet = string.ascii_letters + string.digits + SPECIAL_CHARS
    while True:
        password = ''.join(secrets.choice(alphabet) for _ in range(length))
        if not validate_password(password, allow_temporary=True):
            return password
