from datetime import date
from app.database import get_db
from app.services.schedule_service import generate_full_daily_schedule
from dateutil.relativedelta import relativedelta


def compute_customer_status(cus, payments):
    fd    = cus.get('first_due_date')
    today = date.today()

    if fd is None:
        return cus.get('status', 'ชำระปกติ')

    if not isinstance(fd, date):
        try:
            first_due = date.fromisoformat(str(fd))
        except Exception:
            return cus.get('status', 'ชำระปกติ')
    else:
        first_due = fd

    if not payments and today < first_due:
        return 'ยังไม่ถึงกำหนด'

    if not payments:
        return 'ค้างชำระ'

    try:
        daily_rows = generate_full_daily_schedule(dict(cus), payments)
    except Exception:
        import traceback; traceback.print_exc()
        return cus.get('status', 'ชำระปกติ')

    if not daily_rows:
        return 'ชำระปกติ'

    last_row = daily_rows[-1]
    if round(last_row['T'], 2) <= 0:
        return 'ปิดบัญชี'
    elif last_row['outstanding'] > 0:
        return 'ค้างชำระ'
    else:
        return 'ชำระปกติ'


def refresh_customer_status(account_no, db=None):
    should_close = db is None
    if db is None:
        db = get_db()

    cus = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0',
        (account_no,)
    ).fetchone()

    if not cus:
        return None

    cus = dict(cus)

    pays = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
        (account_no,)
    ).fetchall()
    pays = [dict(p) for p in pays]

    new_status = compute_customer_status(cus, pays)

    first_due  = cus.get('first_due_date')
    inst_count = cus.get('installment_count')

    if first_due and inst_count:
        try:
            if not isinstance(first_due, date):
                first_due = date.fromisoformat(str(first_due))
            last_due = first_due + relativedelta(months=int(inst_count) - 1)
            db.execute(
                'UPDATE customers SET status = ?, last_due_date = ? WHERE account_no = ?',
                (new_status, last_due.isoformat(), account_no)
            )
        except Exception:
            db.execute(
                'UPDATE customers SET status = ? WHERE account_no = ?',
                (new_status, account_no)
            )
    else:
        db.execute(
            'UPDATE customers SET status = ? WHERE account_no = ?',
            (new_status, account_no)
        )

    if new_status == 'ปิดบัญชี' and cus.get('case_status') != 'ปิดบัญชี':
        db.execute(
            "UPDATE customers SET case_status = 'ปิดบัญชี' WHERE account_no = ?",
            (account_no,)
        )
        db.execute('''
            INSERT INTO case_status_logs
            (account_no, from_status, to_status, changed_by, note)
            VALUES (?, ?, 'ปิดบัญชี', NULL, 'ระบบปิดบัญชีอัตโนมัติ')
        ''', (account_no, cus.get('case_status')))

    db.commit()

    return new_status