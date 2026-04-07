import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { listEmployees } from '@/mock/api';
import { Avatar, Card, Spinner } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { fullName } from '@/lib/format';
import type { Employee } from '@/types';
import { cx } from '@/lib/cx';

export default function OrgChart() {
  const { data: employees = [], isLoading } = useQuery({ queryKey: ['employees'], queryFn: listEmployees });
  if (isLoading) return <PageContainer title="Org Chart" module="people"><Spinner /></PageContainer>;

  const roots = employees.filter(e => !e.managerId);

  return (
    <PageContainer title="Org Chart" subtitle="Collapsible reporting tree" module="people">
      <Card className="overflow-x-auto">
        <ul className="space-y-1">
          {roots.map(r => <Node key={r.id} emp={r} all={employees} depth={0} />)}
        </ul>
      </Card>
    </PageContainer>
  );
}

function Node({ emp, all, depth }: { emp: Employee; all: Employee[]; depth: number }) {
  const [open, setOpen] = useState(depth < 2);
  const reports = all.filter(e => e.managerId === emp.id);
  const hasChildren = reports.length > 0;

  return (
    <li>
      <div className={cx('flex items-center gap-2 p-2 rounded-md hover:bg-white/5', depth > 0 && 'ml-[calc(var(--d)*24px)]')} style={{ ['--d' as string]: depth } as React.CSSProperties}>
        <button
          onClick={() => setOpen(!open)}
          className={cx('inline-flex w-5 h-5 items-center justify-center rounded text-text-low', !hasChildren && 'opacity-0 pointer-events-none')}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        <Avatar name={fullName(emp)} size={32} />
        <Link to={`/people/${emp.id}`} className="flex-1 min-w-0">
          <div className="text-text-hi text-sm font-semibold truncate">{fullName(emp)}</div>
          <div className="text-text-low text-xs truncate">{emp.jobTitle} · {emp.office}</div>
        </Link>
        {hasChildren && <span className="text-[10px] font-bold text-acc-green">{reports.length} {reports.length === 1 ? 'report' : 'reports'}</span>}
      </div>
      {open && hasChildren && (
        <ul className="border-l border-stroke ml-5">
          {reports.map(r => <Node key={r.id} emp={r} all={all} depth={depth + 1} />)}
        </ul>
      )}
    </li>
  );
}
