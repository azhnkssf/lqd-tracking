from datetime import date
from dateutil.relativedelta import relativedelta
from app.services.schedule_service import generate_full_daily_schedule, get_due_date


# ============================================================
# Column Index ของไฟล์ทะเบียนคดี (0-based)
# ============================================================
COL_ACCOUNT_NO      = 1    # B  - เลขที่สัญญา
COL_STATUS          = 149  # ET - สถานะคดี (0-based index 149)
COL_FILING_DATE     = 55   # BD - วันที่ยื่นฟ้องจริง
COL_PRINCIPAL_SUED  = 43   # AR - ทุนทรัพย์ฟ้อง
COL_JUDGMENT_DEBT   = 63   # BL - หนี้ตามคำพิพากษา
COL_JUDGMENT_DATE   = 60   # BI - วันที่พิพากษา

# สถานะที่ต้องการ
VALID_STATUSES = {
    'ยื่นฟ้องแล้ว_คดีดำ',
    'พิพากษาฝ่ายเดียว',
    'พิพากษาตามยอม',
}

# mapping case_status → report group
CASE_STATUS_REPORT_MAP = {
    'ยื่นฟ้อง'         : '30',
    'พิพากษาฝ่ายเดียว': '30',
    'บังคับคดี'        : '30',
    'พิพากษาตามยอม'   : '31',
    'ปิดบัญชี'         : '33',
}


def _get_report_group(cus, snap):
    case          = (cus.get('case_status') or 'ยื่นฟ้อง').strip()
    principal_bal = snap.get('principal_bal', 0) if snap else 0

    if principal_bal == 0 or case == 'ปิดบัญชี':
        return '33'

    return CASE_STATUS_REPORT_MAP.get(case, '31')


def col_letter_to_index(col_str):
    """แปลง column letter เป็น 0-based index เช่น A=0, B=1, ET=151"""
    col_str = col_str.upper().strip()
    result = 0
    for char in col_str:
        result = result * 26 + (ord(char) - ord('A') + 1)
    return result - 1


def parse_cell_date(val):
    """แปลง cell value เป็น date string YYYY-MM-DD"""
    if val is None:
        return None
    if isinstance(val, date):
        return val.isoformat()
    from datetime import datetime
    if isinstance(val, datetime):
        return val.date().isoformat()
    s = str(val).strip()
    if not s or s == 'None':
        return None
    # ตัด time suffix เช่น 2025-11-06T00:00:00 → 2025-11-06
    if 'T' in s:
        s = s.split('T')[0]
    if ' ' in s:
        s = s.split(' ')[0]
    from app.routes.imports import parse_date
    return parse_date(s)


def parse_cell_float(val):
    """แปลง cell value เป็น float"""
    if val is None:
        return None
    try:
        return float(str(val).replace(',', '').strip())
    except Exception:
        return None


def get_installment_for_month(cus, report_date):
    """
    หาค่างวดของเดือนที่ขอ Report
    ดูว่า due date ของเดือนนั้นอยู่ในงวดไหน แล้วดึงค่างวดของงวดนั้น
    """
    if isinstance(report_date, str):
        report_date = date.fromisoformat(report_date)

    first_due = cus.get('first_due_date')
    if not first_due:
        return float(cus.get('installment_1') or 0)

    if isinstance(first_due, str):
        first_due = date.fromisoformat(first_due)

    term_months = int(cus.get('installment_count') or 1)
    insts = [
        float(cus.get('installment_1') or 0),
        float(cus.get('installment_2') or 0),
        float(cus.get('installment_3') or 0),
        float(cus.get('installment_4') or 0),
    ]
    filled = [v for v in insts if v > 0]
    if not filled:
        return 0.0

    # หา term ของเดือนที่ขอ report
    report_month = report_date.replace(day=1)
    first_month  = first_due.replace(day=1)
    diff_months  = (report_month.year - first_month.year) * 12 + (report_month.month - first_month.month)
    term = max(1, min(diff_months + 1, term_months))

    # เลือก installment ตาม term
    if len(filled) == 1:
        return filled[0]
    elif len(filled) == 2:
        return filled[0] if term == 1 else filled[1]
    elif len(filled) == 3:
        if term == 1:   return filled[0]
        elif term == 2: return filled[1]
        else:           return filled[2]
    else:
        if term == 1:   return filled[0]
        elif term == 2: return filled[1]
        elif term == 3: return filled[2]
        else:           return filled[3]


