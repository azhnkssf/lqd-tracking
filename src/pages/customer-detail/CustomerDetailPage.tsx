import { useCallback, useEffect, useMemo, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import ThemedDatePicker from "../../components/ui/ThemedDatePicker";

type UserRole = "user" | "admin" | "superadmin" | "";
type CaseStatus =
  | "ยื่นฟ้อง"
  | "พิพากษาตามยอม"
  | "พิพากษาฝ่ายเดียว"
  | "บังคับคดี"
  | "ปิดบัญชี"
  | string;
type JudgmentType = "" | "พิพากษาตามยอม" | "พิพากษาฝ่ายเดียว";

interface RetroactiveAlert {
  type?: "judgment" | "enforcement" | string;
  marked?: boolean;
  reason?: string;
  reason_code?: string;
  affected_report_month?: string;
  affected_month_label?: string;
  source_report_month?: string;
  source_month_label?: string;
  effective_date?: string;
  enforcement_date?: string;
  marked_by_name?: string;
  marked_at?: string;
}

interface CustomerDetailData {
  account_no: string;
  name: string;
  case_status: CaseStatus;
  filing_date?: string;
  filing_capital?: number;
  default_date?: string;
  pre_filing_dpd_days?: number | null;
  filing_note?: string;
  red_case_no?: string;
  judgment_date?: string;
  judgment_note?: string;
  total_debt?: number;
  principal?: number;
  judgment_difference?: number;
  interest_rate?: number;
  court_fee?: number;
  lawyer_fee?: number;
  installment_count?: number;
  default_interest_rate?: number;
  first_due_date?: string;
  last_due_date?: string;
  installment_1?: number;
  installment_2?: number;
  installment_3?: number;
  installment_4?: number;
  created_at?: string;
  updated_at?: string;
  latest_snapshot?: Record<string, unknown>;
  can_record_enforcement?: boolean;
  enforcement_order_no?: string;
  enforcement_judgment_date?: string;
  enforcement_recorded_at?: string;
  retroactive_judgment_alert?: RetroactiveAlert | null;
  retroactive_enforcement_alert?: RetroactiveAlert | null;
}

interface CustomerDetailFormState {
  judgmentType: JudgmentType;
  filingDate: string;
  filingCapital: string;
  redCaseNo: string;
  judgmentDate: string;
  judgmentNote: string;
  totalDebt: string;
  principal: string;
  interestRate: string;
  courtFee: string;
  lawyerFee: string;
  installmentCount: string;
  defaultInterestRate: string;
  firstDueDate: string;
  lastDueDate: string;
  installment1: string;
  installment2: string;
  installment3: string;
  installment4: string;
}

interface FieldErrors {
  [fieldName: string]: string;
}

interface ScheduleRow {
  date?: string;
  due_date?: string;
  term?: number | string;
  principal_bf?: number | string;
  payment?: number | string;
  interest_paid?: number | string;
  principal_paid?: number | string;
  other_paid?: number | string;
  principal_bal?: number | string;
  daily_interest?: number | string;
  acc_interest?: number | string;
  [key: string]: unknown;
}

interface SchedulePreviewData {
  daily: ScheduleRow[];
  monthly: ScheduleRow[];
}

interface StatusLog {
  from_status?: string | null;
  to_status?: string | null;
  changed_at?: string | null;
  changed_by_name?: string | null;
  note?: string | null;
}

interface EditHistoryItem {
  id?: number;
  edited_by_name?: string | null;
  edited_at?: string | null;
  changes?: Record<string, { label?: string; from?: unknown; to?: unknown }>;
}

const initialForm: CustomerDetailFormState = {
  judgmentType: "",
  filingDate: "",
  filingCapital: "0.00",
  redCaseNo: "",
  judgmentDate: "",
  judgmentNote: "",
  totalDebt: "",
  principal: "",
  interestRate: "",
  courtFee: "0.00",
  lawyerFee: "0.00",
  installmentCount: "",
  defaultInterestRate: "",
  firstDueDate: "",
  lastDueDate: "",
  installment1: "",
  installment2: "0.00",
  installment3: "0.00",
  installment4: "0.00",
};

const roleLabels: Record<UserRole, string> = {
  user: "User",
  admin: "Admin",
  superadmin: "Super Admin",
  "": "-",
};

const moneyFields = new Set<keyof CustomerDetailFormState>([
  "filingCapital",
  "totalDebt",
  "principal",
  "courtFee",
  "lawyerFee",
  "installment1",
  "installment2",
  "installment3",
  "installment4",
]);

function isAdminRole(role: UserRole) {
  return role === "admin";
}

function isUserRole(role: UserRole) {
  return role === "user";
}

function canRecordEnforcementRole(role: UserRole) {
  return role === "user" || role === "admin";
}

function canEditJudgmentData(role: UserRole, caseStatus?: CaseStatus) {
  if (caseStatus === "ปิดบัญชี") return false;
  if (caseStatus === "ยื่นฟ้อง") return role === "user" || role === "admin";
  return role === "admin";
}

function editPermissionMessage(caseStatus?: CaseStatus) {
  if (caseStatus === "ยื่นฟ้อง") {
    return "สถานะยื่นฟ้องอนุญาตให้ User และ Admin แก้ไขได้เท่านั้น";
  }
  return "สถานะนี้อนุญาตให้แก้ไขได้เฉพาะ Admin เท่านั้น";
}

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1] || "";
}

function getSafeReturnTo(fallback = "/customer-list") {
  const returnTo = new URLSearchParams(window.location.search).get("return_to") || "";
  return returnTo.startsWith("/customer-list") ? returnTo : fallback;
}

function toIso(value?: string | null) {
  return String(value || "").slice(0, 10);
}

function todayIso() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

