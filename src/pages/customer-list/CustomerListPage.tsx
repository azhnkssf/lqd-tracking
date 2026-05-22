import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';

type Role = 'user' | 'admin' | 'superadmin' | '';

type Customer = {
  id?: number;
  account_no?: string;
  account?: string;
  name?: string;
  case_status?: string;
  display_payment_status?: string;
  computed_payment_status?: string;
  payment_status?: string;
  status?: string;
  filing_date?: string;
  filing_capital?: number;
  default_date?: string;
  pre_filing_dpd_days?: number;
  filing_note?: string;
  black_case_no?: string;
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
  enforcement_order_no?: string;
  enforcement_judgment_date?: string;
  enforcement_received_date?: string;
  enforcement_recorded_at?: string;
  can_record_enforcement?: boolean;
  has_enforcement_order?: boolean;
  last_payment_date?: string;
  latest_payment_date?: string;
  last_payment_amount?: number;
  latest_payment_amount?: number;
  remaining_debt?: number;
  latest_snapshot?: {
    remaining_debt_raw?: number;
    outstanding_raw?: number;
    outstanding?: number;
    dpd_days?: number;
  };
};

type Summary = {
  total_value?: number;
  active_count?: number;
  case_counts?: Record<string, number>;
};

type Filters = {
  caseStatuses: string[];
  paymentStatuses: string[];
  dateField: string;
  dateFrom: string;
  dateTo: string;
  outstandingMin: string;
  outstandingMax: string;
};

type AddForm = {
  account_no: string;
  black_case_no: string;
  filing_date: string;
  default_date: string;
  filing_capital: string;
  name: string;
  pre_filing_dpd_days: string;
  filing_note: string;
};

const CASE_STATUSES = ['ยื่นฟ้อง', 'พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว', 'บังคับคดี', 'ปิดบัญชี'];
const PAYMENT_STATUSES = ['ค้างชำระ', 'ชำระปกติ', 'ยังไม่ถึงกำหนด', 'ไม่มีแผนชำระ', 'ชำระครบแล้ว'];
const DATE_FIELDS = [
  { value: 'due', label: 'วันครบกำหนดงวดแรก' },
  { value: 'nextDue', label: 'วันครบกำหนดถัดไป' },
  { value: 'filingDate', label: 'วันที่ยื่นฟ้อง' },
  { value: 'judgmentDate', label: 'วันที่พิพากษา' },
  { value: 'lastPaymentDate', label: 'วันที่ชำระล่าสุด' },
];

function emptyFilters(): Filters {
  return {
    caseStatuses: [],
    paymentStatuses: [],
    dateField: 'due',
    dateFrom: '',
    dateTo: '',
    outstandingMin: '',
    outstandingMax: '',
  };
}

function emptyAddForm(): AddForm {
  return {
    account_no: '',
    black_case_no: '',
    filing_date: '',
    default_date: '',
    filing_capital: '',
    name: '',
    pre_filing_dpd_days: '',
    filing_note: '',
  };
}

function getCookie(name: string) {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1] || '';
}

async function jsonOrThrow(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.message || 'เกิดข้อผิดพลาด');
  return data;
}

function accountOf(row: Customer) {
  return row.account_no || row.account || '';
}

function caseStatusOf(row: Customer) {
  return row.case_status || '';
}

function paymentStatusOf(row: Customer) {
  if (caseStatusOf(row) === 'ปิดบัญชี') return 'ชำระครบแล้ว';
  if (caseStatusOf(row) === 'ยื่นฟ้อง') return 'ไม่มีแผนชำระ';
  const value = row.display_payment_status || row.computed_payment_status || row.payment_status || row.status || '-';
  return value === 'จ่ายปกติ' ? 'ชำระปกติ' : value;
}

function fmtAccNo(value?: string) {
  const s = String(value || '');
  return s.length === 12 ? `${s.slice(0, 4)}-${s.slice(4, 8)}-${s.slice(8, 12)}` : s || '-';
}

function fmtDate(value?: string) {
  if (!value) return '-';
  const [y, m, d] = String(value).slice(0, 10).split('-');
  return y && m && d ? `${d}/${m}/${y}` : '-';
}

function fmtTimestamp(value?: string) {
  return value ? fmtDate(String(value).slice(0, 10)) : '-';
}

