from flask import Blueprint, request, jsonify
from app.services import auth_service

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'กรุณากรอก Username และ Password'}), 400

    user = auth_service.verify_login(data['username'], data['password'])

    if user is None:
        return jsonify({'error': 'Username หรือ Password ไม่ถูกต้อง'}), 401

    token = auth_service.create_session(user['id'])

    return jsonify({
        'token': token,
        'user': {
            'id':           user['id'],
            'username':     user['username'],
            'display_name': user['display_name'],
            'role':         user['role']
        }
    }), 200


@bp.route('/logout', methods=['POST'])
def logout():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if token:
        auth_service.delete_session(token)
    return jsonify({'message': 'Logged out'}), 200