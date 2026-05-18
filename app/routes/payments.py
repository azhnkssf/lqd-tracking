from flask import Blueprint, request, jsonify
from app.database import get_db
from app.services.auth_service import get_user_by_token
from app.services.schedule_service import (
    generate_schedule, generate_full_daily_schedule, build_export_rows,
    get_due_date, get_term_number, get_installment_for_term,
    is_single_default_judgment, build_installment_payment_allocations
)
from app.services.status_service import refresh_customer_status
from app.services.customer_list_cache_service import calculate_customer_list_cache, refresh_customer_list_cache
from app.services.judgment_service import calculate_judgment_difference, with_judgment_difference
from datetime import date

bp = Blueprint('payments', __name__, url_prefix='/api/payments')


def get_current_user():
    token = request.cookies.get('token') or request.headers.get('Authorization', '').replace('Bearer ', '')
    return get_user_by_token(token)


def _attach_case_status_logs(db, cus):
    rows = db.execute(
        'SELECT * FROM case_status_logs WHERE account_no = ? ORDER BY id ASC',
        (cus.get('account_no'),)
    ).fetchall()
    cus['_case_status_logs'] = [dict(r) for r in rows]
    return cus


# ============================================================
# Backend Payment Calculation Helpers
# ============================================================

def _sort_payments_by_date(payments):
    """
    เรียง payment ตามวันที่ก่อนส่งเข้า generate_full_daily_schedule()
    เพื่อไม่ให้เคสที่ user บันทึกย้อนหลังทำให้ end_date เพี้ยน
    """
    def _key(p):
        pd = p.get('payment_date')
        return date.fromisoformat(pd) if isinstance(pd, str) else pd
    return sorted(payments, key=_key)


