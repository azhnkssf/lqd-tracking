import secrets
import hashlib
from datetime import datetime, timedelta
from functools import wraps
from app.database import get_db
from flask import current_app, request, redirect, session


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


def verify_login(username, password):
    db = get_db()
    user = db.execute(
        'SELECT * FROM users WHERE username = ?', (username,)
    ).fetchone()

    if user is None:
        return None

    if user['password_hash'] != hash_password(password):
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
        SELECT u.id, u.username, u.display_name, u.role
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ? AND s.expires_at > CURRENT_TIMESTAMP
    ''', (token,)).fetchone()

    return row


def delete_session(token):
    db = get_db()
    db.execute('DELETE FROM sessions WHERE token = ?', (token,))
    db.commit()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('token')

        if not token:
            return redirect('/login')

        user = get_user_by_token(token)

        if user is None:
            return redirect('/login')

        return f(*args, **kwargs)
    return decorated_function


def role_required(*roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.cookies.get('token')

            if not token:
                return redirect('/login')

            user = get_user_by_token(token)

            if user is None:
                return redirect('/login')

            if user['role'] not in roles:
                return redirect('/unauthorized')

            return f(*args, **kwargs)
        return decorated_function
    return decorator