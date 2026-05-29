import { useState, type FormEvent, type ReactNode } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Chip,
  CloseButton,
  InputGroup,
  Label,
  TextField,
} from '@heroui/react';

function IcoShield({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-2 13-2-2 1.41-1.41L10 12.17l4.59-4.58L16 9l-6 6z"/>
    </svg>
  );
}
function IcoUser() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
    </svg>
  );
}
function IcoLock() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  );
}
function IcoEyeOff() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
    </svg>
  );
}
function IcoEye() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  );
}
function IcoAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  );
}
function IcoClose() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  );
}
function IcoUp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={11} height={11}>
      <path d="M7 14l5-5 5 5H7z"/>
    </svg>
  );
}
function IcoCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={11} height={11}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  );
}
function IcoClock() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={11} height={11}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
    </svg>
  );
}
function IcoArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={17} height={17}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Sparkline({ data, color, glow }: { data: number[]; color: string; glow: string }) {
  const W = 190, H = 50;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min || 1)) * (H - 8) - 4;
    return `${x},${y}`;
  });
  const line = `M${pts.join(' L')}`;
  const area = `M0,${H} L${pts.join(' L')} L${W},${H} Z`;
  const gId = `g${color.replace('#', '')}`;
  const lastX = W, lastY = H - ((data[data.length - 1] - min) / (max - min || 1)) * (H - 8) - 4;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8"
        style={{ filter: `drop-shadow(0 0 5px ${glow})` }} />
      <circle cx={lastX} cy={lastY} r="3.5" fill={color}
        style={{ filter: `drop-shadow(0 0 6px ${glow})` }} />
    </svg>
  );
}

const CHART = [42, 58, 51, 73, 65, 88, 76, 92, 84, 97, 89, 108];

const ACTIVITY = [
  { init: 'SK', name: 'Somchai K.', action: 'Payment received', amount: '฿32,000', status: 'paid',   color: '#3b82f6' },
  { init: 'NW', name: 'Narin W.',   action: 'Case filed',       amount: '฿9,500',  status: 'filed',  color: '#8b5cf6' },
  { init: 'MT', name: 'Malee T.',   action: 'Judgment issued',  amount: '฿4,200',  status: 'judged', color: '#14b8a6' },
];

const STATUS_META: Record<string, { color: string; icon: ReactNode; label: string }> = {
  paid:   { color: '#16a34a', icon: <IcoCheck />, label: 'Paid' },
  filed:  { color: '#2563eb', icon: <IcoUp />,   label: 'Filed' },
  judged: { color: '#7c3aed', icon: <IcoClock />, label: 'Judged' },
};

