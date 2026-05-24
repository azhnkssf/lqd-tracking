interface NavbarProps {
  roleLabel: string;
  avatar: string;
}

export default function Navbar({ roleLabel, avatar }: NavbarProps) {
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
            <p id="nav-role" className="text-xs text-indigo-900 font-semibold">{roleLabel}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold border border-blue-100 shrink-0">
            <span id="nav-avatar">{avatar}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
