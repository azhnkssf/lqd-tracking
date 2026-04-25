import io
import json
import openpyxl
from datetime import date, datetime
from flask import Blueprint, request, jsonify, send_file, current_app
from app.database import get_db
from app.services.auth_service import get_user_by_token
from app.services.status_service import refresh_customer_status
from app.services.report_service import get_snapshot_at_date
from dateutil.relativedelta import relativedelta

bp = Blueprint('imports', __name__, url_prefix='/api/import')


def get_current_user():
    token = request.cookies.get('token') or request.headers.get('Authorization', '').replace('Bearer ', '')
    return get_user_by_token(token)


def parse_account_no(val):
    if val is None:
        return None
    s = str(val).strip()
    if s.endswith('.0') and s[:-2].isdigit():
        s = s[:-2]
    return s if s and s != 'None' else None


def parse_date(val):
    if val is None:
        return None
    if isinstance(val, (datetime, date)):
        return val.strftime('%Y-%m-%d') if isinstance(val, datetime) else val.isoformat()
    s = str(val).strip()
    for fmt in ('%d/%m/%Y', '%Y-%m-%d', '%d-%m-%Y', '%m/%d/%Y'):
        try:
            return datetime.strptime(s, fmt).strftime('%Y-%m-%d')
        except Exception:
            pass
    try:
        parts = s.replace('-', '/').split('/')
        if len(parts) == 3:
            d, m, y = int(parts[0]), int(parts[1]), int(parts[2])
            return date(y, m, d).isoformat()
    except Exception:
        pass
    return None


def parse_float(val, default=0.0):
    try:
        return round(float(str(val).replace(',', '')), 2) if val not in (None, '') else default
    except Exception:
        return default


def parse_int(val, default=0):
    try:
        return int(float(str(val).replace(',', ''))) if val not in (None, '') else default
    except Exception:
        return default


# ============================================================
# Template Download
# ============================================================

