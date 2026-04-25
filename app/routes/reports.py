import io
import json
import openpyxl
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
            return '-'
        s = str(val).strip().split('T')[0].split(' ')[0]
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
            'เลขที่บัญชี', 'วันที่ยื่นฟ้อง',
            'ทุนทรัพย์ที่ยื่นฟ้อง', 'ยอดหนี้ตามคำพิพากษา',
            'วันที่พิพากษา', 'วันที่ผิดนัด',
            'ยอดหนี้วันที่ผิดนัด', 'DPD (เดือน)'
        ]
        ws.append(headers)
        for cell in ws[1]:
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center

        def fmt_num_30(v, decimals=2):
            if v is None:
                return 0.0
            try:
                return round(float(v), decimals)
            except Exception:
                return 0.0

        for r in rows:
            ws.append([
                r.get('account_no'),
                fmt_date_excel(r.get('filing_date')),
                fmt_num_30(r.get('principal_sued'), 2),
                fmt_num_30(r.get('judgment_debt'), 2),
                fmt_date_excel(r.get('judgment_date')),
                fmt_date_excel(r.get('default_date')),
                fmt_num_30(r.get('default_amount'), 2),
                r.get('dpd_months'),
            ])
            for cell in ws[ws.max_row]:
                cell.fill = fill_30

        for row in ws.iter_rows(min_row=2):
            row[2].number_format = '#,##0.00'
            row[3].number_format = '#,##0.00'
            row[6].number_format = '#,##0.00'

    elif report_type == '31':
        ws.title = 'Report Status 31'
        headers = [
            'เลขที่บัญชี', 'Amount Owed', 'Amount Past Due',
            'DPD (เดือน)', 'Default Date', 'Installment Amount',
            'จำนวนงวด', 'NCB Status'
        ]
        ws.append(headers)
        for cell in ws[1]:
            cell.fill = header_fill
            cell.font = header_font
            cell.alignment = center

        def fmt_num(v, decimals=2):
            if v is None:
                return 0.0
            try:
                return round(float(v), decimals)
            except Exception:
                return 0.0

        for r in rows:
            ws.append([
                r.get('account_no'),
                fmt_num(r.get('amount_owed'), 2),
                0.00,
                int(r.get('dpd') or 0),
                fmt_date_excel(r.get('default_date')),
                fmt_num(r.get('installment_amount'), 2),
                int(r.get('installment_count') or 0),
                str(r.get('ncb_status') or '-'),
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


@bp.route('/generate-db', methods=['POST'])
def generate_report_db():
    """สร้าง Report 30/31 จากข้อมูลใน DB ล้วนๆ ไม่ต้องอัพโหลดไฟล์
    ใช้ case_status เป็นตัวตัดสินใจ Report ไม่ใช้ ncb_months"""
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
        cus        = dict(cus_row)
        account_no = cus['account_no']

        payments = db.execute(
            'SELECT * FROM payments WHERE account_no = ? ORDER BY payment_date ASC',
            (account_no,)
        ).fetchall()
        payments = [dict(p) for p in payments]

        try:
            snap = get_snapshot_at_date(cus, payments, report_date)
        except Exception:
            continue

        if not snap:
            continue

        group = _get_report_group(cus, snap)

        if group == '33':
            report_33.append(_build_report33_row(account_no, cus))

        elif group == '30' and '30' in status_types:
            report_30.append(_build_report30_row_from_db(
                account_no,
                cus.get('case_status', '-'),
                cus.get('filing_date'),
                cus.get('total_debt'),
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