const role        = sessionStorage.getItem('role') || '';
    const displayName = sessionStorage.getItem('display_name') || '';

    function isAdminRole() {
        return role === 'admin';
    }

    function isUserRole() {
        return role === 'user';
    }

    function canRecordEnforcementRole() {
        return isUserRole() || isAdminRole();
    }

    function editPermissionMessage(caseStatus) {
        if (caseStatus === 'ยื่นฟ้อง') {
            return 'สถานะยื่นฟ้องอนุญาตให้ User และ Admin แก้ไขได้เท่านั้น';
        }
        return 'สถานะนี้อนุญาตให้แก้ไขได้เฉพาะ Admin เท่านั้น';
    }

    function canEditJudgmentData(caseStatus) {
        // ปิดบัญชีแล้วไม่ให้แก้จากหน้านี้ แม้เป็น admin
        if (caseStatus === 'ปิดบัญชี') return false;

        // สถานะยื่นฟ้องให้ user และ admin แก้ไขได้
        if (caseStatus === 'ยื่นฟ้อง') {
            return isUserRole() || isAdminRole();
        }

        // สถานะอื่นที่ยังแก้ได้ ต้องเป็น admin เท่านั้น
        return isAdminRole();
    }

    function canSeeAdminMenu() {
        // superadmin ยังเห็นเมนูส่วนจัดการระบบ/user ได้
        // แต่ไม่ได้สิทธิ์แก้ข้อมูลคดี
        return role === 'admin' || role === 'superadmin';
    }

    function getCookie(name) {
        return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] || '';
    }

    // ---- ดึง account_no จาก URL ----
    const urlParams  = new URLSearchParams(window.location.search);
    const accountNo  = urlParams.get('account') || '';
    let originalData = null;

    function getSafeReturnTo(fallback = '/customer-list') {
        const returnTo = urlParams.get('return_to') || '';
        if (returnTo.startsWith('/customer-list')) return returnTo;
        return fallback;
    }

    function setupUI() {
        if (!role) { window.location.href = '/login'; return; }
        if (!accountNo) { window.location.href = getSafeReturnTo('/customer-list'); return; }
        const backLink = document.getElementById('customer-detail-back-link');
        if (backLink) backLink.href = getSafeReturnTo('/customer-list');
        const roleLabels = { 'user': 'User', 'admin': 'Admin', 'superadmin': 'Super Admin' };
        const label = roleLabels[role] || role;
        document.getElementById('nav-role').textContent           = label;
        document.getElementById('sidebar-role-label').textContent = label + ' Terminal';
        document.getElementById('nav-avatar').textContent         = displayName.charAt(0) || '-';

        if (canSeeAdminMenu()) {
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');
        }
    }

    function setDateRuleLocked(id, locked, title = '') {
        const display = document.getElementById('dp-display-' + id);
        if (!display) return;

        display.style.pointerEvents = locked ? 'none' : '';
        display.style.opacity = locked ? '1' : '';
        display.classList.toggle('cursor-not-allowed', locked);
        display.classList.toggle('dp-autocalc', locked);
        display.title = locked ? title : '';
    }

    function setJudgmentFormLocked(locked) {
        const editableInputIds = [
            'red-case-no',
            'total-debt',
            'principal',
            'interest-rate',
            'court-fee',
            'lawyer-fee',
            'installment-count',
            'installment-1',
            'installment-2',
            'installment-3',
            'installment-4',
            'default-interest-rate',
            'judgment-note'
        ];

        editableInputIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            el.readOnly = locked;
            el.classList.toggle('bg-slate-50/50', locked);
            el.classList.toggle('text-slate-500', locked);
            el.classList.toggle('cursor-not-allowed', locked);
        });

        applyRedCaseNoLock(locked);

        const editableDateIds = [
            'judgment-date',
            'first-due-date'
        ];

        editableDateIds.forEach(id => {
            setDateRuleLocked(id, locked);
        });

        // วันที่ยื่นฟ้องเป็นข้อมูลตั้งต้นของคดี ห้ามแก้ทั้งพิพากษาตามยอมและพิพากษาฝ่ายเดียว
        setDateRuleLocked('filing-date', true, 'วันที่ยื่นฟ้องไม่อนุญาตให้แก้ไขหลังสร้างคดี');

        const jtTrigger = document.getElementById('jt-trigger');
        if (jtTrigger) {
            jtTrigger.disabled = locked;
            jtTrigger.style.pointerEvents = locked ? 'none' : '';
            jtTrigger.classList.toggle('opacity-60', locked);
            jtTrigger.classList.toggle('cursor-not-allowed', locked);
        }

        const previewBtn = document.getElementById('preview-btn');
        if (previewBtn) {
            previewBtn.disabled = locked;
            previewBtn.classList.toggle('opacity-40', locked);
            previewBtn.classList.toggle('cursor-not-allowed', locked);
        }

        const monthlyBtn = document.getElementById('view-monthly-btn');
        const dailyBtn = document.getElementById('view-daily-btn');
        [monthlyBtn, dailyBtn].forEach(btn => {
            if (!btn) return;
            btn.disabled = false; // ปุ่มดูตารางยังให้กดได้
        });

        // หลัง lock/unlock ตามสิทธิ์แล้ว ให้ apply rule เฉพาะประเภทคำพิพากษาซ้ำ
        // เพื่อกันไม่ให้เคสพิพากษาฝ่ายเดียวถูกปลดล็อกกลับมาเป็นหลายงวด
        applyJudgmentTypeInputRules(false);
    }

    function applyRedCaseNoLock(lockedByPermission = false) {
        const el = document.getElementById('red-case-no');
        if (!el) return;

        const hasRecordedRedCaseNo = Boolean((originalData?.red_case_no || currentCus?.red_case_no || '').trim());
        const locked = lockedByPermission || hasRecordedRedCaseNo;

        el.readOnly = locked;
        el.disabled = locked;
        el.classList.toggle('autocalc-input', locked);
        el.classList.toggle('bg-slate-100', locked);
        el.classList.toggle('border-slate-300', locked);
        el.classList.toggle('text-slate-500', locked);
        el.classList.toggle('cursor-not-allowed', locked);
        el.style.opacity = locked ? '1' : '';
        el.title = hasRecordedRedCaseNo
            ? 'คดีหมายเลขแดงที่ถูกบันทึกครั้งแรกแล้ว ไม่อนุญาตให้แก้ไข'
            : '';
    }

    function getActiveJudgmentType() {
        const selected = document.getElementById('judgment-type')?.value || '';
        if (selected) return selected;

        // กรณีเป็นเคสที่บันทึกคำพิพากษาไปแล้ว dropdown จะถูกซ่อนไว้
        // ให้ใช้ case_status ปัจจุบันเป็นตัวบอกประเภทคำพิพากษาแทน
        return currentCus?.case_status || '';
    }

    function setInputRuleLocked(el, locked, title = '') {
        if (!el) return;

        el.readOnly = locked;
        el.classList.toggle('autocalc-input', locked);
        el.classList.toggle('bg-slate-100', locked);
        el.classList.toggle('border-slate-300', locked);
        el.classList.toggle('text-slate-500', locked);
        el.classList.toggle('cursor-not-allowed', locked);
        el.title = locked ? title : '';
    }

    function applyJudgmentTypeInputRules(triggerChanged = true) {
        const judgmentType = getActiveJudgmentType();
        const isDefaultJudgment = judgmentType === 'พิพากษาฝ่ายเดียว';
        const lockedByPermission = currentCus ? !canEditJudgmentData(currentCus.case_status) : false;

        const installmentCount = document.getElementById('installment-count');
        const installment2 = document.getElementById('installment-2');
        const installment3 = document.getElementById('installment-3');
        const installment4 = document.getElementById('installment-4');
        const followUpInstallments = [installment2, installment3, installment4];

        if (isDefaultJudgment) {
            if (installmentCount) {
                installmentCount.value = '1';
                hideFieldWarn('installment-count');
                setInputRuleLocked(installmentCount, true, 'พิพากษาฝ่ายเดียวกำหนดเป็น 1 งวดเท่านั้น');
            }

            followUpInstallments.forEach(el => {
                if (!el) return;
                el.value = '0.00';
                hideFieldWarn(el.id);
                setInputRuleLocked(el, true, 'พิพากษาฝ่ายเดียวไม่ต้องกรอกค่างวดที่ 2-4');
            });
        } else if (!lockedByPermission) {
            // พิพากษาตามยอม หรือยังไม่เลือกประเภท → ให้กลับไปใช้ logic เดิม
            setInputRuleLocked(installmentCount, false);
            followUpInstallments.forEach(el => setInputRuleLocked(el, false));
        }

        updateDateConstraints();
        calculateLastDueDate();
        validateBusinessRules(false);

        if (triggerChanged && typeof onInputChanged === 'function') {
            onInputChanged();
        }
    }

    // ---- โหลดข้อมูล customer จาก API ----
    async function loadCustomerData() {
        try {
            const res  = await fetch(`/api/customers/${accountNo}`);
            if (!res.ok) { window.location.href = getSafeReturnTo('/customer-list'); return; }
            const data = await res.json();

            // สำคัญ: ต้อง set currentCus ก่อน set วันที่/เรียก applyJudgmentTypeInputRules
            // วันครบกำหนดงวดแรกเป็นวันเดียวกับวันพิพากษาได้ทั้งสองประเภท
            // ต้อง set currentCus ก่อน apply rule เพื่อไม่ให้ constraint ระหว่างโหลดล้างวันที่ API ส่งมา
            // ส่งผลให้วันที่ครบกำหนดงวดแรกที่ API ส่งมาโดน clear ทิ้งตอนเปิดหน้าใหม่
            currentCus = data;

            document.getElementById('account-no').value      = data.account_no || '';
            document.getElementById('customer-name').value   = data.name || '';

            const filingCapitalEl = document.getElementById('filing-capital');
            if (filingCapitalEl) {
                filingCapitalEl.value = Number(data.filing_capital || 0) > 0
                    ? Number(data.filing_capital).toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                    : '0.00';
            }

            const defaultDateDisplay = document.getElementById('default-date-display');
            if (defaultDateDisplay) {
                defaultDateDisplay.value = fmtDate(data.default_date);
            }

            const preFilingDpdDisplay = document.getElementById('pre-filing-dpd-days-display');
            if (preFilingDpdDisplay) {
                const dpdDays = data.pre_filing_dpd_days;
                preFilingDpdDisplay.value = (dpdDays !== null && dpdDays !== undefined && dpdDays !== '')
                    ? `${Number(dpdDays).toLocaleString('th-TH')} วัน`
                    : '-';
            }

            const filingNoteDisplay = document.getElementById('filing-note-display');
            const filingNoteDisplayText = document.getElementById('filing-note-display-text');
            const filingNoteTooltipText = document.getElementById('filing-note-tooltip-text');
            if (filingNoteDisplay && filingNoteDisplayText) {
                const filingNote = data.filing_note || '-';
                filingNoteDisplayText.textContent = filingNote;
                filingNoteDisplay.dataset.tooltip = filingNote;
                if (filingNoteTooltipText) filingNoteTooltipText.textContent = filingNote;
            }

            if (data.filing_date)   dpSelectDay('filing-date', data.filing_date);
            if (data.judgment_date) dpSelectDay('judgment-date', data.judgment_date);
            if (data.first_due_date) dpSelectDay('first-due-date', data.first_due_date);

            const redCaseNoEl = document.getElementById('red-case-no');
            if (redCaseNoEl) redCaseNoEl.value = data.red_case_no || '';
            const judgmentNoteEl = document.getElementById('judgment-note');
            if (judgmentNoteEl) {
                judgmentNoteEl.value = data.judgment_note || '';
                const counter = document.getElementById('judgment-note-counter');
                if (counter) counter.textContent = String(judgmentNoteEl.value.length);
            }

            const moneyFields = {
                'total-debt':           data.total_debt,
                'principal':            data.principal,
                'court-fee':            data.court_fee,
                'lawyer-fee':           data.lawyer_fee,
                'installment-1':        data.installment_1,
                'installment-2':        data.installment_2,
                'installment-3':        data.installment_3,
                'installment-4':        data.installment_4,
            };
            for (const [id, val] of Object.entries(moneyFields)) {
                const el = document.getElementById(id);
                if (el && val !== null && val !== undefined) {
                    el.value = Number(val) > 0
                        ? Number(val).toLocaleString('th-TH', { minimumFractionDigits: 2 })
                        : '0.00';
                }
            }

            document.getElementById('interest-rate').value          = formatRateDisplayValue(data.interest_rate ?? '');
            document.getElementById('installment-count').value      = data.installment_count ?? '';
            document.getElementById('default-interest-rate').value  = formatRateDisplayValue(data.default_interest_rate ?? '');

            calculateDiff();
            calculateLastDueDate();
            applyJudgmentTypeInputRules(false);

            document.getElementById('detail-subtitle').textContent =
                fmtAccNo(data.account_no) + ' - ' + data.name;

            originalData = {
                filing_date:           data.filing_date        || '',
                filing_capital:        Number(data.filing_capital || 0),
                red_case_no:           data.red_case_no        || '',
                judgment_date:         data.judgment_date      || '',
                judgment_note:         data.judgment_note      || '',
                first_due_date:        data.first_due_date     || '',
                total_debt:            Number(data.total_debt  || 0),
                principal:             Number(data.principal   || 0),
                interest_rate:         Number(data.interest_rate || 0),
                court_fee:             Number(data.court_fee   || 0),
                lawyer_fee:            Number(data.lawyer_fee  || 0),
                installment_count:     Number(data.installment_count || 0),
                default_interest_rate: Number(data.default_interest_rate || 0),
                installment_1:         Number(data.installment_1 || 0),
                installment_2:         Number(data.installment_2 || 0),
                installment_3:         Number(data.installment_3 || 0),
                installment_4:         Number(data.installment_4 || 0),
            };
            setSubmitEnabled(false);

            // Timestamps
            const fmtTs = (ts) => {
                if (!ts) return '-';
                try {
                    const d = new Date(ts.replace(' ', 'T') + (ts.includes('+') ? '' : 'Z'));
                    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()+543} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
                } catch { return ts; }
            };
            document.getElementById('ts-created-at').textContent = fmtTs(data.created_at);
            document.getElementById('ts-updated-at').textContent = fmtTs(data.updated_at);

            // โหลด case status และแสดง progress bar
            // currentCus ถูก set ไว้ตั้งแต่ต้น loadCustomerData แล้ว
            applyJudgmentTypeInputRules(false);
            updateDateConstraints();
            validateBusinessRules(false);
            renderRetroactiveJudgment(data);
            if (data.case_status) {
                const logs = await loadStatusLogs()
                renderProgressBar(data.case_status, logs)
                updateSectionVisibility(data.case_status, data.latest_snapshot || null)
                if (['บังคับคดี', 'ปิดบัญชี'].includes(data.case_status)) {
                    fillEnforcementInfo(data)
                }
            }
            applyRedCaseNoLock(currentCus ? !canEditJudgmentData(currentCus.case_status) : false);

            previewDone = false;
            setSubmitEnabled(false);

            const warn = document.getElementById('preview-stale-warn');
            if (warn) warn.classList.add('hidden');

            const previewBtn = document.getElementById('preview-btn');
            if (previewBtn) previewBtn.dataset.manual = 'false';

            if (canAutoPreviewExistingData()) {
                await loadPreview();

                setSubmitEnabled(false);
            } else {
                document.getElementById('schedule-placeholder')?.classList.remove('hidden');
                document.getElementById('schedule-table-wrap')?.classList.add('hidden');
                document.getElementById('schedule-info')?.classList.add('hidden');
                document.getElementById('schedule-loading')?.classList.add('hidden');
            }

        } catch (err) {
            console.error('loadCustomerData error:', err);
        }
    }

    function showError(msg) {
        const banner = document.getElementById('error-banner');
        document.getElementById('error-text').textContent = msg;
        banner.classList.remove('hidden');
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideError() {
        document.getElementById('error-banner').classList.add('hidden');
    }

    // ---- Account No validation ----
    function handleAccountNoInput() {
        const el      = document.getElementById('account-no');
        const counter = document.getElementById('account-no-counter');
        const pos     = el.selectionStart;
        const cleaned = el.value.replace(/[^0-9]/g, '');
        const hadInvalid = cleaned !== el.value;
        el.value = cleaned;
        if (hadInvalid) {
            try { el.setSelectionRange(pos - 1, pos - 1); } catch(e) {}
            showFieldWarn('account-no', 'กรุณากรอกตัวเลขเท่านั้น ไม่อนุญาตให้ใช้ตัวอักษรหรืออักขระพิเศษ');
        } else {
            hideFieldWarn('account-no');
        }
        const len = el.value.length;
        counter.textContent = len + '/12';
        counter.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none font-mono '
            + (len === 12 ? 'text-emerald-500' : len > 0 ? 'text-amber-400' : 'text-slate-300');
    }

    function handleAccountNoKeydown(e) {
        const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End'];
        if (allowed.includes(e.key)) return;
        if (e.ctrlKey || e.metaKey) return;
        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
            showFieldWarn('account-no', 'กรุณากรอกตัวเลขเท่านั้น ไม่อนุญาตให้ใช้ตัวอักษรหรืออักขระพิเศษ');
        }
    }

    function handleAccountNoBlur() {
        const el  = document.getElementById('account-no');
        const len = el.value.length;
        if (len > 0 && len < 12) {
            showFieldWarn('account-no', 'เลขที่บัญชีต้องมี 12 หลักเท่านั้น (ปัจจุบัน ' + len + ' หลัก)');
            el.classList.add('error');
        } else if (len === 12) {
            hideFieldWarn('account-no');
            el.classList.remove('error');
        }
    }

    // ---- Customer Name validation ----
    function hasInvalidCustomerNameChars(value) {
        return !/^[A-Za-z0-9ก-ฮะ-์.\-\s]*$/.test(value || '');
    }

    function handleCustomerNameInput() {
        const el  = document.getElementById('customer-name');
        const val = el.value;
        if (hasInvalidCustomerNameChars(val)) {
            showFieldWarn('customer-name', 'ใช้ได้เฉพาะตัวอักษร ตัวเลข เว้นวรรค จุด (.) และขีดกลาง (-)');
        } else {
            hideFieldWarn('customer-name');
        }
    }

    function handleCustomerNameBlur() {
        const el  = document.getElementById('customer-name');
        const val = el.value;
        if (!val) return;
        const trimmed = val.trim();
        if (trimmed !== val) {
            el.value = trimmed;
            showFieldWarn('customer-name', 'ไม่อนุญาตให้มีช่องว่างหน้าสุดหรือหลังสุด');
            return;
        }
        if (/\s{2,}/.test(val)) {
            showFieldWarn('customer-name', 'ไม่อนุญาตให้มีช่องว่างติดกันหลายช่อง');
            return;
        }
        hideFieldWarn('customer-name');
        el.classList.remove('error');
    }

    function setLoading(isLoading) {
        const btn = document.getElementById('submit-btn');
        btn.disabled = isLoading;
        document.getElementById('btn-default').classList.toggle('hidden', isLoading);
        document.getElementById('btn-loading').classList.toggle('hidden', !isLoading);
    }


    // ============================================================
    // Validation & Formatting Helpers
    // ============================================================

    function stripPercentSuffix(val) {
        return String(val || '').replace(/%/g, '').trim();
    }

    function parseNumber(val) {
        return parseFloat(stripPercentSuffix(val).replace(/,/g, '')) || 0;
    }

    function formatNumber(val) {
        const n = parseFloat(val.replace(/,/g, ''));
        if (isNaN(n)) return val;
        return n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function showFieldWarn(id, msg) {
        const el = document.getElementById('warn-' + id);
        if (!el) return;
        if (msg) {
            const span = el.querySelector('span:last-child');
            if (span) span.textContent = msg;
        }
        el.classList.remove('hidden');
    }

    function hideFieldWarn(id) {
        const el = document.getElementById('warn-' + id);
        if (el) el.classList.add('hidden');
    }

    function isValidDecimal(val) {
        return /^[\d,]*\.?\d*$/.test(stripPercentSuffix(val).replace(/,/g, ''));
    }

    function isValidInteger(val) {
        return /^\d+$/.test(val.trim());
    }

    function normalizeCaseNo(value) {
        return String(value || '')
            .trim()
            .replace(/\s*\/\s*/g, '/')
            .replace(/\s+/g, ' ');
    }

    function isValidCaseNo(value) {
        return /^[A-Za-zก-ฮ]{1,8}(?:\s+[A-Za-z]?\d{1,8}|\d{1,8})\/25\d{2}$/.test(value);
    }

    function normalizeCaseNo(value) {
        const raw = String(value || '').replace(/\s*\/\s*/g, '/').replace(/\s+/g, ' ').trim();
        const match = raw.match(/^([A-Za-zก-ฮ]{1,8})\s*([A-Za-z]?\d{1,8})\/(25\d{2})$/);
        if (!match) return raw;
        return `${match[1]}${match[2]}/${match[3]}`;
    }

    function isValidCaseNo(value) {
        if (!value) return false;
        return /^([A-Za-zก-ฮ]{1,8})\s*([A-Za-z]?\d{1,8})\/(25\d{2})$/.test(String(value || '').replace(/\s*\/\s*/g, '/').replace(/\s+/g, ' ').trim());
    }

    function handleRedCaseNoInput() {
        const el = document.getElementById('red-case-no');
        if (!el) return;
        const value = normalizeCaseNo(el.value);
        if (!value || !isValidCaseNo(value)) {
            showFieldWarn('red-case-no', 'รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567, ผบE814/2569 หรือ พE325/2568');
        } else {
            el.value = value;
            hideFieldWarn('red-case-no');
        }
    }

    const ZERO_REQUIRED_FIELD_IDS = new Set([
        'interest-rate',
        'default-interest-rate',
        'court-fee',
        'lawyer-fee',
        'installment-2',
        'installment-3'
    ]);

    const ZERO_REQUIRED_MONEY_FIELD_IDS = new Set([
        'court-fee',
        'lawyer-fee',
        'installment-2',
        'installment-3'
    ]);

    function normalizeRequiredZeroFields() {
        ZERO_REQUIRED_MONEY_FIELD_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (String(el.value || '').trim() === '') {
                el.value = '0.00';
            }
        });

        ['interest-rate', 'default-interest-rate'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (String(el.value || '').trim() === '') {
                el.value = '0%';
            }
        });
    }

    function showBusinessError(title, message) {
        if (typeof showAlert === 'function') {
            showAlert('warning', title, message);
        } else {
            showError(message);
        }
    }

    function validateBusinessRules(showErrorMessage = false) {
        normalizeRequiredZeroFields();

        const totalDebtEl = document.getElementById('total-debt');
        const filingCapitalEl = document.getElementById('filing-capital');
        const interestEl = document.getElementById('interest-rate');
        const defaultInterestEl = document.getElementById('default-interest-rate');
        const firstDueDisplay = document.getElementById('dp-display-first-due-date');

        ['total-debt', 'interest-rate', 'default-interest-rate', 'court-fee', 'lawyer-fee', 'installment-2', 'installment-3'].forEach(id => {
            document.getElementById(id)?.classList.remove('error');
            hideFieldWarn(id);
        });
        firstDueDisplay?.classList.remove('error');

        const numericRuleFields = [
            ['total-debt', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['interest-rate', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['default-interest-rate', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['court-fee', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['lawyer-fee', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['installment-2', 'กรุณากรอกตัวเลขเท่านั้น'],
            ['installment-3', 'กรุณากรอกตัวเลขเท่านั้น'],
        ];

        for (const [id, msg] of numericRuleFields) {
            const field = document.getElementById(id);
            const raw = stripPercentSuffix(field?.value || '').replace(/,/g, '').trim();
            if (raw && !/^\d*\.?\d*$/.test(raw)) {
                field?.classList.add('error');
                showFieldWarn(id, msg);
                if (showErrorMessage) showBusinessError('ข้อมูลไม่ถูกต้อง', msg);
                return false;
            }
        }

        const totalDebt = parseNumber(totalDebtEl?.value || '0');
        const filingCapital = parseNumber(filingCapitalEl?.value || '0');
        if (filingCapital > 0 && totalDebt > filingCapital) {
            totalDebtEl?.classList.add('error');
            showFieldWarn('total-debt', 'ยอดหนี้รวมต้องไม่เกินทุนทรัพย์ที่ฟ้อง');
            if (showErrorMessage) {
                showBusinessError('ยอดหนี้รวมไม่ถูกต้อง', 'ยอดหนี้รวมต้องไม่เกินทุนทรัพย์ที่ฟ้อง โดยไม่ต้องรวมดอกเบี้ย');
            }
            return false;
        }

        const interest = parseNumber(interestEl?.value || '0');
        const defaultInterest = parseNumber(defaultInterestEl?.value || '0');
        if (interest > 24) {
            interestEl?.classList.add('error');
            showFieldWarn('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');
            if (showErrorMessage) showBusinessError('อัตราดอกเบี้ยไม่ถูกต้อง', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');
            return false;
        }
        if (defaultInterest > 24) {
            defaultInterestEl?.classList.add('error');
            showFieldWarn('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');
            if (showErrorMessage) showBusinessError('ดอกเบี้ยผิดนัดไม่ถูกต้อง', 'ดอกเบี้ยเมื่อผิดนัดชำระ (%) ต้องไม่เกิน 24%');
            return false;
        }

        const judgmentDate = dpGetValue('judgment-date');
        const firstDue = dpGetValue('first-due-date');
        if (judgmentDate && firstDue) {
            const invalidDate = firstDue < judgmentDate;
            if (invalidDate) {
                firstDueDisplay?.classList.add('error');
                const msg = 'วันครบกำหนดงวดแรกสามารถเป็นวันเดียวกับวันที่พิพากษาได้ แต่ห้ามน้อยกว่าวันที่พิพากษา';
                if (showErrorMessage) showBusinessError('วันที่ครบกำหนดไม่ถูกต้อง', msg);
                return false;
            }
        }

        return true;
    }

    // ---- Date constraint ----
    function updateDateConstraints() {
        const filingVal   = dpGetValue('filing-date');
        const judgmentVal = dpGetValue('judgment-date');
        if (filingVal) dpSetMin('judgment-date', filingVal);

        if (judgmentVal) {
            dpSetMin('first-due-date', judgmentVal);
        }
    }

    function handleMoneyInput(id) {
        const el = document.getElementById(id);
        if (!el) return;

        const before = el.value;
        const cursor = el.selectionStart;
        const rawNoComma = before.replace(/,/g, '');
        const hasInvalidChars = /[^\d.]/.test(rawNoComma);

        let cleaned = rawNoComma.replace(/[^\d.]/g, '');

        const firstDotIndex = cleaned.indexOf('.');
        if (firstDotIndex !== -1) {
            cleaned =
                cleaned.slice(0, firstDotIndex + 1) +
                cleaned.slice(firstDotIndex + 1).replace(/\./g, '');
        }

        if (hasInvalidChars) {
            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');
        } else {
            hideFieldWarn(id);
        }

        if (cleaned === '' || cleaned === '.') {
            el.value = cleaned;
            return;
        }

        if (!/^\d*\.?\d*$/.test(cleaned)) {
            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');
            el.value = cleaned;
            return;
        }

        if (before !== cleaned) {
            const diff = before.length - cleaned.length;
            el.value = cleaned;

            if (typeof cursor === 'number') {
                const nextPos = Math.max(0, cursor - diff);
                requestAnimationFrame(() => {
                    el.setSelectionRange(nextPos, nextPos);
                });
            }
        }
    }

    function handleMoneyBlur(id) {
        const el  = document.getElementById(id);
        const raw = el.value.replace(/,/g, '').trim();

        if (!raw || isNaN(parseFloat(raw))) {
            if (ZERO_REQUIRED_MONEY_FIELD_IDS.has(id)) {
                el.value = '0.00';
                hideFieldWarn(id);
                return;
            }
            el.value = '';
            return;
        }

        const rounded = Math.round(parseFloat(raw) * 100) / 100;
        el.value = rounded.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        hideFieldWarn(id);
    }

    // ---- Interest rate handler ----
    function formatRateDisplayValue(value) {
        const raw = stripPercentSuffix(value);
        if (raw === '' || raw === '.') return '';
        const n = Number(raw);
        if (Number.isNaN(n)) return raw;
        const rounded = Math.round(Math.min(24, Math.max(0, n)) * 100) / 100;
        const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
        return `${text}%`;
    }

    function stripRateDisplaySuffix(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = stripPercentSuffix(el.value);
    }

    function handleRateInput(id, maxMessage) {
        const el = document.getElementById(id);
        if (!el) return;

        const before = stripPercentSuffix(el.value);
        const hasInvalidChars = /[^\d.]/.test(before);

        let cleaned = before.replace(/[^\d.]/g, '');
        const firstDotIndex = cleaned.indexOf('.');
        if (firstDotIndex !== -1) {
            cleaned = cleaned.slice(0, firstDotIndex + 1) + cleaned.slice(firstDotIndex + 1).replace(/\./g, '');
        }

        el.value = cleaned;

        if (hasInvalidChars) {
            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');
            return;
        }

        // ระหว่างพิมพ์ให้รับค่าแบบ 12. / 12.3 / 12.34 ได้ ไม่ยิง error เร็วเกินไป
        if (cleaned === '' || cleaned === '.') {
            hideFieldWarn(id);
            return;
        }

        const n = Number(cleaned);
        if (!Number.isNaN(n) && n > 24) {
            showFieldWarn(id, maxMessage);
            return;
        }

        hideFieldWarn(id);
    }

    function handleRateBlur(id, maxMessage) {
        const el = document.getElementById(id);
        if (!el) return;

        const raw = stripPercentSuffix(el.value);
        if (raw === '' || raw === '.') {
            el.value = '0%';
            hideFieldWarn(id);
            return;
        }

        const n = Number(raw);
        if (Number.isNaN(n)) {
            el.value = '0%';
            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');
            return;
        }

        el.value = formatRateDisplayValue(raw);

        if (n > 24) showFieldWarn(id, maxMessage);
        else hideFieldWarn(id);
    }

    function handleInterestInput() {
        handleRateInput('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');
    }

    function handleInterestBlur() {
        handleRateBlur('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');
    }

    // ---- Default interest rate handler ----
    function handleDefaultInterestInput() {
        handleRateInput('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');
    }

    function handleDefaultInterestBlur() {
        handleRateBlur('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');
    }

    // ---- Installment count handler ----
    function handleInstallmentCountInput() {
        const el  = document.getElementById('installment-count');

        // ถ้าเป็นพิพากษาฝ่ายเดียว ช่องนี้ต้องเป็น 1 งวดเสมอ
        if (getActiveJudgmentType() === 'พิพากษาฝ่ายเดียว') {
            el.value = '1';
            hideFieldWarn('installment-count');
            calculateLastDueDate();
            return;
        }

        const raw = el.value.trim();
        if (raw === '') { hideFieldWarn('installment-count'); return; }
        if (!/^\d+$/.test(raw)) {
            showFieldWarn('installment-count', 'กรุณากรอกตัวเลขจำนวนเต็มเท่านั้น');
            el.value = raw.replace(/\D/g, '');
            return;
        }
        hideFieldWarn('installment-count');
    }

    // ---- Friendly input focus UX ----
// ทำให้ placeholder หายตอน focus
// ถ้าค่าเดิมเป็น 0 / 0.00 ให้ล้างช่องทันที
// ถ้ามีค่าจริงอยู่แล้ว ให้ select ทั้งช่อง เพื่อพิมพ์ทับได้เลย
function isZeroLikeInputValue(value) {
    const raw = String(value || '')
        .replace(/,/g, '')
        .replace(/%/g, '')
        .trim();

    if (raw === '') return false;

    const num = Number(raw);
    return !Number.isNaN(num) && num === 0;
}

function setupFriendlyInputFocus() {
    const zeroClearFieldIds = new Set([
        'total-debt',
        'principal',
        'court-fee',
        'lawyer-fee',
        'installment-1',
        'installment-2',
        'installment-3',
        'installment-4',
        'interest-rate',
        'default-interest-rate',
        'installment-count'
    ]);

    const skipFieldIds = new Set([
        'account-no',
        'customer-name',
        'diff-debt'
    ]);

    document.querySelectorAll('input.form-input-styled').forEach(el => {
        if (!el.id) return;
        if (skipFieldIds.has(el.id)) return;
        if (el.readOnly || el.disabled) return;
        if (el.dataset.friendlyFocusBound === '1') return;

        el.dataset.friendlyFocusBound = '1';
        el.dataset.originalPlaceholder = el.getAttribute('placeholder') || '';

        el.addEventListener('focus', () => {
            // ซ่อน placeholder ทันทีตอน user คลิกเข้า field
            el.setAttribute('placeholder', '');

            if (zeroClearFieldIds.has(el.id) && isZeroLikeInputValue(el.value)) {
                el.value = '';
                return;
            }

            // ถ้ามีค่าจริงอยู่แล้ว ให้ select ทั้งช่อง
            // เวลา user พิมพ์ จะทับค่าเดิม ไม่ไปต่อท้าย
            if (el.value && typeof el.select === 'function') {
                requestAnimationFrame(() => el.select());
            }
        });

        el.addEventListener('blur', () => {
            // คืน placeholder หลังออกจาก field
            el.setAttribute('placeholder', el.dataset.originalPlaceholder || '');
        });
    });
}

    // ---- calculateDiff ----
    function calculateDiff() {
        const courtFee  = parseNumber(document.getElementById('court-fee').value);
        const lawyerFee = parseNumber(document.getElementById('lawyer-fee').value);
        const totalDebt = parseNumber(document.getElementById('total-debt').value);
        const principal = parseNumber(document.getElementById('principal').value);
        const total     = (courtFee + lawyerFee + totalDebt) - principal;
        const field     = document.getElementById('diff-debt');
        field.value     = total.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        field.style.color = total > 0 ? '#2D3282' : total < 0 ? '#ef4444' : '';
    }

    function calculateLastDueDate() {
        const firstDue = dpGetValue('first-due-date');
        const count    = parseInt((document.getElementById('installment-count').value || '').replace(/[^0-9]/g,'')) || 0;
        if (!firstDue || count < 1) { dpClear('last-due-date'); return; }
        const date = new Date(firstDue + 'T00:00:00');
        date.setMonth(date.getMonth() + count - 1);
        const str  = dpDateStr(date);
        dpSetValue('last-due-date', str);
        const disp = document.getElementById('dp-text-last-due-date');
        disp.textContent = dpFormatDisplay(str);
        disp.classList.remove('text-slate-400');
        disp.classList.add('text-slate-800');
    }

    function validate() {
        normalizeRequiredZeroFields();

        const required = [
            { id: 'account-no',       label: 'หมายเลขบัญชี' },
            { id: 'customer-name',    label: 'ชื่อ-นามสกุล' },
            { id: 'filing-date',      label: 'วันที่ยื่นฟ้อง' },
            { id: 'red-case-no',      label: 'คดีหมายเลขแดงที่' },
            { id: 'judgment-date',    label: 'วันที่พิพากษา' },
            { id: 'total-debt',       label: 'ยอดหนี้รวม' },
            { id: 'principal',        label: 'เงินต้น' },
            { id: 'interest-rate',    label: 'อัตราดอกเบี้ย/ปี' },
            { id: 'default-interest-rate', label: 'ดอกเบี้ยเมื่อผิดนัดชำระ (%)' },
            { id: 'court-fee',        label: 'ค่าธรรมเนียมศาล' },
            { id: 'lawyer-fee',       label: 'ค่าทนายความ' },
            { id: 'installment-count', label: 'จำนวนงวดผ่อน' },
            { id: 'first-due-date',   label: 'วันครบกำหนดงวดแรก' },
            { id: 'installment-1',    label: 'ค่างวด งวดที่ 1' },
        ];

        document.querySelectorAll('.form-input-styled').forEach(el => el.classList.remove('error'));

        const missing = required.filter(f => {
            const val = document.getElementById(f.id).value.trim();
            if (!val) { document.getElementById(f.id).classList.add('error'); return true; }
            return false;
        });

        if (missing.length > 0) {
            showError('กรุณากรอกข้อมูลที่จำเป็นให้ครบ: ' + missing.map(f => f.label).join(', '));
            return false;
        }

        const accountVal = document.getElementById('account-no').value;
        if (accountVal.length !== 12) {
            showError('เลขที่บัญชีต้องมี 12 หลักเท่านั้น');
            document.getElementById('account-no').classList.add('error');
            return false;
        }

        const nameVal = document.getElementById('customer-name').value;
        if (hasInvalidCustomerNameChars(nameVal)) {
            showError('ชื่อ-นามสกุล/ชื่อบริษัทใช้ได้เฉพาะตัวอักษร ตัวเลข เว้นวรรค จุด (.) และขีดกลาง (-)');
            document.getElementById('customer-name').classList.add('error');
            return false;
        }

        const redCaseVal = normalizeCaseNo(document.getElementById('red-case-no').value);
        if (!isValidCaseNo(redCaseVal)) {
            showError('คดีหมายเลขแดงที่ต้องอยู่ในรูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567, ผบE814/2569 หรือ พE325/2568');
            document.getElementById('red-case-no').classList.add('error');
            return false;
        }

        if (document.getElementById('judgment-note').value.trim().length > 100) {
            showError('หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร');
            document.getElementById('judgment-note').classList.add('error');
            return false;
        }

        // ถ้า case_status = ยื่นฟ้อง ต้องเลือก judgment_type ก่อนบันทึก
        if (currentCus && currentCus.case_status === 'ยื่นฟ้อง') {
            const jt = document.getElementById('judgment-type')?.value || ''
            if (!jt) {
                showError('กรุณาเลือกประเภทคำพิพากษา (พิพากษาตามยอม / พิพากษาฝ่ายเดียว) ก่อนบันทึก')
                document.getElementById('judgment-type')?.classList.add('error')
                return false
            }
        }

        if (!validateBusinessRules(true)) {
            return false;
        }

        return true;
    }

    function fmtReview(val) {
        const n = parseNumber(String(val));
        if (!val || val === '0.00' || val === '') return '-';
        return '฿' + n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function fmtDateReview(id) {
        const val = dpGetValue(id);
        if (!val) return '-';
        const [y,m,d] = val.split('-');
        return `${d}/${m}/${y}`;
    }

    function showSuccessToast(title, msg) {
        // ถ้ามี toast modal ให้ใช้ ถ้าไม่มีใช้ alert
        const modal = document.getElementById('toast-modal');
        if (modal) {
            document.getElementById('toast-icon-wrap').className = 'w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-emerald-50';
            document.getElementById('toast-icon').className      = 'material-symbols-outlined text-3xl text-emerald-500';
            document.getElementById('toast-icon').style.fontVariationSettings = '"FILL" 1';
            document.getElementById('toast-icon').textContent    = 'check_circle';
            document.getElementById('toast-title').textContent   = title;
            document.getElementById('toast-message').textContent = msg;
            modal.classList.remove('hidden');
        } else {
            alert(title + ': ' + msg);
        }
    }

    function handleSubmit() {
        hideError();

        if (currentCus && !canEditJudgmentData(currentCus.case_status)) {
            showAlert(
                'warning',
                'ไม่สามารถแก้ไขข้อมูลได้',
                editPermissionMessage(currentCus.case_status)
            );
            setSubmitEnabled(false);
            return;
        }

        // ต้องกดพรีวิวสำเร็จก่อน จึงจะเปิด modal ยืนยันบันทึกได้
        if (!previewDone) {
            showAlert(
                'warning',
                'กรุณากดพรีวิวก่อนบันทึก',
                'ทุกครั้งที่มีการเพิ่มหรือแก้ไขข้อมูล ต้องกดพรีวิวตารางผ่อนชำระก่อน จึงจะบันทึกได้'
            );
            setSubmitEnabled(false);
            return;
        }

        // ตรวจว่าข้อมูล required สำหรับ preview ยังครบอยู่หรือไม่
        if (typeof isPreviewFormReady === 'function' && !isPreviewFormReady(true)) {
            previewDone = false;
            setSubmitEnabled(false);
            return;
        }

        if (!validate()) return;

        document.getElementById('rv-account-no').textContent       = document.getElementById('account-no').value;
        document.getElementById('rv-customer-name').textContent    = document.getElementById('customer-name').value;
        document.getElementById('rv-filing-date').textContent      = fmtDateReview('filing-date');
        document.getElementById('rv-judgment-date').textContent    = fmtDateReview('judgment-date');
        document.getElementById('rv-red-case-no').textContent      = normalizeCaseNo(document.getElementById('red-case-no').value);
        document.getElementById('rv-judgment-note').textContent    = document.getElementById('judgment-note').value.trim() || '-';
        // แสดง judgment-type ถ้า case_status = ยื่นฟ้อง
        const _jt = document.getElementById('judgment-type')?.value || ''
        const _jtRow = document.getElementById('rv-judgment-type-row')
        if (_jtRow) {
            if (currentCus && currentCus.case_status === 'ยื่นฟ้อง' && _jt) {
                _jtRow.classList.remove('hidden')
                document.getElementById('rv-judgment-type').textContent = _jt
            } else {
                _jtRow.classList.add('hidden')
            }
        }
        document.getElementById('rv-total-debt').textContent       = fmtReview(document.getElementById('total-debt').value);
        document.getElementById('rv-principal').textContent        = fmtReview(document.getElementById('principal').value);
        document.getElementById('rv-interest-rate').textContent    = formatRateDisplayValue(document.getElementById('interest-rate').value || '0');
        document.getElementById('rv-court-fee').textContent        = fmtReview(document.getElementById('court-fee').value);
        document.getElementById('rv-lawyer-fee').textContent       = fmtReview(document.getElementById('lawyer-fee').value);
        document.getElementById('rv-diff-debt').textContent        = fmtReview(document.getElementById('diff-debt').value);
        document.getElementById('rv-first-due-date').textContent   = fmtDateReview('first-due-date');
        document.getElementById('rv-last-due-date').textContent    = fmtDateReview('last-due-date');
        document.getElementById('rv-installment-count').textContent = (document.getElementById('installment-count').value || '-') + ' งวด';
        document.getElementById('rv-default-interest').textContent = formatRateDisplayValue(document.getElementById('default-interest-rate').value || '0');
        document.getElementById('rv-inst-1').textContent           = fmtReview(document.getElementById('installment-1').value);
        document.getElementById('rv-inst-2').textContent           = fmtReview(document.getElementById('installment-2').value);
        document.getElementById('rv-inst-3').textContent           = fmtReview(document.getElementById('installment-3').value);
        document.getElementById('rv-inst-4').textContent           = fmtReview(document.getElementById('installment-4').value);

        document.getElementById('confirm-modal').classList.remove('hidden');
    }

    function closeConfirmModal() {
        document.getElementById('confirm-modal').classList.add('hidden');
    }

    async function doSubmit() {
        if (currentCus && !canEditJudgmentData(currentCus.case_status)) {
            showAlert(
                'warning',
                'ไม่สามารถแก้ไขข้อมูลได้',
                editPermissionMessage(currentCus.case_status)
            );
            setSubmitEnabled(false);
            return;
        }

        if (!previewDone) {
            showAlert(
                'warning',
                'กรุณากดพรีวิวก่อนบันทึก',
                'ทุกครั้งที่มีการเพิ่มหรือแก้ไขข้อมูล ต้องกดพรีวิวตารางผ่อนชำระก่อน จึงจะบันทึกได้'
            );
            setSubmitEnabled(false);
            return;
        }

        normalizeRequiredZeroFields();

        if (!isPreviewFormReady(true)) {
            previewDone = false;
            setSubmitEnabled(false);
            return;
        }

        document.getElementById('confirm-submit-btn').disabled = true;
        document.getElementById('confirm-submit-btn').innerHTML = '<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> กำลังบันทึก...';

        setLoading(true);

        closeConfirmModal();
        const payload = {
            filing_date: dpGetValue('filing-date'),
            filing_capital: parseNumber(document.getElementById('filing-capital').value),
            red_case_no: document.getElementById('red-case-no').disabled && originalData?.red_case_no
                ? originalData.red_case_no
                : normalizeCaseNo(document.getElementById('red-case-no').value),
            judgment_date: dpGetValue('judgment-date'),
            judgment_note: document.getElementById('judgment-note').value.trim(),
            total_debt: parseNumber(document.getElementById('total-debt').value),
            principal:              parseNumber(document.getElementById('principal').value),
            judgment_difference:    parseNumber(document.getElementById('diff-debt').value),
            interest_rate:          parseNumber(document.getElementById('interest-rate').value),
            court_fee:              parseNumber(document.getElementById('court-fee').value),
            lawyer_fee:             parseNumber(document.getElementById('lawyer-fee').value),
            installment_count:      parseInt(document.getElementById('installment-count').value),
            default_interest_rate:  parseNumber(document.getElementById('default-interest-rate').value),
            first_due_date:         dpGetValue('first-due-date'),
            last_due_date:          dpGetValue('last-due-date') || null,
            installment_1:          parseNumber(document.getElementById('installment-1').value),
            installment_2:          parseNumber(document.getElementById('installment-2').value),
            installment_3:          parseNumber(document.getElementById('installment-3').value),
            installment_4:          parseNumber(document.getElementById('installment-4').value),
        };

        // Guard ฝั่ง FE: พิพากษาฝ่ายเดียวต้องส่งเป็น 1 งวดเสมอ
        const activeJudgmentTypeForPayload = getActiveJudgmentType();
        if (activeJudgmentTypeForPayload === 'พิพากษาฝ่ายเดียว') {
            payload.installment_count = 1;
            payload.installment_2 = 0;
            payload.installment_3 = 0;
            payload.installment_4 = 0;
            payload.last_due_date = payload.first_due_date || payload.last_due_date;
        }

        // ถ้า case_status = ยื่นฟ้อง และเลือก judgment_type ให้เรียก PATCH /judgment
        const judgmentType   = document.getElementById('judgment-type')?.value || ''
        const isFilingStatus = currentCus && currentCus.case_status === 'ยื่นฟ้อง'

        try {
            let res, data
            if (isFilingStatus && judgmentType) {
                payload.judgment_type = judgmentType
                res  = await fetch(`/api/customers/${accountNo}/judgment`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },
                    body: JSON.stringify(payload)
                })
                data = await res.json()
                if (res.ok) {
                    showSuccessToast('บันทึกสำเร็จ', `บันทึกคำพิพากษาเรียบร้อย → ${judgmentType}`)
                    await loadCustomerData()
                    loadEditHistory()
                } else {
                    showError(data.error || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
                }
            } else {
                res  = await fetch(`/api/customers/${accountNo}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },
                    body: JSON.stringify(payload)
                })
                data = await res.json()
                if (res.ok) {
                    showSuccessToast('บันทึกสำเร็จ', `อัพเดทข้อมูลเรียบร้อยแล้ว${data.changed_fields ? ` (${data.changed_fields} รายการ)` : ''}`)
                    await loadCustomerData()
                    loadEditHistory()
                } else {
                    showError(data.error || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
                }
            }
        } catch (err) {
            showError('ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
            const btn = document.getElementById('confirm-submit-btn');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span class="material-symbols-outlined text-base">save</span> ยืนยันบันทึก';
            }
        }
    }

    function handleCancel() {
        window.location.href = getSafeReturnTo('/customer-list');
    }

    async function handleLogout() {
        const token = document.cookie.split('; ').find(r => r.startsWith('token='))?.split('=')[1] || '';
        await fetch('/api/auth/logout', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
        document.cookie = 'token=; path=/; max-age=0';
        sessionStorage.clear();
        window.location.href = '/login';
    }


    // ---- Alert Modal ----
    function showAlert(type, title, message) {
        const iconWrap = document.getElementById('alert-icon-wrap');
        const icon     = document.getElementById('alert-icon');
        const configs  = {
            warning: { bg: 'bg-amber-50', color: 'text-amber-500', icon: 'warning' },
            error:   { bg: 'bg-red-50',   color: 'text-red-500',   icon: 'error' },
            info:    { bg: 'bg-blue-50',  color: 'text-blue-500',  icon: 'info' },
        };
        const cfg = configs[type] || configs.info;
        iconWrap.className = `w-16 h-16 rounded-full flex items-center justify-center mb-4 ${cfg.bg}`;
        icon.className     = `material-symbols-outlined text-3xl ${cfg.color}`;
        icon.style.fontVariationSettings = '"FILL" 1';
        icon.textContent   = cfg.icon;
        document.getElementById('alert-title').textContent   = title;
        document.getElementById('alert-message').textContent = message;
        document.getElementById('alert-modal').classList.remove('hidden');
    }

    function closeAlert() {
        document.getElementById('alert-modal').classList.add('hidden');
    }

    // ---- Schedule Preview ----
    let scheduleData    = { daily: [], monthly: [] };
    let currentView     = 'monthly';
    let previewDone = false;

    function setSubmitEnabled(enabled) {
        const btn = document.getElementById('submit-btn');
        if (!btn) return;

        const allowedByStatus = !currentCus || canEditJudgmentData(currentCus.case_status);
        const finalEnabled = enabled && allowedByStatus;

        btn.disabled = !finalEnabled;

        if (finalEnabled) {
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
            btn.classList.add('hover:bg-primary-dark');
            btn.title = '';
        } else {
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            btn.classList.remove('hover:bg-primary-dark');

            if (!allowedByStatus) {
                btn.title = currentCus ? editPermissionMessage(currentCus.case_status) : 'ไม่มีสิทธิ์แก้ไขข้อมูล';
            } else {
                btn.title = 'กรุณากรอกข้อมูลให้ครบและกดพรีวิวก่อนบันทึก';
            }
        }
    }

    function parseNum(val) {
        if (val === null || val === undefined || val === '') return 0;
        return parseFloat(stripPercentSuffix(val).replace(/,/g, '')) || 0;
    }

    function getPreviewRequiredFields() {
        const fields = [
            { id: 'filing-date',       label: 'วันที่ยื่นฟ้อง' },
            { id: 'red-case-no',       label: 'คดีหมายเลขแดงที่' },
            { id: 'judgment-date',     label: 'วันที่พิพากษา' },
            { id: 'total-debt',        label: 'ยอดหนี้รวม' },
            { id: 'principal',         label: 'เงินต้น' },
            { id: 'interest-rate',     label: 'อัตราดอกเบี้ย/ปี' },
            { id: 'default-interest-rate', label: 'ดอกเบี้ยเมื่อผิดนัดชำระ (%)' },
            { id: 'court-fee',         label: 'ค่าธรรมเนียมศาล' },
            { id: 'lawyer-fee',        label: 'ค่าทนายความ' },
            { id: 'installment-count', label: 'จำนวนงวดผ่อน' },
            { id: 'first-due-date',    label: 'วันครบกำหนดงวดแรก' },
            { id: 'installment-1',     label: 'ค่างวด งวดที่ 1' },
        ];

        if (currentCus && currentCus.case_status === 'ยื่นฟ้อง') {
            fields.unshift({ id: 'judgment-type', label: 'ประเภทคำพิพากษา' });
        }

        return fields;
    }

    function isBlankOrZeroPreviewValue(id, value) {
        const raw = stripPercentSuffix(value).replace(/,/g, '').trim();

        if (raw === '') return true;

        if (id === 'filing-date' || id === 'red-case-no' || id === 'judgment-date' || id === 'first-due-date' || id === 'judgment-type') {
            return false;
        }

        const num = Number(raw);
        if (ZERO_REQUIRED_FIELD_IDS.has(id)) {
            return Number.isNaN(num);
        }
        return Number.isNaN(num) || num <= 0;
    }

    function validateInterestPairForPreview(showErrorMessage = false) {
        // ชื่อ function เดิมยังคงไว้เพื่อไม่กระทบ flow เดิม
        // Requirement ใหม่: ทั้งสองช่องต้องมีค่า ถ้าไม่มีให้ใส่ 0 และห้ามเกิน 24%
        normalizeRequiredZeroFields();
        return validateBusinessRules(showErrorMessage);
    }

    function canAutoPreviewExistingData() {
        normalizeRequiredZeroFields();
        const requiredFields = getPreviewRequiredFields();

        const hasMissingRequired = requiredFields.some(f => {
            const el = document.getElementById(f.id);
            if (!el) return false;

            const value = String(el.value || '').trim();
            return isBlankOrZeroPreviewValue(f.id, value);
        });

        if (hasMissingRequired) return false;

        return validateBusinessRules(false);
    }

    function isPreviewFormReady(showErrorMessage = false) {
        normalizeRequiredZeroFields();
        document.querySelectorAll('.form-input-styled, .dp-input').forEach(el => {
            el.classList.remove('error');
        });

        const jtTrigger = document.getElementById('jt-trigger');
        if (jtTrigger) {
            jtTrigger.classList.remove('border-red-400', 'bg-red-50', 'ring-4', 'ring-red-400/10');
        }

        const missing = getPreviewRequiredFields().filter(f => {
            const el = document.getElementById(f.id);
            if (!el) return false;

            const value = String(el.value || '').trim();
            const invalid = isBlankOrZeroPreviewValue(f.id, value);

            if (invalid) {
                el.classList.add('error');

                const dpDisplay = document.getElementById('dp-display-' + f.id);
                if (dpDisplay) dpDisplay.classList.add('error');

                // judgment-type เป็น hidden input ต้อง highlight ปุ่ม dropdown แทน
                if (f.id === 'judgment-type') {
                    const trigger = document.getElementById('jt-trigger');
                    if (trigger) {
                        trigger.classList.add('border-red-400', 'bg-red-50', 'ring-4', 'ring-red-400/10');
                    }
                }
            }

            return invalid;
        });

        if (missing.length > 0) {
            if (showErrorMessage) {
                showAlert(
                    'warning',
                    'กรุณากรอกข้อมูลให้ครบ',
                    'กรุณากรอกข้อมูลที่จำเป็นก่อนกดพรีวิว ได้แก่ ' + missing.map(f => f.label).join(', ')
                );
            }
            return false;
        }

        const redCaseEl = document.getElementById('red-case-no');
        if (redCaseEl) {
            const redCaseValue = normalizeCaseNo(redCaseEl.value);
            if (!isValidCaseNo(redCaseValue)) {
                redCaseEl.classList.add('error');
                showFieldWarn('red-case-no', 'รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567, ผบE814/2569 หรือ พE325/2568');
                if (showErrorMessage) {
                    showAlert('warning', 'กรุณากรอกข้อมูลให้ถูกต้อง', 'คดีหมายเลขแดงที่ต้องอยู่ในรูปแบบที่กำหนด');
                }
                return false;
            }
        }

        const judgmentNoteEl = document.getElementById('judgment-note');
        if (judgmentNoteEl && judgmentNoteEl.value.trim().length > 100) {
            judgmentNoteEl.classList.add('error');
            if (showErrorMessage) {
                showAlert('warning', 'กรุณากรอกข้อมูลให้ถูกต้อง', 'หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร');
            }
            return false;
        }

        if (!validateBusinessRules(showErrorMessage)) {
            return false;
        }

        return true;
    }

    function hasChanged() {
        if (!originalData) return false;
        const cur = {
            filing_date:           document.getElementById('filing-date').value          || '',
            filing_capital:        parseNum(document.getElementById('filing-capital')?.value || '0'),
            red_case_no:           document.getElementById('red-case-no').disabled && originalData?.red_case_no
                ? originalData.red_case_no
                : normalizeCaseNo(document.getElementById('red-case-no').value),
            judgment_date:         document.getElementById('judgment-date').value         || '',
            judgment_note:         document.getElementById('judgment-note').value.trim(),
            first_due_date:        document.getElementById('first-due-date').value        || '',
            total_debt:            parseNum(document.getElementById('total-debt').value),
            principal:             parseNum(document.getElementById('principal').value),
            interest_rate:         parseNum(document.getElementById('interest-rate').value),
            court_fee:             parseNum(document.getElementById('court-fee').value),
            lawyer_fee:            parseNum(document.getElementById('lawyer-fee').value),
            installment_count:     parseNum(document.getElementById('installment-count').value),
            default_interest_rate: parseNum(document.getElementById('default-interest-rate').value),
            installment_1:         parseNum(document.getElementById('installment-1').value),
            installment_2:         parseNum(document.getElementById('installment-2').value),
            installment_3:         parseNum(document.getElementById('installment-3').value),
            installment_4:         parseNum(document.getElementById('installment-4').value),
        };
        return Object.keys(originalData).some(k => {
            if (typeof originalData[k] === 'number') return Math.abs((cur[k]||0) - originalData[k]) > 0.001;
            return cur[k] !== originalData[k];
        });
    }

    function onInputChanged() {
        previewDone = false;

        if (currentCus && !canEditJudgmentData(currentCus.case_status)) {
            setSubmitEnabled(false);
            const wrap = document.getElementById('preview-stale-warn');
            if (wrap) wrap.classList.add('hidden');
            return;
        }

        const wrap = document.getElementById('preview-stale-warn');
        if (wrap) {
            if (hasChanged()) wrap.classList.remove('hidden');
            else wrap.classList.add('hidden');
        }

        // ทุกครั้งที่มีการแก้ไข ต้องบังคับให้กดพรีวิวใหม่ก่อน
        setSubmitEnabled(false);
    }

    function fmtAccNo(n) { if (!n || n.length !== 12) return n || '-'; return `${n.slice(0,4)}-${n.slice(4,8)}-${n.slice(8,12)}`; }
    function fmt(n) {
        return Number(n).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function fmtDate(d) {
        if (!d) return '-';
        const [y, m, day] = d.split('-');
        return `${day}/${m}/${y}`;
    }

    const SCHEDULE_PAGE_SIZE = 20;
    let   schedulePage = 1;

    function switchView(view) {
        currentView  = view;
        schedulePage = 1;
        document.getElementById('view-monthly-btn').className = view === 'monthly'
            ? 'px-3 py-1 rounded text-[12px] font-bold transition-all bg-white text-primary shadow-sm'
            : 'px-3 py-1 rounded text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700';
        document.getElementById('view-daily-btn').className = view === 'daily'
            ? 'px-3 py-1 rounded text-[12px] font-bold transition-all bg-white text-primary shadow-sm'
            : 'px-3 py-1 rounded text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700';
        renderSchedule();
    }

    function changeSchedulePage(page) {
        schedulePage = page;
        renderSchedule();
        document.getElementById('schedule-table-wrap').scrollTop = 0;
    }

    function renderSchedulePagination(total, page) {
        const totalPages = Math.ceil(total / SCHEDULE_PAGE_SIZE);
        const container  = document.getElementById('schedule-pagination');
        if (!container) return;
        if (totalPages <= 1) { container.innerHTML = ''; return; }

        let html = `<button onclick="changeSchedulePage(${page-1})" ${page===1?'disabled':''} class="p-1 rounded border border-slate-100 hover:bg-white transition-all disabled:opacity-30 text-slate-400"><span class="material-symbols-outlined text-sm">chevron_left</span></button><div class="flex gap-1">`;
        for (let i = 1; i <= totalPages; i++) {
            if (i===1 || i===totalPages || (i>=page-1 && i<=page+1)) {
                html += `<button onclick="changeSchedulePage(${i})" class="w-6 h-6 rounded text-[10px] transition-all ${i===page?'bg-primary text-white':'hover:bg-white text-slate-400'}">${i}</button>`;
            } else if (i===2 || i===totalPages-1) {
                html += `<span class="w-6 h-6 flex items-center justify-center text-[10px] text-slate-200">…</span>`;
            }
        }
        html += `</div><button onclick="changeSchedulePage(${page+1})" ${page===totalPages?'disabled':''} class="p-1 rounded border border-slate-100 hover:bg-white transition-all disabled:opacity-30 text-slate-400"><span class="material-symbols-outlined text-sm">chevron_right</span></button>`;
        container.innerHTML = html;
    }

    function renderSchedule() {
        const allRows = currentView === 'monthly' ? scheduleData.monthly : scheduleData.daily;
        const isDaily = currentView === 'daily';

        let rows;
        if (isDaily) {
            const start = (schedulePage - 1) * SCHEDULE_PAGE_SIZE;
            rows = allRows.slice(start, start + SCHEDULE_PAGE_SIZE);
        } else {
            rows = allRows;
        }

        const tbody = document.getElementById('schedule-tbody');
        tbody.innerHTML = rows.map(r => {
            const isPayment    = r.is_payment_date;
            const isEarlyClose = r.is_early_close;
            const rowClass     = isEarlyClose
                ? 'bg-emerald-50 font-semibold border-l-4 border-emerald-400'
                : isPayment
                    ? 'bg-yellow-50 font-semibold'
                    : 'hover:bg-blue-50/20 transition-colors';
            return `<tr class="${rowClass}">
                <td class="py-2 px-4 text-slate-700">${fmtDate(r.date)}</td>
                <td class="py-2 px-4 text-slate-400 text-center font-bold">${String(r.term).padStart(2,'0')}</td>
                <td class="py-2 px-4 text-right text-slate-600">${fmt(r.principal_bf)}</td>
                <td class="py-2 px-4 text-right text-primary font-bold">${r.payment > 0 ? fmt(r.payment) : '-'}</td>
                <td class="py-2 px-4 text-right text-emerald-600">${r.interest_paid > 0 ? fmt(r.interest_paid) : '-'}</td>
                <td class="py-2 px-4 text-right text-indigo-600">${r.principal_paid > 0 ? fmt(r.principal_paid) : '-'}</td>
                <td class="py-2 px-4 text-right text-slate-400">${fmt(r.other_paid)}</td>
                <td class="py-2 px-4 text-right text-slate-800 font-bold">${fmt(r.principal_bal)}</td>
                <td class="py-2 px-4 text-right text-slate-400">${Number(r.daily_interest).toFixed(2)}</td>
                <td class="py-2 px-4 text-right text-slate-500">${fmt(r.acc_interest)}</td>
            </tr>`;
        }).join('');

        const infoText = document.getElementById('schedule-info-text');
        const infoEl   = document.getElementById('schedule-info');
        if (infoText) {
            if (isDaily) {
                const start = (schedulePage - 1) * SCHEDULE_PAGE_SIZE;
                infoText.textContent = `แสดง ${start+1}–${Math.min(start+SCHEDULE_PAGE_SIZE, allRows.length)} จาก ${allRows.length} รายการ (รายวัน)`;
                renderSchedulePagination(allRows.length, schedulePage);
            } else {
                infoText.textContent = `แสดง ${allRows.length} รายการ (รายเดือน)`;
                const pg = document.getElementById('schedule-pagination');
                if (pg) pg.innerHTML = '';
            }
        } else if (infoEl) {
            infoEl.textContent = `แสดง ${rows.length} รายการ (${currentView === 'monthly' ? 'รายเดือน' : 'รายวัน'})`;
        }
    }

    async function loadPreview() {
        const previewBtn = document.getElementById('preview-btn');
        const isManualPreview = previewBtn?.dataset.manual === 'true';

        normalizeRequiredZeroFields();

        if (!isPreviewFormReady(isManualPreview)) {
            document.getElementById('schedule-loading').classList.add('hidden');
            document.getElementById('schedule-placeholder').classList.remove('hidden');

            previewDone = false;
            setSubmitEnabled(false);

            return;
        }

        const filingDate = dpGetValue('filing-date');
        const principal  = document.getElementById('principal').value;
        const intRate    = document.getElementById('interest-rate').value;
        const previewJudgmentType = getActiveJudgmentType();
        const isDefaultJudgmentPreview = previewJudgmentType === 'พิพากษาฝ่ายเดียว';
        const instCount  = isDefaultJudgmentPreview ? '1' : document.getElementById('installment-count').value;
        const firstDue   = dpGetValue('first-due-date');
        const inst1      = document.getElementById('installment-1').value;

        document.getElementById('schedule-placeholder').classList.add('hidden');
        document.getElementById('schedule-table-wrap').classList.add('hidden');
        document.getElementById('schedule-info').classList.add('hidden');
        document.getElementById('schedule-loading').classList.remove('hidden');

        const courtFee  = parseFloat(document.getElementById('court-fee').value) || 0;
        const lawyerFee = parseFloat(document.getElementById('lawyer-fee').value) || 0;

        try {
            const res  = await fetch('/api/schedule/preview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filing_date:       filingDate,
                    principal:         parseNumber(principal),
                    interest_rate:     parseNumber(intRate),
                    installment_count: parseInt(instCount),
                    diff_debt:         parseNumber(document.getElementById('diff-debt').value),
                    first_due_date:    firstDue,
                    installment_1:     parseNumber(inst1),
                    installment_2:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-2').value),
                    installment_3:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-3').value),
                    installment_4:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-4').value),
                })
            });

            const data = await res.json();
            document.getElementById('schedule-loading').classList.add('hidden');

            if (res.ok) {
                scheduleData = data;
                document.getElementById('schedule-table-wrap').classList.remove('hidden');
                document.getElementById('schedule-info').classList.remove('hidden');

                const warn = document.getElementById('preview-stale-warn');
                if (warn) warn.classList.add('hidden');

                renderSchedule();

                previewDone = true;

                // เปิดปุ่มบันทึกได้เฉพาะเมื่อพรีวิวสำเร็จ + มีการแก้ไขจริง + ข้อมูลครบ
                setSubmitEnabled(hasChanged() && isPreviewFormReady(false));

                document.getElementById('preview-btn').dataset.manual = 'false';
            } else {
                previewDone = false;
                setSubmitEnabled(false);

                document.getElementById('schedule-placeholder').classList.remove('hidden');
                showAlert('error', 'เกิดข้อผิดพลาด', data.error || 'ไม่สามารถคำนวณได้ กรุณาตรวจสอบข้อมูล');
            }
        } catch (err) {
            previewDone = false;
            setSubmitEnabled(false);

            document.getElementById('schedule-loading').classList.add('hidden');
            document.getElementById('schedule-placeholder').classList.remove('hidden');
            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');
        }
    }

    // ผูก event กับทุก input field
    const previewFields = ['filing-date','red-case-no','judgment-date','judgment-note','total-debt','principal','interest-rate','default-interest-rate','court-fee','lawyer-fee','installment-count',
                           'first-due-date','installment-1','installment-2',
                           'installment-3','installment-4'];
    previewFields.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input',  onInputChanged);
        el.addEventListener('change', onInputChanged);
    });



    // ---- Account No events ----
    const accountEl = document.getElementById('account-no');
    accountEl.addEventListener('keydown', handleAccountNoKeydown);
    accountEl.addEventListener('input',   handleAccountNoInput);
    accountEl.addEventListener('blur',    handleAccountNoBlur);

    // ---- Customer Name events ----
    document.getElementById('customer-name').addEventListener('input', handleCustomerNameInput);
    document.getElementById('customer-name').addEventListener('blur',  handleCustomerNameBlur);

    document.getElementById('red-case-no').addEventListener('input', () => { handleRedCaseNoInput(); onInputChanged(); });
    document.getElementById('red-case-no').addEventListener('blur', () => {
        const el = document.getElementById('red-case-no');
        el.value = normalizeCaseNo(el.value);
        handleRedCaseNoInput();
        onInputChanged();
    });
    document.getElementById('judgment-note').addEventListener('input', function() {
        document.getElementById('judgment-note-counter').textContent = String(this.value.length);
        onInputChanged();
    });

    // ---- Money fields ----
    ['total-debt', 'principal', 'court-fee', 'lawyer-fee'].forEach(id => {
        const el = document.getElementById(id);
        el.addEventListener('input',  () => {
            handleMoneyInput(id);
            calculateDiff();
            onInputChanged();
        });
        el.addEventListener('blur',   () => {
            handleMoneyBlur(id);
            calculateDiff();

            // Validate ยอดหนี้รวมทันทีหลังออกจากช่อง
            // เพื่อดักทั้งตัวอักษร และยอดที่เกินทุนทรัพย์ที่ฟ้อง โดยไม่ต้องรอกด Preview
            if (id === 'total-debt') {
                validateBusinessRules(false);
            }

            onInputChanged();
        });
    });

    // ---- Installment fields ----
    [1, 2, 3, 4].forEach(i => {
        const id = 'installment-' + i;
        const el = document.getElementById(id);
        el.addEventListener('input', () => { handleMoneyInput(id); onInputChanged(); });
        el.addEventListener('blur',  () => { handleMoneyBlur(id); onInputChanged(); });
    });

    // ---- Interest rate ----
    document.getElementById('interest-rate').addEventListener('focus', () => { stripRateDisplaySuffix('interest-rate'); });
    document.getElementById('interest-rate').addEventListener('input', () => { handleInterestInput(); calculateDiff(); onInputChanged(); });
    document.getElementById('interest-rate').addEventListener('blur',  () => { handleInterestBlur(); calculateDiff(); onInputChanged(); });

    // ---- Default interest rate ----
    document.getElementById('default-interest-rate').addEventListener('focus', () => { stripRateDisplaySuffix('default-interest-rate'); });
    document.getElementById('default-interest-rate').addEventListener('input', () => { handleDefaultInterestInput(); onInputChanged(); });
    document.getElementById('default-interest-rate').addEventListener('blur',  () => { handleDefaultInterestBlur(); onInputChanged(); });

    // ---- Installment count ----
    document.getElementById('installment-count').addEventListener('input', () => { handleInstallmentCountInput(); calculateLastDueDate(); onInputChanged(); });

    // ---- Date constraints ----
document.getElementById('filing-date').addEventListener('change', () => { updateDateConstraints(); onInputChanged(); });
document.getElementById('judgment-date').addEventListener('change', () => { updateDateConstraints(); validateBusinessRules(false); onInputChanged(); });
document.getElementById('first-due-date').addEventListener('change', () => { calculateLastDueDate(); validateBusinessRules(false); onInputChanged(); });

    // ---- Friendly input focus UX ----
    // ต้องเรียกหลังจากผูก blur/input handler เดิมแล้ว
    // เพื่อให้ logic format เดิมยังทำงานปกติ
    setupFriendlyInputFocus();


    // ============================================================
    // Custom Date Picker Engine
    // ============================================================
    const DP_FIELDS   = ['filing-date', 'judgment-date', 'first-due-date', 'last-due-date', 'enf-judgment-date'];
    const DP_STATE    = {};
    const TH_MONTHS   = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                         'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

    DP_FIELDS.forEach(id => {
        const now = new Date();
        DP_STATE[id] = { year: now.getFullYear(), month: now.getMonth(), selected: null, minDate: null, maxDate: null, showMY: false };
    });
    DP_STATE['enf-judgment-date'].maxDate = dpDateStr(new Date());

    function dpGetValue(id) {
        return document.getElementById(id).value;
    }

    function dpSetValue(id, dateStr) {
        document.getElementById(id).value = dateStr;
    }

    function dpFormatDisplay(dateStr) {
        if (!dateStr) return null;
        const [y, m, d] = dateStr.split('-').map(Number);
        return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;
    }

    function dpOpen(id) {
        const state = DP_STATE[id];
        const val   = dpGetValue(id);
        if (val) {
            const [y,m] = val.split('-').map(Number);
            state.year  = y;
            state.month = m - 1;
        }
        DP_FIELDS.forEach(f => { if (f !== id) dpClose(f); });
        dpRender(id);

        const popup   = document.getElementById('dp-popup-' + id);
        const display = document.getElementById('dp-display-' + id);
        popup.classList.add('open');
        display.classList.add('open');

        // คำนวณ position แบบ fixed โดยไม่ให้ปฏิทินยืดตามความกว้างของ field
        const rect    = display.getBoundingClientRect();
        const popupW  = Math.min(320, window.innerWidth - 32);
        const popupH  = 350;
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < popupH && rect.top > popupH) {
            popup.style.top  = (rect.top - popupH - 6) + 'px';
        } else {
            popup.style.top  = (rect.bottom + 6) + 'px';
        }
        popup.style.width = popupW + 'px';
        popup.style.left  = Math.min(Math.max(rect.left, 16), window.innerWidth - popupW - 16) + 'px';
    }

    function dpClose(id) {
        document.getElementById('dp-popup-' + id)?.classList.remove('open');
        document.getElementById('dp-display-' + id)?.classList.remove('open');
        DP_STATE[id].showMY = false;
    }

    function dpToggleMyPicker(id) {
        const state = DP_STATE[id];
        state.showMY = !state.showMY;
        dpRender(id);
    }

    function dpNavMonth(id, delta) {
        const s = DP_STATE[id];
        s.month += delta;
        if (s.month > 11) { s.month = 0; s.year++; }
        if (s.month < 0)  { s.month = 11; s.year--; }
        dpRender(id);
    }

    function dpNavYear(id, delta) {
        DP_STATE[id].year += delta;
        dpRender(id);
    }

    function dpRender(id) {
        const s       = DP_STATE[id];
        const titleEl = document.getElementById('dp-title-' + id);
        titleEl.textContent = TH_MONTHS[s.month] + ' ' + (s.year + 543);

        if (s.showMY) {
            document.getElementById('dp-cal-' + id).classList.add('hidden');
            document.getElementById('dp-my-' + id).classList.remove('hidden');
            document.getElementById('dp-year-label-' + id).textContent = 'พ.ศ. ' + (s.year + 543);
            dpRenderMonths(id);
        } else {
            document.getElementById('dp-cal-' + id).classList.remove('hidden');
            document.getElementById('dp-my-' + id).classList.add('hidden');
            dpRenderDays(id);
        }
    }

    function dpRenderMonths(id) {
        const s   = DP_STATE[id];
        const el  = document.getElementById('dp-months-' + id);
        el.innerHTML = TH_MONTHS.map((m, i) => {
            const cls = i === s.month ? 'dp-my-item active' : 'dp-my-item';
            return `<div class="${cls}" onclick="dpSelectMonth('${id}',${i})">${window.LQDThaiDate.shortMonth(i)}</div>`;
        }).join('');
    }

    function dpSelectMonth(id, month) {
        DP_STATE[id].month  = month;
        DP_STATE[id].showMY = false;
        dpRender(id);
    }

    function dpRenderDays(id) {
        const s        = DP_STATE[id];
        const el       = document.getElementById('dp-days-' + id);
        const today    = new Date();
        today.setHours(0,0,0,0);
        const minDate  = s.minDate ? new Date(s.minDate + 'T00:00:00') : null;
        const maxDate  = s.maxDate ? new Date(s.maxDate + 'T00:00:00') : null;
        const first    = new Date(s.year, s.month, 1);
        const last     = new Date(s.year, s.month + 1, 0);
        const startDay = first.getDay();
        const selStr   = dpGetValue(id);

        let html = '';

        for (let i = 0; i < startDay; i++) {
            const d   = new Date(s.year, s.month, -startDay + i + 1);
            const str = dpDateStr(d);
            html += `<div class="dp-day dp-day-other">${d.getDate()}</div>`;
        }

        for (let d = 1; d <= last.getDate(); d++) {
            const date    = new Date(s.year, s.month, d);
            const str     = dpDateStr(date);
            const isToday = date.getTime() === today.getTime();
            const isSel   = str === selStr;
            const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);
            let cls = 'dp-day';
            if (isDisabled) cls += ' dp-day-disabled';
            else if (isSel) cls += ' dp-day-selected';
            else if (isToday) cls += ' dp-day-today';
            html += `<div class="${cls}" onclick="dpSelectDay('${id}','${str}')">${d}</div>`;
        }

        const totalCells = startDay + last.getDate();
        const trailingCells = Math.max(0, 42 - totalCells);
        for (let i = 1; i <= trailingCells; i++) {
            html += `<div class="dp-day dp-day-other">${i}</div>`;
        }

        el.innerHTML = html;
    }

    function dpDateStr(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2,'0');
        const d = String(date.getDate()).padStart(2,'0');
        return `${y}-${m}-${d}`;
    }

    function dpSelectDay(id, dateStr) {
        const state = DP_STATE[id];
        if ((state.minDate && dateStr < state.minDate) || (state.maxDate && dateStr > state.maxDate)) return;

        dpSetValue(id, dateStr);
        const disp = document.getElementById('dp-text-' + id);
        disp.textContent = dpFormatDisplay(dateStr);
        disp.classList.remove('text-slate-400');
        disp.classList.add('text-slate-800');
        dpClose(id);
        dpAfterSelect(id);
    }

    function dpClear(id) {
        dpSetValue(id, '');
        const disp = document.getElementById('dp-text-' + id);
        const placeholders = {
            'filing-date':       'เลือกวันที่ยื่นฟ้อง',
            'judgment-date':     'เลือกวันที่พิพากษา',
            'first-due-date':    'เลือกวันครบกำหนดงวดแรก',
            'last-due-date':     'คำนวณอัตโนมัติ',
            'enf-judgment-date': 'เลือกวันที่',
        };
        disp.textContent = placeholders[id] || 'เลือกวันที่';
        disp.classList.add('text-slate-400');
        disp.classList.remove('text-slate-800');
        dpClose(id);
        dpAfterSelect(id);
    }

    function dpSelectToday(id) {
        const today = new Date();
        const str   = dpDateStr(today);
        const state = DP_STATE[id];
        if (state.minDate && str < state.minDate) return;
        if (state.maxDate && str > state.maxDate) return;
        dpSelectDay(id, str);
    }

    function dpSetMin(id, minDateStr) {
        DP_STATE[id].minDate = minDateStr;
        const cur = dpGetValue(id);
        if (cur && cur < minDateStr) { dpClear(id); }
    }

    function dpSetMax(id, maxDateStr) {
        DP_STATE[id].maxDate = maxDateStr;
        const cur = dpGetValue(id);
        if (cur && cur > maxDateStr) { dpClear(id); }
    }

    function dpAfterSelect(id) {
        if (id === 'filing-date') {
            const val = dpGetValue('filing-date');
            if (val) dpSetMin('judgment-date', val);
            updateDateConstraints();
            onInputChanged();
        } else if (id === 'judgment-date') {
            updateDateConstraints();
            validateBusinessRules(false);
            onInputChanged();
        } else if (id === 'first-due-date') {
            calculateLastDueDate();
            validateBusinessRules(false);
            onInputChanged();
        }
    }

    document.addEventListener('click', function(e) {
        DP_FIELDS.forEach(id => {
            const wrap = document.getElementById('dp-wrap-' + id);
            if (wrap && !wrap.contains(e.target)) dpClose(id);
        });
    });

    async function loadEditHistory() {
        const body = document.getElementById('edit-history-body');
        if (!body) return;
        try {
            const res  = await fetch(`/api/customers/${accountNo}/edits`);
            const data = await res.json();
            if (!data.edits || data.edits.length === 0) {
                body.innerHTML = '<p class="text-slate-400 text-sm text-center py-4">ไม่มีประวัติการแก้ไข</p>';
                return;
            }
            body.innerHTML = data.edits.map(e => {
                const changes = Object.values(e.changes).map(c =>
                    `<span class="inline-flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded px-2 py-0.5">
                        <span class="font-bold text-slate-600">${c.label}</span>
                        <span class="text-slate-400">${c.from ?? '-'} → ${c.to ?? '-'}</span>
                    </span>`
                ).join(' ');
                const dtLocal = (() => {
                    try {
                        const d = new Date(e.edited_at.replace(' ', 'T') + 'Z');
                        const day  = String(d.getDate()).padStart(2,'0');
                        const mon  = String(d.getMonth()+1).padStart(2,'0');
                        const year = d.getFullYear() + 543;
                        const hh   = String(d.getHours()).padStart(2,'0');
                        const mm   = String(d.getMinutes()).padStart(2,'0');
                        return `${day}/${mon}/${year} ${hh}:${mm}`;
                    } catch(e) { return ''; }
                })();
                return `<div class="py-3 border-b border-slate-50 last:border-0">
                    <div class="flex items-center gap-2 mb-1.5">
                        <span class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">${(e.edited_by_name||'?').charAt(0)}</span>
                        <span class="text-xs font-bold text-slate-700">${e.edited_by_name || 'ไม่ทราบ'}</span>
                        <span class="text-[11px] text-slate-400">${dtLocal}</span>
                    </div>
                    <div class="flex flex-wrap gap-1.5 ml-8">${changes}</div>
                </div>`;
            }).join('');
        } catch(e) {
            body.innerHTML = '<p class="text-slate-400 text-sm text-center py-4">ไม่สามารถโหลดประวัติได้</p>';
        }
    }

    // ============================================================
    // Case Status Logic
    // ============================================================

    let currentCus  = null
    let currentSnap = null

    const CASE_BADGE_STYLES = {
        'ยื่นฟ้อง':          'bg-blue-50 text-blue-700 border-blue-200',
        'พิพากษาตามยอม':    'bg-green-50 text-green-700 border-green-200',
        'พิพากษาฝ่ายเดียว': 'bg-orange-50 text-orange-700 border-orange-200',
        'บังคับคดี':         'bg-red-50 text-red-700 border-red-200',
        'ปิดบัญชี':          'bg-gray-100 text-gray-500 border-gray-200',
    }

    const FLOW_A = ['ยื่นฟ้อง', 'พิพากษาตามยอม', 'บังคับคดี', 'ปิดบัญชี']
    const FLOW_B = ['ยื่นฟ้อง', 'พิพากษาฝ่ายเดียว', 'บังคับคดี', 'ปิดบัญชี']

    function renderProgressBar(caseStatus, statusLogs) {
        const container = document.getElementById('progress-steps')
        if (!container) return

        // ใช้ status log เป็นแหล่งอ้างอิงหลักว่าเคยผ่านสถานะไหนจริง
        // สำคัญมากสำหรับเคสที่ "ปิดบัญชี" โดยไม่เคย "บังคับคดี"
        const visitedStatuses = new Set()
        const logs = Array.isArray(statusLogs) ? statusLogs : []

        logs.forEach(log => {
            if (log.from_status) visitedStatuses.add(log.from_status)
            if (log.to_status)   visitedStatuses.add(log.to_status)
        })
        if (caseStatus) visitedStatuses.add(caseStatus)

        // เลือก flow จากประวัติจริงก่อน ไม่ใช้ caseStatus อย่างเดียว
        // เพราะถ้า caseStatus = "ปิดบัญชี" จะดูไม่ออกว่าเคยเป็น
        // "พิพากษาตามยอม" หรือ "พิพากษาฝ่ายเดียว" ถ้าไม่ดู log
        let flow = FLOW_A
        if (visitedStatuses.has('พิพากษาฝ่ายเดียว') || caseStatus === 'พิพากษาฝ่ายเดียว') {
            flow = FLOW_B
        } else if (visitedStatuses.has('พิพากษาตามยอม') || caseStatus === 'พิพากษาตามยอม') {
            flow = FLOW_A
        }

        // ถ้าเป็นข้อมูลเก่าที่ไม่มี log เลย และสถานะปัจจุบันเป็น ปิดบัญชี
        // จะไม่เดาเองว่าเคยผ่าน บังคับคดี เพื่อป้องกันการติ๊กถูกผิด
        const hasRealLogs = logs.length > 0
        if (!hasRealLogs && caseStatus === 'ปิดบัญชี') {
            visitedStatuses.clear()
            visitedStatuses.add('ปิดบัญชี')
        }

        let dotsRow   = ''
        let labelsRow = ''

        flow.forEach((step, i) => {
            const isActive = step === caseStatus
            const isDone   = !isActive && visitedStatuses.has(step)

            let displayLabel = step
            if (caseStatus === 'ยื่นฟ้อง' && i === 1) displayLabel = 'พิพากษา...'

            let dot = ''
            if (isDone) {
                dot = `<div class="pb-dot-done">
                    <span class="material-symbols-outlined" style="font-size:13px;color:#2563eb;font-variation-settings:'FILL' 1">check</span>
                </div>`
            } else if (isActive) {
                dot = `<div class="pb-dot-active"><div class="pb-dot-active-inner"></div></div>`
            } else {
                dot = `<div class="pb-dot-pending"></div>`
            }
            dotsRow += dot

            if (i < flow.length - 1) {
                const nextStep = flow[i + 1]

                // เส้น connector ให้แสดงเป็นเส้นทางความคืบหน้าไปจนถึงสถานะปัจจุบัน
                // แต่ตัววงกลมยังอ้างอิงจาก visitedStatuses ตาม log จริงเท่านั้น
                // ตัวอย่าง:
                // ยื่นฟ้อง -> พิพากษาฝ่ายเดียว -> ปิดบัญชี
                // เส้นจะลากผ่าน "บังคับคดี" เป็นสีขาว แต่ dot บังคับคดีจะยังว่าง
                const currentIndex = flow.indexOf(caseStatus)
                const lineFilled = currentIndex > -1 && i < currentIndex

                dotsRow += `<div class="pb-line">
                    <div class="pb-line-fill ${lineFilled ? 'pb-line-fill-done' : 'pb-line-fill-none'}"></div>
                </div>`
            }

            const labelClass = isActive ? 'pb-label-active' : isDone ? 'pb-label-done' : 'pb-label-pending'
            labelsRow += `<div class="pb-label-col" style="width:24px"><span class="${labelClass}">${displayLabel}</span></div>`
            if (i < flow.length - 1) {
                labelsRow += `<div class="pb-label-spacer"></div>`
            }
        })

        container.innerHTML = `
            <div class="pb-track" style="min-width:300px">
                <div class="pb-dots-row">${dotsRow}</div>
                <div class="pb-labels-row">${labelsRow}</div>
            </div>`
    }

    async function loadStatusLogs() {
        const body = document.getElementById('status-logs-body')
        if (!body) return []
        try {
            const res  = await fetch(`/api/customers/${accountNo}/status-logs`, { headers: { 'Authorization': `Bearer ${getCookie('token')}` } })
            const data = await res.json()
            const logs = data.logs || []
            if (!logs.length) { body.innerHTML = '<p class="text-slate-300 text-[11px] text-center py-1">ไม่มีประวัติ</p>'; return logs }
            body.innerHTML = logs.map(log => `
                <div class="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">${log.changed_by ? (log.changed_by_name || '?').charAt(0) : 'S'}</div>
                    <div class="flex-1">
                        <span class="text-[11px] font-semibold text-slate-700">${log.from_status || '(ใหม่)'}</span>
                        <span class="text-[11px] text-slate-400 mx-1">→</span>
                        <span class="text-[11px] font-bold text-primary">${log.to_status}</span>
                        <span class="text-[10px] text-slate-300 ml-2">${log.note || ''}</span>
                    </div>
                    <div class="text-[10px] text-slate-300 text-right">${fmtTs(log.changed_at)}</div>
                </div>`).join('')
            return logs
        } catch(e) { body.innerHTML = '<p class="text-slate-300 text-[11px] text-center py-1">โหลดไม่ได้</p>'; return [] }
    }

    function updateSectionVisibility(caseStatus, snap) {
        const outstanding = snap ? snap.outstanding : 0
        const ncb         = snap ? snap.ncb_months  : '31'

        ;['section-enforcement-form','section-enforcement-info'].forEach(id => {
            const el = document.getElementById(id)
            if (el) el.style.display = 'none'
        })

        const footer = document.querySelector('footer')
        const canEdit = canEditJudgmentData(caseStatus)

        // ซ่อน judgment-type-row ก่อนทุกครั้ง
        const jtr = document.getElementById('judgment-type-row')
        if (jtr) jtr.classList.add('hidden')
        jtReset()

        // lock/unlock ช่องกรอกตามสิทธิ์
        setJudgmentFormLocked(!canEdit)

        // footer = ปุ่ม Cancel / บันทึกการแก้ไข
        if (footer) {
            footer.style.display = canEdit ? '' : 'none'
        }

        if (caseStatus === 'ยื่นฟ้อง') {
            // แสดง dropdown เลือกประเภทคำพิพากษาเฉพาะตอนยังเป็นยื่นฟ้อง
            if (jtr) jtr.classList.remove('hidden')

        } else if (['พิพากษาตามยอม','พิพากษาฝ่ายเดียว'].includes(caseStatus)) {
            if (canRecordEnforcementRole() && currentCus?.can_record_enforcement === true) {
                const redCaseInput = document.getElementById('enf-red-case-no')
                if (redCaseInput) redCaseInput.value = currentCus?.red_case_no || '-'
                const el = document.getElementById('section-enforcement-form')
                if (el) el.style.display = ''
            }

        } else if (caseStatus === 'บังคับคดี') {
            const el = document.getElementById('section-enforcement-info')
            if (el) el.style.display = ''

        } else if (caseStatus === 'ปิดบัญชี') {
            if (currentCus && currentCus.enforcement_order_no) {
                const el = document.getElementById('section-enforcement-info')
                if (el) el.style.display = ''
            }

            // ปิดบัญชีแล้วไม่ให้แก้ แม้เป็น admin
            setJudgmentFormLocked(true)
            if (footer) footer.style.display = 'none'
        }
    }

    function fillEnforcementInfo(cus) {
        const fmt = v => { if (!v) return '-'; const p = v.split('-'); return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : v }
        const el = id => document.getElementById(id)
        if (el('enf-info-red-case-no'))   el('enf-info-red-case-no').textContent   = cus.red_case_no || cus.enforcement_order_no || '-'
        if (el('enf-info-judgment-date')) el('enf-info-judgment-date').textContent = fmt(cus.enforcement_judgment_date)
        if (el('enf-info-recorded'))      el('enf-info-recorded').textContent      = cus.enforcement_recorded_at ? fmtTs(cus.enforcement_recorded_at) : '-'
        renderRetroactiveEnforcement(cus)
    }

    function renderRetroactiveJudgment(cus) {
        const alert = cus?.retroactive_judgment_alert
        const badge = document.getElementById('retro-judgment-status-badge')
        const message = document.getElementById('retro-judgment-message')
        const meta = document.getElementById('retro-judgment-meta')
        const btn = document.getElementById('retro-judgment-confirm-btn')
        if (!badge || !message || !meta || !btn) return

        badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border'
        btn.disabled = true
        btn.className = 'w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-bold transition-all'

        if (!alert) {
            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')
            badge.textContent = 'ไม่มีรายการย้อนหลัง'
            message.textContent = 'ไม่มีรายการคำพิพากษาข้ามเดือนที่ต้องยืนยัน'
            meta.textContent = '-'
            btn.textContent = 'ไม่มีรายการที่ต้องยืนยัน'
            return
        }

        const affected = alert.affected_month_label || alert.affected_report_month || '-'
        if (alert.marked) {
            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')
            badge.textContent = 'แก้แล้ว'
            message.textContent = `ยืนยันแล้วว่าแก้รายงานเดือน ${affected} เรียบร้อย`
            meta.textContent = `สถานะเดิม: ${alert.from_status || '-'} | สถานะที่ควรเป็น: ${alert.to_status || alert.case_status || '-'}`
            btn.textContent = 'แก้รายงานแล้ว'
            return
        }

        badge.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-100')
        badge.textContent = 'รอยืนยัน'
        message.textContent = alert.reason || `กรุณาตรวจสอบ/แก้รายงานเดือน ${affected}`
        meta.textContent = `วันที่พิพากษา: ${fmtDate(alert.effective_date || alert.judgment_date)} | สถานะเดิม: ${alert.from_status || '-'} | สถานะที่ควรเป็น: ${alert.to_status || alert.case_status || '-'}`

        if (isAdminRole()) {
            btn.disabled = false
            btn.className = 'w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-amber-700 text-xs font-bold transition-all hover:bg-amber-50'
            btn.textContent = `ยืนยันว่าแก้รายงาน ${affected} แล้ว`
        } else {
            btn.textContent = 'เฉพาะ Admin เท่านั้นที่ยืนยันได้'
        }
    }

    async function confirmRetroJudgmentFix() {
        const alert = currentCus?.retroactive_judgment_alert
        if (!alert || alert.marked) return
        if (!isAdminRole()) {
            showAlert('warning', 'ไม่มีสิทธิ์ยืนยัน', 'เฉพาะ Admin เท่านั้นที่ยืนยันว่าแก้รายงานย้อนหลังแล้วได้')
            return
        }

        const btn = document.getElementById('retro-judgment-confirm-btn')
        if (btn) {
            btn.disabled = true
            btn.textContent = 'กำลังบันทึก...'
        }
        try {
            const res = await fetch(`/api/customers/${accountNo}/retroactive-report-fix`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },
                body: JSON.stringify({
                    reason_code: alert.reason_code,
                    affected_report_month: alert.affected_report_month,
                    note: 'แก้รายงานย้อนหลังแล้ว'
                })
            })
            const data = await res.json()
            if (!res.ok) {
                showAlert('error', 'ไม่สามารถยืนยันได้', data.error || 'เกิดข้อผิดพลาด')
                return
            }
            showSuccessToast('บันทึกสำเร็จ', data.message || 'ยืนยันว่าแก้รายงานย้อนหลังแล้ว')
            await loadCustomerData()
            loadEditHistory()
        } catch(e) {
            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้')
        } finally {
            if (btn) {
                btn.disabled = false
            }
        }
    }

    function setRetroToggleState(isOn, disabled, label, title = '') {
        const btn = document.getElementById('retro-enforcement-toggle')
        const labelEl = document.getElementById('retro-enforcement-toggle-label')
        const knob = document.getElementById('retro-enforcement-toggle-knob')
        const knobDot = knob?.querySelector('span')
        if (!btn || !labelEl || !knob || !knobDot) return

        btn.disabled = !!disabled
        btn.title = title
        btn.setAttribute('aria-checked', isOn ? 'true' : 'false')
        labelEl.textContent = label
        btn.classList.toggle('border-emerald-200', isOn)
        btn.classList.toggle('text-emerald-700', isOn)
        btn.classList.toggle('border-slate-200', !isOn)
        btn.classList.toggle('text-slate-500', !isOn)
        knob.classList.toggle('bg-emerald-500', isOn)
        knob.classList.toggle('bg-slate-200', !isOn)
        knobDot.style.transform = isOn
            ? 'translate(1.375rem, -50%)'
            : 'translate(0.125rem, -50%)'
    }

    function renderRetroactiveEnforcement(cus) {
        const alert = cus?.retroactive_enforcement_alert
        const badge = document.getElementById('retro-enforcement-status-badge')
        const message = document.getElementById('retro-enforcement-message')
        const meta = document.getElementById('retro-enforcement-meta')
        if (!badge || !message || !meta) return

        badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border'

        if (!alert) {
            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')
            badge.textContent = 'ไม่มีรายการย้อนหลัง'
            message.textContent = 'ไม่มีรายการที่ต้องยืนยันว่าแก้รายงานย้อนหลังจาก 31 เป็น 30'
            meta.textContent = 'รายการนี้ใช้เฉพาะเคสบังคับคดีที่มาจากพิพากษาตามยอม และวันที่ของหมายอยู่ก่อนเดือนที่บันทึก/ตรวจรายงาน'
            setRetroToggleState(false, true, 'ไม่มีรายการที่ต้องยืนยัน')
            return
        }

        const affected = alert.affected_month_label || alert.affected_report_month || '-'
        const source = alert.source_month_label || alert.source_report_month || '-'

        if (alert.marked) {
            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')
            badge.textContent = 'แก้แล้ว'
            message.textContent = `ยืนยันแล้วว่าแก้รายงานเดือน ${affected} เรียบร้อย`
            meta.textContent = `ยืนยันโดย ${alert.marked_by_name || '-'} วันที่ ${fmtTs(alert.marked_at)}`
            setRetroToggleState(true, true, `แก้รายงาน ${affected} แล้ว`)
            return
        }

        badge.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-100')
        badge.textContent = 'รอยืนยัน'
        message.textContent = alert.reason || `กรุณาตรวจสอบ/แก้รายงานเดือน ${affected}`
        meta.textContent = `วันที่ของหมาย: ${fmtDate(alert.effective_date || alert.enforcement_date)} | เดือนรายงานที่พบ: ${source}`

        if (isAdminRole()) {
            setRetroToggleState(false, false, `แก้รายงาน ${affected} แล้ว`)
        } else {
            setRetroToggleState(false, true, `แก้รายงาน ${affected} แล้ว`, 'เฉพาะ Admin เท่านั้นที่ยืนยันได้')
        }
    }

    function openRetroEnforcementConfirm() {
        const alert = currentCus?.retroactive_enforcement_alert
        if (!alert || alert.marked) return
        if (!isAdminRole()) {
            showAlert('warning', 'ไม่มีสิทธิ์ยืนยัน', 'เฉพาะ Admin เท่านั้นที่ยืนยันว่าแก้รายงานย้อนหลังแล้วได้')
            return
        }

        const affected = alert.affected_month_label || alert.affected_report_month || '-'
        document.getElementById('retro-modal-account').textContent = currentCus?.account_no || accountNo || '-'
        document.getElementById('retro-modal-month').textContent = affected
        document.getElementById('retro-modal-message').textContent = alert.reason || `กรุณายืนยันว่าแก้รายงานเดือน ${affected} แล้ว`
        document.getElementById('retro-enforcement-confirm-modal')?.classList.remove('hidden')
    }

    function closeRetroEnforcementConfirm() {
        document.getElementById('retro-enforcement-confirm-modal')?.classList.add('hidden')
    }

    async function confirmRetroEnforcementFix() {
        const btn = document.getElementById('retro-modal-confirm-btn')
        if (btn) {
            btn.disabled = true
            btn.textContent = 'กำลังบันทึก...'
        }
        try {
            const res = await fetch(`/api/customers/${accountNo}/retroactive-enforcement-fix`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },
                body: JSON.stringify({ note: 'แก้รายงานย้อนหลังแล้ว' })
            })
            const data = await res.json()
            if (!res.ok) {
                showAlert('error', 'ไม่สามารถยืนยันได้', data.error || 'เกิดข้อผิดพลาด')
                return
            }
            closeRetroEnforcementConfirm()
            showSuccessToast('บันทึกสำเร็จ', data.message || 'ยืนยันว่าแก้รายงานย้อนหลังแล้ว')
            await loadCustomerData()
            loadEditHistory()
        } catch(e) {
            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้')
        } finally {
            if (btn) {
                btn.disabled = false
                btn.textContent = 'ยืนยันว่าแก้รายงานแล้ว'
            }
        }
    }

    async function submitEnforcement() {
        if (!canRecordEnforcementRole()) {
            showAlert(
                'warning',
                'ไม่สามารถบันทึกหมายบังคับคดีได้',
                'ฟังก์ชันนี้อนุญาตเฉพาะ Admin และ User เท่านั้น'
            );
            return;
        }

        const judgmentDate = dpGetValue('enf-judgment-date')
        if (!judgmentDate) {
            showAlert('warning', 'กรุณากรอกข้อมูลให้ครบ', 'ต้องเลือกวันที่ของหมายบังคับคดี'); return
        }
        if (judgmentDate > dpDateStr(new Date())) {
            showAlert('warning', 'วันที่ไม่ถูกต้อง', 'วันที่ของหมายบังคับคดีต้องไม่เป็นวันที่ในอนาคต'); return
        }
        try {
            const res = await fetch(`/api/customers/${accountNo}/enforcement`, {
                method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },
                body: JSON.stringify({ enforcement_judgment_date: judgmentDate })
            })
            const data = await res.json()
            if (res.ok) { showSuccessToast('บันทึกสำเร็จ', 'บันทึกหมายบังคับคดีเรียบร้อย สถานะเปลี่ยนเป็น บังคับคดี'); await loadCustomerData(); loadEditHistory() }
            else { showAlert('error', 'เกิดข้อผิดพลาด', data.error || 'ไม่สามารถบันทึกได้') }
        } catch(e) { showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้') }
    }

    function fmtTs(ts) {
        if (!ts) return '-'
        try {
            const d = new Date(ts.replace(' ','T') + (ts.includes('+') ? '' : 'Z'))
            return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()+543} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
        } catch { return ts }
    }

    // ============================================================
    // Custom Dropdown — ประเภทคำพิพากษา
    // ============================================================
    function jtToggle() {
        const panel   = document.getElementById('jt-panel');
        const chevron = document.getElementById('jt-chevron');
        const isOpen  = !panel.classList.contains('hidden');
        if (isOpen) {
            panel.classList.add('hidden');
            chevron.style.transform = 'rotate(0deg)';
        } else {
            panel.classList.remove('hidden');
            chevron.style.transform = 'rotate(180deg)';
        }
    }

    function jtSelect(value) {
        // เก็บค่าใน hidden input (ใช้กับ logic เดิมที่อ่าน #judgment-type)
        document.getElementById('judgment-type').value = value;

        // อัปเดต display text
        const display = document.getElementById('jt-display');
        display.textContent = value;
        display.classList.remove('text-slate-400');
        display.classList.add('text-slate-800', 'font-semibold');

        // แสดง checkmark เฉพาะตัวที่เลือก
        ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'].forEach(v => {
            const el = document.getElementById('jt-check-' + v);
            if (el) el.classList.toggle('hidden', v !== value);
        });

        // ไฮไลต์ trigger button
        document.getElementById('jt-trigger').classList.add('border-indigo-500', 'ring-4', 'ring-indigo-500/10');

        // ปิด panel
        document.getElementById('jt-panel').classList.add('hidden');
        document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';

        // ใช้ rule เฉพาะประเภทคำพิพากษาทันทีหลังเลือก
        applyJudgmentTypeInputRules(true);
    }

    // ปิด dropdown เมื่อคลิกนอก
    document.addEventListener('click', function(e) {
        const wrap = document.getElementById('jt-dropdown-wrap');
        if (wrap && !wrap.contains(e.target)) {
            document.getElementById('jt-panel')?.classList.add('hidden');
            document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';
        }
    });

    // Reset dropdown เมื่อ updateSectionVisibility ซ่อน/แสดง
    function jtReset() {
        document.getElementById('judgment-type').value  = '';
        const display = document.getElementById('jt-display');
        display.textContent = '-- เลือกประเภทเพื่อเปลี่ยนสถานะ --';
        display.className   = 'text-slate-400';
        document.getElementById('jt-trigger').classList.remove('border-indigo-500', 'ring-4', 'ring-indigo-500/10');
        ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'].forEach(v => {
            document.getElementById('jt-check-' + v)?.classList.add('hidden');
        });
        document.getElementById('jt-panel')?.classList.add('hidden');
        document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';
        applyJudgmentTypeInputRules(false);
    }

    setupUI();
    loadCustomerData();
    loadEditHistory();

    // ซ่อน stale warn เริ่มต้น
    const staleWarn = document.getElementById('preview-stale-warn');
    if (staleWarn) staleWarn.style.display = 'none';

    const installmentCountInput = document.getElementById('installment-count');

    if (installmentCountInput) {
        installmentCountInput.addEventListener('focus', function () {
            if (this.value === '0') {
                this.value = '';
            }

            this.placeholder = '';
        });

        installmentCountInput.addEventListener('blur', function () {
            this.placeholder = '0';
        });
    }
