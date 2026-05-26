from flask import Blueprint, current_app, request, jsonify
from app.services.auth_service import get_user_by_token
from app.services.schedule_service import generate_schedule, generate_monthly_summary, generate_full_daily_schedule, is_single_default_judgment

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

    def _float_value(name, default=0):
        value = data.get(name, default)
        if value is None or value == '':
            return float(default)
        return float(value)

    def _int_value(name, default=0):
        value = data.get(name, default)
        if value is None or value == '':
            return int(default)
        return int(value)

    def _actual_preview_row(row):
        principal_bal = float(row.get('T') or 0)
        principal_paid_actual = float(row.get('R') or 0)
        acc_interest = float(row.get('O') or 0)
        daily_interest = float(row.get('N') or 0)
        pay_amount = float(row.get('pay_amount') or 0)
        outstanding = float(row.get('outstanding') or 0)
        is_pay_date = bool(row.get('is_pay_date'))
        is_due_date = bool(row.get('is_due_date'))

        if is_due_date and not is_pay_date:
            other_due = max(0.0, outstanding - principal_bal - acc_interest)
            payment = outstanding
            interest_paid = acc_interest
            principal_paid = principal_bal
            other_paid = other_due
            principal_bf = principal_bal
        else:
            payment = pay_amount
            interest_paid = float(row.get('P') or 0)
            principal_paid = principal_paid_actual
            other_paid = float(row.get('S') or 0)
            principal_bf = principal_bal + principal_paid_actual

        return {
            **row,
            'date': row.get('date'),
            'term': row.get('term'),
            'principal_bf': round(principal_bf, 2),
            'payment': round(payment, 2),
            'interest_paid': round(interest_paid, 2),
            'principal_paid': round(principal_paid, 2),
            'other_paid': round(other_paid, 2),
            'principal_bal': round(principal_bal, 2),
            'daily_interest': round(daily_interest, 6),
            'acc_interest': round(acc_interest, 2),
            'is_payment_date': bool(is_pay_date or is_due_date),
            'is_actual_preview': True,
        }

    try:
        case_status = str(data.get('case_status') or data.get('judgment_type') or '').strip()
        installment_count = _int_value('installment_count')

        preview_customer = {
            'case_status': case_status,
            'judgment_type': case_status,
            'filing_date': data['filing_date'],
            'first_due_date': data['first_due_date'],
            'principal': _float_value('principal'),
            'interest_rate': _float_value('interest_rate'),
            'default_interest_rate': _float_value('default_interest_rate'),
            'installment_count': installment_count,
            'installment_1': _float_value('installment_1'),
            'installment_2': _float_value('installment_2'),
            'installment_3': _float_value('installment_3'),
            'installment_4': _float_value('installment_4'),
            'court_fee': _float_value('court_fee'),
            'lawyer_fee': _float_value('lawyer_fee'),
            'total_debt': _float_value('total_debt', _float_value('principal')),
            '_case_status_logs': [],
        }

        if is_single_default_judgment(preview_customer):
            actual_rows = generate_full_daily_schedule(preview_customer, payments=[])
            daily = [_actual_preview_row(row) for row in actual_rows]
            monthly = [row for row in daily if row.get('is_due_date')]

            return jsonify({
                'daily': daily,
                'monthly': monthly,
                'total': len(daily),
            }), 200

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
