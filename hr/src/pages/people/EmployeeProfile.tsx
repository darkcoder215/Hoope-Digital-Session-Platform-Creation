import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Phone, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { getEmployee, listBalances, listMyLeaveRequests, listEmployees, listDepartments } from '@/mock/api';
import { Avatar, Badge, Card, Spinner } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { fmtDate, fullName } from '@/lib/format';
import { cx } from '@/lib/cx';

const tabs = ['Overview', 'Job', 'Time Off', 'Documents'] as const;
type Tab = typeof tabs[number];

export default function EmployeeProfile() {
  const { id = '' } = useParams();
  const [tab, setTab] = useState<Tab>('Overview');
  const { data: emp, isLoading } = useQuery({ queryKey: ['emp', id], queryFn: () => getEmployee(id) });
  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: listEmployees });
  const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: listDepartments });
  const { data: balances = [] } = useQuery({ queryKey: ['bal', id], queryFn: () => listBalances(id), enabled: !!emp });
  const { data: requests = [] } = useQuery({ queryKey: ['my-lr', id], queryFn: () => listMyLeaveRequests(id), enabled: !!emp });

  if (isLoading) return <PageContainer title="Employee" module="people"><Spinner /></PageContainer>;
  if (!emp) return <PageContainer title="Not found" module="people"><p>Employee not found.</p></PageContainer>;

  const dept = departments.find(d => d.id === emp.departmentId);
  const mgr = employees.find(e => e.id === emp.managerId);
  const reports = employees.filter(e => e.managerId === emp.id);

  return (
    <PageContainer title={fullName(emp)} subtitle={emp.jobTitle} module="people">
      <Link to="/people" className="inline-flex items-center gap-2 text-sm text-text-mid hover:text-brand-orange mb-4"><ArrowLeft size={16} /> Back to directory</Link>

      <Card className="mb-6">
        <div className="flex items-start gap-5 flex-wrap">
          <Avatar name={fullName(emp)} size={96} />
          <div className="flex-1 min-w-[260px]">
            <h2 className="mb-1">{fullName(emp)}</h2>
            <p className="text-text-mid">{emp.jobTitle}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge tone="green"><MapPin size={12} /> {emp.office}</Badge>
              <Badge tone={emp.status === 'active' ? 'neutral' : emp.status === 'on_leave' ? 'magenta' : 'red'}>{emp.status.replace('_',' ')}</Badge>
              <Badge tone="orange">{emp.role.replace('_',' ')}</Badge>
              <Badge>{emp.employmentType.replace('_',' ')}</Badge>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-5 text-sm">
              <div className="flex items-center gap-2 text-text-mid"><Mail size={15} className="text-text-low" /><a href={`mailto:${emp.email}`} className="hover:text-brand-orange">{emp.email}</a></div>
              {emp.phone && <div className="flex items-center gap-2 text-text-mid"><Phone size={15} className="text-text-low" /> {emp.phone}</div>}
              <div className="flex items-center gap-2 text-text-mid"><UserCircle2 size={15} className="text-text-low" /> Reports to {mgr ? <Link to={`/people/${mgr.id}`} className="hover:text-brand-orange">{fullName(mgr)}</Link> : '—'}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-stroke mb-6">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cx(
              'px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors',
              tab === t ? 'text-text-hi border-brand-orange' : 'text-text-low border-transparent hover:text-text-mid'
            )}
          >{t}</button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card><h3 className="mb-3">About</h3>
            <dl className="space-y-2 text-sm">
              <Row label="Department" value={dept?.name ?? '—'} />
              <Row label="Office" value={emp.office} />
              <Row label="Employment" value={emp.employmentType.replace('_',' ')} />
              <Row label="Start date" value={fmtDate(emp.startDate)} />
              <Row label="Role" value={emp.role.replace('_',' ')} />
            </dl>
          </Card>
          <Card><h3 className="mb-3">Direct reports ({reports.length})</h3>
            {reports.length === 0 ? <p className="text-text-low text-sm">No direct reports.</p> : (
              <ul className="space-y-2">
                {reports.map(r => (
                  <li key={r.id}>
                    <Link to={`/people/${r.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5">
                      <Avatar name={fullName(r)} size={32} />
                      <div className="min-w-0">
                        <div className="text-text-hi text-sm font-semibold truncate">{fullName(r)}</div>
                        <div className="text-text-low text-xs truncate">{r.jobTitle}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}

      {tab === 'Job' && (
        <Card>
          <h3 className="mb-3">Job details</h3>
          <dl className="grid sm:grid-cols-2 gap-y-2 text-sm">
            <Row label="Title" value={emp.jobTitle} />
            <Row label="Department" value={dept?.name ?? '—'} />
            <Row label="Manager" value={mgr ? fullName(mgr) : '—'} />
            <Row label="Office" value={emp.office} />
            <Row label="Start date" value={fmtDate(emp.startDate)} />
            <Row label="Employment type" value={emp.employmentType.replace('_',' ')} />
          </dl>
        </Card>
      )}

      {tab === 'Time Off' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {balances.filter(b => b.accrued > 0).map(b => {
              const left = b.accrued - b.used;
              return (
                <Card key={b.type} className="mod-timeoff">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-text-low">{b.type}</div>
                  <div className="font-serif text-3xl text-text-hi">{left}<span className="text-base text-text-low">/{b.accrued} days</span></div>
                </Card>
              );
            })}
          </div>
          <Card>
            <h3 className="mb-3">Requests</h3>
            {requests.length === 0 ? <p className="text-text-low text-sm">No requests yet.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="text-[11px] uppercase tracking-wider text-text-low text-left border-b border-stroke">
                  <th className="py-2">Type</th><th>Dates</th><th>Days</th><th>Status</th>
                </tr></thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id} className="border-b border-stroke/50">
                      <td className="py-2 text-text-mid capitalize">{r.type}</td>
                      <td className="text-text-mid">{fmtDate(r.startDate)} → {fmtDate(r.endDate)}</td>
                      <td className="text-text-mid">{r.days}</td>
                      <td><Badge tone={r.status === 'approved' ? 'green' : r.status === 'rejected' ? 'red' : 'magenta'}>{r.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      )}

      {tab === 'Documents' && (
        <Card>
          <h3 className="mb-2">Documents</h3>
          <p className="text-text-low text-sm">Contracts, NDAs, and ID documents would live here. (Demo: mocked, file uploads out of scope for v1.)</p>
        </Card>
      )}
    </PageContainer>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-stroke/50 pb-1.5">
      <dt className="text-text-low">{label}</dt>
      <dd className="text-text-hi font-medium text-right">{value}</dd>
    </div>
  );
}
