import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button, Card, Input } from '@/components/ui';

const demoAccounts = [
  { email: 'lina@hoopoe.digital',   role: 'Employee',  name: 'Lina Mahmoud',  title: 'Senior Frontend Engineer' },
  { email: 'omar@hoopoe.digital',   role: 'Manager',   name: 'Omar Hassan',   title: 'VP of Engineering' },
  { email: 'hoda@hoopoe.digital',   role: 'HR Admin',  name: 'Hoda El-Sayed', title: 'People Operations Lead' },
];

export default function Login() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('lina@hoopoe.digital');
  const [err, setErr] = useState('');

  if (user) return <Navigate to="/" replace />;

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setErr('');
    if (!login(email)) { setErr('No employee with that email. Try a demo account below.'); return; }
    nav('/', { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-[1080px] grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
        {/* Left — brand */}
        <div className="hidden md:block">
          <div className="flex items-center gap-3 mb-8">
            <img src="/hoopoe-digital-logo.jpeg" className="w-12 h-12 rounded-md bg-white p-1" alt="" />
            <div>
              <div className="font-serif font-black text-text-hi text-xl leading-none">HOOPOE</div>
              <div className="text-[11px] tracking-[0.22em] text-brand-orange font-bold">HR PLATFORM</div>
            </div>
          </div>
          <h1 className="font-serif text-5xl font-black mb-4">
            People. Time. <span className="bg-gradient-to-r from-brand-orange to-acc-yellow bg-clip-text text-transparent">Talent.</span>
          </h1>
          <p className="text-text-mid text-lg max-w-md">
            One workspace for everyone at Hoopoe Digital across Amsterdam, Cairo, Riyadh, Dubai, and Doha.
            Manage your team, time off, and recruiting in one place.
          </p>
          <div className="mt-8 flex gap-4 text-sm text-text-low">
            <span>GDPR</span><span>·</span><span>CCPA</span><span>·</span><span>Saudi PDPL</span><span>·</span><span>Egypt DPL</span>
          </div>
        </div>

        {/* Right — form */}
        <Card className="mod-dashboard">
          <h2 className="text-text-hi mb-1">Sign in</h2>
          <p className="text-text-low text-sm mb-6">Use your Hoopoe email to continue.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">Work email</label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="pw">Password</label>
              <Input id="pw" type="password" placeholder="••••••••" defaultValue="demo" />
            </div>
            {err && <p className="text-acc-red text-sm">{err}</p>}
            <Button type="submit" className="w-full">Sign in →</Button>
          </form>

          <div className="mt-6 pt-6 border-t border-stroke">
            <div className="text-[11px] font-bold uppercase tracking-widest text-text-low mb-3">Demo accounts</div>
            <div className="space-y-2">
              {demoAccounts.map(a => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => { setEmail(a.email); setTimeout(submit, 0); }}
                  className="w-full text-left px-3 py-2 rounded-sm bg-bg-elevated border border-stroke hover:border-brand-orange transition flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-text-hi text-sm font-semibold truncate">{a.name}</div>
                    <div className="text-text-low text-xs truncate">{a.title}</div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange shrink-0">{a.role}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
