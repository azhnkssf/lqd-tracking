from datetime import date, timedelta
from dateutil.relativedelta import relativedelta


# ============================================================
# Existing: Generate Plan Schedule (ใช้กับ preview หน้า add/detail)
# ============================================================

def get_payment_for_term(installments, term, total_terms):
    h1, h2, h3, h4 = installments
    filled = [h for h in [h1, h2, h3, h4] if h > 0]
    count  = len(filled)
    if term == total_terms:
        return None
    if count == 1:   return h1
    elif count == 2: return h1 if term == 1 else h2
    elif count == 3:
        if term == 1:   return h1
        elif term == 2: return h2
        else:           return h3
    elif count == 4:
        if term == 1:   return h1
        elif term == 2: return h2
        elif term == 3: return h3
        else:           return h4
    return h1


def generate_schedule(
    filing_date, principal, interest_rate, term_months,
    diff_debt, first_pay_date,
    installment_1, installment_2=0, installment_3=0, installment_4=0,
):
    installments  = (float(installment_1), float(installment_2 or 0),
                     float(installment_3 or 0), float(installment_4 or 0))
    principal     = float(principal)
    interest_rate = float(interest_rate) / 100
    diff_debt     = float(diff_debt or 0)
    term_months   = int(term_months)

    if isinstance(filing_date, str):   filing_date   = date.fromisoformat(filing_date)
    if isinstance(first_pay_date, str): first_pay_date = date.fromisoformat(first_pay_date)

    rows           = []
    current_date   = filing_date
    target_pay     = first_pay_date
    current_term   = 1
    acc_interest   = 0.0
    daily_interest = 0.0
    closed         = False

    rows.append({
        'date': current_date.isoformat(), 'term': current_term,
        'principal_bf': round(principal, 2), 'payment': 0.0,
        'interest_paid': 0.0, 'principal_paid': 0.0, 'other_paid': 0.0,
        'principal_bal': round(principal, 2), 'daily_interest': 0.0,
        'acc_interest': 0.0, 'is_payment_date': False, 'is_early_close': False,
    })
    current_date = current_date + timedelta(days=1)

    while current_term <= term_months and not closed:
        if current_date == target_pay:
            interest_paid  = acc_interest
            old_principal  = principal
            is_early_close = False
            is_last_term   = (current_term == term_months)

            if is_last_term:
                other_paid     = diff_debt
                principal_paid = principal
                payment_amount = principal_paid + interest_paid + other_paid
                principal      = 0.0
                acc_interest   = 0.0
                daily_interest = 0.0
                closed         = True
            else:
                scheduled = get_payment_for_term(installments, current_term, term_months)
                other_paid = 0.0
                total_remaining = principal + acc_interest
                if scheduled >= total_remaining:
                    other_paid     = diff_debt
                    principal_paid = principal
                    payment_amount = principal_paid + interest_paid + other_paid
                    principal      = 0.0
                    acc_interest   = 0.0
                    daily_interest = 0.0
                    closed         = True
                    is_early_close = True
                else:
                    payment_amount = scheduled
                    if payment_amount >= acc_interest:
                        principal_paid = payment_amount - interest_paid
                        principal      = principal - principal_paid
                        daily_interest = (principal * interest_rate) / 365
                        acc_interest   = daily_interest
                    else:
                        interest_paid  = payment_amount
                        principal_paid = 0.0
                        daily_interest = (principal * interest_rate) / 365
                        acc_interest   = (acc_interest - interest_paid) + daily_interest

            rows.append({
                'date': current_date.isoformat(), 'term': current_term,
                'principal_bf': round(old_principal, 2),
                'payment': round(payment_amount, 2),
                'interest_paid': round(interest_paid, 2),
                'principal_paid': round(principal_paid, 2),
                'other_paid': round(other_paid, 2),
                'principal_bal': round(principal, 2),
                'daily_interest': round(daily_interest, 6),
                'acc_interest': round(acc_interest, 2),
                'is_payment_date': True, 'is_early_close': is_early_close,
            })
            current_term += 1
            if current_term <= term_months and not closed:
                target_pay = first_pay_date + relativedelta(months=current_term - 1)
        else:
            daily_interest = (principal * interest_rate) / 365
            acc_interest   = acc_interest + daily_interest
            old_principal  = principal
            rows.append({
                'date': current_date.isoformat(), 'term': current_term,
                'principal_bf': round(old_principal, 2), 'payment': 0.0,
                'interest_paid': 0.0, 'principal_paid': 0.0, 'other_paid': 0.0,
                'principal_bal': round(principal, 2),
                'daily_interest': round(daily_interest, 6),
                'acc_interest': round(acc_interest, 2),
                'is_payment_date': False, 'is_early_close': False,
            })
        current_date = current_date + timedelta(days=1)

    return rows


def generate_monthly_summary(rows):
    return [r for r in rows if r['is_payment_date']]


