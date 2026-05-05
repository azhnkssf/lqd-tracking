import json
import io
import re
import openpyxl
from datetime import date
from flask import Blueprint, request, jsonify, send_file
from app.database import get_db
from app.services.auth_service import get_user_by_token
from app.services.status_service import refresh_customer_status
from app.services.report_service import get_snapshot_at_date
from dateutil.relativedelta import relativedelta

bp = Blueprint('customers', __name__, url_prefix='/api/customers')

CASE_STATUS_TRANSITIONS = {
    'ยื่นฟ้อง'         : ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'],
    'พิพากษาตามยอม'   : ['บังคับคดี'],
    'พิพากษาฝ่ายเดียว': ['บังคับคดี'],
    'บังคับคดี'        : ['ปิดบัญชี'],
}


def get_current_user():
    token = request.cookies.get('token') or request.headers.get('Authorization', '').replace('Bearer ', '')
    return get_user_by_token(token)


def _log_case_status(db, account_no, from_status, to_status, changed_by, note=''):
    db.execute('''
        INSERT INTO case_status_logs
        (account_no, from_status, to_status, changed_by, note)
        VALUES (?, ?, ?, ?, ?)
    ''', (account_no, from_status, to_status, changed_by, note))


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


def _is_over_grace_period(cus, today=None):
    """
    Grace period rule:
    - due date อยู่เดือนไหน ให้รอจนหมดเดือนนั้นก่อน
    - วันที่ 1 ของเดือนถัดไปเป็นต้นไป ถึงถือว่าเลย grace period
    """
    today = today or date.today()

    due_date = _parse_iso_date(cus.get('first_due_date'))
    if not due_date:
        return False

    return today >= _first_day_next_month(due_date)


def _payment_status_from_snapshot(cus, snap, payments=None, today=None):
    """
    สถานะสำหรับแสดงผลหน้า UI แบบคำนวณสด

    หมายเหตุ:
    - ไม่ควรเชื่อ payment_status ใน DB ตรง ๆ เพราะสถานะบางอย่างเปลี่ยนตามวันที่
    - เช่น ก่อนถึง first_due_date ต้องเป็น 'ยังไม่ถึงกำหนด'
    """
    today = today or date.today()
    payments = payments or []

    case_status = cus.get('case_status')

    if case_status == 'ปิดบัญชี':
        return 'ชำระครบแล้ว'

    if case_status == 'ยื่นฟ้อง':
        return 'ไม่มีแผนชำระ'

    first_due_date = _parse_iso_date(cus.get('first_due_date'))

    # ถ้ายังไม่ถึงกำหนดงวดแรก และยังไม่มี payment จริง
    # ให้แสดงเป็น "ยังไม่ถึงกำหนด" แทน "จ่ายปกติ"
    if first_due_date and today < first_due_date and len(payments) == 0:
        return 'ยังไม่ถึงกำหนด'

    outstanding = float((snap or {}).get('outstanding') or 0)
    dpd_days = int(float((snap or {}).get('dpd_days') or 0))
    dpd_months = int(float((snap or {}).get('dpd_months') or 0))

    if outstanding > 0 or dpd_days > 0 or dpd_months > 0:
        return 'ค้างชำระ'

    return 'จ่ายปกติ'


def _can_record_enforcement(cus, snap, today=None):
    today = today or date.today()

    allowed_status = ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว']
    outstanding = float((snap or {}).get('outstanding') or 0)

    has_enforcement_order = bool(
        cus.get('enforcement_order_no') or
        cus.get('enforcement_recorded_at')
    )

    return (
        cus.get('case_status') in allowed_status
        and outstanding > 0
        and not has_enforcement_order
        and _is_over_grace_period(cus, today)
    )


def _decorate_customer_for_ui(cus, payments=None, today=None):
    today = today or date.today()
    payments = payments or []

    try:
        snap = get_snapshot_at_date(cus, payments, today.isoformat())
    except Exception:
        snap = None

    computed_payment_status = _payment_status_from_snapshot(
        cus,
        snap,
        payments=payments,
        today=today
    )

    cus['latest_snapshot'] = snap

    # เก็บค่าเดิมจาก DB ไว้ ไม่ทับ เพื่อให้ตรวจสอบย้อนหลังได้
    cus['db_payment_status'] = cus.get('payment_status')

    # ค่าที่คำนวณสดสำหรับ UI
    cus['computed_payment_status'] = computed_payment_status
    cus['display_payment_status'] = computed_payment_status

    cus['can_record_enforcement'] = _can_record_enforcement(cus, snap, today)
    cus['has_enforcement_order'] = bool(
        cus.get('enforcement_order_no') or
        cus.get('enforcement_recorded_at')
    )

    return cus


