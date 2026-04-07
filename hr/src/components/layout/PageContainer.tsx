import type { ReactNode } from 'react';
import { TopBar } from './TopBar';

interface Props {
  title: string;
  subtitle?: string;
  module?: 'people' | 'timeoff' | 'attendance' | 'ats' | 'dashboard';
  actions?: ReactNode;
  children: ReactNode;
}

const modClass: Record<NonNullable<Props['module']>, string> = {
  people: 'mod-people',
  timeoff: 'mod-timeoff',
  attendance: 'mod-attendance',
  ats: 'mod-ats',
  dashboard: 'mod-dashboard',
};

export function PageContainer({ title, subtitle, module, actions, children }: Props) {
  return (
    <div className={module ? modClass[module] : ''}>
      <TopBar title={title} subtitle={subtitle} />
      <div className="px-8 py-8">
        {actions && <div className="mb-6 flex justify-end">{actions}</div>}
        {children}
      </div>
    </div>
  );
}
