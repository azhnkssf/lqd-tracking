export type AppFeedbackModalType = "success" | "error" | "warning" | "info";

export interface AppFeedbackModalState {
  open: boolean;
  type: AppFeedbackModalType;
  title: string;
  message: string;
}

interface AppFeedbackModalProps {
  state: AppFeedbackModalState;
  onClose: () => void;
  confirmText?: string;
  zIndexClass?: string;
}

const modalConfig: Record<AppFeedbackModalType, { icon: string; iconClass: string }> = {
  success: {
    icon: "check_circle",
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  error: {
    icon: "error",
    iconClass: "bg-red-50 text-red-600",
  },
  warning: {
    icon: "warning",
    iconClass: "bg-amber-50 text-amber-600",
  },
  info: {
    icon: "info",
    iconClass: "bg-blue-50 text-primary",
  },
};

export default function AppFeedbackModal({
  state,
  onClose,
  confirmText = "ตกลง",
  zIndexClass = "z-[220]",
}: AppFeedbackModalProps) {
  if (!state.open) return null;

  const config = modalConfig[state.type];

  return (
    <div className={`fixed inset-0 ${zIndexClass} flex items-center justify-center p-4`}>
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 flex flex-col items-center text-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${config.iconClass}`}>
            <span className="material-symbols-outlined text-3xl">{config.icon}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{state.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">{state.message}</p>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