def build_installment_payment_allocations(plan_monthly, payments, daily_rows=None):
    """
    Allocate actual payments to the oldest unpaid installment first.

    The monthly comparison table should answer "which installment did this
    money settle?" rather than "which calendar term did the payment date fall
    into?". This keeps early, partial, late, and multi-payment installments on
    the correct due row.
    """
    installments = []
    for idx, row in enumerate(plan_monthly or []):
        term = int(row.get('term') or idx + 1)
        expected = round(float(row.get('payment') or 0), 2)
        installments.append({
            'term': term,
            'due_date': row.get('date'),
            'expected': expected,
            'paid_total': 0.0,
            'interest_paid': 0.0,
            'principal_paid': 0.0,
            'other_paid': 0.0,
            'remaining': expected,
            'payment_dates': [],
            'allocations': [],
            'status': 'unpaid' if expected > 0 else 'no_due',
            'completed_date': None,
        })

    sorted_payments = sorted(
        payments or [],
        key=lambda p: (
            str(p.get('payment_date') or ''),
            int(p.get('id') or 0),
        )
    )

    installment_idx = 0
    unapplied = []

    for payment in sorted_payments:
        payment_amount = round(float(payment.get('amount') or 0), 2)
        if payment_amount <= 0:
            continue

        while installment_idx < len(installments) and round(float(installments[installment_idx]['remaining'] or 0), 2) <= 0:
            installment_idx += 1

        if installment_idx >= len(installments):
            unapplied.append({
                'payment_id': payment.get('id'),
                'payment_date': payment.get('payment_date'),
                'amount': payment_amount,
                'original_amount': payment_amount,
            })
            continue

        inst = installments[installment_idx]
        payment_date = payment.get('payment_date')
        inst['paid_total'] = round(inst['paid_total'] + payment_amount, 2)
        inst['remaining'] = round(max(0.0, float(inst['expected'] or 0) - inst['paid_total']), 2)

        if payment_date and payment_date not in inst['payment_dates']:
            inst['payment_dates'].append(payment_date)

        inst['allocations'].append({
            'payment_id': payment.get('id'),
            'payment_date': payment_date,
            'amount': payment_amount,
            'original_amount': payment_amount,
        })

        if inst['remaining'] <= 0:
            inst['remaining'] = 0.0
            inst['status'] = 'overpaid' if inst['paid_total'] > inst['expected'] else 'paid'
            inst['completed_date'] = payment_date
            installment_idx += 1
        else:
            inst['status'] = 'partial'

    for inst in installments:
        for allocation in inst['allocations']:
            allocation['interest_paid'] = 0.0
            allocation['principal_paid'] = 0.0
            allocation['other_paid'] = 0.0
            allocation['principal_bal'] = None
            allocation['dpd_months'] = 0
            allocation['ncb_status'] = '31'

    pay_rows_by_date = {}
    for row in daily_rows or []:
        if not row.get('is_pay_date'):
            continue
        pay_rows_by_date[row.get('date')] = row

    for inst in installments:
        interest_paid = 0.0
        principal_paid = 0.0
        other_paid = 0.0

        for allocation in inst['allocations']:
            pay_row = pay_rows_by_date.get(allocation.get('payment_date'))
            if not pay_row:
                continue

            row_pay_amount = round(float(pay_row.get('pay_amount') or 0), 2)
            if row_pay_amount <= 0:
                continue

            # A daily row is aggregated by payment date. If one date's payment is
            # split across multiple installments, split interest/principal in the
            # same proportion as the allocated cash for display totals.
            ratio = float(allocation.get('amount') or 0) / row_pay_amount
            alloc_interest = round(float(pay_row.get('P') or 0) * ratio, 2)
            alloc_principal = round(float(pay_row.get('R') or 0) * ratio, 2)
            alloc_other = round(float(pay_row.get('S') or 0) * ratio, 2)

            allocation['interest_paid'] = alloc_interest
            allocation['principal_paid'] = alloc_principal
            allocation['other_paid'] = alloc_other
            allocation['principal_bal'] = round(float(pay_row.get('T') or 0), 2)
            allocation['dpd_months'] = int(float(pay_row.get('dpd_months') or 0))
            allocation['ncb_status'] = str(pay_row.get('ncb_months') or pay_row.get('ncb_code') or '31')

            interest_paid += alloc_interest
            principal_paid += alloc_principal
            other_paid += alloc_other

        inst['interest_paid'] = round(interest_paid, 2)
        inst['principal_paid'] = round(principal_paid, 2)
        inst['other_paid'] = round(other_paid, 2)

        if inst['expected'] <= 0:
            inst['status'] = 'no_due'
        elif inst['paid_total'] <= 0:
            inst['status'] = 'unpaid'
        elif inst['remaining'] > 0:
            inst['status'] = 'partial'
        elif inst['paid_total'] > inst['expected']:
            inst['status'] = 'overpaid'
        else:
            inst['status'] = 'paid'

    return {
        'installments': installments,
        'unapplied': unapplied,
    }


# ============================================================
# NEW: Full Daily Schedule with actual payments (port from VBA)
# ============================================================

def get_due_date(term_num, first_pay_date):
    return first_pay_date + relativedelta(months=term_num - 1)


def get_term_number(pay_date, first_pay_date, term_months):
    for i in range(1, term_months + 1):
        if pay_date <= get_due_date(i, first_pay_date):
            return i
    return term_months


def get_installment_for_term(term_num, term_months, inst1, inst2, inst3, inst4):
    if term_num == term_months:
        return 0
    h = [float(inst1 or 0), float(inst2 or 0), float(inst3 or 0), float(inst4 or 0)]
    filled = [x for x in h if x > 0]
    count  = len(filled)
    if count == 0: return 0
    if count == 1: return filled[0]
    if term_num == 1: return filled[0]
    if term_num == 2: return filled[1] if count >= 2 else filled[0]
    if term_num == 3: return filled[2] if count >= 3 else (filled[1] if count >= 2 else filled[0])
    return filled[3] if count >= 4 else (filled[2] if count >= 3 else (filled[1] if count >= 2 else filled[0]))


