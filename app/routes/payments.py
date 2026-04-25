from flask import Blueprint, request, jsonify
from app.database import get_db
from app.services.auth_service import get_user_by_token
from app.services.schedule_service import (
    generate_schedule, generate_full_daily_schedule, build_export_rows,
    get_due_date, get_term_number, get_installment_for_term
)
from app.services.status_service import refresh_customer_status
from datetime import date

bp = Blueprint('payments', __name__, url_prefix='/api/payments')


def get_current_user():
    token = request.cookies.get('token') or request.headers.get('Authorization', '').replace('Bearer ', '')
    return get_user_by_token(token)


@bp.route('/<account_no>', methods=['GET'])
def get_payments(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db  = get_db()
    cus = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone()
    if not cus:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404

    cus      = dict(cus)
    payments = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
        (account_no,)
    ).fetchall()
    payments = [dict(p) for p in payments]

    from datetime import date as _date
    _first_due = cus['first_due_date']
    if not isinstance(_first_due, _date):
        _first_due = _date.fromisoformat(str(_first_due))

    if not payments and _date.today() < _first_due:
        computed_status = 'ยังไม่ถึงกำหนด'
        daily_rows   = []
        payment_rows = []
        last_T       = float(cus['principal'])
    elif not payments:
        computed_status = 'ค้างชำระ'
        daily_rows      = generate_full_daily_schedule(cus, payments)
        payment_rows    = []
        last_T          = float(cus['principal'])
    else:
        daily_rows   = generate_full_daily_schedule(cus, payments)
        payment_rows = [r for r in daily_rows if r['is_pay_date']]
        last_row     = daily_rows[-1] if daily_rows else None
        last_T       = last_row['T'] if last_row else float(cus['principal'])
        last_owed    = last_row['outstanding'] if last_row else 0.0

        if round(last_T, 2) <= 0:
            computed_status = 'ปิดบัญชี'
        elif last_owed > 0:
            computed_status = 'ค้างชำระ'
        else:
            computed_status = 'ชำระปกติ'

    plan_rows = generate_schedule(
        filing_date    = cus['filing_date'],
        principal      = cus['principal'],
        interest_rate  = cus['interest_rate'],
        term_months    = cus['installment_count'],
        diff_debt      = cus.get('judgment_difference') or 0,
        first_pay_date = cus['first_due_date'],
        installment_1  = cus['installment_1'],
        installment_2  = cus.get('installment_2', 0),
        installment_3  = cus.get('installment_3', 0),
        installment_4  = cus.get('installment_4', 0),
    )
    plan_monthly = [r for r in plan_rows if r['is_payment_date']]

    cus_with_status = dict(cus)
    cus_with_status['status'] = computed_status

    return jsonify({
        'customer':        cus_with_status,
        'payments':        payments,
        'daily_rows':      daily_rows,
        'plan_monthly':    plan_monthly,
        'principal_bal':   round(last_T, 2),
        'computed_status': computed_status,
    }), 200


@bp.route('/<account_no>/preview', methods=['POST'])
def preview_payment(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db  = get_db()
    cus = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone()
    if not cus:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404

    cus  = dict(cus)
    data = request.get_json()
    payment_date = data.get('payment_date')
    amount       = float(data.get('amount', 0))

    if not payment_date or amount < 0:
        return jsonify({'error': 'กรุณากรอกวันที่และยอดชำระ'}), 400

    payments = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
        (account_no,)
    ).fetchall()
    payments = [dict(p) for p in payments]

    preview_payment_obj = {'payment_date': payment_date, 'amount': amount}
    all_payments = payments + [preview_payment_obj]

    daily_rows = generate_full_daily_schedule(cus, all_payments)

    pay_row = next((r for r in reversed(daily_rows) if r['is_pay_date'] and r['date'] == payment_date), None)

    if not pay_row:
        return jsonify({'error': 'ไม่สามารถคำนวณได้ กรุณาตรวจสอบวันที่'}), 400

    first_pay_date = date.fromisoformat(cus['first_due_date'])
    pay_d          = date.fromisoformat(payment_date)
    term_num       = get_term_number(pay_d, first_pay_date, int(cus['installment_count']))
    due_date       = get_due_date(term_num, first_pay_date)

    return jsonify({
        'term':           term_num,
        'due_date':       due_date.isoformat(),
        'payment_date':   payment_date,
        'amount':         amount,
        'interest_paid':  pay_row['P'],
        'principal_paid': pay_row['R'],
        'other_paid':     pay_row['other_paid'],
        'principal_bal':  pay_row['T'],
        'dpd_days':       pay_row['dpd_days'],
        'dpd_months':     pay_row['dpd_months'],
        'ncb_status':     pay_row['ncb_code'],
        'status_text':    pay_row['status_text'],
        'outstanding':    pay_row['outstanding'],
    }), 200


