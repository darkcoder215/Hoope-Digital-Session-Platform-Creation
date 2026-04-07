import { Bell, Search } from 'lucide-react';
import { useAuth } from '@/lib/auth';

interface Props { title: string; subtitle?: string }

export function TopBar({ title, subtitle }: Props) {
  const { user } = useAuth();
  return (
    <header className="h-[72px] bg-bg-surface/80 backdrop-blur border-b border-stroke sticky top-0 z-30">
      <div className="h-full px-8 flex items-center justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-text-hi leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-text-low text-xs mt-0.5 truncate">{subtitle}</p>}
        </div>

        <div className="hidden md:flex items-center gap-3 max-w-md flex-1">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-low" />
            <input className="input pl-9" placeholder="Search people, jobs, requests…" />
          </div>
          <button className="relative inline-flex w-10 h-10 items-center justify-center rounded-sm border border-stroke text-text-mid hover:text-brand-orange hover:border-brand-orange transition">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-orange" />
          </button>
          <span className="text-xs text-text-low">{user?.office}</span>
        </div>
      </div>
    </header>
  );
}