def _calculate_payment_from_backend(cus, previous_payments, payment_date, amount):
    """
    ใช้ backend เป็น source of truth ตอน preview/save payment

    เหตุผล:
    - ห้ามเชื่อ interest_paid / principal_paid / principal_bal ที่ FE ส่งมา
    - ต้องให้ generate_full_daily_schedule() คำนวณเองทุกครั้ง
    - หลังแก้ schedule_service.py แล้ว เคส "พิพากษาฝ่ายเดียว + 1 งวด + จ่ายไม่ครบ"
      จะตัดดอก/ต้น และปล่อยดอกวิ่งต่อได้จาก logic กลางตัวเดียวกัน
    """
    preview_payment_obj = {
        'payment_date': payment_date,
        'amount': float(amount),
    }

    all_payments = _sort_payments_by_date(previous_payments + [preview_payment_obj])
    daily_rows = generate_full_daily_schedule(cus, all_payments)

    # หา row ของวันที่จ่ายนี้จากผลคำนวณจริง
    # ถ้ามีหลาย payment วันเดียวกัน ระบบ schedule ปัจจุบันคำนวณระดับ "รายวัน"
    # ดังนั้น row นี้คือผลรวมของวันนั้นตาม behavior เดิมของระบบ
    pay_row = next(
        (r for r in reversed(daily_rows) if r.get('is_pay_date') and r.get('date') == payment_date),
        None
    )

    if not pay_row:
        raise ValueError('ไม่สามารถคำนวณยอดชำระได้ กรุณาตรวจสอบวันที่ชำระเงิน')

    first_pay_date = date.fromisoformat(cus['first_due_date'])
    term_num = int(pay_row.get('term') or 0)
    if not term_num:
        pay_d = date.fromisoformat(payment_date)
        term_num = get_term_number(pay_d, first_pay_date, int(cus['installment_count']))
    due_date = get_due_date(term_num, first_pay_date)

    result = {
        'term': term_num,
        'due_date': due_date,
        'payment_date': payment_date,
        'amount': round(float(amount), 2),
        'interest_paid': float(pay_row.get('P') or 0),
        'principal_paid': float(pay_row.get('R') or 0),
        'other_paid': float(pay_row.get('other_paid') or 0),
        'principal_bal': float(pay_row.get('T') or 0),
        'dpd_days': int(pay_row.get('dpd_days') or 0),
        'dpd_months': int(pay_row.get('dpd_months') or 0),
        'ncb_status': str(pay_row.get('ncb_code') or pay_row.get('ncb_days') or '31'),
        'status_text': pay_row.get('status_text') or '',
        'outstanding': float(pay_row.get('outstanding') or 0),
        'daily_rows': daily_rows,
        'pay_row': pay_row,
    }

    return result


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

    cus      = _attach_case_status_logs(db, with_judgment_difference(dict(cus)))
    payments = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
        (account_no,)
    ).fetchall()
    payments = [dict(p) for p in payments]

    from datetime import date as _date
    today = _date.today()
    daily_rows = generate_full_daily_schedule(cus, payments, end_date=today)
    payment_rows = [r for r in daily_rows if r['is_pay_date']]
    last_row = daily_rows[-1] if daily_rows else None
    last_T = last_row['T'] if last_row else float(cus['principal'])
    computed_status = calculate_customer_list_cache(cus, payments, today)['ui_payment_status']

    plan_rows = generate_schedule(
        filing_date    = cus['filing_date'],
        principal      = cus['principal'],
        interest_rate  = cus['interest_rate'],
        term_months    = cus['installment_count'],
        diff_debt      = calculate_judgment_difference(cus),
        first_pay_date = cus['first_due_date'],
        installment_1  = cus['installment_1'],
        installment_2  = cus.get('installment_2', 0),
        installment_3  = cus.get('installment_3', 0),
        installment_4  = cus.get('installment_4', 0),
    )
    plan_monthly = [r for r in plan_rows if r['is_payment_date']]
    payment_allocations = build_installment_payment_allocations(plan_monthly, payments, daily_rows)

    cus_with_status = dict(cus)
    cus_with_status['status'] = computed_status
    cus_with_status['is_default_single_judgment'] = is_single_default_judgment(cus)
    cus_with_status.pop('_case_status_logs', None)

    return jsonify({
        'customer':        cus_with_status,
        'payments':        payments,
        'daily_rows':      daily_rows,
        'plan_monthly':    plan_monthly,
        'payment_allocations': payment_allocations,
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

    cus  = _attach_case_status_logs(db, with_judgment_difference(dict(cus)))
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

    try:
        calc = _calculate_payment_from_backend(cus, payments, payment_date, amount)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        import traceback; traceback.print_exc()
        return jsonify({'error': f'เกิดข้อผิดพลาดในการคำนวณ: {str(e)}'}), 500

    return jsonify({
        'term':           calc['term'],
        'due_date':       calc['due_date'].isoformat(),
        'payment_date':   calc['payment_date'],
        'amount':         calc['amount'],
        'interest_paid':  round(calc['interest_paid'], 2),
        'principal_paid': round(calc['principal_paid'], 2),
        'other_paid':     round(calc['other_paid'], 2),
        'principal_bal':  round(calc['principal_bal'], 2),
        'dpd_days':       calc['dpd_days'],
        'dpd_months':     calc['dpd_months'],
        'ncb_status':     calc['ncb_status'],
        'status_text':    calc['status_text'],
        'outstanding':    round(calc['outstanding'], 2),
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

    data = request.get_json() or {}
    if not data.get('payment_date'):
        return jsonify({'error': 'ข้อมูลไม่ครบ: payment_date'}), 400
    if data.get('amount') is None:
        return jsonify({'error': 'ข้อมูลไม่ครบ: amount'}), 400

    try:
        amount = float(data['amount'])
    except Exception:
        return jsonify({'error': 'amount ต้องเป็นตัวเลข'}), 400

    if amount < 0:
        return jsonify({'error': 'amount ต้องไม่น้อยกว่า 0'}), 400

    try:
        # validate format YYYY-MM-DD
        date.fromisoformat(str(data['payment_date'])[:10])
    except Exception:
        return jsonify({'error': 'payment_date ต้องเป็นรูปแบบ YYYY-MM-DD'}), 400

    cus_dict = _attach_case_status_logs(db, with_judgment_difference(dict(cus)))

    previous_payments = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC, id ASC',
        (account_no,)
    ).fetchall()
    previous_payments = [dict(p) for p in previous_payments]

    # ============================================================
    # สำคัญ:
    # Backend คำนวณผลตัดดอก/ต้นเองทุกครั้ง
    # ไม่ใช้ interest_paid / principal_paid / other_paid / principal_bal
    # ที่ FE ส่งมาอีกต่อไป
    # ============================================================
    try:
        calc = _calculate_payment_from_backend(
            cus=cus_dict,
            previous_payments=previous_payments,
            payment_date=data['payment_date'],
            amount=amount,
        )
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        import traceback; traceback.print_exc()
        return jsonify({'error': f'เกิดข้อผิดพลาดในการคำนวณยอดชำระ: {str(e)}'}), 500

    interest_paid  = round(calc['interest_paid'], 2)
    principal_paid = round(calc['principal_paid'], 2)
    other_paid     = round(calc['other_paid'], 2)
    principal_bal  = round(calc['principal_bal'], 2)
    dpd_days       = int(calc['dpd_days'])
    dpd_months     = int(calc['dpd_months'])
    ncb_status     = calc['ncb_status']

    note = data.get('note', '') or ''
    overpayment = 0.0

    # คง field overpayment ไว้ตาม schema เดิม
    # หมายเหตุ: schedule_service ปัจจุบันเป็นตัวคุมการตัดยอดหลัก
    # ถ้าต้องการคำนวณ overpayment แบบละเอียด ควรแก้ที่ calculation engine เพิ่มในรอบถัดไป
    if principal_bal <= 0 and amount > 0:
        applied_amount = round(interest_paid + principal_paid + other_paid, 2)
        if applied_amount < amount:
            overpayment = round(amount - applied_amount, 2)
            note = (note + ' | ' if note else '') + f'จ่ายเกิน {overpayment:,.2f} บาท'

    cur = db.execute('''
        INSERT INTO payments (
            customer_id, account_no, payment_date, amount,
            interest_paid, principal_paid, other_paid, principal_bal,
            dpd_days, dpd_months, ncb_status, note, overpayment, recorded_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        cus['id'], account_no,
        data['payment_date'], amount,
        interest_paid,
        principal_paid,
        other_paid,
        principal_bal,
        dpd_days,
        dpd_months,
        ncb_status,
        note,
        overpayment,
        user['id']
    ))
    db.commit()

    refresh_customer_status(account_no, db)

    return jsonify({
        'message'        : 'บันทึกการรับเงินสำเร็จ',
        'payment_id'     : cur.lastrowid,
        'interest_paid'  : interest_paid,
        'principal_paid' : principal_paid,
        'other_paid'     : other_paid,
        'principal_bal'  : principal_bal,
        'dpd_days'       : dpd_days,
        'dpd_months'     : dpd_months,
        'ncb_status'     : ncb_status,
        'outstanding'    : round(calc['outstanding'], 2),
        'overpayment'    : overpayment,
        'note'           : note,
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

    cus      = _attach_case_status_logs(db, with_judgment_difference(dict(cus)))
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
        diff_debt      = calculate_judgment_difference(cus),
        first_pay_date = cus['first_due_date'],
        installment_1  = cus['installment_1'],
        installment_2  = cus.get('installment_2', 0),
        installment_3  = cus.get('installment_3', 0),
        installment_4  = cus.get('installment_4', 0),
    )

    export = build_export_rows(plan_rows_all, daily_rows, cus)
    cus_for_response = dict(cus)
    cus_for_response['is_default_single_judgment'] = is_single_default_judgment(cus)
    cus_for_response.pop('_case_status_logs', None)

    return jsonify({'rows': export, 'customer': cus_for_response}), 200


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
    refresh_customer_list_cache(account_no, db=db, commit=False)
    db.commit()

    return jsonify({'message': 'บันทึกการคืนเงินสำเร็จ'}), 200
