import { useEffect, useState, type ReactNode } from 'react';
import Navbar from './Navbar';
import PasswordWarningModal from './PasswordWarningModal';
import Sidebar from './Sidebar';

type Role = 'user' | 'admin' | 'superadmin' | '';

interface AppLayoutProps {
  activePage: 'customer-list' | 'payment-record' | 'data-import' | 'report' | 'users' | 'password-policy';
  children: ReactNode;
}

const roleLabels: Record<string, string> = { user: 'User', admin: 'Admin', superadmin: 'Super Admin' };

function getCookie(name: string) {
  return document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1] || '';
}

export default function AppLayout({ activePage, children }: AppLayoutProps) {
  const [role] = useState<Role>(() => (sessionStorage.getItem('role') || '') as Role);
  const [displayName] = useState(() => sessionStorage.getItem('display_name') || '');
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningDays] = useState(() => sessionStorage.getItem('password_warning_days'));

  const roleLabel = roleLabels[role] || role || '-';
  const avatar = displayName.charAt(0) || '-';

  useEffect(() => {
    if (warningDays && !sessionStorage.getItem('password_warning_seen')) {
      sessionStorage.setItem('password_warning_seen', '1');
      const timer = window.setTimeout(() => setWarningOpen(true), 300);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [warningDays]);

  async function handleLogout() {
    const token = getCookie('token');
    await fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    document.cookie = 'token=; path=/; max-age=0';
    sessionStorage.clear();
    window.location.href = '/login';
  }

  return (
    <>
      <Navbar roleLabel={roleLabel} avatar={avatar} />
      <Sidebar activePage={activePage} role={role} roleLabel={roleLabel} onLogout={handleLogout} />
      {children}
      <PasswordWarningModal days={warningDays} open={warningOpen} onClose={() => setWarningOpen(false)} />
    </>
  );
}
