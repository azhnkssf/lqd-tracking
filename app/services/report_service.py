from datetime import date
from decimal import Decimal, ROUND_HALF_UP, InvalidOperation
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



def get_maturity_date(cus):
    """
    คำนวณวันครบกำหนดงวดสุดท้ายสำหรับ Report 31
    Maturity Date = first_due_date + (installment_count - 1) เดือน
    """
    first_due = cus.get('first_due_date')
    term_months = int(_num(cus.get('installment_count'), 0) or 0)

    if not first_due or term_months <= 0:
        return None

    if isinstance(first_due, str):
        first_due = date.fromisoformat(first_due)

    maturity_date = first_due + relativedelta(months=term_months - 1)
    return maturity_date.isoformat()

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

    # ============================================================
    # Monthly default policy
    # ============================================================
    # ถ้า due อยู่ในเดือนมีนาคม และขอ report วันที่ 31/03
    # ยังถือว่าเป็นสถานะของเดือนมีนาคม: ยังไม่ผิดนัดรายเดือน
    # ต้องเริ่มผิดนัดรายเดือนวันที่ 01 ของเดือนถัดไปเท่านั้น
    oldest_due_str = target_row.get('oldest_due')
    default_date = None
    default_amount = None
    dpd_months = target_row.get('dpd_months', 0)
    ncb_months = target_row.get('ncb_months', '31')

    if oldest_due_str:
        oldest_due_date = date.fromisoformat(oldest_due_str)
        first_of_next = date(oldest_due_date.year, oldest_due_date.month, 1) + relativedelta(months=1)

        if report_date >= first_of_next:
            default_date = first_of_next.isoformat()
            default_row = None
            for row in reversed(daily_rows):
                if row.get('date') <= default_date:
                    default_row = row
                    break
            default_amount = _calc_remaining_from_daily_row(cus, default_row)
        else:
            # ยังอยู่ในเดือนของ due เอง เช่น report 31/03 ของ due 04/03
            # ห้ามแสดงวันผิดนัด/ยอดหนี้วันผิดนัด และให้สถานะรายเดือนเป็น 31
            dpd_months = 0
            ncb_months = '31'

    principal_bal_raw = target_row.get('T', 0)
    acc_interest_raw = target_row.get('O', 0)
    outstanding_raw = target_row.get('outstanding', 0)

    return {
        # เก็บค่าแสดงผล 2 ตำแหน่งไว้เหมือนเดิม เพื่อไม่กระทบจุดอื่นที่อาจใช้ field เดิม
        'principal_bal'      : _round_money(principal_bal_raw),
        'acc_interest'       : _round_money(acc_interest_raw),
        'outstanding'        : _round_money(outstanding_raw),

        # เก็บค่าดิบไว้ใช้รวมยอดหนี้ก่อนปัดเศษครั้งเดียว
        # ป้องกันปัญหา 60313.418332 ถูกคำนวณจากค่าที่ถูกปัดแยกส่วนจนเหลือ 60313.41
        'principal_bal_raw'  : principal_bal_raw,
        'acc_interest_raw'   : acc_interest_raw,
        'outstanding_raw'    : outstanding_raw,
        'remaining_debt_raw' : _calc_remaining_from_daily_row(cus, target_row),

        'default_date'       : default_date,
        'default_amount'     : default_amount,
        'dpd_days'           : target_row.get('dpd_days', 0),
        'dpd_months'         : dpd_months,
        'ncb_days'           : target_row.get('ncb_days', '31'),
        'ncb_months'         : ncb_months,
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


def _dec(v, default='0'):
    try:
        if v is None or v == '':
            return Decimal(default)
        return Decimal(str(v))
    except (InvalidOperation, ValueError, TypeError):
        return Decimal(default)


def _round_money(v, default=0.0):
    try:
        return float(_dec(v).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))
    except Exception:
        return default


def _get_principal_sued(cus, fallback=None):
    return (
        cus.get('filing_capital') or
        cus.get('principal_sued') or
        fallback or
        0
    )


def _calc_diff_debt(cus):
    return (
        _num(cus.get('court_fee')) +
        _num(cus.get('lawyer_fee')) +
        _num(cus.get('total_debt')) -
        _num(cus.get('principal'))
    )


def _calc_remaining_from_values(cus, principal_bal=0, acc_interest=0):
    total = (
        _dec(principal_bal) +
        _dec(acc_interest) +
        _dec(_calc_diff_debt(cus))
    )
    return float(total)


def _calc_remaining_from_daily_row(cus, row):
    if not row:
        return None
    return _calc_remaining_from_values(
        cus,
        principal_bal=row.get('T', 0),
        acc_interest=row.get('O', 0),
    )


def _calc_remaining_debt(cus, snap):
    if not snap:
        return _round_money(cus.get('total_debt'))

    if snap.get('remaining_debt_raw') is not None:
        return _round_money(snap.get('remaining_debt_raw'))

    return _round_money(_calc_remaining_from_values(
        cus,
        principal_bal=snap.get('principal_bal_raw', snap.get('principal_bal', 0)),
        acc_interest=snap.get('acc_interest_raw', snap.get('acc_interest', 0)),
    ))


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
        # ยังไม่ผิดนัดรายเดือนในเดือนของ due เอง
        # เช่น due 04/03 แล้วขอ report 31/03 → default_date/default_amount ต้องว่าง
        is_monthly_default = bool(
            snap
            and snap.get('default_date')
            and str(snap.get('ncb_months')) == '30'
        )

        base.update({
            'judgment_debt'  : _num(cus.get('total_debt')),
            'judgment_date'  : cus.get('judgment_date'),
            'default_amount' : snap.get('default_amount') if is_monthly_default else None,
            'default_date'   : snap.get('default_date') if is_monthly_default else None,
            'dpd'            : snap.get('dpd_months') if is_monthly_default else None,
            'dpd_months'     : snap.get('dpd_months') if is_monthly_default else None,
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
    installment_count = int(_num(cus.get('installment_count'), 0) or 0)
    frequency = '30' if installment_count > 1 else '00'
    maturity_date = get_maturity_date(cus)

    diff_debt = (
        float(cus.get('court_fee') or 0) +
        float(cus.get('lawyer_fee') or 0) +
        float(cus.get('total_debt') or 0) -
        float(cus.get('principal') or 0)
    )

    amount_owed = (
        _dec(snap.get('principal_bal_raw', snap.get('principal_bal', 0))) +
        _dec(snap.get('acc_interest_raw', snap.get('acc_interest', 0))) +
        _dec(diff_debt)
    )

    # Grace Period รายเดือน:
    # ถ้า due อยู่ในเดือนเดียวกับวันที่ขอ report และยังไม่ถึงวันที่ 1 ของเดือนถัดไป
    # get_snapshot_at_date() จะยังไม่มี default_date และตั้ง dpd_months = 0
    # ดังนั้น Amount Past Due ต้องเป็น 0.00 จนกว่าจะเกิด default รายเดือนจริง
    is_monthly_default = bool(snap and snap.get('default_date'))
    amount_past_due = snap.get('outstanding') if is_monthly_default else 0

    return {
        'account_no'         : account_no,
        'amount_owed'        : _round_money(amount_owed),
        'amount_past_due'    : _round_money(amount_past_due),
        'dpd'                : snap.get('dpd_months') if is_monthly_default else 0,
        'default_date'       : snap.get('default_date') if is_monthly_default else '',
        'installment_amount' : inst_amount,
        'installment_count'  : installment_count,
        'frequency'          : frequency,
        'maturity_date'      : maturity_date,
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