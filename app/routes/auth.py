from flask import Blueprint, current_app, request, jsonify
from app.logging_config import log_event
from app.services import auth_service
from app.services.user_validation_service import validate_user_fields

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'กรุณากรอก Username และ Password'}), 400

    user, login_error = auth_service.authenticate(data['username'], data['password'], request.remote_addr)

    if user is None:
        current_app.logger.warning(
            'Login failed username=%s reason=%s remote_addr=%s',
            data.get('username'),
            login_error,
            request.remote_addr,
        )
        log_event(
            'login_failed',
            username=data.get('username'),
            reason=login_error,
            remote_addr=request.remote_addr,
        )
        messages = {
            'inactive': 'บัญชีนี้ถูกปิดการใช้งาน กรุณาติดต่อผู้ดูแลระบบ',
            'locked': 'บัญชีถูกล็อกชั่วคราวจากการเข้าสู่ระบบไม่สำเร็จหลายครั้ง',
        }
        return jsonify({'error': messages.get(login_error, 'Username หรือ Password ไม่ถูกต้อง')}), 401

    token = auth_service.create_session(user['id'])
    login_state = auth_service.build_login_state(user)
    current_app.logger.info(
        'Login succeeded user_id=%s username=%s role=%s remote_addr=%s',
        user['id'],
        user['username'],
        user['role'],
        request.remote_addr,
    )
    log_event(
        'login_succeeded',
        user={
            'authenticated': True,
            'user_id': user['id'],
            'username': user['username'],
            'role': user['role'],
        },
        remote_addr=request.remote_addr,
    )
    auth_service.log_auth_event('login_succeeded', user=user, remote_addr=request.remote_addr)

    response = jsonify({
        'token': token,
        'user': {
            'id': user['id'],
            'username': user['username'],
            'display_name': user['display_name'],
            'role': user['role'],
        },
        **login_state,
    })
    response.set_cookie(
        current_app.config['AUTH_COOKIE_NAME'],
        token,
        max_age=current_app.config['TOKEN_EXPIRE_HOURS'] * 3600,
        httponly=current_app.config.get('AUTH_COOKIE_HTTPONLY', True),
        secure=current_app.config.get('AUTH_COOKIE_SECURE', False),
        samesite=current_app.config.get('AUTH_COOKIE_SAMESITE', 'Strict'),
        path='/',
    )
    return response, 200


@bp.route('/change-password', methods=['POST'])
def change_password():
    token = request.cookies.get(current_app.config['AUTH_COOKIE_NAME']) or request.headers.get('Authorization', '').replace('Bearer ', '')
    user = auth_service.get_user_by_token(token)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json() or {}
    current_password = data.get('current_password') or ''
    new_password = data.get('new_password') or ''
    confirm_password = data.get('confirm_password') or ''

    if new_password != confirm_password:
        return jsonify({'error': 'รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน'}), 400

    ok, errors = auth_service.change_password(user['id'], current_password, new_password)
    if not ok:
        return jsonify({'error': errors[0] if errors else 'ไม่สามารถเปลี่ยนรหัสผ่านได้', 'errors': errors}), 400

    refreshed = auth_service.get_user_by_token(token)
    return jsonify({
        'message': 'Password changed',
        'redirect_to': auth_service.get_login_redirect(refreshed),
    }), 200


@bp.route('/setup-superadmin', methods=['POST'])
def setup_superadmin():
    if auth_service.users_exist():
        return jsonify({'error': 'Initial setup has already been completed.'}), 403

    data = request.get_json() or {}
    normalized, validation_errors = validate_user_fields({**data, 'role': 'superadmin'}, require_role=False)
    if validation_errors:
        return jsonify({'error': validation_errors[0], 'errors': validation_errors}), 400

    password = data.get('password') or ''
    confirm_password = data.get('confirm_password') or ''
    if password != confirm_password:
        return jsonify({'error': 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน'}), 400

    try:
        user_id = auth_service.create_user(
            username=normalized.get('username'),
            password=password,
            role='superadmin',
            first_name=normalized.get('first_name', ''),
            last_name=normalized.get('last_name', ''),
            employee_id=normalized.get('employee_id', ''),
            email=normalized.get('email', ''),
            created_by=None,
            must_change_password=False,
        )
        auth_service.log_auth_event(
            'superadmin_setup_completed',
            user={'id': user_id, 'username': normalized.get('username')},
            remote_addr=request.remote_addr,
        )
        return jsonify({'message': 'Superadmin created'}), 201
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400


@bp.route('/logout', methods=['POST'])
def logout():
    token = request.cookies.get(current_app.config['AUTH_COOKIE_NAME']) or request.headers.get('Authorization', '').replace('Bearer ', '')
    if token:
        auth_service.delete_session(token)
        current_app.logger.info('Logout requested remote_addr=%s', request.remote_addr)
        log_event('logout_requested', remote_addr=request.remote_addr)
    response = jsonify({'message': 'Logged out'})
    response.delete_cookie(
        current_app.config['AUTH_COOKIE_NAME'],
        path='/',
        samesite=current_app.config.get('AUTH_COOKIE_SAMESITE', 'Strict'),
    )
    return response, 200