function fmtDate(value?: string | null) {
  const iso = toIso(value);
  if (!iso) return "-";
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${day}/${month}/${Number(year) + 543}` : iso;
}

function fmtTs(value?: string | null) {
  if (!value) return "-";
  try {
    const date = new Date(value.replace(" ", "T") + (value.includes("+") ? "" : "Z"));
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear() + 543} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  } catch {
    return value;
  }
}

function fmtAccNo(value?: string | null) {
  const text = String(value || "");
  return text.length === 12 ? `${text.slice(0, 3)}-${text.slice(3, 9)}-${text.slice(9)}` : text || "-";
}

function parseMoney(value: string | number | undefined | null) {
  const n = Number(String(value ?? "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(value: string | number | undefined | null) {
  const n = parseMoney(value);
  return n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function parseRate(value: string | number | undefined | null) {
  const n = Number(String(value ?? "").replace("%", "").trim());
  return Number.isFinite(n) ? n : 0;
}

function formatRate(value: string | number | undefined | null) {
  const raw = String(value ?? "").replace("%", "").trim();
  if (!raw) return "";
  const n = parseRate(raw);
  return Number.isInteger(n) ? `${n}%` : `${n.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}%`;
}

function cleanDecimal(value: string) {
  const cleaned = value.replace(/,/g, "").replace(/[^\d.]/g, "");
  const [head, ...tail] = cleaned.split(".");
  return tail.length ? `${head}.${tail.join("").slice(0, 2)}` : head;
}

function cleanRate(value: string) {
  const cleaned = value.replace("%", "").replace(/[^\d.]/g, "");
  const [head, ...tail] = cleaned.split(".");
  return tail.length ? `${head}.${tail.join("").slice(0, 4)}` : head;
}

function normalizeCaseNo(value: string) {
  const raw = value.trim().replace(/\s*\/\s*/g, "/").replace(/\s+/g, "");
  const match = raw.match(/^([A-Za-zก-ฮ]{1,8})([A-Za-z]?\d{1,8})\/(25\d{2})$/);
  return match ? `${match[1]}${match[2]}/${match[3]}` : "";
}

function isValidCaseNo(value: string) {
  return Boolean(normalizeCaseNo(value));
}

function addMonthsIso(iso: string, months: number) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "";
  const date = new Date(year, month - 1 + months, day);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function calculateLastDueDate(form: CustomerDetailFormState, activeJudgmentType: JudgmentType | CaseStatus) {
  if (!form.firstDueDate) return "";
  if (activeJudgmentType === "พิพากษาฝ่ายเดียว") return form.firstDueDate;
  const count = Number.parseInt(form.installmentCount, 10);
  if (!Number.isFinite(count) || count < 1) return "";
  return addMonthsIso(form.firstDueDate, count - 1);
}

function calculateDiffDebt(form: CustomerDetailFormState) {
  return Math.max(
    0,
    parseMoney(form.totalDebt) - parseMoney(form.principal) - parseMoney(form.courtFee) - parseMoney(form.lawyerFee),
  );
}

function customerToForm(customer: CustomerDetailData): CustomerDetailFormState {
  const form = {
    judgmentType: "" as JudgmentType,
    filingDate: toIso(customer.filing_date),
    filingCapital: formatMoney(customer.filing_capital ?? 0),
    redCaseNo: customer.red_case_no || "",
    judgmentDate: toIso(customer.judgment_date),
    judgmentNote: customer.judgment_note || "",
    totalDebt: customer.total_debt == null ? "" : formatMoney(customer.total_debt),
    principal: customer.principal == null ? "" : formatMoney(customer.principal),
    interestRate: customer.interest_rate == null ? "" : formatRate(customer.interest_rate),
    courtFee: formatMoney(customer.court_fee ?? 0),
    lawyerFee: formatMoney(customer.lawyer_fee ?? 0),
    installmentCount: customer.installment_count ? String(customer.installment_count) : "",
    defaultInterestRate: customer.default_interest_rate == null ? "" : formatRate(customer.default_interest_rate),
    firstDueDate: toIso(customer.first_due_date),
    lastDueDate: toIso(customer.last_due_date),
    installment1: customer.installment_1 == null ? "" : formatMoney(customer.installment_1),
    installment2: formatMoney(customer.installment_2 ?? 0),
    installment3: formatMoney(customer.installment_3 ?? 0),
    installment4: formatMoney(customer.installment_4 ?? 0),
  };
  form.lastDueDate = form.lastDueDate || calculateLastDueDate(form, customer.case_status);
  return form;
}

function comparableForm(form: CustomerDetailFormState, customer?: CustomerDetailData | null) {
  const active = form.judgmentType || customer?.case_status || "";
  return {
    judgmentType: form.judgmentType,
    filingDate: form.filingDate,
    filingCapital: parseMoney(form.filingCapital),
    redCaseNo: normalizeCaseNo(form.redCaseNo) || form.redCaseNo.trim(),
    judgmentDate: form.judgmentDate,
    judgmentNote: form.judgmentNote.trim(),
    totalDebt: parseMoney(form.totalDebt),
    principal: parseMoney(form.principal),
    interestRate: parseRate(form.interestRate),
    courtFee: parseMoney(form.courtFee),
    lawyerFee: parseMoney(form.lawyerFee),
    installmentCount: active === "พิพากษาฝ่ายเดียว" ? 1 : Number.parseInt(form.installmentCount || "0", 10),
    defaultInterestRate: parseRate(form.defaultInterestRate),
    firstDueDate: form.firstDueDate,
    lastDueDate: calculateLastDueDate(form, active),
    installment1: parseMoney(form.installment1),
    installment2: active === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment2),
    installment3: active === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment3),
    installment4: active === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment4),
  };
}

function hasFormChanged(form: CustomerDetailFormState, originalForm: CustomerDetailFormState, customer?: CustomerDetailData | null) {
  return JSON.stringify(comparableForm(form, customer)) !== JSON.stringify(comparableForm(originalForm, customer));
}

function getPreviewRequiredFields(customer: CustomerDetailData | null) {
  const fields: Array<keyof CustomerDetailFormState> = [
    "filingDate",
    "redCaseNo",
    "judgmentDate",
    "totalDebt",
    "principal",
    "interestRate",
    "defaultInterestRate",
    "courtFee",
    "lawyerFee",
    "installmentCount",
    "firstDueDate",
    "installment1",
  ];
  if (customer?.case_status === "ยื่นฟ้อง") fields.unshift("judgmentType");
  return fields;
}

function validateBusinessRules(form: CustomerDetailFormState, customer: CustomerDetailData | null) {
  const errors: FieldErrors = {};
  if (form.redCaseNo && !isValidCaseNo(form.redCaseNo)) errors.redCaseNo = "รูปแบบ: ผบ1234/2567 หรือ ผบE1234/2568";
  if (form.judgmentNote.length > 100) errors.judgmentNote = "หมายเหตุต้องไม่เกิน 100 ตัวอักษร";
  if (parseMoney(form.filingCapital) > 0 && parseMoney(form.totalDebt) > parseMoney(form.filingCapital)) {
    errors.totalDebt = "ยอดหนี้ตามคำพิพากษาต้องไม่เกินทุนทรัพย์ที่ฟ้อง";
  }
  if (parseRate(form.interestRate) > 24) errors.interestRate = "อัตราดอกเบี้ยต้องไม่เกิน 24%";
  if (parseRate(form.defaultInterestRate) > 24) errors.defaultInterestRate = "ดอกเบี้ยผิดนัดต้องไม่เกิน 24%";
  if (form.filingDate && form.judgmentDate && form.judgmentDate < form.filingDate) {
    errors.judgmentDate = "วันที่พิพากษาต้องไม่น้อยกว่าวันที่ยื่นฟ้อง";
  }
  if (form.judgmentDate && form.firstDueDate && form.firstDueDate < form.judgmentDate) {
    errors.firstDueDate = "วันครบกำหนดงวดแรกต้องไม่น้อยกว่าวันที่พิพากษา";
  }
  if (customer?.case_status === "ยื่นฟ้อง" && !form.judgmentType) errors.judgmentType = "กรุณาเลือกประเภทคำพิพากษา";
  return errors;
}

function validateFormForPreview(form: CustomerDetailFormState, customer: CustomerDetailData | null) {
  const errors: FieldErrors = {};
  getPreviewRequiredFields(customer).forEach((field) => {
    if (!String(form[field] || "").trim()) errors[field] = "จำเป็นต้องกรอก";
  });
  return { ...errors, ...validateBusinessRules(form, customer) };
}

function validateFormForSubmit(form: CustomerDetailFormState, customer: CustomerDetailData | null) {
  return validateFormForPreview(form, customer);
}

function isPreviewFormReady(form: CustomerDetailFormState, customer: CustomerDetailData | null) {
  return Object.keys(validateFormForPreview(form, customer)).length === 0;
}

function buildPreviewPayload(form: CustomerDetailFormState, activeJudgmentType: JudgmentType | CaseStatus) {
  return {
    filing_date: form.filingDate,
    principal: parseMoney(form.principal),
    interest_rate: parseRate(form.interestRate),
    installment_count: activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 1 : Number.parseInt(form.installmentCount || "0", 10),
    diff_debt: calculateDiffDebt(form),
    first_due_date: form.firstDueDate,
    installment_1: parseMoney(form.installment1),
    installment_2: activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment2),
    installment_3: activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment3),
    installment_4: activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment4),
  };
}

function buildSubmitPayload(form: CustomerDetailFormState, customer: CustomerDetailData, activeJudgmentType: JudgmentType | CaseStatus) {
  const redCaseNo = customer.red_case_no ? customer.red_case_no : normalizeCaseNo(form.redCaseNo);
  const lastDueDate = calculateLastDueDate(form, activeJudgmentType);
  return {
    filing_date: form.filingDate,
    filing_capital: parseMoney(form.filingCapital),
    red_case_no: redCaseNo,
    judgment_date: form.judgmentDate,
    judgment_note: form.judgmentNote.trim(),
    total_debt: parseMoney(form.totalDebt),
    principal: parseMoney(form.principal),
    judgment_difference: calculateDiffDebt(form),
    interest_rate: parseRate(form.interestRate),
    court_fee: parseMoney(form.courtFee),
    lawyer_fee: parseMoney(form.lawyerFee),
    installment_count: activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 1 : Number.parseInt(form.installmentCount || "0", 10),
    default_interest_rate: parseRate(form.defaultInterestRate),
    first_due_date: form.firstDueDate,
    last_due_date: lastDueDate,
    installment_1: parseMoney(form.installment1),
    installment_2: activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment2),
    installment_3: activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment3),
    installment_4: activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : parseMoney(form.installment4),
  };
}

async function safeJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function ModalShell({ open, children, z = "z-[200]" }: { open: boolean; children: React.ReactNode; z?: string }) {
  if (!open) return null;
  return <div className={`fixed inset-0 ${z} flex items-center justify-center p-4`}>{children}</div>;
}

function DateField({
  id,
  value,
  onChange,
  placeholder,
  disabled,
  minDate,
  maxDate,
  error,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  error?: string;
}) {
  return (
    <ThemedDatePicker
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      minDate={minDate}
      maxDate={maxDate}
      disabled={disabled}
      className={`dp-input w-full text-left ${error ? "border-red-400 ring-4 ring-red-500/10" : ""}`}
    >
      {(text, isPlaceholder) => (
        <>
          <span className={isPlaceholder ? "text-slate-400" : "text-slate-800 font-semibold"}>{text}</span>
          <span className="material-symbols-outlined dp-icon">calendar_today</span>
        </>
      )}
    </ThemedDatePicker>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
        warning
      </span>
      <span>{message}</span>
    </p>
  );
}

function AccountSummaryCard({ customer }: { customer: CustomerDetailData | null }) {
  return (
    <div className="col-span-12">
      <div className="dashboard-card overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Customer Detail</p>
              <h1 className="text-2xl md:text-3xl font-black mt-1">{customer ? customer.name : "กำลังโหลดข้อมูล..."}</h1>
              <p className="text-sm text-slate-300 mt-1">{fmtAccNo(customer?.account_no)} • {customer?.case_status || "-"}</p>
            </div>
            <a id="customer-detail-back-link" href={getSafeReturnTo("/customer-list")} className="btn-secondary-modern bg-white/10 text-white border-white/20 hover:bg-white/15">
              กลับรายการลูกค้า
            </a>
          </div>
        </div>
        <div className="dashboard-card-content grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            ["ทุนทรัพย์ที่ฟ้อง", formatMoney(customer?.filing_capital ?? 0)],
            ["วันที่ยื่นฟ้อง", fmtDate(customer?.filing_date)],
            ["วันที่ผิดนัด", fmtDate(customer?.default_date)],
            ["DPD ก่อนฟ้อง", customer?.pre_filing_dpd_days != null ? `${Number(customer.pre_filing_dpd_days).toLocaleString("th-TH")} วัน` : "-"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase">{label}</p>
              <p className="text-sm font-extrabold text-slate-800 mt-1">{value}</p>
            </div>
          ))}
          <div className="md:col-span-4 rounded-2xl border border-slate-100 bg-white px-4 py-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase">หมายเหตุการฟ้อง</p>
            <p className="text-sm text-slate-700 mt-1">{customer?.filing_note || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusProgressBar({ customer, logs }: { customer: CustomerDetailData | null; logs: StatusLog[] }) {
  const current = customer?.case_status || "";
  const logStatuses = logs.flatMap((log) => [log.from_status || "", log.to_status || ""]).filter(Boolean);
  const judgmentStatus = logStatuses.includes("พิพากษาฝ่ายเดียว") || current === "พิพากษาฝ่ายเดียว" ? "พิพากษาฝ่ายเดียว" : "พิพากษาตามยอม";
  const flow = ["ยื่นฟ้อง", judgmentStatus, "บังคับคดี", "ปิดบัญชี"];
  const visited = new Set(logStatuses);
  if (current) visited.add(current);
  if (logs.length === 0 && current === "ปิดบัญชี") visited.delete("บังคับคดี");
  return (
    <div className="col-span-12">
      <div className="dashboard-card px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          {flow.map((status, index) => {
            const active = current === status;
            const done = visited.has(status);
            return (
              <div key={`${status}-${index}`} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border ${active ? "bg-indigo-600 text-white border-indigo-600" : done ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-400 border-slate-200"}`}>
                  {done ? "✓" : index + 1}
                </div>
                <span className={`text-xs font-bold ${active ? "text-indigo-700" : done ? "text-slate-700" : "text-slate-400"}`}>{status}</span>
                {index < flow.length - 1 ? <div className="w-8 h-px bg-slate-200" /> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function JudgmentTypeSelector({
  value,
  open,
  disabled,
  error,
  onToggle,
  onSelect,
}: {
  value: JudgmentType;
  open: boolean;
  disabled: boolean;
  error?: string;
  onToggle: () => void;
  onSelect: (value: JudgmentType) => void;
}) {
  return (
    <div className="mb-3 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow-sm">
      <label className="form-label-styled text-indigo-600">ประเภทคำพิพากษา <span className="text-red-500">*</span></label>
      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className={`w-full flex items-center justify-between bg-white border rounded-xl px-4 py-2.5 text-sm font-semibold transition-all shadow-sm ${error ? "border-red-400 ring-4 ring-red-500/10" : value ? "border-indigo-500 ring-4 ring-indigo-500/10" : "border-indigo-200 hover:border-indigo-400"} disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          <span className={value ? "text-slate-800 font-semibold" : "text-slate-400"}>{value || "เลือกประเภทเพื่อเปลี่ยนสถานะ"}</span>
          <span className={`material-symbols-outlined text-indigo-300 text-lg transition-transform duration-200 ${open ? "rotate-180" : ""}`}>expand_more</span>
        </button>
        {open ? (
          <div className="absolute left-0 right-0 mt-1.5 bg-white border border-indigo-100 rounded-xl shadow-lg shadow-indigo-100/50 z-50 overflow-hidden">
            {(["พิพากษาตามยอม", "พิพากษาฝ่ายเดียว"] as JudgmentType[]).map((option) => (
              <button key={option} type="button" onClick={() => onSelect(option)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group border-b border-slate-50 last:border-b-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${option === "พิพากษาตามยอม" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }}>{option === "พิพากษาตามยอม" ? "handshake" : "gavel"}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{option}</p>
                  <p className="text-[11px] text-slate-400">{option === "พิพากษาตามยอม" ? "ลูกหนี้ยินยอมตามคำพิพากษา" : "ศาลตัดสินโดยลูกหนี้ไม่มาศาล"}</p>
                </div>
                {value === option ? <span className="material-symbols-outlined text-indigo-600 text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span> : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <p className="text-[11px] text-indigo-400 mt-1.5">เมื่อบันทึก จะเปลี่ยนสถานะจาก ยื่นฟ้อง → ประเภทที่เลือก</p>
      <FieldError message={error} />
    </div>
  );
}

function JudgmentDetailsForm(props: {
  customer: CustomerDetailData | null;
  form: CustomerDetailFormState;
  fieldErrors: FieldErrors;
  role: UserRole;
  activeJudgmentType: JudgmentType | CaseStatus;
  canEdit: boolean;
  hasRecordedRedCaseNo: boolean;
  judgmentTypeOpen: boolean;
  onToggleJudgmentType: () => void;
  onSelectJudgmentType: (value: JudgmentType) => void;
  onChange: (field: keyof CustomerDetailFormState, value: string) => void;
  onMoneyBlur: (field: keyof CustomerDetailFormState) => void;
  onRateBlur: (field: keyof CustomerDetailFormState) => void;
  onFocusPlain: (field: keyof CustomerDetailFormState) => void;
  onConfirmRetroJudgment: () => void;
}) {
  const { customer, form, fieldErrors, canEdit, hasRecordedRedCaseNo, activeJudgmentType } = props;
  const redCaseNoLocked = !canEdit || hasRecordedRedCaseNo;
  const defaultJudgment = activeJudgmentType === "พิพากษาฝ่ายเดียว";
  const inputClass = (field: string, extra = "") => `form-input-styled font-medium ${extra} ${fieldErrors[field] ? "border-red-400 ring-4 ring-red-500/10" : ""}`;
  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col" style={{ overflow: "visible" }}>
      <div className="dashboard-card case-entry-card judgment-card flex-1" style={{ overflow: "visible" }}>
        <div className="detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50 rounded-t-2xl overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
            </div>
            <div>
              <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">รายละเอียดคำพิพากษา</h2>
              <p className="text-[12px] text-slate-500 mt-0.5">กรอกข้อมูลคำพิพากษา และรายละเอียดเพื่อใช้คำนวณตารางผ่อนชำระ</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card-content form-section-compact">
          {customer?.case_status === "ยื่นฟ้อง" ? (
            <JudgmentTypeSelector
              value={form.judgmentType}
              open={props.judgmentTypeOpen}
              disabled={!canEdit}
              error={fieldErrors.judgmentType}
              onToggle={props.onToggleJudgmentType}
              onSelect={props.onSelectJudgmentType}
            />
          ) : null}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced">
            <div>
              <label className="form-label-styled">วันที่ยื่นฟ้อง <span className="text-red-500">*</span></label>
              <DateField id="filing-date" value={form.filingDate} onChange={(v) => props.onChange("filingDate", v)} placeholder="เลือกวันที่ยื่นฟ้อง" disabled error={fieldErrors.filingDate} />
              <FieldError message={fieldErrors.filingDate} />
            </div>
            <div>
              <label className="form-label-styled">วันที่พิพากษา <span className="text-red-500">*</span></label>
              <DateField id="judgment-date" value={form.judgmentDate} onChange={(v) => props.onChange("judgmentDate", v)} placeholder="เลือกวันที่พิพากษา" disabled={!canEdit} minDate={form.filingDate || undefined} error={fieldErrors.judgmentDate} />
              <FieldError message={fieldErrors.judgmentDate} />
            </div>
            <div>
              <label className="form-label-styled">คดีหมายเลขแดงที่ <span className="text-red-500">*</span></label>
              <input value={form.redCaseNo} onChange={(e) => props.onChange("redCaseNo", e.target.value)} readOnly={redCaseNoLocked} disabled={redCaseNoLocked} title={hasRecordedRedCaseNo ? "คดีหมายเลขแดงที่ถูกบันทึกครั้งแรกแล้ว ไม่อนุญาตให้แก้ไข" : ""} className={inputClass("redCaseNo", redCaseNoLocked ? "autocalc-input bg-slate-100 text-slate-500 cursor-not-allowed" : "")} type="text" placeholder="กรอกคดีหมายเลขแดงที่" autoComplete="off" />
              <FieldError message={fieldErrors.redCaseNo} />
            </div>
            {[
              ["totalDebt", "ยอดหนี้ตามคำพิพากษา", "฿"],
              ["principal", "เงินต้นตามคำพิพากษา", "฿"],
              ["interestRate", "อัตราดอกเบี้ย/ปี", ""],
              ["courtFee", "ค่าธรรมเนียมศาล", "฿"],
              ["lawyerFee", "ค่าทนายความ", "฿"],
            ].map(([field, label, prefix]) => (
              <div key={field}>
                <label className="form-label-styled">{label} {["totalDebt", "principal", "interestRate"].includes(field) ? <span className="text-red-500">*</span> : null}</label>
                <div className="relative">
                  <input value={form[field as keyof CustomerDetailFormState]} onFocus={() => props.onFocusPlain(field as keyof CustomerDetailFormState)} onChange={(e) => props.onChange(field as keyof CustomerDetailFormState, field.includes("Rate") ? cleanRate(e.target.value) : cleanDecimal(e.target.value))} onBlur={() => field.includes("Rate") ? props.onRateBlur(field as keyof CustomerDetailFormState) : props.onMoneyBlur(field as keyof CustomerDetailFormState)} readOnly={!canEdit} disabled={!canEdit} className={inputClass(field, `${prefix ? "text-right pr-4 pl-10" : "text-right"} ${!canEdit ? "bg-slate-50/50 text-slate-500 cursor-not-allowed" : ""}`)} placeholder={field.includes("Rate") ? "0" : "0.00"} type="text" inputMode="decimal" autoComplete="off" />
                  {prefix ? <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">{prefix}</span> : null}
                </div>
                <FieldError message={fieldErrors[field]} />
              </div>
            ))}
            <div>
              <label className="form-label-styled">จำนวนงวดผ่อน <span className="text-red-500">*</span></label>
              <input value={form.installmentCount} onChange={(e) => props.onChange("installmentCount", e.target.value.replace(/\D/g, ""))} readOnly={!canEdit || defaultJudgment} disabled={!canEdit || defaultJudgment} className={inputClass("installmentCount", (!canEdit || defaultJudgment) ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "")} placeholder="0" type="text" inputMode="numeric" autoComplete="off" />
              <FieldError message={fieldErrors.installmentCount} />
            </div>
            <div>
              <label className="form-label-styled flex items-center gap-2">ยอดหนี้ส่วนต่าง <span className="auto-badge-soft">AUTO</span></label>
              <div className="relative">
                <input value={formatMoney(calculateDiffDebt(form))} className="form-input-styled autocalc-input font-medium text-right pr-4 pl-10" readOnly tabIndex={-1} />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="form-label-styled">หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม</label>
              <textarea value={form.judgmentNote} onChange={(e) => props.onChange("judgmentNote", e.target.value.slice(0, 100))} readOnly={!canEdit} disabled={!canEdit} className={inputClass("judgmentNote", `min-h-[92px] resize-none ${!canEdit ? "bg-slate-50/50 text-slate-500 cursor-not-allowed" : ""}`)} maxLength={100} placeholder="กรอกหมายเหตุเพิ่มเติม (ถ้ามี)" />
              <p className="text-[10px] text-slate-400 mt-1">{form.judgmentNote.length}/100 ตัวอักษร</p>
              <FieldError message={fieldErrors.judgmentNote} />
            </div>
            <RetroactivePanel type="judgment" alert={customer?.retroactive_judgment_alert} role={props.role} onConfirm={props.onConfirmRetroJudgment} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentDetailsForm(props: {
  form: CustomerDetailFormState;
  fieldErrors: FieldErrors;
  canEdit: boolean;
  activeJudgmentType: JudgmentType | CaseStatus;
  onChange: (field: keyof CustomerDetailFormState, value: string) => void;
  onMoneyBlur: (field: keyof CustomerDetailFormState) => void;
  onRateBlur: (field: keyof CustomerDetailFormState) => void;
  onFocusPlain: (field: keyof CustomerDetailFormState) => void;
}) {
  const { form, fieldErrors, canEdit, activeJudgmentType } = props;
  const defaultJudgment = activeJudgmentType === "พิพากษาฝ่ายเดียว";
  const inputClass = (field: string, extra = "") => `form-input-styled font-medium ${extra} ${fieldErrors[field] ? "border-red-400 ring-4 ring-red-500/10" : ""}`;
  return (
    <div className="col-span-12 lg:col-span-6 flex flex-col" style={{ overflow: "visible" }}>
      <div className="dashboard-card case-entry-card payment-card flex-1" style={{ overflow: "visible" }}>
        <div className="detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 rounded-t-2xl overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <div>
              <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">รายละเอียดการชำระเงินตามคำพิพากษา</h2>
              <p className="text-[12px] text-slate-500 mt-0.5">กำหนดงวดชำระ ค่างวด และดอกเบี้ยเพื่อใช้คำนวณตารางผ่อนชำระ</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card-content form-section-compact">
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced">
              <div>
                <label className="form-label-styled">วันครบกำหนดงวดแรก <span className="text-red-500">*</span></label>
                <DateField id="first-due-date" value={form.firstDueDate} onChange={(v) => props.onChange("firstDueDate", v)} placeholder="เลือกวันครบกำหนดงวดแรก" disabled={!canEdit} minDate={form.judgmentDate || undefined} error={fieldErrors.firstDueDate} />
                <FieldError message={fieldErrors.firstDueDate} />
              </div>
              <div>
                <label className="form-label-styled flex items-center gap-2">วันครบกำหนดงวดสุดท้าย <span className="auto-badge-soft">AUTO</span></label>
                <DateField id="last-due-date" value={calculateLastDueDate(form, activeJudgmentType)} onChange={() => undefined} placeholder="คำนวณอัตโนมัติ" disabled />
              </div>
              <div>
                <label className="form-label-styled">ดอกเบี้ยเมื่อผิดนัด <span className="text-red-500">*</span></label>
                <input value={form.defaultInterestRate} onFocus={() => props.onFocusPlain("defaultInterestRate")} onChange={(e) => props.onChange("defaultInterestRate", cleanRate(e.target.value))} onBlur={() => props.onRateBlur("defaultInterestRate")} readOnly={!canEdit} disabled={!canEdit} className={inputClass("defaultInterestRate", `text-right ${!canEdit ? "bg-slate-50/50 text-slate-500 cursor-not-allowed" : ""}`)} placeholder="0" type="text" inputMode="decimal" autoComplete="off" />
                <FieldError message={fieldErrors.defaultInterestRate} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced">
              {(["installment1", "installment2", "installment3", "installment4"] as const).map((field, index) => {
                const locked = !canEdit || (defaultJudgment && index > 0);
                return (
                  <div key={field}>
                    <label className="form-label-styled">ค่างวดที่ {index + 1} {index === 0 ? <span className="text-red-500">*</span> : null}</label>
                    <div className="relative">
                      <input value={form[field]} onFocus={() => props.onFocusPlain(field)} onChange={(e) => props.onChange(field, cleanDecimal(e.target.value))} onBlur={() => props.onMoneyBlur(field)} readOnly={locked} disabled={locked} className={inputClass(field, `text-right pr-4 pl-10 ${locked ? "bg-slate-100 text-slate-500 cursor-not-allowed" : ""}`)} placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>
                    </div>
                    <FieldError message={fieldErrors[field]} />
                  </div>
                );
              })}
            </div>
            <div className="helper-panel">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-indigo-500 text-base">info</span>
                <p className="text-xs text-slate-500 leading-5">กดพรีวิวหลังแก้ไขข้อมูลทุกครั้ง เพื่อให้ตารางผ่อนชำระและปุ่มบันทึกตรงกับข้อมูลล่าสุด</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SchedulePreviewPanel({
  scheduleData,
  scheduleView,
  schedulePage,
  loading,
  previewDone,
  stale,
  onViewChange,
  onPageChange,
}: {
  scheduleData: SchedulePreviewData;
  scheduleView: "monthly" | "daily";
  schedulePage: number;
  loading: boolean;
  previewDone: boolean;
  stale: boolean;
  onViewChange: (view: "monthly" | "daily") => void;
  onPageChange: (page: number) => void;
}) {
  const rows = scheduleView === "daily" ? scheduleData.daily : scheduleData.monthly;
  const pageSize = 20;
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const shownRows = scheduleView === "daily" ? rows.slice((schedulePage - 1) * pageSize, schedulePage * pageSize) : rows;
  return (
    <div className="col-span-12">
      <div className="dashboard-card">
        <div className="detail-card-heading px-5 md:px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>table_chart</span>
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">ตารางพรีวิวการผ่อนชำระ</h2>
                <p className="text-[12px] text-slate-500 mt-0.5">ผลคำนวณจากข้อมูลที่กดพรีวิวล่าสุด</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-white/80 p-1 rounded-xl border border-blue-100 shadow-sm">
                {(["monthly", "daily"] as const).map((view) => (
                  <button key={view} type="button" onClick={() => onViewChange(view)} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${scheduleView === view ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
                    {view === "monthly" ? "รายเดือน" : "รายวัน"}
                  </button>
                ))}
              </div>
              {stale ? <div className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-100 text-xs font-bold text-amber-700">กรุณากดพรีวิวใหม่</div> : null}
            </div>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col">
          {loading ? (
            <div className="p-10 text-center text-slate-500 font-semibold">กำลังคำนวณตาราง...</div>
          ) : rows.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2">visibility</span>
              <p className="font-bold">{previewDone ? "ไม่พบข้อมูลตาราง" : "กดพรีวิวเพื่อแสดงตารางผ่อนชำระ"}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-black">
                    <tr>
                      {["วันที่", "งวด", "เงินต้นยกมา", "ชำระ", "ดอกเบี้ยที่ชำระ", "เงินต้นที่ชำระ", "อื่น ๆ", "เงินต้นคงเหลือ", "ดอกเบี้ยรายวัน", "ดอกเบี้ยสะสม"].map((head) => <th key={head} className="px-3 py-3 text-right first:text-left">{head}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {shownRows.map((row, index) => (
                      <tr key={`${row.date || row.due_date || index}-${index}`} className="border-t border-slate-100 hover:bg-slate-50/60">
                        <td className="px-3 py-2 whitespace-nowrap text-slate-700 font-semibold">{fmtDate(row.date || row.due_date as string)}</td>
                        <td className="px-3 py-2 text-right">{String(row.term ?? row.month ?? "-")}</td>
                        {["principal_bf", "payment", "interest_paid", "principal_paid", "other_paid", "principal_bal", "daily_interest", "acc_interest"].map((key) => (
                          <td key={key} className="px-3 py-2 text-right font-medium text-slate-700">{formatMoney(row[key] as string | number | undefined)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
                <span>{scheduleView === "daily" ? `แสดง ${shownRows.length} จาก ${rows.length} รายการ` : `ทั้งหมด ${rows.length} เดือน`}</span>
                {scheduleView === "daily" && pageCount > 1 ? (
                  <div className="flex items-center gap-2">
                    <button type="button" disabled={schedulePage <= 1} onClick={() => onPageChange(schedulePage - 1)} className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40">ก่อนหน้า</button>
                    <span className="font-bold">{schedulePage}/{pageCount}</span>
                    <button type="button" disabled={schedulePage >= pageCount} onClick={() => onPageChange(schedulePage + 1)} className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40">ถัดไป</button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EditHistoryPanel({ edits }: { edits: EditHistoryItem[] }) {
  return (
    <div className="col-span-12">
      <div className="dashboard-card">
        <div className="detail-card-heading px-5 md:px-6 py-4 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-t-2xl overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
            </div>
            <div>
              <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">ประวัติการแก้ไข</h2>
              <p className="text-[12px] text-slate-500 mt-0.5">รายการเปลี่ยนแปลงล่าสุดของบัญชีนี้</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card-content space-y-3">
          {edits.length === 0 ? <p className="text-sm text-slate-400 text-center py-6">ยังไม่มีประวัติการแก้ไข</p> : edits.map((edit) => (
            <div key={edit.id || `${edit.edited_at}-${edit.edited_by_name}`} className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-extrabold text-slate-800">{edit.edited_by_name || "-"}</p>
                <p className="text-xs text-slate-400">{fmtTs(edit.edited_at)}</p>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(edit.changes || {}).map(([field, change]) => (
                  <div key={field} className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2">
                    <p className="text-[11px] font-black text-slate-500">{change.label || field}</p>
                    <p className="text-xs text-slate-600 mt-1 break-words">{String(change.from ?? "-")} → <span className="font-bold text-slate-800">{String(change.to ?? "-")}</span></p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnforcementSection({
  customer,
  role,
  value,
  error,
  submitting,
  onChange,
  onSubmit,
  onOpenRetro,
}: {
  customer: CustomerDetailData | null;
  role: UserRole;
  value: string;
  error?: string;
  submitting: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onOpenRetro: () => void;
}) {
  const showForm = Boolean(customer && ["พิพากษาตามยอม", "พิพากษาฝ่ายเดียว"].includes(customer.case_status) && customer.can_record_enforcement && canRecordEnforcementRole(role));
  const showInfo = Boolean(customer && (["บังคับคดี", "ปิดบัญชี"].includes(customer.case_status) || customer.enforcement_order_no || customer.enforcement_judgment_date));
  if (!showForm && !showInfo) return null;
  return (
    <div className="col-span-12">
      <div className="dashboard-card">
        <div className="detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-rose-50 rounded-t-2xl overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center text-red-600 shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
            </div>
            <div>
              <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">ข้อมูลบังคับคดี</h2>
              <p className="text-[12px] text-slate-500 mt-0.5">บันทึกหรือแสดงหมายบังคับคดีของบัญชีนี้</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card-content form-section-compact">
          {showInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 field-grid-enhanced mb-3">
              <InfoBox label="หมายเลขบังคับคดี" value={customer?.enforcement_order_no || customer?.red_case_no || "-"} />
              <InfoBox label="วันที่ของหมาย" value={fmtDate(customer?.enforcement_judgment_date)} />
              <InfoBox label="บันทึกเมื่อ" value={fmtTs(customer?.enforcement_recorded_at)} />
            </div>
          ) : null}
          {showForm ? (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
              <div>
                <label className="form-label-styled">วันที่ของหมายบังคับคดี <span className="text-red-500">*</span></label>
                <DateField id="enf-judgment-date" value={value} onChange={onChange} placeholder="เลือกวันที่ของหมาย" maxDate={todayIso()} error={error} />
                <FieldError message={error} />
              </div>
              <button type="button" onClick={onSubmit} disabled={submitting} className="btn-primary-modern h-[46px] disabled:opacity-50">{submitting ? "กำลังบันทึก..." : "บันทึกหมายบังคับคดี"}</button>
            </div>
          ) : null}
          <RetroactivePanel type="enforcement" alert={customer?.retroactive_enforcement_alert} role={role} onConfirm={onOpenRetro} />
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function RetroactivePanel({ type, alert, role, onConfirm }: { type: "judgment" | "enforcement"; alert?: RetroactiveAlert | null; role: UserRole; onConfirm: () => void }) {
  const affected = alert?.affected_month_label || alert?.affected_report_month || "-";
  const source = alert?.source_month_label || alert?.source_report_month || "-";
  const marked = Boolean(alert?.marked);
  const hasAlert = Boolean(alert);
  const title = type === "judgment" ? "คำพิพากษาข้ามเดือน" : "บังคับคดีข้ามเดือน";
  const canConfirm = hasAlert && !marked && isAdminRole(role);
  return (
    <div className="sm:col-span-2 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3 mt-3">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>{type === "judgment" ? "gavel" : "warning"}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-extrabold text-slate-800">{title}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${!hasAlert || marked ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"}`}>{!hasAlert ? "ไม่มีรายการย้อนหลัง" : marked ? "แก้แล้ว" : "รอยืนยัน"}</span>
            </div>
            <p className="text-[12px] text-slate-500 mt-1">{!hasAlert ? "ไม่มีรายการที่ต้องยืนยันว่าแก้รายงานย้อนหลัง" : marked ? `ยืนยันแล้วว่าแก้รายงานเดือน ${affected} เรียบร้อย` : alert?.reason || `กรุณาตรวจสอบ/แก้รายงานเดือน ${affected}`}</p>
            <p className="text-[11px] text-slate-400 mt-1">{marked ? `ยืนยันโดย ${alert?.marked_by_name || "-"} วันที่ ${fmtTs(alert?.marked_at)}` : hasAlert ? `วันที่มีผล: ${fmtDate(alert?.effective_date || alert?.enforcement_date)} | เดือนรายงานที่พบ: ${source}` : "รายการนี้ใช้เฉพาะเคสที่มีเงื่อนไขรายงานย้อนหลัง"}</p>
          </div>
        </div>
        <button type="button" onClick={onConfirm} disabled={!canConfirm} title={!hasAlert ? "ไม่มีรายการที่ต้องยืนยัน" : !isAdminRole(role) ? "เฉพาะ Admin เท่านั้นที่ยืนยันได้" : ""} className={`w-full sm:w-[245px] px-4 py-2.5 rounded-xl border bg-white text-xs font-bold transition-all ${canConfirm ? "border-amber-200 text-amber-700 hover:bg-amber-50" : "border-slate-200 text-slate-500 cursor-not-allowed"}`}>
          ยืนยันว่าแก้รายงานย้อนหลังแล้ว
        </button>
      </div>
    </div>
  );
}

function ConfirmReviewModal({
  open,
  form,
  customer,
  activeJudgmentType,
  isSubmitting,
  onClose,
  onConfirm,
}: {
  open: boolean;
  form: CustomerDetailFormState;
  customer: CustomerDetailData | null;
  activeJudgmentType: JudgmentType | CaseStatus;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const items = [
    ["หมายเลขบัญชี", fmtAccNo(customer?.account_no)],
    ["ชื่อ-นามสกุล", customer?.name || "-"],
    ["วันที่ยื่นฟ้อง", fmtDate(form.filingDate)],
    ["วันที่พิพากษา", fmtDate(form.judgmentDate)],
    ["คดีหมายเลขแดงที่", customer?.red_case_no || normalizeCaseNo(form.redCaseNo) || form.redCaseNo || "-"],
    ["ประเภทคำพิพากษา", customer?.case_status === "ยื่นฟ้อง" ? activeJudgmentType || "-" : customer?.case_status || "-"],
    ["หมายเหตุ", form.judgmentNote || "-"],
    ["ยอดหนี้รวม", formatMoney(form.totalDebt)],
    ["เงินต้น", formatMoney(form.principal)],
    ["อัตราดอกเบี้ย/ปี", formatRate(form.interestRate)],
    ["ค่าธรรมเนียมศาล", formatMoney(form.courtFee)],
    ["ค่าทนายความ", formatMoney(form.lawyerFee)],
    ["ยอดหนี้ส่วนต่าง", formatMoney(calculateDiffDebt(form))],
    ["วันครบกำหนดงวดแรก", fmtDate(form.firstDueDate)],
    ["วันครบกำหนดงวดสุดท้าย", fmtDate(calculateLastDueDate(form, activeJudgmentType))],
    ["จำนวนงวดผ่อน", activeJudgmentType === "พิพากษาฝ่ายเดียว" ? "1" : form.installmentCount || "-"],
    ["ดอกเบี้ยผิดนัด", formatRate(form.defaultInterestRate)],
    ["ค่างวดที่ 1", formatMoney(form.installment1)],
    ["ค่างวดที่ 2", formatMoney(activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : form.installment2)],
    ["ค่างวดที่ 3", formatMoney(activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : form.installment3)],
    ["ค่างวดที่ 4", formatMoney(activeJudgmentType === "พิพากษาฝ่ายเดียว" ? 0 : form.installment4)],
  ];
  return (
    <ModalShell open={open} z="z-[210]">
      <div className="absolute inset-0 confirm-review-backdrop" onClick={onClose}></div>
      <div className="confirm-review-panel relative w-full max-w-5xl max-h-[88vh] rounded-[24px] overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between gap-4 bg-white/72">
          <div className="flex items-center gap-4">
            <div className="confirm-review-icon"><span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>fact_check</span></div>
            <div>
              <h3 className="text-xl font-black text-slate-800">ตรวจสอบก่อนบันทึก</h3>
              <p className="text-xs text-slate-500 mt-1">กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="confirm-review-grid cols-3">
            {items.map(([label, value]) => (
              <div key={label} className="confirm-review-item">
                <p className="confirm-review-label">{label}</p>
                <p className="confirm-review-value break-words">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="confirm-review-footer px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-xs font-semibold text-slate-400">ข้อมูลนี้จะถูกส่งไปยัง API หลังจากกดยืนยัน</p>
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="confirm-review-secondary-btn min-w-[96px] h-10 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold transition-all text-sm">แก้ไข</button>
            <button type="button" onClick={onConfirm} disabled={isSubmitting} className="confirm-review-primary-btn min-w-[160px] h-10 px-5 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: '"FILL" 1' }}>save</span>
              {isSubmitting ? "กำลังบันทึก..." : "ยืนยันบันทึก"}
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function AlertModal({ state, onClose }: { state: { open: boolean; type: "warning" | "error" | "info"; title: string; message: string }; onClose: () => void }) {
  const icon = state.type === "error" ? "error" : state.type === "warning" ? "warning" : "info";
  return (
    <ModalShell open={state.open}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[3px]" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-7 flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${state.type === "error" ? "bg-red-50 text-red-600" : state.type === "warning" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
            <span className="material-symbols-outlined text-3xl">{icon}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{state.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">{state.message}</p>
          <button type="button" onClick={onClose} className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm">รับทราบ</button>
        </div>
        <button type="button" onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1"><span className="material-symbols-outlined text-lg">close</span></button>
      </div>
    </ModalShell>
  );
}

function ToastModal({ state, onClose }: { state: { open: boolean; title: string; message: string; type: "success" | "error" }; onClose: () => void }) {
  return (
    <ModalShell open={state.open} z="z-[220]">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 flex flex-col items-center text-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${state.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            <span className="material-symbols-outlined text-3xl">{state.type === "success" ? "check_circle" : "error"}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{state.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">{state.message}</p>
          <button type="button" onClick={onClose} className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl transition-all text-sm">ตกลง</button>
        </div>
      </div>
    </ModalShell>
  );
}

function RetroEnforcementConfirmModal({ open, customer, submitting, onClose, onConfirm }: { open: boolean; customer: CustomerDetailData | null; submitting: boolean; onClose: () => void; onConfirm: () => void }) {
  const alert = customer?.retroactive_enforcement_alert;
  const affected = alert?.affected_month_label || alert?.affected_report_month || "-";
  return (
    <ModalShell open={open} z="z-[320]">
      <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-amber-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-amber-100 bg-amber-50">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>warning</span></div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">ยืนยันว่าแก้รายงานย้อนหลังแล้ว?</h3>
              <p className="text-xs text-slate-500 mt-1">หลังจากยืนยันแล้ว จะไม่สามารถยกเลิกสถานะนี้ได้</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-5 space-y-3 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoBox label="เลขที่บัญชี" value={customer?.account_no || "-"} />
            <InfoBox label="เดือนที่ต้องตรวจสอบ" value={affected} />
          </div>
          <p className="text-slate-600 leading-6">{alert?.reason || `กรุณายืนยันว่าแก้รายงานเดือน ${affected} แล้ว`}</p>
          <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-semibold text-red-600">โปรดกดปุ่มยืนยันเฉพาะเมื่อได้ตรวจสอบหรือแก้รายงานเดือนเก่าเรียบร้อยแล้วเท่านั้น</div>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all">ยกเลิก</button>
          <button type="button" onClick={onConfirm} disabled={submitting} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all disabled:opacity-50">{submitting ? "กำลังบันทึก..." : "ยืนยันว่าแก้รายงานแล้ว"}</button>
        </div>
      </div>
    </ModalShell>
  );
}

export default function CustomerDetailPage() {
  const [role] = useState<UserRole>(() => (sessionStorage.getItem("role") || "") as UserRole);
  const [customer, setCustomer] = useState<CustomerDetailData | null>(null);
  const [originalForm, setOriginalForm] = useState<CustomerDetailFormState | null>(null);
  const [form, setForm] = useState<CustomerDetailFormState>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [previewDone, setPreviewDone] = useState(false);
  const [scheduleData, setScheduleData] = useState<SchedulePreviewData>({ daily: [], monthly: [] });
  const [scheduleView, setScheduleView] = useState<"monthly" | "daily">("monthly");
  const [schedulePage, setSchedulePage] = useState(1);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [alertState, setAlertState] = useState({ open: false, type: "info" as "warning" | "error" | "info", title: "", message: "" });
  const [toastState, setToastState] = useState({ open: false, title: "", message: "", type: "success" as "success" | "error" });
  const [editHistory, setEditHistory] = useState<EditHistoryItem[]>([]);
  const [statusLogs, setStatusLogs] = useState<StatusLog[]>([]);
  const [judgmentTypeOpen, setJudgmentTypeOpen] = useState(false);
  const [enforcementJudgmentDate, setEnforcementJudgmentDate] = useState("");
  const [enforcementError, setEnforcementError] = useState("");
  const [isEnforcementSubmitting, setIsEnforcementSubmitting] = useState(false);
  const [retroEnforcementConfirmOpen, setRetroEnforcementConfirmOpen] = useState(false);
  const [isRetroSubmitting, setIsRetroSubmitting] = useState(false);

  const accountNo = useMemo(() => new URLSearchParams(window.location.search).get("account") || "", []);
  const activeJudgmentType = form.judgmentType || customer?.case_status || "";
  const canEdit = customer ? canEditJudgmentData(role, customer.case_status) : false;
  const hasRecordedRedCaseNo = Boolean((originalForm?.redCaseNo || customer?.red_case_no || "").trim());
  const isChanged = Boolean(originalForm && hasFormChanged(form, originalForm, customer));
  const isPreviewReady = isPreviewFormReady(form, customer);
  const canSubmit = canEdit && previewDone && isChanged && isPreviewReady && !isSubmitting;
  const stalePreview = isChanged && !previewDone;

  const showAlert = useCallback((type: "warning" | "error" | "info", title: string, message: string) => {
    setAlertState({ open: true, type, title, message });
  }, []);

  const showToast = useCallback((type: "success" | "error", title: string, message: string) => {
    setToastState({ open: true, type, title, message });
  }, []);

  const loadEditHistory = useCallback(async () => {
    if (!accountNo) return;
    const res = await fetch(`/api/customers/${accountNo}/edits`);
    const data = await safeJson<{ edits?: EditHistoryItem[] }>(res);
    if (res.ok) setEditHistory(data?.edits || []);
  }, [accountNo]);

  const loadStatusLogs = useCallback(async () => {
    if (!accountNo) return;
    const res = await fetch(`/api/customers/${accountNo}/status-logs`);
    const data = await safeJson<{ logs?: StatusLog[] }>(res);
    if (res.ok) setStatusLogs(data?.logs || []);
  }, [accountNo]);

  const runPreview = useCallback(async (nextForm: CustomerDetailFormState, nextCustomer: CustomerDetailData, manual: boolean) => {
    const activeType = nextForm.judgmentType || nextCustomer.case_status || "";
    if (manual) {
      const errors = validateFormForPreview(nextForm, nextCustomer);
      setFieldErrors(errors);
      if (Object.keys(errors).length) {
        setPreviewDone(false);
        showAlert("warning", "กรุณาตรวจสอบข้อมูล", Object.values(errors)[0] || "กรุณากรอกข้อมูลให้ครบก่อนพรีวิว");
        return;
      }
    }
    setIsPreviewLoading(true);
    try {
      const res = await fetch("/api/schedule/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getCookie("token")}` },
        body: JSON.stringify(buildPreviewPayload(nextForm, activeType)),
      });
      const data = await safeJson<SchedulePreviewData & { error?: string }>(res);
      if (!res.ok) {
        if (manual) showAlert("error", "พรีวิวไม่สำเร็จ", data?.error || "ไม่สามารถคำนวณตารางได้");
        setPreviewDone(false);
        return;
      }
      setScheduleData({ daily: data?.daily || [], monthly: data?.monthly || [] });
      setSchedulePage(1);
      setPreviewDone(manual);
    } catch {
      if (manual) showAlert("error", "เชื่อมต่อไม่ได้", "ไม่สามารถเชื่อมต่อ Server ได้");
      setPreviewDone(false);
    } finally {
      setIsPreviewLoading(false);
    }
  }, [showAlert]);

  const loadCustomerData = useCallback(async () => {
    if (!role) {
      window.location.href = "/login";
      return;
    }
    if (!accountNo) {
      window.location.href = getSafeReturnTo("/customer-list");
      return;
    }
    setIsLoadingCustomer(true);
    try {
      const res = await fetch(`/api/customers/${accountNo}`);
      if (!res.ok) {
        window.location.href = getSafeReturnTo("/customer-list");
        return;
      }
      const data = (await res.json()) as CustomerDetailData;
      const nextForm = customerToForm(data);
      setCustomer(data);
      setForm(nextForm);
      setOriginalForm(nextForm);
      setPreviewDone(false);
      setFieldErrors({});
      setEnforcementJudgmentDate("");
      await Promise.all([loadStatusLogs(), loadEditHistory()]);
      if (isPreviewFormReady(nextForm, data)) await runPreview(nextForm, data, false);
      else setScheduleData({ daily: [], monthly: [] });
    } catch {
      showAlert("error", "โหลดข้อมูลไม่สำเร็จ", "ไม่สามารถโหลดข้อมูลลูกค้าได้");
    } finally {
      setIsLoadingCustomer(false);
    }
  }, [accountNo, loadEditHistory, loadStatusLogs, role, runPreview, showAlert]);

  useEffect(() => {
    void loadCustomerData();
  }, [loadCustomerData]);

  const updateForm = (field: keyof CustomerDetailFormState, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "firstDueDate" || field === "installmentCount" || field === "judgmentType") {
        next.lastDueDate = calculateLastDueDate(next, next.judgmentType || customer?.case_status || "");
      }
      return next;
    });
    setPreviewDone(false);
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSelectJudgmentType = (value: JudgmentType) => {
    setForm((prev) => {
      const next = { ...prev, judgmentType: value };
      if (value === "พิพากษาฝ่ายเดียว") {
        next.installmentCount = "1";
        next.installment2 = "0.00";
        next.installment3 = "0.00";
        next.installment4 = "0.00";
      }
      next.lastDueDate = calculateLastDueDate(next, value || customer?.case_status || "");
      return next;
    });
    setJudgmentTypeOpen(false);
    setPreviewDone(false);
    setFieldErrors((prev) => ({ ...prev, judgmentType: "", installmentCount: "", installment2: "", installment3: "", installment4: "" }));
  };

  const handleMoneyBlur = (field: keyof CustomerDetailFormState) => {
    if (!moneyFields.has(field)) return;
    setForm((prev) => ({ ...prev, [field]: formatMoney(prev[field]) }));
  };

  const handleRateBlur = (field: keyof CustomerDetailFormState) => {
    setForm((prev) => ({ ...prev, [field]: formatRate(prev[field]) }));
  };

  const handleFocusPlain = (field: keyof CustomerDetailFormState) => {
    setForm((prev) => ({ ...prev, [field]: String(prev[field] || "").replace(/,/g, "").replace("%", "") }));
  };

  const handlePreview = () => {
    if (!customer) return;
    void runPreview(form, customer, true);
  };

  const handleSubmitClick = () => {
    if (!customer) return;
    if (!canEdit) {
      showAlert("warning", "ไม่มีสิทธิ์แก้ไข", editPermissionMessage(customer.case_status));
      return;
    }
    if (!previewDone) {
      showAlert("warning", "กรุณากดพรีวิวก่อนบันทึก", "ข้อมูลที่แก้ไขต้องผ่านการพรีวิวก่อนจึงจะบันทึกได้");
      return;
    }
    const errors = validateFormForSubmit(form, customer);
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      showAlert("warning", "กรุณาตรวจสอบข้อมูล", Object.values(errors)[0] || "กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!customer) return;
    setIsSubmitting(true);
    try {
      const payload = buildSubmitPayload(form, customer, activeJudgmentType);
      const isNewJudgment = customer.case_status === "ยื่นฟ้อง" && form.judgmentType;
      const res = await fetch(isNewJudgment ? `/api/customers/${accountNo}/judgment` : `/api/customers/${accountNo}`, {
        method: isNewJudgment ? "PATCH" : "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getCookie("token")}` },
        body: JSON.stringify(isNewJudgment ? { ...payload, judgment_type: form.judgmentType } : payload),
      });
      const data = await safeJson<{ message?: string; error?: string }>(res);
      if (!res.ok) {
        showAlert("error", "บันทึกไม่สำเร็จ", data?.error || "เกิดข้อผิดพลาด");
        return;
      }
      setIsConfirmOpen(false);
      setPreviewDone(false);
      showToast("success", "บันทึกสำเร็จ", data?.message || "อัพเดทข้อมูลสำเร็จ");
      await loadCustomerData();
    } catch {
      showAlert("error", "เชื่อมต่อไม่ได้", "ไม่สามารถเชื่อมต่อ Server ได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitEnforcement = async () => {
    if (!customer) return;
    if (!canRecordEnforcementRole(role)) {
      showAlert("warning", "ไม่สามารถบันทึกหมายบังคับคดีได้", "ฟังก์ชันนี้อนุญาตเฉพาะ Admin และ User เท่านั้น");
      return;
    }
    if (!enforcementJudgmentDate) {
      setEnforcementError("ต้องเลือกวันที่ของหมายบังคับคดี");
      return;
    }
    if (enforcementJudgmentDate > todayIso()) {
      setEnforcementError("วันที่ของหมายบังคับคดีต้องไม่เป็นวันที่ในอนาคต");
      return;
    }
    setIsEnforcementSubmitting(true);
    try {
      const res = await fetch(`/api/customers/${accountNo}/enforcement`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getCookie("token")}` },
        body: JSON.stringify({ enforcement_judgment_date: enforcementJudgmentDate }),
      });
      const data = await safeJson<{ message?: string; error?: string }>(res);
      if (!res.ok) {
        showAlert("error", "เกิดข้อผิดพลาด", data?.error || "ไม่สามารถบันทึกได้");
        return;
      }
      showToast("success", "บันทึกสำเร็จ", data?.message || "บันทึกหมายบังคับคดีเรียบร้อย");
      await loadCustomerData();
    } catch {
      showAlert("error", "เชื่อมต่อไม่ได้", "ไม่สามารถเชื่อมต่อ Server ได้");
    } finally {
      setIsEnforcementSubmitting(false);
    }
  };

  const handleConfirmRetroJudgment = async () => {
    if (!customer?.retroactive_judgment_alert) return;
    if (!isAdminRole(role)) {
      showAlert("warning", "ไม่มีสิทธิ์ยืนยัน", "เฉพาะ Admin เท่านั้นที่ยืนยันว่าแก้รายงานย้อนหลังแล้วได้");
      return;
    }
    setIsRetroSubmitting(true);
    try {
      const alert = customer.retroactive_judgment_alert;
      const res = await fetch(`/api/customers/${accountNo}/retroactive-report-fix`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getCookie("token")}` },
        body: JSON.stringify({ reason_code: alert.reason_code, affected_report_month: alert.affected_report_month, note: "แก้รายงานย้อนหลังแล้ว" }),
      });
      const data = await safeJson<{ message?: string; error?: string }>(res);
      if (!res.ok) {
        showAlert("error", "ไม่สามารถยืนยันได้", data?.error || "เกิดข้อผิดพลาด");
        return;
      }
      showToast("success", "บันทึกสำเร็จ", data?.message || "ยืนยันว่าแก้รายงานย้อนหลังแล้ว");
      await loadCustomerData();
    } catch {
      showAlert("error", "เชื่อมต่อไม่ได้", "ไม่สามารถเชื่อมต่อ Server ได้");
    } finally {
      setIsRetroSubmitting(false);
    }
  };

  const handleConfirmRetroEnforcement = async () => {
    if (!customer?.retroactive_enforcement_alert) return;
    setIsRetroSubmitting(true);
    try {
      const res = await fetch(`/api/customers/${accountNo}/retroactive-enforcement-fix`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getCookie("token")}` },
        body: JSON.stringify({ note: "แก้รายงานย้อนหลังแล้ว" }),
      });
      const data = await safeJson<{ message?: string; error?: string }>(res);
      if (!res.ok) {
        showAlert("error", "ไม่สามารถยืนยันได้", data?.error || "เกิดข้อผิดพลาด");
        return;
      }
      setRetroEnforcementConfirmOpen(false);
      showToast("success", "บันทึกสำเร็จ", data?.message || "ยืนยันว่าแก้รายงานย้อนหลังแล้ว");
      await loadCustomerData();
    } catch {
      showAlert("error", "เชื่อมต่อไม่ได้", "ไม่สามารถเชื่อมต่อ Server ได้");
    } finally {
      setIsRetroSubmitting(false);
    }
  };

  return (
    <AppLayout activePage="customer-list">
      <div className="customer-detail-page min-h-screen bg-surface text-on-surface font-body">
        <main className="main-content p-4 md:p-6 pb-28">
          <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
            <AccountSummaryCard customer={customer} />
            <StatusProgressBar customer={customer} logs={statusLogs} />
            {isLoadingCustomer ? (
              <div className="col-span-12 dashboard-card p-8 text-center text-slate-500 font-bold">กำลังโหลดข้อมูล...</div>
            ) : (
              <>
                {!canEdit && customer ? <div className="col-span-12 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">{editPermissionMessage(customer.case_status)}</div> : null}
                <EnforcementSection
                  customer={customer}
                  role={role}
                  value={enforcementJudgmentDate}
                  error={enforcementError}
                  submitting={isEnforcementSubmitting}
                  onChange={(value) => { setEnforcementJudgmentDate(value); setEnforcementError(""); }}
                  onSubmit={handleSubmitEnforcement}
                  onOpenRetro={() => {
                    if (!isAdminRole(role)) showAlert("warning", "ไม่มีสิทธิ์ยืนยัน", "เฉพาะ Admin เท่านั้นที่ยืนยันว่าแก้รายงานย้อนหลังแล้วได้");
                    else setRetroEnforcementConfirmOpen(true);
                  }}
                />
                <JudgmentDetailsForm
                  customer={customer}
                  form={form}
                  fieldErrors={fieldErrors}
                  role={role}
                  activeJudgmentType={activeJudgmentType}
                  canEdit={canEdit}
                  hasRecordedRedCaseNo={hasRecordedRedCaseNo}
                  judgmentTypeOpen={judgmentTypeOpen}
                  onToggleJudgmentType={() => setJudgmentTypeOpen((open) => !open)}
                  onSelectJudgmentType={handleSelectJudgmentType}
                  onChange={updateForm}
                  onMoneyBlur={handleMoneyBlur}
                  onRateBlur={handleRateBlur}
                  onFocusPlain={handleFocusPlain}
                  onConfirmRetroJudgment={handleConfirmRetroJudgment}
                />
                <PaymentDetailsForm
                  form={form}
                  fieldErrors={fieldErrors}
                  canEdit={canEdit}
                  activeJudgmentType={activeJudgmentType}
                  onChange={updateForm}
                  onMoneyBlur={handleMoneyBlur}
                  onRateBlur={handleRateBlur}
                  onFocusPlain={handleFocusPlain}
                />
                <EditHistoryPanel edits={editHistory} />
                <SchedulePreviewPanel
                  scheduleData={scheduleData}
                  scheduleView={scheduleView}
                  schedulePage={schedulePage}
                  loading={isPreviewLoading}
                  previewDone={previewDone}
                  stale={stalePreview}
                  onViewChange={(view) => { setScheduleView(view); setSchedulePage(1); }}
                  onPageChange={setSchedulePage}
                />
              </>
            )}
          </div>
        </main>
        <footer className="detail-footer">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center">
            <div className="text-xs text-slate-400 hidden md:block">{roleLabels[role]} Terminal</div>
            <div className="flex flex-wrap justify-end gap-4">
              <a href={getSafeReturnTo("/customer-list")} className="btn-secondary-modern">Cancel</a>
              <button id="preview-btn" type="button" onClick={handlePreview} disabled={!canEdit || isPreviewLoading} className="btn-primary-modern disabled:opacity-40 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined text-base">visibility</span>
                {isPreviewLoading ? "กำลังพรีวิว..." : "พรีวิว"}
              </button>
              <button id="submit-btn" type="button" disabled={!canSubmit} onClick={handleSubmitClick} className="btn-primary-modern px-6 disabled:opacity-40 disabled:cursor-not-allowed">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">save</span>
                  {isSubmitting ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
                </span>
              </button>
            </div>
          </div>
        </footer>
        <ConfirmReviewModal open={isConfirmOpen} form={form} customer={customer} activeJudgmentType={activeJudgmentType} isSubmitting={isSubmitting} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmSubmit} />
        <AlertModal state={alertState} onClose={() => setAlertState((state) => ({ ...state, open: false }))} />
        <ToastModal state={toastState} onClose={() => setToastState((state) => ({ ...state, open: false }))} />
        <RetroEnforcementConfirmModal open={retroEnforcementConfirmOpen} customer={customer} submitting={isRetroSubmitting} onClose={() => setRetroEnforcementConfirmOpen(false)} onConfirm={handleConfirmRetroEnforcement} />
        {isRetroSubmitting && !retroEnforcementConfirmOpen ? <div className="fixed bottom-24 right-6 z-[100] rounded-xl bg-slate-900 text-white text-xs font-bold px-4 py-3 shadow-xl">กำลังบันทึกการยืนยัน...</div> : null}
      </div>
    </AppLayout>
  );
}