# ============================================================
# Helpers: Default Judgment / พิพากษาฝ่ายเดียว
# ============================================================

def is_single_default_judgment(cus):
    """
    ใช้เฉพาะ Actual Payment เท่านั้น
    - พิพากษาฝ่ายเดียวตามคำพิพากษายังคงมี 1 งวด
    - แต่ถ้าจ่ายไม่ครบ ระบบจะคำนวณ virtual follow-up ต่อให้เอง
    """
    case_value = (cus.get('case_status') or cus.get('judgment_type') or '').strip()
    try:
        term_count = int(cus.get('installment_count') or 0)
    except Exception:
        term_count = 0

    if term_count != 1:
        return False

    if case_value == 'พิพากษาฝ่ายเดียว':
        return True

    return is_enforcement_from_default_judgment(cus)


def get_enforcement_from_status(cus):
    for log in reversed(cus.get('_case_status_logs') or []):
        if str(log.get('to_status') or '').strip() == 'บังคับคดี':
            return str(log.get('from_status') or '').strip()
    return ''


def is_enforcement_from_default_judgment(cus):
    return (
        (cus.get('case_status') or '').strip() == 'บังคับคดี'
        and get_enforcement_from_status(cus) == 'พิพากษาฝ่ายเดียว'
    )


def _virtual_due_index_for_date(row_date, first_pay_date):
    """
    คืนเลขงวดตาม due date แบบ virtual
    เช่น first_due=15/03
    - 14/04 ยังอยู่ช่วงงวด 1
    - 15/04 เป็นต้นไปเป็นงวด 2
    """
    diff_months = (row_date.year - first_pay_date.year) * 12 + (row_date.month - first_pay_date.month)
    if row_date.day < first_pay_date.day:
        diff_months -= 1
    return max(1, diff_months + 1)


def _effective_term_months_for_actual(cus, first_pay_date, end_date, original_term_months):
    """
    ตามยอม: ใช้จำนวนงวดเดิม 100%
    ฝ่ายเดียว 1 งวด: ขยายจำนวนงวดเฉพาะในการคำนวณ Actual เป็น virtual term
    เพื่อให้ due date เดิมและ due date ถัด ๆ ไปถูกนับใน DPD/NCB/outstanding
    โดยไม่แก้ installment_count ใน DB
    """
    if not is_single_default_judgment(cus):
        return original_term_months

    due_index = _virtual_due_index_for_date(end_date, first_pay_date)

    # ต้อง +1 เพื่อให้ due date ของงวดปัจจุบันไม่ถูกมองเป็นงวดสุดท้าย
    # เพราะ get_installment_for_term() เดิม return 0 เมื่อ term_num == term_months
    return max(2, due_index + 1)


def _next_virtual_due_after(row_date, first_pay_date):
    """หา due date ถัดไปของฝ่ายเดียว เพื่อให้ดอกวิ่งต่อถึงวันครบกำหนดถัดไป"""
    due_index = _virtual_due_index_for_date(row_date, first_pay_date)
    current_due = get_due_date(due_index, first_pay_date)
    if row_date >= current_due:
        return get_due_date(due_index + 1, first_pay_date)
    return current_due


def _default_single_month_dpd(row_date, first_pay_date, total_outstanding):
    """DPD/NCB รายเดือนสำหรับฝ่ายเดียว กรณีไม่มี arr_due จากตารางเดิม"""
    if row_date.year == first_pay_date.year and row_date.month == first_pay_date.month:
        return 0, '31'

    first_of_next = date(first_pay_date.year, first_pay_date.month, 1) + relativedelta(months=1)
    dpd_months = max(0, (row_date - first_of_next).days + 1)
    ncb_months = '30' if total_outstanding > 0 else '31'
    return dpd_months, ncb_months


def _calc_extra_paid(row_date, payments_list, paid_map, first_pay_date, term_months,
                     inst1, inst2, inst3, inst4):
    """
    Port VBA extraPaid logic (line 271-284):
    หายอดที่จ่ายหลัง lastDueDate ของงวดค้างล่าสุด ถึง row_date
    เพื่อนำมาตัดยอดค้างก่อนคำนวณ newOldestDueDate
    """
    # หา arr_due เบื้องต้นก่อน (เหมือน calc_dpd_and_ncb)
    arr_due  = []
    arr_owed = []
    for i in range(1, term_months):
        due_date     = get_due_date(i, first_pay_date)
        if due_date > row_date:
            break
        term_payment = get_installment_for_term(i, term_months, inst1, inst2, inst3, inst4)
        paid_in_term = paid_map.get(due_date, 0.0)
        budget_left  = paid_in_term
        for k in range(len(arr_owed)):
            if arr_owed[k] > 0:
                if budget_left >= arr_owed[k]:
                    budget_left -= arr_owed[k]; arr_owed[k] = 0
                else:
                    arr_owed[k] -= budget_left; budget_left = 0; break
        if budget_left < term_payment:
            arr_due.append(due_date)
            arr_owed.append(term_payment - budget_left)

    arr_due  = [d for d, o in zip(arr_due, arr_owed) if o > 0]
    if not arr_due:
        return 0.0

    last_due_in_arr = arr_due[-1]

    # รวมยอดที่จ่ายหลัง last_due_in_arr ถึง row_date จาก payments list
    extra = 0.0
    for p in payments_list:
        pd = date.fromisoformat(p['payment_date']) if isinstance(p['payment_date'], str) else p['payment_date']
        if pd > last_due_in_arr and pd <= row_date:
            extra += float(p['amount'])
    return extra


