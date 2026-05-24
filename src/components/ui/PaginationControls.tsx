import type { HTMLAttributes } from "react";

interface PaginationControlsProps extends HTMLAttributes<HTMLDivElement> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  label?: string;
}

export default function PaginationControls({
  page,
  pageCount,
  onPageChange,
  disabled = false,
  size = "sm",
  label,
  className = "",
  ...rest
}: PaginationControlsProps) {
  if (pageCount <= 1) return null;

  const canPrevious = page > 1 && !disabled;
  const canNext = page < pageCount && !disabled;
  const buttonSize = size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const iconSize = size === "sm" ? "text-[18px]" : "text-[20px]";
  const buttonClass =
    `${buttonSize} inline-flex items-center justify-center rounded-xl border border-primary/15 bg-white text-primary shadow-sm transition-all ` +
    "hover:bg-primary/10 hover:border-primary/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-white disabled:hover:border-primary/15";

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} {...rest}>
      {label ? <span className="text-[11px] font-semibold text-slate-400">{label}</span> : null}
      <button
        type="button"
        aria-label="หน้าก่อนหน้า"
        disabled={!canPrevious}
        onClick={() => canPrevious && onPageChange(page - 1)}
        className={buttonClass}
      >
        <span className={`material-symbols-outlined ${iconSize}`}>chevron_left</span>
      </button>
      <span className={`min-w-[56px] text-center ${textSize} font-extrabold text-slate-600 tabular-nums`}>
        {page} / {pageCount}
      </span>
      <button
        type="button"
        aria-label="หน้าถัดไป"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(page + 1)}
        className={buttonClass}
      >
        <span className={`material-symbols-outlined ${iconSize}`}>chevron_right</span>
      </button>
    </div>
  );
}
