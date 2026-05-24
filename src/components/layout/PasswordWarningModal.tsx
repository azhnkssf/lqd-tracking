interface PasswordWarningModalProps {
  days: string | null;
  open: boolean;
  onClose: () => void;
}

export default function PasswordWarningModal({ days, open, onClose }: PasswordWarningModalProps) {
  return (
    <div id="password-warning-modal" className={`${open ? 'flex' : 'hidden'} fixed inset-0 z-[90] items-center justify-center bg-slate-900/35 px-5 py-8`}>
      <div className="w-full max-w-[460px] overflow-hidden rounded-[16px] border border-blue-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-blue-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-[12px] bg-blue-50 text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>lock_clock</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Password Expiring</h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 transition hover:text-slate-700" aria-label="Close password warning">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="space-y-5 p-5">
          <p id="password-warning-message" className="text-sm font-medium leading-7 text-slate-600">
            รหัสผ่านของคุณจะหมดอายุในอีก {days || '-'} วัน กรุณาเปลี่ยนรหัสผ่านก่อนถึงกำหนด
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button type="button" onClick={onClose} className="h-11 rounded-[12px] border border-blue-100 bg-white text-sm font-bold text-slate-600 transition hover:bg-blue-50">
              Later
            </button>
            <button type="button" onClick={() => { window.location.href = '/change-password'; }} className="h-11 rounded-[12px] bg-primary text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-primary-muted">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
