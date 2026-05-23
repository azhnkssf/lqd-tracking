import { useEffect } from 'react';

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

export interface FormState extends ApiRecord {
  judgment_type?: string;
  judgment_date?: string;
  first_due_date?: string;
}

function getTemplateElement(id: string): HTMLTemplateElement | null {
  const el = document.getElementById(id);
  return el instanceof HTMLTemplateElement ? el : null;
}

function getTextScriptElement(id: string): HTMLScriptElement | null {
  const el = document.getElementById(id);
  return el instanceof HTMLScriptElement ? el : null;
}

function runInertScripts(container: HTMLElement) {
  container.querySelectorAll('script').forEach(inertScript => {
    const executableScript = document.createElement('script');

    for (const { name, value } of Array.from(inertScript.attributes)) {
      executableScript.setAttribute(name, value);
    }

    executableScript.text = inertScript.textContent || '';
    inertScript.replaceWith(executableScript);
  });
}

export default function CustomerDetailPage() {
  useEffect(() => {
    document.body.className = LEGACY_BODY_CLASS;

    const mount = document.getElementById('customer-detail-legacy-root');
    const template = getTemplateElement('customer-detail-legacy-markup');
    const legacyScriptSource = getTextScriptElement('customer-detail-legacy-script');

    if (!mount || !template || !legacyScriptSource) return;

    mount.replaceChildren(template.content.cloneNode(true));
    runInertScripts(mount);

    const legacyScript = document.createElement('script');
    legacyScript.dataset.customerDetailLegacyRuntime = 'true';
    legacyScript.text = legacyScriptSource.textContent || '';
    document.body.appendChild(legacyScript);
  }, []);

  return <div id="customer-detail-legacy-root" />;
}
