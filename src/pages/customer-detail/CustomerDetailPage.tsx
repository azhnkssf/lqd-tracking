import {
  useEffect,
  type KeyboardEvent,
  type MouseEvent,
  type FocusEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";
import AppLayout from "../../components/layout/AppLayout";

const customerDetailRuntimeScript =
  "const role        = sessionStorage.getItem('role') || '';\n    const displayName = sessionStorage.getItem('display_name') || '';\n\n    function isAdminRole() {\n        return role === 'admin';\n    }\n\n    function isUserRole() {\n        return role === 'user';\n    }\n\n    function canRecordEnforcementRole() {\n        return isUserRole() || isAdminRole();\n    }\n\n    function editPermissionMessage(caseStatus) {\n        if (caseStatus === 'ยื่นฟ้อง') {\n            return 'สถานะยื่นฟ้องอนุญาตให้ User และ Admin แก้ไขได้เท่านั้น';\n        }\n        return 'สถานะนี้อนุญาตให้แก้ไขได้เฉพาะ Admin เท่านั้น';\n    }\n\n    function canEditJudgmentData(caseStatus) {\n        // ปิดบัญชีแล้วไม่ให้แก้จากหน้านี้ แม้เป็น admin\n        if (caseStatus === 'ปิดบัญชี') return false;\n\n        // สถานะยื่นฟ้องให้ user และ admin แก้ไขได้\n        if (caseStatus === 'ยื่นฟ้อง') {\n            return isUserRole() || isAdminRole();\n        }\n\n        // สถานะอื่นที่ยังแก้ได้ ต้องเป็น admin เท่านั้น\n        return isAdminRole();\n    }\n\n    function canSeeAdminMenu() {\n        // superadmin ยังเห็นเมนูส่วนจัดการระบบ/user ได้\n        // แต่ไม่ได้สิทธิ์แก้ข้อมูลคดี\n        return role === 'admin' || role === 'superadmin';\n    }\n\n    function getCookie(name) {\n        return document.cookie.split('; ').find(r => r.startsWith(name + '='))?.split('=')[1] || '';\n    }\n\n    // ---- ดึง account_no จาก URL ----\n    const urlParams  = new URLSearchParams(window.location.search);\n    const accountNo  = urlParams.get('account') || '';\n    let originalData = null;\n\n    function getSafeReturnTo(fallback = '/customer-list') {\n        const returnTo = urlParams.get('return_to') || '';\n        if (returnTo.startsWith('/customer-list')) return returnTo;\n        return fallback;\n    }\n\n    function setupUI() {\n        if (!role) { window.location.href = '/login'; return; }\n        if (!accountNo) { window.location.href = getSafeReturnTo('/customer-list'); return; }\n        const backLink = document.getElementById('customer-detail-back-link');\n        if (backLink) backLink.href = getSafeReturnTo('/customer-list');\n        const roleLabels = { 'user': 'User', 'admin': 'Admin', 'superadmin': 'Super Admin' };\n        const label = roleLabels[role] || role;\n        document.getElementById('nav-role').textContent           = label;\n        document.getElementById('sidebar-role-label').textContent = label + ' Terminal';\n        document.getElementById('nav-avatar').textContent         = displayName.charAt(0) || '-';\n\n        if (canSeeAdminMenu()) {\n            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'flex');\n        }\n    }\n\n    function setDateRuleLocked(id, locked, title = '') {\n        const display = document.getElementById('dp-display-' + id);\n        if (!display) return;\n\n        display.style.pointerEvents = locked ? 'none' : '';\n        display.style.opacity = locked ? '1' : '';\n        display.classList.toggle('cursor-not-allowed', locked);\n        display.classList.toggle('dp-autocalc', locked);\n        display.title = locked ? title : '';\n    }\n\n    function setJudgmentFormLocked(locked) {\n        const editableInputIds = [\n            'red-case-no',\n            'total-debt',\n            'principal',\n            'interest-rate',\n            'court-fee',\n            'lawyer-fee',\n            'installment-count',\n            'installment-1',\n            'installment-2',\n            'installment-3',\n            'installment-4',\n            'default-interest-rate',\n            'judgment-note'\n        ];\n\n        editableInputIds.forEach(id => {\n            const el = document.getElementById(id);\n            if (!el) return;\n\n            el.readOnly = locked;\n            el.classList.toggle('bg-slate-50/50', locked);\n            el.classList.toggle('text-slate-500', locked);\n            el.classList.toggle('cursor-not-allowed', locked);\n        });\n\n        applyRedCaseNoLock(locked);\n\n        const editableDateIds = [\n            'judgment-date',\n            'first-due-date'\n        ];\n\n        editableDateIds.forEach(id => {\n            setDateRuleLocked(id, locked);\n        });\n\n        // วันที่ยื่นฟ้องเป็นข้อมูลตั้งต้นของคดี ห้ามแก้ทั้งพิพากษาตามยอมและพิพากษาฝ่ายเดียว\n        setDateRuleLocked('filing-date', true, 'วันที่ยื่นฟ้องไม่อนุญาตให้แก้ไขหลังสร้างคดี');\n\n        const jtTrigger = document.getElementById('jt-trigger');\n        if (jtTrigger) {\n            jtTrigger.disabled = locked;\n            jtTrigger.style.pointerEvents = locked ? 'none' : '';\n            jtTrigger.classList.toggle('opacity-60', locked);\n            jtTrigger.classList.toggle('cursor-not-allowed', locked);\n        }\n\n        const previewBtn = document.getElementById('preview-btn');\n        if (previewBtn) {\n            previewBtn.disabled = locked;\n            previewBtn.classList.toggle('opacity-40', locked);\n            previewBtn.classList.toggle('cursor-not-allowed', locked);\n        }\n\n        const monthlyBtn = document.getElementById('view-monthly-btn');\n        const dailyBtn = document.getElementById('view-daily-btn');\n        [monthlyBtn, dailyBtn].forEach(btn => {\n            if (!btn) return;\n            btn.disabled = false; // ปุ่มดูตารางยังให้กดได้\n        });\n\n        // หลัง lock/unlock ตามสิทธิ์แล้ว ให้ apply rule เฉพาะประเภทคำพิพากษาซ้ำ\n        // เพื่อกันไม่ให้เคสพิพากษาฝ่ายเดียวถูกปลดล็อกกลับมาเป็นหลายงวด\n        applyJudgmentTypeInputRules(false);\n    }\n\n    function applyRedCaseNoLock(lockedByPermission = false) {\n        const el = document.getElementById('red-case-no');\n        if (!el) return;\n\n        const hasRecordedRedCaseNo = Boolean((originalData?.red_case_no || currentCus?.red_case_no || '').trim());\n        const locked = lockedByPermission || hasRecordedRedCaseNo;\n\n        el.readOnly = locked;\n        el.disabled = locked;\n        el.classList.toggle('autocalc-input', locked);\n        el.classList.toggle('bg-slate-100', locked);\n        el.classList.toggle('border-slate-300', locked);\n        el.classList.toggle('text-slate-500', locked);\n        el.classList.toggle('cursor-not-allowed', locked);\n        el.style.opacity = locked ? '1' : '';\n        el.title = hasRecordedRedCaseNo\n            ? 'คดีหมายเลขแดงที่ถูกบันทึกครั้งแรกแล้ว ไม่อนุญาตให้แก้ไข'\n            : '';\n    }\n\n    function getActiveJudgmentType() {\n        const selected = document.getElementById('judgment-type')?.value || '';\n        if (selected) return selected;\n\n        // กรณีเป็นเคสที่บันทึกคำพิพากษาไปแล้ว dropdown จะถูกซ่อนไว้\n        // ให้ใช้ case_status ปัจจุบันเป็นตัวบอกประเภทคำพิพากษาแทน\n        return currentCus?.case_status || '';\n    }\n\n    function setInputRuleLocked(el, locked, title = '') {\n        if (!el) return;\n\n        el.readOnly = locked;\n        el.classList.toggle('autocalc-input', locked);\n        el.classList.toggle('bg-slate-100', locked);\n        el.classList.toggle('border-slate-300', locked);\n        el.classList.toggle('text-slate-500', locked);\n        el.classList.toggle('cursor-not-allowed', locked);\n        el.title = locked ? title : '';\n    }\n\n    function applyJudgmentTypeInputRules(triggerChanged = true) {\n        const judgmentType = getActiveJudgmentType();\n        const isDefaultJudgment = judgmentType === 'พิพากษาฝ่ายเดียว';\n        const lockedByPermission = currentCus ? !canEditJudgmentData(currentCus.case_status) : false;\n\n        const installmentCount = document.getElementById('installment-count');\n        const installment2 = document.getElementById('installment-2');\n        const installment3 = document.getElementById('installment-3');\n        const installment4 = document.getElementById('installment-4');\n        const followUpInstallments = [installment2, installment3, installment4];\n\n        if (isDefaultJudgment) {\n            if (installmentCount) {\n                installmentCount.value = '1';\n                hideFieldWarn('installment-count');\n                setInputRuleLocked(installmentCount, true, 'พิพากษาฝ่ายเดียวกำหนดเป็น 1 งวดเท่านั้น');\n            }\n\n            followUpInstallments.forEach(el => {\n                if (!el) return;\n                el.value = '0.00';\n                hideFieldWarn(el.id);\n                setInputRuleLocked(el, true, 'พิพากษาฝ่ายเดียวไม่ต้องกรอกค่างวดที่ 2-4');\n            });\n        } else if (!lockedByPermission) {\n            // พิพากษาตามยอม หรือยังไม่เลือกประเภท → ให้กลับไปใช้ logic เดิม\n            setInputRuleLocked(installmentCount, false);\n            followUpInstallments.forEach(el => setInputRuleLocked(el, false));\n        }\n\n        updateDateConstraints();\n        calculateLastDueDate();\n        validateBusinessRules(false);\n\n        if (triggerChanged && typeof onInputChanged === 'function') {\n            onInputChanged();\n        }\n    }\n\n    // ---- โหลดข้อมูล customer จาก API ----\n    async function loadCustomerData() {\n        try {\n            const res  = await fetch(`/api/customers/${accountNo}`);\n            if (!res.ok) { window.location.href = getSafeReturnTo('/customer-list'); return; }\n            const data = await res.json();\n\n            // สำคัญ: ต้อง set currentCus ก่อน set วันที่/เรียก applyJudgmentTypeInputRules\n            // วันครบกำหนดงวดแรกเป็นวันเดียวกับวันพิพากษาได้ทั้งสองประเภท\n            // ต้อง set currentCus ก่อน apply rule เพื่อไม่ให้ constraint ระหว่างโหลดล้างวันที่ API ส่งมา\n            // ส่งผลให้วันที่ครบกำหนดงวดแรกที่ API ส่งมาโดน clear ทิ้งตอนเปิดหน้าใหม่\n            currentCus = data;\n\n            document.getElementById('account-no').value      = data.account_no || '';\n            document.getElementById('customer-name').value   = data.name || '';\n\n            const filingCapitalEl = document.getElementById('filing-capital');\n            if (filingCapitalEl) {\n                filingCapitalEl.value = Number(data.filing_capital || 0) > 0\n                    ? Number(data.filing_capital).toLocaleString('th-TH', {\n                        minimumFractionDigits: 2,\n                        maximumFractionDigits: 2\n                    })\n                    : '0.00';\n            }\n\n            const defaultDateDisplay = document.getElementById('default-date-display');\n            if (defaultDateDisplay) {\n                defaultDateDisplay.value = fmtDate(data.default_date);\n            }\n\n            const preFilingDpdDisplay = document.getElementById('pre-filing-dpd-days-display');\n            if (preFilingDpdDisplay) {\n                const dpdDays = data.pre_filing_dpd_days;\n                preFilingDpdDisplay.value = (dpdDays !== null && dpdDays !== undefined && dpdDays !== '')\n                    ? `${Number(dpdDays).toLocaleString('th-TH')} วัน`\n                    : '-';\n            }\n\n            const filingNoteDisplay = document.getElementById('filing-note-display');\n            const filingNoteDisplayText = document.getElementById('filing-note-display-text');\n            const filingNoteTooltipText = document.getElementById('filing-note-tooltip-text');\n            if (filingNoteDisplay && filingNoteDisplayText) {\n                const filingNote = data.filing_note || '-';\n                filingNoteDisplayText.textContent = filingNote;\n                filingNoteDisplay.dataset.tooltip = filingNote;\n                if (filingNoteTooltipText) filingNoteTooltipText.textContent = filingNote;\n            }\n\n            if (data.filing_date)   dpSelectDay('filing-date', data.filing_date);\n            if (data.judgment_date) dpSelectDay('judgment-date', data.judgment_date);\n            if (data.first_due_date) dpSelectDay('first-due-date', data.first_due_date);\n\n            const redCaseNoEl = document.getElementById('red-case-no');\n            if (redCaseNoEl) redCaseNoEl.value = data.red_case_no || '';\n            const judgmentNoteEl = document.getElementById('judgment-note');\n            if (judgmentNoteEl) {\n                judgmentNoteEl.value = data.judgment_note || '';\n                const counter = document.getElementById('judgment-note-counter');\n                if (counter) counter.textContent = String(judgmentNoteEl.value.length);\n            }\n\n            const moneyFields = {\n                'total-debt':           data.total_debt,\n                'principal':            data.principal,\n                'court-fee':            data.court_fee,\n                'lawyer-fee':           data.lawyer_fee,\n                'installment-1':        data.installment_1,\n                'installment-2':        data.installment_2,\n                'installment-3':        data.installment_3,\n                'installment-4':        data.installment_4,\n            };\n            for (const [id, val] of Object.entries(moneyFields)) {\n                const el = document.getElementById(id);\n                if (el && val !== null && val !== undefined) {\n                    el.value = Number(val) > 0\n                        ? Number(val).toLocaleString('th-TH', { minimumFractionDigits: 2 })\n                        : '0.00';\n                }\n            }\n\n            document.getElementById('interest-rate').value          = formatRateDisplayValue(data.interest_rate ?? '');\n            document.getElementById('installment-count').value      = data.installment_count ?? '';\n            document.getElementById('default-interest-rate').value  = formatRateDisplayValue(data.default_interest_rate ?? '');\n\n            calculateDiff();\n            calculateLastDueDate();\n            applyJudgmentTypeInputRules(false);\n\n            document.getElementById('detail-subtitle').textContent =\n                fmtAccNo(data.account_no) + ' - ' + data.name;\n\n            originalData = {\n                filing_date:           data.filing_date        || '',\n                filing_capital:        Number(data.filing_capital || 0),\n                red_case_no:           data.red_case_no        || '',\n                judgment_date:         data.judgment_date      || '',\n                judgment_note:         data.judgment_note      || '',\n                first_due_date:        data.first_due_date     || '',\n                total_debt:            Number(data.total_debt  || 0),\n                principal:             Number(data.principal   || 0),\n                interest_rate:         Number(data.interest_rate || 0),\n                court_fee:             Number(data.court_fee   || 0),\n                lawyer_fee:            Number(data.lawyer_fee  || 0),\n                installment_count:     Number(data.installment_count || 0),\n                default_interest_rate: Number(data.default_interest_rate || 0),\n                installment_1:         Number(data.installment_1 || 0),\n                installment_2:         Number(data.installment_2 || 0),\n                installment_3:         Number(data.installment_3 || 0),\n                installment_4:         Number(data.installment_4 || 0),\n            };\n            setSubmitEnabled(false);\n\n            // Timestamps\n            const fmtTs = (ts) => {\n                if (!ts) return '-';\n                try {\n                    const d = new Date(ts.replace(' ', 'T') + (ts.includes('+') ? '' : 'Z'));\n                    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()+543} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;\n                } catch { return ts; }\n            };\n            document.getElementById('ts-created-at').textContent = fmtTs(data.created_at);\n            document.getElementById('ts-updated-at').textContent = fmtTs(data.updated_at);\n\n            // โหลด case status และแสดง progress bar\n            // currentCus ถูก set ไว้ตั้งแต่ต้น loadCustomerData แล้ว\n            applyJudgmentTypeInputRules(false);\n            updateDateConstraints();\n            validateBusinessRules(false);\n            renderRetroactiveJudgment(data);\n            if (data.case_status) {\n                const logs = await loadStatusLogs()\n                renderProgressBar(data.case_status, logs)\n                updateSectionVisibility(data.case_status, data.latest_snapshot || null)\n                if (['บังคับคดี', 'ปิดบัญชี'].includes(data.case_status)) {\n                    fillEnforcementInfo(data)\n                }\n            }\n            applyRedCaseNoLock(currentCus ? !canEditJudgmentData(currentCus.case_status) : false);\n\n            previewDone = false;\n            setSubmitEnabled(false);\n\n            const warn = document.getElementById('preview-stale-warn');\n            if (warn) warn.classList.add('hidden');\n\n            const previewBtn = document.getElementById('preview-btn');\n            if (previewBtn) previewBtn.dataset.manual = 'false';\n\n            if (canAutoPreviewExistingData()) {\n                await loadPreview();\n\n                setSubmitEnabled(false);\n            } else {\n                document.getElementById('schedule-placeholder')?.classList.remove('hidden');\n                document.getElementById('schedule-table-wrap')?.classList.add('hidden');\n                document.getElementById('schedule-info')?.classList.add('hidden');\n                document.getElementById('schedule-loading')?.classList.add('hidden');\n            }\n\n        } catch (err) {\n            console.error('loadCustomerData error:', err);\n        }\n    }\n\n    function showError(msg) {\n        const banner = document.getElementById('error-banner');\n        document.getElementById('error-text').textContent = msg;\n        banner.classList.remove('hidden');\n        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });\n    }\n\n    function hideError() {\n        document.getElementById('error-banner').classList.add('hidden');\n    }\n\n    // ---- Account No validation ----\n    function handleAccountNoInput() {\n        const el      = document.getElementById('account-no');\n        const counter = document.getElementById('account-no-counter');\n        const pos     = el.selectionStart;\n        const cleaned = el.value.replace(/[^0-9]/g, '');\n        const hadInvalid = cleaned !== el.value;\n        el.value = cleaned;\n        if (hadInvalid) {\n            try { el.setSelectionRange(pos - 1, pos - 1); } catch(e) {}\n            showFieldWarn('account-no', 'กรุณากรอกตัวเลขเท่านั้น ไม่อนุญาตให้ใช้ตัวอักษรหรืออักขระพิเศษ');\n        } else {\n            hideFieldWarn('account-no');\n        }\n        const len = el.value.length;\n        counter.textContent = len + '/12';\n        counter.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none font-mono '\n            + (len === 12 ? 'text-emerald-500' : len > 0 ? 'text-amber-400' : 'text-slate-300');\n    }\n\n    function handleAccountNoKeydown(e) {\n        const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End'];\n        if (allowed.includes(e.key)) return;\n        if (e.ctrlKey || e.metaKey) return;\n        if (!/^[0-9]$/.test(e.key)) {\n            e.preventDefault();\n            showFieldWarn('account-no', 'กรุณากรอกตัวเลขเท่านั้น ไม่อนุญาตให้ใช้ตัวอักษรหรืออักขระพิเศษ');\n        }\n    }\n\n    function handleAccountNoBlur() {\n        const el  = document.getElementById('account-no');\n        const len = el.value.length;\n        if (len > 0 && len < 12) {\n            showFieldWarn('account-no', 'เลขที่บัญชีต้องมี 12 หลักเท่านั้น (ปัจจุบัน ' + len + ' หลัก)');\n            el.classList.add('error');\n        } else if (len === 12) {\n            hideFieldWarn('account-no');\n            el.classList.remove('error');\n        }\n    }\n\n    // ---- Customer Name validation ----\n    function hasInvalidCustomerNameChars(value) {\n        return !/^[A-Za-z0-9ก-ฮะ-์.\\-\\s]*$/.test(value || '');\n    }\n\n    function handleCustomerNameInput() {\n        const el  = document.getElementById('customer-name');\n        const val = el.value;\n        if (hasInvalidCustomerNameChars(val)) {\n            showFieldWarn('customer-name', 'ใช้ได้เฉพาะตัวอักษร ตัวเลข เว้นวรรค จุด (.) และขีดกลาง (-)');\n        } else {\n            hideFieldWarn('customer-name');\n        }\n    }\n\n    function handleCustomerNameBlur() {\n        const el  = document.getElementById('customer-name');\n        const val = el.value;\n        if (!val) return;\n        const trimmed = val.trim();\n        if (trimmed !== val) {\n            el.value = trimmed;\n            showFieldWarn('customer-name', 'ไม่อนุญาตให้มีช่องว่างหน้าสุดหรือหลังสุด');\n            return;\n        }\n        if (/\\s{2,}/.test(val)) {\n            showFieldWarn('customer-name', 'ไม่อนุญาตให้มีช่องว่างติดกันหลายช่อง');\n            return;\n        }\n        hideFieldWarn('customer-name');\n        el.classList.remove('error');\n    }\n\n    function setLoading(isLoading) {\n        const btn = document.getElementById('submit-btn');\n        if (btn) {\n            if (isLoading) {\n                btn.disabled = true;\n            } else {\n                setSubmitEnabled(previewDone && hasChanged() && isPreviewFormReady(false));\n            }\n        }\n        document.getElementById('btn-default')?.classList.toggle('hidden', isLoading);\n        document.getElementById('btn-loading')?.classList.toggle('hidden', !isLoading);\n    }\n\n    function setConfirmSubmitLoading(isLoading) {\n        const btn = document.getElementById('confirm-submit-btn');\n        if (!btn) return;\n        btn.disabled = isLoading;\n        btn.innerHTML = isLoading\n            ? '<svg class=\"animate-spin w-4 h-4\" fill=\"none\" viewBox=\"0 0 24 24\"><circle class=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"4\"></circle><path class=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8v8z\"></path></svg> กำลังบันทึก...'\n            : '<span class=\"material-symbols-outlined text-base\">save</span> ยืนยันบันทึก';\n    }\n\n\n    // ============================================================\n    // Validation & Formatting Helpers\n    // ============================================================\n\n    function stripPercentSuffix(val) {\n        return String(val || '').replace(/%/g, '').trim();\n    }\n\n    function parseNumber(val) {\n        return parseFloat(stripPercentSuffix(val).replace(/,/g, '')) || 0;\n    }\n\n    function formatNumber(val) {\n        const n = parseFloat(val.replace(/,/g, ''));\n        if (isNaN(n)) return val;\n        return n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n    }\n\n    function showFieldWarn(id, msg) {\n        const el = document.getElementById('warn-' + id);\n        if (!el) return;\n        if (msg) {\n            const span = el.querySelector('span:last-child');\n            if (span) span.textContent = msg;\n        }\n        el.classList.remove('hidden');\n    }\n\n    function hideFieldWarn(id) {\n        const el = document.getElementById('warn-' + id);\n        if (el) el.classList.add('hidden');\n    }\n\n    function isValidDecimal(val) {\n        return /^[\\d,]*\\.?\\d*$/.test(stripPercentSuffix(val).replace(/,/g, ''));\n    }\n\n    function isValidInteger(val) {\n        return /^\\d+$/.test(val.trim());\n    }\n\n    function normalizeCaseNo(value) {\n        return String(value || '')\n            .trim()\n            .replace(/\\s*\\/\\s*/g, '/')\n            .replace(/\\s+/g, ' ');\n    }\n\n    function isValidCaseNo(value) {\n        return /^[A-Za-zก-ฮ]{1,8}(?:\\s+[A-Za-z]?\\d{1,8}|\\d{1,8})\\/25\\d{2}$/.test(value);\n    }\n\n    function normalizeCaseNo(value) {\n        const raw = String(value || '').replace(/\\s*\\/\\s*/g, '/').replace(/\\s+/g, ' ').trim();\n        const match = raw.match(/^([A-Za-zก-ฮ]{1,8})\\s*([A-Za-z]?\\d{1,8})\\/(25\\d{2})$/);\n        if (!match) return raw;\n        return `${match[1]}${match[2]}/${match[3]}`;\n    }\n\n    function isValidCaseNo(value) {\n        if (!value) return false;\n        return /^([A-Za-zก-ฮ]{1,8})\\s*([A-Za-z]?\\d{1,8})\\/(25\\d{2})$/.test(String(value || '').replace(/\\s*\\/\\s*/g, '/').replace(/\\s+/g, ' ').trim());\n    }\n\n    function handleRedCaseNoInput() {\n        const el = document.getElementById('red-case-no');\n        if (!el) return;\n        const value = normalizeCaseNo(el.value);\n        if (!value || !isValidCaseNo(value)) {\n            showFieldWarn('red-case-no', 'รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567');\n        } else {\n            el.value = value;\n            hideFieldWarn('red-case-no');\n        }\n    }\n\n    const ZERO_REQUIRED_FIELD_IDS = new Set([\n        'interest-rate',\n        'default-interest-rate',\n        'court-fee',\n        'lawyer-fee',\n        'installment-2',\n        'installment-3'\n    ]);\n\n    const ZERO_REQUIRED_MONEY_FIELD_IDS = new Set([\n        'court-fee',\n        'lawyer-fee',\n        'installment-2',\n        'installment-3'\n    ]);\n\n    function normalizeRequiredZeroFields() {\n        ZERO_REQUIRED_MONEY_FIELD_IDS.forEach(id => {\n            const el = document.getElementById(id);\n            if (!el) return;\n            if (String(el.value || '').trim() === '') {\n                el.value = '0.00';\n            }\n        });\n\n        ['interest-rate', 'default-interest-rate'].forEach(id => {\n            const el = document.getElementById(id);\n            if (!el) return;\n            if (String(el.value || '').trim() === '') {\n                el.value = '0%';\n            }\n        });\n    }\n\n    function showBusinessError(title, message) {\n        if (typeof showAlert === 'function') {\n            showAlert('warning', title, message);\n        } else {\n            showError(message);\n        }\n    }\n\n    function validateBusinessRules(showErrorMessage = false) {\n        normalizeRequiredZeroFields();\n\n        const totalDebtEl = document.getElementById('total-debt');\n        const filingCapitalEl = document.getElementById('filing-capital');\n        const interestEl = document.getElementById('interest-rate');\n        const defaultInterestEl = document.getElementById('default-interest-rate');\n        const firstDueDisplay = document.getElementById('dp-display-first-due-date');\n\n        ['total-debt', 'interest-rate', 'default-interest-rate', 'court-fee', 'lawyer-fee', 'installment-2', 'installment-3'].forEach(id => {\n            document.getElementById(id)?.classList.remove('error');\n            hideFieldWarn(id);\n        });\n        firstDueDisplay?.classList.remove('error');\n\n        const numericRuleFields = [\n            ['total-debt', 'กรุณากรอกตัวเลขเท่านั้น'],\n            ['interest-rate', 'กรุณากรอกตัวเลขเท่านั้น'],\n            ['default-interest-rate', 'กรุณากรอกตัวเลขเท่านั้น'],\n            ['court-fee', 'กรุณากรอกตัวเลขเท่านั้น'],\n            ['lawyer-fee', 'กรุณากรอกตัวเลขเท่านั้น'],\n            ['installment-2', 'กรุณากรอกตัวเลขเท่านั้น'],\n            ['installment-3', 'กรุณากรอกตัวเลขเท่านั้น'],\n        ];\n\n        for (const [id, msg] of numericRuleFields) {\n            const field = document.getElementById(id);\n            const raw = stripPercentSuffix(field?.value || '').replace(/,/g, '').trim();\n            if (raw && !/^\\d*\\.?\\d*$/.test(raw)) {\n                field?.classList.add('error');\n                showFieldWarn(id, msg);\n                if (showErrorMessage) showBusinessError('ข้อมูลไม่ถูกต้อง', msg);\n                return false;\n            }\n        }\n\n        const totalDebt = parseNumber(totalDebtEl?.value || '0');\n        const filingCapital = parseNumber(filingCapitalEl?.value || '0');\n        if (filingCapital > 0 && totalDebt > filingCapital) {\n            totalDebtEl?.classList.add('error');\n            showFieldWarn('total-debt', 'ยอดหนี้รวมต้องไม่เกินทุนทรัพย์ที่ฟ้อง');\n            if (showErrorMessage) {\n                showBusinessError('ยอดหนี้รวมไม่ถูกต้อง', 'ยอดหนี้รวมต้องไม่เกินทุนทรัพย์ที่ฟ้อง โดยไม่ต้องรวมดอกเบี้ย');\n            }\n            return false;\n        }\n\n        const interest = parseNumber(interestEl?.value || '0');\n        const defaultInterest = parseNumber(defaultInterestEl?.value || '0');\n        if (interest > 24) {\n            interestEl?.classList.add('error');\n            showFieldWarn('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');\n            if (showErrorMessage) showBusinessError('อัตราดอกเบี้ยไม่ถูกต้อง', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');\n            return false;\n        }\n        if (defaultInterest > 24) {\n            defaultInterestEl?.classList.add('error');\n            showFieldWarn('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');\n            if (showErrorMessage) showBusinessError('ดอกเบี้ยผิดนัดไม่ถูกต้อง', 'ดอกเบี้ยเมื่อผิดนัดชำระ (%) ต้องไม่เกิน 24%');\n            return false;\n        }\n\n        const judgmentDate = dpGetValue('judgment-date');\n        const firstDue = dpGetValue('first-due-date');\n        if (judgmentDate && firstDue) {\n            const invalidDate = firstDue < judgmentDate;\n            if (invalidDate) {\n                firstDueDisplay?.classList.add('error');\n                const msg = 'วันครบกำหนดงวดแรกสามารถเป็นวันเดียวกับวันที่พิพากษาได้ แต่ห้ามน้อยกว่าวันที่พิพากษา';\n                if (showErrorMessage) showBusinessError('วันที่ครบกำหนดไม่ถูกต้อง', msg);\n                return false;\n            }\n        }\n\n        return true;\n    }\n\n    // ---- Date constraint ----\n    function updateDateConstraints() {\n        const filingVal   = dpGetValue('filing-date');\n        const judgmentVal = dpGetValue('judgment-date');\n        if (filingVal) dpSetMin('judgment-date', filingVal);\n\n        if (judgmentVal) {\n            dpSetMin('first-due-date', judgmentVal);\n        }\n    }\n\n    function handleMoneyInput(id) {\n        const el = document.getElementById(id);\n        if (!el) return;\n\n        const before = el.value;\n        const cursor = el.selectionStart;\n        const rawNoComma = before.replace(/,/g, '');\n        const hasInvalidChars = /[^\\d.]/.test(rawNoComma);\n\n        let cleaned = rawNoComma.replace(/[^\\d.]/g, '');\n\n        const firstDotIndex = cleaned.indexOf('.');\n        if (firstDotIndex !== -1) {\n            cleaned =\n                cleaned.slice(0, firstDotIndex + 1) +\n                cleaned.slice(firstDotIndex + 1).replace(/\\./g, '');\n        }\n\n        if (hasInvalidChars) {\n            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');\n        } else {\n            hideFieldWarn(id);\n        }\n\n        if (cleaned === '' || cleaned === '.') {\n            el.value = cleaned;\n            return;\n        }\n\n        if (!/^\\d*\\.?\\d*$/.test(cleaned)) {\n            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');\n            el.value = cleaned;\n            return;\n        }\n\n        if (before !== cleaned) {\n            const diff = before.length - cleaned.length;\n            el.value = cleaned;\n\n            if (typeof cursor === 'number') {\n                const nextPos = Math.max(0, cursor - diff);\n                requestAnimationFrame(() => {\n                    el.setSelectionRange(nextPos, nextPos);\n                });\n            }\n        }\n    }\n\n    function handleMoneyBlur(id) {\n        const el  = document.getElementById(id);\n        const raw = el.value.replace(/,/g, '').trim();\n\n        if (!raw || isNaN(parseFloat(raw))) {\n            if (ZERO_REQUIRED_MONEY_FIELD_IDS.has(id)) {\n                el.value = '0.00';\n                hideFieldWarn(id);\n                return;\n            }\n            el.value = '';\n            return;\n        }\n\n        const rounded = Math.round(parseFloat(raw) * 100) / 100;\n        el.value = rounded.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n        hideFieldWarn(id);\n    }\n\n    // ---- Interest rate handler ----\n    function formatRateDisplayValue(value) {\n        const raw = stripPercentSuffix(value);\n        if (raw === '' || raw === '.') return '';\n        const n = Number(raw);\n        if (Number.isNaN(n)) return raw;\n        const rounded = Math.round(Math.min(24, Math.max(0, n)) * 100) / 100;\n        const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0+$/, '').replace(/\\.$/, '');\n        return `${text}%`;\n    }\n\n    function stripRateDisplaySuffix(id) {\n        const el = document.getElementById(id);\n        if (!el) return;\n        el.value = stripPercentSuffix(el.value);\n    }\n\n    function handleRateInput(id, maxMessage) {\n        const el = document.getElementById(id);\n        if (!el) return;\n\n        const before = stripPercentSuffix(el.value);\n        const hasInvalidChars = /[^\\d.]/.test(before);\n\n        let cleaned = before.replace(/[^\\d.]/g, '');\n        const firstDotIndex = cleaned.indexOf('.');\n        if (firstDotIndex !== -1) {\n            cleaned = cleaned.slice(0, firstDotIndex + 1) + cleaned.slice(firstDotIndex + 1).replace(/\\./g, '');\n        }\n\n        el.value = cleaned;\n\n        if (hasInvalidChars) {\n            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');\n            return;\n        }\n\n        // ระหว่างพิมพ์ให้รับค่าแบบ 12. / 12.3 / 12.34 ได้ ไม่ยิง error เร็วเกินไป\n        if (cleaned === '' || cleaned === '.') {\n            hideFieldWarn(id);\n            return;\n        }\n\n        const n = Number(cleaned);\n        if (!Number.isNaN(n) && n > 24) {\n            showFieldWarn(id, maxMessage);\n            return;\n        }\n\n        hideFieldWarn(id);\n    }\n\n    function handleRateBlur(id, maxMessage) {\n        const el = document.getElementById(id);\n        if (!el) return;\n\n        const raw = stripPercentSuffix(el.value);\n        if (raw === '' || raw === '.') {\n            el.value = '0%';\n            hideFieldWarn(id);\n            return;\n        }\n\n        const n = Number(raw);\n        if (Number.isNaN(n)) {\n            el.value = '0%';\n            showFieldWarn(id, 'กรุณากรอกตัวเลขเท่านั้น');\n            return;\n        }\n\n        el.value = formatRateDisplayValue(raw);\n\n        if (n > 24) showFieldWarn(id, maxMessage);\n        else hideFieldWarn(id);\n    }\n\n    function handleInterestInput() {\n        handleRateInput('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');\n    }\n\n    function handleInterestBlur() {\n        handleRateBlur('interest-rate', 'อัตราดอกเบี้ย/ปีต้องไม่เกิน 24%');\n    }\n\n    // ---- Default interest rate handler ----\n    function handleDefaultInterestInput() {\n        handleRateInput('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');\n    }\n\n    function handleDefaultInterestBlur() {\n        handleRateBlur('default-interest-rate', 'ดอกเบี้ยเมื่อผิดนัดต้องไม่เกิน 24%');\n    }\n\n    // ---- Installment count handler ----\n    function handleInstallmentCountInput() {\n        const el  = document.getElementById('installment-count');\n\n        // ถ้าเป็นพิพากษาฝ่ายเดียว ช่องนี้ต้องเป็น 1 งวดเสมอ\n        if (getActiveJudgmentType() === 'พิพากษาฝ่ายเดียว') {\n            el.value = '1';\n            hideFieldWarn('installment-count');\n            calculateLastDueDate();\n            return;\n        }\n\n        const raw = el.value.trim();\n        if (raw === '') { hideFieldWarn('installment-count'); return; }\n        if (!/^\\d+$/.test(raw)) {\n            showFieldWarn('installment-count', 'กรุณากรอกตัวเลขจำนวนเต็มเท่านั้น');\n            el.value = raw.replace(/\\D/g, '');\n            return;\n        }\n        hideFieldWarn('installment-count');\n    }\n\n    // ---- Friendly input focus UX ----\n// ทำให้ placeholder หายตอน focus\n// ถ้าค่าเดิมเป็น 0 / 0.00 ให้ล้างช่องทันที\n// ถ้ามีค่าจริงอยู่แล้ว ให้ select ทั้งช่อง เพื่อพิมพ์ทับได้เลย\nfunction isZeroLikeInputValue(value) {\n    const raw = String(value || '')\n        .replace(/,/g, '')\n        .replace(/%/g, '')\n        .trim();\n\n    if (raw === '') return false;\n\n    const num = Number(raw);\n    return !Number.isNaN(num) && num === 0;\n}\n\nfunction setupFriendlyInputFocus() {\n    const zeroClearFieldIds = new Set([\n        'total-debt',\n        'principal',\n        'court-fee',\n        'lawyer-fee',\n        'installment-1',\n        'installment-2',\n        'installment-3',\n        'installment-4',\n        'interest-rate',\n        'default-interest-rate',\n        'installment-count'\n    ]);\n\n    const skipFieldIds = new Set([\n        'account-no',\n        'customer-name',\n        'diff-debt'\n    ]);\n\n    document.querySelectorAll('input.form-input-styled').forEach(el => {\n        if (!el.id) return;\n        if (skipFieldIds.has(el.id)) return;\n        if (el.readOnly || el.disabled) return;\n        if (el.dataset.friendlyFocusBound === '1') return;\n\n        el.dataset.friendlyFocusBound = '1';\n        el.dataset.originalPlaceholder = el.getAttribute('placeholder') || '';\n\n        el.addEventListener('focus', () => {\n            // ซ่อน placeholder ทันทีตอน user คลิกเข้า field\n            el.setAttribute('placeholder', '');\n\n            if (zeroClearFieldIds.has(el.id) && isZeroLikeInputValue(el.value)) {\n                el.value = '';\n                return;\n            }\n\n            // ถ้ามีค่าจริงอยู่แล้ว ให้ select ทั้งช่อง\n            // เวลา user พิมพ์ จะทับค่าเดิม ไม่ไปต่อท้าย\n            if (el.value && typeof el.select === 'function') {\n                requestAnimationFrame(() => el.select());\n            }\n        });\n\n        el.addEventListener('blur', () => {\n            // คืน placeholder หลังออกจาก field\n            el.setAttribute('placeholder', el.dataset.originalPlaceholder || '');\n        });\n    });\n}\n\n    // ---- calculateDiff ----\n    function calculateDiff() {\n        const courtFee  = parseNumber(document.getElementById('court-fee').value);\n        const lawyerFee = parseNumber(document.getElementById('lawyer-fee').value);\n        const totalDebt = parseNumber(document.getElementById('total-debt').value);\n        const principal = parseNumber(document.getElementById('principal').value);\n        const total     = (courtFee + lawyerFee + totalDebt) - principal;\n        const field     = document.getElementById('diff-debt');\n        field.value     = total.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n        field.style.color = total > 0 ? '#2D3282' : total < 0 ? '#ef4444' : '';\n    }\n\n    function calculateLastDueDate() {\n        const firstDue = dpGetValue('first-due-date');\n        const count    = parseInt((document.getElementById('installment-count').value || '').replace(/[^0-9]/g,'')) || 0;\n        if (!firstDue || count < 1) { dpClear('last-due-date'); return; }\n        const date = new Date(firstDue + 'T00:00:00');\n        date.setMonth(date.getMonth() + count - 1);\n        const str  = dpDateStr(date);\n        dpSetValue('last-due-date', str);\n        const disp = document.getElementById('dp-text-last-due-date');\n        disp.textContent = dpFormatDisplay(str);\n        disp.classList.remove('text-slate-400');\n        disp.classList.add('text-slate-800');\n    }\n\n    function validate() {\n        normalizeRequiredZeroFields();\n\n        const required = [\n            { id: 'account-no',       label: 'หมายเลขบัญชี' },\n            { id: 'customer-name',    label: 'ชื่อ-นามสกุล' },\n            { id: 'filing-date',      label: 'วันที่ยื่นฟ้อง' },\n            { id: 'red-case-no',      label: 'คดีหมายเลขแดงที่' },\n            { id: 'judgment-date',    label: 'วันที่พิพากษา' },\n            { id: 'total-debt',       label: 'ยอดหนี้รวม' },\n            { id: 'principal',        label: 'เงินต้น' },\n            { id: 'interest-rate',    label: 'อัตราดอกเบี้ย/ปี' },\n            { id: 'default-interest-rate', label: 'ดอกเบี้ยเมื่อผิดนัดชำระ (%)' },\n            { id: 'court-fee',        label: 'ค่าธรรมเนียมศาล' },\n            { id: 'lawyer-fee',       label: 'ค่าทนายความ' },\n            { id: 'installment-count', label: 'จำนวนงวดผ่อน' },\n            { id: 'first-due-date',   label: 'วันครบกำหนดงวดแรก' },\n            { id: 'installment-1',    label: 'ค่างวด งวดที่ 1' },\n        ];\n\n        document.querySelectorAll('.form-input-styled').forEach(el => el.classList.remove('error'));\n\n        const missing = required.filter(f => {\n            const val = document.getElementById(f.id).value.trim();\n            if (!val) { document.getElementById(f.id).classList.add('error'); return true; }\n            return false;\n        });\n\n        if (missing.length > 0) {\n            showError('กรุณากรอกข้อมูลที่จำเป็นให้ครบ: ' + missing.map(f => f.label).join(', '));\n            return false;\n        }\n\n        const accountVal = document.getElementById('account-no').value;\n        if (accountVal.length !== 12) {\n            showError('เลขที่บัญชีต้องมี 12 หลักเท่านั้น');\n            document.getElementById('account-no').classList.add('error');\n            return false;\n        }\n\n        const nameVal = document.getElementById('customer-name').value;\n        if (hasInvalidCustomerNameChars(nameVal)) {\n            showError('ชื่อ-นามสกุล/ชื่อบริษัทใช้ได้เฉพาะตัวอักษร ตัวเลข เว้นวรรค จุด (.) และขีดกลาง (-)');\n            document.getElementById('customer-name').classList.add('error');\n            return false;\n        }\n\n        const redCaseVal = normalizeCaseNo(document.getElementById('red-case-no').value);\n        if (!isValidCaseNo(redCaseVal)) {\n            showError('คดีหมายเลขแดงที่ต้องอยู่ในรูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567');\n            document.getElementById('red-case-no').classList.add('error');\n            return false;\n        }\n\n        if (document.getElementById('judgment-note').value.trim().length > 100) {\n            showError('หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร');\n            document.getElementById('judgment-note').classList.add('error');\n            return false;\n        }\n\n        // ถ้า case_status = ยื่นฟ้อง ต้องเลือก judgment_type ก่อนบันทึก\n        if (currentCus && currentCus.case_status === 'ยื่นฟ้อง') {\n            const jt = document.getElementById('judgment-type')?.value || '';\n            const jtTrigger = document.getElementById('jt-trigger');\n            const jtWarn = document.getElementById('warn-judgment-type');\n            if (!jt) {\n                showError('กรุณาเลือกประเภทคำพิพากษา (พิพากษาตามยอม / พิพากษาฝ่ายเดียว) ก่อนบันทึก');\n                jtTrigger?.classList.add('border-red-400', 'ring-4', 'ring-red-500/10');\n                if (jtWarn) jtWarn.classList.remove('hidden');\n                return false;\n            }\n            jtTrigger?.classList.remove('border-red-400', 'ring-red-500/10');\n            if (jtWarn) jtWarn.classList.add('hidden');\n        }\n\n        if (!validateBusinessRules(true)) {\n            return false;\n        }\n\n        return true;\n    }\n\n    function fmtReview(val) {\n        const n = parseNumber(String(val));\n        if (!val || val === '0.00' || val === '') return '-';\n        return '฿' + n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n    }\n\n    function fmtDateReview(id) {\n        const val = dpGetValue(id);\n        if (!val) return '-';\n        const [y,m,d] = val.split('-');\n        return `${d}/${m}/${y}`;\n    }\n\n    function showSuccessToast(title, msg) {\n        // ถ้ามี toast modal ให้ใช้ ถ้าไม่มีใช้ alert\n        const modal = document.getElementById('toast-modal');\n        if (modal) {\n            document.getElementById('toast-icon-wrap').className = 'w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-emerald-50';\n            document.getElementById('toast-icon').className      = 'material-symbols-outlined text-3xl text-emerald-500';\n            document.getElementById('toast-icon').style.fontVariationSettings = '\"FILL\" 1';\n            document.getElementById('toast-icon').textContent    = 'check_circle';\n            document.getElementById('toast-title').textContent   = title;\n            document.getElementById('toast-message').textContent = msg;\n            modal.classList.remove('hidden');\n        } else {\n            alert(title + ': ' + msg);\n        }\n    }\n\n    function handleSubmit() {\n        try {\n            hideError();\n\n            if (currentCus && !canEditJudgmentData(currentCus.case_status)) {\n                showAlert(\n                    'warning',\n                    'ไม่สามารถแก้ไขข้อมูลได้',\n                    editPermissionMessage(currentCus.case_status)\n                );\n                setSubmitEnabled(false);\n                return;\n            }\n\n            // ต้องกดพรีวิวสำเร็จก่อน จึงจะเปิด modal ยืนยันบันทึกได้\n            if (!previewDone) {\n                showAlert(\n                    'warning',\n                    'กรุณากดพรีวิวก่อนบันทึก',\n                    'ทุกครั้งที่มีการเพิ่มหรือแก้ไขข้อมูล ต้องกดพรีวิวตารางผ่อนชำระก่อน จึงจะบันทึกได้'\n                );\n                setSubmitEnabled(false);\n                return;\n            }\n\n            // ตรวจว่าข้อมูล required สำหรับ preview ยังครบอยู่หรือไม่\n            if (typeof isPreviewFormReady === 'function' && !isPreviewFormReady(true)) {\n                previewDone = false;\n                setSubmitEnabled(false);\n                showAlert(\n                    'warning',\n                    'ยังบันทึกไม่ได้',\n                    'กรุณาตรวจสอบข้อมูลที่จำเป็นให้ครบ แล้วกดพรีวิวใหม่ก่อนบันทึก'\n                );\n                return;\n            }\n\n            if (!validate()) {\n                showAlert(\n                    'warning',\n                    'ตรวจสอบข้อมูลไม่ผ่าน',\n                    'กรุณาตรวจสอบช่องที่ถูกแจ้งเตือนหรือข้อความด้านบนก่อนบันทึก'\n                );\n                return;\n            }\n\n            const setReviewText = (id, value) => {\n                const el = document.getElementById(id);\n                if (el) el.textContent = value;\n            };\n\n            setReviewText('rv-account-no', document.getElementById('account-no').value);\n            setReviewText('rv-customer-name', document.getElementById('customer-name').value);\n            setReviewText('rv-filing-date', fmtDateReview('filing-date'));\n            setReviewText('rv-judgment-date', fmtDateReview('judgment-date'));\n            setReviewText('rv-red-case-no', normalizeCaseNo(document.getElementById('red-case-no').value));\n            setReviewText('rv-judgment-note', document.getElementById('judgment-note').value.trim() || '-');\n\n            // แสดง judgment-type ถ้า case_status = ยื่นฟ้อง\n            const _jt = document.getElementById('judgment-type')?.value || '';\n            const _jtRow = document.getElementById('rv-judgment-type-row');\n            if (_jtRow) {\n                if (currentCus && currentCus.case_status === 'ยื่นฟ้อง' && _jt) {\n                    _jtRow.classList.remove('hidden');\n                    setReviewText('rv-judgment-type', _jt);\n                } else {\n                    _jtRow.classList.add('hidden');\n                }\n            }\n\n            setReviewText('rv-total-debt', fmtReview(document.getElementById('total-debt').value));\n            setReviewText('rv-principal', fmtReview(document.getElementById('principal').value));\n            setReviewText('rv-interest-rate', formatRateDisplayValue(document.getElementById('interest-rate').value || '0'));\n            setReviewText('rv-court-fee', fmtReview(document.getElementById('court-fee').value));\n            setReviewText('rv-lawyer-fee', fmtReview(document.getElementById('lawyer-fee').value));\n            setReviewText('rv-diff-debt', fmtReview(document.getElementById('diff-debt').value));\n            setReviewText('rv-first-due-date', fmtDateReview('first-due-date'));\n            setReviewText('rv-last-due-date', fmtDateReview('last-due-date'));\n            setReviewText('rv-installment-count', (document.getElementById('installment-count').value || '-') + ' งวด');\n            setReviewText('rv-default-interest', formatRateDisplayValue(document.getElementById('default-interest-rate').value || '0'));\n            setReviewText('rv-inst-1', fmtReview(document.getElementById('installment-1').value));\n            setReviewText('rv-inst-2', fmtReview(document.getElementById('installment-2').value));\n            setReviewText('rv-inst-3', fmtReview(document.getElementById('installment-3').value));\n            setReviewText('rv-inst-4', fmtReview(document.getElementById('installment-4').value));\n\n            openConfirmModal();\n        } catch (err) {\n            console.error('[CustomerDetail] handleSubmit failed', err);\n            showAlert(\n                'error',\n                'ไม่สามารถเปิดหน้าต่างยืนยันได้',\n                'เกิดข้อผิดพลาดขณะตรวจสอบข้อมูลก่อนบันทึก กรุณาลองใหม่อีกครั้ง'\n            );\n            showError('ไม่สามารถเปิดหน้าต่างยืนยันได้ กรุณาลองใหม่อีกครั้ง');\n        }\n    }\n\n    function openConfirmModal() {\n        const modal = document.getElementById('confirm-modal');\n        if (!modal) {\n            console.error('[CustomerDetail] confirm modal element not found');\n            showAlert('error', 'ไม่พบหน้าต่างยืนยัน', 'ไม่สามารถเปิดหน้าต่างยืนยันบันทึกได้ กรุณารีเฟรชหน้าแล้วลองใหม่');\n            return;\n        }\n        modal.classList.remove('hidden');\n        modal.style.display = 'flex';\n        document.body.classList.add('overflow-hidden');\n    }\n\n    function closeConfirmModal() {\n        const modal = document.getElementById('confirm-modal');\n        if (!modal) return;\n        modal.classList.add('hidden');\n        modal.style.display = 'none';\n        document.body.classList.remove('overflow-hidden');\n    }\n\n    async function doSubmit() {\n        if (currentCus && !canEditJudgmentData(currentCus.case_status)) {\n            showAlert(\n                'warning',\n                'ไม่สามารถแก้ไขข้อมูลได้',\n                editPermissionMessage(currentCus.case_status)\n            );\n            setSubmitEnabled(false);\n            return;\n        }\n\n        if (!previewDone) {\n            showAlert(\n                'warning',\n                'กรุณากดพรีวิวก่อนบันทึก',\n                'ทุกครั้งที่มีการเพิ่มหรือแก้ไขข้อมูล ต้องกดพรีวิวตารางผ่อนชำระก่อน จึงจะบันทึกได้'\n            );\n            setSubmitEnabled(false);\n            return;\n        }\n\n        normalizeRequiredZeroFields();\n\n        if (!isPreviewFormReady(true)) {\n            previewDone = false;\n            setSubmitEnabled(false);\n            return;\n        }\n\n        setConfirmSubmitLoading(true);\n        setLoading(true);\n        const payload = {\n            filing_date: dpGetValue('filing-date'),\n            filing_capital: parseNumber(document.getElementById('filing-capital').value),\n            red_case_no: document.getElementById('red-case-no').disabled && originalData?.red_case_no\n                ? originalData.red_case_no\n                : normalizeCaseNo(document.getElementById('red-case-no').value),\n            judgment_date: dpGetValue('judgment-date'),\n            judgment_note: document.getElementById('judgment-note').value.trim(),\n            total_debt: parseNumber(document.getElementById('total-debt').value),\n            principal:              parseNumber(document.getElementById('principal').value),\n            judgment_difference:    parseNumber(document.getElementById('diff-debt').value),\n            interest_rate:          parseNumber(document.getElementById('interest-rate').value),\n            court_fee:              parseNumber(document.getElementById('court-fee').value),\n            lawyer_fee:             parseNumber(document.getElementById('lawyer-fee').value),\n            installment_count:      parseInt(document.getElementById('installment-count').value),\n            default_interest_rate:  parseNumber(document.getElementById('default-interest-rate').value),\n            first_due_date:         dpGetValue('first-due-date'),\n            last_due_date:          dpGetValue('last-due-date') || null,\n            installment_1:          parseNumber(document.getElementById('installment-1').value),\n            installment_2:          parseNumber(document.getElementById('installment-2').value),\n            installment_3:          parseNumber(document.getElementById('installment-3').value),\n            installment_4:          parseNumber(document.getElementById('installment-4').value),\n        };\n\n        // Guard ฝั่ง FE: พิพากษาฝ่ายเดียวต้องส่งเป็น 1 งวดเสมอ\n        const activeJudgmentTypeForPayload = getActiveJudgmentType();\n        if (activeJudgmentTypeForPayload === 'พิพากษาฝ่ายเดียว') {\n            payload.installment_count = 1;\n            payload.installment_2 = 0;\n            payload.installment_3 = 0;\n            payload.installment_4 = 0;\n            payload.last_due_date = payload.first_due_date || payload.last_due_date;\n        }\n\n        // ถ้า case_status = ยื่นฟ้อง และเลือก judgment_type ให้เรียก PATCH /judgment\n        const judgmentType   = document.getElementById('judgment-type')?.value || ''\n        const isFilingStatus = currentCus && currentCus.case_status === 'ยื่นฟ้อง'\n\n        try {\n            let res, data\n            if (isFilingStatus && judgmentType) {\n                payload.judgment_type = judgmentType\n                res  = await fetch(`/api/customers/${accountNo}/judgment`, {\n                    method: 'PATCH',\n                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },\n                    body: JSON.stringify(payload)\n                })\n                data = await res.json().catch(() => ({}))\n                if (res.ok) {\n                    closeConfirmModal()\n                    previewDone = false\n                    setSubmitEnabled(false)\n                    showSuccessToast('บันทึกสำเร็จ', `บันทึกคำพิพากษาเรียบร้อย → ${judgmentType}`)\n                    await loadCustomerData()\n                    loadEditHistory()\n                } else {\n                    const message = data.error || data.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'\n                    showAlert('error', 'บันทึกไม่สำเร็จ', message)\n                    showError(message)\n                }\n            } else {\n                res  = await fetch(`/api/customers/${accountNo}`, {\n                    method: 'PUT',\n                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },\n                    body: JSON.stringify(payload)\n                })\n                data = await res.json().catch(() => ({}))\n                if (res.ok) {\n                    closeConfirmModal()\n                    previewDone = false\n                    setSubmitEnabled(false)\n                    showSuccessToast('บันทึกสำเร็จ', `อัพเดทข้อมูลเรียบร้อยแล้ว${data.changed_fields ? ` (${data.changed_fields} รายการ)` : ''}`)\n                    await loadCustomerData()\n                    loadEditHistory()\n                } else {\n                    const message = data.error || data.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'\n                    showAlert('error', 'บันทึกไม่สำเร็จ', message)\n                    showError(message)\n                }\n            }\n        } catch (err) {\n            console.error('[CustomerDetail] submit failed', err);\n            showAlert('error', 'บันทึกไม่สำเร็จ', 'ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');\n            showError('ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');\n        } finally {\n            setLoading(false);\n            setConfirmSubmitLoading(false);\n        }\n    }\n\n    function handleCancel() {\n        window.location.href = getSafeReturnTo('/customer-list');\n    }\n\n    async function handleLogout() {\n        const token = document.cookie.split('; ').find(r => r.startsWith('token='))?.split('=')[1] || '';\n        await fetch('/api/auth/logout', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });\n        document.cookie = 'token=; path=/; max-age=0';\n        sessionStorage.clear();\n        window.location.href = '/login';\n    }\n\n\n    // ---- Alert Modal ----\n    function showAlert(type, title, message) {\n        const iconWrap = document.getElementById('alert-icon-wrap');\n        const icon     = document.getElementById('alert-icon');\n        const configs  = {\n            warning: { bg: 'bg-amber-50', color: 'text-amber-500', icon: 'warning' },\n            error:   { bg: 'bg-red-50',   color: 'text-red-500',   icon: 'error' },\n            info:    { bg: 'bg-blue-50',  color: 'text-blue-500',  icon: 'info' },\n        };\n        const cfg = configs[type] || configs.info;\n        iconWrap.className = `w-16 h-16 rounded-full flex items-center justify-center mb-4 ${cfg.bg}`;\n        icon.className     = `material-symbols-outlined text-3xl ${cfg.color}`;\n        icon.style.fontVariationSettings = '\"FILL\" 1';\n        icon.textContent   = cfg.icon;\n        document.getElementById('alert-title').textContent   = title;\n        document.getElementById('alert-message').textContent = message;\n        document.getElementById('alert-modal').classList.remove('hidden');\n    }\n\n    function closeAlert() {\n        document.getElementById('alert-modal').classList.add('hidden');\n    }\n\n    // ---- Schedule Preview ----\n    let scheduleData    = { daily: [], monthly: [] };\n    let currentView     = 'monthly';\n    let previewDone = false;\n\n    function setSubmitEnabled(enabled) {\n        const btn = document.getElementById('submit-btn');\n        if (!btn) return;\n\n        const allowedByStatus = !currentCus || canEditJudgmentData(currentCus.case_status);\n        const finalEnabled = enabled && allowedByStatus;\n\n        btn.disabled = !finalEnabled;\n\n        if (finalEnabled) {\n            btn.classList.remove('opacity-50', 'cursor-not-allowed');\n            btn.classList.add('hover:bg-primary-dark');\n            btn.title = '';\n        } else {\n            btn.classList.add('opacity-50', 'cursor-not-allowed');\n            btn.classList.remove('hover:bg-primary-dark');\n\n            if (!allowedByStatus) {\n                btn.title = currentCus ? editPermissionMessage(currentCus.case_status) : 'ไม่มีสิทธิ์แก้ไขข้อมูล';\n            } else {\n                btn.title = 'กรุณากรอกข้อมูลให้ครบและกดพรีวิวก่อนบันทึก';\n            }\n        }\n    }\n\n    function parseNum(val) {\n        if (val === null || val === undefined || val === '') return 0;\n        return parseFloat(stripPercentSuffix(val).replace(/,/g, '')) || 0;\n    }\n\n    function getPreviewRequiredFields() {\n        const fields = [\n            { id: 'filing-date',       label: 'วันที่ยื่นฟ้อง' },\n            { id: 'red-case-no',       label: 'คดีหมายเลขแดงที่' },\n            { id: 'judgment-date',     label: 'วันที่พิพากษา' },\n            { id: 'total-debt',        label: 'ยอดหนี้รวม' },\n            { id: 'principal',         label: 'เงินต้น' },\n            { id: 'interest-rate',     label: 'อัตราดอกเบี้ย/ปี' },\n            { id: 'default-interest-rate', label: 'ดอกเบี้ยเมื่อผิดนัดชำระ (%)' },\n            { id: 'court-fee',         label: 'ค่าธรรมเนียมศาล' },\n            { id: 'lawyer-fee',        label: 'ค่าทนายความ' },\n            { id: 'installment-count', label: 'จำนวนงวดผ่อน' },\n            { id: 'first-due-date',    label: 'วันครบกำหนดงวดแรก' },\n            { id: 'installment-1',     label: 'ค่างวด งวดที่ 1' },\n        ];\n\n        if (currentCus && currentCus.case_status === 'ยื่นฟ้อง') {\n            fields.unshift({ id: 'judgment-type', label: 'ประเภทคำพิพากษา' });\n        }\n\n        return fields;\n    }\n\n    function isBlankOrZeroPreviewValue(id, value) {\n        const raw = stripPercentSuffix(value).replace(/,/g, '').trim();\n\n        if (raw === '') return true;\n\n        if (id === 'filing-date' || id === 'red-case-no' || id === 'judgment-date' || id === 'first-due-date' || id === 'judgment-type') {\n            return false;\n        }\n\n        const num = Number(raw);\n        if (ZERO_REQUIRED_FIELD_IDS.has(id)) {\n            return Number.isNaN(num);\n        }\n        return Number.isNaN(num) || num <= 0;\n    }\n\n    function validateInterestPairForPreview(showErrorMessage = false) {\n        // ชื่อ function เดิมยังคงไว้เพื่อไม่กระทบ flow เดิม\n        // Requirement ใหม่: ทั้งสองช่องต้องมีค่า ถ้าไม่มีให้ใส่ 0 และห้ามเกิน 24%\n        normalizeRequiredZeroFields();\n        return validateBusinessRules(showErrorMessage);\n    }\n\n    function canAutoPreviewExistingData() {\n        normalizeRequiredZeroFields();\n        const requiredFields = getPreviewRequiredFields();\n\n        const hasMissingRequired = requiredFields.some(f => {\n            const el = document.getElementById(f.id);\n            if (!el) return false;\n\n            const value = String(el.value || '').trim();\n            return isBlankOrZeroPreviewValue(f.id, value);\n        });\n\n        if (hasMissingRequired) return false;\n\n        return validateBusinessRules(false);\n    }\n\n    function isPreviewFormReady(showErrorMessage = false) {\n        normalizeRequiredZeroFields();\n        document.querySelectorAll('.form-input-styled, .dp-input').forEach(el => {\n            el.classList.remove('error');\n        });\n\n        const jtTrigger = document.getElementById('jt-trigger');\n        if (jtTrigger) {\n            jtTrigger.classList.remove('border-red-400', 'bg-red-50', 'ring-4', 'ring-red-400/10');\n        }\n\n        const missing = getPreviewRequiredFields().filter(f => {\n            const el = document.getElementById(f.id);\n            if (!el) return false;\n\n            const value = String(el.value || '').trim();\n            const invalid = isBlankOrZeroPreviewValue(f.id, value);\n\n            if (invalid) {\n                el.classList.add('error');\n\n                const dpDisplay = document.getElementById('dp-display-' + f.id);\n                if (dpDisplay) dpDisplay.classList.add('error');\n\n                // judgment-type เป็น hidden input ต้อง highlight ปุ่ม dropdown แทน\n                if (f.id === 'judgment-type') {\n                    const trigger = document.getElementById('jt-trigger');\n                    if (trigger) {\n                        trigger.classList.add('border-red-400', 'bg-red-50', 'ring-4', 'ring-red-400/10');\n                    }\n                }\n            }\n\n            return invalid;\n        });\n\n        if (missing.length > 0) {\n            if (showErrorMessage) {\n                showAlert(\n                    'warning',\n                    'กรุณากรอกข้อมูลให้ครบ',\n                    'กรุณากรอกข้อมูลที่จำเป็นก่อนกดพรีวิว ได้แก่ ' + missing.map(f => f.label).join(', ')\n                );\n            }\n            return false;\n        }\n\n        const redCaseEl = document.getElementById('red-case-no');\n        if (redCaseEl) {\n            const redCaseValue = normalizeCaseNo(redCaseEl.value);\n            if (!isValidCaseNo(redCaseValue)) {\n                redCaseEl.classList.add('error');\n                showFieldWarn('red-case-no', 'รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567');\n                if (showErrorMessage) {\n                    showAlert('warning', 'กรุณากรอกข้อมูลให้ถูกต้อง', 'คดีหมายเลขแดงที่ต้องอยู่ในรูปแบบที่กำหนด');\n                }\n                return false;\n            }\n        }\n\n        const judgmentNoteEl = document.getElementById('judgment-note');\n        if (judgmentNoteEl && judgmentNoteEl.value.trim().length > 100) {\n            judgmentNoteEl.classList.add('error');\n            if (showErrorMessage) {\n                showAlert('warning', 'กรุณากรอกข้อมูลให้ถูกต้อง', 'หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร');\n            }\n            return false;\n        }\n\n        if (!validateBusinessRules(showErrorMessage)) {\n            return false;\n        }\n\n        return true;\n    }\n\n    function hasChanged() {\n        if (!originalData) return false;\n        const cur = {\n            filing_date:           document.getElementById('filing-date').value          || '',\n            filing_capital:        parseNum(document.getElementById('filing-capital')?.value || '0'),\n            red_case_no:           document.getElementById('red-case-no').disabled && originalData?.red_case_no\n                ? originalData.red_case_no\n                : normalizeCaseNo(document.getElementById('red-case-no').value),\n            judgment_date:         document.getElementById('judgment-date').value         || '',\n            judgment_note:         document.getElementById('judgment-note').value.trim(),\n            first_due_date:        document.getElementById('first-due-date').value        || '',\n            total_debt:            parseNum(document.getElementById('total-debt').value),\n            principal:             parseNum(document.getElementById('principal').value),\n            interest_rate:         parseNum(document.getElementById('interest-rate').value),\n            court_fee:             parseNum(document.getElementById('court-fee').value),\n            lawyer_fee:            parseNum(document.getElementById('lawyer-fee').value),\n            installment_count:     parseNum(document.getElementById('installment-count').value),\n            default_interest_rate: parseNum(document.getElementById('default-interest-rate').value),\n            installment_1:         parseNum(document.getElementById('installment-1').value),\n            installment_2:         parseNum(document.getElementById('installment-2').value),\n            installment_3:         parseNum(document.getElementById('installment-3').value),\n            installment_4:         parseNum(document.getElementById('installment-4').value),\n        };\n        return Object.keys(originalData).some(k => {\n            if (typeof originalData[k] === 'number') return Math.abs((cur[k]||0) - originalData[k]) > 0.001;\n            return cur[k] !== originalData[k];\n        });\n    }\n\n    function onInputChanged() {\n        previewDone = false;\n\n        if (currentCus && !canEditJudgmentData(currentCus.case_status)) {\n            setSubmitEnabled(false);\n            const wrap = document.getElementById('preview-stale-warn');\n            if (wrap) wrap.classList.add('hidden');\n            return;\n        }\n\n        const wrap = document.getElementById('preview-stale-warn');\n        if (wrap) {\n            if (hasChanged()) wrap.classList.remove('hidden');\n            else wrap.classList.add('hidden');\n        }\n\n        // ทุกครั้งที่มีการแก้ไข ต้องบังคับให้กดพรีวิวใหม่ก่อน\n        setSubmitEnabled(false);\n    }\n\n    function fmtAccNo(n) { if (!n || n.length !== 12) return n || '-'; return `${n.slice(0,4)}-${n.slice(4,8)}-${n.slice(8,12)}`; }\n    function fmt(n) {\n        return Number(n).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n    }\n\n    function fmtDate(d) {\n        if (!d) return '-';\n        const [y, m, day] = d.split('-');\n        return `${day}/${m}/${y}`;\n    }\n\n    const SCHEDULE_PAGE_SIZE = 20;\n    let   schedulePage = 1;\n\n    function switchView(view) {\n        currentView  = view;\n        schedulePage = 1;\n        document.getElementById('view-monthly-btn').className = view === 'monthly'\n            ? 'px-3 py-1 rounded text-[12px] font-bold transition-all bg-white text-primary shadow-sm'\n            : 'px-3 py-1 rounded text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700';\n        document.getElementById('view-daily-btn').className = view === 'daily'\n            ? 'px-3 py-1 rounded text-[12px] font-bold transition-all bg-white text-primary shadow-sm'\n            : 'px-3 py-1 rounded text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700';\n        renderSchedule();\n    }\n\n    function changeSchedulePage(page) {\n        schedulePage = page;\n        renderSchedule();\n        document.getElementById('schedule-table-wrap').scrollTop = 0;\n    }\n\n    function renderSchedulePagination(total, page) {\n        const totalPages = Math.ceil(total / SCHEDULE_PAGE_SIZE);\n        const container  = document.getElementById('schedule-pagination');\n        if (!container) return;\n        if (totalPages <= 1) { container.innerHTML = ''; return; }\n\n        let html = `<button onclick=\"changeSchedulePage(${page-1})\" ${page===1?'disabled':''} class=\"p-1 rounded border border-slate-100 hover:bg-white transition-all disabled:opacity-30 text-slate-400\"><span class=\"material-symbols-outlined text-sm\">chevron_left</span></button><div class=\"flex gap-1\">`;\n        for (let i = 1; i <= totalPages; i++) {\n            if (i===1 || i===totalPages || (i>=page-1 && i<=page+1)) {\n                html += `<button onclick=\"changeSchedulePage(${i})\" class=\"w-6 h-6 rounded text-[10px] transition-all ${i===page?'bg-primary text-white':'hover:bg-white text-slate-400'}\">${i}</button>`;\n            } else if (i===2 || i===totalPages-1) {\n                html += `<span class=\"w-6 h-6 flex items-center justify-center text-[10px] text-slate-200\">…</span>`;\n            }\n        }\n        html += `</div><button onclick=\"changeSchedulePage(${page+1})\" ${page===totalPages?'disabled':''} class=\"p-1 rounded border border-slate-100 hover:bg-white transition-all disabled:opacity-30 text-slate-400\"><span class=\"material-symbols-outlined text-sm\">chevron_right</span></button>`;\n        container.innerHTML = html;\n    }\n\n    function renderSchedule() {\n        const allRows = currentView === 'monthly' ? scheduleData.monthly : scheduleData.daily;\n        const isDaily = currentView === 'daily';\n\n        let rows;\n        if (isDaily) {\n            const start = (schedulePage - 1) * SCHEDULE_PAGE_SIZE;\n            rows = allRows.slice(start, start + SCHEDULE_PAGE_SIZE);\n        } else {\n            rows = allRows;\n        }\n\n        const tbody = document.getElementById('schedule-tbody');\n        tbody.innerHTML = rows.map(r => {\n            const isPayment    = r.is_payment_date;\n            const isEarlyClose = r.is_early_close;\n            const rowClass     = isEarlyClose\n                ? 'bg-emerald-50 font-semibold border-l-4 border-emerald-400'\n                : isPayment\n                    ? 'bg-yellow-50 font-semibold'\n                    : 'hover:bg-blue-50/20 transition-colors';\n            return `<tr class=\"${rowClass}\">\n                <td class=\"py-2 px-4 text-slate-700\">${fmtDate(r.date)}</td>\n                <td class=\"py-2 px-4 text-slate-400 text-center font-bold\">${String(r.term).padStart(2,'0')}</td>\n                <td class=\"py-2 px-4 text-right text-slate-600\">${fmt(r.principal_bf)}</td>\n                <td class=\"py-2 px-4 text-right text-primary font-bold\">${r.payment > 0 ? fmt(r.payment) : '-'}</td>\n                <td class=\"py-2 px-4 text-right text-emerald-600\">${r.interest_paid > 0 ? fmt(r.interest_paid) : '-'}</td>\n                <td class=\"py-2 px-4 text-right text-indigo-600\">${r.principal_paid > 0 ? fmt(r.principal_paid) : '-'}</td>\n                <td class=\"py-2 px-4 text-right text-slate-400\">${fmt(r.other_paid)}</td>\n                <td class=\"py-2 px-4 text-right text-slate-800 font-bold\">${fmt(r.principal_bal)}</td>\n                <td class=\"py-2 px-4 text-right text-slate-400\">${Number(r.daily_interest).toFixed(2)}</td>\n                <td class=\"py-2 px-4 text-right text-slate-500\">${fmt(r.acc_interest)}</td>\n            </tr>`;\n        }).join('');\n\n        const infoText = document.getElementById('schedule-info-text');\n        const infoEl   = document.getElementById('schedule-info');\n        if (infoText) {\n            if (isDaily) {\n                const start = (schedulePage - 1) * SCHEDULE_PAGE_SIZE;\n                infoText.textContent = `แสดง ${start+1}–${Math.min(start+SCHEDULE_PAGE_SIZE, allRows.length)} จาก ${allRows.length} รายการ (รายวัน)`;\n                renderSchedulePagination(allRows.length, schedulePage);\n            } else {\n                infoText.textContent = `แสดง ${allRows.length} รายการ (รายเดือน)`;\n                const pg = document.getElementById('schedule-pagination');\n                if (pg) pg.innerHTML = '';\n            }\n        } else if (infoEl) {\n            infoEl.textContent = `แสดง ${rows.length} รายการ (${currentView === 'monthly' ? 'รายเดือน' : 'รายวัน'})`;\n        }\n    }\n\n    async function loadPreview() {\n        const previewBtn = document.getElementById('preview-btn');\n        const isManualPreview = previewBtn?.dataset.manual === 'true';\n\n        normalizeRequiredZeroFields();\n\n        if (!isPreviewFormReady(isManualPreview)) {\n            document.getElementById('schedule-loading').classList.add('hidden');\n            document.getElementById('schedule-placeholder').classList.remove('hidden');\n\n            previewDone = false;\n            setSubmitEnabled(false);\n\n            return;\n        }\n\n        const filingDate = dpGetValue('filing-date');\n        const principal  = document.getElementById('principal').value;\n        const intRate    = document.getElementById('interest-rate').value;\n        const previewJudgmentType = getActiveJudgmentType();\n        const isDefaultJudgmentPreview = previewJudgmentType === 'พิพากษาฝ่ายเดียว';\n        const instCount  = isDefaultJudgmentPreview ? '1' : document.getElementById('installment-count').value;\n        const firstDue   = dpGetValue('first-due-date');\n        const inst1      = document.getElementById('installment-1').value;\n\n        document.getElementById('schedule-placeholder').classList.add('hidden');\n        document.getElementById('schedule-table-wrap').classList.add('hidden');\n        document.getElementById('schedule-info').classList.add('hidden');\n        document.getElementById('schedule-loading').classList.remove('hidden');\n\n        const courtFee  = parseFloat(document.getElementById('court-fee').value) || 0;\n        const lawyerFee = parseFloat(document.getElementById('lawyer-fee').value) || 0;\n\n        try {\n            const res  = await fetch('/api/schedule/preview', {\n                method: 'POST',\n                headers: { 'Content-Type': 'application/json' },\n                body: JSON.stringify({\n                    filing_date:       filingDate,\n                    principal:         parseNumber(principal),\n                    interest_rate:     parseNumber(intRate),\n                    installment_count: parseInt(instCount),\n                    diff_debt:         parseNumber(document.getElementById('diff-debt').value),\n                    first_due_date:    firstDue,\n                    installment_1:     parseNumber(inst1),\n                    installment_2:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-2').value),\n                    installment_3:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-3').value),\n                    installment_4:     isDefaultJudgmentPreview ? 0 : parseNumber(document.getElementById('installment-4').value),\n                })\n            });\n\n            const data = await res.json();\n            document.getElementById('schedule-loading').classList.add('hidden');\n\n            if (res.ok) {\n                scheduleData = data;\n                document.getElementById('schedule-table-wrap').classList.remove('hidden');\n                document.getElementById('schedule-info').classList.remove('hidden');\n\n                const warn = document.getElementById('preview-stale-warn');\n                if (warn) warn.classList.add('hidden');\n\n                renderSchedule();\n\n                previewDone = !!isManualPreview;\n\n                // เปิดปุ่มบันทึกได้เฉพาะ manual preview สำเร็จ + มีการแก้ไขจริง + ข้อมูลครบ\n                setSubmitEnabled(isManualPreview && hasChanged() && isPreviewFormReady(false));\n\n                document.getElementById('preview-btn').dataset.manual = 'false';\n            } else {\n                previewDone = false;\n                setSubmitEnabled(false);\n\n                document.getElementById('schedule-placeholder').classList.remove('hidden');\n                showAlert('error', 'เกิดข้อผิดพลาด', data.error || 'ไม่สามารถคำนวณได้ กรุณาตรวจสอบข้อมูล');\n            }\n        } catch (err) {\n            previewDone = false;\n            setSubmitEnabled(false);\n\n            document.getElementById('schedule-loading').classList.add('hidden');\n            document.getElementById('schedule-placeholder').classList.remove('hidden');\n            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้ กรุณาลองใหม่อีกครั้ง');\n        }\n    }\n\n    // ผูก event กับทุก input field\n    const previewFields = ['filing-date','red-case-no','judgment-date','judgment-note','total-debt','principal','interest-rate','default-interest-rate','court-fee','lawyer-fee','installment-count',\n                           'first-due-date','installment-1','installment-2',\n                           'installment-3','installment-4'];\n    previewFields.forEach(id => {\n        const el = document.getElementById(id);\n        if (!el) return;\n        el.addEventListener('input',  onInputChanged);\n        el.addEventListener('change', onInputChanged);\n    });\n\n\n\n    // ---- Account No events ----\n    const accountEl = document.getElementById('account-no');\n    accountEl.addEventListener('keydown', handleAccountNoKeydown);\n    accountEl.addEventListener('input',   handleAccountNoInput);\n    accountEl.addEventListener('blur',    handleAccountNoBlur);\n\n    // ---- Customer Name events ----\n    document.getElementById('customer-name').addEventListener('input', handleCustomerNameInput);\n    document.getElementById('customer-name').addEventListener('blur',  handleCustomerNameBlur);\n\n    document.getElementById('red-case-no').addEventListener('input', () => { handleRedCaseNoInput(); onInputChanged(); });\n    document.getElementById('red-case-no').addEventListener('blur', () => {\n        const el = document.getElementById('red-case-no');\n        el.value = normalizeCaseNo(el.value);\n        handleRedCaseNoInput();\n        onInputChanged();\n    });\n    document.getElementById('judgment-note').addEventListener('input', function() {\n        document.getElementById('judgment-note-counter').textContent = String(this.value.length);\n        onInputChanged();\n    });\n\n    // ---- Money fields ----\n    ['total-debt', 'principal', 'court-fee', 'lawyer-fee'].forEach(id => {\n        const el = document.getElementById(id);\n        el.addEventListener('input',  () => {\n            handleMoneyInput(id);\n            calculateDiff();\n            onInputChanged();\n        });\n        el.addEventListener('blur',   () => {\n            handleMoneyBlur(id);\n            calculateDiff();\n\n            // Validate ยอดหนี้รวมทันทีหลังออกจากช่อง\n            // เพื่อดักทั้งตัวอักษร และยอดที่เกินทุนทรัพย์ที่ฟ้อง โดยไม่ต้องรอกด Preview\n            if (id === 'total-debt') {\n                validateBusinessRules(false);\n            }\n\n            onInputChanged();\n        });\n    });\n\n    // ---- Installment fields ----\n    [1, 2, 3, 4].forEach(i => {\n        const id = 'installment-' + i;\n        const el = document.getElementById(id);\n        el.addEventListener('input', () => { handleMoneyInput(id); onInputChanged(); });\n        el.addEventListener('blur',  () => { handleMoneyBlur(id); onInputChanged(); });\n    });\n\n    // ---- Interest rate ----\n    document.getElementById('interest-rate').addEventListener('focus', () => { stripRateDisplaySuffix('interest-rate'); });\n    document.getElementById('interest-rate').addEventListener('input', () => { handleInterestInput(); calculateDiff(); onInputChanged(); });\n    document.getElementById('interest-rate').addEventListener('blur',  () => { handleInterestBlur(); calculateDiff(); onInputChanged(); });\n\n    // ---- Default interest rate ----\n    document.getElementById('default-interest-rate').addEventListener('focus', () => { stripRateDisplaySuffix('default-interest-rate'); });\n    document.getElementById('default-interest-rate').addEventListener('input', () => { handleDefaultInterestInput(); onInputChanged(); });\n    document.getElementById('default-interest-rate').addEventListener('blur',  () => { handleDefaultInterestBlur(); onInputChanged(); });\n\n    // ---- Installment count ----\n    document.getElementById('installment-count').addEventListener('input', () => { handleInstallmentCountInput(); calculateLastDueDate(); onInputChanged(); });\n\n    // ---- Date constraints ----\ndocument.getElementById('filing-date').addEventListener('change', () => { updateDateConstraints(); onInputChanged(); });\ndocument.getElementById('judgment-date').addEventListener('change', () => { updateDateConstraints(); validateBusinessRules(false); onInputChanged(); });\ndocument.getElementById('first-due-date').addEventListener('change', () => { calculateLastDueDate(); validateBusinessRules(false); onInputChanged(); });\n\n    // ---- Friendly input focus UX ----\n    // ต้องเรียกหลังจากผูก blur/input handler เดิมแล้ว\n    // เพื่อให้ logic format เดิมยังทำงานปกติ\n    setupFriendlyInputFocus();\n\n\n    // ============================================================\n    // Custom Date Picker Engine\n    // ============================================================\n    const DP_FIELDS   = ['filing-date', 'judgment-date', 'first-due-date', 'last-due-date', 'enf-judgment-date'];\n    const DP_STATE    = {};\n    const TH_MONTHS   = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',\n                         'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];\n\n    DP_FIELDS.forEach(id => {\n        const now = new Date();\n        DP_STATE[id] = { year: now.getFullYear(), month: now.getMonth(), selected: null, minDate: null, maxDate: null, showMY: false };\n    });\n    DP_STATE['enf-judgment-date'].maxDate = dpDateStr(new Date());\n\n    function dpGetValue(id) {\n        return document.getElementById(id).value;\n    }\n\n    function dpSetValue(id, dateStr) {\n        document.getElementById(id).value = dateStr;\n    }\n\n    function dpFormatDisplay(dateStr) {\n        if (!dateStr) return null;\n        const [y, m, d] = dateStr.split('-').map(Number);\n        return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;\n    }\n\n    function dpOpen(id) {\n        const state = DP_STATE[id];\n        const val   = dpGetValue(id);\n        if (val) {\n            const [y,m] = val.split('-').map(Number);\n            state.year  = y;\n            state.month = m - 1;\n        }\n        DP_FIELDS.forEach(f => { if (f !== id) dpClose(f); });\n        dpRender(id);\n\n        const popup   = document.getElementById('dp-popup-' + id);\n        const display = document.getElementById('dp-display-' + id);\n        popup.classList.add('open');\n        display.classList.add('open');\n\n        // คำนวณ position แบบ fixed โดยไม่ให้ปฏิทินยืดตามความกว้างของ field\n        const rect    = display.getBoundingClientRect();\n        const popupW  = Math.min(320, window.innerWidth - 32);\n        const popupH  = 350;\n        const spaceBelow = window.innerHeight - rect.bottom;\n        if (spaceBelow < popupH && rect.top > popupH) {\n            popup.style.top  = (rect.top - popupH - 6) + 'px';\n        } else {\n            popup.style.top  = (rect.bottom + 6) + 'px';\n        }\n        popup.style.width = popupW + 'px';\n        popup.style.left  = Math.min(Math.max(rect.left, 16), window.innerWidth - popupW - 16) + 'px';\n    }\n\n    function dpClose(id) {\n        document.getElementById('dp-popup-' + id)?.classList.remove('open');\n        document.getElementById('dp-display-' + id)?.classList.remove('open');\n        DP_STATE[id].showMY = false;\n    }\n\n    function dpToggleMyPicker(id) {\n        const state = DP_STATE[id];\n        state.showMY = !state.showMY;\n        dpRender(id);\n    }\n\n    function dpNavMonth(id, delta) {\n        const s = DP_STATE[id];\n        s.month += delta;\n        if (s.month > 11) { s.month = 0; s.year++; }\n        if (s.month < 0)  { s.month = 11; s.year--; }\n        dpRender(id);\n    }\n\n    function dpNavYear(id, delta) {\n        DP_STATE[id].year += delta;\n        dpRender(id);\n    }\n\n    function dpRender(id) {\n        const s       = DP_STATE[id];\n        const titleEl = document.getElementById('dp-title-' + id);\n        titleEl.textContent = TH_MONTHS[s.month] + ' ' + (s.year + 543);\n\n        if (s.showMY) {\n            document.getElementById('dp-cal-' + id).classList.add('hidden');\n            document.getElementById('dp-my-' + id).classList.remove('hidden');\n            document.getElementById('dp-year-label-' + id).textContent = 'พ.ศ. ' + (s.year + 543);\n            dpRenderMonths(id);\n        } else {\n            document.getElementById('dp-cal-' + id).classList.remove('hidden');\n            document.getElementById('dp-my-' + id).classList.add('hidden');\n            dpRenderDays(id);\n        }\n    }\n\n    function dpRenderMonths(id) {\n        const s   = DP_STATE[id];\n        const el  = document.getElementById('dp-months-' + id);\n        el.innerHTML = TH_MONTHS.map((m, i) => {\n            const cls = i === s.month ? 'dp-my-item active' : 'dp-my-item';\n            return `<div class=\"${cls}\" onclick=\"dpSelectMonth('${id}',${i})\">${window.LQDThaiDate.shortMonth(i)}</div>`;\n        }).join('');\n    }\n\n    function dpSelectMonth(id, month) {\n        DP_STATE[id].month  = month;\n        DP_STATE[id].showMY = false;\n        dpRender(id);\n    }\n\n    function dpRenderDays(id) {\n        const s        = DP_STATE[id];\n        const el       = document.getElementById('dp-days-' + id);\n        const today    = new Date();\n        today.setHours(0,0,0,0);\n        const minDate  = s.minDate ? new Date(s.minDate + 'T00:00:00') : null;\n        const maxDate  = s.maxDate ? new Date(s.maxDate + 'T00:00:00') : null;\n        const first    = new Date(s.year, s.month, 1);\n        const last     = new Date(s.year, s.month + 1, 0);\n        const startDay = first.getDay();\n        const selStr   = dpGetValue(id);\n\n        let html = '';\n\n        for (let i = 0; i < startDay; i++) {\n            const d   = new Date(s.year, s.month, -startDay + i + 1);\n            const str = dpDateStr(d);\n            html += `<div class=\"dp-day dp-day-other\">${d.getDate()}</div>`;\n        }\n\n        for (let d = 1; d <= last.getDate(); d++) {\n            const date    = new Date(s.year, s.month, d);\n            const str     = dpDateStr(date);\n            const isToday = date.getTime() === today.getTime();\n            const isSel   = str === selStr;\n            const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);\n            let cls = 'dp-day';\n            if (isDisabled) cls += ' dp-day-disabled';\n            else if (isSel) cls += ' dp-day-selected';\n            else if (isToday) cls += ' dp-day-today';\n            html += `<div class=\"${cls}\" onclick=\"dpSelectDay('${id}','${str}')\">${d}</div>`;\n        }\n\n        const totalCells = startDay + last.getDate();\n        const trailingCells = Math.max(0, 42 - totalCells);\n        for (let i = 1; i <= trailingCells; i++) {\n            html += `<div class=\"dp-day dp-day-other\">${i}</div>`;\n        }\n\n        el.innerHTML = html;\n    }\n\n    function dpDateStr(date) {\n        const y = date.getFullYear();\n        const m = String(date.getMonth() + 1).padStart(2,'0');\n        const d = String(date.getDate()).padStart(2,'0');\n        return `${y}-${m}-${d}`;\n    }\n\n    function dpSelectDay(id, dateStr) {\n        const state = DP_STATE[id];\n        if ((state.minDate && dateStr < state.minDate) || (state.maxDate && dateStr > state.maxDate)) return;\n\n        dpSetValue(id, dateStr);\n        const disp = document.getElementById('dp-text-' + id);\n        disp.textContent = dpFormatDisplay(dateStr);\n        disp.classList.remove('text-slate-400');\n        disp.classList.add('text-slate-800');\n        dpClose(id);\n        dpAfterSelect(id);\n    }\n\n    function dpClear(id) {\n        dpSetValue(id, '');\n        const disp = document.getElementById('dp-text-' + id);\n        const placeholders = {\n            'filing-date':       'เลือกวันที่ยื่นฟ้อง',\n            'judgment-date':     'เลือกวันที่พิพากษา',\n            'first-due-date':    'เลือกวันครบกำหนดงวดแรก',\n            'last-due-date':     'คำนวณอัตโนมัติ',\n            'enf-judgment-date': 'เลือกวันที่',\n        };\n        disp.textContent = placeholders[id] || 'เลือกวันที่';\n        disp.classList.add('text-slate-400');\n        disp.classList.remove('text-slate-800');\n        dpClose(id);\n        dpAfterSelect(id);\n    }\n\n    function dpSelectToday(id) {\n        const today = new Date();\n        const str   = dpDateStr(today);\n        const state = DP_STATE[id];\n        if (state.minDate && str < state.minDate) return;\n        if (state.maxDate && str > state.maxDate) return;\n        dpSelectDay(id, str);\n    }\n\n    function dpSetMin(id, minDateStr) {\n        DP_STATE[id].minDate = minDateStr;\n        const cur = dpGetValue(id);\n        if (cur && cur < minDateStr) { dpClear(id); }\n    }\n\n    function dpSetMax(id, maxDateStr) {\n        DP_STATE[id].maxDate = maxDateStr;\n        const cur = dpGetValue(id);\n        if (cur && cur > maxDateStr) { dpClear(id); }\n    }\n\n    function dpAfterSelect(id) {\n        if (id === 'filing-date') {\n            const val = dpGetValue('filing-date');\n            if (val) dpSetMin('judgment-date', val);\n            updateDateConstraints();\n            onInputChanged();\n        } else if (id === 'judgment-date') {\n            updateDateConstraints();\n            validateBusinessRules(false);\n            onInputChanged();\n        } else if (id === 'first-due-date') {\n            calculateLastDueDate();\n            validateBusinessRules(false);\n            onInputChanged();\n        }\n    }\n\n    document.addEventListener('click', function(e) {\n        DP_FIELDS.forEach(id => {\n            const wrap = document.getElementById('dp-wrap-' + id);\n            if (wrap && !wrap.contains(e.target)) dpClose(id);\n        });\n    });\n\n    async function loadEditHistory() {\n        const body = document.getElementById('edit-history-body');\n        if (!body) return;\n        try {\n            const res  = await fetch(`/api/customers/${accountNo}/edits`);\n            const data = await res.json();\n            if (!data.edits || data.edits.length === 0) {\n                body.innerHTML = '<p class=\"text-slate-400 text-sm text-center py-4\">ไม่มีประวัติการแก้ไข</p>';\n                return;\n            }\n            body.innerHTML = data.edits.map(e => {\n                const changes = Object.values(e.changes).map(c =>\n                    `<span class=\"inline-flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded px-2 py-0.5\">\n                        <span class=\"font-bold text-slate-600\">${c.label}</span>\n                        <span class=\"text-slate-400\">${c.from ?? '-'} → ${c.to ?? '-'}</span>\n                    </span>`\n                ).join(' ');\n                const dtLocal = (() => {\n                    try {\n                        const d = new Date(e.edited_at.replace(' ', 'T') + 'Z');\n                        const day  = String(d.getDate()).padStart(2,'0');\n                        const mon  = String(d.getMonth()+1).padStart(2,'0');\n                        const year = d.getFullYear() + 543;\n                        const hh   = String(d.getHours()).padStart(2,'0');\n                        const mm   = String(d.getMinutes()).padStart(2,'0');\n                        return `${day}/${mon}/${year} ${hh}:${mm}`;\n                    } catch(e) { return ''; }\n                })();\n                return `<div class=\"py-3 border-b border-slate-50 last:border-0\">\n                    <div class=\"flex items-center gap-2 mb-1.5\">\n                        <span class=\"w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary\">${(e.edited_by_name||'?').charAt(0)}</span>\n                        <span class=\"text-xs font-bold text-slate-700\">${e.edited_by_name || 'ไม่ทราบ'}</span>\n                        <span class=\"text-[11px] text-slate-400\">${dtLocal}</span>\n                    </div>\n                    <div class=\"flex flex-wrap gap-1.5 ml-8\">${changes}</div>\n                </div>`;\n            }).join('');\n        } catch(e) {\n            body.innerHTML = '<p class=\"text-slate-400 text-sm text-center py-4\">ไม่สามารถโหลดประวัติได้</p>';\n        }\n    }\n\n    // ============================================================\n    // Case Status Logic\n    // ============================================================\n\n    let currentCus  = null\n    let currentSnap = null\n\n    const CASE_BADGE_STYLES = {\n        'ยื่นฟ้อง':          'bg-blue-50 text-blue-700 border-blue-200',\n        'พิพากษาตามยอม':    'bg-green-50 text-green-700 border-green-200',\n        'พิพากษาฝ่ายเดียว': 'bg-orange-50 text-orange-700 border-orange-200',\n        'บังคับคดี':         'bg-red-50 text-red-700 border-red-200',\n        'ปิดบัญชี':          'bg-gray-100 text-gray-500 border-gray-200',\n    }\n\n    const FLOW_A = ['ยื่นฟ้อง', 'พิพากษาตามยอม', 'บังคับคดี', 'ปิดบัญชี']\n    const FLOW_B = ['ยื่นฟ้อง', 'พิพากษาฝ่ายเดียว', 'บังคับคดี', 'ปิดบัญชี']\n\n    function renderProgressBar(caseStatus, statusLogs) {\n        const container = document.getElementById('progress-steps')\n        if (!container) return\n\n        // ใช้ status log เป็นแหล่งอ้างอิงหลักว่าเคยผ่านสถานะไหนจริง\n        // สำคัญมากสำหรับเคสที่ \"ปิดบัญชี\" โดยไม่เคย \"บังคับคดี\"\n        const visitedStatuses = new Set()\n        const logs = Array.isArray(statusLogs) ? statusLogs : []\n\n        logs.forEach(log => {\n            if (log.from_status) visitedStatuses.add(log.from_status)\n            if (log.to_status)   visitedStatuses.add(log.to_status)\n        })\n        if (caseStatus) visitedStatuses.add(caseStatus)\n\n        // เลือก flow จากประวัติจริงก่อน ไม่ใช้ caseStatus อย่างเดียว\n        // เพราะถ้า caseStatus = \"ปิดบัญชี\" จะดูไม่ออกว่าเคยเป็น\n        // \"พิพากษาตามยอม\" หรือ \"พิพากษาฝ่ายเดียว\" ถ้าไม่ดู log\n        let flow = FLOW_A\n        if (visitedStatuses.has('พิพากษาฝ่ายเดียว') || caseStatus === 'พิพากษาฝ่ายเดียว') {\n            flow = FLOW_B\n        } else if (visitedStatuses.has('พิพากษาตามยอม') || caseStatus === 'พิพากษาตามยอม') {\n            flow = FLOW_A\n        }\n\n        // ถ้าเป็นข้อมูลเก่าที่ไม่มี log เลย และสถานะปัจจุบันเป็น ปิดบัญชี\n        // จะไม่เดาเองว่าเคยผ่าน บังคับคดี เพื่อป้องกันการติ๊กถูกผิด\n        const hasRealLogs = logs.length > 0\n        if (!hasRealLogs && caseStatus === 'ปิดบัญชี') {\n            visitedStatuses.clear()\n            visitedStatuses.add('ปิดบัญชี')\n        }\n\n        let dotsRow   = ''\n        let labelsRow = ''\n\n        flow.forEach((step, i) => {\n            const isActive = step === caseStatus\n            const isDone   = !isActive && visitedStatuses.has(step)\n\n            let displayLabel = step\n            if (caseStatus === 'ยื่นฟ้อง' && i === 1) displayLabel = 'พิพากษา...'\n\n            let dot = ''\n            if (isDone) {\n                dot = `<div class=\"pb-dot-done\">\n                    <span class=\"material-symbols-outlined\" style=\"font-size:13px;color:#2563eb;font-variation-settings:'FILL' 1\">check</span>\n                </div>`\n            } else if (isActive) {\n                dot = `<div class=\"pb-dot-active\"><div class=\"pb-dot-active-inner\"></div></div>`\n            } else {\n                dot = `<div class=\"pb-dot-pending\"></div>`\n            }\n            dotsRow += dot\n\n            if (i < flow.length - 1) {\n                const nextStep = flow[i + 1]\n\n                // เส้น connector ให้แสดงเป็นเส้นทางความคืบหน้าไปจนถึงสถานะปัจจุบัน\n                // แต่ตัววงกลมยังอ้างอิงจาก visitedStatuses ตาม log จริงเท่านั้น\n                // ตัวอย่าง:\n                // ยื่นฟ้อง -> พิพากษาฝ่ายเดียว -> ปิดบัญชี\n                // เส้นจะลากผ่าน \"บังคับคดี\" เป็นสีขาว แต่ dot บังคับคดีจะยังว่าง\n                const currentIndex = flow.indexOf(caseStatus)\n                const lineFilled = currentIndex > -1 && i < currentIndex\n\n                dotsRow += `<div class=\"pb-line\">\n                    <div class=\"pb-line-fill ${lineFilled ? 'pb-line-fill-done' : 'pb-line-fill-none'}\"></div>\n                </div>`\n            }\n\n            const labelClass = isActive ? 'pb-label-active' : isDone ? 'pb-label-done' : 'pb-label-pending'\n            labelsRow += `<div class=\"pb-label-col\" style=\"width:24px\"><span class=\"${labelClass}\">${displayLabel}</span></div>`\n            if (i < flow.length - 1) {\n                labelsRow += `<div class=\"pb-label-spacer\"></div>`\n            }\n        })\n\n        container.innerHTML = `\n            <div class=\"pb-track\" style=\"min-width:300px\">\n                <div class=\"pb-dots-row\">${dotsRow}</div>\n                <div class=\"pb-labels-row\">${labelsRow}</div>\n            </div>`\n    }\n\n    async function loadStatusLogs() {\n        const body = document.getElementById('status-logs-body')\n        if (!body) return []\n        try {\n            const res  = await fetch(`/api/customers/${accountNo}/status-logs`, { headers: { 'Authorization': `Bearer ${getCookie('token')}` } })\n            const data = await res.json()\n            const logs = data.logs || []\n            if (!logs.length) { body.innerHTML = '<p class=\"text-slate-300 text-[11px] text-center py-1\">ไม่มีประวัติ</p>'; return logs }\n            body.innerHTML = logs.map(log => `\n                <div class=\"flex items-center gap-3 py-2 border-b border-slate-50 last:border-0\">\n                    <div class=\"w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0\">${log.changed_by ? (log.changed_by_name || '?').charAt(0) : 'S'}</div>\n                    <div class=\"flex-1\">\n                        <span class=\"text-[11px] font-semibold text-slate-700\">${log.from_status || '(ใหม่)'}</span>\n                        <span class=\"text-[11px] text-slate-400 mx-1\">→</span>\n                        <span class=\"text-[11px] font-bold text-primary\">${log.to_status}</span>\n                        <span class=\"text-[10px] text-slate-300 ml-2\">${log.note || ''}</span>\n                    </div>\n                    <div class=\"text-[10px] text-slate-300 text-right\">${fmtTs(log.changed_at)}</div>\n                </div>`).join('')\n            return logs\n        } catch(e) { body.innerHTML = '<p class=\"text-slate-300 text-[11px] text-center py-1\">โหลดไม่ได้</p>'; return [] }\n    }\n\n    function updateSectionVisibility(caseStatus, snap) {\n        const outstanding = snap ? snap.outstanding : 0\n        const ncb         = snap ? snap.ncb_months  : '31'\n\n        ;['section-enforcement-form','section-enforcement-info'].forEach(id => {\n            const el = document.getElementById(id)\n            if (el) el.style.display = 'none'\n        })\n\n        const footer = document.querySelector('footer')\n        const canEdit = canEditJudgmentData(caseStatus)\n\n        // ซ่อน judgment-type-row ก่อนทุกครั้ง\n        const jtr = document.getElementById('judgment-type-row')\n        if (jtr) jtr.classList.add('hidden')\n        jtReset()\n\n        // lock/unlock ช่องกรอกตามสิทธิ์\n        setJudgmentFormLocked(!canEdit)\n\n        // footer = ปุ่ม Cancel / บันทึกการแก้ไข\n        if (footer) {\n            footer.style.display = canEdit ? '' : 'none'\n        }\n\n        if (caseStatus === 'ยื่นฟ้อง') {\n            // แสดง dropdown เลือกประเภทคำพิพากษาเฉพาะตอนยังเป็นยื่นฟ้อง\n            if (jtr) jtr.classList.remove('hidden')\n\n        } else if (['พิพากษาตามยอม','พิพากษาฝ่ายเดียว'].includes(caseStatus)) {\n            if (canRecordEnforcementRole() && currentCus?.can_record_enforcement === true) {\n                const redCaseInput = document.getElementById('enf-red-case-no')\n                if (redCaseInput) redCaseInput.value = currentCus?.red_case_no || '-'\n                const el = document.getElementById('section-enforcement-form')\n                if (el) el.style.display = ''\n            }\n\n        } else if (caseStatus === 'บังคับคดี') {\n            const el = document.getElementById('section-enforcement-info')\n            if (el) el.style.display = ''\n\n        } else if (caseStatus === 'ปิดบัญชี') {\n            if (currentCus && currentCus.enforcement_order_no) {\n                const el = document.getElementById('section-enforcement-info')\n                if (el) el.style.display = ''\n            }\n\n            // ปิดบัญชีแล้วไม่ให้แก้ แม้เป็น admin\n            setJudgmentFormLocked(true)\n            if (footer) footer.style.display = 'none'\n        }\n    }\n\n    function fillEnforcementInfo(cus) {\n        const fmt = v => { if (!v) return '-'; const p = v.split('-'); return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : v }\n        const el = id => document.getElementById(id)\n        if (el('enf-info-red-case-no'))   el('enf-info-red-case-no').textContent   = cus.red_case_no || cus.enforcement_order_no || '-'\n        if (el('enf-info-judgment-date')) el('enf-info-judgment-date').textContent = fmt(cus.enforcement_judgment_date)\n        if (el('enf-info-recorded'))      el('enf-info-recorded').textContent      = cus.enforcement_recorded_at ? fmtTs(cus.enforcement_recorded_at) : '-'\n        renderRetroactiveEnforcement(cus)\n    }\n\n    function renderRetroactiveJudgment(cus) {\n        const alert = cus?.retroactive_judgment_alert\n        const badge = document.getElementById('retro-judgment-status-badge')\n        const message = document.getElementById('retro-judgment-message')\n        const meta = document.getElementById('retro-judgment-meta')\n        const btn = document.getElementById('retro-judgment-confirm-btn')\n        if (!badge || !message || !meta || !btn) return\n\n        badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border'\n        btn.disabled = true\n        btn.className = 'w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-bold transition-all'\n\n        if (!alert) {\n            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')\n            badge.textContent = 'ไม่มีรายการย้อนหลัง'\n            message.textContent = 'ไม่มีรายการคำพิพากษาข้ามเดือนที่ต้องยืนยัน'\n            meta.textContent = '-'\n            btn.textContent = 'ไม่มีรายการที่ต้องยืนยัน'\n            return\n        }\n\n        const affected = alert.affected_month_label || alert.affected_report_month || '-'\n        if (alert.marked) {\n            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')\n            badge.textContent = 'แก้แล้ว'\n            message.textContent = `ยืนยันแล้วว่าแก้รายงานเดือน ${affected} เรียบร้อย`\n            meta.textContent = `สถานะเดิม: ${alert.from_status || '-'} | สถานะที่ควรเป็น: ${alert.to_status || alert.case_status || '-'}`\n            btn.textContent = 'แก้รายงานแล้ว'\n            return\n        }\n\n        badge.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-100')\n        badge.textContent = 'รอยืนยัน'\n        message.textContent = alert.reason || `กรุณาตรวจสอบ/แก้รายงานเดือน ${affected}`\n        meta.textContent = `วันที่พิพากษา: ${fmtDate(alert.effective_date || alert.judgment_date)} | สถานะเดิม: ${alert.from_status || '-'} | สถานะที่ควรเป็น: ${alert.to_status || alert.case_status || '-'}`\n\n        if (isAdminRole()) {\n            btn.disabled = false\n            btn.className = 'w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-amber-700 text-xs font-bold transition-all hover:bg-amber-50'\n            btn.textContent = `ยืนยันว่าแก้รายงาน ${affected} แล้ว`\n        } else {\n            btn.textContent = 'เฉพาะ Admin เท่านั้นที่ยืนยันได้'\n        }\n    }\n\n    async function confirmRetroJudgmentFix() {\n        const alert = currentCus?.retroactive_judgment_alert\n        if (!alert || alert.marked) return\n        if (!isAdminRole()) {\n            showAlert('warning', 'ไม่มีสิทธิ์ยืนยัน', 'เฉพาะ Admin เท่านั้นที่ยืนยันว่าแก้รายงานย้อนหลังแล้วได้')\n            return\n        }\n\n        const btn = document.getElementById('retro-judgment-confirm-btn')\n        if (btn) {\n            btn.disabled = true\n            btn.textContent = 'กำลังบันทึก...'\n        }\n        try {\n            const res = await fetch(`/api/customers/${accountNo}/retroactive-report-fix`, {\n                method: 'POST',\n                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },\n                body: JSON.stringify({\n                    reason_code: alert.reason_code,\n                    affected_report_month: alert.affected_report_month,\n                    note: 'แก้รายงานย้อนหลังแล้ว'\n                })\n            })\n            const data = await res.json()\n            if (!res.ok) {\n                showAlert('error', 'ไม่สามารถยืนยันได้', data.error || 'เกิดข้อผิดพลาด')\n                return\n            }\n            showSuccessToast('บันทึกสำเร็จ', data.message || 'ยืนยันว่าแก้รายงานย้อนหลังแล้ว')\n            await loadCustomerData()\n            loadEditHistory()\n        } catch(e) {\n            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้')\n        } finally {\n            if (btn) {\n                btn.disabled = false\n            }\n        }\n    }\n\n    function setRetroToggleState(isOn, disabled, label, title = '') {\n        const btn = document.getElementById('retro-enforcement-toggle')\n        const labelEl = document.getElementById('retro-enforcement-toggle-label')\n        const knob = document.getElementById('retro-enforcement-toggle-knob')\n        const knobDot = knob?.querySelector('span')\n        if (!btn || !labelEl || !knob || !knobDot) return\n\n        btn.disabled = !!disabled\n        btn.title = title\n        btn.setAttribute('aria-checked', isOn ? 'true' : 'false')\n        labelEl.textContent = label\n        btn.classList.toggle('border-emerald-200', isOn)\n        btn.classList.toggle('text-emerald-700', isOn)\n        btn.classList.toggle('border-slate-200', !isOn)\n        btn.classList.toggle('text-slate-500', !isOn)\n        knob.classList.toggle('bg-emerald-500', isOn)\n        knob.classList.toggle('bg-slate-200', !isOn)\n        knobDot.style.transform = isOn\n            ? 'translate(1.375rem, -50%)'\n            : 'translate(0.125rem, -50%)'\n    }\n\n    function renderRetroactiveEnforcement(cus) {\n        const alert = cus?.retroactive_enforcement_alert\n        const badge = document.getElementById('retro-enforcement-status-badge')\n        const message = document.getElementById('retro-enforcement-message')\n        const meta = document.getElementById('retro-enforcement-meta')\n        if (!badge || !message || !meta) return\n\n        badge.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border'\n\n        if (!alert) {\n            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')\n            badge.textContent = 'ไม่มีรายการย้อนหลัง'\n            message.textContent = 'ไม่มีรายการที่ต้องยืนยันว่าแก้รายงานย้อนหลังจาก 31 เป็น 30'\n            meta.textContent = 'รายการนี้ใช้เฉพาะเคสบังคับคดีที่มาจากพิพากษาตามยอม และวันที่ของหมายอยู่ก่อนเดือนที่บันทึก/ตรวจรายงาน'\n            setRetroToggleState(false, true, 'ไม่มีรายการที่ต้องยืนยัน')\n            return\n        }\n\n        const affected = alert.affected_month_label || alert.affected_report_month || '-'\n        const source = alert.source_month_label || alert.source_report_month || '-'\n\n        if (alert.marked) {\n            badge.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-100')\n            badge.textContent = 'แก้แล้ว'\n            message.textContent = `ยืนยันแล้วว่าแก้รายงานเดือน ${affected} เรียบร้อย`\n            meta.textContent = `ยืนยันโดย ${alert.marked_by_name || '-'} วันที่ ${fmtTs(alert.marked_at)}`\n            setRetroToggleState(true, true, `แก้รายงาน ${affected} แล้ว`)\n            return\n        }\n\n        badge.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-100')\n        badge.textContent = 'รอยืนยัน'\n        message.textContent = alert.reason || `กรุณาตรวจสอบ/แก้รายงานเดือน ${affected}`\n        meta.textContent = `วันที่ของหมาย: ${fmtDate(alert.effective_date || alert.enforcement_date)} | เดือนรายงานที่พบ: ${source}`\n\n        if (isAdminRole()) {\n            setRetroToggleState(false, false, `แก้รายงาน ${affected} แล้ว`)\n        } else {\n            setRetroToggleState(false, true, `แก้รายงาน ${affected} แล้ว`, 'เฉพาะ Admin เท่านั้นที่ยืนยันได้')\n        }\n    }\n\n    function openRetroEnforcementConfirm() {\n        const alert = currentCus?.retroactive_enforcement_alert\n        if (!alert || alert.marked) return\n        if (!isAdminRole()) {\n            showAlert('warning', 'ไม่มีสิทธิ์ยืนยัน', 'เฉพาะ Admin เท่านั้นที่ยืนยันว่าแก้รายงานย้อนหลังแล้วได้')\n            return\n        }\n\n        const affected = alert.affected_month_label || alert.affected_report_month || '-'\n        document.getElementById('retro-modal-account').textContent = currentCus?.account_no || accountNo || '-'\n        document.getElementById('retro-modal-month').textContent = affected\n        document.getElementById('retro-modal-message').textContent = alert.reason || `กรุณายืนยันว่าแก้รายงานเดือน ${affected} แล้ว`\n        document.getElementById('retro-enforcement-confirm-modal')?.classList.remove('hidden')\n    }\n\n    function closeRetroEnforcementConfirm() {\n        document.getElementById('retro-enforcement-confirm-modal')?.classList.add('hidden')\n    }\n\n    async function confirmRetroEnforcementFix() {\n        const btn = document.getElementById('retro-modal-confirm-btn')\n        if (btn) {\n            btn.disabled = true\n            btn.textContent = 'กำลังบันทึก...'\n        }\n        try {\n            const res = await fetch(`/api/customers/${accountNo}/retroactive-enforcement-fix`, {\n                method: 'POST',\n                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },\n                body: JSON.stringify({ note: 'แก้รายงานย้อนหลังแล้ว' })\n            })\n            const data = await res.json()\n            if (!res.ok) {\n                showAlert('error', 'ไม่สามารถยืนยันได้', data.error || 'เกิดข้อผิดพลาด')\n                return\n            }\n            closeRetroEnforcementConfirm()\n            showSuccessToast('บันทึกสำเร็จ', data.message || 'ยืนยันว่าแก้รายงานย้อนหลังแล้ว')\n            await loadCustomerData()\n            loadEditHistory()\n        } catch(e) {\n            showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้')\n        } finally {\n            if (btn) {\n                btn.disabled = false\n                btn.textContent = 'ยืนยันว่าแก้รายงานแล้ว'\n            }\n        }\n    }\n\n    async function submitEnforcement() {\n        if (!canRecordEnforcementRole()) {\n            showAlert(\n                'warning',\n                'ไม่สามารถบันทึกหมายบังคับคดีได้',\n                'ฟังก์ชันนี้อนุญาตเฉพาะ Admin และ User เท่านั้น'\n            );\n            return;\n        }\n\n        const judgmentDate = dpGetValue('enf-judgment-date')\n        if (!judgmentDate) {\n            showAlert('warning', 'กรุณากรอกข้อมูลให้ครบ', 'ต้องเลือกวันที่ของหมายบังคับคดี'); return\n        }\n        if (judgmentDate > dpDateStr(new Date())) {\n            showAlert('warning', 'วันที่ไม่ถูกต้อง', 'วันที่ของหมายบังคับคดีต้องไม่เป็นวันที่ในอนาคต'); return\n        }\n        try {\n            const res = await fetch(`/api/customers/${accountNo}/enforcement`, {\n                method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },\n                body: JSON.stringify({ enforcement_judgment_date: judgmentDate })\n            })\n            const data = await res.json()\n            if (res.ok) { showSuccessToast('บันทึกสำเร็จ', 'บันทึกหมายบังคับคดีเรียบร้อย สถานะเปลี่ยนเป็น บังคับคดี'); await loadCustomerData(); loadEditHistory() }\n            else { showAlert('error', 'เกิดข้อผิดพลาด', data.error || 'ไม่สามารถบันทึกได้') }\n        } catch(e) { showAlert('error', 'เชื่อมต่อไม่ได้', 'ไม่สามารถเชื่อมต่อ Server ได้') }\n    }\n\n    function fmtTs(ts) {\n        if (!ts) return '-'\n        try {\n            const d = new Date(ts.replace(' ','T') + (ts.includes('+') ? '' : 'Z'))\n            return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()+543} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`\n        } catch { return ts }\n    }\n\n    // ============================================================\n    // Custom Dropdown — ประเภทคำพิพากษา\n    // ============================================================\n    function jtToggle() {\n        const panel   = document.getElementById('jt-panel');\n        const chevron = document.getElementById('jt-chevron');\n        const isOpen  = !panel.classList.contains('hidden');\n        if (isOpen) {\n            panel.classList.add('hidden');\n            chevron.style.transform = 'rotate(0deg)';\n        } else {\n            panel.classList.remove('hidden');\n            chevron.style.transform = 'rotate(180deg)';\n        }\n    }\n\n    function jtSelect(value) {\n        // เก็บค่าใน hidden input (ใช้กับ logic เดิมที่อ่าน #judgment-type)\n        document.getElementById('judgment-type').value = value;\n\n        // อัปเดต display text\n        const display = document.getElementById('jt-display');\n        display.textContent = value;\n        display.classList.remove('text-slate-400');\n        display.classList.add('text-slate-800', 'font-semibold');\n\n        // แสดง checkmark เฉพาะตัวที่เลือก\n        ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'].forEach(v => {\n            const el = document.getElementById('jt-check-' + v);\n            if (el) el.classList.toggle('hidden', v !== value);\n        });\n\n        // ไฮไลต์ trigger button\n        const jtTrigger = document.getElementById('jt-trigger');\n        jtTrigger.classList.remove('border-red-400', 'ring-red-500/10');\n        jtTrigger.classList.add('border-indigo-500', 'ring-4', 'ring-indigo-500/10');\n        document.getElementById('warn-judgment-type')?.classList.add('hidden');\n\n        // ปิด panel\n        document.getElementById('jt-panel').classList.add('hidden');\n        document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';\n\n        // ใช้ rule เฉพาะประเภทคำพิพากษาทันทีหลังเลือก\n        applyJudgmentTypeInputRules(true);\n    }\n\n    // ปิด dropdown เมื่อคลิกนอก\n    document.addEventListener('click', function(e) {\n        const wrap = document.getElementById('jt-dropdown-wrap');\n        if (wrap && !wrap.contains(e.target)) {\n            document.getElementById('jt-panel')?.classList.add('hidden');\n            document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';\n        }\n    });\n\n    // Reset dropdown เมื่อ updateSectionVisibility ซ่อน/แสดง\n    function jtReset() {\n        document.getElementById('judgment-type').value  = '';\n        const display = document.getElementById('jt-display');\n        display.textContent = 'เลือกประเภทเพื่อเปลี่ยนสถานะ';\n        display.className   = 'text-slate-400';\n        document.getElementById('jt-trigger').classList.remove('border-indigo-500', 'border-red-400', 'ring-4', 'ring-indigo-500/10', 'ring-red-500/10');\n        document.getElementById('warn-judgment-type')?.classList.add('hidden');\n        ['พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'].forEach(v => {\n            document.getElementById('jt-check-' + v)?.classList.add('hidden');\n        });\n        document.getElementById('jt-panel')?.classList.add('hidden');\n        document.getElementById('jt-chevron').style.transform = 'rotate(0deg)';\n        applyJudgmentTypeInputRules(false);\n    }\n\n    setupUI();\n    loadCustomerData();\n    loadEditHistory();\n\n    // ซ่อน stale warn เริ่มต้น\n    const staleWarn = document.getElementById('preview-stale-warn');\n    if (staleWarn) staleWarn.style.display = 'none';\n\n    const installmentCountInput = document.getElementById('installment-count');\n\n    if (installmentCountInput) {\n        installmentCountInput.addEventListener('focus', function () {\n            if (this.value === '0') {\n                this.value = '';\n            }\n\n            this.placeholder = '';\n        });\n\n        installmentCountInput.addEventListener('blur', function () {\n            this.placeholder = '0';\n        });\n    }\n";

const LEGACY_BODY_CLASS =
  "bg-surface text-on-surface min-h-screen font-body selection:bg-indigo-100 selection:text-primary";

type ApiRecord = Record<string, unknown>;

export interface PaymentRecord extends ApiRecord {
  payment_date?: string | null;
  amount?: number | string | null;
  type?: string | null;
}

export interface StatusLog extends ApiRecord {
  from_status?: string | null;
  to_status?: string | null;
  changed_at?: string | null;
  changed_by?: string | null;
}

export interface EnforcementInfo extends ApiRecord {
  enforcement_order_no?: string | null;
  enforcement_order_date?: string | null;
  enforcement_judgment_date?: string | null;
}

export interface ScheduleRow extends ApiRecord {
  due_date?: string | null;
  amount?: number | string | null;
  principal?: number | string | null;
  interest?: number | string | null;
}

export interface CustomerDetail extends EnforcementInfo {
  account_no?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  case_status?: string | null;
  payment_status?: string | null;
  payments?: PaymentRecord[];
  status_logs?: StatusLog[];
}

export interface ApiResponse<T = ApiRecord> {
  data?: T;
  error?: string;
  message?: string;
}

export interface JudgmentFormState extends ApiRecord {
  judgment_type?: string;
  judgment_date?: string;
  first_due_date?: string;
}

type LegacyEvent =
  | MouseEvent<HTMLElement>
  | KeyboardEvent<HTMLElement>
  | FocusEvent<HTMLElement>
  | ChangeEvent<HTMLElement>
  | FormEvent<HTMLElement>;

function runLegacyAction(expression: string, event: LegacyEvent) {
  // Temporary bridge while the remaining DOM-based customer-detail handlers
  // are migrated to typed React state one behavior slice at a time.
  Function("event", expression).call(event.currentTarget, event);
}

type ThaiDateUtils = {
  monthsFull: string[];
  monthsShort: string[];
  shortMonth: (index: number | string) => string;
  fullMonth: (index: number | string) => string;
};

function installThaiDateUtils() {
  const target = window as Window & { LQDThaiDate?: ThaiDateUtils };

  if (target.LQDThaiDate) return;

  const monthsFull = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const monthsShort = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  target.LQDThaiDate = {
    monthsFull,
    monthsShort,
    shortMonth: (index) => monthsShort[Number(index)] || "",
    fullMonth: (index) => monthsFull[Number(index)] || "",
  };
}

function installCustomerDetailRuntime() {
  installThaiDateUtils();

  const runInGlobalScope = globalThis.eval as (source: string) => unknown;
  runInGlobalScope(customerDetailRuntimeScript);
}

function useCustomerDetailRuntime() {
  useEffect(() => {
    document.body.className = LEGACY_BODY_CLASS;
    installCustomerDetailRuntime();
  }, []);
}

interface CustomerDetailMarkupProps {
  runLegacyAction: (expression: string, event: LegacyEvent) => void;
}

function CustomerDetailMarkup({ runLegacyAction }: CustomerDetailMarkupProps) {
  return (
    <>
      {/* Main */}

      <main className="md:ml-56 pt-20 min-h-screen pb-24">
        {/* Header bar */}

        <div className="px-6 md:px-8">
          <div className="max-w-[1600px] mx-auto">
            <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 py-4 border-b border-indigo-100/50">
              <div className="flex items-center gap-4 min-w-0">
                <a
                  id="customer-detail-back-link"
                  href="/customer-list"
                  className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-primary border border-white hover:bg-indigo-50 transition-all flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-3xl">
                    arrow_back
                  </span>
                </a>

                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tight">
                      รายละเอียดลูกหนี้
                    </h1>

                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-primary border border-indigo-100">
                      Customer Detail
                    </span>
                  </div>

                  <p
                    id="detail-subtitle"
                    className="text-slate-500 font-medium text-sm mt-1 truncate"
                  >
                    กำลังโหลดข้อมูล...
                  </p>
                </div>
              </div>

              <div className="w-full xl:w-auto flex items-center xl:justify-end">
                <div className="flex flex-col gap-2 w-full xl:w-auto">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold leading-none text-right">
                    Status Progress
                  </p>

                  <div
                    id="progress-steps"
                    className="min-w-[300px] min-h-[52px]"
                  ></div>
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Error banner */}

        <div
          id="error-banner"
          className="hidden mx-6 mt-4 max-w-[1600px] bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3"
        >
          <span
            className="material-symbols-outlined text-red-500 flex-shrink-0"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            error
          </span>

          <p
            id="error-text"
            className="text-sm text-red-700 font-medium flex-1"
          ></p>

          <button
            onClick={(event) => runLegacyAction("hideError()", event)}
            className="text-red-400 hover:text-red-600"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="px-6 md:px-8 py-6">
          <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-4 items-stretch">
            {/* Account Details */}

            <div className="col-span-12">
              <div className="dashboard-card">
                <div className="detail-card-heading px-5 md:px-6 py-4 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 rounded-t-2xl overflow-hidden">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center text-sky-600 shadow-sm flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          account_balance_wallet
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">
                            รายละเอียดบัญชี
                          </h2>
                        </div>

                        <p className="text-[12px] text-slate-500 mt-0.5">
                          แสดงข้อมูลบัญชีลูกหนี้และข้อมูลพื้นฐาน
                        </p>
                      </div>
                    </div>

                    <div className="detail-status-pill">
                      <span>Existing Case</span>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card-content">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="form-label-styled">
                        หมายเลขบัญชี <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <span className="material-symbols-outlined readonly-display-icon">
                          badge
                        </span>

                        <input
                          id="account-no"
                          className="form-input-styled readonly-display-input readonly-display-with-icon pr-4"
                          type="text"
                          readOnly
                          tabIndex={-1}
                        />
                      </div>

                      <p
                        id="warn-account-no"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span id="warn-account-no-msg">
                          กรุณากรอกตัวเลขเท่านั้น
                        </span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        ชื่อ-นามสกุล <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <span className="material-symbols-outlined readonly-display-icon">
                          person
                        </span>

                        <input
                          id="customer-name"
                          className="form-input-styled readonly-display-input readonly-display-with-icon pr-4"
                          type="text"
                          readOnly
                          tabIndex={-1}
                        />
                      </div>

                      <p
                        id="warn-customer-name"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span id="warn-customer-name-msg">
                          ไม่อนุญาตให้ใช้อักขระพิเศษ
                        </span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        ทุนทรัพย์ที่ฟ้อง
                      </label>

                      <div className="relative">
                        <input
                          id="filing-capital"
                          className="form-input-styled readonly-display-input readonly-display-with-icon text-right pr-4"
                          type="text"
                          readOnly
                          tabIndex={-1}
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-extrabold text-indigo-300 pointer-events-none">
                          ฿
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        วันที่ผิดนัดชำระก่อนฟ้อง
                      </label>

                      <div className="relative">
                        <span className="material-symbols-outlined readonly-display-icon">
                          event
                        </span>

                        <input
                          id="default-date-display"
                          className="form-input-styled readonly-display-input readonly-display-with-icon pr-4"
                          type="text"
                          readOnly
                          tabIndex={-1}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน
                      </label>

                      <div className="relative">
                        <span className="material-symbols-outlined readonly-display-icon">
                          timer
                        </span>

                        <input
                          id="pre-filing-dpd-days-display"
                          className="form-input-styled readonly-display-input readonly-display-with-icon pr-4"
                          type="text"
                          readOnly
                          tabIndex={-1}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        หมายเหตุ / เงื่อนไขพิเศษ
                      </label>

                      <div
                        id="filing-note-display"
                        className="readonly-display-text theme-tooltip"
                        data-tooltip="-"
                        tabIndex={0}
                      >
                        <span className="material-symbols-outlined readonly-display-icon">
                          notes
                        </span>

                        <span
                          id="filing-note-display-text"
                          className="block truncate"
                        >
                          -
                        </span>

                        <div
                          className="note-tooltip-popover"
                          role="tooltip"
                          aria-label="หมายเหตุและเงื่อนไขพิเศษ"
                        >
                          <div className="note-tooltip-head">
                            <span className="note-tooltip-icon">
                              <span
                                className="material-symbols-outlined text-[16px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                sticky_note_2
                              </span>
                            </span>

                            <span className="note-tooltip-title">
                              หมายเหตุ / เงื่อนไขพิเศษ
                            </span>
                          </div>

                          <div
                            id="filing-note-tooltip-text"
                            className="note-tooltip-body"
                          >
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timestamps */}

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span
                        className="material-symbols-outlined text-sm text-slate-300"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        add_circle
                      </span>

                      <span>สร้างเมื่อ</span>

                      <span
                        id="ts-created-at"
                        className="font-semibold text-slate-500"
                      >
                        -
                      </span>
                    </div>

                    <div className="w-px h-3 bg-slate-200"></div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span
                        className="material-symbols-outlined text-sm text-slate-300"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        edit
                      </span>

                      <span>แก้ไขล่าสุด</span>

                      <span
                        id="ts-updated-at"
                        className="font-semibold text-slate-500"
                      >
                        -
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section บันทึกหมายบังคับคดี — Form */}

            <div
              className="col-span-12"
              id="section-enforcement-form"
              style={{ display: "none" }}
            >
              <div className="dashboard-card">
                <div
                  className="dashboard-card-header detail-card-heading"
                  style={{ background: "linear-gradient(135deg,#FFF5F5,#fff)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                      <span className="material-symbols-outlined text-lg">
                        assignment
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-800">
                        บันทึกหมายบังคับคดี
                      </h3>

                      <p className="text-[11px] text-red-400">
                        เมื่อบันทึกแล้ว สถานะจะเปลี่ยนเป็น บังคับคดี
                      </p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card-content">
                  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 items-start">
                    <div>
                      <label className="form-label-styled">
                        คดีหมายเลขแดงที่ <span className="text-red-500">*</span>
                      </label>

                      <div className="dp-input-row relative">
                        <input
                          id="enf-red-case-no"
                          className="dp-input dp-autocalc font-semibold"
                          type="text"
                          defaultValue="-"
                          disabled
                        />

                        <span className="material-symbols-outlined dp-icon">
                          confirmation_number
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        วันที่ของหมายบังคับคดี{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="dp-wrap" id="dp-wrap-enf-judgment-date">
                        <div className="dp-input-row relative">
                          <input type="hidden" id="enf-judgment-date" />

                          <div
                            className="dp-input"
                            id="dp-display-enf-judgment-date"
                            tabIndex={0}
                            onClick={(event) =>
                              runLegacyAction(
                                "dpOpen('enf-judgment-date')",
                                event,
                              )
                            }
                          >
                            <span
                              id="dp-text-enf-judgment-date"
                              className="text-slate-400"
                            >
                              เลือกวันที่
                            </span>
                          </div>

                          <span className="material-symbols-outlined dp-icon">
                            calendar_today
                          </span>
                        </div>

                        <div
                          className="dp-popup"
                          id="dp-popup-enf-judgment-date"
                        >
                          <div className="dp-header">
                            <button
                              className="dp-nav-btn"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpNavMonth('enf-judgment-date',-1)",
                                  event,
                                )
                              }
                              type="button"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                              >
                                chevron_left
                              </span>
                            </button>

                            <span
                              className="dp-month-year"
                              id="dp-title-enf-judgment-date"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpToggleMyPicker('enf-judgment-date')",
                                  event,
                                )
                              }
                            ></span>

                            <button
                              className="dp-nav-btn"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpNavMonth('enf-judgment-date',1)",
                                  event,
                                )
                              }
                              type="button"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                              >
                                chevron_right
                              </span>
                            </button>
                          </div>

                          <div id="dp-my-enf-judgment-date" className="hidden">
                            <div className="dp-year-header">
                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavYear('enf-judgment-date',-1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_left
                                </span>
                              </button>

                              <span
                                id="dp-year-label-enf-judgment-date"
                                className="font-bold text-sm text-slate-700"
                              ></span>

                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavYear('enf-judgment-date',1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_right
                                </span>
                              </button>
                            </div>

                            <div
                              className="dp-my-grid"
                              id="dp-months-enf-judgment-date"
                            ></div>
                          </div>

                          <div id="dp-cal-enf-judgment-date">
                            <div className="dp-weekdays">
                              <div className="dp-weekday">อา</div>
                              <div className="dp-weekday">จ</div>
                              <div className="dp-weekday">อ</div>
                              <div className="dp-weekday">พ</div>
                              <div className="dp-weekday">พฤ</div>
                              <div className="dp-weekday">ศ</div>
                              <div className="dp-weekday">ส</div>
                            </div>

                            <div
                              className="dp-days"
                              id="dp-days-enf-judgment-date"
                            ></div>
                          </div>

                          <div className="dp-footer">
                            <button
                              className="dp-btn-clear"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpClear('enf-judgment-date')",
                                  event,
                                )
                              }
                              type="button"
                            >
                              ล้างค่า
                            </button>

                            <button
                              className="dp-btn-today"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpSelectToday('enf-judgment-date')",
                                  event,
                                )
                              }
                              type="button"
                            >
                              วันนี้
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={(event) =>
                        runLegacyAction("submitEnforcement()", event)
                      }
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-red-700 transition-all whitespace-nowrap"
                    >
                      <span className="material-symbols-outlined text-sm">
                        assignment_turned_in
                      </span>
                      บันทึกหมายบังคับคดี
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section ข้อมูลหมายบังคับคดี Read Only */}

            <div
              className="col-span-12"
              id="section-enforcement-info"
              style={{ display: "none" }}
            >
              <div className="dashboard-card overflow-hidden">
                {/* Header */}

                <div className="detail-card-heading px-5 md:px-6 py-4 border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-rose-50 rounded-t-2xl overflow-hidden">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center text-red-600 shadow-sm flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          assignment_turned_in
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">
                            ข้อมูลหมายบังคับคดี
                          </h2>

                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100">
                            บังคับคดี
                          </span>
                        </div>

                        <p className="text-[12px] text-slate-500 mt-0.5">
                          แสดงรายละเอียดหมายบังคับคดีที่บันทึกแล้ว
                          และใช้ติดตามขั้นตอนหลังคำพิพากษา
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}

                <div className="dashboard-card-content form-section-compact">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 field-grid-enhanced">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="material-symbols-outlined text-red-400 text-base"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          confirmation_number
                        </span>

                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          คดีหมายเลขแดงที่
                        </p>
                      </div>

                      <p
                        id="enf-info-red-case-no"
                        className="text-sm font-bold text-slate-800"
                      >
                        -
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="material-symbols-outlined text-red-400 text-base"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          gavel
                        </span>

                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          วันที่ของหมายบังคับคดี
                        </p>
                      </div>

                      <p
                        id="enf-info-judgment-date"
                        className="text-sm font-bold text-slate-800"
                      >
                        -
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="material-symbols-outlined text-red-400 text-base"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          person_check
                        </span>

                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          วันที่บันทึกหมายบังคับคดี
                        </p>
                      </div>

                      <p
                        id="enf-info-recorded"
                        className="text-sm font-semibold text-slate-600"
                      >
                        -
                      </p>
                    </div>
                  </div>

                  <div
                    id="retro-enforcement-panel"
                    className="mt-4 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
                          <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            manage_history
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-extrabold text-slate-800">
                              การแก้รายงานย้อนหลัง
                            </p>

                            <span
                              id="retro-enforcement-status-badge"
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200"
                            >
                              -
                            </span>
                          </div>

                          <p
                            id="retro-enforcement-message"
                            className="text-[12px] text-slate-500 mt-1"
                          >
                            กำลังตรวจสอบสถานะรายงานย้อนหลัง...
                          </p>

                          <p
                            id="retro-enforcement-meta"
                            className="text-[11px] text-slate-400 mt-1"
                          >
                            -
                          </p>
                        </div>
                      </div>

                      <button
                        id="retro-enforcement-toggle"
                        type="button"
                        role="switch"
                        aria-checked="false"
                        onClick={(event) =>
                          runLegacyAction(
                            "openRetroEnforcementConfirm()",
                            event,
                          )
                        }
                        className="retro-toggle-btn w-full sm:w-[245px] border-slate-200 text-slate-500"
                      >
                        <span
                          id="retro-enforcement-toggle-label"
                          className="truncate leading-none"
                        >
                          แก้รายงานแล้ว
                        </span>

                        <span
                          id="retro-enforcement-toggle-knob"
                          className="retro-toggle-track bg-slate-200"
                        >
                          <span className="retro-toggle-dot"></span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Judgment Details */}

            <div
              className="col-span-12 lg:col-span-6 flex flex-col"
              style={{ overflow: "visible" }}
            >
              <div
                className="dashboard-card case-entry-card judgment-card flex-1"
                style={{ overflow: "visible" }}
              >
                <div className="detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50 rounded-t-2xl overflow-hidden">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          gavel
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">
                            รายละเอียดคำพิพากษา
                          </h2>
                        </div>

                        <p className="text-[12px] text-slate-500 mt-0.5">
                          กรอกข้อมูลคำพิพากษา
                          และรายละเอียดเพื่อใช้คำนวณตารางผ่อนชำระ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card-content form-section-compact">
                  {/* Dropdown ประเภทคำพิพากษา — แสดงเฉพาะ ยื่นฟ้อง */}

                  <div
                    id="judgment-type-row"
                    className="hidden mb-3 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow-sm"
                  >
                    <label className="form-label-styled text-indigo-600">
                      ประเภทคำพิพากษา <span className="text-red-500">*</span>
                    </label>

                    {/* Custom Dropdown */}

                    <div className="relative" id="jt-dropdown-wrap">
                      {/* hidden input เก็บค่าจริง */}

                      <input type="hidden" id="judgment-type" defaultValue="" />

                      {/* Trigger button */}

                      <button
                        type="button"
                        id="jt-trigger"
                        onClick={(event) =>
                          runLegacyAction("jtToggle()", event)
                        }
                        className="w-full flex items-center justify-between bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:border-indigo-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm"
                      >
                        <span id="jt-display" className="text-slate-400">
                          เลือกประเภทเพื่อเปลี่ยนสถานะ
                        </span>

                        <span
                          className="material-symbols-outlined text-indigo-300 text-lg transition-transform duration-200"
                          id="jt-chevron"
                        >
                          expand_more
                        </span>
                      </button>

                      {/* Dropdown panel */}

                      <div
                        id="jt-panel"
                        className="hidden absolute left-0 right-0 mt-1.5 bg-white border border-indigo-100 rounded-xl shadow-lg shadow-indigo-100/50 z-50 overflow-hidden"
                      >
                        {/* Option: พิพากษาตามยอม */}

                        <button
                          type="button"
                          onClick={(event) =>
                            runLegacyAction("jtSelect('พิพากษาตามยอม')", event)
                          }
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group border-b border-slate-50"
                        >
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-all">
                            <span
                              className="material-symbols-outlined text-green-600 text-base"
                              style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                              handshake
                            </span>
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-800">
                              พิพากษาตามยอม
                            </p>

                            <p className="text-[11px] text-slate-400">
                              ลูกหนี้ยินยอมตามคำพิพากษา
                            </p>
                          </div>

                          <span
                            id="jt-check-พิพากษาตามยอม"
                            className="hidden material-symbols-outlined text-indigo-600 text-lg"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            check_circle
                          </span>
                        </button>

                        {/* Option: พิพากษาฝ่ายเดียว */}

                        <button
                          type="button"
                          onClick={(event) =>
                            runLegacyAction(
                              "jtSelect('พิพากษาฝ่ายเดียว')",
                              event,
                            )
                          }
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-all">
                            <span
                              className="material-symbols-outlined text-orange-600 text-base"
                              style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                              gavel
                            </span>
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-800">
                              พิพากษาฝ่ายเดียว
                            </p>

                            <p className="text-[11px] text-slate-400">
                              ศาลตัดสินโดยลูกหนี้ไม่มาศาล
                            </p>
                          </div>

                          <span
                            id="jt-check-พิพากษาฝ่ายเดียว"
                            className="hidden material-symbols-outlined text-indigo-600 text-lg"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            check_circle
                          </span>
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-indigo-400 mt-1.5">
                      เมื่อบันทึก จะเปลี่ยนสถานะจาก ยื่นฟ้อง → ประเภทที่เลือก
                    </p>

                    <p
                      id="warn-judgment-type"
                      className="hidden mt-2 text-[11px] leading-relaxed text-red-500 font-medium"
                    >
                      กรุณาเลือกประเภทคำพิพากษาก่อนบันทึก
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced">
                    <div>
                      <label className="form-label-styled">
                        วันที่ยื่นฟ้อง <span className="text-red-500">*</span>
                      </label>

                      <div className="dp-wrap" id="dp-wrap-filing-date">
                        <div className="dp-input-row relative">
                          <input type="hidden" id="filing-date" />

                          <div
                            className="dp-input"
                            id="dp-display-filing-date"
                            tabIndex={0}
                            onClick={(event) =>
                              runLegacyAction("dpOpen('filing-date')", event)
                            }
                            onKeyDown={(event) =>
                              runLegacyAction(
                                "if(event.key==='Enter'||event.key===' ')dpOpen('filing-date')",
                                event,
                              )
                            }
                          >
                            <span
                              id="dp-text-filing-date"
                              className="text-slate-400"
                            >
                              เลือกวันที่ยื่นฟ้อง
                            </span>
                          </div>

                          <span className="material-symbols-outlined dp-icon">
                            calendar_today
                          </span>
                        </div>

                        <div className="dp-popup" id="dp-popup-filing-date">
                          <div className="dp-header">
                            <button
                              className="dp-nav-btn"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpNavMonth('filing-date',-1)",
                                  event,
                                )
                              }
                              type="button"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                              >
                                chevron_left
                              </span>
                            </button>

                            <span
                              className="dp-month-year"
                              id="dp-title-filing-date"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpToggleMyPicker('filing-date')",
                                  event,
                                )
                              }
                            ></span>

                            <button
                              className="dp-nav-btn"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpNavMonth('filing-date',1)",
                                  event,
                                )
                              }
                              type="button"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                              >
                                chevron_right
                              </span>
                            </button>
                          </div>

                          <div id="dp-my-filing-date" className="hidden">
                            <div className="dp-year-header">
                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavYear('filing-date',-1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_left
                                </span>
                              </button>

                              <span
                                id="dp-year-label-filing-date"
                                className="font-bold text-sm text-slate-700"
                              ></span>

                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavYear('filing-date',1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_right
                                </span>
                              </button>
                            </div>

                            <div
                              className="dp-my-grid"
                              id="dp-months-filing-date"
                            ></div>
                          </div>

                          <div id="dp-cal-filing-date">
                            <div className="dp-weekdays">
                              <div className="dp-weekday">อา</div>
                              <div className="dp-weekday">จ</div>
                              <div className="dp-weekday">อ</div>

                              <div className="dp-weekday">พ</div>
                              <div className="dp-weekday">พฤ</div>
                              <div className="dp-weekday">ศ</div>
                              <div className="dp-weekday">ส</div>
                            </div>

                            <div
                              className="dp-days"
                              id="dp-days-filing-date"
                            ></div>
                          </div>

                          <div className="dp-footer">
                            <button
                              className="dp-btn-clear"
                              onClick={(event) =>
                                runLegacyAction("dpClear('filing-date')", event)
                              }
                              type="button"
                            >
                              ล้างค่า
                            </button>

                            <button
                              className="dp-btn-today"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpSelectToday('filing-date')",
                                  event,
                                )
                              }
                              type="button"
                            >
                              วันนี้
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        วันที่พิพากษา <span className="text-red-500">*</span>
                      </label>

                      <div className="dp-wrap" id="dp-wrap-judgment-date">
                        <div className="dp-input-row relative">
                          <input type="hidden" id="judgment-date" />

                          <div
                            className="dp-input"
                            id="dp-display-judgment-date"
                            tabIndex={0}
                            onClick={(event) =>
                              runLegacyAction("dpOpen('judgment-date')", event)
                            }
                            onKeyDown={(event) =>
                              runLegacyAction(
                                "if(event.key==='Enter'||event.key===' ')dpOpen('judgment-date')",
                                event,
                              )
                            }
                          >
                            <span
                              id="dp-text-judgment-date"
                              className="text-slate-400"
                            >
                              เลือกวันที่พิพากษา
                            </span>
                          </div>

                          <span className="material-symbols-outlined dp-icon">
                            calendar_today
                          </span>
                        </div>

                        <div className="dp-popup" id="dp-popup-judgment-date">
                          <div className="dp-header">
                            <button
                              className="dp-nav-btn"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpNavMonth('judgment-date',-1)",
                                  event,
                                )
                              }
                              type="button"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                              >
                                chevron_left
                              </span>
                            </button>

                            <span
                              className="dp-month-year"
                              id="dp-title-judgment-date"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpToggleMyPicker('judgment-date')",
                                  event,
                                )
                              }
                            ></span>

                            <button
                              className="dp-nav-btn"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpNavMonth('judgment-date',1)",
                                  event,
                                )
                              }
                              type="button"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                              >
                                chevron_right
                              </span>
                            </button>
                          </div>

                          <div id="dp-my-judgment-date" className="hidden">
                            <div className="dp-year-header">
                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavYear('judgment-date',-1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_left
                                </span>
                              </button>

                              <span
                                id="dp-year-label-judgment-date"
                                className="font-bold text-sm text-slate-700"
                              ></span>

                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavYear('judgment-date',1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_right
                                </span>
                              </button>
                            </div>

                            <div
                              className="dp-my-grid"
                              id="dp-months-judgment-date"
                            ></div>
                          </div>

                          <div id="dp-cal-judgment-date">
                            <div className="dp-weekdays">
                              <div className="dp-weekday">อา</div>
                              <div className="dp-weekday">จ</div>
                              <div className="dp-weekday">อ</div>

                              <div className="dp-weekday">พ</div>
                              <div className="dp-weekday">พฤ</div>
                              <div className="dp-weekday">ศ</div>
                              <div className="dp-weekday">ส</div>
                            </div>

                            <div
                              className="dp-days"
                              id="dp-days-judgment-date"
                            ></div>
                          </div>

                          <div className="dp-footer">
                            <button
                              className="dp-btn-clear"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpClear('judgment-date')",
                                  event,
                                )
                              }
                              type="button"
                            >
                              ล้างค่า
                            </button>

                            <button
                              className="dp-btn-today"
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpSelectToday('judgment-date')",
                                  event,
                                )
                              }
                              type="button"
                            >
                              วันนี้
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        คดีหมายเลขแดงที่ <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="red-case-no"
                        className="form-input-styled font-medium"
                        type="text"
                        placeholder="กรอกคดีหมายเลขแดงที่"
                        autoComplete="off"
                      />

                      <p
                        id="warn-red-case-no"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span>
                          รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น
                          ผบ1234/2567
                        </span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled text-blue-600">
                        ยอดหนี้ตามคำพิพากษา{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <input
                          id="total-debt"
                          className="form-input-styled font-medium text-right pr-4 pl-10"
                          placeholder="0.00"
                          type="text"
                          inputMode="decimal"
                          autoComplete="off"
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                          ฿
                        </span>
                      </div>

                      <p
                        id="warn-total-debt"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        เงินต้นตามคำพิพากษา{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <input
                          id="principal"
                          className="form-input-styled font-medium text-right pr-4 pl-10"
                          placeholder="0.00"
                          type="text"
                          inputMode="decimal"
                          autoComplete="off"
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                          ฿
                        </span>
                      </div>

                      <p
                        id="warn-principal"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        อัตราดอกเบี้ย/ปี <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="interest-rate"
                        className="form-input-styled font-medium text-right"
                        placeholder="0"
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                      />

                      <p
                        id="warn-interest-rate"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        ค่าธรรมเนียมศาล
                      </label>

                      <div className="relative">
                        <input
                          id="court-fee"
                          className="form-input-styled font-medium text-right pr-4 pl-10"
                          placeholder="0.00"
                          type="text"
                          inputMode="decimal"
                          autoComplete="off"
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                          ฿
                        </span>
                      </div>

                      <p
                        id="warn-court-fee"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled">ค่าทนายความ</label>

                      <div className="relative">
                        <input
                          id="lawyer-fee"
                          className="form-input-styled font-medium text-right pr-4 pl-10"
                          placeholder="0.00"
                          type="text"
                          inputMode="decimal"
                          autoComplete="off"
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                          ฿
                        </span>
                      </div>

                      <p
                        id="warn-lawyer-fee"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        จำนวนงวดผ่อน <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="installment-count"
                        className="form-input-styled font-medium"
                        placeholder="0"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                      />

                      <p
                        id="warn-installment-count"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span>กรุณากรอกตัวเลขจำนวนเต็มเท่านั้น</span>
                      </p>
                    </div>

                    <div>
                      <label className="form-label-styled flex items-center gap-2">
                        ยอดหนี้ส่วนต่าง
                        <span className="auto-badge-soft">AUTO</span>
                      </label>

                      <div className="relative">
                        <input
                          id="diff-debt"
                          className="form-input-styled autocalc-input font-medium text-right pr-4 pl-10"
                          placeholder="0.00"
                          type="text"
                          readOnly
                          tabIndex={-1}
                          onFocus={(event) =>
                            runLegacyAction("this.blur()", event)
                          }
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                          ฿
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="form-label-styled">
                        หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม
                      </label>

                      <textarea
                        id="judgment-note"
                        className="form-input-styled min-h-[92px] resize-none"
                        maxLength={100}
                        placeholder="กรอกหมายเหตุเพิ่มเติม (ถ้ามี)"
                      ></textarea>

                      <p className="text-[10px] text-slate-400 mt-1">
                        <span id="judgment-note-counter">0</span>
                        /100 ตัวอักษร{" "}
                      </p>
                    </div>

                    <div
                      id="retro-judgment-panel"
                      className="sm:col-span-2 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
                            <span
                              className="material-symbols-outlined text-[20px]"
                              style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                              gavel
                            </span>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-extrabold text-slate-800">
                                คำพิพากษาข้ามเดือน
                              </p>

                              <span
                                id="retro-judgment-status-badge"
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200"
                              >
                                -
                              </span>
                            </div>

                            <p
                              id="retro-judgment-message"
                              className="text-[12px] text-slate-500 mt-1"
                            >
                              กำลังตรวจสอบสถานะรายงานย้อนหลัง...
                            </p>

                            <p
                              id="retro-judgment-meta"
                              className="text-[11px] text-slate-400 mt-1"
                            >
                              -
                            </p>
                          </div>
                        </div>

                        <button
                          id="retro-judgment-confirm-btn"
                          type="button"
                          onClick={(event) =>
                            runLegacyAction("confirmRetroJudgmentFix()", event)
                          }
                          className="w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-bold transition-all"
                        >
                          ยืนยันว่าแก้รายงานย้อนหลังแล้ว
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}

            <div
              className="col-span-12 lg:col-span-6 flex flex-col"
              style={{ overflow: "visible" }}
            >
              <div
                className="dashboard-card case-entry-card payment-card flex-1"
                style={{ overflow: "visible" }}
              >
                <div className="detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 rounded-t-2xl overflow-hidden">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          payments
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">
                            รายละเอียดการชำระเงินตามคำพิพากษา
                          </h2>
                        </div>

                        <p className="text-[12px] text-slate-500 mt-0.5">
                          กำหนดงวดชำระ ค่างวด
                          และดอกเบี้ยเพื่อใช้คำนวณตารางผ่อนชำระ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card-content form-section-compact">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced">
                      <div>
                        <label className="form-label-styled">
                          วันครบกำหนดงวดแรก{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <div className="dp-wrap" id="dp-wrap-first-due-date">
                          <div className="dp-input-row relative">
                            <input type="hidden" id="first-due-date" />

                            <div
                              className="dp-input"
                              id="dp-display-first-due-date"
                              tabIndex={0}
                              onClick={(event) =>
                                runLegacyAction(
                                  "dpOpen('first-due-date')",
                                  event,
                                )
                              }
                              onKeyDown={(event) =>
                                runLegacyAction(
                                  "if(event.key==='Enter'||event.key===' ')dpOpen('first-due-date')",
                                  event,
                                )
                              }
                            >
                              <span
                                id="dp-text-first-due-date"
                                className="text-slate-400"
                              >
                                เลือกวันครบกำหนดงวดแรก
                              </span>
                            </div>

                            <span className="material-symbols-outlined dp-icon">
                              calendar_today
                            </span>
                          </div>

                          <div
                            className="dp-popup"
                            id="dp-popup-first-due-date"
                          >
                            <div className="dp-header">
                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavMonth('first-due-date',-1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_left
                                </span>
                              </button>

                              <span
                                className="dp-month-year"
                                id="dp-title-first-due-date"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpToggleMyPicker('first-due-date')",
                                    event,
                                  )
                                }
                              ></span>

                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavMonth('first-due-date',1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_right
                                </span>
                              </button>
                            </div>

                            <div id="dp-my-first-due-date" className="hidden">
                              <div className="dp-year-header">
                                <button
                                  className="dp-nav-btn"
                                  onClick={(event) =>
                                    runLegacyAction(
                                      "dpNavYear('first-due-date',-1)",
                                      event,
                                    )
                                  }
                                  type="button"
                                >
                                  <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "18px" }}
                                  >
                                    chevron_left
                                  </span>
                                </button>

                                <span
                                  id="dp-year-label-first-due-date"
                                  className="font-bold text-sm text-slate-700"
                                ></span>

                                <button
                                  className="dp-nav-btn"
                                  onClick={(event) =>
                                    runLegacyAction(
                                      "dpNavYear('first-due-date',1)",
                                      event,
                                    )
                                  }
                                  type="button"
                                >
                                  <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "18px" }}
                                  >
                                    chevron_right
                                  </span>
                                </button>
                              </div>

                              <div
                                className="dp-my-grid"
                                id="dp-months-first-due-date"
                              ></div>
                            </div>

                            <div id="dp-cal-first-due-date">
                              <div className="dp-weekdays">
                                <div className="dp-weekday">อา</div>
                                <div className="dp-weekday">จ</div>
                                <div className="dp-weekday">อ</div>

                                <div className="dp-weekday">พ</div>
                                <div className="dp-weekday">พฤ</div>
                                <div className="dp-weekday">ศ</div>
                                <div className="dp-weekday">ส</div>
                              </div>

                              <div
                                className="dp-days"
                                id="dp-days-first-due-date"
                              ></div>
                            </div>

                            <div className="dp-footer">
                              <button
                                className="dp-btn-clear"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpClear('first-due-date')",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                ล้างค่า
                              </button>

                              <button
                                className="dp-btn-today"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpSelectToday('first-due-date')",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                วันนี้
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="form-label-styled flex items-center gap-2">
                          วันครบกำหนดงวดสุดท้าย
                          <span className="auto-badge-soft">AUTO</span>
                        </label>

                        <div className="dp-wrap" id="dp-wrap-last-due-date">
                          <div className="dp-input-row relative">
                            <input type="hidden" id="last-due-date" />

                            <div
                              className="dp-input dp-readonly dp-autocalc"
                              id="dp-display-last-due-date"
                              tabIndex={-1}
                            >
                              <span id="dp-text-last-due-date">
                                คำนวณอัตโนมัติ
                              </span>
                            </div>

                            <span className="material-symbols-outlined dp-icon">
                              calendar_today
                            </span>
                          </div>

                          <div className="dp-popup" id="dp-popup-last-due-date">
                            <div className="dp-header">
                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavMonth('last-due-date',-1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_left
                                </span>
                              </button>

                              <span
                                className="dp-month-year"
                                id="dp-title-last-due-date"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpToggleMyPicker('last-due-date')",
                                    event,
                                  )
                                }
                              ></span>

                              <button
                                className="dp-nav-btn"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpNavMonth('last-due-date',1)",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  chevron_right
                                </span>
                              </button>
                            </div>

                            <div id="dp-my-last-due-date" className="hidden">
                              <div className="dp-year-header">
                                <button
                                  className="dp-nav-btn"
                                  onClick={(event) =>
                                    runLegacyAction(
                                      "dpNavYear('last-due-date',-1)",
                                      event,
                                    )
                                  }
                                  type="button"
                                >
                                  <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "18px" }}
                                  >
                                    chevron_left
                                  </span>
                                </button>

                                <span
                                  id="dp-year-label-last-due-date"
                                  className="font-bold text-sm text-slate-700"
                                ></span>

                                <button
                                  className="dp-nav-btn"
                                  onClick={(event) =>
                                    runLegacyAction(
                                      "dpNavYear('last-due-date',1)",
                                      event,
                                    )
                                  }
                                  type="button"
                                >
                                  <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: "18px" }}
                                  >
                                    chevron_right
                                  </span>
                                </button>
                              </div>

                              <div
                                className="dp-my-grid"
                                id="dp-months-last-due-date"
                              ></div>
                            </div>

                            <div id="dp-cal-last-due-date">
                              <div className="dp-weekdays">
                                <div className="dp-weekday">อา</div>
                                <div className="dp-weekday">จ</div>
                                <div className="dp-weekday">อ</div>

                                <div className="dp-weekday">พ</div>
                                <div className="dp-weekday">พฤ</div>
                                <div className="dp-weekday">ศ</div>
                                <div className="dp-weekday">ส</div>
                              </div>

                              <div
                                className="dp-days"
                                id="dp-days-last-due-date"
                              ></div>
                            </div>

                            <div className="dp-footer">
                              <button
                                className="dp-btn-clear"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpClear('last-due-date')",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                ล้างค่า
                              </button>

                              <button
                                className="dp-btn-today"
                                onClick={(event) =>
                                  runLegacyAction(
                                    "dpSelectToday('last-due-date')",
                                    event,
                                  )
                                }
                                type="button"
                              >
                                วันนี้
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced">
                      <div>
                        <label className="form-label-styled">
                          ค่างวด งวดที่ 1{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                          <input
                            id="installment-1"
                            className="form-input-styled font-medium text-right pr-4 pl-10"
                            placeholder="0.00"
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                          />

                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                            ฿
                          </span>
                        </div>

                        <p
                          id="warn-installment-1"
                          className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                        >
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            warning
                          </span>
                          <span>กรุณากรอกตัวเลขเท่านั้น</span>
                        </p>
                      </div>

                      <div>
                        <label className="form-label-styled">
                          ค่างวด งวดที่ 2
                        </label>

                        <div className="relative">
                          <input
                            id="installment-2"
                            className="form-input-styled font-medium text-right pr-4 pl-10"
                            placeholder="0.00"
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                          />

                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                            ฿
                          </span>
                        </div>

                        <p
                          id="warn-installment-2"
                          className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                        >
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            warning
                          </span>
                          <span>กรุณากรอกตัวเลขเท่านั้น</span>
                        </p>
                      </div>

                      <div>
                        <label className="form-label-styled">
                          ค่างวด งวดที่ 3
                        </label>

                        <div className="relative">
                          <input
                            id="installment-3"
                            className="form-input-styled font-medium text-right pr-4 pl-10"
                            placeholder="0.00"
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                          />

                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                            ฿
                          </span>
                        </div>

                        <p
                          id="warn-installment-3"
                          className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                        >
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            warning
                          </span>
                          <span>กรุณากรอกตัวเลขเท่านั้น</span>
                        </p>
                      </div>

                      <div>
                        <label className="form-label-styled">
                          ค่างวด งวดที่ 4
                        </label>

                        <div className="relative">
                          <input
                            id="installment-4"
                            className="form-input-styled font-medium text-right pr-4 pl-10"
                            placeholder="0.00"
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                          />

                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">
                            ฿
                          </span>
                        </div>

                        <p
                          id="warn-installment-4"
                          className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                        >
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            warning
                          </span>
                          <span>กรุณากรอกตัวเลขเท่านั้น</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="form-label-styled">
                        ดอกเบี้ยเมื่อผิดนัดชำระ (%)
                      </label>

                      <input
                        id="default-interest-rate"
                        className="form-input-styled font-medium text-right"
                        placeholder="0"
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                      />

                      <p
                        id="warn-default-interest-rate"
                        className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1"
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          warning
                        </span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>
                    </div>

                    <div className="helper-panel">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-blue-400 text-base mt-0.5">
                          info
                        </span>

                        <p>
                          ระบบจะใช้ข้อมูลทั้งหมดที่กรอก
                          เพื่อคำนวณตารางผ่อนชำระในส่วนพรีวิว
                          หากมีการแก้ไขข้อมูล ต้องกดพรีวิวใหม่ก่อนบันทึก
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit History */}

            <div className="col-span-12" id="edit-history-section">
              <div className="dashboard-card">
                <div className="detail-card-heading px-5 md:px-6 py-4 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-t-2xl overflow-hidden">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          history
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">
                            ประวัติการแก้ไข
                          </h2>
                        </div>

                        <p className="text-[12px] text-slate-500 mt-0.5">
                          บันทึกการเปลี่ยนแปลงข้อมูลล่าสุดเพื่อใช้ตรวจสอบย้อนหลัง
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="edit-history-body"
                  className="px-6 py-4 text-sm text-slate-400 text-center"
                >
                  กำลังโหลด...
                </div>
              </div>
            </div>

            {/* Schedule Preview */}

            <div className="col-span-12">
              <div className="dashboard-card">
                <div className="detail-card-heading px-5 md:px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-t-2xl overflow-hidden">
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          calendar_today
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">
                            ตัวอย่างตารางผ่อนชำระ
                          </h2>
                        </div>

                        <p className="text-[12px] text-slate-500 mt-0.5">
                          ใช้ตรวจสอบตารางผ่อนชำระ
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center bg-white/80 p-1 rounded-xl border border-blue-100 shadow-sm">
                        <button
                          id="view-monthly-btn"
                          onClick={(event) =>
                            runLegacyAction("switchView('monthly')", event)
                          }
                          className="px-3 py-1 rounded-lg text-[12px] font-bold transition-all bg-white text-primary shadow-sm"
                        >
                          แสดงรายเดือน
                        </button>

                        <button
                          id="view-daily-btn"
                          onClick={(event) =>
                            runLegacyAction("switchView('daily')", event)
                          }
                          className="px-3 py-1 rounded-lg text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700"
                        >
                          แสดงทุกวันที่
                        </button>
                      </div>

                      <div
                        id="preview-stale-warn"
                        className="hidden flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-600 font-bold"
                      >
                        <span className="material-symbols-outlined text-sm">
                          refresh
                        </span>
                        กรุณากดพรีวิวใหม่
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden flex flex-col">
                  <div
                    id="schedule-placeholder"
                    className="p-8 text-center text-slate-400 text-sm"
                  >
                    กรอกข้อมูลให้ครบแล้วกด "พรีวิว" เพื่อดูตารางผ่อนชำระ
                  </div>

                  <div
                    id="schedule-loading"
                    className="hidden p-8 text-center text-slate-400 text-sm"
                  >
                    <svg
                      className="animate-spin w-6 h-6 mx-auto mb-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    กำลังคำนวณ...
                  </div>

                  <div
                    id="schedule-table-wrap"
                    className="hidden overflow-x-auto"
                    style={{ maxHeight: "480px", overflowY: "auto" }}
                  >
                    <table className="w-full text-left border-collapse min-w-[1100px]">
                      <thead className="sticky top-0 z-10">
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            วันที่
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                            งวดที่
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                            เงินต้นยกมา
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                            จ่ายค่างวด
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                            ตัดดอกเบี้ย
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                            ตัดเงินต้น
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                            ชำระอื่น
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                            เงินต้นคงเหลือ
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                            ดอกเบี้ยรายวัน
                          </th>

                          <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                            ดอกเบี้ยสะสม
                          </th>
                        </tr>
                      </thead>

                      <tbody
                        id="schedule-tbody"
                        className="divide-y divide-slate-50 text-[12px]"
                      ></tbody>
                    </table>
                  </div>

                  <div
                    id="schedule-info"
                    className="hidden px-6 py-3 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between gap-4"
                  >
                    <span
                      id="schedule-info-text"
                      className="text-[11px] text-slate-500"
                    ></span>

                    <div
                      id="schedule-pagination"
                      className="flex items-center gap-1"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="status-logs-body" className="hidden"></div>
      </main>

      {/* Toast Modal */}

      <div
        id="toast-modal"
        className="hidden fixed inset-0 z-[300] flex items-center justify-center p-4"
      >
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
          onClick={(event) =>
            runLegacyAction(
              "document.getElementById('toast-modal').classList.add('hidden')",
              event,
            )
          }
        ></div>

        <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 flex flex-col items-center text-center">
            <div
              id="toast-icon-wrap"
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
            >
              <span
                id="toast-icon"
                className="material-symbols-outlined text-3xl"
              ></span>
            </div>

            <h3
              id="toast-title"
              className="text-base font-bold text-slate-800 mb-1"
            ></h3>

            <p
              id="toast-message"
              className="text-sm text-slate-500 leading-relaxed"
            ></p>
          </div>

          <div className="px-6 pb-5">
            <button
              onClick={(event) =>
                runLegacyAction(
                  "document.getElementById('toast-modal').classList.add('hidden')",
                  event,
                )
              }
              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all text-sm"
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Review Modal */}

      <div
        id="confirm-modal"
        className="hidden fixed inset-0 z-[300] flex items-center justify-center px-6 py-8"
      >
        <div className="absolute inset-0 confirm-review-backdrop"></div>

        <div className="confirm-review-panel relative w-full max-w-5xl max-h-[88vh] rounded-[24px] overflow-hidden flex flex-col">
          {/* Header */}

          <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between gap-4 bg-white/72">
            <div className="flex items-center gap-4">
              <div className="confirm-review-icon">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  fact_check
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  ตรวจสอบข้อมูลก่อนบันทึก
                </h3>

                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Review & Confirm Changes
                </p>
              </div>
            </div>

            <button
              onClick={(event) => runLegacyAction("closeConfirmModal()", event)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>

          {/* Body */}

          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
            {/* รายละเอียดบัญชี */}

            <section className="confirm-review-section">
              <div className="confirm-review-section-head">
                <div className="confirm-review-section-icon">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    account_balance_wallet
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-700">
                  รายละเอียดบัญชี
                </h4>
              </div>

              <div className="confirm-review-grid">
                <div className="confirm-review-item">
                  <p className="confirm-review-label">หมายเลขบัญชี</p>

                  <p id="rv-account-no" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">ชื่อ-นามสกุล</p>

                  <p id="rv-customer-name" className="confirm-review-value">
                    -
                  </p>
                </div>
              </div>
            </section>

            {/* รายละเอียดคำพิพากษา */}

            <section className="confirm-review-section">
              <div className="confirm-review-section-head indigo">
                <div className="confirm-review-section-icon">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    gavel
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-700">
                  รายละเอียดคำพิพากษา
                </h4>
              </div>

              <div className="confirm-review-grid">
                <div className="confirm-review-item">
                  <p className="confirm-review-label">วันที่ยื่นฟ้อง</p>

                  <p id="rv-filing-date" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">วันที่พิพากษา</p>

                  <p id="rv-judgment-date" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">คดีหมายเลขแดงที่</p>

                  <p id="rv-red-case-no" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">หมายเหตุ</p>

                  <p
                    id="rv-judgment-note"
                    className="confirm-review-value break-words"
                  >
                    -
                  </p>
                </div>
              </div>

              <div
                id="rv-judgment-type-row"
                className="confirm-review-highlight hidden"
              >
                <p className="confirm-review-label text-indigo-500">
                  ประเภทคำพิพากษา
                </p>

                <p
                  id="rv-judgment-type"
                  className="confirm-review-value primary"
                >
                  -
                </p>
              </div>

              <div className="confirm-review-grid cols-3">
                <div className="confirm-review-item">
                  <p className="confirm-review-label">ยอดหนี้รวม</p>

                  <p
                    id="rv-total-debt"
                    className="confirm-review-value primary"
                  >
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">เงินต้น</p>

                  <p id="rv-principal" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">อัตราดอกเบี้ย/ปี</p>

                  <p id="rv-interest-rate" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">ค่าธรรมเนียมศาล</p>

                  <p id="rv-court-fee" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">ค่าทนายความ</p>

                  <p id="rv-lawyer-fee" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">ยอดหนี้ส่วนต่าง</p>

                  <p id="rv-diff-debt" className="confirm-review-value primary">
                    -
                  </p>
                </div>
              </div>
            </section>

            {/* รายละเอียดการชำระเงิน */}

            <section className="confirm-review-section">
              <div className="confirm-review-section-head green">
                <div className="confirm-review-section-icon green">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    payments
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-700">
                  รายละเอียดการชำระเงิน
                </h4>
              </div>

              <div className="confirm-review-grid">
                <div className="confirm-review-item">
                  <p className="confirm-review-label">วันครบกำหนดงวดแรก</p>

                  <p id="rv-first-due-date" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">วันครบกำหนดงวดสุดท้าย</p>

                  <p id="rv-last-due-date" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">จำนวนงวดผ่อน</p>

                  <p id="rv-installment-count" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">ดอกเบี้ยเมื่อผิดนัด</p>

                  <p
                    id="rv-default-interest"
                    className="confirm-review-value danger"
                  >
                    -
                  </p>
                </div>
              </div>

              <div className="confirm-review-grid cols-4">
                <div className="confirm-review-item">
                  <p className="confirm-review-label">ค่างวดที่ 1</p>

                  <p id="rv-inst-1" className="confirm-review-value">
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">ค่างวดที่ 2</p>

                  <p
                    id="rv-inst-2"
                    className="confirm-review-value text-slate-400"
                  >
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">ค่างวดที่ 3</p>

                  <p
                    id="rv-inst-3"
                    className="confirm-review-value text-slate-400"
                  >
                    -
                  </p>
                </div>

                <div className="confirm-review-item">
                  <p className="confirm-review-label">ค่างวดที่ 4</p>

                  <p
                    id="rv-inst-4"
                    className="confirm-review-value text-slate-400"
                  >
                    -
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}

          <div className="confirm-review-footer px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <p className="text-xs font-semibold text-slate-400">
              กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={(event) =>
                  runLegacyAction("closeConfirmModal()", event)
                }
                className="confirm-review-secondary-btn min-w-[96px] h-10 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold transition-all text-sm"
              >
                แก้ไข
              </button>

              <button
                id="confirm-submit-btn"
                onClick={(event) => runLegacyAction("doSubmit()", event)}
                className="confirm-review-primary-btn min-w-[160px] h-10 px-5 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  save
                </span>
                ยืนยันบันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Modal */}

      <div
        id="alert-modal"
        className="hidden fixed inset-0 z-[200] flex items-center justify-center p-4"
      >
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-[3px]"
          onClick={(event) => runLegacyAction("closeAlert()", event)}
        ></div>

        <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-7 flex flex-col items-center text-center">
            <div
              id="alert-icon-wrap"
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            >
              <span
                id="alert-icon"
                className="material-symbols-outlined text-3xl"
              ></span>
            </div>

            <h3
              id="alert-title"
              className="text-lg font-bold text-slate-800 mb-2"
            ></h3>

            <p
              id="alert-message"
              className="text-sm text-slate-500 leading-relaxed mb-6"
            ></p>

            <button
              onClick={(event) => runLegacyAction("closeAlert()", event)}
              className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm"
            >
              รับทราบ
            </button>
          </div>

          <button
            onClick={(event) => runLegacyAction("closeAlert()", event)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      {/* Footer actions */}

      <footer className="detail-footer">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div></div>

          <div className="flex flex-wrap justify-end gap-4">
            <button
              onClick={(event) => runLegacyAction("handleCancel()", event)}
              className="btn-secondary-modern"
            >
              Cancel
            </button>

            <button
              id="preview-btn"
              onClick={(event) =>
                runLegacyAction(
                  "document.getElementById('preview-btn').dataset.manual='true'; loadPreview()",
                  event,
                )
              }
              className="btn-primary-modern"
            >
              <span className="material-symbols-outlined text-base">
                visibility
              </span>
              พรีวิว
            </button>

            <button
              id="submit-btn"
              onClick={(event) => runLegacyAction("handleSubmit()", event)}
              disabled
              className="btn-primary-modern px-6 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span id="btn-default" className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">
                  save
                </span>
                บันทึกการแก้ไข
              </span>

              <span id="btn-loading" className="hidden flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                กำลังบันทึก...
              </span>
            </button>
          </div>
        </div>
      </footer>

      {/* Retroactive Enforcement Confirm Modal */}

      <div
        id="retro-enforcement-confirm-modal"
        className="hidden fixed inset-0 z-[320] flex items-center justify-center p-4"
      >
        <div
          className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
          onClick={(event) =>
            runLegacyAction("closeRetroEnforcementConfirm()", event)
          }
        ></div>

        <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-amber-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-amber-100 bg-amber-50">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  warning
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-800">
                  ยืนยันว่าแก้รายงานย้อนหลังแล้ว?
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  หลังจากยืนยันแล้ว จะไม่สามารถยกเลิกสถานะนี้ได้
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 space-y-3 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  เลขที่บัญชี
                </p>

                <p
                  id="retro-modal-account"
                  className="text-sm font-bold text-slate-800 mt-1"
                >
                  -
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  เดือนที่ต้องตรวจสอบ
                </p>

                <p
                  id="retro-modal-month"
                  className="text-sm font-bold text-amber-700 mt-1"
                >
                  -
                </p>
              </div>
            </div>

            <p id="retro-modal-message" className="text-slate-600 leading-6">
              -
            </p>

            <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-semibold text-red-600">
              โปรดกดปุ่มยืนยันเฉพาะเมื่อได้ตรวจสอบหรือแก้รายงานเดือนเก่าเรียบร้อยแล้วเท่านั้น
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={(event) =>
                runLegacyAction("closeRetroEnforcementConfirm()", event)
              }
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all"
            >
              ยกเลิก
            </button>

            <button
              type="button"
              id="retro-modal-confirm-btn"
              onClick={(event) =>
                runLegacyAction("confirmRetroEnforcementFix()", event)
              }
              className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all"
            >
              ยืนยันว่าแก้รายงานแล้ว
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CustomerDetailPage() {
  useCustomerDetailRuntime();

  return (
    <AppLayout activePage="customer-list">
      <div className="customer-detail-page min-h-screen bg-surface text-on-surface font-body">
        <CustomerDetailMarkup runLegacyAction={runLegacyAction} />
      </div>
    </AppLayout>
  );
}