def calc_dpd_and_ncb(row_date, first_pay_date, term_months, paid_map,
                     inst1, inst2, inst3, inst4, extra_paid_val=0.0):
    """
    คำนวณ DPD และ NCB แยก 2 แบบ

    DPD (วัน) / NCB (วัน):
      - วัน due: เช็ค M >= Expected → ถ้าครบ DPD=0 NCB=31, ถ้าไม่ครบ DPD=0 NCB=31 (ยังไม่นับวัน due)
      - วันถัดไปหลัง due: DPD=1 NCB=30 ทันที
      - นับต่อเนื่องทุกวัน

    DPD (ด.) / NCB (ด.):
      - วัน due ถึงสิ้นเดือน: DPD=0 NCB=31
      - วันที่ 1 ของเดือนถัดไป: เช็ค M >= Expected → ถ้าไม่ครบ DPD=1 NCB=30

    return (dpd_days, ncb_days, dpd_months, ncb_months, outstanding)
    """
    if row_date < first_pay_date:
        return 0, '31', 0, '31', 0.0, None, 0.0

    # หา oldest due date ที่ยังค้างอยู่
    arr_due  = []
    arr_owed = []

    for i in range(1, term_months):
        due_date     = get_due_date(i, first_pay_date)
        if due_date > row_date:
            break
        term_payment = get_installment_for_term(i, term_months, inst1, inst2, inst3, inst4)
        paid_in_term = paid_map.get(due_date, 0.0)

        budget_left = paid_in_term
        for k in range(len(arr_owed)):
            if arr_owed[k] > 0:
                if budget_left >= arr_owed[k]:
                    budget_left -= arr_owed[k]
                    arr_owed[k]  = 0
                else:
                    arr_owed[k] -= budget_left
                    budget_left  = 0
                    break

        if budget_left < term_payment:
            arr_due.append(due_date)
            arr_owed.append(term_payment - budget_left)

    arr_due  = [d for d, o in zip(arr_due, arr_owed) if o > 0]
    arr_owed = [o for o in arr_owed if o > 0]

    if not arr_due:
        return 0, '31', 0, '31', 0.0, None, 0.0

    # ============================================================
    # VBA extraPaid logic (line 271-297)
    # ตัดยอดค้างด้วย extra_paid_val เพื่อหา newOldestDueDate
    # ============================================================
    if extra_paid_val > 0:
        remaining = extra_paid_val
        for k in range(len(arr_owed)):
            if arr_owed[k] > 0:
                if remaining >= arr_owed[k]:
                    remaining   -= arr_owed[k]
                    arr_owed[k]  = 0
                else:
                    arr_owed[k] -= remaining
                    remaining    = 0
                    break
        arr_due  = [d for d, o in zip(arr_due, arr_owed) if o > 0]
        arr_owed = [o for o in arr_owed if o > 0]
        if not arr_due:
            return 0, '31', 0, '31', 0.0, None, 0.0

    oldest_due = arr_due[0]
    total_owed = sum(arr_owed)

    # ============================================================
    # DPD (วัน) / NCB (วัน)
    # วัน due เอง → DPD=0, NCB=31 (ยังไม่นับ)
    # วันถัดไป (due+1 วัน) → DPD=1, NCB=30 ทันที
    # ============================================================
    if row_date <= oldest_due:
        dpd_days = 0
        ncb_days = '31'
    else:
        dpd_days = (row_date - oldest_due).days  # due+1=1, due+2=2, ...
        ncb_days = '30'

    # ============================================================
    # DPD (ด.) / NCB (ด.)
    # วัน due ถึงสิ้นเดือน → DPD=0, NCB=31
    # ขึ้นเดือนใหม่ (วันที่ 1 ของเดือนถัดจาก oldest_due) → เช็ค ถ้ายังค้าง DPD=1, NCB=30
    # ============================================================
    # DPD (ด.) / NCB (ด.)
    # ถ้าอยู่เดือนเดียวกับ oldest_due → 0
    # ข้ามเดือน → นับจากวันที่ 1 ของเดือนถัดจาก oldest_due
    # เช่น oldest_due=16/05, row=01/06 → DPD_m=1, row=02/06 → DPD_m=2
    if row_date.year == oldest_due.year and row_date.month == oldest_due.month:
        dpd_months = 0
        ncb_months = '31'
    else:
        first_of_next = date(oldest_due.year, oldest_due.month, 1) + relativedelta(months=1)
        dpd_months    = max(0, (row_date - first_of_next).days + 1)
        ncb_months    = '30' if total_owed > 0 else '31'

    oldest_due_amount = arr_owed[0] if arr_owed else 0.0
    return dpd_days, ncb_days, dpd_months, ncb_months, total_owed, oldest_due, oldest_due_amount


