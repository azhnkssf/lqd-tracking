from calendar import monthrange
from datetime import date, timedelta
from decimal import Decimal, ROUND_HALF_UP, InvalidOperation
import json
from dateutil.relativedelta import relativedelta
from app.services.closure_service import get_actual_closed_date
from app.services.judgment_service import calculate_judgment_difference
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
    'ปิดบัญชี'         : '11',
}

RETROACTIVE_ENFORCEMENT_REASON_CODE = 'RETROACTIVE_ENFORCEMENT_REPORT_FIX'
RETROACTIVE_JUDGMENT_REASON_CODE = 'RETROACTIVE_JUDGMENT_REPORT_FIX'
REPORT_MODE_NORMAL = 'normal'

REPORT30_HEADERS = [
    'เลขที่บัญชี',
    'ยอดเงินส่งฟ้อง (เงินต้น+ดอกเบี้ย)',
    'วันที่ส่งฟ้องศาล',
    'ยอดเงินที่ศาลตัดสิน',
    'วันที่ศาลตัดสิน',
    'ค่างวดคงเหลือ',
    'วันที่กลับมาผิดนัดชำระ',
    'จำนวนวันผิดนัดชำระ',
    'หมายเหตุ',
    'หมายเหตุ 2',
    'หมายเหตุ 3',
    'หมายเหตุ Litigation',
]

REPORT31_HEADERS = [
    'PN segment identifier',
    'Family Name1',
    'First Name',
    'Date of birth',
    'Customer Type',
    'ID segment identifier',
    'ID Type',
    'ID Number',
    'PA Segment Identifier',
    'Issue Country',
    'Address 1',
    'Address 2',
    'Address 3',
    'Subdistrict',
    'District',
    'Province',
    'Country',
    'Postal code',
    'TL Segment Identifier',
    'Current / New Member Code',
    'Current / New Member Name',
    'Current / New Account number',
    'Account Type',
    'Currency code',
    'Date Account Opened',
    'Date Of Last Payment',
    'Amount Owed',
    'Amount Past Due',
    'Days Number Of Days Past Due',
    'Default Date',
    'Installment Frequency',
    'Installment Amount',
    'Installment Number of Payment',
    'Account Status',
    'Restructure Code',
    'Loan Objective',
    'Debt of Last Debt Restructuring',
    'Percent Payment',
    'Type Of Unit',
    'Make of Goods',
    'Model Number',
    'Chassis Number',
    'Maturity date',
    'Branch code',
    'Payment Terms',
    'Title',
    'Collateral Id',
    'Old Loan Account Number',
    'First Payment Date',
    'Status',
    'Reason Description',
    'วันที่พิพากษา',
    'ยอดหนี้พิพากษา',
    'หมายเหตุ Litigation',
]


def _get_report_group(cus, snap):
    case          = (cus.get('case_status') or 'ยื่นฟ้อง').strip()
    principal_bal = snap.get('principal_bal', 0) if snap else 0

    if principal_bal == 0 or case == 'ปิดบัญชี':
        return '11'

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


def _parse_report_date(val):
    """แปลงวันที่หลายรูปแบบเป็น date เพื่อใช้เทียบ as of report date"""
    if not val:
        return None
    if isinstance(val, date):
        return val

    s = str(val).strip().split('T')[0].split(' ')[0]
    if not s or s.lower() in ['none', 'null', '-']:
        return None

    try:
        if len(s) == 8 and s.isdigit():
            return date(int(s[0:4]), int(s[4:6]), int(s[6:8]))
        if '-' in s:
            parts = s.split('-')
            if len(parts) == 3 and len(parts[0]) == 4:
                return date(int(parts[0]), int(parts[1]), int(parts[2]))
        if '/' in s:
            parts = s.split('/')
            if len(parts) == 3:
                if len(parts[0]) == 4:
                    return date(int(parts[0]), int(parts[1]), int(parts[2]))
                return date(int(parts[2]), int(parts[1]), int(parts[0]))
    except Exception:
        return None
    return None


def _fmt_date_yyyymmdd(val):
    d = _parse_report_date(val)
    return d.strftime('%Y%m%d') if d else ''


def _fmt_month_yyyymm(val):
    d = _parse_report_date(val)
    return d.strftime('%Y%m') if d else ''


def _same_month(d1, d2):
    d1 = _parse_report_date(d1)
    d2 = _parse_report_date(d2)
    if not d1 or not d2:
        return False
    return d1.year == d2.year and d1.month == d2.month


def _month_key(val):
    d = _parse_report_date(val)
    return d.strftime('%Y-%m') if d else None


def _month_label(month_key):
    if not month_key or '-' not in str(month_key):
        return month_key or ''
    year, month = str(month_key).split('-', 1)
    return f'{month}/{year}'


def _is_before_month(d1, d2):
    d1 = _parse_report_date(d1)
    d2 = _parse_report_date(d2)
    if not d1 or not d2:
        return False
    return (d1.year, d1.month) < (d2.year, d2.month)


def _get_case_effective_date(cus, payments=None):
    """
    วันที่ที่เคสควรถูกนับเข้า report ตามสถานะปัจจุบัน
    ใช้เพื่อกันข้อมูลที่เกิดหลัง As of Report Date ไม่ให้ย้อนมาออกในรายงานเดือนก่อน
    """
    case_status = (cus.get('case_status') or 'ยื่นฟ้อง').strip()

    if case_status == 'ยื่นฟ้อง':
        return _parse_report_date(cus.get('filing_date'))

    if case_status == 'พิพากษาฝ่ายเดียว':
        return _parse_report_date(cus.get('judgment_date')) or _parse_report_date(cus.get('filing_date'))

    if case_status == 'บังคับคดี':
        return (
            _parse_report_date(cus.get('enforcement_judgment_date')) or
            _parse_report_date(cus.get('enforcement_received_date')) or
            _parse_report_date(cus.get('enforcement_date')) or
            _parse_report_date(cus.get('judgment_date')) or
            _parse_report_date(cus.get('filing_date'))
        )

    if case_status == 'พิพากษาตามยอม':
        return _parse_report_date(cus.get('judgment_date')) or _parse_report_date(cus.get('filing_date'))

    if case_status == 'ปิดบัญชี':
        return _parse_report_date(_get_closed_date(cus, payments))

    return _parse_report_date(cus.get('filing_date'))


def _get_retroactive_mark(db, account_no, affected_report_month, reason_code=RETROACTIVE_ENFORCEMENT_REASON_CODE):
    if not db or not account_no or not affected_report_month:
        return None
    try:
        row = db.execute('''
            SELECT m.*, u.display_name AS marked_by_name
            FROM report_retroactive_fix_marks m
            LEFT JOIN users u ON u.id = m.marked_by
            WHERE m.account_no = ?
              AND m.affected_report_month = ?
              AND m.reason_code = ?
            LIMIT 1
        ''', (account_no, affected_report_month, reason_code)).fetchone()
        return dict(row) if row else None
    except Exception:
        return None


def _get_status_log_transition(cus, from_status=None, to_statuses=None):
    logs = cus.get('_case_status_logs') or []
    to_statuses = set(to_statuses or [])
    for log in reversed(logs):
        log_from = str(log.get('from_status') or '').strip()
        log_to = str(log.get('to_status') or '').strip()
        if from_status is not None and log_from != from_status:
            continue
        if to_statuses and log_to not in to_statuses:
            continue
        return log
    return None


def _get_judgment_recorded_date(cus):
    recorded_date = _parse_report_date(cus.get('judgment_recorded_at'))
    if recorded_date:
        return recorded_date

    log = _get_status_log_transition(
        cus,
        from_status='ยื่นฟ้อง',
        to_statuses=('พิพากษาฝ่ายเดียว', 'พิพากษาตามยอม'),
    )
    return _parse_report_date(log.get('changed_at')) if log else None


