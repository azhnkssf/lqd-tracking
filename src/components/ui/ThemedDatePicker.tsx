import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const THAI_MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const THAI_SHORT_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const THAI_WEEKDAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

type ThemedDatePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxDate?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  className?: string;
  openClassName?: string;
  children?: (dateText: string, isPlaceholder: boolean) => ReactNode;
};

function todayDateOnly() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function dateToIso(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
}

function dateFromIso(value?: string) {
  if (!value) return null;
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
  return year && month && day ? new Date(year, month - 1, day) : null;
}

function displayDate(value?: string) {
  if (!value) return '';
  const [year, month, day] = String(value).slice(0, 10).split('-');
  return year && month && day ? `${day}/${month}/${year}` : '';
}

function calendarCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const cells: { date: Date; currentMonth: boolean }[] = [];
  for (let index = 0; index < first.getDay(); index += 1) {
    cells.push({ date: new Date(year, month, index - first.getDay() + 1), currentMonth: false });
  }
  for (let day = 1; day <= last.getDate(); day += 1) {
    cells.push({ date: new Date(year, month, day), currentMonth: true });
  }
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, cells.length - first.getDay() - last.getDate() + 1), currentMonth: false });
  }
  return cells;
}

export default function ThemedDatePicker({
  id,
  value,
  onChange,
  placeholder = 'เลือกวันที่',
  maxDate,
  ariaInvalid,
  ariaDescribedBy,
  className = 'filter-date-display relative',
  openClassName = 'open',
  children,
}: ThemedDatePickerProps) {
  const initialDate = dateFromIso(value) || todayDateOnly();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [monthView, setMonthView] = useState(false);
  const [popupStyle, setPopupStyle] = useState<CSSProperties>({});
  const anchorRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const today = todayDateOnly();
  const maxDateOnly = dateFromIso(maxDate);

  const positionPopup = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const popupWidth = Math.min(320, Math.max(288, rect.width));
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    const spaceAbove = rect.top - 8;
    let left = rect.left;
    if (left + popupWidth > window.innerWidth - 8) left = window.innerWidth - popupWidth - 8;
    if (left < 8) left = 8;
    const nextStyle: CSSProperties = {
      left,
      width: popupWidth,
      maxHeight: Math.max(180, spaceBelow >= 340 ? spaceBelow : spaceAbove >= 340 ? spaceAbove : window.innerHeight - 16),
    };
    if (spaceBelow >= 340) nextStyle.top = rect.bottom + 6;
    else if (spaceAbove >= 340) nextStyle.bottom = window.innerHeight - rect.top + 6;
    else nextStyle.top = 8;
    setPopupStyle(nextStyle);
  }, []);

  const openCalendar = () => {
    const currentValue = dateFromIso(value) || todayDateOnly();
    setYear(currentValue.getFullYear());
    setMonth(currentValue.getMonth());
    setMonthView(false);
    setOpen(true);
    window.requestAnimationFrame(positionPopup);
  };

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popupRef.current?.contains(target) || anchorRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    window.addEventListener('resize', positionPopup);
    window.addEventListener('scroll', positionPopup, true);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      window.removeEventListener('resize', positionPopup);
      window.removeEventListener('scroll', positionPopup, true);
    };
  }, [open, positionPopup]);

  const selectDay = (nextValue: string) => {
    if (maxDate && nextValue && nextValue > maxDate) return;
    onChange(nextValue);
    setOpen(false);
  };

  const navMonth = (delta: number) => {
    const nextMonth = month + delta;
    if (nextMonth > 11) {
      setMonth(0);
      setYear(current => current + 1);
    } else if (nextMonth < 0) {
      setMonth(11);
      setYear(current => current - 1);
    } else {
      setMonth(nextMonth);
    }
  };

  const dateText = value ? displayDate(value) : placeholder;
  const calendarPopup = open && (
    <div ref={popupRef} style={popupStyle} className="dp-popup">
      <div className="dp-header">
        <button type="button" onClick={() => navMonth(-1)} className="dp-nav-btn" aria-label="เดือนก่อนหน้า"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
        <button type="button" onClick={() => setMonthView(view => !view)} className="dp-month-year">{THAI_MONTHS[month]} {year + 543}</button>
        <button type="button" onClick={() => navMonth(1)} className="dp-nav-btn" aria-label="เดือนถัดไป"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
      </div>
      {monthView ? (
        <>
          <div className="dp-year-header">
            <button type="button" onClick={() => setYear(current => current - 1)} className="dp-nav-btn" aria-label="ปีก่อนหน้า"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <span className="text-sm font-bold text-slate-700">พ.ศ. {year + 543}</span>
            <button type="button" onClick={() => setYear(current => current + 1)} className="dp-nav-btn" aria-label="ปีถัดไป"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
          <div className="dp-my-grid">
            {THAI_SHORT_MONTHS.map((shortMonth, index) => (
              <button key={shortMonth} type="button" onClick={() => { setMonth(index); setMonthView(false); }} className={`dp-my-item ${index === month ? 'active' : ''}`}>{shortMonth}</button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="dp-weekdays">{THAI_WEEKDAYS.map(day => <span key={day} className="dp-weekday">{day}</span>)}</div>
          <div className="dp-days">
            {calendarCells(year, month).map(cell => {
              const isoValue = dateToIso(cell.date);
              const active = cell.currentMonth && isoValue === value;
              const isToday = cell.currentMonth && cell.date.getTime() === today.getTime();
              const disabled = Boolean(cell.currentMonth && maxDate && isoValue > maxDate);
              const dayClassName = `dp-day ${cell.currentMonth ? '' : 'dp-day-other'} ${active ? 'dp-day-selected' : ''} ${isToday && !active ? 'dp-day-today' : ''} ${disabled ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : ''}`;
              return cell.currentMonth
                ? <button key={isoValue} type="button" onClick={() => selectDay(isoValue)} className={dayClassName} disabled={disabled}>{cell.date.getDate()}</button>
                : <span key={isoValue} className={dayClassName}>{cell.date.getDate()}</span>;
            })}
          </div>
        </>
      )}
      <div className="dp-footer">
        <button type="button" onClick={() => selectDay('')} className="dp-btn-clear">ล้างค่า</button>
        <button type="button" onClick={() => selectDay(dateToIso(maxDateOnly && maxDateOnly < today ? maxDateOnly : today))} className="dp-btn-today">{maxDateOnly && maxDateOnly < today ? 'วันที่สูงสุด' : 'วันนี้'}</button>
      </div>
    </div>
  );

  return (
    <>
      <button id={id} ref={anchorRef} type="button" onClick={openCalendar} className={`${className} ${open ? openClassName : ''}`} aria-invalid={ariaInvalid ? 'true' : undefined} aria-describedby={ariaDescribedBy}>
        {children ? children(dateText, !value) : dateText}
      </button>
      {calendarPopup ? createPortal(calendarPopup, document.body) : null}
    </>
  );
}
