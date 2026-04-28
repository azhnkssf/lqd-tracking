import io
import json
import openpyxl
from decimal import Decimal, ROUND_HALF_UP, InvalidOperation
from openpyxl.styles import PatternFill, Font, Alignment
from openpyxl.worksheet.worksheet import Worksheet
from flask import Blueprint, request, jsonify, send_file
from app.database import get_db
from app.services.auth_service import get_user_by_token
from app.services.report_service import (
    process_registry_file,
    get_snapshot_at_date,
    get_installment_for_month,
    _get_report_group,
    _build_report30_row_from_db,
    _build_report31_row,
    _build_report33_row,
)

bp = Blueprint('reports', __name__, url_prefix='/api/report')


def get_current_user():
    token = request.cookies.get('token') or request.headers.get('Authorization', '').replace('Bearer ', '')
    return get_user_by_token(token)


def round_money(v, decimals=2, default=0.0):
    if v is None or v == '':
        return default

    try:
        q = Decimal('1').scaleb(-decimals)
        return float(Decimal(str(v)).quantize(q, rounding=ROUND_HALF_UP))
    except (InvalidOperation, ValueError, TypeError):
        return default


@bp.route('/generate', methods=['POST'])
def generate_report():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    report_date  = request.form.get('report_date')
    file         = request.files.get('file')
    status_types = request.form.get('status_types', '30,31').split(',')

    if not report_date:
        return jsonify({'error': 'กรุณาระบุวันที่ขอ Report'}), 400
    if not file:
        return jsonify({'error': 'กรุณาอัพโหลดไฟล์ทะเบียนคดี'}), 400

    try:
        wb = openpyxl.load_workbook(file, read_only=True, data_only=True)
        ws = wb['ทะเบียนคดี_Final'] if 'ทะเบียนคดี_Final' in wb.sheetnames else wb.active
    except Exception as e:
        return jsonify({'error': f'ไม่สามารถอ่านไฟล์ได้: {str(e)}'}), 400

    db = get_db()

    try:
        result = process_registry_file(ws, db, report_date)
    except Exception as e:
        import traceback; traceback.print_exc()
        return jsonify({'error': f'เกิดข้อผิดพลาดในการประมวลผล: {str(e)}'}), 500

    # filter ตาม status_types ที่เลือก
    report_30 = result['report_30'] if '30' in status_types else []
    report_31 = result['report_31'] if '31' in status_types else []
    report_33 = result.get('report_33', [])

    # บันทึก log
    db.execute(
        """INSERT INTO report_logs (generated_by, report_date, filename, status_types, count_30, count_31, count_33, count_alerts, count_missing)
        VALUES (?,?,?,?,?,?,?,?,?)""",
        (user['id'], report_date, file.filename, ','.join(status_types),
        len(report_30), len(report_31), len(report_33),
        len(result['alerts']), len(result['missing_db']))
    )
    db.commit()

    return jsonify({
        'report_date' : report_date,
        'summary'     : {
            'report_30'  : len(report_30),
            'report_31'  : len(report_31),
            'report_33'  : len(report_33),
            'alerts'     : len(result['alerts']),
            'missing_db' : len(result['missing_db']),
        },
        'report_30'   : report_30,
        'report_31'   : report_31,
        'report_33'   : report_33,
        'alerts'      : result['alerts'],
        'missing_db'  : result['missing_db'],
    }), 200