@bp.route('', methods=['GET'])
def list_customers():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        page = max(1, int(request.args.get('page', 1)))
    except (TypeError, ValueError):
        page = 1
    try:
        per_page = min(100, max(1, int(request.args.get('per_page', 10))))
    except (TypeError, ValueError):
        per_page = 10
    account     = request.args.get('account_no', '').strip()
    name        = request.args.get('name', '').strip()
    case_status = request.args.get('case_status', '').strip()
    sort_by     = request.args.get('sort_by', '').strip()
    sort_dir    = request.args.get('sort_dir', 'desc').strip().lower()
    offset      = (page - 1) * per_page

    db = get_db()

    where  = ['is_deleted = 0']
    params = []

    if account:
        where.append('account_no LIKE ?')
        params.append(f'%{account}%')
    if name:
        where.append('name LIKE ?')
        params.append(f'%{name}%')
    if case_status:
        where.append('case_status = ?')
        params.append(case_status)

    where_clause = 'WHERE ' + ' AND '.join(where)
    sort_columns = {
        'account_no': 'account_no',
        'filing_date': 'filing_date',
        'judgment_date': 'judgment_date',
    }
    if sort_by in sort_columns:
        direction = 'ASC' if sort_dir == 'asc' else 'DESC'
        order_clause = f'ORDER BY {sort_columns[sort_by]} {direction}, id DESC'
    else:
        order_clause = 'ORDER BY id DESC'

    total = db.execute(
        f'SELECT COUNT(*) FROM customers {where_clause}', params
    ).fetchone()[0]

    rows = db.execute(
        f'SELECT * FROM customers {where_clause} {order_clause} LIMIT ? OFFSET ?',
        params + [per_page, offset]
    ).fetchall()

    summary = db.execute(
        'SELECT COALESCE(SUM(total_debt), 0) as total_value, COUNT(*) as active_count FROM customers WHERE case_status != "ปิดบัญชี" AND is_deleted = 0'
    ).fetchone()

    decorated_rows = []

    for r in rows:
        cus = dict(r)

        payments = db.execute(
            'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
            (cus['account_no'],)
        ).fetchall()
        payments = [dict(p) for p in payments]

        decorated_rows.append(_decorate_customer_for_ui(cus, payments))

    return jsonify({
        'data':     decorated_rows,
        'total':    total,
        'page':     page,
        'per_page': per_page,
        'summary': {
            'total_value':  summary['total_value'],
            'active_count': summary['active_count']
        }
    }), 200


@bp.route('', methods=['POST'])
def create_customer():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json() or {}

    required = ['account_no', 'name', 'filing_date', 'filing_capital']
    missing = [f for f in required if data.get(f) is None or data.get(f) == '']
    if missing:
        field_labels = {
            'account_no': 'หมายเลขบัญชี',
            'name': 'ชื่อ-นามสกุล',
            'filing_date': 'วันที่ยื่นฟ้อง',
            'filing_capital': 'ทุนทรัพย์ที่ฟ้อง',
        }
        missing_labels = [field_labels.get(f, f) for f in missing]
        return jsonify({'error': f'กรุณากรอกข้อมูลให้ครบ: {", ".join(missing_labels)}'}), 400

    account_no = str(data.get('account_no') or '').strip()
    name = str(data.get('name') or '').strip()
    filing_date = str(data.get('filing_date') or '').strip()
    filing_capital_text = str(data.get('filing_capital') or '').replace(',', '').strip()

    if not account_no.isdigit() or len(account_no) != 12:
        return jsonify({'error': 'เลขที่บัญชีต้องเป็นตัวเลข 12 หลัก'}), 400

    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', filing_date):
        return jsonify({'error': 'วันที่ยื่นฟ้องต้องเป็นรูปแบบ YYYY-MM-DD'}), 400

    if not re.fullmatch(r'\d+(\.\d{1,2})?', filing_capital_text):
        return jsonify({'error': 'ทุนทรัพย์ที่ฟ้องต้องเป็นตัวเลข และมีทศนิยมได้สูงสุด 2 ตำแหน่ง'}), 400

    filing_capital = round(float(filing_capital_text), 2)
    if filing_capital <= 0:
        return jsonify({'error': 'ทุนทรัพย์ที่ฟ้องต้องมากกว่า 0'}), 400

    db = get_db()

    existing = db.execute(
        'SELECT id FROM customers WHERE account_no = ?', (account_no,)
    ).fetchone()
    if existing:
        return jsonify({'error': 'เลขที่บัญชีนี้มีในระบบแล้ว'}), 409

    db.execute('''
        INSERT INTO customers (
            account_no, name, filing_date, filing_capital,
            case_status, created_by
        ) VALUES (?, ?, ?, ?, 'ยื่นฟ้อง', ?)
    ''', (
        account_no,
        name,
        filing_date,
        filing_capital,
        user['id']
    ))

    _log_case_status(db, account_no, None, 'ยื่นฟ้อง', user['id'], 'สร้างข้อมูลใหม่')
    db.commit()

    return jsonify({
        'message': 'บันทึกข้อมูลสำเร็จ',
        'account_no': account_no,
        'filing_capital': filing_capital
    }), 201