def _get_manual_judgment_edit_recorded_date(cus, db=None):
    if not db or not cus or not cus.get('account_no'):
        return None

    effective_date = _parse_report_date(cus.get('judgment_date'))
    if not effective_date:
        return None

    try:
        rows = db.execute('''
            SELECT edited_at, changes
            FROM customer_edits
            WHERE account_no = ?
            ORDER BY edited_at DESC, id DESC
        ''', (cus.get('account_no'),)).fetchall()
    except Exception:
        return None

    for row in rows:
        try:
            changes = json.loads(row['changes'] or '{}')
        except Exception:
            continue
        if not isinstance(changes, dict) or 'judgment_date' not in changes:
            continue

        change = changes.get('judgment_date')
        if not isinstance(change, dict):
            continue

        new_value = _parse_report_date(change.get('to'))
        recorded_date = _parse_report_date(row['edited_at'])
        if new_value == effective_date and recorded_date:
            return recorded_date

    return None


def _get_enforcement_recorded_date(cus):
    recorded_date = _parse_report_date(cus.get('enforcement_recorded_at'))
    if recorded_date:
        return recorded_date

    log = _get_status_log_transition(cus, to_statuses=('บังคับคดี',))
    return _parse_report_date(log.get('changed_at')) if log else None


def _is_alert_effective_for_report(alert, report_date_str):
    report_month = _month_key(report_date_str)
    affected_month = alert.get('affected_report_month') if alert else None
    return bool(report_month and affected_month and report_month == affected_month)


def _is_alert_remark_effective_for_report(alert, report_date_str):
    # affected_report_month = historical report month to correct.
    # source_report_month = report month where the warning remark should appear.
    report_month = _month_key(report_date_str)
    source_month = alert.get('source_report_month') if alert else None
    return bool(report_month and source_month and report_month == source_month)


def build_retroactive_enforcement_alert(cus, db=None, report_date_str=None, include_marked=True):
    """
    ตรวจเคสบังคับคดีที่วันที่หมายมีผลอยู่ก่อนเดือนที่บันทึกเข้าระบบ
    เพื่อเตือนว่ารายงานเดือนเก่าอาจต้องถูกแก้ย้อนหลังตาม effective date จริง
    """
    if not cus:
        return None

    if db and not cus.get('_case_status_logs'):
        cus = _attach_case_status_log_context(cus, db)

    if (cus.get('case_status') or '').strip() != 'บังคับคดี':
        return None

    # Retroactive enforcement alert ต้องมีเฉพาะ
    # พิพากษาตามยอม(31) -> บังคับคดี(30)
    # พิพากษาฝ่ายเดียว(30) -> บังคับคดี(30) ไม่ต้อง alert เพราะ report group ไม่เปลี่ยน
    from_status = _get_status_before_enforcement(cus)
    if from_status != 'พิพากษาตามยอม':
        return None

    effective_date = _get_enforcement_effective_date(cus)
    if not effective_date:
        return None

    recorded_date = _get_enforcement_recorded_date(cus)
    if not recorded_date:
        return None

    if not _is_before_month(effective_date, recorded_date):
        return None

    from_group = CASE_STATUS_REPORT_MAP.get(from_status)
    to_group = CASE_STATUS_REPORT_MAP.get('บังคับคดี')
    if from_group and to_group and from_group == to_group:
        return None

    affected_report_month = _month_key(effective_date)
    source_report_month = _month_key(recorded_date)
    mark = _get_retroactive_mark(db, cus.get('account_no'), affected_report_month, RETROACTIVE_ENFORCEMENT_REASON_CODE)
    if mark and not include_marked:
        return None

    affected_label = _month_label(affected_report_month)
    source_label = _month_label(source_report_month)
    message = (
        f'วันที่ของหมายบังคับคดีอยู่ในเดือน {affected_label} '
        f'กรุณาตรวจสอบ/แก้รายงานเดือน {affected_label} เป็นต้นไป'
    )
    if source_label and source_label != affected_label:
        message = (
            f'วันที่ของหมายบังคับคดีอยู่ในเดือน {affected_label} '
            f'แต่กำลังตรวจรายงานเดือน {source_label} '
            f'กรุณาตรวจสอบ/แก้รายงานเดือน {affected_label} เป็นต้นไป'
        )

    return {
        'type'                  : 'enforcement',
        'account_no'            : cus.get('account_no'),
        'name'                  : cus.get('name'),
        'case_status'           : cus.get('case_status'),
        'from_status'           : from_status,
        'to_status'             : 'บังคับคดี',
        'effective_date'        : effective_date.isoformat(),
        'enforcement_date'      : effective_date.isoformat(),
        'recorded_date'         : recorded_date.isoformat(),
        'affected_report_month' : affected_report_month,
        'affected_month_label'  : affected_label,
        'source_report_month'   : source_report_month,
        'source_month_label'    : source_label,
        'reason_code'           : RETROACTIVE_ENFORCEMENT_REASON_CODE,
        'reason'                : message,
        'marked'                : bool(mark),
        'marked_at'             : mark.get('marked_at') if mark else None,
        'marked_by'             : mark.get('marked_by') if mark else None,
        'marked_by_name'        : mark.get('marked_by_name') if mark else None,
        'note'                  : mark.get('note') if mark else None,
    }


def build_retroactive_judgment_alert(cus, db=None, report_date_str=None, include_marked=True):
    if not cus:
        return None

    if db and not cus.get('_case_status_logs'):
        cus = _attach_case_status_log_context(cus, db)

    current_status = (cus.get('case_status') or '').strip()
    # Retroactive judgment alert only creates warning metadata.
    # It must not change report grouping or calculation logic.
    # ยื่นฟ้อง(30) -> พิพากษาตามยอม(31) may need report review.
    # ยื่นฟ้อง(30) -> พิพากษาฝ่ายเดียว(30) stays in Report 30, but judgment columns may need review.
    if current_status not in ('พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'):
        return None

    effective_date = _parse_report_date(cus.get('judgment_date'))
    recorded_date = _get_judgment_recorded_date(cus)
    if not effective_date or not recorded_date:
        manual_recorded_date = _get_manual_judgment_edit_recorded_date(cus, db=db)
        if not effective_date or not manual_recorded_date:
            return None
        recorded_date = manual_recorded_date

    if not _is_before_month(effective_date, recorded_date):
        manual_recorded_date = _get_manual_judgment_edit_recorded_date(cus, db=db)
        if not manual_recorded_date or not _is_before_month(effective_date, manual_recorded_date):
            return None
        recorded_date = manual_recorded_date

    affected_report_month = _month_key(effective_date)
    source_report_month = _month_key(recorded_date)
    mark = _get_retroactive_mark(db, cus.get('account_no'), affected_report_month, RETROACTIVE_JUDGMENT_REASON_CODE)
    if mark and not include_marked:
        return None

    affected_label = _month_label(affected_report_month)
    source_label = _month_label(source_report_month)
    message = (
        f'วันที่พิพากษาอยู่ในเดือน {affected_label} '
        f'แต่บันทึกเข้าระบบภายหลัง กรุณาตรวจสอบ/แก้รายงานเดือน {affected_label} เป็นต้นไป'
    )
    if source_label and source_label != affected_label:
        message = (
            f'วันที่พิพากษาอยู่ในเดือน {affected_label} '
            f'แต่บันทึกเข้าระบบเดือน {source_label} '
            f'กรุณาตรวจสอบ/แก้รายงานเดือน {affected_label} เป็นต้นไป'
        )

    return {
        'type'                  : 'judgment',
        'account_no'            : cus.get('account_no'),
        'name'                  : cus.get('name'),
        'case_status'           : cus.get('case_status'),
        'from_status'           : 'ยื่นฟ้อง',
        'to_status'             : current_status,
        'effective_date'        : effective_date.isoformat(),
        'judgment_date'         : effective_date.isoformat(),
        'recorded_date'         : recorded_date.isoformat(),
        'affected_report_month' : affected_report_month,
        'affected_month_label'  : affected_label,
        'source_report_month'   : source_report_month,
        'source_month_label'    : source_label,
        'reason_code'           : RETROACTIVE_JUDGMENT_REASON_CODE,
        'reason'                : message,
        'marked'                : bool(mark),
        'marked_at'             : mark.get('marked_at') if mark else None,
        'marked_by'             : mark.get('marked_by') if mark else None,
        'marked_by_name'        : mark.get('marked_by_name') if mark else None,
        'note'                  : mark.get('note') if mark else None,
    }