@bp.route('/export/<report_type>', methods=['POST'])
def export_report(report_type):
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data        = request.get_json()
    rows        = data.get('rows', [])
    report_date = data.get('report_date', '')

    def fmt_date_excel(val):
        if not val:
            return ''
        s = str(val).strip().split('T')[0].split(' ')[0]
        if not s or s.lower() in ['none', 'null', '-']:
            return ''
        parts = s.split('-')
        if len(parts) == 3 and len(parts[0]) == 4:
            return f"{parts[2]}/{parts[1]}/{parts[0]}"
        return s

    def fmt_acc(val):
        s = str(val).strip() if val else ''
        if len(s) == 12 and s.isdigit():
            return f"{s[:4]}-{s[4:8]}-{s[8:]}"
        return s or '-'

    wb = openpyxl.Workbook()
    ws: Worksheet = wb.active

    header_fill = PatternFill(start_color='1e3a8a', end_color='1e3a8a', fill_type='solid')
    header_font = Font(color='FFFFFF', bold=True)
    center      = Alignment(horizontal='center')

    fill_30 = PatternFill(start_color='FEE2E2', end_color='FEE2E2', fill_type='solid')
    fill_31 = PatternFill(start_color='DBEAFE', end_color='DBEAFE', fill_type='solid')

    if report_type == '30':
        ws.title = 'Report Status 30'
        headers = [
            'เลขที่สัญญา',
            'วันที่ฟ้อง',
            'ทุนทรัพย์ที่ฟ้อง',
            'ยอดหนี้ตามคำพิพากษา',
            'วันที่พิพากษา',
            'ยอดหนี้วันผิดนัดชำระ',
            'วันผิดนัดชำระ',
            'DPD',
            'ยอดหนี้คงเหลือ',
        ]
        ws.append(headers)
        for cell in ws[1]:
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center

        def fmt_num_30(v, decimals=2):
            return round_money(v, decimals, default=0.0)

        for r in rows:
            ws.append([
                r.get('account_no'),
                fmt_date_excel(r.get('filing_date')),
                fmt_num_30(r.get('principal_sued'), 2),
                fmt_num_30(r.get('judgment_debt'), 2) if r.get('judgment_debt') is not None else '',
                fmt_date_excel(r.get('judgment_date')),
                fmt_num_30(r.get('default_amount'), 2) if r.get('default_amount') is not None else '',
                fmt_date_excel(r.get('default_date')),
                r.get('dpd') if r.get('dpd') is not None else '',
                fmt_num_30(r.get('remaining_debt'), 2) if r.get('remaining_debt') is not None else '',
            ])
            for cell in ws[ws.max_row]:
                cell.fill = fill_30

        for row in ws.iter_rows(min_row=2):
            row[2].number_format = '#,##0.00'
            row[3].number_format = '#,##0.00'
            row[5].number_format = '#,##0.00'
            row[8].number_format = '#,##0.00'

    elif report_type == '31':
        ws.title = 'Report Status 31'
        headers = [
            'เลขที่บัญชี', 'Amount Owed', 'Amount Past Due',
            'DPD (เดือน)', 'Default Date', 'Installment Amount',
            'จำนวนงวด', 'Frequency', 'Maturity Date'
        ]
        ws.append(headers)
        for cell in ws[1]:
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center

        def fmt_num(v, decimals=2):
            return round_money(v, decimals, default=0.0)

        for r in rows:
            ws.append([
                r.get('account_no'),
                fmt_num(r.get('amount_owed'), 2),
                fmt_num(r.get('amount_past_due'), 2),
                int(r.get('dpd') or 0),
                fmt_date_excel(r.get('default_date')),
                fmt_num(r.get('installment_amount'), 2),
                int(r.get('installment_count') or 0),
                str(r.get('frequency') or '00'),
                fmt_date_excel(r.get('maturity_date')),
            ])
            for cell in ws[ws.max_row]:
                cell.fill = fill_31
                
        for row in ws.iter_rows(min_row=2):
            row[1].number_format = '#,##0.00'
            row[2].number_format = '#,##0.00'
            row[5].number_format = '#,##0.00'

    # auto width
    for col in ws.columns:
        max_len = max((len(str(cell.value or '')) for cell in col), default=10)
        ws.column_dimensions[col[0].column_letter].width = min(max_len + 4, 40)

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)

    filename = f'Report_Status_{report_type}_{report_date}.xlsx'
    return send_file(buf, as_attachment=True, download_name=filename,
                     mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')


@bp.route('/export-all', methods=['POST'])
def export_all_reports():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json() or {}

    report_date = data.get('report_date', '')
    report_30   = data.get('report_30', []) or []
    report_31   = data.get('report_31', []) or []
    report_33   = data.get('report_33', []) or []
    alerts      = data.get('alerts', []) or []
    missing_db  = data.get('missing_db', []) or []

    if not any([report_30, report_31, report_33, alerts, missing_db]):
        return jsonify({'error': 'ไม่มีข้อมูลสำหรับ Export'}), 400

    def fmt_date_excel(val):
        if not val:
            return ''
        s = str(val).strip().split('T')[0].split(' ')[0]
        if not s or s.lower() in ['none', 'null', '-']:
            return ''
        parts = s.split('-')
        if len(parts) == 3 and len(parts[0]) == 4:
            return f"{parts[2]}/{parts[1]}/{parts[0]}"
        return s

    def fmt_num(v, decimals=2):
        return round_money(v, decimals, default=0.0)

    def fmt_acc(val):
        s = str(val).strip() if val else ''
        if len(s) == 12 and s.isdigit():
            return f"{s[:4]}-{s[4:8]}-{s[8:]}"
        return s or '-'

    wb = openpyxl.Workbook()
    wb.remove(wb.active)

    header_fill = PatternFill(start_color='1E1B4B', end_color='1E1B4B', fill_type='solid')
    header_font = Font(color='FFFFFF', bold=True)
    center      = Alignment(horizontal='center', vertical='center')
    right       = Alignment(horizontal='right', vertical='center')
    left        = Alignment(horizontal='left', vertical='center')

    fill_30      = PatternFill(start_color='FEE2E2', end_color='FEE2E2', fill_type='solid')
    fill_31      = PatternFill(start_color='DBEAFE', end_color='DBEAFE', fill_type='solid')
    fill_33      = PatternFill(start_color='D1FAE5', end_color='D1FAE5', fill_type='solid')
    fill_alert   = PatternFill(start_color='FEF3C7', end_color='FEF3C7', fill_type='solid')
    fill_missing = PatternFill(start_color='FFEDD5', end_color='FFEDD5', fill_type='solid')

    def style_header(ws):
        for cell in ws[1]:
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center

    def autofit(ws):
        for col in ws.columns:
            max_len = max((len(str(cell.value or '')) for cell in col), default=10)
            ws.column_dimensions[col[0].column_letter].width = min(max_len + 4, 45)

    def paint_row(ws, fill):
        for cell in ws[ws.max_row]:
            cell.fill = fill
            cell.alignment = left

    if report_30:
        ws = wb.create_sheet('Report 30')
        ws.append([
            'เลขที่สัญญา',
            'วันที่ฟ้อง',
            'ทุนทรัพย์ที่ฟ้อง',
            'ยอดหนี้ตามคำพิพากษา',
            'วันที่พิพากษา',
            'ยอดหนี้วันผิดนัดชำระ',
            'วันผิดนัดชำระ',
            'DPD',
            'ยอดหนี้คงเหลือ',
        ])
        style_header(ws)

        for r in report_30:
            ws.append([
                fmt_acc(r.get('account_no')),
                fmt_date_excel(r.get('filing_date')),
                fmt_num(r.get('principal_sued'), 2),
                fmt_num(r.get('judgment_debt'), 2) if r.get('judgment_debt') is not None else '',
                fmt_date_excel(r.get('judgment_date')),
                fmt_num(r.get('default_amount'), 2) if r.get('default_amount') is not None else '',
                fmt_date_excel(r.get('default_date')),
                r.get('dpd') if r.get('dpd') is not None else '',
                fmt_num(r.get('remaining_debt'), 2) if r.get('remaining_debt') is not None else '',
            ])
            paint_row(ws, fill_30)

        for row in ws.iter_rows(min_row=2):
            row[2].number_format = '#,##0.00'  # ทุนทรัพย์ที่ฟ้อง
            row[3].number_format = '#,##0.00'  # ยอดหนี้ตามคำพิพากษา
            row[5].number_format = '#,##0.00'  # ยอดหนี้วันผิดนัดชำระ
            row[8].number_format = '#,##0.00'  # ยอดหนี้คงเหลือ

        autofit(ws)

    if report_31:
        ws = wb.create_sheet('Report 31')
        ws.append([
            'เลขที่บัญชี',
            'Amount Owed',
            'Amount Past Due',
            'DPD (เดือน)',
            'Default Date',
            'Installment Amount',
            'จำนวนงวด',
            'Frequency',
            'Maturity Date',
        ])
        style_header(ws)

        for r in report_31:
            ws.append([
                fmt_acc(r.get('account_no')),
                fmt_num(r.get('amount_owed'), 2),
                fmt_num(r.get('amount_past_due'), 2),
                int(r.get('dpd') or 0),
                fmt_date_excel(r.get('default_date')),
                fmt_num(r.get('installment_amount'), 2),
                int(r.get('installment_count') or 0),
                str(r.get('frequency') or '00'),
                fmt_date_excel(r.get('maturity_date')),
            ])
            paint_row(ws, fill_31)

        for row in ws.iter_rows(min_row=2):
            row[1].number_format = '#,##0.00'
            row[2].number_format = '#,##0.00'
            row[5].number_format = '#,##0.00'

        autofit(ws)

    if report_33:
        ws = wb.create_sheet('Status 33')
        ws.append([
            'เลขที่บัญชี',
            'ชื่อลูกค้า',
            'วันที่พิพากษา',
            'ยอดหนี้รวม',
            'NCB Status',
            'สถานะ',
        ])
        style_header(ws)

        for r in report_33:
            ws.append([
                fmt_acc(r.get('account_no')),
                r.get('name') or '-',
                fmt_date_excel(r.get('judgment_date')),
                fmt_num(r.get('total_debt'), 2),
                r.get('ncb_status') or '33',
                r.get('status_label') or 'ปิดบัญชี',
            ])
            paint_row(ws, fill_33)

        for row in ws.iter_rows(min_row=2):
            row[3].number_format = '#,##0.00'

        autofit(ws)

    if alerts:
        ws = wb.create_sheet('Alerts')
        ws.append([
            'เลขที่บัญชี',
            'สถานะ',
            'วันที่ยื่นฟ้อง',
            'หมายเหตุ',
        ])
        style_header(ws)

        for r in alerts:
            ws.append([
                fmt_acc(r.get('account_no')),
                r.get('status') or '-',
                fmt_date_excel(r.get('filing_date')),
                r.get('message') or '-',
            ])
            paint_row(ws, fill_alert)

        autofit(ws)

    if missing_db:
        ws = wb.create_sheet('Missing DB')
        ws.append([
            'เลขที่บัญชี',
            'ชื่อลูกค้า',
            'หมายเหตุ',
        ])
        style_header(ws)

        for r in missing_db:
            ws.append([
                fmt_acc(r.get('account_no')),
                r.get('name') or '-',
                r.get('message') or '-',
            ])
            paint_row(ws, fill_missing)

        autofit(ws)

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)

    filename = f'Report_All_{report_date}.xlsx'
    return send_file(
        buf,
        as_attachment=True,
        download_name=filename,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

@bp.route('/generate-db', methods=['POST'])
def generate_report_db():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    data         = request.get_json()
    report_date  = data.get('report_date')
    status_types = data.get('status_types', ['30', '31'])

    if not report_date:
        return jsonify({'error': 'กรุณาระบุวันที่ขอ Report'}), 400

    db = get_db()

    customers = db.execute(
        'SELECT * FROM customers WHERE is_deleted = 0'
    ).fetchall()

    report_30 = []
    report_31 = []
    report_33 = []

    for cus_row in customers:
        cus         = dict(cus_row)
        account_no  = cus['account_no']
        case_status = (cus.get('case_status') or 'ยื่นฟ้อง').strip()

        if case_status == 'ปิดบัญชี':
            report_33.append(_build_report33_row(account_no, cus))
            continue

        if case_status == 'ยื่นฟ้อง':
            if '30' in status_types:
                report_30.append(_build_report30_row_from_db(
                    account_no,
                    case_status,
                    cus.get('filing_date'),
                    cus.get('filing_capital'),
                    cus,
                    None,
                    report_date
                ))
            continue

        payments = db.execute(
            'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
            (account_no,)
        ).fetchall()
        payments = [dict(p) for p in payments]

        try:
            snap = get_snapshot_at_date(cus, payments, report_date)
        except Exception:
            snap = None

        if case_status == 'พิพากษาฝ่ายเดียว':
            if '30' in status_types:
                report_30.append(_build_report30_row_from_db(
                    account_no,
                    case_status,
                    cus.get('filing_date'),
                    cus.get('filing_capital'),
                    cus,
                    snap,
                    report_date
                ))
            continue

        if case_status == 'บังคับคดี':
            if '30' in status_types:
                report_30.append(_build_report30_row_from_db(
                    account_no,
                    case_status,
                    cus.get('filing_date'),
                    cus.get('filing_capital'),
                    cus,
                    snap,
                    report_date
                ))
            continue

        if not snap:
            continue

        group = _get_report_group(cus, snap)

        if group == '33':
            report_33.append(_build_report33_row(account_no, cus))

        elif group == '30' and '30' in status_types:
            report_30.append(_build_report30_row_from_db(
                account_no,
                case_status,
                cus.get('filing_date'),
                cus.get('filing_capital'),
                cus,
                snap,
                report_date
            ))

        elif group == '31' and '31' in status_types:
            report_31.append(_build_report31_row(account_no, cus, snap, report_date))

    db.execute(
        """INSERT INTO report_logs
           (generated_by, report_date, filename, status_types,
            count_30, count_31, count_33, count_alerts, count_missing)
           VALUES (?,?,?,?,?,?,?,?,?)""",
        (user['id'], report_date, '[DB Report]', ','.join(status_types),
         len(report_30), len(report_31), len(report_33), 0, 0)
    )
    db.commit()

    return jsonify({
        'report_date' : report_date,
        'summary'     : {
            'report_30'  : len(report_30),
            'report_31'  : len(report_31),
            'report_33'  : len(report_33),
            'alerts'     : 0,
            'missing_db' : 0,
        },
        'report_30'   : report_30,
        'report_31'   : report_31,
        'report_33'   : report_33,
        'alerts'      : [],
        'missing_db'  : [],
    }), 200

@bp.route('/history', methods=['GET'])
def get_report_history():
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    db   = get_db()
    rows = db.execute(
        """SELECT rl.*, u.display_name as generated_by_name
           FROM report_logs rl
           LEFT JOIN users u ON u.id = rl.generated_by
           ORDER BY rl.generated_at DESC
           LIMIT 50"""
    ).fetchall()

    return jsonify({'history': [dict(r) for r in rows]}), 200