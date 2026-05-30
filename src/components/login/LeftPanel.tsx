import { useState, type FormEvent } from 'react';
import { Button, InputGroup, Label, TextField } from '@heroui/react';
import LoginAlert from './LoginAlert';
import { IcoArrow, IcoEye, IcoEyeOff, IcoLock, IcoShield, IcoUser } from './icons';

export default function LeftPanel() {
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

      <div className="lp-logo">
        <div className="lp-logo-icon"><IcoShield size={21} /></div>
        <div className="lp-logo-text">
          <span className="lp-logo-name">LQD Tracking</span>
          <span className="lp-logo-sub">Debt Management System</span>
        </div>
      </div>

      <div className="lp-center">
        <div style={{ maxWidth: 340, width: '100%' }}>
          <h1 className="lp-h1">
            Welcome back<span>.</span>
          </h1>
          <p className="lp-tagline">
            เข้าสู่ระบบเพื่อบริหารจัดการพอร์ตหนี้<br />และติดตามสถานะคดี
          </p>

          {error && (
            <LoginAlert
              message={error}
              shake={shake}
              onClose={clearErr}
            />
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
                  <InputGroup.Prefix className="flex min-w-10 items-center justify-center pl-3 pr-2 text-slate-400">
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
                  <InputGroup.Prefix className="flex min-w-10 items-center justify-center pl-3 pr-2 text-slate-400">
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
                      className="min-w-10 rounded-full text-slate-400 hover:text-slate-600"
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

      <div className="lp-foot">
        <div className="lp-foot-stat">
          <span className="lp-foot-dot" />
          Systems is Operating
        </div>
      </div>
    </main>
  );
}
