import { useEffect } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import CustomerDetailMarkup from './components/CustomerDetailMarkup';
import { runLegacyAction } from './components/legacyActions';
import customerDetailLegacyScript from './legacy/customerDetailLegacy.js?raw';

const LEGACY_BODY_CLASS =
  'bg-surface text-on-surface min-h-screen font-body selection:bg-indigo-100 selection:text-primary';

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
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];
  const monthsShort = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
  ];

  target.LQDThaiDate = {
    monthsFull,
    monthsShort,
    shortMonth: index => monthsShort[Number(index)] || '',
    fullMonth: index => monthsFull[Number(index)] || '',
  };
}

function installLegacyRuntime() {
  installThaiDateUtils();

  const runInGlobalScope = globalThis.eval as (source: string) => unknown;
  runInGlobalScope(customerDetailLegacyScript);
}

function useCustomerDetailLegacyRuntime() {
  useEffect(() => {
    document.body.className = LEGACY_BODY_CLASS;
    installLegacyRuntime();
  }, []);
}

export default function CustomerDetailPage() {
  useCustomerDetailLegacyRuntime();

  return (
    <AppLayout activePage="customer-list">
      <div className="customer-detail-page min-h-screen bg-surface text-on-surface font-body">
        <CustomerDetailMarkup runLegacyAction={runLegacyAction} />
      </div>
    </AppLayout>
  );
}
