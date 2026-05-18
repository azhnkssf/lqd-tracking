from datetime import date

from app.database import get_db
from app.services.report_service import get_snapshot_at_date
from dateutil.relativedelta import relativedelta


def _parse_iso_date(value):
    if not value:
        return None
    try:
        return date.fromisoformat(str(value)[:10])
    except Exception:
        return None


def _first_day_next_month(d):
    if not d:
        return None
    if d.month == 12:
        return date(d.year + 1, 1, 1)
    return date(d.year, d.month + 1, 1)


def _payment_status_for_list(cus, snap, payments, today):
    case_status = cus.get('case_status')

    if case_status == 'ปิดบัญชี':
        return 'ชำระครบแล้ว'

    if case_status == 'ยื่นฟ้อง':
        return 'ไม่มีแผนชำระ'

    first_due_date = _parse_iso_date(cus.get('first_due_date'))
    if first_due_date and today < first_due_date and not payments:
        return 'ยังไม่ถึงกำหนด'

    outstanding = float((snap or {}).get('outstanding') or 0)
    dpd_days = int(float((snap or {}).get('dpd_days') or 0))
    dpd_months = int(float((snap or {}).get('dpd_months') or 0))

    if outstanding > 0 or dpd_days > 0 or dpd_months > 0:
        return 'ค้างชำระ'

    return 'ชำระปกติ'


def _can_record_enforcement(cus, snap, today):
    allowed_status = ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว']
    outstanding = float((snap or {}).get('outstanding') or 0)
    due_date = _parse_iso_date(cus.get('first_due_date'))
    has_enforcement_order = bool(
        cus.get('enforcement_order_no') or
        cus.get('enforcement_recorded_at')
    )

    return (
        cus.get('case_status') in allowed_status
        and outstanding > 0
        and not has_enforcement_order
        and due_date is not None
        and today >= _first_day_next_month(due_date)
    )


def _remaining_debt(cus, snap):
    if cus.get('case_status') == 'ปิดบัญชี':
        return 0.0
    if cus.get('case_status') == 'ยื่นฟ้อง' or not cus.get('judgment_date'):
        return float(cus.get('filing_capital') or 0)
    return float(
        (snap or {}).get('remaining_debt_raw')
        if (snap or {}).get('remaining_debt_raw') is not None
        else (snap or {}).get('outstanding_raw')
        if (snap or {}).get('outstanding_raw') is not None
        else (snap or {}).get('outstanding')
        if (snap or {}).get('outstanding') is not None
        else cus.get('total_debt') or 0
    )


def _display_dpd_days(snap):
    if not snap:
        return 0
    monthly_policy_days = int(float(snap.get('dpd_months') or 0))
    if monthly_policy_days > 0:
        return monthly_policy_days
    return int(float(snap.get('dpd_days') or 0))


def _scheduled_due_date(first_due_date, term):
    return first_due_date + relativedelta(months=term - 1)


def _current_schedule_term(cus, today):
    first_due_date = _parse_iso_date(cus.get('first_due_date'))
    if not first_due_date:
        return 1
    if today < first_due_date:
        return 1

    term_count = int(float(cus.get('installment_count') or 0))
    diff_months = (today.year - first_due_date.year) * 12 + (today.month - first_due_date.month)
    term = max(1, diff_months + 1)
    return min(term, term_count) if term_count else term


def _next_scheduled_due_date(cus, today):
    first_due_date = _parse_iso_date(cus.get('first_due_date'))
    if not first_due_date:
        return None

    term_count = int(float(cus.get('installment_count') or 0))
    term = _current_schedule_term(cus, today)
    due_date = _scheduled_due_date(first_due_date, term)

    if today > due_date:
        term += 1
        due_date = _scheduled_due_date(first_due_date, term)

    if term_count and term > term_count:
        return _scheduled_due_date(first_due_date, term_count)
    return due_date


