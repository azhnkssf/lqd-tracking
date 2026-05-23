import { useEffect } from 'react';

const LEGACY_BODY_CLASS =
  'bg-surface text-on-surface min-h-screen font-body selection:bg-indigo-100 selection:text-primary';

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
