from flask import Blueprint, current_app, jsonify, request
from app.services import auth_service
from app.services.password_policy_service import get_policy, update_policy_settings
from app.services.user_validation_service import validate_user_fields

bp = Blueprint('users', __name__, url_prefix='/api/users')


def _current_user():
    token = request.cookies.get(current_app.config.get('AUTH_COOKIE_NAME', 'token')) or request.headers.get('Authorization', '').replace('Bearer ', '')
    return auth_service.get_user_by_token(token)


def _require_superadmin():
    user = _current_user()
    if not user:
        return None, (jsonify({'error': 'Unauthorized'}), 401)
    if user['role'] != 'superadmin':
        return None, (jsonify({'error': 'Forbidden'}), 403)
    if auth_service.get_login_redirect(user) == '/change-password':
        return None, (jsonify({'error': 'Password change required', 'redirect_to': '/change-password'}), 403)
    return user, None


@bp.route('', methods=['GET'])
def list_users():
    _, error = _require_superadmin()
    if error:
        return error
    return jsonify({'users': auth_service.list_users()}), 200


@bp.route('/password-policy', methods=['GET'])
def get_password_policy():
    _, error = _require_superadmin()
    if error:
        return error
    return jsonify({'policy': get_policy()}), 200


@bp.route('/password-policy', methods=['PUT'])
def update_password_policy():
    current_user, error = _require_superadmin()
    if error:
        return error
    ok, errors, policy = update_policy_settings(request.get_json() or {}, updated_by=current_user['id'])
    if not ok:
        return jsonify({'error': errors[0], 'errors': errors, 'policy': policy}), 400
    auth_service.log_auth_event('password_policy_updated', user=current_user, remote_addr=request.remote_addr)
    return jsonify({'message': 'Password policy updated', 'policy': policy}), 200


@bp.route('', methods=['POST'])
def create_user():
    current_user, error = _require_superadmin()
    if error:
        return error
    data = request.get_json() or {}
    normalized, validation_errors = validate_user_fields(data, require_role=True)
    if validation_errors:
        return jsonify({'error': validation_errors[0], 'errors': validation_errors}), 400
    try:
        user_id, temporary_password = auth_service.create_user_with_temporary_password(normalized, created_by=current_user['id'])
        return jsonify({
            'message': 'User created',
            'user_id': user_id,
            'temporary_password': temporary_password,
        }), 201
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    except Exception:
        current_app.logger.exception('Failed to create user username=%s', data.get('username'))
        return jsonify({'error': 'ไม่สามารถสร้างผู้ใช้ได้ กรุณาตรวจสอบข้อมูลซ้ำ'}), 400


@bp.route('/<int:user_id>/status', methods=['PATCH'])
def update_status(user_id):
    current_user, error = _require_superadmin()
    if error:
        return error
    if current_user['id'] == user_id:
        return jsonify({'error': 'ไม่สามารถปิดบัญชีของตัวเองได้'}), 400
    data = request.get_json() or {}
    auth_service.set_user_active(user_id, bool(data.get('is_active')))
    return jsonify({'message': 'User status updated'}), 200


@bp.route('/<int:user_id>/unlock', methods=['POST'])
def unlock_user(user_id):
    _, error = _require_superadmin()
    if error:
        return error
    auth_service.unlock_user(user_id)
    return jsonify({'message': 'User unlocked'}), 200


@bp.route('/<int:user_id>/reset-password', methods=['POST'])
def reset_password(user_id):
    current_user, error = _require_superadmin()
    if error:
        return error
    if current_user['id'] == user_id:
        return jsonify({'error': 'กรุณาใช้หน้า Change Password สำหรับบัญชีตัวเอง'}), 400
    try:
        temporary_password = auth_service.reset_user_password(user_id)
        return jsonify({
            'message': 'Password reset',
            'temporary_password': temporary_password,
        }), 200
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 404