@bp.route('/template/customer', methods=['GET'])
def download_customer_template():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Sheet1'

    from openpyxl.styles import PatternFill, Font, Alignment
    header_fill = PatternFill(start_color='2D3282', end_color='2D3282', fill_type='solid')
    label_fill  = PatternFill(start_color='EEF2FF', end_color='EEF2FF', fill_type='solid')
    header_font = Font(color='FFFFFF', bold=True)
    label_font  = Font(bold=True, color='2D3282')

    keys    = ['account_no', 'full_name', 'filing_date']
    labels  = ['เลขที่บัญชี *', 'ชื่อ-นามสกุล *', 'วันที่ยื่นฟ้อง *']
    example = [700004761131, 'มานิตย์ บุญรอด', '12/03/2026']

    ws.append(keys)
    ws.append(labels)
    ws.append(example)

    for cell in ws[1]: cell.fill = header_fill; cell.font = header_font; cell.alignment = Alignment(horizontal='center')
    for cell in ws[2]: cell.fill = label_fill;  cell.font = label_font

    for col in ws.columns:
        max_len = max((len(str(cell.value or '')) for cell in col), default=10)
        ws.column_dimensions[col[0].column_letter].width = min(max_len + 4, 40)

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return send_file(buf, as_attachment=True, download_name='Template-Customer_Filing.xlsx',
                     mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')


@bp.route('/template/payment', methods=['GET'])
def download_payment_template():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Sheet1'
    ws.append(['account_no', 'payment_date', 'amount'])
    ws.append(['เลขที่บัญชี *', 'วันที่ชำระเงิน * (DD/MM/YYYY)', 'จำนวนเงิน *'])
    ws.append([700004761131, '12/03/2026', 30000])

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return send_file(buf, as_attachment=True, download_name='Template-Payment_Bulk_Upload.xlsx',
                     mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')


@bp.route('/template/judgment', methods=['GET'])
def download_judgment_template():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Sheet1'

    from openpyxl.styles import PatternFill, Font, Alignment
    header_fill = PatternFill(start_color='2D3282', end_color='2D3282', fill_type='solid')
    label_fill  = PatternFill(start_color='EEF2FF', end_color='EEF2FF', fill_type='solid')
    header_font = Font(color='FFFFFF', bold=True)
    label_font  = Font(bold=True, color='2D3282')

    keys = [
        'account_no', 'judgment_type', 'judgment_date', 'total_debt', 'principal_debt',
        'interest_rate', 'court_fee', 'lawyer_fee', 'installment_months', 'first_due_date',
        'step_1_amount', 'step_2_amount', 'step_3_amount', 'step_4_amount', 'default_interest',
        'last_due_date',
    ]
    labels = [
        'เลขที่บัญชี *', 'ประเภทคำพิพากษา * (พิพากษาตามยอม/พิพากษาฝ่ายเดียว)',
        'วันที่พิพากษา *', 'ยอดหนี้รวมตามคำพิพากษา *', 'เงินต้นตามคำพิพากษา *',
        'อัตราดอกเบี้ยต่อปี (%)', 'ค่าธรรมเนียมศาล', 'ค่าทนายความ',
        'จำนวนงวดผ่อนชำระ *', 'วันครบกำหนดงวดแรก *',
        'ค่างวด งวดที่ 1 *', 'ค่างวด งวดที่ 2', 'ค่างวด งวดที่ 3', 'ค่างวด งวดที่ 4',
        'ดอกเบี้ยเมื่อผิดนัด (%)', 'วันครบกำหนดงวดสุดท้าย',
    ]
    example = [
        700004761131, 'พิพากษาตามยอม', '18/02/2026', 190000, 190000,
        0, 3000, 2000, 24, '18/03/2026',
        8500, 0, 0, 0, 15, '18/02/2028',
    ]

    ws.append(keys)
    ws.append(labels)
    ws.append(example)

    for cell in ws[1]: cell.fill = header_fill; cell.font = header_font; cell.alignment = Alignment(horizontal='center')
    for cell in ws[2]: cell.fill = label_fill;  cell.font = label_font

    for col in ws.columns:
        max_len = max((len(str(cell.value or '')) for cell in col), default=10)
        ws.column_dimensions[col[0].column_letter].width = min(max_len + 4, 40)

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return send_file(buf, as_attachment=True, download_name='Template-Judgment_Bulk_Upload.xlsx',
                     mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')


@bp.route('/template/enforcement', methods=['GET'])
def download_enforcement_template():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Sheet1'

    from openpyxl.styles import PatternFill, Font, Alignment
    header_fill = PatternFill(start_color='2D3282', end_color='2D3282', fill_type='solid')
    label_fill  = PatternFill(start_color='EEF2FF', end_color='EEF2FF', fill_type='solid')
    header_font = Font(color='FFFFFF', bold=True)
    label_font  = Font(bold=True, color='2D3282')

    keys    = ['account_no', 'enforcement_order_no', 'enforcement_judgment_date', 'enforcement_received_date']
    labels  = ['เลขที่บัญชี *', 'เลขหมายบังคับคดี *', 'วันที่มีคำพิพากษา *', 'วันที่ได้รับหมาย *']
    example = [700004761131, 'EF-2026-00123', '18/03/2026', '25/03/2026']

    ws.append(keys)
    ws.append(labels)
    ws.append(example)

    for cell in ws[1]: cell.fill = header_fill; cell.font = header_font; cell.alignment = Alignment(horizontal='center')
    for cell in ws[2]: cell.fill = label_fill;  cell.font = label_font

    for col in ws.columns:
        max_len = max((len(str(cell.value or '')) for cell in col), default=10)
        ws.column_dimensions[col[0].column_letter].width = min(max_len + 4, 40)

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return send_file(buf, as_attachment=True, download_name='Template-Enforcement_Bulk_Upload.xlsx',
                     mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')


# ============================================================
# Customer Import — Row Validator
# ============================================================

def validate_customer_row(row, row_idx):
    """
    ตรวจสอบ data type และ format ของแต่ละ row ก่อน insert
    คืน (is_valid, error_message)
    """
    errors = []

    # col 0: account_no — ตัวเลขเท่านั้น ครบ 12 หลัก
    account_no = parse_account_no(row[0])
    if not account_no:
        return False, 'เลขที่บัญชีว่างเปล่า'
    if not account_no.isdigit():
        return False, f'เลขที่บัญชีต้องเป็นตัวเลขเท่านั้น: "{account_no}"'
    if len(account_no) != 12:
        return False, f'เลขที่บัญชีต้องมี 12 หลัก (ปัจจุบัน {len(account_no)} หลัก)'

    # col 1: full_name — ต้องมีข้อมูล
    name = str(row[1]).strip() if row[1] else None
    if not name:
        errors.append('ชื่อ-นามสกุล ว่างเปล่า')
    else:
        import re as _re
        if _re.search(r'[0-9!@#$%^&*()\[\]{};:\'",.<>/?`~\\|+=]', name):
            errors.append('ชื่อ-นามสกุล ไม่อนุญาตให้ใช้อักขระพิเศษหรือตัวเลข')
        elif _re.search(r'\s{2,}', name):
            errors.append('ชื่อ-นามสกุล ไม่อนุญาตให้มีช่องว่างติดกันหลายช่อง')

    # col 2: filing_date — วันที่ format ถูกต้อง
    filing_date = parse_date(row[2])
    if row[2] and not filing_date:
        errors.append(f'วันที่ยื่นฟ้อง ไม่ถูกต้อง: "{row[2]}"')

    # col 3: judgment_date — required + format
    judgment_date = parse_date(row[3])
    if not row[3]:
        errors.append('วันที่พิพากษา ว่างเปล่า')
    elif not judgment_date:
        errors.append(f'วันที่พิพากษา ไม่ถูกต้อง: "{row[3]}"')

    # col 4: total_debt — ตัวเลข required
    if row[4] is None or str(row[4]).strip() == '':
        errors.append('ยอดหนี้รวม ว่างเปล่า')
    else:
        try:
            v = float(str(row[4]).replace(',', '').replace('%', '').strip())
            if v < 0:
                errors.append(f'ยอดหนี้รวม ต้องไม่ติดลบ: {row[4]}')
        except Exception:
            errors.append(f'ยอดหนี้รวม ต้องเป็นตัวเลข: "{row[4]}"')

    # col 5: principal_debt — ตัวเลข required > 0
    if row[5] is None or str(row[5]).strip() == '':
        errors.append('เงินต้น ว่างเปล่า')
    else:
        try:
            v = float(str(row[5]).replace(',', '').replace('%', '').strip())
            if v <= 0:
                errors.append(f'เงินต้น ต้องมากกว่า 0: {row[5]}')
        except Exception:
            errors.append(f'เงินต้น ต้องเป็นตัวเลข: "{row[5]}"')

    # col 6: interest_rate — ตัวเลข required
    if row[6] is None or str(row[6]).strip() == '':
        errors.append('อัตราดอกเบี้ย ว่างเปล่า')
    else:
        try:
            v = float(str(row[6]).replace(',', '').replace('%', '').strip())
            if v < 0:
                errors.append(f'อัตราดอกเบี้ย ต้องไม่ติดลบ: {row[6]}')
        except Exception:
            errors.append(f'อัตราดอกเบี้ย ต้องเป็นตัวเลข: "{row[6]}"')

    # col 7: installment_months — integer required > 0
    if row[7] is None or str(row[7]).strip() == '':
        errors.append('จำนวนงวด ว่างเปล่า')
    else:
        try:
            v = int(float(str(row[7]).replace(',', '').strip()))
            if v <= 0:
                errors.append(f'จำนวนงวด ต้องมากกว่า 0: {row[7]}')
        except Exception:
            errors.append(f'จำนวนงวด ต้องเป็นตัวเลข: "{row[7]}"')

    # col 10: first_due_date — required + format
    first_due_date = parse_date(row[10])
    if not row[10]:
        errors.append('วันครบกำหนดงวดแรก ว่างเปล่า')
    elif not first_due_date:
        errors.append(f'วันครบกำหนดงวดแรก ไม่ถูกต้อง: "{row[10]}"')

    # col 11: step_1_amount — required > 0
    if row[11] is None or str(row[11]).strip() == '':
        errors.append('ค่างวดที่ 1 ว่างเปล่า')
    else:
        try:
            v = float(str(row[11]).replace(',', '').strip())
            if v <= 0:
                errors.append(f'ค่างวดที่ 1 ต้องมากกว่า 0')
        except Exception:
            errors.append(f'ค่างวดที่ 1 ต้องเป็นตัวเลข')

    # col 12-14: optional installments — ถ้ามีต้องเป็นตัวเลข
    for i, col_idx in enumerate([12, 13, 14], start=2):
        if row[col_idx] is not None and str(row[col_idx]).strip() != '':
            try:
                float(str(row[col_idx]).replace(',', '').strip())
            except Exception:
                errors.append(f'ค่างวดที่ {i} ต้องเป็นตัวเลข: "{row[col_idx]}"')

    # col 15: default_interest — optional ถ้ามีต้องเป็น %
    if row[15] is not None and str(row[15]).strip() != '':
        try:
            float(str(row[15]).replace(',', '').replace('%', '').strip())
        except Exception:
            errors.append(f'ดอกเบี้ยผิดนัด ต้องเป็นตัวเลข')

    # validate date order: filing_date < judgment_date < first_due_date
    filing_date    = parse_date(row[2])
    judgment_date  = parse_date(row[3])
    first_due_date = parse_date(row[10])

    if filing_date and judgment_date:
        if judgment_date <= filing_date:
            errors.append(f'วันที่พิพากษา ({judgment_date}) ต้องมากกว่าวันที่ยื่นฟ้อง ({filing_date})')
    if filing_date and first_due_date:
        if first_due_date <= filing_date:
            errors.append(f'วันครบกำหนดงวดแรก ({first_due_date}) ต้องมากกว่าวันที่ยื่นฟ้อง ({filing_date})')
    if judgment_date and first_due_date:
        if first_due_date <= judgment_date:
            errors.append(f'วันครบกำหนดงวดแรก ({first_due_date}) ต้องมากกว่าวันที่พิพากษา ({judgment_date})')

    # validate interest — ห้ามเป็น 0 ทั้งคู่
    try:
        int_rate     = float(str(row[6]).replace(',','').replace('%','').strip()) if row[6] not in (None,'') else 0
        default_rate = float(str(row[15]).replace(',','').replace('%','').strip()) if row[15] not in (None,'') else 0
        if int_rate == 0 and default_rate == 0:
            errors.append('อัตราดอกเบี้ย/ปี และ ดอกเบี้ยเมื่อผิดนัด ต้องไม่เป็น 0 ทั้งคู่')
    except Exception:
        pass

    if errors:
        return False, ' | '.join(errors)
    return True, None


# ============================================================
# Customer Import
# ============================================================

@bp.route('/customer', methods=['POST'])
def import_customers():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

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

    db = get_db()
    results = []
    success = skip = error = 0

    for row_idx, row in enumerate(ws.iter_rows(min_row=3, values_only=True), start=3):
        if all(v is None for v in row):
            continue

        account_no = parse_account_no(row[0])
        if not account_no:
            results.append({'row': row_idx, 'status': 'error', 'message': 'เลขที่บัญชีว่างหรือไม่ถูกต้อง'})
            error += 1
            continue

        if not account_no.isdigit() or len(account_no) != 12:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error',
                            'message': f'เลขที่บัญชีต้องเป็นตัวเลข 12 หลัก'})
            error += 1
            continue

        name = str(row[1]).strip() if row[1] else None
        if not name:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error',
                            'message': 'ชื่อ-นามสกุลว่างเปล่า'})
            error += 1
            continue

        filing_date = parse_date(row[2]) if len(row) > 2 else None

        exists = db.execute('SELECT id, is_deleted FROM customers WHERE account_no = ?', (account_no,)).fetchone()
        if exists:
            msg = 'เลขที่บัญชีนี้เคยถูกลบออกจากระบบแล้ว กรุณากู้คืนข้อมูลก่อน Import' if exists['is_deleted'] == 1 else 'มีข้อมูลในระบบแล้ว'
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'skip', 'message': msg})
            skip += 1
            continue

        try:
            db.execute('''
                INSERT INTO customers (
                    account_no, name, filing_date,
                    case_status, created_by
                ) VALUES (?, ?, ?, 'ยื่นฟ้อง', ?)
            ''', (account_no, name, filing_date, user['id']))

            db.execute('''
                INSERT INTO case_status_logs
                (account_no, from_status, to_status, changed_by, note)
                VALUES (?, NULL, 'ยื่นฟ้อง', ?, 'Bulk Import ยื่นฟ้อง')
            ''', (account_no, user['id']))

            results.append({'row': row_idx, 'account_no': account_no, 'name': name,
                            'status': 'success', 'message': 'นำเข้าสำเร็จ'})
            success += 1
        except Exception as e:
            err_str = str(e)
            if 'UNIQUE constraint' in err_str:
                err_str = 'เลขที่บัญชีนี้มีในระบบแล้ว (ซ้ำ)'
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': err_str})
            error += 1

    cur = db.execute(
        """INSERT INTO import_logs (imported_by, import_type, filename, total_rows, success_rows, skip_rows, error_rows, results_json)
           VALUES (?,?,?,?,?,?,?,?)""",
        (user['id'], 'customer_filing', file.filename, success+skip+error, success, skip, error,
         json.dumps(results, ensure_ascii=False))
    )
    db.commit()

    return jsonify({
        'summary': {'success': success, 'skip': skip, 'error': error, 'total': success + skip + error},
        'results': results, 'log_id': cur.lastrowid
    }), 200


