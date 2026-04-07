import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Network, Building2, CalendarDays, Clock,
  Briefcase, Settings, LogOut,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cx } from '@/lib/cx';

interface NavItem { to: string; label: string; icon: LucideIcon; roles?: Array<'employee'|'manager'|'hr_admin'>; accent: string }

const navItems: NavItem[] = [
  { to: '/',             label: 'Dashboard',      icon: LayoutDashboard, accent: 'text-brand-orange' },
  { to: '/people',       label: 'People',         icon: Users,           accent: 'text-acc-green' },
  { to: '/org-chart',    label: 'Org Chart',      icon: Network,         accent: 'text-acc-green' },
  { to: '/departments',  label: 'Departments',    icon: Building2,       accent: 'text-acc-green', roles: ['hr_admin'] },
  { to: '/time-off',     label: 'Time Off',       icon: CalendarDays,    accent: 'text-acc-magenta' },
  { to: '/attendance',   label: 'Attendance',     icon: Clock,           accent: 'text-acc-cyan' },
  { to: '/jobs',         label: 'Recruiting',     icon: Briefcase,       accent: 'text-acc-yellow' },
  { to: '/settings',     label: 'Settings',       icon: Settings,        accent: 'text-text-mid' },
];

export function Sidebar() {
  const { user, logout, hasRole } = useAuth();
  if (!user) return null;

  const visible = navItems.filter(i => !i.roles || hasRole(...i.roles));

  return (
    <aside className="w-64 shrink-0 bg-bg-surface border-r border-stroke flex flex-col">
      {/* Brand */}
      <div className="h-[72px] px-5 flex items-center gap-3 border-b border-stroke">
        <img src="/hoopoe-digital-logo.jpeg" alt="" className="w-10 h-10 rounded-md bg-white p-1 object-contain" />
        <div>
          <div className="font-serif font-black text-text-hi leading-none tracking-wide">HOOPOE</div>
          <div className="text-[10px] tracking-[0.2em] text-brand-orange font-bold">HR PLATFORM</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {visible.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => cx(
                'group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all',
                isActive
                  ? 'bg-white/5 text-text-hi border-l-2 border-brand-orange pl-[10px]'
                  : 'text-text-mid hover:text-text-hi hover:bg-white/5'
              )}
            >
              <Icon size={18} className={cx('shrink-0', item.accent)} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-stroke p-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange/80 to-acc-magenta/80 text-bg-deep font-black text-sm">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-text-hi text-sm font-semibold truncate">{user.firstName} {user.lastName}</div>
            <div className="text-text-low text-xs truncate">{user.jobTitle}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-text-mid hover:text-acc-red hover:bg-white/5 transition-colors"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </aside>
  );
}
