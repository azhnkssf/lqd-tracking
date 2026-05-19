from flask import Blueprint, current_app, request, jsonify
from app.services.auth_service import get_user_by_token
from app.services.schedule_service import generate_schedule, generate_monthly_summary

bp = Blueprint('schedule', __name__, url_prefix='/api/schedule')


def get_current_user():
    token = request.cookies.get(current_app.config.get('AUTH_COOKIE_NAME', 'token')) or request.headers.get('Authorization', '').replace('Bearer ', '')
    return get_user_by_token(token)


@bp.before_request
def block_superadmin_from_schedule_api():
    user = get_current_user()
    if user and user['role'] == 'superadmin':
        return jsonify({'error': 'Superadmin is limited to user management.'}), 403


@bp.route('/preview', methods=['POST'])
def preview_schedule():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()

    required_nonempty = ['principal', 'interest_rate', 'installment_count', 'first_due_date', 'installment_1']
    missing = [f for f in required_nonempty if data.get(f) is None or data.get(f) == '']
    if missing:
        return jsonify({'error': f'ข้อมูลไม่ครบ: {", ".join(missing)}'}), 400

    try:
        rows = generate_schedule(
            filing_date    = data['filing_date'],
            principal      = data['principal'],
            interest_rate  = data['interest_rate'],
            term_months    = data['installment_count'],
            diff_debt      = data.get('diff_debt', 0),
            first_pay_date = data['first_due_date'],
            installment_1  = data['installment_1'],
            installment_2  = data.get('installment_2', 0),
            installment_3  = data.get('installment_3', 0),
            installment_4  = data.get('installment_4', 0),
        )

        monthly = generate_monthly_summary(rows)

        return jsonify({
            'daily':   rows,
            'monthly': monthly,
            'total':   len(rows),
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400
