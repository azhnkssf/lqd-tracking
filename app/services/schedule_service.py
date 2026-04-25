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
        pay_by_date[pd] = float(p['amount'])

    last_due_date = get_due_date(term_months, first_pay_date)

    if end_date is not None:
        # ใช้ end_date ที่ระบุมา (สำหรับ Report Center)
        if isinstance(end_date, str):
            end_date = date.fromisoformat(end_date)
    elif not payments:
        # ยังไม่มีการชำระ → วิ่งถึงวันนี้
        end_date = date.today()
    else:
        # มีการชำระ → หยุดที่วันชำระล่าสุดเท่านั้น
        last_pay_date = date.fromisoformat(payments[-1]['payment_date']) if isinstance(payments[-1]['payment_date'], str) else payments[-1]['payment_date']
        end_date = last_pay_date

    paid_map = {}
    for i in range(1, term_months + 1):
        due = get_due_date(i, first_pay_date)
        paid_map[due] = 0.0

    rows               = []
    current_date       = filing_date
    T_current          = principal0
    O_prev             = 0.0
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
    สร้าง export rows โดย merge Plan (ทุกวันครบทุกงวด) กับ Actual (daily_rows)
    Plan columns A-J: วิ่งครบทุกวันจาก generate_schedule
    Actual columns K-Y: merge จาก daily_rows เฉพาะวันที่มีข้อมูล
    """
    # สร้าง map จาก date → actual row
    actual_map = {r['date']: r for r in daily_rows}

    export = []
    for p in plan_rows:
        d      = p['date']
        actual = actual_map.get(d)
        is_pay = actual['is_pay_date'] if actual else False

        export.append({
            'A_วันที่':                                          d,
            'B_งวดที่':                                          p['term'],
            'C_เงินต้นยกมา_(ต้นวัน)':                           p['principal_bf'],
            'D_จ่ายค่างวด':                                      p['payment'] if p['payment'] > 0 else '',
            'E_ตัดดอกเบี้ย':                                     p['interest_paid'] if p['payment'] > 0 else '',
            'F_ตัดเงินต้น':                                      p['principal_paid'] if p['payment'] > 0 else '',
            'G_ตัดชำระอื่นๆ':                                    p['other_paid'] if p['payment'] > 0 else '',
            'H_เงินต้นคงเหลือ_(สิ้นวัน)':                       p['principal_bal'],
            'I_ดอกเบี้ยรายวัน':                                  round(p['daily_interest'], 6),
            'J_ดอกเบี้ยสะสม':                                    p['acc_interest'],
            'K_วันที่จ่ายชำระ':                                   d if is_pay else '',
            'L_จำนวนเงินที่ชำระจริง':                            actual['pay_amount'] if is_pay else '',
            'M_จำนวนเงินที่ชำระจริงสะสม':                        actual['M'] if actual and actual['M'] > 0 else '',
            'N_ดอกเบี้ยรายวัน_(Actual)':                         round(actual['N'], 6) if actual else '',
            'O_ดอกเบี้ยสะสม_(Actual)':                           actual['O'] if actual else '',
            'P_ตัดดอกเบี้ย_(Actual)':                            actual['P'] if is_pay else '',
            'Q_ดอกเบี้ยคงเหลือ':                                  actual['Q'] if is_pay else '',
            'R_ตัดเงินต้น_(Actual)':                             actual['R'] if is_pay else '',
            'S_ตัดชำระอื่นๆ_(Actual)':                           actual['S'] if is_pay else '',
            'T_เงินต้นคงเหลือ_(Actual)':                         actual['T'] if actual else '',
            'U_NCB_Status_(รายวัน)':                             actual.get('ncb_days', actual['ncb_code']) if actual else '',
            'V_DPD_(รายวัน)':                                    actual['dpd_days'] if actual and actual['dpd_days'] > 0 else '',
            'W_ยอดค้างชำระสะสมรวม_(รายวัน)':                     actual['outstanding'] if actual and actual['outstanding'] > 0 else '',
            'X_NCB_Status_(รายเดือน)':                           actual.get('ncb_months', actual['ncb_code']) if actual else '',
            'Y_DPD_(รายเดือน)':                                  actual['dpd_months'] if actual and actual['dpd_months'] > 0 else '',
        })
    return export