function RightPanel() {
  return (
    <aside className="rp" aria-hidden="true">
      <div className="rp-inner">
        <div className="rp-top">
          <Chip
            color="accent"
            size="sm"
            variant="soft"
            className="mb-3 gap-1.5 rounded-full px-3 text-[10px] font-extrabold uppercase tracking-[.08em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            Secured workspace
          </Chip>
          <h2 className="rp-headline">LQD Management System</h2>
          <p className="rp-sub">ศูนย์กลางสำหรับจัดการข้อมูลลูกหนี้ บันทึกการชำระเงิน และติดตามพอร์ตงานคดี</p>
        </div>

        <Card className="rounded-2xl border border-[#dbe7f7] bg-white/85 shadow-[0_12px_32px_rgba(15,23,42,.06)]">
          <Card.Content className="flex flex-row items-center justify-between gap-3 px-5 py-[18px]">
            <div>
              <p className="hero-eyebrow">PORTFOLIO SNAPSHOT</p>
              <p className="hero-num">฿284,920</p>
              <p className="hero-caption">Outstanding balance under active monitoring</p>
            </div>
            <div className="hero-chart">
              <Sparkline data={CHART} color="#2563eb" glow="rgba(37,99,235,.6)" />
            </div>
          </Card.Content>
        </Card>

        <div className="pills">
          {[
            { label: 'Active cases', val: '2,418', color: '#2563eb' },
            { label: 'Filing', val: '684', color: '#4f46e5' },
            { label: 'Judged', val: '86', color: '#0f766e' },
          ].map((s) => (
            <Card key={s.label} className="rounded-2xl border border-[#dbe7f7] bg-white/85 shadow-[0_12px_32px_rgba(15,23,42,.06)]">
              <Card.Content className="px-3.5 py-[13px]">
                <p className="pill-label">{s.label}</p>
                <p className="pill-val" style={{ color: s.color }}>{s.val}</p>
              </Card.Content>
            </Card>
          ))}
        </div>

        <Card className="rounded-2xl border border-[#dbe7f7] bg-white/85 shadow-[0_12px_32px_rgba(15,23,42,.06)]">
          <Card.Content className="px-[18px] py-4">
            <div className="feed-head">
              <p className="feed-title">Today&apos;s queue</p>
              <span className="feed-live"><span className="live-dot" />Updated</span>
            </div>
            <div className="feed-rows">
              {ACTIVITY.map((a, i) => {
                const m = STATUS_META[a.status];
                return (
                  <div key={i} className="feed-row" style={{ animationDelay: `${0.45 + i * 0.09}s` }}>
                    <Avatar className="h-8 w-8 shrink-0 rounded-[10px]" style={{ background: a.color }}>
                      <Avatar.Fallback className="text-[10.5px] font-extrabold text-white">{a.init}</Avatar.Fallback>
                    </Avatar>
                    <div className="feed-info">
                      <p className="feed-name">{a.name}</p>
                      <p className="feed-action">{a.action}</p>
                    </div>
                    <div className="feed-right">
                      <p className="feed-amount">{a.amount}</p>
                      <Chip
                        size="sm"
                        variant="soft"
                        className="h-[18px] gap-1 border px-1.5 text-[9px] font-extrabold"
                        style={{ color: m.color, borderColor: `${m.color}40`, background: `${m.color}12` }}
                      >
                        {m.icon}
                        {m.label}
                      </Chip>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Content>
        </Card>
      </div>
    </aside>
  );
}

function LeftPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword]= useState('');
  const [showPw,   setShowPw]  = useState(false);
  const [error,    setError]   = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading,  setLoading] = useState(false);
  const [shake,    setShake]   = useState(false);

  const clearErr = () => {
    setError('');
    setUsernameError('');
    setPasswordError('');
  };

  const triggerErr = (msg: string) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 420);
  };

  const validateLoginForm = () => {
    const nextUsernameError = !username.trim() ? 'Please enter your username.' : '';
    const nextPasswordError = !password ? 'Please enter your password.' : '';

    setUsernameError(nextUsernameError);
    setPasswordError(nextPasswordError);

    if (nextUsernameError || nextPasswordError) {
      triggerErr('Please complete the required fields.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearErr();

    if (!validateLoginForm()) {
      return;
    }

    setLoading(true);
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('role', data.user.role);
        sessionStorage.setItem('display_name', data.user.display_name);
        if (data.password_warning_days) {
          sessionStorage.setItem('password_warning_days', data.password_warning_days);
          sessionStorage.removeItem('password_warning_seen');
        } else {
          sessionStorage.removeItem('password_warning_days');
          sessionStorage.removeItem('password_warning_seen');
        }
        window.location.href = data.redirect_to || '/inventory';
      } else {
        setUsernameError(' ');
        setPasswordError(' ');
        triggerErr(data.error || 'Incorrect username or password.');
      }
    } catch {
      triggerErr('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="lp">
      <div className="lp-blob lp-blob1" />
      <div className="lp-blob lp-blob2" />

      {/* logo */}
      <div className="lp-logo">
        <div className="lp-logo-icon"><IcoShield size={21} /></div>
        <div className="lp-logo-text">
          <span className="lp-logo-name">LQD Tracking</span>
          <span className="lp-logo-sub">Debt Management System</span>
        </div>
      </div>

      {/* form */}
      <div className="lp-center">
        <div style={{ maxWidth: 340, width: '100%' }}>

          <h1 className="lp-h1">
            Welcome back<span>.</span>
          </h1>
          <p className="lp-tagline">
            เข้าสู่ระบบเพื่อบริหารจัดการพอร์ตหนี้<br />และติดตามสถานะคดี
          </p>

          {error && (
            <Alert
              status="danger"
              className={`mb-5${shake ? ' shake' : ''}`}
            >
              <Alert.Indicator>
                <IcoAlert />
              </Alert.Indicator>
              <Alert.Content>
                <Alert.Description className="text-[13px] font-medium leading-6">
                  {error}
                </Alert.Description>
              </Alert.Content>
              <CloseButton
                aria-label="Dismiss error"
                className="ml-auto"
                onPress={clearErr}
              >
                <IcoClose />
              </CloseButton>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className={shake ? 'shake' : ''}>
            <div className="lp-field">
              <TextField
                id="username"
                name="username"
                isRequired
                isInvalid={!!usernameError}
                type="text"
                autoFocus
                value={username}
                onChange={(value) => {
                  setUsername(value);
                  setUsernameError('');
                  setError('');
                }}
                className="mb-4 flex w-full flex-col gap-2"
              >
                <Label className="text-xs font-semibold uppercase tracking-[.03em] text-slate-700">Username</Label>
                <InputGroup
                  variant="secondary"
                  className={[
                    'h-12 w-full rounded-[14px] border bg-slate-50 shadow-none transition',
                    'focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10',
                    usernameError ? 'border-red-400 bg-red-50/40' : 'border-slate-200',
                  ].join(' ')}
                >
                  <InputGroup.Prefix className="text-slate-400">
                    <IcoUser />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    autoComplete="username"
                    placeholder="Enter your username"
                    className="w-full text-[14px] font-semibold text-slate-900 placeholder:text-slate-400"
                  />
                </InputGroup>
                {usernameError.trim() && (
                  <p className="text-xs font-medium text-red-600">{usernameError}</p>
                )}
              </TextField>
            </div>

            <div className="lp-field">
              <TextField
                id="password"
                name="password"
                isRequired
                isInvalid={!!passwordError}
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  setPasswordError('');
                  setError('');
                }}
                className="mb-4 flex w-full flex-col gap-2"
              >
                <Label className="text-xs font-semibold uppercase tracking-[.03em] text-slate-700">Password</Label>
                <InputGroup
                  variant="secondary"
                  className={[
                    'h-12 w-full rounded-[14px] border bg-slate-50 shadow-none transition',
                    'focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10',
                    passwordError ? 'border-red-400 bg-red-50/40' : 'border-slate-200',
                  ].join(' ')}
                >
                  <InputGroup.Prefix className="text-slate-400">
                    <IcoLock />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    type={showPw ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full text-[14px] font-semibold text-slate-900 placeholder:text-slate-400"
                  />
                  <InputGroup.Suffix>
                    <Button
                      type="button"
                      isIconOnly
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                      size="sm"
                      variant="ghost"
                      className="min-w-8 rounded-full text-slate-400 hover:text-slate-600"
                      onPress={() => setShowPw((value) => !value)}
                    >
                      {showPw ? <IcoEye /> : <IcoEyeOff />}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
                {passwordError.trim() && (
                  <p className="text-xs font-medium text-red-600">{passwordError}</p>
                )}
              </TextField>
            </div>

            <Button
              type="submit"
              size="lg"
              fullWidth
              isDisabled={loading}
              className="mt-2 h-12 gap-2 rounded-[14px] bg-primary text-white font-bold shadow-[0_8px_24px_rgba(37,99,235,.28),0_2px_6px_rgba(37,99,235,.18)]"
            >
              {loading ? 'Signing in...' : <>Sign in<IcoArrow /></>}
            </Button>

            <p className="lp-forgot">หากลืมรหัสผ่าน กรุณาติดต่อผู้ดูแลระบบ</p>
          </form>
        </div>
      </div>

      {/* footer */}
      <div className="lp-foot">
        <div className="lp-foot-stat">
          <span className="lp-foot-dot" />
          All systems operational
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="shell">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
