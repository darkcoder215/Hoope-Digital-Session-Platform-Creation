import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Grid3x3, Rows3, Search } from 'lucide-react';
import { listEmployees, listDepartments } from '@/mock/api';
import { Badge, Card, Input, Select, Spinner } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { Avatar } from '@/components/ui';
import { fullName } from '@/lib/format';
import { cx } from '@/lib/cx';

export default function Directory() {
  const { data: employees, isLoading } = useQuery({ queryKey: ['employees'], queryFn: listEmployees });
  const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: listDepartments });
  const [q, setQ] = useState('');
  const [office, setOffice] = useState('all');
  const [dept, setDept] = useState('all');
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const filtered = useMemo(() => {
    return (employees ?? []).filter(e =>
      (q === '' || fullName(e).toLowerCase().includes(q.toLowerCase()) || e.jobTitle.toLowerCase().includes(q.toLowerCase())) &&
      (office === 'all' || e.office === office) &&
      (dept === 'all' || e.departmentId === dept)
    );
  }, [employees, q, office, dept]);

  return (
    <PageContainer title="People" subtitle={`${filtered.length} of ${employees?.length ?? 0} employees`} module="people">
      {/* Filters */}
      <Card className="mb-6">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end">
          <div>
            <label className="label">Search</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-low" />
              <Input className="pl-9" placeholder="Name or title…" value={q} onChange={e => setQ(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">Office</label>
            <Select value={office} onChange={e => setOffice(e.target.value)}>
              <option value="all">All offices</option>
              {['Amsterdam','Cairo','Riyadh','Dubai','Doha'].map(o => <option key={o}>{o}</option>)}
            </Select>
          </div>
          <div>
            <label className="label">Department</label>
            <Select value={dept} onChange={e => setDept(e.target.value)}>
              <option value="all">All departments</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </Select>
          </div>
          <div className="inline-flex rounded-sm border border-stroke overflow-hidden self-end">
            <button onClick={() => setView('grid')} className={cx('p-2.5', view==='grid' ? 'bg-bg-elevated text-brand-orange' : 'text-text-mid hover:text-text-hi')}><Grid3x3 size={18} /></button>
            <button onClick={() => setView('table')} className={cx('p-2.5 border-l border-stroke', view==='table' ? 'bg-bg-elevated text-brand-orange' : 'text-text-mid hover:text-text-hi')}><Rows3 size={18} /></button>
          </div>
        </div>
      </Card>

      {isLoading ? <Spinner /> : view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(e => (
            <Link to={`/people/${e.id}`} key={e.id}>
              <Card className="card-hover cursor-pointer h-full flex flex-col items-start">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={fullName(e)} size={48} />
                  <div className="min-w-0">
                    <div className="text-text-hi font-semibold truncate">{fullName(e)}</div>
                    <div className="text-text-low text-xs truncate">{e.jobTitle}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  <Badge tone="green">{e.office}</Badge>
                  <Badge tone={e.status === 'active' ? 'neutral' : e.status === 'on_leave' ? 'magenta' : 'red'}>{e.status.replace('_',' ')}</Badge>
                  {e.role !== 'employee' && <Badge tone="orange">{e.role.replace('_',' ')}</Badge>}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-text-low border-b border-stroke">
                <th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Title</th><th className="py-2 pr-4">Department</th><th className="py-2 pr-4">Office</th><th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => {
                const d = departments.find(x => x.id === e.departmentId);
                return (
                  <tr key={e.id} className="border-b border-stroke/50 hover:bg-white/5">
                    <td className="py-3 pr-4">
                      <Link to={`/people/${e.id}`} className="text-text-hi font-semibold hover:text-brand-orange flex items-center gap-3">
                        <Avatar name={fullName(e)} size={32} /> {fullName(e)}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-text-mid">{e.jobTitle}</td>
                    <td className="py-3 pr-4 text-text-mid">{d?.name ?? '—'}</td>
                    <td className="py-3 pr-4"><Badge tone="green">{e.office}</Badge></td>
                    <td className="py-3 pr-4"><Badge tone={e.status === 'active' ? 'neutral' : e.status === 'on_leave' ? 'magenta' : 'red'}>{e.status.replace('_',' ')}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </PageContainer>
  );
}
