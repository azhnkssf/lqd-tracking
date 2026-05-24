type PageKey = 'users' | 'password-policy' | 'customer-list' | 'payment-record' | 'data-import' | 'report';
type Role = 'user' | 'admin' | 'superadmin' | '';

interface SidebarProps {
  activePage: PageKey;
  role: Role;
  roleLabel: string;
  onLogout: () => void;
}

function itemClass(activePage: PageKey, item: PageKey, hidden = false) {
  const active = activePage === item;
  return [
    hidden ? 'hidden' : '',
    'group flex items-center gap-3 px-3.5 py-3 rounded-[10px] transition-all mb-1',
    active ? 'bg-primary text-white shadow-md shadow-indigo-100' : 'bg-transparent text-slate-600 hover:bg-blue-50 hover:text-primary font-medium',
  ].filter(Boolean).join(' ');
}

function iconClass(activePage: PageKey, item: PageKey) {
  return [
    'material-symbols-outlined font-normal transition-colors',
    activePage !== item ? 'text-slate-400 group-hover:text-primary' : '',
  ].filter(Boolean).join(' ');
}

export default function Sidebar({ activePage, role, roleLabel, onLogout }: SidebarProps) {
  const showSuperAdmin = role === 'superadmin';
  const hideWorkMenus = role === 'superadmin';
  const showAdminMenus = role === 'admin' || role === 'superadmin';

  return (
    <aside className="fixed left-0 top-0 h-full w-56 z-40 bg-white border-r border-blue-100 flex flex-col p-3 gap-2 pt-20 hidden md:flex">
      <div className="px-3.5 py-4 mb-4 bg-blue-50/50 rounded-[12px] border border-blue-50">
        <h2 className="font-headline text-primary text-base font-bold">LQD Debt Overview</h2>
        <p id="sidebar-role-label" className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">{roleLabel} Terminal</p>
      </div>

      <nav className="flex-1 space-y-1">
        {showSuperAdmin && (
          <a id="menu-users" href="/users" className={itemClass(activePage, 'users')}>
            <span className={iconClass(activePage, 'users')} style={activePage === 'users' ? { fontVariationSettings: '"FILL" 1' } : undefined}>manage_accounts</span>
            <span className={`text-sm ${activePage === 'users' ? 'font-semibold' : ''}`}>User Management</span>
          </a>
        )}

        {showSuperAdmin && (
          <a id="menu-password-policy" href="/password-policy" className={itemClass(activePage, 'password-policy')}>
            <span className={iconClass(activePage, 'password-policy')} style={activePage === 'password-policy' ? { fontVariationSettings: '"FILL" 1' } : undefined}>admin_panel_settings</span>
            <span className={`text-sm ${activePage === 'password-policy' ? 'font-semibold' : ''}`}>Password Policy</span>
          </a>
        )}

        <a href="/customer-list" className={itemClass(activePage, 'customer-list', hideWorkMenus)}>
          <span className={iconClass(activePage, 'customer-list')} style={activePage === 'customer-list' ? { fontVariationSettings: '"FILL" 1' } : undefined}>groups</span>
          <span className={`text-sm ${activePage === 'customer-list' ? 'font-semibold' : ''}`}>Customer List</span>
        </a>

        <a href="/payment-record" className={itemClass(activePage, 'payment-record', hideWorkMenus)}>
          <span className={iconClass(activePage, 'payment-record')} style={activePage === 'payment-record' ? { fontVariationSettings: '"FILL" 1' } : undefined}>history</span>
          <span className={`text-sm ${activePage === 'payment-record' ? 'font-semibold' : ''}`}>Payment Record</span>
        </a>

        {showAdminMenus && (
          <a id="menu-import" href="/data-import" className={itemClass(activePage, 'data-import', hideWorkMenus)}>
            <span className={iconClass(activePage, 'data-import')} style={activePage === 'data-import' ? { fontVariationSettings: '"FILL" 1' } : undefined}>upload_file</span>
            <span className={`text-sm ${activePage === 'data-import' ? 'font-semibold' : ''}`}>Data Import Center</span>
          </a>
        )}

        {showAdminMenus && (
          <a id="menu-report" href="/report" className={itemClass(activePage, 'report', hideWorkMenus)}>
            <span className={iconClass(activePage, 'report')} style={activePage === 'report' ? { fontVariationSettings: '"FILL" 1' } : undefined}>assessment</span>
            <span className={`text-sm ${activePage === 'report' ? 'font-semibold' : ''}`}>Report Center</span>
          </a>
        )}
      </nav>

      <div className="mt-auto pt-4 border-t border-blue-50">
        <button type="button" onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-3 text-accent-coral text-sm hover:bg-red-50 rounded-[10px] transition-all font-bold cursor-pointer">
          <span className="material-symbols-outlined font-normal">logout</span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