def build_retroactive_alerts(cus, db=None, report_date_str=None, include_marked=True):
    alerts = []
    judgment_alert = build_retroactive_judgment_alert(
        cus, db=db, report_date_str=report_date_str, include_marked=include_marked
    )
    if judgment_alert:
        alerts.append(judgment_alert)

    enforcement_alert = build_retroactive_enforcement_alert(
        cus, db=db, report_date_str=report_date_str, include_marked=include_marked
    )
    if enforcement_alert:
        alerts.append(enforcement_alert)

    return alerts


def build_correction_summary(retroactive_alerts, report_date_str=None):
    relevant_alerts = [
        alert for alert in (retroactive_alerts or [])
        if _is_alert_effective_for_report(alert, report_date_str)
    ]
    pending = [alert for alert in relevant_alerts if not alert.get('marked')]
    return {
        'has_pending_corrections': bool(pending),
        'pending_total': len(pending),
        'pending_judgment': sum(1 for alert in pending if alert.get('type') == 'judgment'),
        'pending_enforcement': sum(1 for alert in pending if alert.get('type') == 'enforcement'),
        'total': len(relevant_alerts),
        'judgment_total': sum(1 for alert in relevant_alerts if alert.get('type') == 'judgment'),
        'enforcement_total': sum(1 for alert in relevant_alerts if alert.get('type') == 'enforcement'),
    }


def build_correction_summary_by_source_month(retroactive_alerts, report_date_str=None):
    report_month = _month_key(report_date_str)
    relevant_alerts = [
        alert for alert in (retroactive_alerts or [])
        if str(alert.get('source_report_month') or '') == report_month
    ]
    pending = [alert for alert in relevant_alerts if not alert.get('marked')]
    return {
        'has_pending_corrections': bool(pending),
        'pending_total': len(pending),
        'pending_judgment': sum(1 for alert in pending if alert.get('type') == 'judgment'),
        'pending_enforcement': sum(1 for alert in pending if alert.get('type') == 'enforcement'),
        'total': len(relevant_alerts),
        'judgment_total': sum(1 for alert in relevant_alerts if alert.get('type') == 'judgment'),
        'enforcement_total': sum(1 for alert in relevant_alerts if alert.get('type') == 'enforcement'),
    }


def _is_customer_effective_after_report(cus, report_date_str, payments=None):
    effective_date = _get_case_effective_date(cus, payments)
    report_date = _parse_report_date(report_date_str)
    return bool(effective_date and report_date and effective_date > report_date)


def _future_effective_reason(cus, report_date_str, payments=None):
    effective_date = _get_case_effective_date(cus, payments)
    report_date = _parse_report_date(report_date_str)
    if not effective_date or not report_date or effective_date <= report_date:
        return None

    case_status = (cus.get('case_status') or 'ยื่นฟ้อง').strip()
    filing_date = _parse_report_date(cus.get('filing_date'))
    if filing_date and filing_date > report_date:
        return (
            'FILING_DATE_AFTER_REPORT',
            'วันที่ยื่นฟ้องอยู่หลังวันที่ Report',
            filing_date.isoformat(),
        )

    reason_map = {
        'ยื่นฟ้อง': (
            'FILING_DATE_AFTER_REPORT',
            'วันที่ยื่นฟ้องอยู่หลังวันที่ Report',
        ),
        'พิพากษาฝ่ายเดียว': (
            'JUDGMENT_DATE_AFTER_REPORT',
            'วันที่พิพากษาอยู่หลังวันที่ Report',
        ),
        'พิพากษาตามยอม': (
            'JUDGMENT_DATE_AFTER_REPORT',
            'วันที่พิพากษาอยู่หลังวันที่ Report',
        ),
        'บังคับคดี': (
            'ENFORCEMENT_DATE_AFTER_REPORT',
            'วันที่บังคับคดี/วันที่มีผลของสถานะอยู่หลังวันที่ Report',
        ),
        'ปิดบัญชี': (
            'CLOSED_DATE_AFTER_REPORT',
            'วันที่ปิดบัญชีอยู่หลังวันที่ Report',
        ),
    }
    code, text = reason_map.get(case_status, (
        'EFFECTIVE_DATE_AFTER_REPORT',
        'วันที่มีผลของสถานะอยู่หลังวันที่ Report',
    ))
    return code, text, effective_date.isoformat()


def _get_enforcement_effective_date(cus):
    """
    วันที่ที่สถานะบังคับคดีมีผลจริงสำหรับ snapshot report
    ใช้วันที่ของหมาย/วันที่ได้รับหมายเป็นหลัก ไม่ใช้วันที่บันทึกเข้าระบบ
    """
    if not cus:
        return None

    return (
        _parse_report_date(cus.get('enforcement_judgment_date')) or
        _parse_report_date(cus.get('enforcement_received_date')) or
        _parse_report_date(cus.get('enforcement_date'))
    )


def _get_status_before_enforcement(cus):
    """
    หา status ก่อนเปลี่ยนเป็นบังคับคดี
    Source priority:
    1) case_status_logs: log ที่ to_status = 'บังคับคดี'
    2) _report_file_status จาก master file ถ้าเป็นสถานะที่ถูกต้อง
    3) judgment type/status fields ใน customer
    4) fallback = 'ยื่นฟ้อง'
    """
    if not cus:
        return 'ยื่นฟ้อง'

    logs = cus.get('_case_status_logs') or []
    for log in reversed(logs):
        to_status = str(log.get('to_status') or '').strip()
        from_status = str(log.get('from_status') or '').strip()
        if to_status == 'บังคับคดี' and from_status:
            if from_status in ('ยื่นฟ้อง', 'พิพากษาฝ่ายเดียว', 'พิพากษาตามยอม'):
                return from_status

    file_status = str(cus.get('_report_file_status') or cus.get('file_status') or '').strip()
    if file_status in ('ยื่นฟ้องแล้ว_คดีดำ', 'ยื่นฟ้อง'):
        return 'ยื่นฟ้อง'
    if file_status in ('พิพากษาฝ่ายเดียว', 'พิพากษาตามยอม'):
        return file_status

    candidates = [
        cus.get('judgment_type'),
        cus.get('judgment_kind'),
        cus.get('judgment_result'),
        cus.get('judgment_status'),
        cus.get('case_judgment_type'),
        cus.get('judgment_method'),
        cus.get('judgment_category'),
        cus.get('judgment_type_name'),
        cus.get('previous_case_status'),
        cus.get('prev_case_status'),
        cus.get('case_status_before_enforcement'),
        cus.get('before_enforcement_status'),
        cus.get('original_case_status'),
    ]
    text = ' '.join(str(v or '') for v in candidates)

    if 'ฝ่ายเดียว' in text:
        return 'พิพากษาฝ่ายเดียว'
    if 'ตามยอม' in text:
        return 'พิพากษาตามยอม'

    # ถ้ามี judgment_date แต่ไม่รู้ชนิดคำพิพากษา ให้ fallback ไปฝ่ายเดียว
    # เพราะ report 30 ของระบบรองรับฝ่ายเดียวเป็นหลัก และปลอดภัยกว่าโยนทิ้ง
    if cus.get('judgment_date'):
        return 'พิพากษาฝ่ายเดียว'

    return 'ยื่นฟ้อง'