function fmtMoney(value?: number | string, compact = false) {
  const num = Number(value || 0);
  if (!num) return '฿0.00';
  if (compact && Math.abs(num) >= 1_000_000) return `฿${(num / 1_000_000).toFixed(2)}M`;
  return `฿${num.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtPct(value?: number | string) {
  const num = Number(value || 0);
  return num ? `${num.toLocaleString('th-TH', { maximumFractionDigits: 4 })}%` : '-';
}

function getInitials(name = '') {
  const leadingVowels = ['โ', 'ไ', 'ใ', 'เ', 'แ'];
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const initial = (word?: string) => {
    if (!word) return '';
    return leadingVowels.includes(word.charAt(0)) && word.length > 1 ? word.charAt(1) : word.charAt(0);
  };
  return parts.length >= 2 ? `${initial(parts[0])}${initial(parts[parts.length - 1])}` : initial(parts[0]) || '-';
}

function debtBaselineLabel(row: Customer) {
  return caseStatusOf(row) === 'ยื่นฟ้อง' || !row.judgment_date ? 'ยอดตามยื่นฟ้อง' : 'ยอดตามคำพิพากษา';
}

function debtBaselineAmount(row: Customer) {
  return caseStatusOf(row) === 'ยื่นฟ้อง' || !row.judgment_date
    ? Number(row.filing_capital || 0)
    : Number(row.total_debt || 0);
}

function debtDisplayAmount(row: Customer) {
  if (caseStatusOf(row) === 'ปิดบัญชี') return 0;
  if (caseStatusOf(row) === 'ยื่นฟ้อง' || !row.judgment_date) return Number(row.filing_capital || 0);
  const snap = row.latest_snapshot || {};
  return Number(snap.remaining_debt_raw ?? row.remaining_debt ?? snap.outstanding_raw ?? snap.outstanding ?? row.total_debt ?? 0);
}

function currentInstallmentAmount(row: Customer) {
  return Number(row.installment_1 || row.installment_2 || row.installment_3 || row.installment_4 || 0);
}

function latestPaymentDate(row: Customer) {
  return row.last_payment_date || row.latest_payment_date || '';
}

function latestPaymentAmount(row: Customer) {
  return row.last_payment_amount ?? row.latest_payment_amount ?? 0;
}

function dpdDays(row: Customer) {
  return Number(row.latest_snapshot?.dpd_days || 0);
}

function validateAddForm(form: AddForm) {
  const accountNo = form.account_no.trim();
  const name = form.name.trim();
  const filingCapital = form.filing_capital.replace(/,/g, '').trim();
  const dpd = form.pre_filing_dpd_days.trim();
  const today = new Date().toISOString().slice(0, 10);
  if (!/^\d{12}$/.test(accountNo)) return 'เลขที่บัญชีต้องเป็นตัวเลข 12 หลัก';
  if (!form.black_case_no.trim()) return 'กรุณากรอกคดีหมายเลขดำที่';
  if (!form.filing_date) return 'กรุณาเลือกวันที่ยื่นฟ้อง';
  if (!form.default_date) return 'กรุณาเลือกวันที่ผิดนัดชำระก่อนฟ้อง';
  if (form.filing_date > today) return 'วันที่ยื่นฟ้องต้องไม่เป็นวันที่ในอนาคต';
  if (form.default_date > today) return 'วันที่ผิดนัดชำระก่อนฟ้องต้องไม่เป็นวันที่ในอนาคต';
  if (form.default_date > form.filing_date) return 'วันที่ผิดนัดชำระก่อนฟ้องต้องไม่มากกว่าวันที่ยื่นฟ้อง';
  if (!/^\d+(\.\d{1,2})?$/.test(filingCapital) || Number(filingCapital) <= 0) return 'ทุนทรัพย์ที่ฟ้องต้องเป็นตัวเลขมากกว่า 0 และมีทศนิยมได้สูงสุด 2 ตำแหน่ง';
  if (!name) return 'กรุณากรอกชื่อ-นามสกุล';
  if (!/^[\u0E00-\u0E7Fa-zA-Z0-9\s.\-()]+$/.test(name)) return 'ชื่อ-นามสกุล/ชื่อบริษัทมีอักขระที่ไม่อนุญาต';
  if (!/^\d+$/.test(dpd) || Number(dpd) <= 0) return 'DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วันต้องเป็นจำนวนเต็มมากกว่า 0';
  if (form.filing_note.length > 100) return 'หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร';
  return '';
}

function StatusBadge({ text, tone }: { text?: string; tone: 'red' | 'amber' | 'emerald' | 'blue' | 'slate' | 'indigo' }) {
  const tones = {
    red: 'bg-red-50 text-red-800 border-red-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    indigo: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  };
  return <span className={`status-badge ${tones[tone]}`}>{text || '-'}</span>;
}

function caseTone(status: string): 'red' | 'amber' | 'emerald' | 'blue' | 'slate' {
  if (status === 'ยื่นฟ้อง') return 'blue';
  if (status === 'พิพากษาตามยอม') return 'emerald';
  if (status === 'พิพากษาฝ่ายเดียว') return 'amber';
  if (status === 'บังคับคดี') return 'red';
  return 'slate';
}

function paymentTone(status: string): 'red' | 'amber' | 'emerald' | 'blue' | 'slate' | 'indigo' {
  if (status === 'ค้างชำระ') return 'red';
  if (status === 'ชำระปกติ' || status === 'จ่ายปกติ') return 'emerald';
  if (status === 'ยังไม่ถึงกำหนด' || status === 'ยังไม่เริ่มชำระ') return 'blue';
  if (status === 'ชำระครบแล้ว') return 'indigo';
  return 'slate';
}

function readFiltersFromUrl(params: URLSearchParams): Filters {
  return {
    caseStatuses: (params.get('case_statuses') || '').split(',').filter(Boolean),
    paymentStatuses: (params.get('payment_statuses') || '').split(',').filter(Boolean),
    dateField: params.get('date_field') || 'due',
    dateFrom: params.get('date_from') || '',
    dateTo: params.get('date_to') || '',
    outstandingMin: params.get('outstanding_min') || '',
    outstandingMax: params.get('outstanding_max') || '',
  };
}

function safePerPage(value: string | null) {
  const num = Number(value || 25);
  return [10, 25, 50].includes(num) ? num : 25;
}

export default function CustomerListPage() {
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialPageRef = useRef(Math.max(1, Number(initialParams.get('page') || 1)));
  const initialLoadRef = useRef(true);
  const [role] = useState<Role>((sessionStorage.getItem('role') || '') as Role);
  const [displayName] = useState(sessionStorage.getItem('display_name') || '');
  const [rows, setRows] = useState<Customer[]>([]);
  const [summary, setSummary] = useState<Summary>({});
  const [search, setSearch] = useState(initialParams.get('q') || '');
  const [caseFilter, setCaseFilter] = useState(initialParams.get('case_status') || '');
  const [filters, setFilters] = useState<Filters>(() => readFiltersFromUrl(initialParams));
  const [draftFilters, setDraftFilters] = useState<Filters>(() => readFiltersFromUrl(initialParams));
  const [page, setPage] = useState(initialPageRef.current);
  const [perPage, setPerPage] = useState(() => safePerPage(initialParams.get('per_page')));
  const [totalRows, setTotalRows] = useState(0);
  const [sortField, setSortField] = useState(initialParams.get('sort_by') || '');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(initialParams.get('sort_dir') === 'asc' ? 'asc' : 'desc');
  const [expandedAccount, setExpandedAccount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [addForm, setAddForm] = useState<AddForm>(emptyAddForm);
  const [addError, setAddError] = useState('');
  const [savingAdd, setSavingAdd] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showRefreshingModal, setShowRefreshingModal] = useState(false);
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [checkerDateFrom, setCheckerDateFrom] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10));
  const [checkerDateTo, setCheckerDateTo] = useState(() => new Date().toISOString().slice(0, 10));
  const requestIdRef = useRef(0);
  const refreshModalTimerRef = useRef<number | null>(null);

  const activeFilterCount = filters.caseStatuses.length + filters.paymentStatuses.length
    + (filters.dateFrom || filters.dateTo ? 1 : 0)
    + (filters.outstandingMin || filters.outstandingMax ? 1 : 0);

  const totalPages = Math.max(1, Math.ceil(totalRows / perPage));
  const pageFrom = totalRows === 0 ? 0 : (page - 1) * perPage + 1;
  const pageTo = Math.min(page * perPage, totalRows);

  const loadData = useCallback(async (nextPage = 1) => {
    if (!role) {
      window.location.href = '/login';
      return;
    }
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setPage(nextPage);
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(nextPage), per_page: String(perPage) });
      const keyword = search.trim();
      if (keyword) {
        const accountKeyword = keyword.replace(/[-\s]/g, '');
        if (/^\d+$/.test(accountKeyword)) params.append('account_no', accountKeyword);
        else params.append('name', keyword);
      }
      if (caseFilter) params.append('case_status', caseFilter);
      if (filters.caseStatuses.length) params.append('case_statuses', filters.caseStatuses.join(','));
      if (filters.paymentStatuses.length) params.append('payment_statuses', filters.paymentStatuses.join(','));
      if (filters.dateFrom || filters.dateTo) {
        params.append('date_field', filters.dateField || 'due');
        if (filters.dateFrom) params.append('date_from', filters.dateFrom);
        if (filters.dateTo) params.append('date_to', filters.dateTo);
      }
      if (filters.outstandingMin) params.append('outstanding_min', filters.outstandingMin);
      if (filters.outstandingMax) params.append('outstanding_max', filters.outstandingMax);
      if (sortField) {
        params.append('sort_by', sortField);
        params.append('sort_dir', sortDir);
      }
      syncCustomerListUrl(params);
      const res = await fetch(`/api/customers?${params}`, {
        headers: { Authorization: `Bearer ${getCookie('token')}` },
      });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      const data = await jsonOrThrow(res);
      if (requestId !== requestIdRef.current) return;
      setRows(data.data || []);
      setSummary(data.summary || {});
      setTotalRows(Number(data.total || 0));
      setPage(Number(data.page || nextPage));
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err instanceof Error ? err.message : 'ไม่สามารถโหลดข้อมูลได้');
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [caseFilter, filters, perPage, role, search, sortDir, sortField]);

  useEffect(() => {
    const nextPage = initialLoadRef.current ? initialPageRef.current : 1;
    initialLoadRef.current = false;
    loadData(nextPage);
    // Search is intentionally excluded: the old page searches only after pressing Search/Enter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseFilter, filters, perPage, sortField, sortDir]);

  useEffect(() => {
    const warningDays = sessionStorage.getItem('password_warning_days');
    if (warningDays && !sessionStorage.getItem('password_warning_seen')) {
      sessionStorage.setItem('password_warning_seen', '1');
      window.setTimeout(() => alert(`รหัสผ่านของคุณจะหมดอายุในอีก ${warningDays} วัน กรุณาเปลี่ยนรหัสผ่านก่อนถึงกำหนด`), 300);
    }
  }, []);

  const kpis = useMemo(() => {
    const counts = summary.case_counts || {};
    const all = counts['ทั้งหมด'] ?? summary.active_count ?? totalRows;
    return [
      { key: 'all', label: 'ยอดรวมทั้งหมด', sub: 'Total Base', count: all, status: '', icon: 'groups', color: 'indigo' },
      { key: 'filing', label: 'ขั้นตอนยื่นฟ้อง', sub: 'Filing', count: counts['ยื่นฟ้อง'] || 0, status: 'ยื่นฟ้อง', icon: 'gavel', color: 'violet' },
      { key: 'consent', label: 'พิจารณาตามยอม', sub: 'Consent', count: counts['พิพากษาตามยอม'] || 0, status: 'พิพากษาตามยอม', icon: 'handshake', color: 'emerald' },
      { key: 'default', label: 'พิจารณาฝ่ายเดียว', sub: 'Default', count: counts['พิพากษาฝ่ายเดียว'] || 0, status: 'พิพากษาฝ่ายเดียว', icon: 'balance', color: 'amber' },
      { key: 'enforcement', label: 'เข้าสู่บังคับคดี', sub: 'Enforcement', count: counts['บังคับคดี'] || 0, status: 'บังคับคดี', icon: 'assignment', color: 'red' },
      { key: 'closed', label: 'ปิดบัญชี', sub: 'Closed', count: counts['ปิดบัญชี'] || 0, status: 'ปิดบัญชี', icon: 'lock', color: 'slate' },
    ];
  }, [summary, totalRows]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${getCookie('token')}` } }).catch(() => undefined);
    sessionStorage.clear();
    window.location.href = '/login';
  }

  function syncCustomerListUrl(params: URLSearchParams) {
    const urlParams = new URLSearchParams(params);
    const keyword = search.trim();
    urlParams.delete('account_no');
    urlParams.delete('name');
    if (keyword) urlParams.set('q', keyword);
    else urlParams.delete('q');
    if (Number(urlParams.get('page') || 1) === 1) urlParams.delete('page');
    if (Number(urlParams.get('per_page') || 25) === 25) urlParams.delete('per_page');
    const query = urlParams.toString();
    window.history.replaceState(null, '', query ? `/customer-list?${query}` : '/customer-list');
  }

  function customerListReturnTo() {
    return `${window.location.pathname}${window.location.search}` || '/customer-list';
  }

  function handleSort(field: string) {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  function changeCaseFilter(status: string) {
    if (caseFilter === status) return;
    setCaseFilter(status);
  }

  function clearSearchAndFilters() {
    setSearch('');
    setCaseFilter('');
    setFilters(emptyFilters());
    setDraftFilters(emptyFilters());
    setSortField('');
    setSortDir('desc');
  }

  async function copyAccountNo(accountNo: string) {
    const raw = accountNo.replace(/\D/g, '');
    if (!raw) return;
    await navigator.clipboard?.writeText(raw).catch(() => undefined);
    setCopyToast(true);
    window.setTimeout(() => setCopyToast(false), 1600);
  }

  async function handleRefresh() {
    if (refreshing) return;
    setRefreshing(true);
    refreshModalTimerRef.current = window.setTimeout(() => setShowRefreshingModal(true), 220);
    try {
      await jsonOrThrow(await fetch('/api/customers/cache/refresh-all', {
        method: 'POST',
        headers: { Authorization: `Bearer ${getCookie('token')}` },
      }));
      await loadData(page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'รีเฟรชไม่สำเร็จ');
    } finally {
      if (refreshModalTimerRef.current) {
        window.clearTimeout(refreshModalTimerRef.current);
        refreshModalTimerRef.current = null;
      }
      setShowRefreshingModal(false);
      setRefreshing(false);
    }
  }

  function handleCheckerExport() {
    window.location.href = `/api/customers/checker-export?date_from=${encodeURIComponent(checkerDateFrom)}&date_to=${encodeURIComponent(checkerDateTo)}`;
  }

  function startAdd() {
    setAddForm(emptyAddForm());
    setAddError('');
    setReviewOpen(false);
    setAddOpen(true);
  }

  function handleAddReview(e: FormEvent) {
    e.preventDefault();
    const msg = validateAddForm(addForm);
    setAddError(msg);
    if (!msg) {
      setAddOpen(false);
      setReviewOpen(true);
    }
  }

  async function doAddSubmit() {
    setSavingAdd(true);
    try {
      await jsonOrThrow(await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify({
          account_no: addForm.account_no.trim(),
          black_case_no: addForm.black_case_no.trim(),
          name: addForm.name.trim(),
          filing_date: addForm.filing_date,
          filing_capital: addForm.filing_capital.replace(/,/g, '').trim(),
          default_date: addForm.default_date,
          pre_filing_dpd_days: Number(addForm.pre_filing_dpd_days),
          filing_note: addForm.filing_note.trim(),
        }),
      }));
      setReviewOpen(false);
      setAddForm(emptyAddForm());
      await loadData(page);
    } catch (err) {
      setReviewOpen(false);
      setAddOpen(true);
      setAddError(err instanceof Error ? err.message : 'บันทึกข้อมูลไม่สำเร็จ');
    } finally {
      setSavingAdd(false);
    }
  }

  async function confirmDelete() {
    if (!deleteAccount) return;
    try {
      await jsonOrThrow(await fetch(`/api/customers/${deleteAccount}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getCookie('token')}` },
      }));
      setDeleteAccount('');
      await loadData(page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'ลบข้อมูลไม่สำเร็จ');
    }
  }

  return (
    <div className="customer-list-page min-h-screen selection:bg-indigo-100 selection:text-primary bg-surface text-on-surface font-body">
      <Navbar role={role} displayName={displayName} />
      <Sidebar role={role} activePage="customer-list" onLogout={handleLogout} />

      <main className="customer-list-main md:ml-56 pt-20 min-h-screen pb-12">
        <div className="px-6 md:px-8">
          <div className="max-w-[1600px] mx-auto">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-indigo-100/50">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-primary border border-white flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>groups</span>
                </div>
                <div className="min-w-0">
                  <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tight">Customer Lists</h1>
                  <p className="text-slate-500 text-sm mt-1">จัดการ ค้นหา และติดตามลูกหนี้ด้วยสถานะคำพิพากษาทั้งหมดในระบบ</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 self-start sm:self-center">
                <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-3 shadow-md shadow-slate-200/50">
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-extrabold leading-none mb-1.5">มูลค่ารวม</p>
                  <span className="text-lg font-headline text-primary font-extrabold leading-none">{fmtMoney(summary.total_value || 0)}</span>
                </div>
                <div className="rounded-[28px] border border-primary bg-primary px-6 py-3 shadow-md shadow-indigo-200/60">
                  <p className="text-[11px] text-blue-100 uppercase tracking-widest font-extrabold leading-none mb-1.5">Active Cases</p>
                  <span className="text-lg font-headline text-white font-extrabold leading-none">{Number(summary.active_count || 0).toLocaleString('th-TH')}</span>
                </div>
              </div>
            </header>
          </div>
        </div>

        <div className="px-6 md:px-8 mt-6">
          <div className="max-w-[1600px] mx-auto mb-5">
            <div className="kpi-panel">
              <div className="kpi-grid">
                {kpis.map(kpi => {
                  const total = Number(kpis[0]?.count || 0);
                  const percent = kpi.key === 'all' ? 100 : total > 0 ? Math.round((Number(kpi.count || 0) / total) * 100) : 0;
                  return (
                    <div key={kpi.key} className="kpi-item">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`kpi-icon text-${kpi.color}-500 border-${kpi.color}-100 shadow-${kpi.color}-100/70`}>
                          <span className="material-symbols-outlined text-[22px]" style={kpi.key === 'all' ? { fontVariationSettings: '"FILL" 1' } : undefined}>{kpi.icon}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`kpi-percent text-${kpi.color}-500`}>{percent}%</span>
                        </div>
                      </div>
                      <p className="kpi-label">{kpi.label}</p>
                      <div className="flex items-baseline gap-3">
                        <h3 className="kpi-value">{Number(kpi.count || 0).toLocaleString('th-TH')}</h3>
                        <span className="kpi-unit">Cases</span>
                      </div>
                      <div className={`mt-2 flex items-center gap-2 text-${kpi.color}-500`}>
                        <span className="kpi-sub">{kpi.sub}</span>
                        <div className="kpi-footer-line"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="max-w-[1600px] mx-auto page-card">
            <div className="px-5 md:px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>table_view</span>
                  </div>
                  <div>
                    <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">รายการลูกหนี้</h2>
                    <p className="text-[12px] text-slate-500 mt-0.5">ค้นหา กรอง และเข้าสู่หน้ารายละเอียดลูกหนี้จากตารางนี้</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {role === 'admin' && (
                    <button onClick={() => setCheckerOpen(true)} className="btn-secondary-modern" title="ดาวน์โหลดข้อมูลดิบสำหรับตรวจสอบ">
                      <span className="material-symbols-outlined text-base">download</span>
                      Raw Data Export
                    </button>
                  )}
                  <button onClick={() => { setDraftFilters({ ...filters, caseStatuses: [...filters.caseStatuses], paymentStatuses: [...filters.paymentStatuses] }); setDrawerOpen(true); }} className="btn-secondary-modern">
                    <span className="material-symbols-outlined text-base">tune</span>
                    ตัวกรองขั้นสูง
                    {activeFilterCount > 0 && <span className="min-w-5 h-5 inline-flex items-center justify-center rounded-full bg-primary text-white text-[10px] px-1.5">{activeFilterCount}</span>}
                  </button>
                  <button onClick={startAdd} className="btn-primary-modern">
                    <span className="material-symbols-outlined text-base">person_add</span>
                    เพิ่มข้อมูลลูกหนี้
                  </button>
                </div>
              </div>
            </div>

            <div className="px-5 md:px-6 py-4 border-b border-blue-100 bg-white">
              <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 w-11 grid place-items-center text-indigo-300 pointer-events-none">
                      <span className="material-symbols-outlined text-[22px]">manage_search</span>
                    </span>
                    <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') loadData(1); }} className="input-modern" placeholder="ค้นหาเลขที่บัญชี / ชื่อ - นามสกุล" type="text" autoComplete="off" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => loadData(1)} className="btn-primary-modern"><span className="material-symbols-outlined text-base">search</span>ค้นหา</button>
                  <button onClick={clearSearchAndFilters} className="btn-secondary-modern"><span className="material-symbols-outlined text-base">restart_alt</span>ล้างค่า</button>
                  {role === 'admin' && <button onClick={handleRefresh} disabled={refreshing} className="btn-secondary-modern" title="รีเฟรชแคชและโหลดข้อมูลใหม่"><span className="material-symbols-outlined text-base">refresh</span>{refreshing ? 'กำลังรีเฟรช' : 'รีเฟรช'}</button>}
                  <select value={perPage} onChange={e => setPerPage(Number(e.target.value))} className="per-page-trigger">
                    <option value={10}>10 รายการ</option>
                    <option value={25}>25 รายการ</option>
                    <option value={50}>50 รายการ</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button onClick={() => changeCaseFilter('')} className={`case-tab ${caseFilter === '' ? 'active-tab' : 'inactive-tab'}`}>ทั้งหมด</button>
                  {CASE_STATUSES.map(status => <button key={status} onClick={() => changeCaseFilter(status)} className={`case-tab ${caseFilter === status ? 'active-tab' : 'inactive-tab'}`}>{status}</button>)}
                </div>
              </div>
            </div>

            <CustomerTable
              rows={rows}
              role={role}
              loading={loading}
              error={error}
              expandedAccount={expandedAccount}
              onToggleExpand={account => setExpandedAccount(expandedAccount === account ? '' : account)}
              onCopy={copyAccountNo}
              onSort={handleSort}
              onDelete={setDeleteAccount}
              returnTo={customerListReturnTo()}
            />

            <div className="px-6 py-4 bg-gradient-to-r from-blue-50/60 via-white to-indigo-50/60 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="material-symbols-outlined text-sm text-blue-300">database</span>
                <span>รายการข้อมูลลูกค้า</span>
              </div>
              <Pagination page={page} totalPages={totalPages} onPage={loadData} />
              <div className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">
                {totalRows ? `แสดง ${pageFrom}-${pageTo} จาก ${totalRows} รายการ` : 'แสดง 0 รายการ'}
              </div>
            </div>
          </div>
        </div>
      </main>

      {copyToast && <div className="copy-toast show"><span className="material-symbols-outlined text-[16px] text-emerald-500">check_circle</span>คัดลอกเลขที่บัญชีแล้ว</div>}
      {showRefreshingModal && <WaitModal />}
      {drawerOpen && <FilterDrawer draft={draftFilters} setDraft={setDraftFilters} onApply={() => { setFilters(draftFilters); setDrawerOpen(false); }} onReset={() => { setFilters(emptyFilters()); setDraftFilters(emptyFilters()); setDrawerOpen(false); }} onClose={() => setDrawerOpen(false)} />}
      {checkerOpen && <CheckerExportModal dateFrom={checkerDateFrom} dateTo={checkerDateTo} setDateFrom={setCheckerDateFrom} setDateTo={setCheckerDateTo} onSubmit={handleCheckerExport} onClose={() => setCheckerOpen(false)} />}
      {addOpen && <AddCustomerModal form={addForm} setForm={setAddForm} error={addError} onSubmit={handleAddReview} onClose={() => setAddOpen(false)} />}
      {reviewOpen && <AddReviewModal form={addForm} saving={savingAdd} onBack={() => { setReviewOpen(false); setAddOpen(true); }} onSubmit={doAddSubmit} />}
      {deleteAccount && <DeleteModal account={deleteAccount} onClose={() => setDeleteAccount('')} onConfirm={confirmDelete} />}
    </div>
  );
}

function Navbar({ role, displayName }: { role: Role; displayName: string }) {
  const roleLabels: Record<string, string> = { user: 'User', admin: 'Admin', superadmin: 'Super Admin' };
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-blue-100 flex justify-between items-center px-6 md:px-8 h-16 shadow-sm">
      <div className="flex items-center gap-8 min-w-0">
        <span className="text-xl tracking-tight text-primary font-headline flex items-center font-bold min-w-0">
          <div className="w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center shadow-lg shadow-indigo-200 mr-3 shrink-0">
            <span className="material-symbols-outlined text-white text-2xl font-normal" style={{ fontVariationSettings: '"FILL" 1' }}>shield</span>
          </div>
          <span className="truncate">LQD Tracking Management System</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-indigo-400 uppercase tracking-widest leading-none mb-1 font-bold">System Role</p>
            <p className="text-xs text-indigo-900 font-semibold">{roleLabels[role] || '-'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold border border-blue-100 shrink-0">
            <span>{(displayName || role || '-').charAt(0).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Sidebar({ role, activePage, onLogout }: { role: Role; activePage: string; onLogout: () => void }) {
  const itemClass = (page: string, hidden = false) =>
    `${hidden ? 'hidden ' : ''}group flex items-center gap-3 px-3.5 py-3 rounded-[10px] transition-all mb-1 ${
      activePage === page ? 'bg-primary text-white shadow-md shadow-indigo-100' : 'bg-transparent text-slate-600 hover:bg-blue-50 hover:text-primary font-medium'
    }`;
  const iconClass = (page: string) => `material-symbols-outlined font-normal transition-colors ${activePage !== page ? 'text-slate-400 group-hover:text-primary' : ''}`;
  const workHidden = role === 'superadmin';
  return (
    <aside className="fixed left-0 top-0 h-full w-56 z-40 bg-white border-r border-blue-100 flex-col p-3 gap-2 pt-20 hidden md:flex">
      <div className="px-3.5 py-4 mb-4 bg-blue-50/50 rounded-[12px] border border-blue-50">
        <h2 className="font-headline text-primary text-base font-bold">LQD Debt Overview</h2>
        <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">{role || '-'} Terminal</p>
      </div>
      <nav className="flex-1 space-y-1">
        {role === 'superadmin' && <a href="/users" className={itemClass('users')}><span className={iconClass('users')}>manage_accounts</span><span className="text-sm">User Management</span></a>}
        {role === 'superadmin' && <a href="/password-policy" className={itemClass('password-policy')}><span className={iconClass('password-policy')}>admin_panel_settings</span><span className="text-sm">Password Policy</span></a>}
        <a href="/customer-list" className={itemClass('customer-list', workHidden)}><span className={iconClass('customer-list')} style={activePage === 'customer-list' ? { fontVariationSettings: '"FILL" 1' } : undefined}>groups</span><span className="text-sm font-semibold">Customer List</span></a>
        <a href="/payment-record" className={itemClass('payment-record', workHidden)}><span className={iconClass('payment-record')}>history</span><span className="text-sm">Payment Record</span></a>
        {(role === 'admin') && <a href="/data-import" className={itemClass('data-import')}><span className={iconClass('data-import')}>upload_file</span><span className="text-sm">Data Import Center</span></a>}
        {(role === 'admin') && <a href="/report" className={itemClass('report')}><span className={iconClass('report')}>assessment</span><span className="text-sm">Report Center</span></a>}
      </nav>
      <div className="mt-auto pt-4 border-t border-blue-50">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-3 text-accent-coral text-sm hover:bg-red-50 rounded-[10px] transition-all font-bold cursor-pointer">
          <span className="material-symbols-outlined font-normal">logout</span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

function CustomerTable(props: {
  rows: Customer[];
  role: Role;
  loading: boolean;
  error: string;
  expandedAccount: string;
  returnTo: string;
  onToggleExpand: (account: string) => void;
  onCopy: (account: string) => void;
  onSort: (field: string) => void;
  onDelete: (account: string) => void;
}) {
  const { rows, role, loading, error, expandedAccount, returnTo, onToggleExpand, onCopy, onSort, onDelete } = props;
  const goPayment = (account: string) => {
    window.location.href = `/payment-record?account=${encodeURIComponent(account)}&from=customer-list&return_to=${encodeURIComponent(returnTo)}`;
  };
  const goDetail = (account: string) => {
    window.location.href = `/customer-detail?account=${encodeURIComponent(account)}&from=customer-list&return_to=${encodeURIComponent(returnTo)}`;
  };
  const goEnforcement = (account: string) => {
    window.location.href = `/customer-detail?account=${encodeURIComponent(account)}&open=enforcement&from=customer-list&return_to=${encodeURIComponent(returnTo)}`;
  };
  return (
    <div className="table-shell">
      <table className="mock-table text-left border-separate">
        <colgroup>
          <col style={{ width: '12%' }} /><col style={{ width: '17%' }} /><col style={{ width: '10%' }} /><col style={{ width: '13%' }} />
          <col style={{ width: '11%' }} /><col style={{ width: '12%' }} /><col style={{ width: '10%' }} /><col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="px-5 py-4 text-center"><button type="button" onClick={() => onSort('account_no')} className="inline-flex items-center justify-center gap-1 hover:text-primary transition-colors"><span>เลขที่บัญชี</span><span className="material-symbols-outlined text-[15px] text-slate-300">unfold_more</span></button></th>
            <th className="px-4 py-4 text-center">ชื่อ-นามสกุล</th>
            <th className="px-3 py-4 text-center"><button type="button" onClick={() => onSort('filing_date')} className="inline-flex items-center justify-center gap-1 hover:text-primary transition-colors"><span>วันที่ยื่นฟ้อง</span><span className="material-symbols-outlined text-[15px] text-slate-300">unfold_more</span></button></th>
            <th className="px-3 py-4 text-center">ยอดหนี้คงเหลือ</th>
            <th className="px-3 py-4 text-center">สถานะคดี</th>
            <th className="px-3 py-4 text-center">สถานะการชำระเงิน</th>
            <th className="px-3 py-4 text-center">บันทึกหมาย</th>
            <th className="px-4 py-4 text-center">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody className={loading && rows.length > 0 ? 'is-loading' : ''}>
          {loading && !rows.length && <tr><td colSpan={8} className="px-6 py-8 text-center text-indigo-300 text-sm">กำลังโหลดข้อมูล...</td></tr>}
          {error && <tr><td colSpan={8} className="px-6 py-12 text-center text-red-500 text-sm font-semibold">{error}</td></tr>}
          {!loading && !error && !rows.length && <tr><td colSpan={8} className="px-6 py-14 text-center"><div className="flex flex-col items-center justify-center gap-3"><div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-400"><span className="material-symbols-outlined text-[28px]">manage_search</span></div><div><p className="text-sm font-bold text-slate-500">ไม่พบข้อมูล</p><p className="text-xs text-slate-400 mt-0.5">ลองเปลี่ยนคำค้นหา หรือเลือกสถานะอื่นอีกครั้ง</p></div></div></td></tr>}
          {!error && rows.map(row => {
            const account = accountOf(row);
            const expanded = expandedAccount === account;
            const caseStatus = caseStatusOf(row);
            const payment = paymentStatusOf(row);
            const debtAmount = debtDisplayAmount(row);
            return (
              <>
                <tr className="main-row" key={account}>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center justify-center gap-1 min-w-0 max-w-full">
                      <span className="account-pill">{fmtAccNo(account)}</span>
                      <button type="button" title="คัดลอกเลขที่บัญชี" onClick={() => onCopy(account)} className="copy-account-btn"><span className="material-symbols-outlined text-[12px]">content_copy</span></button>
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="flex items-center gap-3 min-w-0"><div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-primary text-[11px] font-extrabold shadow-sm flex-shrink-0">{getInitials(row.name)}</div><div className="min-w-0"><p className="text-[13px] font-bold text-slate-800 truncate">{row.name || '-'}</p></div></div></td>
                  <td className="px-3 py-3 text-center"><span className="text-sm font-semibold text-slate-500">{fmtDate(row.filing_date)}</span></td>
                  <td className="px-3 py-3 text-right"><p className="text-sm font-extrabold text-slate-800">{fmtMoney(debtAmount, true)}</p><p className="text-[10px] text-slate-400 mt-0.5">{debtBaselineLabel(row)} {fmtMoney(debtBaselineAmount(row), true)}</p></td>
                  <td className="px-3 py-3 text-center"><StatusBadge text={caseStatus} tone={caseTone(caseStatus)} /></td>
                  <td className="px-3 py-3 text-center"><StatusBadge text={payment} tone={paymentTone(payment)} /></td>
                  <td className="px-3 py-3 text-center">{row.can_record_enforcement ? <button type="button" onClick={() => goEnforcement(account)} title="ไปหน้ารายละเอียดเพื่อบันทึกหมายบังคับคดี"><StatusBadge text="พร้อมบันทึกหมาย" tone="amber" /></button> : row.has_enforcement_order || row.enforcement_order_no || row.enforcement_recorded_at ? <StatusBadge text="บันทึกแล้ว" tone="red" /> : <span className="text-[11px] font-semibold text-slate-300">-</span>}</td>
                  <td className="px-4 py-3 text-center"><div className="flex justify-center gap-1">
                    <button title="ขยายข้อมูล" onClick={() => onToggleExpand(account)} className="action-icon-btn"><span className="material-symbols-outlined text-lg">{expanded ? 'expand_less' : 'expand_more'}</span></button>
                    <button title="บันทึกการชำระเงิน" onClick={() => goPayment(account)} className="action-icon-btn"><span className="material-symbols-outlined text-lg">payments</span></button>
                    <button title="ดูรายละเอียด" onClick={() => goDetail(account)} className="action-icon-btn"><span className="material-symbols-outlined text-lg">search</span></button>
                    {role === 'admin' && <button title="ลบข้อมูล" onClick={() => onDelete(account)} className="action-icon-btn hover:text-accent-coral hover:bg-red-50 hover:border-red-200"><span className="material-symbols-outlined text-lg">delete</span></button>}
                  </div></td>
                </tr>
                {expanded && <QuickView row={row} key={`${account}-quick`} />}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function QuickView({ row }: { row: Customer }) {
  const debtAmount = debtDisplayAmount(row);
  return (
    <tr className="expanded-row">
      <td colSpan={8} className="px-6 py-4">
        <div className="quick-view">
          <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-blue-100">
            <QuickSection icon="balance" title="ข้อมูลคำพิพากษา" items={[
              ['วันที่มีคำพิพากษา', fmtDate(row.judgment_date)],
              ['ยอดหนี้ตามคำพิพากษา', fmtMoney(row.total_debt)],
              ['เงินต้นตามคำพิพากษา', fmtMoney(row.principal)],
              ['อัตราดอกเบี้ย', fmtPct(row.interest_rate)],
              ['ค่าธรรมเนียมศาล', fmtMoney(row.court_fee)],
              ['ค่าทนายความ', fmtMoney(row.lawyer_fee)],
            ]} />
            <QuickSection icon="event_repeat" title="แผนการชำระเงิน" items={[
              ['วันครบกำหนดงวดแรก', fmtDate(row.first_due_date)],
              ['วันครบกำหนดงวดสุดท้าย', fmtDate(row.last_due_date)],
              ['จำนวนงวด', row.installment_count ? `${row.installment_count} งวด` : '-'],
              ['ยอดชำระงวดปัจจุบัน', fmtMoney(currentInstallmentAmount(row))],
              ['อัตราดอกเบี้ยเมื่อผิดนัดชำระ', fmtPct(row.default_interest_rate)],
              ['วันครบกำหนดถัดไป', '-'],
            ]} />
            <QuickSection icon="assignment" title="ข้อมูลการบังคับคดี" items={[
              ['คดีหมายเลขแดงที่', row.red_case_no || '-'],
              ['วันที่ของหมายบังคับคดี', fmtDate(row.enforcement_judgment_date)],
              ['วันที่บันทึกข้อมูล', fmtTimestamp(row.enforcement_recorded_at)],
              ['สถานะการบันทึก', (row.enforcement_order_no || row.enforcement_recorded_at) ? 'บันทึกแล้ว' : row.can_record_enforcement ? 'พร้อมบันทึกหมาย' : '-'],
            ]} />
            <QuickSection icon="payments" title="ข้อมูลการชำระเงิน" items={[
              ['วันที่ชำระล่าสุด', fmtDate(latestPaymentDate(row))],
              ['จำนวนเงินที่ชำระล่าสุด', latestPaymentAmount(row) ? fmtMoney(latestPaymentAmount(row)) : '-'],
              ['ยอดหนี้คงเหลือ', fmtMoney(debtAmount)],
              ['จำนวนวันที่ค้างชำระ', dpdDays(row) > 0 ? `${dpdDays(row)} วัน` : '-'],
              ['สถานะการชำระเงิน', paymentStatusOf(row)],
              ['สถานะคดี', caseStatusOf(row)],
            ]} />
          </div>
        </div>
      </td>
    </tr>
  );
}

function QuickSection({ icon, title, items }: { icon: string; title: string; items: Array<[string, string]> }) {
  return (
    <div className="quick-section">
      <div className="quick-section-header"><span className="material-symbols-outlined text-[17px] text-indigo-500">{icon}</span><p className="quick-section-title">{title}</p></div>
      <div className="quick-grid">{items.map(([label, value]) => <div key={label} className="quick-kv"><p className="quick-kv-label">{label}</p><p className="quick-kv-value">{value || '-'}</p></div>)}</div>
    </div>
  );
}

function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (page: number) => void }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(i => i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1));
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onPage(page - 1)} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-blue-100 transition-all disabled:opacity-30"><span className="material-symbols-outlined text-indigo-300 text-base">chevron_left</span></button>
      <div className="flex gap-1 px-2">
        {pages.map((p, idx) => (
          <span key={p} className="contents">
            {idx > 0 && p - pages[idx - 1] > 1 && <span className="w-7 h-7 flex items-center justify-center text-[10px] text-indigo-200">...</span>}
            <button onClick={() => onPage(p)} className={`w-7 h-7 rounded-lg text-[10px] transition-all ${p === page ? 'bg-primary text-white shadow-sm' : 'hover:bg-white text-indigo-400'}`}>{p}</button>
          </span>
        ))}
      </div>
      <button onClick={() => onPage(page + 1)} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-blue-100 transition-all disabled:opacity-30"><span className="material-symbols-outlined text-indigo-300 text-base">chevron_right</span></button>
    </div>
  );
}

function FilterDrawer({ draft, setDraft, onApply, onReset, onClose }: {
  draft: Filters;
  setDraft: (filters: Filters) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggle = (key: 'caseStatuses' | 'paymentStatuses', value: string) => {
    const list = draft[key];
    setDraft({ ...draft, [key]: list.includes(value) ? list.filter(v => v !== value) : [...list, value] });
  };

  const closeAfterTransition = (afterClose: () => void) => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    window.setTimeout(afterClose, 220);
  };

  return (
    <>
      <div onClick={() => closeAfterTransition(onClose)} className={`drawer-backdrop ${visible ? 'open' : ''}`}></div>
      <aside className={`drawer-panel ${visible ? 'open' : ''}`}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-[11px] text-indigo-400 uppercase tracking-widest font-bold">ตัวกรองขั้นสูง</p><h3 className="text-xl font-extrabold text-slate-800 mt-1">ตัวกรองสำหรับงานติดตาม</h3></div>
              <button onClick={() => closeAfterTransition(onClose)} className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"><span className="material-symbols-outlined text-[20px]">close</span></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <section className="filter-section"><p className="filter-title">สถานะคดี</p><div className="filter-check-grid">{CASE_STATUSES.map(status => <label key={status} className={`filter-check-row ${draft.caseStatuses.includes(status) ? 'active' : ''}`}><span>{status}</span><input checked={draft.caseStatuses.includes(status)} onChange={() => toggle('caseStatuses', status)} type="checkbox" className="filter-check-input" /></label>)}</div></section>
            <section className="filter-section"><p className="filter-title">สถานะการชำระเงิน</p><div className="filter-check-grid">{PAYMENT_STATUSES.map(status => <label key={status} className={`filter-check-row ${draft.paymentStatuses.includes(status) ? 'active' : ''}`}><span>{status}</span><input checked={draft.paymentStatuses.includes(status)} onChange={() => toggle('paymentStatuses', status)} type="checkbox" className="filter-check-input" /></label>)}</div></section>
            <section className="filter-section">
              <p className="filter-title">ช่วงวันที่</p>
              <select value={draft.dateField} onChange={e => setDraft({ ...draft, dateField: e.target.value })} className="filter-input mb-3">{DATE_FIELDS.map(field => <option key={field.value} value={field.value}>{field.label}</option>)}</select>
              <div className="grid grid-cols-2 gap-3"><input value={draft.dateFrom} onChange={e => setDraft({ ...draft, dateFrom: e.target.value })} className="filter-input" type="date" /><input value={draft.dateTo} onChange={e => setDraft({ ...draft, dateTo: e.target.value })} className="filter-input" type="date" /></div>
            </section>
            <section className="filter-section"><p className="filter-title">ช่วงยอดหนี้คงเหลือ</p><div className="grid grid-cols-2 gap-3"><input value={draft.outstandingMin} onChange={e => setDraft({ ...draft, outstandingMin: e.target.value })} className="filter-input" type="number" min="0" step="10000" placeholder="ต่ำสุด" /><input value={draft.outstandingMax} onChange={e => setDraft({ ...draft, outstandingMax: e.target.value })} className="filter-input" type="number" min="0" step="10000" placeholder="สูงสุด" /></div></section>
          </div>
          <div className="p-6 border-t border-blue-100 bg-slate-50/70 flex gap-2"><button onClick={() => closeAfterTransition(onReset)} className="btn-secondary-modern flex-1">ล้างตัวกรอง</button><button onClick={() => closeAfterTransition(onApply)} className="btn-primary-modern flex-1">ใช้ตัวกรอง</button></div>
        </div>
      </aside>
    </>
  );
}

function WaitModal() {
  return <ModalShell><div className="p-7 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-primary"><svg className="h-8 w-8 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg></div><h3 className="text-lg font-extrabold text-slate-800">กำลังรีเฟรชข้อมูล</h3><p className="mt-2 text-sm leading-relaxed text-slate-500">ระบบกำลังคำนวณแคชรายการลูกค้าใหม่ กรุณารอสักครู่</p></div></ModalShell>;
}

function CheckerExportModal(props: { dateFrom: string; dateTo: string; setDateFrom: (v: string) => void; setDateTo: (v: string) => void; onSubmit: () => void; onClose: () => void }) {
  return (
    <ModalShell onClose={props.onClose}>
      {close => (
        <>
          <div className="px-6 py-5 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white"><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] text-indigo-400 uppercase tracking-widest font-bold">Raw Data Export</p><h3 className="text-xl font-extrabold text-slate-800 mt-1">ดาวน์โหลดข้อมูลดิบ</h3><p className="mt-1 text-xs text-slate-500 leading-relaxed">เลือกช่วงวันที่ที่ Maker ทำรายการในระบบ</p></div><button onClick={close} className="modal-close"><span className="material-symbols-outlined text-[20px]">close</span></button></div></div>
          <div className="p-6 space-y-4"><div className="grid grid-cols-2 gap-3"><label className="add-label">วันที่เริ่มต้น<input value={props.dateFrom} onChange={e => props.setDateFrom(e.target.value)} type="date" className="filter-input mt-2" /></label><label className="add-label">วันที่สิ้นสุด<input value={props.dateTo} onChange={e => props.setDateTo(e.target.value)} type="date" className="filter-input mt-2" /></label></div><div className="flex justify-end gap-2"><button onClick={close} className="btn-secondary-modern">ยกเลิก</button><button onClick={props.onSubmit} className="btn-primary-modern"><span className="material-symbols-outlined text-base">download</span>ดาวน์โหลด</button></div></div>
        </>
      )}
    </ModalShell>
  );
}

function AddCustomerModal({ form, setForm, error, onSubmit, onClose }: { form: AddForm; setForm: (form: AddForm) => void; error: string; onSubmit: (e: FormEvent) => void; onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} large>
      {close => (
        <>
          <div className="modal-header"><div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3 min-w-0"><div className="modal-icon"><span className="material-symbols-outlined text-[21px]" style={{ fontVariationSettings: '"FILL" 1' }}>person_add</span></div><div className="min-w-0"><h3 className="text-[18px] font-extrabold text-slate-800 tracking-tight">เพิ่มข้อมูลลูกหนี้ใหม่</h3><p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">กรอกข้อมูลตั้งต้นสำหรับเปิดรายการคดีในระบบ</p></div></div><button onClick={close} className="modal-close"><span className="material-symbols-outlined text-[20px]">close</span></button></div></div>
          {error && <div className="add-error-banner"><span className="material-symbols-outlined text-red-500 flex-shrink-0 text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>error</span><div className="flex-1"><p className="text-[12px] font-bold text-red-700 mb-0.5">กรุณาตรวจสอบข้อมูลอีกครั้ง</p><p className="text-sm text-red-700 leading-relaxed">{error}</p></div></div>}
          <form onSubmit={onSubmit} className="modal-body">
            <div className="flex items-center justify-between gap-3 mb-4"><p className="modal-section-title">ข้อมูลลูกหนี้</p><div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold text-primary"><span className="material-symbols-outlined text-[15px]">edit_note</span>ข้อมูลจำเป็น</div></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <AddInput label="หมายเลขบัญชี *" value={form.account_no} onChange={v => setForm({ ...form, account_no: v.replace(/\D/g, '').slice(0, 12) })} icon="badge" placeholder="กรอกหมายเลขบัญชี 12 หลัก" helper="กรอกเลขบัญชีจำนวน 12 หลัก" maxLength={12} inputMode="numeric" inputClassName="pr-16" rightSlot={<span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-300 pointer-events-none font-mono">{form.account_no.length}/12</span>} />
              <AddInput label="คดีหมายเลขดำที่ *" value={form.black_case_no} onChange={v => setForm({ ...form, black_case_no: v })} icon="article" placeholder="กรอกคดีหมายเลขดำที่" helper="รูปแบบ: ตัวย่อประเภทคดีติดเลขที่/ปี พ.ศ. เช่น ผบ1234/2567" />
              <AddInput label="วันที่ยื่นฟ้อง *" value={form.filing_date} onChange={v => setForm({ ...form, filing_date: v })} type="date" icon="calendar_today" placeholder="เลือกวันที่ยื่นฟ้อง" helper="เลือกวันที่ตามเอกสารยื่นฟ้อง" />
              <AddInput label="วันที่ผิดนัดชำระก่อนฟ้อง *" value={form.default_date} onChange={v => setForm({ ...form, default_date: v })} type="date" icon="calendar_today" placeholder="เลือกวันที่ผิดนัดชำระก่อนฟ้อง" helper="เลือกวันที่ผิดนัดชำระก่อนฟ้อง" />
              <AddInput label="ทุนทรัพย์ที่ฟ้อง *" value={form.filing_capital} onChange={v => setForm({ ...form, filing_capital: v })} icon="payments" placeholder="กรอกทุนทรัพย์ที่ฟ้อง" helper="กรอกจำนวนเงินได้สูงสุด 2 ตำแหน่งทศนิยม" inputMode="decimal" />
              <AddInput label="ชื่อ-นามสกุล *" value={form.name} onChange={v => setForm({ ...form, name: v })} icon="person" placeholder="ชื่อ-นามสกุล หรือชื่อบริษัท" helper="ใช้ได้เฉพาะตัวอักษร ตัวเลข เว้นวรรค จุด (.) และขีดกลาง (-)" />
              <AddInput label="DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน *" value={form.pre_filing_dpd_days} onChange={v => setForm({ ...form, pre_filing_dpd_days: v.replace(/\D/g, '') })} icon="pin" placeholder="กรอกจำนวนวัน" helper="กรอกจำนวนเต็มมากกว่า 0 เท่านั้น" inputMode="numeric" />
              <div className="add-field md:col-span-6"><label className="add-label">หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม</label><textarea value={form.filing_note} onChange={e => setForm({ ...form, filing_note: e.target.value.slice(0, 100) })} className="add-input add-note-input h-[58px] min-h-[58px] resize-none" placeholder="กรอกหมายเหตุเพิ่มเติม (ถ้ามี)" maxLength={100} /><p className="add-helper !mt-1 !min-h-0">{form.filing_note.length}/100 ตัวอักษร</p></div>
            </div>
            <div className="modal-footer -mx-5 md:-mx-6 -mb-5 mt-5"><p className="text-[11px] text-slate-400 leading-relaxed">ฟิลด์ที่มีเครื่องหมาย * จำเป็นต้องกรอก</p><div className="flex items-center justify-end gap-2"><button type="button" onClick={close} className="btn-secondary-modern">ยกเลิก</button><button type="submit" className="btn-primary-modern"><span className="material-symbols-outlined text-base">fact_check</span>ตรวจสอบข้อมูล</button></div></div>
          </form>
        </>
      )}
    </ModalShell>
  );
}

function AddInput({ label, value, onChange, icon, helper, type = 'text', placeholder, inputMode, maxLength, inputClassName = '', fieldClassName, rightSlot }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon: string;
  helper?: string;
  type?: string;
  placeholder?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  maxLength?: number;
  inputClassName?: string;
  fieldClassName?: string;
  rightSlot?: ReactNode;
}) {
  return <div className={`add-field ${fieldClassName || 'md:col-span-6'}`}><label className="add-label">{label}</label><div className="relative"><span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 text-[18px] pointer-events-none">{icon}</span><input value={value} onChange={e => onChange(e.target.value)} className={`add-input ${inputClassName}`} type={type} placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} autoComplete="off" />{rightSlot}</div>{helper && <p className="add-helper">{helper}</p>}</div>;
}

function AddReviewModal({ form, saving, onBack, onSubmit }: { form: AddForm; saving: boolean; onBack: () => void; onSubmit: () => void }) {
  return (
    <ModalShell onClose={onBack} large>
      {close => (
        <>
          <div className="modal-header"><div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3 min-w-0"><div className="modal-icon"><span className="material-symbols-outlined text-[21px]" style={{ fontVariationSettings: '"FILL" 1' }}>fact_check</span></div><div className="min-w-0"><h3 className="text-[18px] font-extrabold text-slate-800 tracking-tight">ตรวจสอบข้อมูลก่อนบันทึก</h3><p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">ยืนยันรายละเอียดลูกหนี้ก่อนเพิ่มเข้าสู่ระบบ</p></div></div><button onClick={close} className="modal-close"><span className="material-symbols-outlined text-[20px]">close</span></button></div></div>
          <div className="modal-body"><div className="review-panel"><div className="review-account"><div className="min-w-0"><p className="review-label">หมายเลขบัญชี</p><p className="mt-1 text-xl font-extrabold text-primary tracking-wide break-all">{fmtAccNo(form.account_no)}</p></div><div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 self-start sm:self-center"><span className="material-symbols-outlined text-[15px]">verified</span>พร้อมบันทึก</div></div><div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-100">{[['ชื่อ-นามสกุล', form.name], ['คดีหมายเลขดำที่', form.black_case_no], ['วันที่ยื่นฟ้อง', fmtDate(form.filing_date)], ['วันที่ผิดนัดชำระก่อนฟ้อง', fmtDate(form.default_date)], ['ทุนทรัพย์ที่ฟ้อง', fmtMoney(form.filing_capital)], ['DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน', form.pre_filing_dpd_days], ['หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม', form.filing_note || '-']].map(([label, value]) => <div key={label} className="review-item"><p className="review-label">{label}</p><p className="review-value break-words">{value}</p></div>)}</div></div></div>
          <div className="modal-footer"><p className="text-[11px] text-slate-400 leading-relaxed">กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยันบันทึก</p><div className="flex items-center justify-end gap-2"><button onClick={close} className="btn-secondary-modern">แก้ไขข้อมูล</button><button disabled={saving} onClick={onSubmit} className="btn-primary-modern"><span className="material-symbols-outlined text-base">save</span>{saving ? 'กำลังบันทึก...' : 'ยืนยันบันทึก'}</button></div></div>
        </>
      )}
    </ModalShell>
  );
}

function DeleteModal({ account, onClose, onConfirm }: { account: string; onClose: () => void; onConfirm: () => void }) {
  return <ModalShell onClose={onClose}>{close => <div className="p-8 flex flex-col items-center text-center"><div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6"><span className="material-symbols-outlined text-red-500 text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>delete_forever</span></div><h3 className="text-2xl font-bold text-on-surface mb-3">ยืนยันการลบข้อมูล</h3><h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Confirm Deletion</h4><p className="text-slate-500 text-sm leading-relaxed mb-2">คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลลูกหนี้รายนี้?</p><p className="text-primary font-bold text-sm mb-2">{fmtAccNo(account)}</p><p className="text-slate-400 text-xs mb-8">การดำเนินการนี้ไม่สามารถย้อนกลับได้</p><div className="flex gap-3 w-full"><button onClick={close} className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all text-sm">ยกเลิก</button><button onClick={onConfirm} className="flex-1 py-3 px-6 bg-accent-coral hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all text-sm">ยืนยันการลบ</button></div></div>}</ModalShell>;
}

function ModalShell({ children, onClose, large = false }: { children: ReactNode | ((close: () => void) => ReactNode); onClose?: () => void; large?: boolean }) {
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const closeAfterTransition = () => {
    if (!onClose || closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    window.setTimeout(onClose, 220);
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className={`modal-backdrop absolute inset-0 bg-slate-900/45 backdrop-blur-[3px] ${visible ? 'open' : ''}`} onClick={closeAfterTransition}></div>
      <div className={`modal-content relative ${visible ? 'open' : ''} ${large ? 'modal-shell' : 'w-full max-w-md rounded-[24px] border border-blue-100 bg-white shadow-2xl shadow-slate-900/20 overflow-hidden'}`}>{typeof children === 'function' ? children(closeAfterTransition) : children}</div>
    </div>
  );
}