def calculate_customer_list_cache(cus, payments=None, today=None):
    today = today or date.today()
    payments = payments or []

    try:
        snap = get_snapshot_at_date(cus, payments, today.isoformat())
    except Exception:
        snap = None

    latest_payment = None
    if payments:
        latest_payment = max(payments, key=lambda p: (p.get('payment_date') or '', p.get('id') or 0))

    return {
        'ui_payment_status': _payment_status_for_list(cus, snap, payments, today),
        'ui_remaining_debt': round(_remaining_debt(cus, snap), 2),
        'ui_principal_bal': round(float((snap or {}).get('principal_bal_raw') or (snap or {}).get('principal_bal') or 0), 2),
        'ui_outstanding': round(float((snap or {}).get('outstanding_raw') or (snap or {}).get('outstanding') or 0), 2),
        'ui_dpd_days': _display_dpd_days(snap),
        'ui_dpd_months': int(float((snap or {}).get('dpd_months') or 0)),
        'ui_next_due_date': (_next_scheduled_due_date(cus, today) or _parse_iso_date(cus.get('first_due_date')) or today).isoformat(),
        'ui_last_payment_date': latest_payment.get('payment_date') if latest_payment else None,
        'ui_last_payment_amount': float(latest_payment.get('amount') or 0) if latest_payment else 0,
        'ui_snapshot_date': today.isoformat(),
        'ui_can_record_enforcement': _can_record_enforcement(cus, snap, today),
    }


def _attach_case_status_logs(db, cus):
    rows = db.execute(
        'SELECT * FROM case_status_logs WHERE account_no = ? ORDER BY id ASC',
        (cus.get('account_no'),)
    ).fetchall()
    cus['_case_status_logs'] = [dict(r) for r in rows]
    return cus


def refresh_customer_list_cache(account_no, db=None, commit=True, today=None):
    db = db or get_db()
    today = today or date.today()

    row = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0',
        (account_no,)
    ).fetchone()
    if not row:
        return False

    cus = _attach_case_status_logs(db, dict(row))
    payments = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC, id ASC',
        (account_no,)
    ).fetchall()
    payments = [dict(p) for p in payments]

    cache = calculate_customer_list_cache(cus, payments, today)
    db.execute('''
        UPDATE customers SET
            ui_payment_status      = ?,
            ui_remaining_debt      = ?,
            ui_principal_bal       = ?,
            ui_outstanding         = ?,
            ui_dpd_days            = ?,
            ui_dpd_months          = ?,
            ui_next_due_date       = ?,
            ui_last_payment_date   = ?,
            ui_last_payment_amount = ?,
            ui_snapshot_date       = ?,
            ui_snapshot_updated_at = CURRENT_TIMESTAMP
        WHERE account_no = ? AND is_deleted = 0
    ''', (
        cache['ui_payment_status'],
        cache['ui_remaining_debt'],
        cache['ui_principal_bal'],
        cache['ui_outstanding'],
        cache['ui_dpd_days'],
        cache['ui_dpd_months'],
        cache['ui_next_due_date'],
        cache['ui_last_payment_date'],
        cache['ui_last_payment_amount'],
        cache['ui_snapshot_date'],
        account_no,
    ))

    if commit:
        db.commit()
    return True


def refresh_all_customer_list_cache(db=None, today=None, batch_size=200):
    db = db or get_db()
    today = today or date.today()
    rows = db.execute(
        'SELECT account_no FROM customers WHERE is_deleted = 0 ORDER BY id ASC'
    ).fetchall()

    refreshed = 0
    failed = 0
    for row in rows:
        try:
            if refresh_customer_list_cache(row['account_no'], db=db, commit=False, today=today):
                refreshed += 1
        except Exception:
            failed += 1

        if refreshed and refreshed % batch_size == 0:
            db.commit()

    db.commit()
    return {'refreshed': refreshed, 'failed': failed, 'snapshot_date': today.isoformat()}