def _get_status_before_closed(cus):
    if not cus:
        return 'ยื่นฟ้อง'

    valid_previous_statuses = ('ยื่นฟ้อง', 'พิพากษาฝ่ายเดียว', 'พิพากษาตามยอม', 'บังคับคดี')
    logs = cus.get('_case_status_logs') or []
    for log in reversed(logs):
        to_status = str(log.get('to_status') or '').strip()
        from_status = str(log.get('from_status') or '').strip()
        if to_status == 'ปิดบัญชี' and from_status in valid_previous_statuses:
            return from_status

    if (
        cus.get('enforcement_judgment_date') or
        cus.get('enforcement_received_date') or
        cus.get('enforcement_date')
    ):
        return 'บังคับคดี'

    if cus.get('judgment_date'):
        candidates = [
            cus.get('judgment_type'),
            cus.get('judgment_kind'),
            cus.get('judgment_result'),
            cus.get('judgment_status'),
            cus.get('case_judgment_type'),
            cus.get('judgment_method'),
            cus.get('judgment_category'),
            cus.get('judgment_type_name'),
            cus.get('previous_case_status'),
            cus.get('prev_case_status'),
            cus.get('original_case_status'),
        ]
        text = ' '.join(str(v or '') for v in candidates)
        if 'ตามยอม' in text:
            return 'พิพากษาตามยอม'
        return 'พิพากษาฝ่ายเดียว'

    return 'ยื่นฟ้อง'


def _build_customer_as_of_report_date(cus, report_date_str, report_mode=REPORT_MODE_NORMAL, retroactive_alerts=None, payments=None):
    """
    คืน customer dict ที่มี case_status ถูกต้อง ณ report_date

    สำคัญ:
    - ถ้า current status = บังคับคดี แต่ enforcement date > report_date
      ให้ rollback case_status ไปเป็นสถานะก่อนบังคับคดี
    - ไม่แก้ DB
    - ไม่ลบ enforcement fields เดิม เพราะอาจยังใช้แสดง remark/diagnostic ใน flow อื่น
    """
    if not cus:
        return cus

    report_date = _parse_report_date(report_date_str)
    if not report_date:
        return cus

    current_status = str(cus.get('case_status') or 'ยื่นฟ้อง').strip()
    filing_date = _parse_report_date(cus.get('filing_date'))
    if filing_date and filing_date > report_date:
        return cus

    pending_alert = None
    marked_alerts = []
    for alert in retroactive_alerts or []:
        if not _is_alert_remark_effective_for_report(alert, report_date_str):
            continue
        if alert.get('marked'):
            marked_alerts.append(alert)
            continue
        if pending_alert is None:
            pending_alert = alert

    if pending_alert or marked_alerts:
        cus = dict(cus)
        if pending_alert:
            cus['_pending_correction_alert'] = pending_alert
        if marked_alerts:
            cus['_marked_correction_alerts'] = marked_alerts

    if current_status == 'ปิดบัญชี':
        closed_date = _parse_report_date(_get_closed_date(cus, payments))
        if closed_date and closed_date > report_date:
            previous_status = _get_status_before_closed(cus)

            cus_as_of = dict(cus)
            cus_as_of['case_status'] = previous_status
            cus_as_of['_latest_case_status'] = current_status
            cus_as_of['_snapshot_rolled_back_from_status'] = current_status
            cus_as_of['_snapshot_rolled_back_to_status'] = previous_status
            cus_as_of['_snapshot_rollback_reason'] = 'CLOSED_AFTER_REPORT_DATE'
            cus_as_of['_snapshot_closed_effective_date'] = closed_date.isoformat()
            return cus_as_of

        return cus

    if current_status in ('พิพากษาฝ่ายเดียว', 'พิพากษาตามยอม'):
        judgment_date = _parse_report_date(cus.get('judgment_date'))
        if judgment_date and judgment_date > report_date:
            cus_as_of = dict(cus)
            cus_as_of['case_status'] = 'ยื่นฟ้อง'
            cus_as_of['_latest_case_status'] = current_status
            cus_as_of['_snapshot_rolled_back_from_status'] = current_status
            cus_as_of['_snapshot_rolled_back_to_status'] = 'ยื่นฟ้อง'
            cus_as_of['_snapshot_rollback_reason'] = 'JUDGMENT_AFTER_REPORT_DATE'
            cus_as_of['_snapshot_judgment_effective_date'] = judgment_date.isoformat()
            return cus_as_of

    if current_status != 'บังคับคดี':
        return cus

    enforcement_effective_date = _get_enforcement_effective_date(cus)
    if not enforcement_effective_date or enforcement_effective_date <= report_date:
        return cus

    previous_status = _get_status_before_enforcement(cus)

    cus_as_of = dict(cus)
    cus_as_of['case_status'] = previous_status
    cus_as_of['_latest_case_status'] = current_status
    cus_as_of['_snapshot_rolled_back_from_status'] = current_status
    cus_as_of['_snapshot_rolled_back_to_status'] = previous_status
    cus_as_of['_snapshot_rollback_reason'] = 'ENFORCEMENT_AFTER_REPORT_DATE'
    cus_as_of['_snapshot_enforcement_effective_date'] = enforcement_effective_date.isoformat()

    return cus_as_of


def _append_text(existing, text):
    existing = str(existing or '').strip()
    text = str(text or '').strip()
    if not text:
        return existing
    if not existing:
        return text
    if text in existing:
        return existing
    return f'{existing} | {text}'


def _correction_warning_text(alert):
    if not alert:
        return ''
    affected_label = alert.get('affected_month_label') or _month_label(alert.get('affected_report_month'))
    if alert.get('type') == 'judgment':
        return f'มีคำพิพากษาย้อนหลัง กรุณาตรวจสอบ/แก้รายงานเดือน {affected_label} เป็นต้นไป'
    if alert.get('type') == 'enforcement':
        return f'มีหมายบังคับคดีย้อนหลัง กรุณาตรวจสอบ/แก้รายงานเดือน {affected_label} เป็นต้นไป'
    return ''


def apply_correction_warning_remark(row, cus):
    alert = (cus or {}).get('_pending_correction_alert')
    warning = _correction_warning_text(alert)
    if not row or not warning:
        return row

    if 'report31_litigation_remark' in row:
        row['report31_litigation_remark'] = _append_text(
            row.get('report31_litigation_remark') or row.get('remark'),
            warning,
        )[:100]
        row['remark'] = row['report31_litigation_remark']
    elif 'report30_litigation_remark' in row or 'report30_note' in row:
        row['report30_litigation_remark'] = _append_text(
            row.get('report30_litigation_remark') or row.get('remark'),
            warning,
        )
        row['remark'] = row['report30_litigation_remark']
    elif 'remark' in row:
        row['remark'] = _append_text(row.get('remark'), warning)

    return row


def _build_not_generated_row(cus, reason_code, reason_text, report_date_str, effective_date=None, payments=None):
    return {
        'account_no'     : cus.get('account_no'),
        'name'           : cus.get('name'),
        'case_status'    : cus.get('case_status'),
        'filing_date'    : cus.get('filing_date'),
        'judgment_date'  : cus.get('judgment_date'),
        'enforcement_date': (
            cus.get('enforcement_judgment_date') or
            cus.get('enforcement_received_date') or
            cus.get('enforcement_date')
        ),
        'closed_date'    : _get_closed_date(cus, payments),
        'effective_date' : effective_date,
        'report_date'    : report_date_str,
        'reason_code'    : reason_code,
        'reason'         : reason_text,
    }


def _attach_case_status_log_context(cus, db):
    """
    แนบประวัติ case_status_logs เข้า cus เพื่อใช้กับรายงาน:
    - Remark สำหรับ พิพากษาตามยอม -> บังคับคดี
    - วันที่ปิดบัญชี สำหรับ Status 11

    ไม่แก้ข้อมูลใน DB และไม่เปลี่ยน business logic เดิมของการจัดกลุ่มรายงาน
    """
    if not cus or not db:
        return cus

    account_no = cus.get('account_no')
    if not account_no:
        return cus

    try:
        rows = db.execute("""
            SELECT from_status, to_status, changed_at, note
            FROM case_status_logs
            WHERE account_no = ?
            ORDER BY changed_at ASC, id ASC
        """, (account_no,)).fetchall()
        logs = [dict(r) for r in rows]
    except Exception:
        logs = []

    cus['_case_status_logs'] = logs

    consent_to_enforcement_log = None
    closed_log = None

    for log in logs:
        from_status = str(log.get('from_status') or '').strip()
        to_status = str(log.get('to_status') or '').strip()

        if consent_to_enforcement_log is None and from_status == 'พิพากษาตามยอม' and to_status == 'บังคับคดี':
            consent_to_enforcement_log = log

        if closed_log is None and to_status == 'ปิดบัญชี':
            closed_log = log

    cus['_consent_to_enforcement_log'] = consent_to_enforcement_log
    cus['_has_consent_to_enforcement_log'] = bool(consent_to_enforcement_log)
    cus['_closed_status_log'] = closed_log
    cus['_closed_date'] = _extract_date_from_log(closed_log) if closed_log else None

    return cus