def generate_full_daily_schedule(cus, payments, end_date=None):
    """
    Port VBA GenerateActualPayment logic มา Python
    cus      = dict จาก DB (customers table)
    payments = list of dict จาก DB (payments table) เรียงตาม payment_date ASC
    end_date = วันที่หยุดคำนวณ (str YYYY-MM-DD หรือ date object)
               ถ้าไม่ระบุ → ใช้วันจ่ายล่าสุด หรือ due date งวดสุดท้าย
    return   = list of daily row dicts
    """
    filing_date    = date.fromisoformat(cus['filing_date'])
    first_pay_date = date.fromisoformat(cus['first_due_date'])
    principal0     = float(cus['principal'])
    interest_rate  = float(cus['interest_rate']) / 100
    default_rate   = float(cus.get('default_interest_rate') or 0) / 100
    term_months    = int(cus['installment_count'])
    inst1          = float(cus.get('installment_1') or 0)
    inst2          = float(cus.get('installment_2') or 0)
    inst3          = float(cus.get('installment_3') or 0)
    inst4          = float(cus.get('installment_4') or 0)
    diff_debt      = (float(cus.get('court_fee') or 0) +
                      float(cus.get('lawyer_fee') or 0) +
                      float(cus.get('total_debt') or 0) -
                      float(cus.get('principal') or 0))

    pay_by_date    = {}
    for p in payments:
        pd = date.fromisoformat(p['payment_date']) if isinstance(p['payment_date'], str) else p['payment_date']
        pay_by_date[pd] = pay_by_date.get(pd, 0.0) + float(p['amount'])

    original_term_months = term_months
    is_default_single    = is_single_default_judgment(cus)
    last_due_date        = get_due_date(term_months, first_pay_date)

    if end_date is not None:
        # ใช้ end_date ที่ระบุมา (สำหรับ Report Center)
        if isinstance(end_date, str):
            end_date = date.fromisoformat(end_date)
    elif is_default_single:
        # พิพากษาฝ่ายเดียว + 1 งวด:
        # ต้องรัน Actual ต่อให้เห็นงวดติดตามยอดคงเหลือทุกเดือน
        # - ถ้ายังไม่จ่ายและเลย due แล้ว: รันถึง due ถัดไปเสมอ
        #   เช่น first_due 04/03, today 28/04 => ต้องเห็น 04/03, 04/04, 04/05
        # - ถ้ามี payment แล้วแต่ยังไม่ปิดบัญชี: รันถึง due ถัดไปจาก max(วันจ่ายล่าสุด, วันนี้)
        # - ถ้าปิดบัญชีแล้ว: หยุดที่วันจ่ายล่าสุด เพื่อไม่สร้างงวดอนาคตเกินจริง
        today = date.today()

        if not payments:
            if today >= first_pay_date:
                end_date = _next_virtual_due_after(today, first_pay_date)
            else:
                end_date = today
        else:
            sorted_payments = sorted(
                payments,
                key=lambda p: date.fromisoformat(p['payment_date']) if isinstance(p['payment_date'], str) else p['payment_date']
            )
            last_pay_date = sorted_payments[-1]['payment_date']
            if isinstance(last_pay_date, str):
                last_pay_date = date.fromisoformat(last_pay_date)

            # รอบแรกคำนวณถึงวันจ่ายล่าสุดก่อน เพื่อดูว่าปิดบัญชีแล้วหรือยัง
            # ใช้ recursive call แบบระบุ end_date จึงไม่กลับเข้าบล็อก auto-end-date นี้อีก
            probe_rows = generate_full_daily_schedule(cus, payments, end_date=last_pay_date)
            probe_last = probe_rows[-1] if probe_rows else None
            principal_left = round(float((probe_last or {}).get('T') or principal0), 2)
            outstanding_left = round(float((probe_last or {}).get('outstanding') or 0), 2)

            if principal_left <= 0 and outstanding_left <= 0:
                end_date = last_pay_date
            else:
                anchor_date = max(last_pay_date, today)
                end_date = _next_virtual_due_after(anchor_date, first_pay_date)
    elif not payments:
        # เคสอื่นคง logic เดิม: ยังไม่มีการชำระ → วิ่งถึงวันนี้
        end_date = date.today()
    else:
        last_pay_date = date.fromisoformat(payments[-1]['payment_date']) if isinstance(payments[-1]['payment_date'], str) else payments[-1]['payment_date']
        # ตามยอม/เคสอื่น: คง logic เดิม หยุดที่วันชำระล่าสุดเท่านั้น
        end_date = last_pay_date

    term_months = _effective_term_months_for_actual(
        cus, first_pay_date, end_date, original_term_months
    )

    paid_map = {}
    for i in range(1, term_months + 1):
        due = get_due_date(i, first_pay_date)
        paid_map[due] = 0.0

    rows               = []
    current_date       = filing_date
    T_current          = principal0
    O_prev             = 0.0
    other_remaining    = diff_debt if is_default_single else 0.0
    M_term             = {}
    term_closed        = set()
    ncb_ever_30_days   = False   # NCB (วัน) taint — เมื่อเป็น 30 แล้วไม่กลับ
    ncb_ever_30_months = False   # NCB (ด.) taint — เมื่อเป็น 30 แล้วไม่กลับ

    while current_date <= end_date:
        is_pay_day    = current_date in pay_by_date
        pay_amount    = pay_by_date.get(current_date, 0.0)
        term_num      = get_term_number(current_date, first_pay_date, term_months)
        due_date_term = get_due_date(term_num, first_pay_date)
        is_due_date   = (current_date == due_date_term and term_num < term_months)

        # คำนวณ extra_paid_val = ยอดที่จ่ายหลัง lastDueDate ของ arr_due ถึง current_date
        # ใช้สำหรับ VBA extraPaid logic
        _extra = _calc_extra_paid(current_date, payments, paid_map,
                                   first_pay_date, term_months, inst1, inst2, inst3, inst4)
        dpd_days, ncb_days, dpd_months, ncb_months, outstanding, oldest_due, oldest_due_amount = calc_dpd_and_ncb(
            current_date, first_pay_date, term_months, paid_map,
            inst1, inst2, inst3, inst4, extra_paid_val=_extra
        )
        # NCB Taint Logic (VBA CalcMonthlyNCBStatus line 1149):
        # เมื่อเคยเป็น 30 แล้วจะไม่กลับเป็น 31 อีก
        if ncb_days   == '30': ncb_ever_30_days   = True
        if ncb_months == '30': ncb_ever_30_months = True
        if ncb_ever_30_days:   ncb_days   = '30'
        if ncb_ever_30_months: ncb_months = '30'

        # ncb_code ใช้สำหรับ active_rate (ดอกเบี้ยผิดนัด)
        ncb_code = ncb_days

        if interest_rate > 0:
            active_rate = interest_rate
        elif ncb_code == '30':
            active_rate = default_rate
        else:
            active_rate = 0.0

        if current_date == filing_date:
            N_val = 0.0
        else:
            N_val = (T_current * active_rate) / 365

        if is_pay_day:
            M_term[term_num] = M_term.get(term_num, 0.0) + pay_amount
            paid_map[due_date_term] = M_term.get(term_num, 0.0)

            if is_default_single:
                # ฝ่ายเดียว: จ่ายเงินจริงต้องตัดตามลำดับใหม่
                # 1) ดอกเบี้ยค้าง 2) เงินต้น 3) ยอดส่วนต่าง/ค่าอื่น ๆ
                # สำคัญ: ถ้าเงินต้นยังไม่หมด ห้ามตัดส่วนต่าง
                # ส่วนต่างจะถูกตัดเฉพาะหลังจากดอกค้างและเงินต้นถูกปิดหมดแล้วเท่านั้น
                budget_left = pay_amount

                # 1) ตัดดอกเบี้ยค้างก่อน
                P_val = min(budget_left, O_prev)
                budget_left -= P_val
                Q_val = max(0.0, O_prev - P_val)

                # 2) ถ้าดอกค้างหมดแล้ว ค่อยตัดเงินต้น
                if round(Q_val, 2) <= 0:
                    R_val = min(budget_left, T_current)
                    budget_left -= R_val
                    T_current = max(0.0, T_current - R_val)
                else:
                    R_val = 0.0

                # 3) ตัดส่วนต่าง/ค่าอื่น ๆ เฉพาะตอนปิดดอก + ปิดต้นครบแล้ว
                if round(Q_val, 2) <= 0 and round(T_current, 2) <= 0:
                    S_val = min(budget_left, other_remaining)
                    budget_left -= S_val
                    other_remaining = max(0.0, other_remaining - S_val)
                else:
                    S_val = 0.0

                # ถ้าปิดต้น + ค่าอื่น + ดอกค้างครบแล้ว ไม่ต้องตั้งดอกใหม่ในวันนั้น
                if round(T_current, 2) <= 0 and round(other_remaining, 2) <= 0 and round(Q_val, 2) <= 0:
                    T_current = 0.0
                    other_remaining = 0.0
                    N_val = 0.0
                    O_val = 0.0
                else:
                    # ดอกเบี้ยรายวันคิดจากเงินต้นคงเหลือเท่านั้น
                    N_val = (T_current * active_rate) / 365
                    O_val = Q_val + N_val
            else:
                # ตามยอม/เคสอื่น: คง logic เดิม
                if pay_amount >= O_prev:
                    P_val = O_prev
                    R_val = pay_amount - P_val
                    Q_val = 0.0
                    S_val = 0.0
                    T_current = T_current - R_val
                    if T_current < 0:
                        T_current = 0.0
                    N_val = (T_current * active_rate) / 365
                    O_val = N_val
                else:
                    P_val = pay_amount
                    Q_val = O_prev - pay_amount
                    R_val = 0.0
                    S_val = 0.0
                    O_val = Q_val + N_val

            if is_due_date:
                term_payment  = get_installment_for_term(term_num, term_months, inst1, inst2, inst3, inst4)
                m_at_due      = M_term.get(term_num, 0.0)
                if round(m_at_due, 2) >= round(term_payment, 2):
                    status_text = 'Fully Paid' if round(m_at_due, 2) == round(term_payment, 2) else 'Over Paid'
                    ncb_at_due  = '31'
                else:
                    status_text = 'Under Paid'
                    # NCB ที่ due date ใช้ค่าจาก dpd_months ไม่ใช่แค่เช็คจ่ายครบ
                    # ถ้า dpd_months = 0 (อยู่เดือนเดียวกับ oldest_due) → NCB = 31
                    # ถ้า dpd_months >= 1 (ข้ามเดือนแล้ว) → NCB = 30
                    ncb_at_due  = ncb_code
                term_closed.add(term_num)
            else:
                status_text = ''
                ncb_at_due  = ncb_code

            O_prev = O_val
        else:
            O_val   = O_prev + N_val
            P_val   = 0.0
            Q_val   = 0.0
            R_val   = 0.0
            S_val   = 0.0

            if is_due_date and term_num not in term_closed:
                m_at_due     = M_term.get(term_num, 0.0)
                term_payment = get_installment_for_term(term_num, term_months, inst1, inst2, inst3, inst4)
                if round(m_at_due, 2) >= round(term_payment, 2):
                    status_text = 'Fully Paid' if round(m_at_due, 2) == round(term_payment, 2) else 'Over Paid'
                    ncb_at_due  = '31'
                else:
                    status_text = 'Under Paid'
                    ncb_at_due  = ncb_code
            else:
                status_text = ''
                ncb_at_due  = ncb_code

        is_last_term = (term_num == term_months and current_date == get_due_date(term_months, first_pay_date))
        if is_default_single:
            other_paid = S_val if is_pay_day else 0.0

            # ฝ่ายเดียว: outstanding ต้องเป็นยอดปิดบัญชีจริง ณ วันนั้น
            # = เงินต้นคงเหลือ + ดอกเบี้ยค้าง + ค่าอื่นคงเหลือ
            payoff_outstanding = T_current + O_val + other_remaining
            if current_date < first_pay_date:
                payoff_outstanding = 0.0

            if current_date >= first_pay_date and payoff_outstanding > 0:
                if oldest_due is None:
                    oldest_due = first_pay_date
                    oldest_due_amount = payoff_outstanding

                if current_date <= oldest_due:
                    dpd_days = 0
                    ncb_days = '31'
                else:
                    dpd_days = (current_date - oldest_due).days
                    ncb_days = '30'

                dpd_months, ncb_months = _default_single_month_dpd(
                    current_date, oldest_due, payoff_outstanding
                )

                outstanding = payoff_outstanding
                oldest_due_amount = payoff_outstanding
            else:
                outstanding = 0.0
                oldest_due_amount = 0.0
                if round(T_current, 2) <= 0 and round(other_remaining, 2) <= 0 and round(O_val, 2) <= 0:
                    status_text = 'Fully Paid' if is_pay_day else status_text
                    ncb_at_due = '31'
        else:
            if is_last_term and is_pay_day:
                other_paid  = diff_debt
                T_current   = max(0.0, T_current)
                status_text = 'Fully Paid'
                ncb_at_due  = '31'
            else:
                other_paid = 0.0

        rows.append({
            'date':         current_date.isoformat(),
            'term':         term_num,
            'is_due_date':  is_due_date,
            'is_pay_date':  is_pay_day,
            'pay_amount':   round(pay_amount, 2),
            'M':            round(M_term.get(term_num, 0.0), 2),
            'N':            round(N_val, 6),
            'O':            round(O_val, 2),
            'P':            round(P_val, 2),
            'Q':            round(Q_val, 2),
            'R':            round(R_val, 2),
            'S':            round(S_val, 2),
            'T':            round(T_current, 2),
            'other_paid':   round(other_paid, 2),
            'status_text':  status_text,
            'ncb_code':     ncb_at_due,
            'dpd_days':     dpd_days,
            'ncb_days':     ncb_days,
            'dpd_months':   dpd_months,
            'ncb_months':   ncb_months,
            'outstanding':      round(outstanding, 2),
            'oldest_due':       oldest_due.isoformat() if oldest_due else None,
            'oldest_due_amount': round(oldest_due_amount, 2),
        })

        if not is_pay_day:
            O_prev = O_val

        current_date = current_date + timedelta(days=1)

    return rows