# ============================================================
# Judgment Import (admin only)
# ============================================================

@bp.route('/judgment', methods=['POST'])
def import_judgment():
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

    db = get_db()
    results = []
    success = skip = error = 0

    VALID_TYPES = ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว']

    for row_idx, row in enumerate(ws.iter_rows(min_row=3, values_only=True), start=3):
        if all(v is None for v in row):
            continue

        account_no    = parse_account_no(row[0])
        judgment_type = str(row[1]).strip() if row[1] else None

        if not account_no:
            results.append({'row': row_idx, 'status': 'error', 'message': 'เลขที่บัญชีว่างเปล่า'})
            error += 1
            continue

        if judgment_type not in VALID_TYPES:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error',
                            'message': f'judgment_type ต้องเป็น {" หรือ ".join(VALID_TYPES)}'})
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
            judgment_date  = parse_date(row[2])
            total_debt     = parse_float(row[3])
            principal      = parse_float(row[4])
            interest_rate  = parse_float(str(row[5] or '').replace('%', '').strip())
            court_fee      = parse_float(row[6])
            lawyer_fee     = parse_float(row[7])
            inst_count     = parse_int(row[8])
            first_due_date = parse_date(row[9])
            inst1          = parse_float(row[10])
            inst2          = parse_float(row[11])
            inst3          = parse_float(row[12])
            inst4          = parse_float(row[13])
            default_rate   = parse_float(str(row[14] or '').replace('%', '').strip())
            last_due_date  = parse_date(row[15]) if len(row) > 15 and row[15] else None

            if interest_rate == 0 and default_rate == 0:
                raise ValueError('อัตราดอกเบี้ย/ปี และ ดอกเบี้ยเมื่อผิดนัด ต้องไม่เป็น 0 ทั้งคู่')

            if not last_due_date and first_due_date and inst_count > 0:
                from datetime import date as _date
                last_due_date = (
                    _date.fromisoformat(first_due_date) + relativedelta(months=inst_count - 1)
                ).isoformat()

            db.execute('''
                UPDATE customers SET
                    case_status           = ?,
                    judgment_date         = ?,
                    total_debt            = ?,
                    principal             = ?,
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
                interest_rate, court_fee, lawyer_fee, inst_count, default_rate,
                first_due_date, last_due_date, inst1, inst2, inst3, inst4,
                account_no
            ))

            db.execute('''
                INSERT INTO case_status_logs
                (account_no, from_status, to_status, changed_by, note)
                VALUES (?, ?, ?, ?, 'Bulk Import คำพิพากษา')
            ''', (account_no, cus['case_status'], judgment_type, user['id']))

            results.append({'row': row_idx, 'account_no': account_no,
                            'status': 'success', 'message': f'บันทึกสำเร็จ → {judgment_type}'})
            success += 1

        except Exception as e:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': str(e)})
            error += 1

    db.commit()

    for r in results:
        if r['status'] == 'success':
            refresh_customer_status(r['account_no'], db)

    cur = db.execute(
        """INSERT INTO import_logs (imported_by, import_type, filename, total_rows, success_rows, skip_rows, error_rows, results_json)
           VALUES (?,?,?,?,?,?,?,?)""",
        (user['id'], 'judgment', file.filename, success+skip+error, success, skip, error,
         json.dumps(results, ensure_ascii=False))
    )
    db.commit()

    return jsonify({
        'summary': {'success': success, 'skip': skip, 'error': error, 'total': success + skip + error},
        'results': results, 'log_id': cur.lastrowid
    }), 200


# ============================================================
# Enforcement Import (admin only)
# ============================================================

@bp.route('/enforcement', methods=['POST'])
def import_enforcement():
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

    db = get_db()
    results = []
    success = skip = error = 0

    ALLOWED_STATUS = ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว']

    for row_idx, row in enumerate(ws.iter_rows(min_row=3, values_only=True), start=3):
        if all(v is None for v in row):
            continue

        account_no = parse_account_no(row[0])
        if not account_no:
            results.append({'row': row_idx, 'status': 'error', 'message': 'เลขที่บัญชีว่างเปล่า'})
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

        if cus['case_status'] not in ALLOWED_STATUS:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'skip',
                            'message': f'สถานะปัจจุบันคือ {cus["case_status"]} ไม่สามารถบันทึกหมายได้'})
            skip += 1
            continue

        try:
            enforcement_order_no      = str(row[1]).strip() if row[1] else None
            enforcement_judgment_date = parse_date(row[2])
            enforcement_received_date = parse_date(row[3])

            if not enforcement_order_no:
                raise ValueError('เลขหมายบังคับคดีว่างเปล่า')
            if not enforcement_judgment_date:
                raise ValueError('วันที่มีคำพิพากษาไม่ถูกต้อง')
            if not enforcement_received_date:
                raise ValueError('วันที่ได้รับหมายไม่ถูกต้อง')

            payments = db.execute(
                'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC', (account_no,)
            ).fetchall()
            payments = [dict(p) for p in payments]

            snap = get_snapshot_at_date(cus, payments, date.today().isoformat())
            if not snap or not (snap['outstanding'] > 0 and snap['ncb_months'] in ['30', '31']):
                results.append({'row': row_idx, 'account_no': account_no, 'status': 'skip',
                                'message': 'ลูกหนี้ยังไม่มีการผิดนัดชำระ ไม่สามารถบันทึกหมายได้'})
                skip += 1
                continue

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
                enforcement_order_no, enforcement_judgment_date,
                enforcement_received_date, user['id'], account_no
            ))

            db.execute('''
                INSERT INTO case_status_logs
                (account_no, from_status, to_status, changed_by, note)
                VALUES (?, ?, 'บังคับคดี', ?, 'Bulk Import หมายบังคับคดี')
            ''', (account_no, cus['case_status'], user['id']))

            results.append({'row': row_idx, 'account_no': account_no,
                            'status': 'success', 'message': f'บันทึกหมายบังคับคดีสำเร็จ ({enforcement_order_no})'})
            success += 1

        except Exception as e:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': str(e)})
            error += 1

    db.commit()

    cur = db.execute(
        """INSERT INTO import_logs (imported_by, import_type, filename, total_rows, success_rows, skip_rows, error_rows, results_json)
           VALUES (?,?,?,?,?,?,?,?)""",
        (user['id'], 'enforcement', file.filename, success+skip+error, success, skip, error,
         json.dumps(results, ensure_ascii=False))
    )
    db.commit()

    return jsonify({
        'summary': {'success': success, 'skip': skip, 'error': error, 'total': success + skip + error},
        'results': results, 'log_id': cur.lastrowid
    }), 200


# ============================================================
# Payment Import
# ============================================================

@bp.route('/payment', methods=['POST'])
def import_payments():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

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

    db = get_db()
    results = []
    success = skip = error = 0

    for row_idx, row in enumerate(ws.iter_rows(min_row=3, values_only=True), start=3):
        if all(v is None for v in row):
            continue

        account_no = parse_account_no(row[0])
        if not account_no:
            results.append({'row': row_idx, 'status': 'error', 'message': 'เลขที่บัญชีว่างเปล่า'})
            error += 1
            continue
        if not account_no.isdigit():
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': f'เลขที่บัญชีต้องเป็นตัวเลขเท่านั้น: "{account_no}"'})
            error += 1
            continue
        if len(account_no) != 12:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': f'เลขที่บัญชีต้องมี 12 หลัก (ปัจจุบัน {len(account_no)} หลัก)'})
            error += 1
            continue

        try:
            payment_date = parse_date(row[1])
            amount       = parse_float(row[2])

            if not payment_date:
                raise ValueError('วันที่ชำระไม่ถูกต้อง')
            if amount < 0:
                raise ValueError('จำนวนเงินต้องไม่ติดลบ')

            cus = db.execute('SELECT id FROM customers WHERE account_no = ? AND is_deleted = 0', (account_no,)).fetchone()
            if not cus:
                results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': 'ไม่พบเลขที่บัญชีในระบบ'})
                error += 1
                continue

            # เช็คซ้ำ (account + payment_date + amount เหมือนกัน)
            dup = db.execute(
                'SELECT id FROM payments WHERE account_no = ? AND payment_date = ? AND amount = ?',
                (account_no, payment_date, amount)
            ).fetchone()
            if dup:
                results.append({'row': row_idx, 'account_no': account_no, 'status': 'skip', 'message': f'มีรายการชำระวันที่ {payment_date} จำนวน {amount} แล้ว'})
                skip += 1
                continue

            db.execute('''
                INSERT INTO payments (customer_id, account_no, payment_date, amount, recorded_by)
                VALUES (?, ?, ?, ?, ?)
            ''', (cus['id'], account_no, payment_date, amount, user['id']))
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'success', 'message': f'นำเข้าสำเร็จ ({payment_date} / {amount:,.2f} บ.)'})
            success += 1
        except Exception as e:
            results.append({'row': row_idx, 'account_no': account_no, 'status': 'error', 'message': str(e)})
            error += 1

    cur = db.execute(
        """INSERT INTO import_logs (imported_by, import_type, filename, total_rows, success_rows, skip_rows, error_rows, results_json)
           VALUES (?,?,?,?,?,?,?,?)""",
        (user['id'], 'payment', file.filename, success+skip+error, success, skip, error, json.dumps(results, ensure_ascii=False))
    )
    db.commit()

    refreshed = set(r['account_no'] for r in results if r['status'] == 'success')
    for account_no in refreshed:
        refresh_customer_status(account_no, db)

    return jsonify({
        'summary': {'success': success, 'skip': skip, 'error': error, 'total': success + skip + error},
        'results': results, 'log_id': cur.lastrowid
    }), 200


# ============================================================
# Import History
# ============================================================

@bp.route('/history', methods=['GET'])
def get_import_history():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db   = get_db()
    rows = db.execute(
        """SELECT il.*, u.display_name as imported_by_name
           FROM import_logs il
           LEFT JOIN users u ON u.id = il.imported_by
           ORDER BY il.imported_at DESC
           LIMIT 50"""
    ).fetchall()

    result = []
    for r in rows:
        r = dict(r)
        r.pop('results_json', None)
        result.append(r)

    return jsonify({'history': result}), 200


@bp.route('/history/<int:log_id>/download', methods=['GET'])
def download_import_result(log_id):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db  = get_db()
    row = db.execute('SELECT * FROM import_logs WHERE id = ?', (log_id,)).fetchone()
    if not row:
        return jsonify({'error': 'ไม่พบข้อมูล'}), 404

    row = dict(row)
    try:
        results = json.loads(row['results_json'] or '[]')
    except Exception:
        results = []

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Import Result'

    from openpyxl.styles import PatternFill, Font
    header_fill = PatternFill(start_color='2D3282', end_color='2D3282', fill_type='solid')
    header_font = Font(color='FFFFFF', bold=True)

    headers = ['แถว', 'เลขที่บัญชี', 'ชื่อ / รายละเอียด', 'สถานะ', 'หมายเหตุ']
    ws.append(headers)
    for cell in ws[1]:
        cell.fill = header_fill
        cell.font = header_font

    status_label = {'success': 'สำเร็จ', 'skip': 'ข้ามแล้ว (ซ้ำ)', 'error': 'ผิดพลาด'}
    fill_map = {
        'success': PatternFill(start_color='D1FAE5', end_color='D1FAE5', fill_type='solid'),
        'skip':    PatternFill(start_color='FEF3C7', end_color='FEF3C7', fill_type='solid'),
        'error':   PatternFill(start_color='FEE2E2', end_color='FEE2E2', fill_type='solid'),
    }

    for r in results:
        ws.append([
            r.get('row', ''),
            r.get('account_no', ''),
            r.get('name', '') or r.get('message', ''),
            status_label.get(r.get('status',''), r.get('status','')),
            r.get('message', ''),
        ])
        fill = fill_map.get(r.get('status',''))
        if fill:
            for cell in ws[ws.max_row]:
                cell.fill = fill

    for col in ws.columns:
        max_len = max((len(str(cell.value or '')) for cell in col), default=10)
        ws.column_dimensions[col[0].column_letter].width = min(max_len + 4, 60)

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)

    import_type = 'Customer' if row['import_type'] == 'customer' else 'Payment'
    filename    = f"ImportResult_{import_type}_{row['imported_at'][:10]}.xlsx"

    return send_file(buf, as_attachment=True, download_name=filename,
                     mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')