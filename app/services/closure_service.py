from app.services.schedule_service import generate_full_daily_schedule


def get_actual_closed_date(cus, payments):
    """
    วันที่ปิดบัญชีจริง = วันที่ชำระเงินวันแรกที่ทำให้เงินต้นคงเหลือและยอดค้างเหลือเป็น 0
    ใช้ schedule engine เดิมเป็น source of truth เพื่อไม่เปลี่ยนสูตรคำนวณยอด
    """
    if not cus or not payments:
        return None

    try:
        daily_rows = generate_full_daily_schedule(dict(cus), payments)
    except Exception:
        return None

    for row in daily_rows:
        if not row.get('is_pay_date'):
            continue

        principal_bal = round(float(row.get('T') or 0), 2)
        outstanding = round(float(row.get('outstanding') or 0), 2)
        if principal_bal <= 0 and outstanding <= 0:
            return row.get('date')

    return None