def get_snapshot_at_date(cus, payments, report_date):
    """
    คำนวณ daily schedule ถึงวันที่ report_date
    แล้วดึงผลของวันนั้น
    คืน dict ที่มี: principal_bal, outstanding, dpd_days, dpd_months, ncb_days, ncb_months
    """
    if isinstance(report_date, str):
        report_date = date.fromisoformat(report_date)

    try:
        daily_rows = generate_full_daily_schedule(cus, payments, end_date=report_date)
    except Exception as e:
        return None

    if not daily_rows:
        return None

    # หา row ของวันที่ report_date
    # ถ้าไม่มีวันนั้นพอดี ใช้ row สุดท้าย
    target_row = None
    for row in reversed(daily_rows):
        if row.get('date') <= report_date.isoformat():
            target_row = row
            break

    if not target_row:
        target_row = daily_rows[-1]

    oldest_due_str = target_row.get('oldest_due')
    if oldest_due_str:
        oldest_due_date = date.fromisoformat(oldest_due_str)
        first_of_next   = date(oldest_due_date.year, oldest_due_date.month, 1) + relativedelta(months=1)
        default_date    = first_of_next.isoformat()
    else:
        default_date = None

    return {
        'principal_bal'  : round(target_row.get('T', 0), 2),
        'acc_interest'   : round(target_row.get('O', 0), 2),
        'outstanding'    : round(target_row.get('outstanding', 0), 2),
        'default_date'   : default_date,
        'default_amount' : round(target_row.get('oldest_due_amount', 0), 2),
        'dpd_days'       : target_row.get('dpd_days', 0),
        'dpd_months'     : target_row.get('dpd_months', 0),
        'ncb_days'       : target_row.get('ncb_days', '31'),
        'ncb_months'     : target_row.get('ncb_months', '31'),
    }


def process_registry_file(ws, db, report_date_str):
    report_30     = []
    report_31     = []
    report_33     = []
    alerts        = []
    file_accounts = set()

    for row in ws.iter_rows(min_row=4, values_only=True):
        if all(v is None for v in row):
            continue

        account_no     = str(row[COL_ACCOUNT_NO] or '').strip()
        file_status    = str(row[COL_STATUS] or '').strip()
        filing_date    = parse_cell_date(row[COL_FILING_DATE])
        principal_sued = parse_cell_float(row[COL_PRINCIPAL_SUED])
        judgment_debt  = parse_cell_float(row[COL_JUDGMENT_DEBT])
        judgment_date  = parse_cell_date(row[COL_JUDGMENT_DATE])

        if account_no.endswith('.0') and account_no[:-2].isdigit():
            account_no = account_no[:-2]

        if not account_no or file_status not in VALID_STATUSES:
            continue

        file_accounts.add(account_no)

        cus_row = db.execute(
            'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0',
            (account_no,)
        ).fetchone()
        cus = dict(cus_row) if cus_row else None

        # ============================================================
        # ไม่มีใน DB
        # ============================================================
        if not cus:
            if file_status == 'พิพากษาตามยอม':
                alerts.append({
                    'account_no'  : account_no,
                    'status'      : file_status,
                    'filing_date' : filing_date,
                    'message'     : 'ยังไม่มีข้อมูลใน Customer DB กรุณากรอกข้อมูล',
                })
            else:
                report_30.append({
                    'account_no'      : account_no,
                    'status_label'    : f'{file_status} (ไม่มีใน DB)',
                    'filing_date'     : filing_date,
                    'principal_sued'  : principal_sued,
                    'judgment_debt'   : judgment_debt,
                    'judgment_date'   : judgment_date,
                    'default_amount'  : None,
                    'default_date'    : None,
                    'dpd'             : None,
                    'dpd_months'      : None,
                    'remaining_debt'  : None,
                })
            continue

        # ============================================================
        # มีใน DB — คำนวณ snapshot แล้วจัดกลุ่มตาม case_status
        # ============================================================
        payments = db.execute(
            'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
            (account_no,)
        ).fetchall()
        payments = [dict(p) for p in payments]

        snap = get_snapshot_at_date(cus, payments, report_date_str)
        if not snap:
            continue

        group = _get_report_group(cus, snap)

        if group == '33':
            report_33.append(_build_report33_row(account_no, cus))

        elif group == '30':
            report_30.append(_build_report30_row_from_db(
                account_no,
                cus.get('case_status', file_status),
                cus.get('filing_date') or filing_date,
                principal_sued,
                cus,
                snap,
                report_date_str
            ))

        elif group == '31':
            report_31.append(_build_report31_row(
                account_no, cus, snap, report_date_str
            ))

    db_accounts = db.execute(
        'SELECT account_no, name FROM customers WHERE is_deleted = 0'
    ).fetchall()

    missing_db = []
    for row in db_accounts:
        if row['account_no'] not in file_accounts:
            missing_db.append({
                'account_no' : row['account_no'],
                'name'       : row['name'],
                'message'    : 'มีในระบบแต่ไม่อยู่ในไฟล์ทะเบียนคดี',
            })

    return {
        'report_30'  : report_30,
        'report_31'  : report_31,
        'report_33'  : report_33,
        'alerts'     : alerts,
        'missing_db' : missing_db,
    }