@bp.route('/<account_no>', methods=['POST'])
def create_payment(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db  = get_db()
    cus = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone()
    if not cus:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404

    data = request.get_json()
    if not data.get('payment_date'):
        return jsonify({'error': 'ข้อมูลไม่ครบ: payment_date'}), 400
    if data.get('amount') is None:
        return jsonify({'error': 'ข้อมูลไม่ครบ: amount'}), 400

    amount       = float(data['amount'])
    principal_bal = float(data.get('principal_bal', 0))

    overpayment = 0.0
    note        = data.get('note', '')
    if principal_bal <= 0 and amount > 0:
        prev_payments = db.execute(
            'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
            (account_no,)
        ).fetchall()
        prev_payments = [dict(p) for p in prev_payments]
        cus_dict = dict(cus)
        all_pay  = prev_payments + [{'payment_date': data['payment_date'], 'amount': amount}]
        daily    = generate_full_daily_schedule(cus_dict, all_pay)
        pay_row  = next((r for r in reversed(daily) if r['is_pay_date'] and r['date'] == data['payment_date']), None)
        if pay_row and pay_row.get('T', 0) <= 0:
            overpayment = abs(pay_row.get('T', 0))
            if overpayment > 0:
                note = f'จ่ายเกิน {overpayment:,.2f} บาท'

    cur = db.execute('''
        INSERT INTO payments (
            customer_id, account_no, payment_date, amount,
            interest_paid, principal_paid, other_paid, principal_bal,
            dpd_days, dpd_months, ncb_status, note, overpayment, recorded_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        cus['id'], account_no,
        data['payment_date'], amount,
        float(data.get('interest_paid', 0)),
        float(data.get('principal_paid', 0)),
        float(data.get('other_paid', 0)),
        principal_bal,
        int(data.get('dpd_days', 0)),
        int(data.get('dpd_months', 0)),
        data.get('ncb_status', '31'),
        note,
        overpayment,
        user['id']
    ))
    db.commit()

    refresh_customer_status(account_no, db)

    return jsonify({
        'message'     : 'บันทึกการรับเงินสำเร็จ',
        'overpayment' : overpayment,
        'note'        : note,
    }), 201


@bp.route('/<account_no>/export', methods=['GET'])
def export_payments(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db  = get_db()
    cus = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone()
    if not cus:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404

    cus      = dict(cus)
    payments = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
        (account_no,)
    ).fetchall()
    payments   = [dict(p) for p in payments]
    daily_rows = generate_full_daily_schedule(cus, payments)

    plan_rows_all = generate_schedule(
        filing_date    = cus['filing_date'],
        principal      = cus['principal'],
        interest_rate  = cus['interest_rate'],
        term_months    = cus['installment_count'],
        diff_debt      = cus.get('judgment_difference') or 0,
        first_pay_date = cus['first_due_date'],
        installment_1  = cus['installment_1'],
        installment_2  = cus.get('installment_2', 0),
        installment_3  = cus.get('installment_3', 0),
        installment_4  = cus.get('installment_4', 0),
    )

    export = build_export_rows(plan_rows_all, daily_rows, cus)

    return jsonify({'rows': export, 'customer': cus}), 200


@bp.route('/<account_no>/latest', methods=['DELETE'])
def delete_latest_payment(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    if user['role'] != 'admin':
        return jsonify({'error': 'เฉพาะ Admin เท่านั้นที่มีสิทธิ์ลบข้อมูล'}), 403

    db   = get_db()
    data = request.get_json() or {}

    latest = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY id DESC LIMIT 1',
        (account_no,)
    ).fetchone()

    if not latest:
        return jsonify({'error': 'ไม่พบข้อมูลการชำระเงิน'}), 404

    latest = dict(latest)

    db.execute(
        'INSERT INTO payment_deletions (payment_id, account_no, payment_date, amount, deleted_by, reason) VALUES (?, ?, ?, ?, ?, ?)',
        (latest['id'], account_no, latest['payment_date'], latest['amount'], user['id'], data.get('reason', ''))
    )

    db.execute('DELETE FROM payments WHERE id = ?', (latest['id'],))
    db.commit()

    refresh_customer_status(account_no, db)

    return jsonify({
        'message':      'ลบข้อมูลการชำระเงินสำเร็จ',
        'deleted_id':   latest['id'],
        'payment_date': latest['payment_date'],
        'amount':       latest['amount'],
    }), 200

@bp.route('/<account_no>/payments/<int:payment_id>/refund', methods=['PATCH'])
def mark_refunded(account_no, payment_id):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    if user['role'] != 'admin':
        return jsonify({'error': 'เฉพาะ Admin เท่านั้น'}), 403

    db  = get_db()
    pay = db.execute(
        'SELECT * FROM payments WHERE id = ? AND account_no = ?',
        (payment_id, account_no)
    ).fetchone()
    if not pay:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404

    pay = dict(pay)
    refund_note = f'คืนเงินแล้ว {pay["overpayment"]:,.2f} บาท | ' + (pay['note'] or '')

    db.execute(
        'UPDATE payments SET refunded = 1, note = ? WHERE id = ?',
        (refund_note, payment_id)
    )
    db.commit()

    return jsonify({'message': 'บันทึกการคืนเงินสำเร็จ'}), 200