def _extract_date_from_log(log):
    if not log:
        return None
    return _parse_report_date(log.get('changed_at'))


def _get_closed_date(cus, payments=None):
    """
    วันที่ปิดบัญชี = วันที่จ่ายเงินแล้วปิดบัญชีจริง
    ใช้ payment/schedule ก่อน เพื่อไม่ให้วันที่ import/refresh status กลายเป็นวันที่ปิดบัญชี
    """
    actual_closed_date = get_actual_closed_date(cus, payments or [])
    if actual_closed_date:
        return actual_closed_date

    closed_date = cus.get('_closed_date')
    if closed_date:
        return closed_date.isoformat()

    for log in cus.get('_case_status_logs') or []:
        if str(log.get('to_status') or '').strip() == 'ปิดบัญชี':
            d = _extract_date_from_log(log)
            if d:
                return d.isoformat()

    # fallback เผื่ออนาคตมี column ปิดบัญชีโดยตรง แต่ไม่เปลี่ยน logic หลัก
    for key in ['closed_date', 'closed_at', 'close_date', 'closed_account_date', 'paid_off_date']:
        d = _parse_report_date(cus.get(key))
        if d:
            return d.isoformat()

    return None


def _is_consent_enforcement_case(cus):
    """
    จำกัด Remark เฉพาะเคสพิพากษาตามยอมที่เปลี่ยนมาเป็นบังคับคดี

    เหตุผลที่ต้องดู _report_file_status:
    - ตอน Generate from File สถานะในระบบอาจเป็น "บังคับคดี" แล้ว
    - แต่สถานะใน Master File ยังบอกต้นทางว่าเป็น "พิพากษาตามยอม"
    - ถ้าไม่ส่ง file_status เข้ามา function นี้จะมองไม่ออกว่าเป็นตามยอมมาก่อน
      ทำให้ Remark ไม่แสดง
    """
    if (cus.get('case_status') or '').strip() != 'บังคับคดี':
        return False

    # Source of truth ที่ชัดที่สุด: ประวัติการเปลี่ยนสถานะใน case_status_logs
    if cus.get('_has_consent_to_enforcement_log'):
        return True

    # Generate from File: ใช้สถานะจาก Master File เป็นตัวบอกว่าเคสนี้เป็นตามยอมมาก่อน
    file_status = str(cus.get('_report_file_status') or cus.get('file_status') or '').strip()
    if file_status == 'พิพากษาตามยอม':
        return True

    # Generate from Database: ไม่มี Master File ให้ดูจาก field ประเภทคำพิพากษา/สถานะเดิมใน DB
    candidates = [
        cus.get('judgment_type'),
        cus.get('judgment_kind'),
        cus.get('judgment_result'),
        cus.get('judgment_status'),
        cus.get('case_judgment_type'),
        cus.get('judgment_method'),
        cus.get('judgment_category'),
        cus.get('judgment_type_name'),
        cus.get('previous_case_status'),
        cus.get('prev_case_status'),
        cus.get('case_status_before_enforcement'),
        cus.get('before_enforcement_status'),
        cus.get('original_case_status'),
    ]
    text = ' '.join(str(v or '') for v in candidates)
    return 'ตามยอม' in text


def _get_enforcement_from_status(cus):
    for log in reversed(cus.get('_case_status_logs') or []):
        if str(log.get('to_status') or '').strip() == 'บังคับคดี':
            return str(log.get('from_status') or '').strip()
    return ''


def _build_enforcement_remark(cus, snap, report_date_str):
    """
    Remark สำหรับเคสพิพากษาตามยอมที่เปลี่ยนเป็นบังคับคดี
    แสดงเฉพาะเดือนที่บันทึกหมายบังคับคดีเข้าระบบ เมื่อวันที่ของหมายอยู่ก่อนเดือนที่บันทึก
    """
    if not _is_consent_enforcement_case(cus):
        return ''

    for alert in cus.get('_marked_correction_alerts') or []:
        if (
            alert.get('type') == 'enforcement'
            and _is_alert_remark_effective_for_report(alert, report_date_str)
        ):
            return ''

    effective_date = (
        _parse_report_date(cus.get('enforcement_judgment_date')) or
        _parse_report_date(cus.get('enforcement_effective_date')) or
        _parse_report_date(cus.get('enforcement_received_date')) or
        _parse_report_date(cus.get('enforcement_date'))
    )
    recorded_date = _get_enforcement_recorded_date(cus)
    if not effective_date or not recorded_date:
        return ''

    if not _is_before_month(effective_date, recorded_date):
        return ''

    if report_date_str and _month_key(report_date_str) != _month_key(recorded_date):
        return ''

    enforcement_yyyymmdd = _fmt_date_yyyymmdd(effective_date)
    if not enforcement_yyyymmdd:
        return ''

    enforcement_date_text = f'{enforcement_yyyymmdd[:4]}-{enforcement_yyyymmdd[4:6]}-{enforcement_yyyymmdd[6:8]}'
    enforcement_month_text = f'{enforcement_yyyymmdd[:4]}-{enforcement_yyyymmdd[4:6]}'

    return f'บัญชีนี้วันที่ของหมายบังคับคดีเป็น {enforcement_date_text} ต้องตรวจสอบแก้ไขรายงานย้อนหลังตั้งแต่เดือน {enforcement_month_text} เป็นต้นมา'

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
    default_date = None
    default_amount = None
    dpd_months = target_row.get('dpd_months', 0)
    ncb_months = target_row.get('ncb_months', '31')

    # Default Date ต้องเป็นวันที่ผิดนัดชำระรายเดือน "ครั้งแรก" ที่เกิดขึ้นจริง
    # ไม่ใช่วันที่คำนวณจาก oldest_due ปัจจุบัน เพราะยอดชำระภายหลังอาจตัดงวดเก่า
    # จน oldest_due ขยับ แต่วันที่ผิดนัดครั้งแรกต้องคงเดิมในรายงาน
    for row in daily_rows:
        row_date_str = row.get('date')
        oldest_due_str = row.get('oldest_due')
        if not row_date_str or not oldest_due_str or row_date_str > report_date.isoformat():
            continue

        row_date = date.fromisoformat(row_date_str)
        oldest_due_date = date.fromisoformat(oldest_due_str)
        first_of_next = date(oldest_due_date.year, oldest_due_date.month, 1) + relativedelta(months=1)

        if row_date >= first_of_next and _num(row.get('outstanding'), 0) > 0:
            default_date = first_of_next.isoformat()
            default_row = None
            for candidate in reversed(daily_rows):
                if candidate.get('date') <= default_date:
                    default_row = candidate
                    break
            default_amount = _calc_remaining_from_daily_row(cus, default_row)
            break

    oldest_due_str = target_row.get('oldest_due')
    if oldest_due_str and not default_date:
        oldest_due_date = date.fromisoformat(oldest_due_str)
        first_of_next = date(oldest_due_date.year, oldest_due_date.month, 1) + relativedelta(months=1)

        if report_date < first_of_next:
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
        'oldest_due'         : oldest_due_str,
        'oldest_due_amount'  : target_row.get('oldest_due_amount', 0),
        'dpd_days'           : target_row.get('dpd_days', 0),
        'dpd_months'         : dpd_months,
        'ncb_days'           : target_row.get('ncb_days', '31'),
        'ncb_months'         : ncb_months,
    }


