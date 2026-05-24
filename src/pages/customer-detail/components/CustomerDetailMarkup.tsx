import type { LegacyEvent } from './legacyActions';

interface CustomerDetailMarkupProps {
  runLegacyAction: (expression: string, event: LegacyEvent) => void;
}

export default function CustomerDetailMarkup({ runLegacyAction }: CustomerDetailMarkupProps) {
  return (
    <>
    {/* Main */}

    <main className="md:ml-56 pt-20 min-h-screen pb-24">


          {/* Header bar */}

          <div className="px-6 md:px-8">

                <div className="max-w-[1600px] mx-auto">

                      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 py-4 border-b border-indigo-100/50">

                            <div className="flex items-center gap-4 min-w-0">

                                  <a id="customer-detail-back-link" href="/customer-list" className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-slate-200/50 flex items-center justify-center text-primary border border-white hover:bg-indigo-50 transition-all flex-shrink-0">

                                        <span className="material-symbols-outlined text-3xl">arrow_back</span>

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


                                        <p id="detail-subtitle" className="text-slate-500 font-medium text-sm mt-1 truncate">

                            กำลังโหลดข้อมูล...
                                        </p>

                                  </div>

                            </div>


                            <div className="w-full xl:w-auto flex items-center xl:justify-end">

                                  <div className="flex flex-col gap-2 w-full xl:w-auto">

                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold leading-none text-right">

                            Status Progress
                                        </p>

                                        <div id="progress-steps" className="min-w-[300px] min-h-[52px]"></div>

                                  </div>

                            </div>

                      </header>

                </div>

          </div>


          {/* Error banner */}

          <div id="error-banner" className="hidden mx-6 mt-4 max-w-[1600px] bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3">

                <span className="material-symbols-outlined text-red-500 flex-shrink-0" style={{ fontVariationSettings: "\"FILL\" 1" }}>error</span>

                <p id="error-text" className="text-sm text-red-700 font-medium flex-1"></p>

                <button onClick={event => runLegacyAction("hideError()", event)} className="text-red-400 hover:text-red-600">

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

                                                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>account_balance_wallet</span>

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
หมายเลขบัญชี                       <span className="text-red-500">*</span>
                    </label>

                                                    <div className="relative">

                                                          <span className="material-symbols-outlined readonly-display-icon">badge</span>

                                                          <input id="account-no" className="form-input-styled readonly-display-input readonly-display-with-icon pr-4" type="text" readOnly tabIndex={-1} />

                                                    </div>

                                                    <p id="warn-account-no" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span id="warn-account-no-msg">กรุณากรอกตัวเลขเท่านั้น</span>
                    </p>

                                              </div>


                                              <div>

                                                    <label className="form-label-styled">
ชื่อ-นามสกุล                       <span className="text-red-500">*</span>
                    </label>

                                                    <div className="relative">

                                                          <span className="material-symbols-outlined readonly-display-icon">person</span>

                                                          <input id="customer-name" className="form-input-styled readonly-display-input readonly-display-with-icon pr-4" type="text" readOnly tabIndex={-1} />

                                                    </div>

                                                    <p id="warn-customer-name" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span id="warn-customer-name-msg">ไม่อนุญาตให้ใช้อักขระพิเศษ</span>
                    </p>

                                              </div>


                                              <div>

                                                    <label className="form-label-styled">ทุนทรัพย์ที่ฟ้อง</label>

                                                    <div className="relative">

                                                          <input id="filing-capital" className="form-input-styled readonly-display-input readonly-display-with-icon text-right pr-4" type="text" readOnly tabIndex={-1} />

                                                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-extrabold text-indigo-300 pointer-events-none">฿</span>

                                                    </div>

                                              </div>


                                              <div>

                                                    <label className="form-label-styled">วันที่ผิดนัดชำระก่อนฟ้อง</label>

                                                    <div className="relative">

                                                          <span className="material-symbols-outlined readonly-display-icon">event</span>

                                                          <input id="default-date-display" className="form-input-styled readonly-display-input readonly-display-with-icon pr-4" type="text" readOnly tabIndex={-1} />

                                                    </div>

                                              </div>


                                              <div>

                                                    <label className="form-label-styled">DPD ณ วันที่ก่อนส่งฟ้องศาล 1 วัน</label>

                                                    <div className="relative">

                                                          <span className="material-symbols-outlined readonly-display-icon">timer</span>

                                                          <input id="pre-filing-dpd-days-display" className="form-input-styled readonly-display-input readonly-display-with-icon pr-4" type="text" readOnly tabIndex={-1} />

                                                    </div>

                                              </div>


                                              <div>

                                                    <label className="form-label-styled">หมายเหตุ / เงื่อนไขพิเศษ</label>

                                                    <div id="filing-note-display" className="readonly-display-text theme-tooltip" data-tooltip="-" tabIndex={0}>

                                                          <span className="material-symbols-outlined readonly-display-icon">notes</span>

                                                          <span id="filing-note-display-text" className="block truncate">-</span>

                                                          <div className="note-tooltip-popover" role="tooltip" aria-label="หมายเหตุและเงื่อนไขพิเศษ">

                                                                <div className="note-tooltip-head">

                                                                      <span className="note-tooltip-icon">

                                                                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>sticky_note_2</span>

                                                                      </span>

                                                                      <span className="note-tooltip-title">หมายเหตุ / เงื่อนไขพิเศษ</span>

                                                                </div>

                                                                <div id="filing-note-tooltip-text" className="note-tooltip-body">-</div>

                                                          </div>

                                                    </div>

                                              </div>

                                        </div>

                                        {/* Timestamps */}

                                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">

                                              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">

                                                    <span className="material-symbols-outlined text-sm text-slate-300" style={{ fontVariationSettings: "\"FILL\" 1" }}>add_circle</span>

                                                    <span>สร้างเมื่อ</span>

                                                    <span id="ts-created-at" className="font-semibold text-slate-500">-</span>

                                              </div>

                                              <div className="w-px h-3 bg-slate-200"></div>

                                              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">

                                                    <span className="material-symbols-outlined text-sm text-slate-300" style={{ fontVariationSettings: "\"FILL\" 1" }}>edit</span>

                                                    <span>แก้ไขล่าสุด</span>

                                                    <span id="ts-updated-at" className="font-semibold text-slate-500">-</span>

                                              </div>

                                        </div>

                                  </div>

                            </div>

                      </div>



                      {/* Section บันทึกหมายบังคับคดี — Form */}

                      <div className="col-span-12" id="section-enforcement-form" style={{ display: "none" }}>

                            <div className="dashboard-card">

                                  <div className="dashboard-card-header detail-card-heading" style={{ background: "linear-gradient(135deg,#FFF5F5,#fff)" }}>

                                        <div className="flex items-center gap-3">

                                              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-600">

                                                    <span className="material-symbols-outlined text-lg">assignment</span>

                                              </div>

                                              <div>

                                                    <h3 className="font-bold text-sm text-slate-800">บันทึกหมายบังคับคดี</h3>

                                                    <p className="text-[11px] text-red-400">เมื่อบันทึกแล้ว สถานะจะเปลี่ยนเป็น บังคับคดี</p>

                                              </div>

                                        </div>

                                  </div>

                                  <div className="dashboard-card-content">

                                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 items-start">

                                              <div>

                                                    <label className="form-label-styled">
คดีหมายเลขแดงที่                       <span className="text-red-500">*</span>
                    </label>

                                                    <div className="dp-input-row relative">

                                                          <input id="enf-red-case-no" className="dp-input dp-autocalc font-semibold" type="text" defaultValue="-" disabled />

                                                          <span className="material-symbols-outlined dp-icon">confirmation_number</span>

                                                    </div>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">
วันที่ของหมายบังคับคดี                       <span className="text-red-500">*</span>
                    </label>

                                                    <div className="dp-wrap" id="dp-wrap-enf-judgment-date">

                                                          <div className="dp-input-row relative">

                                                                <input type="hidden" id="enf-judgment-date" />

                                                                <div className="dp-input" id="dp-display-enf-judgment-date" tabIndex={0} onClick={event => runLegacyAction("dpOpen('enf-judgment-date')", event)}>

                                                                      <span id="dp-text-enf-judgment-date" className="text-slate-400">เลือกวันที่</span>

                                                                </div>

                                                                <span className="material-symbols-outlined dp-icon">calendar_today</span>

                                                          </div>

                                                          <div className="dp-popup" id="dp-popup-enf-judgment-date">

                                                                <div className="dp-header">

                                                                      <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('enf-judgment-date',-1)", event)} type="button">
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                          </button>

                                                                      <span className="dp-month-year" id="dp-title-enf-judgment-date" onClick={event => runLegacyAction("dpToggleMyPicker('enf-judgment-date')", event)}></span>

                                                                      <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('enf-judgment-date',1)", event)} type="button">
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                          </button>

                                                                </div>

                                                                <div id="dp-my-enf-judgment-date" className="hidden">

                                                                      <div className="dp-year-header">

                                                                            <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('enf-judgment-date',-1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                            </button>

                                                                            <span id="dp-year-label-enf-judgment-date" className="font-bold text-sm text-slate-700"></span>

                                                                            <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('enf-judgment-date',1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                            </button>

                                                                      </div>

                                                                      <div className="dp-my-grid" id="dp-months-enf-judgment-date"></div>

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

                                                                      <div className="dp-days" id="dp-days-enf-judgment-date"></div>

                                                                </div>

                                                                <div className="dp-footer">

                                                                      <button className="dp-btn-clear" onClick={event => runLegacyAction("dpClear('enf-judgment-date')", event)} type="button">ล้างค่า</button>

                                                                      <button className="dp-btn-today" onClick={event => runLegacyAction("dpSelectToday('enf-judgment-date')", event)} type="button">วันนี้</button>

                                                                </div>

                                                          </div>

                                                    </div>

                                              </div>

                                        </div>

                                        <div className="mt-2 flex justify-end">

                                              <button onClick={event => runLegacyAction("submitEnforcement()", event)} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-red-700 transition-all whitespace-nowrap">

                                                    <span className="material-symbols-outlined text-sm">assignment_turned_in</span>

                                บันทึกหมายบังคับคดี
                                              </button>

                                        </div>

                                  </div>

                            </div>

                      </div>


                      {/* Section ข้อมูลหมายบังคับคดี Read Only */}

                      <div className="col-span-12" id="section-enforcement-info" style={{ display: "none" }}>

                            <div className="dashboard-card overflow-hidden">

                                  {/* Header */}

                                  <div className="detail-card-heading px-5 md:px-6 py-4 border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-rose-50 rounded-t-2xl overflow-hidden">

                                        <div className="flex items-center justify-between gap-3 flex-wrap">

                                              <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center text-red-600 shadow-sm flex-shrink-0">

                                                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>assignment_turned_in</span>

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

                                        แสดงรายละเอียดหมายบังคับคดีที่บันทึกแล้ว และใช้ติดตามขั้นตอนหลังคำพิพากษา
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

                                                          <span className="material-symbols-outlined text-red-400 text-base" style={{ fontVariationSettings: "\"FILL\" 1" }}>confirmation_number</span>

                                                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">คดีหมายเลขแดงที่</p>

                                                    </div>

                                                    <p id="enf-info-red-case-no" className="text-sm font-bold text-slate-800">-</p>

                                              </div>


                                              <div>

                                                    <div className="flex items-center gap-2 mb-1">

                                                          <span className="material-symbols-outlined text-red-400 text-base" style={{ fontVariationSettings: "\"FILL\" 1" }}>gavel</span>

                                                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">วันที่ของหมายบังคับคดี</p>

                                                    </div>

                                                    <p id="enf-info-judgment-date" className="text-sm font-bold text-slate-800">-</p>

                                              </div>


                                              <div>

                                                    <div className="flex items-center gap-2 mb-1">

                                                          <span className="material-symbols-outlined text-red-400 text-base" style={{ fontVariationSettings: "\"FILL\" 1" }}>person_check</span>

                                                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">วันที่บันทึกหมายบังคับคดี</p>

                                                    </div>

                                                    <p id="enf-info-recorded" className="text-sm font-semibold text-slate-600">-</p>

                                              </div>

                                        </div>


                                        <div id="retro-enforcement-panel" className="mt-4 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3">

                                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                                                    <div className="flex items-start gap-3 min-w-0">

                                                          <div className="w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">

                                                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>manage_history</span>

                                                          </div>

                                                          <div className="min-w-0">

                                                                <div className="flex items-center gap-2 flex-wrap">

                                                                      <p className="text-sm font-extrabold text-slate-800">การแก้รายงานย้อนหลัง</p>

                                                                      <span id="retro-enforcement-status-badge" className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">-</span>

                                                                </div>

                                                                <p id="retro-enforcement-message" className="text-[12px] text-slate-500 mt-1">กำลังตรวจสอบสถานะรายงานย้อนหลัง...</p>

                                                                <p id="retro-enforcement-meta" className="text-[11px] text-slate-400 mt-1">-</p>

                                                          </div>

                                                    </div>


                                                    <button id="retro-enforcement-toggle" type="button" role="switch" aria-checked="false" onClick={event => runLegacyAction("openRetroEnforcementConfirm()", event)} className="retro-toggle-btn w-full sm:w-[245px] border-slate-200 text-slate-500">

                                                          <span id="retro-enforcement-toggle-label" className="truncate leading-none">แก้รายงานแล้ว</span>

                                                          <span id="retro-enforcement-toggle-knob" className="retro-toggle-track bg-slate-200">

                                                                <span className="retro-toggle-dot"></span>

                                                          </span>

                                                    </button>

                                              </div>

                                        </div>

                                  </div>

                            </div>

                      </div>


                      {/* Judgment Details */}

                      <div className="col-span-12 lg:col-span-6 flex flex-col" style={{ overflow: "visible" }}>

                            <div className="dashboard-card case-entry-card judgment-card flex-1" style={{ overflow: "visible" }}>

                                  <div className="detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50 rounded-t-2xl overflow-hidden">

                                        <div className="flex items-center justify-between gap-3 flex-wrap">

                                              <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0">

                                                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>

                                                    </div>


                                                    <div>

                                                          <div className="flex items-center gap-2 flex-wrap">

                                                                <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">

                                            รายละเอียดคำพิพากษา
                                                                </h2>

                                                          </div>

                                                          <p className="text-[12px] text-slate-500 mt-0.5">

                                        กรอกข้อมูลคำพิพากษา และรายละเอียดเพื่อใช้คำนวณตารางผ่อนชำระ
                                                          </p>

                                                    </div>

                                              </div>

                                        </div>

                                  </div>

                                  <div className="dashboard-card-content form-section-compact">

                                        {/* Dropdown ประเภทคำพิพากษา — แสดงเฉพาะ ยื่นฟ้อง */}

                                        <div id="judgment-type-row" className="hidden mb-3 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow-sm">

                                              <label className="form-label-styled text-indigo-600">
ประเภทคำพิพากษา                     <span className="text-red-500">*</span>
                  </label>


                                              {/* Custom Dropdown */}

                                              <div className="relative" id="jt-dropdown-wrap">

                                                    {/* hidden input เก็บค่าจริง */}

                                                    <input type="hidden" id="judgment-type" defaultValue="" />


                                                    {/* Trigger button */}

                                                    <button type="button" id="jt-trigger" onClick={event => runLegacyAction("jtToggle()", event)} className="w-full flex items-center justify-between bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:border-indigo-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm">

                                                          <span id="jt-display" className="text-slate-400">-- เลือกประเภทเพื่อเปลี่ยนสถานะ --</span>

                                                          <span className="material-symbols-outlined text-indigo-300 text-lg transition-transform duration-200" id="jt-chevron">expand_more</span>

                                                    </button>


                                                    {/* Dropdown panel */}

                                                    <div id="jt-panel" className="hidden absolute left-0 right-0 mt-1.5 bg-white border border-indigo-100 rounded-xl shadow-lg shadow-indigo-100/50 z-50 overflow-hidden">


                                                          {/* Option: พิพากษาตามยอม */}

                                                          <button type="button" onClick={event => runLegacyAction("jtSelect('พิพากษาตามยอม')", event)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group border-b border-slate-50">

                                                                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-all">

                                                                      <span className="material-symbols-outlined text-green-600 text-base" style={{ fontVariationSettings: "\"FILL\" 1" }}>handshake</span>

                                                                </div>

                                                                <div className="flex-1">

                                                                      <p className="text-sm font-semibold text-slate-800">พิพากษาตามยอม</p>

                                                                      <p className="text-[11px] text-slate-400">ลูกหนี้ยินยอมตามคำพิพากษา</p>

                                                                </div>

                                                                <span id="jt-check-พิพากษาตามยอม" className="hidden material-symbols-outlined text-indigo-600 text-lg" style={{ fontVariationSettings: "\"FILL\" 1" }}>check_circle</span>

                                                          </button>


                                                          {/* Option: พิพากษาฝ่ายเดียว */}

                                                          <button type="button" onClick={event => runLegacyAction("jtSelect('พิพากษาฝ่ายเดียว')", event)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 transition-all group">

                                                                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-all">

                                                                      <span className="material-symbols-outlined text-orange-600 text-base" style={{ fontVariationSettings: "\"FILL\" 1" }}>gavel</span>

                                                                </div>

                                                                <div className="flex-1">

                                                                      <p className="text-sm font-semibold text-slate-800">พิพากษาฝ่ายเดียว</p>

                                                                      <p className="text-[11px] text-slate-400">ศาลตัดสินโดยลูกหนี้ไม่มาศาล</p>

                                                                </div>

                                                                <span id="jt-check-พิพากษาฝ่ายเดียว" className="hidden material-symbols-outlined text-indigo-600 text-lg" style={{ fontVariationSettings: "\"FILL\" 1" }}>check_circle</span>

                                                          </button>


                                                    </div>

                                              </div>


                                              <p className="text-[11px] text-indigo-400 mt-1.5">เมื่อบันทึก จะเปลี่ยนสถานะจาก ยื่นฟ้อง → ประเภทที่เลือก</p>

                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced">

                                              <div>

                                                    <label className="form-label-styled">
วันที่ยื่นฟ้อง                       <span className="text-red-500">*</span>
                    </label>

                                                    <div className="dp-wrap" id="dp-wrap-filing-date">

                                                          <div className="dp-input-row relative">

                                                                <input type="hidden" id="filing-date" />

                                                                <div className="dp-input" id="dp-display-filing-date" tabIndex={0} onClick={event => runLegacyAction("dpOpen('filing-date')", event)} onKeyDown={event => runLegacyAction("if(event.key==='Enter'||event.key===' ')dpOpen('filing-date')", event)}>

                                                                      <span id="dp-text-filing-date" className="text-slate-400">เลือกวันที่ยื่นฟ้อง</span>

                                                                </div>

                                                                <span className="material-symbols-outlined dp-icon">calendar_today</span>

                                                          </div>

                                                          <div className="dp-popup" id="dp-popup-filing-date">

                                                                <div className="dp-header">

                                                                      <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('filing-date',-1)", event)} type="button">
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                          </button>

                                                                      <span className="dp-month-year" id="dp-title-filing-date" onClick={event => runLegacyAction("dpToggleMyPicker('filing-date')", event)}></span>

                                                                      <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('filing-date',1)", event)} type="button">
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                          </button>

                                                                </div>

                                                                <div id="dp-my-filing-date" className="hidden">

                                                                      <div className="dp-year-header">

                                                                            <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('filing-date',-1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                            </button>

                                                                            <span id="dp-year-label-filing-date" className="font-bold text-sm text-slate-700"></span>

                                                                            <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('filing-date',1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                            </button>

                                                                      </div>

                                                                      <div className="dp-my-grid" id="dp-months-filing-date"></div>

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

                                                                      <div className="dp-days" id="dp-days-filing-date"></div>

                                                                </div>

                                                                <div className="dp-footer">

                                                                      <button className="dp-btn-clear" onClick={event => runLegacyAction("dpClear('filing-date')", event)} type="button">ล้างค่า</button>

                                                                      <button className="dp-btn-today" onClick={event => runLegacyAction("dpSelectToday('filing-date')", event)} type="button">วันนี้</button>

                                                                </div>

                                                          </div>

                                                    </div>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">
วันที่พิพากษา                       <span className="text-red-500">*</span>
                    </label>

                                                    <div className="dp-wrap" id="dp-wrap-judgment-date">

                                                          <div className="dp-input-row relative">

                                                                <input type="hidden" id="judgment-date" />

                                                                <div className="dp-input" id="dp-display-judgment-date" tabIndex={0} onClick={event => runLegacyAction("dpOpen('judgment-date')", event)} onKeyDown={event => runLegacyAction("if(event.key==='Enter'||event.key===' ')dpOpen('judgment-date')", event)}>

                                                                      <span id="dp-text-judgment-date" className="text-slate-400">เลือกวันที่พิพากษา</span>

                                                                </div>

                                                                <span className="material-symbols-outlined dp-icon">calendar_today</span>

                                                          </div>

                                                          <div className="dp-popup" id="dp-popup-judgment-date">

                                                                <div className="dp-header">

                                                                      <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('judgment-date',-1)", event)} type="button">
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                          </button>

                                                                      <span className="dp-month-year" id="dp-title-judgment-date" onClick={event => runLegacyAction("dpToggleMyPicker('judgment-date')", event)}></span>

                                                                      <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('judgment-date',1)", event)} type="button">
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                          </button>

                                                                </div>

                                                                <div id="dp-my-judgment-date" className="hidden">

                                                                      <div className="dp-year-header">

                                                                            <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('judgment-date',-1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                            </button>

                                                                            <span id="dp-year-label-judgment-date" className="font-bold text-sm text-slate-700"></span>

                                                                            <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('judgment-date',1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                            </button>

                                                                      </div>

                                                                      <div className="dp-my-grid" id="dp-months-judgment-date"></div>

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

                                                                      <div className="dp-days" id="dp-days-judgment-date"></div>

                                                                </div>

                                                                <div className="dp-footer">

                                                                      <button className="dp-btn-clear" onClick={event => runLegacyAction("dpClear('judgment-date')", event)} type="button">ล้างค่า</button>

                                                                      <button className="dp-btn-today" onClick={event => runLegacyAction("dpSelectToday('judgment-date')", event)} type="button">วันนี้</button>

                                                                </div>

                                                          </div>

                                                    </div>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">
คดีหมายเลขแดงที่                       <span className="text-red-500">*</span>
                    </label>

                                                    <input id="red-case-no" className="form-input-styled font-medium" type="text" placeholder="เช่น ผบ1234/2567 หรือ พE325/2568" autoComplete="off" />

                                                    <p id="warn-red-case-no" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span>รูปแบบคดีหมายเลขแดงไม่ถูกต้อง</span>
                    </p>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled text-blue-600">
ยอดหนี้ตามคำพิพากษา                       <span className="text-red-500">*</span>
                    </label>

                                                    <div className="relative">

                                                          <input id="total-debt" className="form-input-styled font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />

                                                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                    </div>

                                                    <p id="warn-total-debt" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span>กรุณากรอกตัวเลขเท่านั้น</span>
                    </p>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">
เงินต้นตามคำพิพากษา                       <span className="text-red-500">*</span>
                    </label>

                                                    <div className="relative">

                                                          <input id="principal" className="form-input-styled font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />

                                                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                    </div>

                                                    <p id="warn-principal" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span>กรุณากรอกตัวเลขเท่านั้น</span>
                    </p>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">
อัตราดอกเบี้ย/ปี                       <span className="text-red-500">*</span>
                    </label>

                                                    <input id="interest-rate" className="form-input-styled font-medium text-right" placeholder="0" type="text" inputMode="decimal" autoComplete="off" />

                                                    <p id="warn-interest-rate" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span>กรุณากรอกตัวเลขเท่านั้น</span>
                    </p>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">ค่าธรรมเนียมศาล</label>

                                                    <div className="relative">

                                                          <input id="court-fee" className="form-input-styled font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />

                                                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                    </div>

                                                    <p id="warn-court-fee" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span>กรุณากรอกตัวเลขเท่านั้น</span>
                    </p>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">ค่าทนายความ</label>

                                                    <div className="relative">

                                                          <input id="lawyer-fee" className="form-input-styled font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />

                                                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                    </div>

                                                    <p id="warn-lawyer-fee" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span>กรุณากรอกตัวเลขเท่านั้น</span>
                    </p>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">
จำนวนงวดผ่อน                       <span className="text-red-500">*</span>
                    </label>

                                                    <input id="installment-count" className="form-input-styled font-medium" placeholder="0" type="text" inputMode="numeric" autoComplete="off" />

                                                    <p id="warn-installment-count" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span>กรุณากรอกตัวเลขจำนวนเต็มเท่านั้น</span>
                    </p>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled flex items-center gap-2">

                                    ยอดหนี้ส่วนต่าง
                                                          <span className="auto-badge-soft">AUTO</span>

                                                    </label>

                                                    <div className="relative">

                                                          <input id="diff-debt" className="form-input-styled autocalc-input font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" readOnly tabIndex={-1} onFocus={event => runLegacyAction("this.blur()", event)} />

                                                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                    </div>

                                              </div>

                                              <div className="sm:col-span-2">

                                                    <label className="form-label-styled">หมายเหตุ / เงื่อนไขพิเศษเพิ่มเติม</label>

                                                    <textarea id="judgment-note" className="form-input-styled min-h-[92px] resize-none" maxLength={100} placeholder="กรอกหมายเหตุเพิ่มเติม (ถ้ามี)"></textarea>

                                                    <p className="text-[10px] text-slate-400 mt-1">
                      <span id="judgment-note-counter">0</span>
/100 ตัวอักษร                    </p>

                                              </div>

                                              <div id="retro-judgment-panel" className="sm:col-span-2 border border-amber-100 bg-amber-50/60 rounded-2xl px-4 py-3">

                                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                                                          <div className="flex items-start gap-3 min-w-0">

                                                                <div className="w-9 h-9 rounded-xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">

                                                                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>gavel</span>

                                                                </div>

                                                                <div className="min-w-0">

                                                                      <div className="flex items-center gap-2 flex-wrap">

                                                                            <p className="text-sm font-extrabold text-slate-800">คำพิพากษาข้ามเดือน</p>

                                                                            <span id="retro-judgment-status-badge" className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">-</span>

                                                                      </div>

                                                                      <p id="retro-judgment-message" className="text-[12px] text-slate-500 mt-1">กำลังตรวจสอบสถานะรายงานย้อนหลัง...</p>

                                                                      <p id="retro-judgment-meta" className="text-[11px] text-slate-400 mt-1">-</p>

                                                                </div>

                                                          </div>


                                                          <button id="retro-judgment-confirm-btn" type="button" onClick={event => runLegacyAction("confirmRetroJudgmentFix()", event)} className="w-full sm:w-[245px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-bold transition-all">

                                        ยืนยันว่าแก้รายงานย้อนหลังแล้ว
                                                          </button>

                                                    </div>

                                              </div>

                                        </div>

                                  </div>

                            </div>

                      </div>


                      {/* Payment Details */}

                      <div className="col-span-12 lg:col-span-6 flex flex-col" style={{ overflow: "visible" }}>

                            <div className="dashboard-card case-entry-card payment-card flex-1" style={{ overflow: "visible" }}>

                                  <div className="detail-card-heading case-section-heading px-5 md:px-6 py-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 rounded-t-2xl overflow-hidden">

                                        <div className="flex items-center justify-between gap-3 flex-wrap">

                                              <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">

                                                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>

                                                    </div>


                                                    <div>

                                                          <div className="flex items-center gap-2 flex-wrap">

                                                                <h2 className="text-[18px] font-extrabold text-slate-800 tracking-tight">

                                            รายละเอียดการชำระเงินตามคำพิพากษา
                                                                </h2>

                                                          </div>

                                                          <p className="text-[12px] text-slate-500 mt-0.5">

                                        กำหนดงวดชำระ ค่างวด และดอกเบี้ยเพื่อใช้คำนวณตารางผ่อนชำระ
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
วันครบกำหนดงวดแรก                         <span className="text-red-500">*</span>
                      </label>

                                                          <div className="dp-wrap" id="dp-wrap-first-due-date">

                                                            <div className="dp-input-row relative">

                                                                  <input type="hidden" id="first-due-date" />

                                                                  <div className="dp-input" id="dp-display-first-due-date" tabIndex={0} onClick={event => runLegacyAction("dpOpen('first-due-date')", event)} onKeyDown={event => runLegacyAction("if(event.key==='Enter'||event.key===' ')dpOpen('first-due-date')", event)}>

                                                                        <span id="dp-text-first-due-date" className="text-slate-400">เลือกวันครบกำหนดงวดแรก</span>

                                                                  </div>

                                                                  <span className="material-symbols-outlined dp-icon">calendar_today</span>

                                                            </div>

                                                            <div className="dp-popup" id="dp-popup-first-due-date">

                                                                  <div className="dp-header">

                                                                        <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('first-due-date',-1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                            </button>

                                                                        <span className="dp-month-year" id="dp-title-first-due-date" onClick={event => runLegacyAction("dpToggleMyPicker('first-due-date')", event)}></span>

                                                                        <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('first-due-date',1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                            </button>

                                                                  </div>

                                                                  <div id="dp-my-first-due-date" className="hidden">

                                                                        <div className="dp-year-header">

                                                                              <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('first-due-date',-1)", event)} type="button">
                                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                              </button>

                                                                              <span id="dp-year-label-first-due-date" className="font-bold text-sm text-slate-700"></span>

                                                                              <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('first-due-date',1)", event)} type="button">
                                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                              </button>

                                                                        </div>

                                                                        <div className="dp-my-grid" id="dp-months-first-due-date"></div>

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

                                                                        <div className="dp-days" id="dp-days-first-due-date"></div>

                                                                  </div>

                                                                  <div className="dp-footer">

                                                                        <button className="dp-btn-clear" onClick={event => runLegacyAction("dpClear('first-due-date')", event)} type="button">ล้างค่า</button>

                                                                        <button className="dp-btn-today" onClick={event => runLegacyAction("dpSelectToday('first-due-date')", event)} type="button">วันนี้</button>

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

                                                                  <div className="dp-input dp-readonly dp-autocalc" id="dp-display-last-due-date" tabIndex={-1}>

                                                                        <span id="dp-text-last-due-date">คำนวณอัตโนมัติ</span>

                                                                  </div>

                                                                  <span className="material-symbols-outlined dp-icon">calendar_today</span>

                                                            </div>

                                                            <div className="dp-popup" id="dp-popup-last-due-date">

                                                                  <div className="dp-header">

                                                                        <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('last-due-date',-1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                            </button>

                                                                        <span className="dp-month-year" id="dp-title-last-due-date" onClick={event => runLegacyAction("dpToggleMyPicker('last-due-date')", event)}></span>

                                                                        <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavMonth('last-due-date',1)", event)} type="button">
                              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                            </button>

                                                                  </div>

                                                                  <div id="dp-my-last-due-date" className="hidden">

                                                                        <div className="dp-year-header">

                                                                              <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('last-due-date',-1)", event)} type="button">
                                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_left</span>
                              </button>

                                                                              <span id="dp-year-label-last-due-date" className="font-bold text-sm text-slate-700"></span>

                                                                              <button className="dp-nav-btn" onClick={event => runLegacyAction("dpNavYear('last-due-date',1)", event)} type="button">
                                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chevron_right</span>
                              </button>

                                                                        </div>

                                                                        <div className="dp-my-grid" id="dp-months-last-due-date"></div>

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

                                                                        <div className="dp-days" id="dp-days-last-due-date"></div>

                                                                  </div>

                                                                  <div className="dp-footer">

                                                                        <button className="dp-btn-clear" onClick={event => runLegacyAction("dpClear('last-due-date')", event)} type="button">ล้างค่า</button>

                                                                        <button className="dp-btn-today" onClick={event => runLegacyAction("dpSelectToday('last-due-date')", event)} type="button">วันนี้</button>

                                                                  </div>

                                                            </div>

                                                      </div>

                                                    </div>

                                              </div>

                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 field-grid-enhanced">

                                                    <div>

                                                          <label className="form-label-styled">
ค่างวด งวดที่ 1                         <span className="text-red-500">*</span>
                      </label>

                                                          <div className="relative">

                                                                <input id="installment-1" className="form-input-styled font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />

                                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                          </div>

                                                          <p id="warn-installment-1" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>

                                                    </div>

                                                    <div>

                                                          <label className="form-label-styled">ค่างวด งวดที่ 2</label>

                                                          <div className="relative">

                                                                <input id="installment-2" className="form-input-styled font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />

                                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                          </div>

                                                          <p id="warn-installment-2" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>

                                                    </div>

                                                    <div>

                                                          <label className="form-label-styled">ค่างวด งวดที่ 3</label>

                                                          <div className="relative">

                                                                <input id="installment-3" className="form-input-styled font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />

                                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                          </div>

                                                          <p id="warn-installment-3" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>

                                                    </div>

                                                    <div>

                                                          <label className="form-label-styled">ค่างวด งวดที่ 4</label>

                                                          <div className="relative">

                                                                <input id="installment-4" className="form-input-styled font-medium text-right pr-4 pl-10" placeholder="0.00" type="text" inputMode="decimal" autoComplete="off" />

                                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-400">฿</span>

                                                          </div>

                                                          <p id="warn-installment-4" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                        <span>กรุณากรอกตัวเลขเท่านั้น</span>
                      </p>

                                                    </div>

                                              </div>

                                              <div>

                                                    <label className="form-label-styled">ดอกเบี้ยเมื่อผิดนัดชำระ (%)</label>

                                                    <input id="default-interest-rate" className="form-input-styled font-medium text-right" placeholder="0" type="text" inputMode="decimal" autoComplete="off" />

                                                    <p id="warn-default-interest-rate" className="hidden text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>
                      <span>กรุณากรอกตัวเลขเท่านั้น</span>
                    </p>

                                              </div>


                                              <div className="helper-panel">

                                                    <div className="flex items-start gap-2">

                                                          <span className="material-symbols-outlined text-blue-400 text-base mt-0.5">info</span>

                                                          <p>

                                        ระบบจะใช้ข้อมูลทั้งหมดที่กรอก เพื่อคำนวณตารางผ่อนชำระในส่วนพรีวิว
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

                                                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>history</span>

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

                                  <div id="edit-history-body" className="px-6 py-4 text-sm text-slate-400 text-center">กำลังโหลด...</div>

                            </div>

                      </div>


                      {/* Schedule Preview */}

                      <div className="col-span-12">

                            <div className="dashboard-card">

                                  <div className="detail-card-heading px-5 md:px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-t-2xl overflow-hidden">

                                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                                              <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">

                                                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>calendar_today</span>

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

                                                          <button id="view-monthly-btn" onClick={event => runLegacyAction("switchView('monthly')", event)} className="px-3 py-1 rounded-lg text-[12px] font-bold transition-all bg-white text-primary shadow-sm">

                                        แสดงรายเดือน
                                                          </button>

                                                          <button id="view-daily-btn" onClick={event => runLegacyAction("switchView('daily')", event)} className="px-3 py-1 rounded-lg text-[12px] font-bold transition-all text-slate-500 hover:text-slate-700">

                                        แสดงทุกวันที่
                                                          </button>

                                                    </div>


                                                    <div id="preview-stale-warn" className="hidden flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-600 font-bold">

                                                          <span className="material-symbols-outlined text-sm">refresh</span>

                                    กรุณากดพรีวิวใหม่
                                                    </div>


                                              </div>

                                        </div>

                                  </div>

                                  <div className="overflow-hidden flex flex-col">

                                        <div id="schedule-placeholder" className="p-8 text-center text-slate-400 text-sm">

                            กรอกข้อมูลให้ครบแล้วกด "พรีวิว" เพื่อดูตารางผ่อนชำระ
                                        </div>

                                        <div id="schedule-loading" className="hidden p-8 text-center text-slate-400 text-sm">

                                              <svg className="animate-spin w-6 h-6 mx-auto mb-2 text-primary" fill="none" viewBox="0 0 24 24">

                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>

                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>

                                              </svg>

                            กำลังคำนวณ...
                                        </div>

                                        <div id="schedule-table-wrap" className="hidden overflow-x-auto" style={{ maxHeight: "480px", overflowY: "auto" }}>

                                              <table className="w-full text-left border-collapse min-w-[1100px]">

                                                    <thead className="sticky top-0 z-10">

                                                          <tr className="bg-slate-50 border-b border-slate-100">

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">วันที่</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">งวดที่</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">เงินต้นยกมา</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">จ่ายค่างวด</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">ตัดดอกเบี้ย</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">ตัดเงินต้น</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">ชำระอื่น</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">เงินต้นคงเหลือ</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">ดอกเบี้ยรายวัน</th>

                                                                <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">ดอกเบี้ยสะสม</th>

                                                          </tr>

                                                    </thead>

                                                    <tbody id="schedule-tbody" className="divide-y divide-slate-50 text-[12px]"></tbody>

                                              </table>

                                        </div>

                                        <div id="schedule-info" className="hidden px-6 py-3 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between gap-4">

                                              <span id="schedule-info-text" className="text-[11px] text-slate-500"></span>

                                              <div id="schedule-pagination" className="flex items-center gap-1"></div>

                                        </div>

                                  </div>

                            </div>

                      </div>


                </div>

          </div>

          <div id="status-logs-body" className="hidden"></div>

    </main>


    {/* Toast Modal */}

    <div id="toast-modal" className="hidden fixed inset-0 z-[300] flex items-center justify-center p-4">

          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={event => runLegacyAction("document.getElementById('toast-modal').classList.add('hidden')", event)}></div>

          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">

                <div className="p-6 flex flex-col items-center text-center">

                      <div id="toast-icon-wrap" className="w-14 h-14 rounded-full flex items-center justify-center mb-4">

                            <span id="toast-icon" className="material-symbols-outlined text-3xl"></span>

                      </div>

                      <h3 id="toast-title" className="text-base font-bold text-slate-800 mb-1"></h3>

                      <p id="toast-message" className="text-sm text-slate-500 leading-relaxed"></p>

                </div>

                <div className="px-6 pb-5">

                      <button onClick={event => runLegacyAction("document.getElementById('toast-modal').classList.add('hidden')", event)} className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all text-sm">ตกลง</button>

                </div>

          </div>

    </div>




    {/* Confirm Review Modal */}

    <div id="confirm-modal" className="hidden fixed inset-0 z-[300] flex items-center justify-center px-6 py-8">

          <div className="absolute inset-0 confirm-review-backdrop"></div>


          <div className="confirm-review-panel relative w-full max-w-5xl max-h-[88vh] rounded-[24px] overflow-hidden flex flex-col">


                {/* Header */}

                <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between gap-4 bg-white/72">

                      <div className="flex items-center gap-4">

                            <div className="confirm-review-icon">

                                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "\"FILL\" 1" }}>fact_check</span>

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


                      <button onClick={event => runLegacyAction("closeConfirmModal()", event)} className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">

                            <span className="material-symbols-outlined text-[20px]">close</span>

                      </button>

                </div>


                {/* Body */}

                <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">


                      {/* รายละเอียดบัญชี */}

                      <section className="confirm-review-section">

                            <div className="confirm-review-section-head">

                                  <div className="confirm-review-section-icon">

                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "\"FILL\" 1" }}>account_balance_wallet</span>

                                  </div>

                                  <h4 className="text-lg font-extrabold text-slate-700">

                        รายละเอียดบัญชี
                                  </h4>

                            </div>


                            <div className="confirm-review-grid">

                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">หมายเลขบัญชี</p>

                                        <p id="rv-account-no" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ชื่อ-นามสกุล</p>

                                        <p id="rv-customer-name" className="confirm-review-value">-</p>

                                  </div>

                            </div>

                      </section>


                      {/* รายละเอียดคำพิพากษา */}

                      <section className="confirm-review-section">

                            <div className="confirm-review-section-head indigo">

                                  <div className="confirm-review-section-icon">

                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "\"FILL\" 1" }}>gavel</span>

                                  </div>

                                  <h4 className="text-lg font-extrabold text-slate-700">

                        รายละเอียดคำพิพากษา
                                  </h4>

                            </div>


                            <div className="confirm-review-grid">

                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">วันที่ยื่นฟ้อง</p>

                                        <p id="rv-filing-date" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">วันที่พิพากษา</p>

                                        <p id="rv-judgment-date" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">คดีหมายเลขแดงที่</p>

                                        <p id="rv-red-case-no" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">หมายเหตุ</p>

                                        <p id="rv-judgment-note" className="confirm-review-value break-words">-</p>

                                  </div>

                            </div>


                            <div id="rv-judgment-type-row" className="confirm-review-highlight hidden">

                                  <p className="confirm-review-label text-indigo-500">ประเภทคำพิพากษา</p>

                                  <p id="rv-judgment-type" className="confirm-review-value primary">-</p>

                            </div>


                            <div className="confirm-review-grid cols-3">

                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ยอดหนี้รวม</p>

                                        <p id="rv-total-debt" className="confirm-review-value primary">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">เงินต้น</p>

                                        <p id="rv-principal" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">อัตราดอกเบี้ย/ปี</p>

                                        <p id="rv-interest-rate" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ค่าธรรมเนียมศาล</p>

                                        <p id="rv-court-fee" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ค่าทนายความ</p>

                                        <p id="rv-lawyer-fee" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ยอดหนี้ส่วนต่าง</p>

                                        <p id="rv-diff-debt" className="confirm-review-value primary">-</p>

                                  </div>

                            </div>

                      </section>


                      {/* รายละเอียดการชำระเงิน */}

                      <section className="confirm-review-section">

                            <div className="confirm-review-section-head green">

                                  <div className="confirm-review-section-icon green">

                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "\"FILL\" 1" }}>payments</span>

                                  </div>

                                  <h4 className="text-lg font-extrabold text-slate-700">

                        รายละเอียดการชำระเงิน
                                  </h4>

                            </div>


                            <div className="confirm-review-grid">

                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">วันครบกำหนดงวดแรก</p>

                                        <p id="rv-first-due-date" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">วันครบกำหนดงวดสุดท้าย</p>

                                        <p id="rv-last-due-date" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">จำนวนงวดผ่อน</p>

                                        <p id="rv-installment-count" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ดอกเบี้ยเมื่อผิดนัด</p>

                                        <p id="rv-default-interest" className="confirm-review-value danger">-</p>

                                  </div>

                            </div>


                            <div className="confirm-review-grid cols-4">

                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ค่างวดที่ 1</p>

                                        <p id="rv-inst-1" className="confirm-review-value">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ค่างวดที่ 2</p>

                                        <p id="rv-inst-2" className="confirm-review-value text-slate-400">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ค่างวดที่ 3</p>

                                        <p id="rv-inst-3" className="confirm-review-value text-slate-400">-</p>

                                  </div>


                                  <div className="confirm-review-item">

                                        <p className="confirm-review-label">ค่างวดที่ 4</p>

                                        <p id="rv-inst-4" className="confirm-review-value text-slate-400">-</p>

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

                            <button onClick={event => runLegacyAction("closeConfirmModal()", event)} className="confirm-review-secondary-btn min-w-[96px] h-10 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold transition-all text-sm">

                    แก้ไข
                            </button>

        
                            <button id="confirm-submit-btn" onClick={event => runLegacyAction("doSubmit()", event)} className="confirm-review-primary-btn min-w-[160px] h-10 px-5 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed">

                                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "\"FILL\" 1" }}>save</span>

                    ยืนยันบันทึก
                            </button>

                      </div>

                </div>


          </div>

    </div>


    {/* Alert Modal */}

    <div id="alert-modal" className="hidden fixed inset-0 z-[200] flex items-center justify-center p-4">

          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[3px]" onClick={event => runLegacyAction("closeAlert()", event)}></div>

          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">

                <div className="p-7 flex flex-col items-center text-center">

                      <div id="alert-icon-wrap" className="w-16 h-16 rounded-full flex items-center justify-center mb-4">

                            <span id="alert-icon" className="material-symbols-outlined text-3xl"></span>

                      </div>

                      <h3 id="alert-title" className="text-lg font-bold text-slate-800 mb-2"></h3>

                      <p id="alert-message" className="text-sm text-slate-500 leading-relaxed mb-6"></p>

                      <button onClick={event => runLegacyAction("closeAlert()", event)} className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm">

                รับทราบ
                      </button>

                </div>

                <button onClick={event => runLegacyAction("closeAlert()", event)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1">

                      <span className="material-symbols-outlined text-lg">close</span>

                </button>

          </div>

    </div>


    {/* Footer actions */}

    <footer className="detail-footer">

          <div className="max-w-[1600px] mx-auto flex justify-between items-center">

                <div></div>

                <div className="flex flex-wrap justify-end gap-4">

                      <button onClick={event => runLegacyAction("handleCancel()", event)} className="btn-secondary-modern">

                Cancel
                      </button>

                      <button id="preview-btn" onClick={event => runLegacyAction("document.getElementById('preview-btn').dataset.manual='true'; loadPreview()", event)} className="btn-primary-modern">

                            <span className="material-symbols-outlined text-base">visibility</span>

                พรีวิว
                      </button>

                      <button id="submit-btn" onClick={event => runLegacyAction("handleSubmit()", event)} disabled className="btn-primary-modern px-6 disabled:opacity-40 disabled:cursor-not-allowed">

                            <span id="btn-default" className="flex items-center gap-2">

                                  <span className="material-symbols-outlined text-base">save</span>

                    บันทึกการแก้ไข
                            </span>

                            <span id="btn-loading" className="hidden flex items-center gap-2">

                                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">

                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>

                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>

                                  </svg>

                    กำลังบันทึก...
                            </span>

                      </button>

                </div>

          </div>

    </footer>


    {/* Retroactive Enforcement Confirm Modal */}

    <div id="retro-enforcement-confirm-modal" className="hidden fixed inset-0 z-[320] flex items-center justify-center p-4">

          <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]" onClick={event => runLegacyAction("closeRetroEnforcementConfirm()", event)}></div>

          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-amber-100 overflow-hidden">

                <div className="px-6 py-5 border-b border-amber-100 bg-amber-50">

                      <div className="flex items-start gap-3">

                            <div className="w-11 h-11 rounded-2xl bg-white text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">

                                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "\"FILL\" 1" }}>warning</span>

                            </div>

                            <div>

                                  <h3 className="text-lg font-extrabold text-slate-800">ยืนยันว่าแก้รายงานย้อนหลังแล้ว?</h3>

                                  <p className="text-xs text-slate-500 mt-1">หลังจากยืนยันแล้ว จะไม่สามารถยกเลิกสถานะนี้ได้</p>

                            </div>

                      </div>

                </div>

                <div className="px-6 py-5 space-y-3 text-sm">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">

                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">เลขที่บัญชี</p>

                                  <p id="retro-modal-account" className="text-sm font-bold text-slate-800 mt-1">-</p>

                            </div>

                            <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">

                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">เดือนที่ต้องตรวจสอบ</p>

                                  <p id="retro-modal-month" className="text-sm font-bold text-amber-700 mt-1">-</p>

                            </div>

                      </div>

                      <p id="retro-modal-message" className="text-slate-600 leading-6">-</p>

                      <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-semibold text-red-600">

                โปรดกดปุ่มยืนยันเฉพาะเมื่อได้ตรวจสอบหรือแก้รายงานเดือนเก่าเรียบร้อยแล้วเท่านั้น
                      </div>

                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">

                      <button type="button" onClick={event => runLegacyAction("closeRetroEnforcementConfirm()", event)} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all">ยกเลิก</button>

                      <button type="button" id="retro-modal-confirm-btn" onClick={event => runLegacyAction("confirmRetroEnforcementFix()", event)} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all">

                ยืนยันว่าแก้รายงานแล้ว
                      </button>

                </div>

          </div>

    </div>

    </>
  );
}