@bp.route('/<account_no>', methods=['GET'])
def get_customer(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db  = get_db()
    row = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone()

    if not row:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404

    cus = dict(row)

    payments = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
        (account_no,)
    ).fetchall()
    payments = [dict(p) for p in payments]

    cus = _decorate_customer_for_ui(cus, payments)

    return jsonify(cus), 200


@bp.route('/<account_no>/judgment', methods=['PATCH'])
def update_judgment(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()

    required = [
        'judgment_type', 'judgment_date', 'total_debt', 'principal',
        'interest_rate', 'installment_count', 'first_due_date', 'installment_1',
        'default_interest_rate',
    ]
    missing = [f for f in required if data.get(f) is None or data.get(f) == '']
    if missing:
        return jsonify({'error': f'กรุณากรอกข้อมูลให้ครบ: {", ".join(missing)}'}), 400

    db  = get_db()
    cus = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone()
    if not cus:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404
    cus = dict(cus)

    allowed = CASE_STATUS_TRANSITIONS.get('ยื่นฟ้อง', [])
    if cus['case_status'] != 'ยื่นฟ้อง':
        return jsonify({'error': f'ไม่สามารถบันทึกคำพิพากษาได้ สถานะปัจจุบันคือ {cus["case_status"]}'}), 400
    if data['judgment_type'] not in allowed:
        return jsonify({'error': f'judgment_type ต้องเป็น {" หรือ ".join(allowed)}'}), 400

    filing_date    = cus.get('filing_date', '')
    judgment_date  = data.get('judgment_date', '')
    first_due_date = data.get('first_due_date', '')

    if filing_date and judgment_date and judgment_date <= filing_date:
        return jsonify({'error': 'วันที่พิพากษาต้องมากกว่าวันที่ยื่นฟ้อง'}), 400

    # วันครบกำหนดงวดแรก
    # - พิพากษาตามยอม: ต้องมากกว่าวันที่พิพากษา
    # - พิพากษาฝ่ายเดียว: อนุญาตให้เป็นวันเดียวกับวันที่พิพากษาได้ แต่ห้ามน้อยกว่า
    judgment_type = data.get('judgment_type')
    if judgment_date and first_due_date:
        if judgment_type == 'พิพากษาฝ่ายเดียว':
            if first_due_date < judgment_date:
                return jsonify({'error': 'วันครบกำหนดงวดแรกต้องไม่น้อยกว่าวันที่พิพากษา'}), 400
        else:
            if first_due_date <= judgment_date:
                return jsonify({'error': 'วันครบกำหนดงวดแรกต้องมากกว่าวันที่พิพากษา'}), 400

    int_rate     = float(data.get('interest_rate', 0) or 0)
    default_rate = float(data.get('default_interest_rate', 0) or 0)
    if int_rate == 0 and default_rate == 0:
        return jsonify({'error': 'อัตราดอกเบี้ย/ปี และ ดอกเบี้ยเมื่อผิดนัด ต้องไม่เป็น 0 ทั้งคู่'}), 400
    total_debt = float(data.get('total_debt', 0) or 0)
    principal = float(data.get('principal', 0) or 0)
    court_fee = float(data.get('court_fee', 0) or 0)
    lawyer_fee = float(data.get('lawyer_fee', 0) or 0)

    # ใช้ BE เป็น source of truth สำหรับยอดหนี้ส่วนต่าง
    judgment_difference = (court_fee + lawyer_fee + total_debt) - principal

    try:
        first_due_d   = date.fromisoformat(first_due_date)
        last_due_date = (first_due_d + relativedelta(months=int(data['installment_count']) - 1)).isoformat()
    except Exception:
        last_due_date = data.get('last_due_date')

    db.execute('''
        UPDATE customers SET
            case_status           = ?,
            judgment_date         = ?,
            total_debt            = ?,
            principal             = ?,
            judgment_difference   = ?,
            interest_rate         = ?,
            court_fee             = ?,
            lawyer_fee            = ?,
            installment_count     = ?,
            default_interest_rate = ?,
            first_due_date        = ?,
            last_due_date         = ?,
            installment_1         = ?,
            installment_2         = ?,
            installment_3         = ?,
            installment_4         = ?,
            updated_at            = CURRENT_TIMESTAMP
        WHERE account_no = ? AND is_deleted = 0
    ''', (
        data['judgment_type'],
        judgment_date,
        total_debt,
        principal,
        judgment_difference,
        int_rate,
        court_fee,
        lawyer_fee,
        int(data['installment_count']),
        default_rate,
        first_due_date,
        last_due_date,
        float(data['installment_1']),
        float(data.get('installment_2', 0)),
        float(data.get('installment_3', 0)),
        float(data.get('installment_4', 0)),
        account_no
    ))

    _log_case_status(db, account_no, cus['case_status'], data['judgment_type'], user['id'], 'บันทึกคำพิพากษา')

    # บันทึก edit history
    JUDGMENT_LABELS = {
        'judgment_type':         'ประเภทคำพิพากษา',
        'judgment_date':         'วันพิพากษา',
        'total_debt':            'ยอดหนี้รวม',
        'principal':              'เงินต้น',
        'judgment_difference':    'ยอดหนี้ส่วนต่าง',
        'interest_rate':          'อัตราดอกเบี้ย',
        'court_fee':             'ค่าธรรมเนียมศาล',
        'lawyer_fee':            'ค่าทนาย',
        'installment_count':     'จำนวนงวด',
        'default_interest_rate': 'ดอกเบี้ยผิดนัด',
        'first_due_date':        'วันครบกำหนดงวดแรก',
        'installment_1':         'ค่างวด 1',
        'installment_2':         'ค่างวด 2',
        'installment_3':         'ค่างวด 3',
        'installment_4':         'ค่างวด 4',
    }
    data['judgment_difference'] = judgment_difference
    judgment_changes = {}
    for field, label in JUDGMENT_LABELS.items():
        old_val = cus.get(field) if field != 'judgment_type' else cus.get('case_status')
        new_val = data.get(field)
        if str(old_val) != str(new_val):
            judgment_changes[field] = {'label': label, 'from': old_val, 'to': new_val}

    if judgment_changes:
        db.execute(
            'INSERT INTO customer_edits (customer_id, account_no, edited_by, changes) VALUES (?, ?, ?, ?)',
            (cus['id'], account_no, user['id'], json.dumps(judgment_changes, ensure_ascii=False))
        )

    db.commit()

    refresh_customer_status(account_no, db)

    return jsonify({'message': 'บันทึกคำพิพากษาสำเร็จ', 'account_no': account_no, 'case_status': data['judgment_type']}), 200


@bp.route('/<account_no>/enforcement', methods=['PATCH'])
def update_enforcement(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()

    required = ['enforcement_order_no', 'enforcement_judgment_date', 'enforcement_received_date']
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({'error': f'กรุณากรอกข้อมูลให้ครบ: {", ".join(missing)}'}), 400

    db  = get_db()
    cus = db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone()
    if not cus:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404
    cus = dict(cus)

    allowed = ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว']
    if cus['case_status'] not in allowed:
        return jsonify({'error': f'ไม่สามารถบันทึกหมายบังคับคดีได้ สถานะปัจจุบันคือ {cus["case_status"]}'}), 400

    payments = db.execute(
        'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC', (account_no,)
    ).fetchall()
    payments = [dict(p) for p in payments]

    snap = get_snapshot_at_date(cus, payments, date.today().isoformat())
    if not snap:
        return jsonify({'error': 'ไม่สามารถคำนวณสถานะได้'}), 400

    if not _can_record_enforcement(cus, snap):
        return jsonify({'error': 'ลูกหนี้รายนี้ยังไม่เข้าเงื่อนไขบันทึกหมายบังคับคดี'}), 400

    db.execute('''
        UPDATE customers SET
            case_status               = 'บังคับคดี',
            enforcement_order_no      = ?,
            enforcement_judgment_date = ?,
            enforcement_received_date = ?,
            enforcement_recorded_by   = ?,
            enforcement_recorded_at   = CURRENT_TIMESTAMP,
            updated_at                = CURRENT_TIMESTAMP
        WHERE account_no = ? AND is_deleted = 0
    ''', (
        data['enforcement_order_no'],
        data['enforcement_judgment_date'],
        data['enforcement_received_date'],
        user['id'],
        account_no
    ))

    _log_case_status(db, account_no, cus['case_status'], 'บังคับคดี', user['id'], 'บันทึกหมายบังคับคดี')
    db.commit()

    return jsonify({'message': 'บันทึกหมายบังคับคดีสำเร็จ', 'account_no': account_no}), 200


@bp.route('/<account_no>/status-logs', methods=['GET'])
def get_status_logs(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db   = get_db()
    rows = db.execute('''
        SELECT csl.*, u.display_name as changed_by_name
        FROM case_status_logs csl
        LEFT JOIN users u ON u.id = csl.changed_by
        WHERE csl.account_no = ?
        ORDER BY csl.changed_at ASC
    ''', (account_no,)).fetchall()

    return jsonify({'logs': [dict(r) for r in rows]}), 200


@bp.route('/bulk-judgment', methods=['POST'])
def bulk_judgment():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    if user['role'] != 'admin':
        return jsonify({'error': 'เฉพาะ Admin เท่านั้น'}), 403

    if 'file' not in request.files:
        return jsonify({'error': 'กรุณาแนบไฟล์ Excel'}), 400

    file = request.files['file']
    if not file.filename.endswith('.xlsx'):
        return jsonify({'error': 'รองรับเฉพาะไฟล์ .xlsx'}), 400

    try:
        wb = openpyxl.load_workbook(file, data_only=True)
        ws = wb.active
    except Exception as e:
        return jsonify({'error': f'ไม่สามารถอ่านไฟล์ได้: {str(e)}'}), 400

    db      = get_db()
    results = []
    success = skip = error = 0

    for row_idx, row in enumerate(ws.iter_rows(min_row=3, values_only=True), start=3):
        if all(v is None for v in row):
            continue

        account_no    = str(row[0]).strip() if row[0] else None
        judgment_type = str(row[1]).strip() if row[1] else None

        if not account_no:
            results.append({'row': row_idx, 'status': 'error', 'message': 'account_no ว่างเปล่า'})
            error += 1
            continue

        if judgment_type not in ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว']:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error',
                            'message': 'judgment_type ต้องเป็น พิพากษาตามยอม หรือ พิพากษาฝ่ายเดียว'})
            error += 1
            continue

        cus = db.execute(
            'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
        ).fetchone()
        if not cus:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': 'ไม่พบในระบบ'})
            error += 1
            continue
        cus = dict(cus)

        if cus['case_status'] != 'ยื่นฟ้อง':
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'skip',
                            'message': f'สถานะปัจจุบันคือ {cus["case_status"]} ไม่ใช่ ยื่นฟ้อง'})
            skip += 1
            continue

        try:
            from dateutil.relativedelta import relativedelta as _rd
            judgment_date  = str(row[2]).strip() if row[2] else None
            total_debt     = float(row[3] or 0)
            principal      = float(row[4] or 0)
            interest_rate  = float(row[5] or 0)
            court_fee      = float(row[6] or 0)
            lawyer_fee     = float(row[7] or 0)
            judgment_difference = (court_fee + lawyer_fee + total_debt) - principal
            inst_count     = int(float(row[8] or 0))
            first_due_date = str(row[9]).strip() if row[9] else None
            inst1          = float(row[10] or 0)
            inst2          = float(row[11] or 0)
            inst3          = float(row[12] or 0)
            inst4          = float(row[13] or 0)
            default_rate   = float(row[14] or 0)

            if interest_rate == 0 and default_rate == 0:
                raise ValueError('อัตราดอกเบี้ย/ปี และ ดอกเบี้ยเมื่อผิดนัด ต้องไม่เป็น 0 ทั้งคู่')

            last_due_date = (
                date.fromisoformat(first_due_date) + _rd(months=inst_count - 1)
            ).isoformat() if first_due_date else None

            db.execute('''
                UPDATE customers SET
                    case_status           = ?,
                    judgment_date         = ?,
                    total_debt            = ?,
                    principal             = ?,
                    judgment_difference   = ?,
                    interest_rate         = ?,
                    court_fee             = ?,
                    lawyer_fee            = ?,
                    installment_count     = ?,
                    default_interest_rate = ?,
                    first_due_date        = ?,
                    last_due_date         = ?,
                    installment_1         = ?,
                    installment_2         = ?,
                    installment_3         = ?,
                    installment_4         = ?,
                    updated_at            = CURRENT_TIMESTAMP
                WHERE account_no = ? AND is_deleted = 0
            ''', (
                judgment_type, judgment_date, total_debt, principal,
                judgment_difference,
                interest_rate, court_fee, lawyer_fee, inst_count, default_rate,
                first_due_date, last_due_date, inst1, inst2, inst3, inst4,
                account_no
            ))

            _log_case_status(db, account_no, cus['case_status'], judgment_type, user['id'], 'Bulk import คำพิพากษา')
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'success',
                            'message': f'บันทึกสำเร็จ → {judgment_type}'})
            success += 1

        except Exception as e:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': str(e)})
            error += 1

    db.commit()

    for r in results:
        if r['status'] == 'success':
            refresh_customer_status(r['account_no'], db)

    return jsonify({
        'summary': {'success': success, 'skip': skip, 'error': error, 'total': success + skip + error},
        'results': results,
    }), 200