def get_report30_snapshot_at_date(cus, payments, report_date):
    """
    Report 30 only:
    บังคับคดีที่มาจากพิพากษาฝ่ายเดียวต้องยังใช้ฐานคำนวณ default
    แบบฝ่ายเดียว เพื่อให้ยอดหนี้วันผิดนัดชำระ/วันผิดนัดชำระไม่หายไป
    หลัง case_status ถูกเปลี่ยนเป็นบังคับคดีแล้ว
    """
    if (
        (cus.get('case_status') or '').strip() == 'บังคับคดี'
        and _get_enforcement_from_status(cus) == 'พิพากษาฝ่ายเดียว'
    ):
        default_judgment_cus = dict(cus)
        default_judgment_cus['case_status'] = 'พิพากษาฝ่ายเดียว'
        snap = get_snapshot_at_date(default_judgment_cus, payments, report_date)
        if snap:
            return snap

    return get_snapshot_at_date(cus, payments, report_date)


def process_registry_file(ws, db, report_date_str):
    report_30     = []
    report_31     = []
    report_11     = []
    alerts        = []
    not_generated = []
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

        # Block รายการที่วันที่ยื่นฟ้องจริงอยู่หลัง As of Report Date
        if filing_date and _parse_report_date(filing_date) and _parse_report_date(report_date_str) and _parse_report_date(filing_date) > _parse_report_date(report_date_str):
            not_generated.append({
                'account_no'     : account_no,
                'name'           : None,
                'case_status'    : file_status,
                'filing_date'    : filing_date,
                'judgment_date'  : judgment_date,
                'enforcement_date': None,
                'closed_date'    : None,
                'effective_date' : filing_date,
                'report_date'    : report_date_str,
                'reason_code'    : 'FILING_DATE_AFTER_REPORT',
                'reason'         : 'วันที่ยื่นฟ้องจากไฟล์อยู่หลังวันที่ Report',
            })
            continue

        if not account_no or file_status not in VALID_STATUSES:
            continue

        file_accounts.add(account_no)

        cus_row = db.execute(
            'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0',
            (account_no,)
        ).fetchone()
        cus = dict(cus_row) if cus_row else None
        if cus:
            # เก็บสถานะจาก Master File ไว้ให้ logic Remark รู้ว่า
            # เคสนี้มาจาก "พิพากษาตามยอม" แต่ในระบบเปลี่ยนเป็น "บังคับคดี" แล้ว
            cus['_report_file_status'] = file_status
            cus = _attach_case_status_log_context(cus, db)

        # Block เคสที่สถานะ/วันที่สำคัญเกิดหลัง As of Report Date
        # เช่น กรอกเคสยื่นฟ้องเดือนเมษายน แต่ขอ report สิ้นเดือนมีนาคม
        effective_payments = None
        if cus and (cus.get('case_status') or '').strip() == 'ปิดบัญชี':
            effective_payments = db.execute(
                'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
                (account_no,)
            ).fetchall()
            effective_payments = [dict(p) for p in effective_payments]

        # Build customer snapshot as of report_date before applying future-effective blocking.
        # Important case:
        # current DB status may already be 'บังคับคดี', but enforcement date may be after report_date.
        # In that situation the report must use the previous valid status as of report_date,
        # not move the row to Not Generated.
        cus_for_report = _build_customer_as_of_report_date(
            cus,
            report_date_str,
            payments=effective_payments,
        ) if cus else None

        if cus_for_report and _is_customer_effective_after_report(cus_for_report, report_date_str, effective_payments):
            reason = _future_effective_reason(cus_for_report, report_date_str, effective_payments)
            if reason:
                not_generated.append(_build_not_generated_row(
                    cus_for_report, reason[0], reason[1], report_date_str, reason[2], effective_payments
                ))
            continue

        if cus_for_report:
            cus = cus_for_report

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
                report_30.append(_apply_report30_new_fields({
                    'account_no'      : account_no,
                    'status_label'    : f'{file_status} (ไม่มีใน DB)',
                    'case_status'     : f'{file_status} (ไม่มีใน DB)',
                    'filing_date'     : filing_date,
                    'principal_sued'  : principal_sued,
                    'pre_filing_default_date': None,
                    'judgment_debt'   : judgment_debt,
                    'judgment_date'   : judgment_date,
                    'default_amount'  : None,
                    'default_date'    : None,
                    'dpd'             : None,
                    'dpd_months'      : None,
                    'remaining_debt'  : None,
                    'remark'          : '',
                },
                    filing_date=filing_date,
                    filing_amount=principal_sued,
                    judgment_debt=judgment_debt,
                    judgment_date=judgment_date,
                ))
            continue

        # ============================================================
        # มีใน DB — คำนวณ snapshot แล้วจัดกลุ่มตาม case_status
        # ============================================================
        payments = effective_payments
        if payments is None:
            payments = db.execute(
                'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
                (account_no,)
            ).fetchall()
            payments = [dict(p) for p in payments]

        snap = get_report30_snapshot_at_date(cus, payments, report_date_str)
        if not snap:
            not_generated.append(_build_not_generated_row(
                cus,
                'NO_SNAPSHOT',
                'ไม่สามารถคำนวณ snapshot ณ วันที่ Report ได้',
                report_date_str,
            ))
            continue

        group = _get_report_group(cus, snap)

        if group == '11':
            report_11.append(_build_report11_row(account_no, cus, payments))

        elif group == '30':
            report_30.append(_build_report30_row_from_db(
                account_no,
                cus.get('case_status', file_status),
                cus.get('filing_date') or filing_date,
                principal_sued,
                cus,
                snap,
                report_date_str,
                payments=payments
            ))

        elif group == '31':
            report_31.append(_build_report31_row(
                account_no, cus, snap, report_date_str, payments=payments
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
        'report_11'  : report_11,
        'alerts'     : alerts,
        'missing_db' : missing_db,
        'not_generated': not_generated,
    }


def _num(v, default=0.0):
    try:
        if v is None or v == '':
            return default
        return float(v)
    except Exception:
        return default


def _int_num(v, default=0):
    try:
        return int(float(v or 0))
    except Exception:
        return default


def _report30_filing_elapsed_days(cus, report_date_str):
    filing_date = _parse_report_date(cus.get('filing_date'))
    report_date = _parse_report_date(report_date_str)
    if not filing_date or not report_date or report_date < filing_date:
        return 0
    return (report_date - filing_date).days + 1


def _report30_default_judgment_dpd(cus, report_date_str):
    return (
        _int_num(cus.get('pre_filing_dpd_days'), 0) +
        _report30_filing_elapsed_days(cus, report_date_str)
    )


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
    return calculate_judgment_difference(cus)


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


def _end_of_month(d):
    if not d:
        return None
    return date(d.year, d.month, monthrange(d.year, d.month)[1])


def _is_end_of_month(d):
    return bool(d and d.day == monthrange(d.year, d.month)[1])


def _report30_grace_end(due_date):
    """
    Report 30 grace policy:
    - due date กลางเดือน: grace ถึงสิ้นเดือนเดียวกัน
    - due date สิ้นเดือน: grace ถึงสิ้นเดือนถัดไป
    """
    if not due_date:
        return None

    if _is_end_of_month(due_date):
        return _end_of_month(due_date + relativedelta(months=1))

    return _end_of_month(due_date)


def _safe_iso_date(val):
    if not val:
        return None
    if isinstance(val, date):
        return val
    try:
        return date.fromisoformat(str(val).strip().split('T')[0].split(' ')[0])
    except Exception:
        return None


def _calculate_report30_default_context(cus, payments, report_date_str):
    """
    ใช้เฉพาะ Report 30 ใหม่

    first_default_due_date:
    - วันที่ due จริงของงวดแรกที่ผิดนัดหลังพ้น grace
    - เป็นค่าที่ต้องคงที่ ไม่เปลี่ยนตาม oldest_due ปัจจุบัน

    current_dpd_days:
    - DPD ปัจจุบันของยอดค้าง ณ วัน report
    - ล้างได้เมื่อจ่ายครบ และนับใหม่เมื่อกลับมาค้างใหม่
    """
    context = _calculate_current_installment_default_context(cus, payments or [], report_date_str)
    return {
        'default_date': context.get('default_date'),
        'first_default_due_date': context.get('current_oldest_default_due_date'),
        'current_due_for_dpd': context.get('current_oldest_default_due_date'),
        'current_dpd_days': context.get('dpd') if context.get('default_date') else None,
        'current_oldest_default_due_date': context.get('current_oldest_default_due_date'),
        'amount_past_due': context.get('amount_past_due', 0.0),
    }


def _apply_report30_new_fields(
    row,
    filing_date='',
    filing_amount='',
    judgment_debt='',
    judgment_date='',
    first_default_date='',
    dpd_days='',
    remaining_debt='',
    note='',
    note_2='',
    note_3='',
    litigation_remark='',
):
    """
    เพิ่ม key ใหม่สำหรับ Report 30 New Format
    โดยยังเก็บ key เดิมของ row ไว้เพื่อ backward compatibility
    """
    row.update({
        'report30_account_no': row.get('account_no'),
        'report30_filing_date': filing_date or '',
        'report30_filing_amount': filing_amount if filing_amount is not None else '',
        'report30_judgment_debt': judgment_debt if judgment_debt is not None else '',
        'report30_judgment_date': judgment_date or '',
        'report30_first_default_date': first_default_date or '',
        'report30_dpd_days': dpd_days if dpd_days is not None else '',
        'report30_remaining_debt': remaining_debt if remaining_debt is not None else '',
        'report30_note': note or '',
        'report30_note_2': note_2 or '',
        'report30_note_3': note_3 or '',
        'report30_litigation_remark': litigation_remark or '',
    })
    return row


def _first_present(row, *keys):
    for key in keys:
        val = row.get(key)
        if val is not None and val != '':
            return val
    return ''


def build_report30_export_values(row, fmt_acc, fmt_date_excel, fmt_num):
    """
    สร้าง row สำหรับ Excel ตาม Header ใหม่ของ Report 30
    ใช้ได้ทั้ง export เดี่ยวและ export-all
    """
    judgment_debt = _first_present(row, 'report30_judgment_debt', 'judgment_debt')
    remaining_debt = _first_present(row, 'report30_remaining_debt', 'remaining_debt')
    filing_amount = _first_present(row, 'report30_filing_amount', 'principal_sued')

    return [
        fmt_acc(_first_present(row, 'report30_account_no', 'account_no')),
        fmt_num(filing_amount, 2) if filing_amount != '' else '',
        fmt_date_excel(_first_present(row, 'report30_filing_date', 'filing_date')),
        fmt_num(judgment_debt, 2) if judgment_debt != '' else '',
        fmt_date_excel(_first_present(row, 'report30_judgment_date', 'judgment_date')),
        fmt_num(remaining_debt, 2) if remaining_debt != '' else '',
        fmt_date_excel(_first_present(row, 'report30_first_default_date')),
        _first_present(row, 'report30_dpd_days'),
        _first_present(row, 'report30_note'),
        _first_present(row, 'report30_note_2'),
        _first_present(row, 'report30_note_3'),
        _first_present(row, 'report30_litigation_remark', 'remark'),
    ]


def _report31_installment_amount_for_term(cus, term):
    insts = [
        _num(cus.get('installment_1'), 0),
        _num(cus.get('installment_2'), 0),
        _num(cus.get('installment_3'), 0),
        _num(cus.get('installment_4'), 0),
    ]
    filled = [v for v in insts if v > 0]
    if not filled:
        return 0.0

    if len(filled) == 1:
        return filled[0]
    if term == 1:
        return filled[0]
    if term == 2:
        return filled[1] if len(filled) >= 2 else filled[0]
    if term == 3:
        return filled[2] if len(filled) >= 3 else filled[-1]
    return filled[3] if len(filled) >= 4 else filled[-1]


def _report31_due_date(term, first_due):
    if _is_end_of_month(first_due):
        return _end_of_month(first_due + relativedelta(months=term - 1))
    return get_due_date(term, first_due)


def _report31_installment_buckets(cus, cutoff_date):
    first_due = _parse_report_date(cus.get('first_due_date'))
    installment_count = int(_num(cus.get('installment_count'), 0) or 0)
    if not first_due or installment_count <= 0 or not cutoff_date:
        return []

    buckets = []
    for term in range(1, installment_count + 1):
        due_date = _report31_due_date(term, first_due)
        if due_date > cutoff_date:
            break
        amount = _report31_installment_amount_for_term(cus, term)
        if amount <= 0:
            continue
        buckets.append({
            'term': term,
            'due_date': due_date,
            'amount': _dec(amount),
            'remaining': _dec(amount),
        })
    return buckets


def _report31_allocate_payments(cus, payments, cutoff_date):
    buckets = _report31_installment_buckets(cus, cutoff_date)
    if not buckets:
        return []

    payment_total = Decimal('0')
    for payment in payments or []:
        payment_date = _parse_report_date(payment.get('payment_date'))
        if not payment_date or payment_date > cutoff_date:
            continue
        amount = _dec(payment.get('amount'))
        if amount > 0:
            payment_total += amount

    for bucket in buckets:
        if payment_total <= 0:
            break
        if payment_total >= bucket['remaining']:
            payment_total -= bucket['remaining']
            bucket['remaining'] = Decimal('0')
        else:
            bucket['remaining'] -= payment_total
            payment_total = Decimal('0')
            break

    return buckets


def _report31_default_check_date(due_date):
    if not due_date:
        return None
    if _is_end_of_month(due_date):
        return _end_of_month(due_date + relativedelta(months=1))
    return _end_of_month(due_date)


def _default_start_date_from_due(due_date):
    due_date = _parse_report_date(due_date)
    return due_date + timedelta(days=1) if due_date else None


def _dpd_days_from_default_start(report_date, default_start_date):
    report_date = _parse_report_date(report_date)
    default_start_date = _parse_report_date(default_start_date)
    if not report_date or not default_start_date or default_start_date > report_date:
        return 0
    return (report_date - default_start_date).days + 1


def _calculate_current_installment_default_context(cus, payments, report_date_str):
    report_date = _parse_report_date(report_date_str)
    if not report_date:
        return {
            'amount_past_due': 0.0,
            'dpd': 0,
            'default_date': None,
            'current_oldest_default_due_date': None,
            'current_oldest_unpaid_due_date': None,
            'amount_due_total': 0.0,
            'default_bucket_count': 0,
        }

    current_buckets = _report31_allocate_payments(cus, payments or [], report_date)
    amount_due_buckets = [
        bucket for bucket in current_buckets
        if bucket['due_date'] <= report_date and bucket['remaining'] > 0
    ]
    default_buckets = [
        bucket for bucket in amount_due_buckets
        if _default_start_date_from_due(bucket['due_date']) <= report_date
    ]

    amount_due_total = sum((bucket['remaining'] for bucket in amount_due_buckets), Decimal('0'))
    amount_past_due = amount_due_total if default_buckets else Decimal('0')
    oldest_default_due = default_buckets[0]['due_date'] if default_buckets else None
    default_date = _default_start_date_from_due(oldest_default_due) if oldest_default_due else None

    return {
        'amount_past_due': float(amount_past_due),
        'dpd': _dpd_days_from_default_start(report_date, default_date) if default_date else 0,
        'default_date': default_date.isoformat() if default_date else None,
        'current_oldest_default_due_date': oldest_default_due.isoformat() if oldest_default_due else None,
        'current_oldest_unpaid_due_date': amount_due_buckets[0]['due_date'].isoformat() if amount_due_buckets else None,
        'amount_due_total': float(amount_due_total),
        'default_bucket_count': len(default_buckets),
    }


def _calculate_report31_default_context(cus, payments, report_date_str):
    """
    Report 31-specific FIFO installment view.

    This keeps Report 31 daily DPD/amount-past-due independent from
    get_snapshot_at_date(), whose monthly behavior is shared by other reports.
    """
    context = _calculate_current_installment_default_context(cus, payments or [], report_date_str)
    return {
        **context,
        'first_default_due_date': context.get('current_oldest_default_due_date'),
    }


def build_report31_export_values(row, fmt_acc, fmt_date_excel, fmt_num):
    values = [''] * len(REPORT31_HEADERS)
    values[21] = fmt_acc(_first_present(row, 'account_no'))
    values[26] = fmt_num(_first_present(row, 'amount_owed'), 0)
    values[27] = fmt_num(_first_present(row, 'amount_past_due'), 0)
    values[28] = int(_first_present(row, 'dpd') or 0)
    values[29] = fmt_date_excel(_first_present(row, 'default_date'), default='19000101')
    values[30] = str(_first_present(row, 'installment_frequency', 'frequency') or '0')
    values[31] = fmt_num(_first_present(row, 'installment_amount'), 0)
    values[32] = int(_first_present(row, 'installment_count') or 0)
    values[34] = str(_first_present(row, 'restructure_code') or '02')
    values[36] = fmt_date_excel(_first_present(row, 'debt_of_last_debt_restructuring', 'judgment_date'))
    values[42] = fmt_date_excel(_first_present(row, 'maturity_date'))
    values[-1] = str(_first_present(row, 'report31_litigation_remark', 'remark') or '')[:100]
    return values


def _build_report30_row_from_db(account_no, status, filing_date, principal_sued, cus, snap=None, report_date_str=None, payments=None):
    case_status = (status or cus.get('case_status') or '').strip()

    base = {
        'account_no'               : account_no,
        'status_label'             : case_status,
        'case_status'              : case_status,
        'filing_date'              : filing_date or cus.get('filing_date'),
        'principal_sued'           : _num(_get_principal_sued(cus, principal_sued)),
        'pre_filing_default_date'  : cus.get('default_date'),
        'judgment_debt'            : None,
        'judgment_date'            : None,
        'default_amount'           : None,
        'default_date'             : None,
        'dpd'                      : None,
        'dpd_months'               : None,
        'remaining_debt'           : None,
        'remark'                   : '',
        'enforcement_order_no'     : cus.get('enforcement_order_no'),
        'enforcement_judgment_date': cus.get('enforcement_judgment_date'),
    }

    filing_value = filing_date or cus.get('filing_date')
    filing_amount = _num(_get_principal_sued(cus, principal_sued))

    if case_status == 'ยื่นฟ้อง':
        return _apply_report30_new_fields(
            base,
            filing_date=filing_value,
            filing_amount=filing_amount,
            note='คดีแพ่ง',
            note_2='ฟ้องแล้ว',
            note_3='1.1',
        )

    if case_status == 'พิพากษาฝ่ายเดียว':
        base.update({
            'judgment_debt'  : _num(cus.get('total_debt')),
            'judgment_date'  : cus.get('judgment_date'),
            'default_amount' : snap.get('default_amount') if snap else None,
            'remaining_debt' : _calc_remaining_debt(cus, snap),
        })

        return _apply_report30_new_fields(
            base,
            filing_date=filing_value,
            filing_amount=filing_amount,
            judgment_debt=_num(cus.get('total_debt')),
            judgment_date=cus.get('judgment_date'),
            first_default_date='',
            dpd_days='',
            remaining_debt=_calc_remaining_debt(cus, snap),
            note='คดีแพ่ง',
            note_2='พิพากษาฝ่ายเดียว',
            note_3='1.5',
        )

    if case_status == 'บังคับคดี':
        enforcement_from_status = _get_enforcement_from_status(cus)
        is_consent_enforcement = (
            enforcement_from_status == 'พิพากษาตามยอม'
            or _is_consent_enforcement_case(cus)
        )
        report30_dpd = snap.get('dpd_months') if (is_consent_enforcement and snap) else None
        base.update({
            'judgment_debt'  : _num(cus.get('total_debt')),
            'judgment_date'  : cus.get('judgment_date'),
            'default_amount' : snap.get('default_amount') if (is_consent_enforcement and snap) else None,
            'default_date'   : snap.get('default_date') if (is_consent_enforcement and snap) else None,
            'dpd'            : report30_dpd,
            'dpd_months'     : report30_dpd,
            'remaining_debt' : _calc_remaining_debt(cus, snap),
            'remark'         : _build_enforcement_remark(cus, snap, report_date_str),
        })
        if enforcement_from_status == 'พิพากษาฝ่ายเดียว':
            return _apply_report30_new_fields(
                base,
                filing_date=filing_value,
                filing_amount=filing_amount,
                judgment_debt=_num(cus.get('total_debt')),
                judgment_date=cus.get('judgment_date'),
                first_default_date='',
                dpd_days='',
                remaining_debt=_calc_remaining_debt(cus, snap),
                note='คดีแพ่ง',
                note_2='พิพากษาฝ่ายเดียว',
                note_3='1.5',
                litigation_remark=base.get('remark') or '',
            )

        if is_consent_enforcement:
            default_context = _calculate_report30_default_context(cus, payments or [], report_date_str)
            return _apply_report30_new_fields(
                base,
                filing_date='',
                filing_amount=filing_amount,
                first_default_date=default_context.get('default_date'),
                dpd_days=default_context.get('current_dpd_days'),
                remaining_debt=_calc_remaining_debt(cus, snap),
                note='คดีแพ่ง',
                note_2='พิพากษาตามยอม',
                note_3='1.8',
                litigation_remark=base.get('remark') or '',
            )

        return _apply_report30_new_fields(
            base,
            filing_date=filing_value,
            filing_amount=filing_amount,
            judgment_debt=_num(cus.get('total_debt')),
            judgment_date=cus.get('judgment_date'),
            remaining_debt=_calc_remaining_debt(cus, snap),
            note='คดีแพ่ง',
            note_2='บังคับคดี',
            note_3='',
            litigation_remark=base.get('remark') or '',
        )

    return _apply_report30_new_fields(
        base,
        filing_date=filing_value,
        filing_amount=filing_amount,
    )


def _build_report31_row(account_no, cus, snap, report_date_str, payments=None):
    """สร้าง row Report 31"""
    inst_amount = get_installment_for_month(cus, report_date_str)
    installment_count = int(_num(cus.get('installment_count'), 0) or 0)
    frequency = '3' if installment_count > 1 else '0'
    maturity_date = get_maturity_date(cus)
    default_context = _calculate_report31_default_context(cus, payments or [], report_date_str)

    diff_debt = _calc_diff_debt(cus)

    amount_owed = (
        _dec(snap.get('principal_bal_raw', snap.get('principal_bal', 0))) +
        _dec(snap.get('acc_interest_raw', snap.get('acc_interest', 0))) +
        _dec(diff_debt)
    )

    return {
        'account_no'                         : account_no,
        'amount_owed'                        : float(amount_owed),
        'amount_past_due'                    : default_context.get('amount_past_due', 0),
        'dpd'                                : default_context.get('dpd', 0),
        'default_date'                       : default_context.get('default_date') or '',
        'installment_frequency'              : frequency,
        'installment_amount'                 : inst_amount,
        'installment_count'                  : installment_count,
        'frequency'                          : frequency,
        'restructure_code'                   : '02',
        'debt_of_last_debt_restructuring'    : cus.get('judgment_date') or '',
        'maturity_date'                      : maturity_date,
        'ncb_status'                         : snap.get('ncb_months'),
        'report31_litigation_remark'         : '',
        'remark'                             : '',
    }
    
def _build_report11_row(account_no, cus, payments=None):
    """สร้าง row Status 11 (ปิดบัญชี)"""
    return {
        'account_no'   : account_no,
        'closed_date'  : _get_closed_date(cus, payments),
        'ncb_status'   : '11',
        'status_label' : 'ปิดบัญชี',
    }

# Backward-compatible alias: old code that still imports _build_report33_row will continue to work.
_build_report33_row = _build_report11_row