def _num(v, default=0.0):
    try:
        if v is None or v == '':
            return default
        return float(v)
    except Exception:
        return default


def _get_principal_sued(cus, fallback=None):
    return (
        cus.get('filing_capital') or
        cus.get('principal_sued') or
        fallback or
        0
    )

def _calc_remaining_debt(cus, snap):
    if not snap:
        return _num(cus.get('total_debt'))

    diff_debt = (
        _num(cus.get('court_fee')) +
        _num(cus.get('lawyer_fee')) +
        _num(cus.get('total_debt')) -
        _num(cus.get('principal'))
    )

    remaining = (
        _num(snap.get('principal_bal')) +
        _num(snap.get('acc_interest')) +
        diff_debt
    )

    return round(remaining, 2)


def _build_report30_row_from_db(account_no, status, filing_date, principal_sued, cus, snap=None, report_date_str=None):
    case_status = (status or cus.get('case_status') or '').strip()

    base = {
        'account_no'               : account_no,
        'status_label'             : case_status,
        'filing_date'              : filing_date or cus.get('filing_date'),
        'principal_sued'           : _num(_get_principal_sued(cus, principal_sued)),
        'judgment_debt'            : None,
        'judgment_date'            : None,
        'default_amount'           : None,
        'default_date'             : None,
        'dpd'                      : None,
        'dpd_months'               : None,  # กันโค้ดเก่าบางจุดที่ยังเรียก dpd_months
        'remaining_debt'           : None,
        'enforcement_order_no'     : cus.get('enforcement_order_no'),
        'enforcement_judgment_date': cus.get('enforcement_judgment_date'),
    }

    if case_status == 'ยื่นฟ้อง':
        return base

    if case_status == 'พิพากษาฝ่ายเดียว':
        base.update({
            'judgment_debt'  : _num(cus.get('total_debt')),
            'judgment_date'  : cus.get('judgment_date'),
            'remaining_debt' : _calc_remaining_debt(cus, snap),
        })
        return base

    if case_status == 'บังคับคดี':
        base.update({
            'judgment_debt'  : _num(cus.get('total_debt')),
            'judgment_date'  : cus.get('judgment_date'),
            'default_amount' : snap.get('default_amount') if snap else None,
            'default_date'   : snap.get('default_date') if snap else None,
            'dpd'            : snap.get('dpd_months') if snap else None,
            'dpd_months'     : snap.get('dpd_months') if snap else None,
            'remaining_debt' : _calc_remaining_debt(cus, snap),
        })
        return base

    return base


def _build_report31_row(account_no, cus, snap, report_date_str):
    """สร้าง row Report 31"""
    inst_amount = get_installment_for_month(cus, report_date_str)
    diff_debt = (
        float(cus.get('court_fee') or 0) +
        float(cus.get('lawyer_fee') or 0) +
        float(cus.get('total_debt') or 0) -
        float(cus.get('principal') or 0)
    )

    amount_owed = (
        snap.get('principal_bal', 0) +
        snap.get('acc_interest', 0) +
        diff_debt
    )
    return {
        'account_no'         : account_no,
        'amount_owed'        : round(amount_owed, 2),
        'amount_past_due'    : snap.get('outstanding'),
        'dpd'                : snap.get('dpd_months'),
        'default_date'       : '19000101',
        'installment_amount' : inst_amount,
        'installment_count'  : cus.get('installment_count'),
        'ncb_status'         : snap.get('ncb_months'),
    }
    
def _build_report33_row(account_no, cus):
    """สร้าง row Report 33 (ปิดบัญชี)"""
    return {
        'account_no'    : account_no,
        'name'          : cus.get('name'),
        'judgment_date' : cus.get('judgment_date'),
        'total_debt'    : float(cus.get('total_debt') or 0),
        'ncb_status'    : '33',
        'status_label'  : 'ปิดบัญชี',
    }