def build_export_rows(plan_rows, daily_rows, cus):
    """
    สร้าง export rows โดย merge Plan กับ Actual

    สำคัญสำหรับ "พิพากษาฝ่ายเดียว + 1 งวด":
    - plan_rows ตามคำพิพากษามีแค่ 1 งวด จึงจบที่ maturity เดิม
    - แต่ actual daily_rows ถูกคำนวณต่อเป็น virtual follow-up ทุกเดือน
    - ดังนั้นคอลัมน์ฝั่งซ้าย (A-J) ต้องไม่ว่างหลัง maturity เดิม
      ให้เติมจาก actual rows เพื่อให้ Excel เห็น daily timeline ต่อเนื่องเหมือนฝั่งขวา
    """
    plan_map = {r['date']: r for r in (plan_rows or [])}
    actual_map = {r['date']: r for r in (daily_rows or [])}

    all_dates = sorted(set(plan_map.keys()) | set(actual_map.keys()))

    is_default_single = is_single_default_judgment(cus)

    def _num(v, default=0.0):
        try:
            return float(v or 0)
        except Exception:
            return default

    def _round_money(v):
        return round(_num(v), 2)

    def _fallback_plan_from_actual(actual):
        """
        แปลง actual daily row ให้เติมฝั่ง Plan (A-J) สำหรับฝ่ายเดียวหลัง maturity เดิม
        เพื่อให้ export ไม่ว่างหลัง plan row เดิมหมด
        """
        if not actual:
            return None

        t_end = _num(actual.get('T'))
        principal_bf = t_end + _num(actual.get('R'))
        acc_interest = _num(actual.get('O'))
        daily_interest = _num(actual.get('N'))
        outstanding = _num(actual.get('outstanding'))
        other_due = max(0.0, outstanding - t_end - acc_interest)

        is_virtual_due = bool(actual.get('is_due_date'))
        is_payment_day = bool(actual.get('is_pay_date'))

        # ฝั่งซ้ายของ Excel คือภาพ timeline/expected payoff
        # สำหรับวัน due ให้แสดงยอดปิดบัญชี ณ วันนั้น
        # สำหรับวันจ่ายจริง ให้แสดงยอดตัดจริงของวันนั้นด้วย เพื่อ audit ง่าย
        show_payment_cols = is_virtual_due or is_payment_day

        payment_amount = ''
        interest_paid = ''
        principal_paid = ''
        other_paid = ''
        principal_bal = t_end
        plan_daily_interest = daily_interest
        plan_acc_interest = acc_interest

        if show_payment_cols:
            if is_payment_day:
                payment_amount = _round_money(actual.get('pay_amount'))
                interest_paid = _round_money(actual.get('P'))
                principal_paid = _round_money(actual.get('R'))
                other_paid = _round_money(actual.get('S'))
                principal_bal = _round_money(actual.get('T'))
                plan_daily_interest = _round_money(actual.get('N')) if _num(actual.get('N')) else 0
                plan_acc_interest = _round_money(actual.get('O'))
            else:
                # virtual due แต่ยังไม่จ่าย: แสดงยอดที่ควรจ่ายเพื่อปิด ณ due นั้น
                payment_amount = _round_money(outstanding)
                interest_paid = _round_money(acc_interest)
                principal_paid = _round_money(t_end)
                other_paid = _round_money(other_due)
                # ไม่สมมติว่าจ่ายแล้วจริง จึงยังให้ยอดสิ้นวันคงเหลือตาม actual
                principal_bal = _round_money(t_end)
                plan_daily_interest = _round_money(daily_interest) if daily_interest else 0
                plan_acc_interest = _round_money(acc_interest)

        return {
            'date': actual.get('date'),
            'term': actual.get('term'),
            'principal_bf': _round_money(principal_bf),
            'payment': payment_amount,
            'interest_paid': interest_paid,
            'principal_paid': principal_paid,
            'other_paid': other_paid,
            'principal_bal': _round_money(principal_bal),
            'daily_interest': round(plan_daily_interest, 6) if plan_daily_interest != '' else '',
            'acc_interest': _round_money(plan_acc_interest) if plan_acc_interest != '' else '',
            'is_payment_date': show_payment_cols,
        }

    export = []
    for d in all_dates:
        p = plan_map.get(d)
        actual = actual_map.get(d)

        # ตามยอม/เคสเดิม: ใช้ plan เดิมถ้ามีเท่านั้น
        # ฝ่ายเดียว: ถ้า plan เดิมไม่มีแล้ว ให้เติมจาก actual เพื่อให้ A-J รันต่อเนื่อง
        display_plan = p
        if is_default_single and display_plan is None and actual is not None:
            display_plan = _fallback_plan_from_actual(actual)

        is_pay = bool(actual and actual.get('is_pay_date'))

        export.append({
            'A_วันที่':                                          d,
            'B_งวดที่':                                          (display_plan.get('term') if display_plan else (actual.get('term') if actual else '')),
            'C_เงินต้นยกมา_(ต้นวัน)':                           (display_plan.get('principal_bf') if display_plan else ''),
            'D_จ่ายค่างวด':                                      (display_plan.get('payment') if display_plan and display_plan.get('payment', '') != '' else ''),
            'E_ตัดดอกเบี้ย':                                     (display_plan.get('interest_paid') if display_plan and display_plan.get('interest_paid', '') != '' else ''),
            'F_ตัดเงินต้น':                                      (display_plan.get('principal_paid') if display_plan and display_plan.get('principal_paid', '') != '' else ''),
            'G_ตัดชำระอื่นๆ':                                    (display_plan.get('other_paid') if display_plan and display_plan.get('other_paid', '') != '' else ''),
            'H_เงินต้นคงเหลือ_(สิ้นวัน)':                       (display_plan.get('principal_bal') if display_plan else ''),
            'I_ดอกเบี้ยรายวัน':                                  (round(display_plan.get('daily_interest', 0), 6) if display_plan and display_plan.get('daily_interest', '') != '' else ''),
            'J_ดอกเบี้ยสะสม':                                    (display_plan.get('acc_interest') if display_plan else ''),
            'K_วันที่จ่ายชำระ':                                   d if is_pay else '',
            'L_จำนวนเงินที่ชำระจริง':                            actual['pay_amount'] if is_pay else '',
            'M_จำนวนเงินที่ชำระจริงสะสม':                        actual['M'] if actual and actual.get('M', 0) > 0 else '',
            'N_ดอกเบี้ยรายวัน_(Actual)':                         round(actual['N'], 6) if actual else '',
            'O_ดอกเบี้ยสะสม_(Actual)':                           actual['O'] if actual else '',
            'P_ตัดดอกเบี้ย_(Actual)':                            actual['P'] if is_pay else '',
            'Q_ดอกเบี้ยคงเหลือ':                                  actual['Q'] if is_pay else '',
            'R_ตัดเงินต้น_(Actual)':                             actual['R'] if is_pay else '',
            'S_ตัดชำระอื่นๆ_(Actual)':                           actual['S'] if is_pay else '',
            'T_เงินต้นคงเหลือ_(Actual)':                         actual['T'] if actual else '',
            'U_NCB_Status_(รายวัน)':                             actual.get('ncb_days', actual.get('ncb_code')) if actual else '',
            'V_DPD_(รายวัน)':                                    actual['dpd_days'] if actual and actual.get('dpd_days', 0) > 0 else '',
            'W_ยอดค้างชำระสะสมรวม_(รายวัน)':                   actual['outstanding'] if actual and actual.get('outstanding', 0) > 0 else '',
            'X_NCB_Status_(รายเดือน)':                           actual.get('ncb_months', actual.get('ncb_code')) if actual else '',
            'Y_DPD_(รายเดือน)':                                  actual['dpd_months'] if actual and actual.get('dpd_months', 0) > 0 else '',
        })
    return export