@bp.route('/<account_no>/edits', methods=['GET'])
def get_customer_edits(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    import json
    db   = get_db()
    rows = db.execute(
        """SELECT ce.*, u.display_name as edited_by_name
           FROM customer_edits ce
           LEFT JOIN users u ON u.id = ce.edited_by
           WHERE ce.account_no = ?
           ORDER BY ce.edited_at DESC""",
        (account_no,)
    ).fetchall()

    edits = []
    for r in rows:
        r = dict(r)
        try:
            r['changes'] = json.loads(r['changes'])
        except Exception:
            r['changes'] = {}
        edits.append(r)

    return jsonify({'edits': edits}), 200


@bp.route('/<account_no>', methods=['DELETE'])
def delete_customer(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401
    if user['role'] != 'admin':
        return jsonify({'error': 'Forbidden'}), 403

    db = get_db()
    db.execute(
        'UPDATE customers SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE account_no = ?',
        (account_no,)
    )
    db.commit()

    return jsonify({'message': 'Deleted'}), 200


@bp.route('/<account_no>', methods=['PUT'])
def update_customer(account_no):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json()

    required = ['filing_date', 'filing_capital', 'judgment_date', 'total_debt', 'principal',
            'interest_rate', 'installment_count', 'first_due_date', 'installment_1']
    missing = [f for f in required if data.get(f) is None]
    if missing:
        return jsonify({'error': f'กรุณากรอกข้อมูลให้ครบ: {", ".join(missing)}'}), 400

    db = get_db()

    existing = db.execute(
        'SELECT id FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone()
    if not existing:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404

    old = dict(db.execute(
        'SELECT * FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)
    ).fetchone())

    EDITABLE_FIELDS = {
        'filing_date':           'วันที่ยื่นฟ้อง',
        'filing_capital':        'ทุนทรัพย์ที่ฟ้อง',
        'judgment_date':         'วันพิพากษา',
        'total_debt':            'ยอดหนี้รวม',
        'principal':             'เงินต้น',
        'court_fee':             'ค่าธรรมเนียมศาล',
        'lawyer_fee':            'ค่าทนาย',
        'interest_rate':         'อัตราดอกเบี้ย',
        'default_interest_rate': 'ดอกเบี้ยผิดนัด',
        'installment_count':     'จำนวนงวด',
        'first_due_date':        'วันครบกำหนดงวดแรก',
        'installment_1':         'ค่างวด 1',
        'installment_2':         'ค่างวด 2',
        'installment_3':         'ค่างวด 3',
        'installment_4':         'ค่างวด 4',
        'judgment_difference': 'ยอดหนี้ส่วนต่าง',
    }

    filing_capital_text = str(data.get('filing_capital') or '').replace(',', '').strip()
    if not re.fullmatch(r'\d+(\.\d{1,2})?', filing_capital_text):
        return jsonify({'error': 'ทุนทรัพย์ที่ฟ้องต้องเป็นตัวเลข และมีทศนิยมได้สูงสุด 2 ตำแหน่ง'}), 400

    filing_capital = round(float(filing_capital_text), 2)
    if filing_capital <= 0:
        return jsonify({'error': 'ทุนทรัพย์ที่ฟ้องต้องมากกว่า 0'}), 400

    new_vals = {
        'filing_date':           data['filing_date'],
        'filing_capital':        filing_capital,
        'judgment_date':         data['judgment_date'],
        'total_debt':            float(data['total_debt']),
        'principal':             float(data['principal']),
        'court_fee':             float(data.get('court_fee', 0)),
        'lawyer_fee':            float(data.get('lawyer_fee', 0)),
        'interest_rate':         float(data['interest_rate']),
        'default_interest_rate': float(data.get('default_interest_rate', 0)),
        'installment_count':     int(data['installment_count']),
        'first_due_date':        data['first_due_date'],
        'installment_1':         float(data['installment_1']),
        'installment_2':         float(data.get('installment_2', 0)),
        'installment_3':         float(data.get('installment_3', 0)),
        'installment_4':         float(data.get('installment_4', 0)),
    }
    new_vals['judgment_difference'] = (
            new_vals['court_fee'] + new_vals['lawyer_fee'] + new_vals['total_debt']
        ) - new_vals['principal']

    import json
    changes = {}
    for field, label in EDITABLE_FIELDS.items():
        old_val = old.get(field)
        new_val = new_vals.get(field)
        if str(old_val) != str(new_val):
            changes[field] = {'label': label, 'from': old_val, 'to': new_val}

    try:
        db.execute('ALTER TABLE customers ADD COLUMN updated_at DATETIME')
    except Exception:
        pass

    db.execute('''
        UPDATE customers SET
            filing_date           = ?,
            filing_capital        = ?,
            judgment_date         = ?,
            total_debt            = ?,
            principal             = ?,
            judgment_difference   = ?,
            interest_rate         = ?,
            court_fee             = ?,
            lawyer_fee            = ?,
            installment_count     = ?,
            default_interest_rate = ?,
            first_due_date        = ?,
            last_due_date         = ?,
            installment_1         = ?,
            installment_2         = ?,
            installment_3         = ?,
            installment_4         = ?,
            updated_at            = CURRENT_TIMESTAMP
        WHERE account_no = ? AND is_deleted = 0
    ''', (
        new_vals['filing_date'],
        new_vals['filing_capital'],
        new_vals['judgment_date'],
        new_vals['total_debt'],
        new_vals['principal'],
        new_vals['judgment_difference'],
        new_vals['interest_rate'],
        new_vals['court_fee'],
        new_vals['lawyer_fee'],
        new_vals['installment_count'],
        new_vals['default_interest_rate'],
        new_vals['first_due_date'],
        data.get('last_due_date'),
        new_vals['installment_1'],
        new_vals['installment_2'],
        new_vals['installment_3'],
        new_vals['installment_4'],
        account_no
    ))

    if changes:
        db.execute(
            'INSERT INTO customer_edits (customer_id, account_no, edited_by, changes) VALUES (?, ?, ?, ?)',
            (old['id'], account_no, user['id'], json.dumps(changes, ensure_ascii=False))
        )

    db.commit()

    refresh_customer_status(account_no, db)

    return jsonify({'message': 'อัพเดทข้อมูลสำเร็จ', 'account_no': account_no, 'changed_fields': len(changes)}), 200
