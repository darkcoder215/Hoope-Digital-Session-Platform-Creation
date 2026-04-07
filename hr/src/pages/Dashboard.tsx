import { useQuery } from '@tanstack/react-query';
import { BarChart3, Briefcase, CalendarCheck, Clock, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useAuth } from '@/lib/auth';
import {
  listEmployees, listAllPendingLeave, listPendingApprovalsFor,
  listMyLeaveRequests, listJobs, listCandidates, listBalances,
} from '@/mock/api';
import { Badge, Card, EmptyState } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { fmtDate, fmtRel, fullName } from '@/lib/format';
import type { Employee, LeaveRequest } from '@/types';

export default function Dashboard() {
  const { user, hasRole } = useAuth();
  if (!user) return null;

  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: listEmployees });
  const { data: jobs = [] } = useQuery({ queryKey: ['jobs'], queryFn: listJobs });
  const { data: candidates = [] } = useQuery({ queryKey: ['candidates'], queryFn: () => listCandidates() });
  const { data: balances = [] } = useQuery({ queryKey: ['bal', user.id], queryFn: () => listBalances(user.id) });

  const { data: pendingForMe = [] } = useQuery({
    queryKey: ['pending-mine', user.id, user.role],
    queryFn: () => hasRole('hr_admin') ? listAllPendingLeave() : listPendingApprovalsFor(user.id),
    enabled: hasRole('manager', 'hr_admin'),
  });
  const { data: myRequests = [] } = useQuery({
    queryKey: ['my-lr', user.id], queryFn: () => listMyLeaveRequests(user.id),
  });

  const headcount = employees.length;
  const onLeaveToday = employees.filter(e => e.status === 'on_leave').length;
  const openJobs = jobs.filter(j => j.status === 'open').length;
  const totalCandidates = candidates.length;

  // By office
  const byOffice = ['Amsterdam', 'Cairo', 'Riyadh', 'Dubai', 'Doha'].map(o => ({
    office: o,
    count: employees.filter(e => e.office === o).length,
  }));

  // By department
  const byDept: Record<string, number> = {};
  employees.forEach(e => { byDept[e.departmentId] = (byDept[e.departmentId] ?? 0) + 1; });

  // Pipeline funnel
  const stages = ['applied', 'screen', 'interview', 'offer', 'hired'] as const;
  const funnel = stages.map(s => ({ name: s, value: candidates.filter(c => c.stage === s).length }));
  const colors = ['#6FE36A', '#4FD3E3', '#E45BCB', '#F4D03F', '#F39C2A'];

  return (
    <PageContainer title={`Welcome back, ${user.firstName}`} subtitle={hasRole('hr_admin') ? 'Company-wide overview' : hasRole('manager') ? 'Team overview' : 'Your workspace'} module="dashboard">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        <KpiCard icon={<Users size={20} />} label="Headcount" value={headcount} accent="text-acc-green" />
        <KpiCard icon={<CalendarCheck size={20} />} label="On leave today" value={onLeaveToday} accent="text-acc-magenta" />
        <KpiCard icon={<Briefcase size={20} />} label="Open roles" value={openJobs} accent="text-acc-yellow" />
        <KpiCard icon={<TrendingUp size={20} />} label="Candidates" value={totalCandidates} accent="text-acc-cyan" />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="mod-people">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow text-acc-green">Global presence</div>
              <h3>Headcount by office</h3>
            </div>
            <BarChart3 className="text-acc-green" size={22} />
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={byOffice}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3344" />
                <XAxis dataKey="office" stroke="#A8B0BE" fontSize={12} />
                <YAxis stroke="#A8B0BE" fontSize={12} />
                <Tooltip contentStyle={{ background: '#11161F', border: '1px solid #2A3344', borderRadius: 8 }} />
                <Bar dataKey="count" fill="#6FE36A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="mod-ats">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow text-acc-yellow">Recruiting</div>
              <h3>Pipeline funnel</h3>
            </div>
            <Briefcase className="text-acc-yellow" size={22} />
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={funnel} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {funnel.map((_, i) => <Cell key={i} fill={colors[i]} stroke="#0A0E14" strokeWidth={2} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12, color: '#A8B0BE' }} />
                <Tooltip contentStyle={{ background: '#11161F', border: '1px solid #2A3344', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Pending + my balances */}
      <div className="grid lg:grid-cols-2 gap-6">
        {hasRole('manager', 'hr_admin') && (
          <Card className="mod-timeoff">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="eyebrow text-acc-magenta">Needs your attention</div>
                <h3>Pending time-off approvals</h3>
              </div>
              <Link to="/time-off/approvals" className="text-xs text-brand-orange hover:underline">View all →</Link>
            </div>
            {pendingForMe.length === 0
              ? <EmptyState title="All caught up" hint="No pending requests." icon={<Clock size={22} />} />
              : (
                <ul className="divide-y divide-stroke">
                  {pendingForMe.slice(0, 5).map((r: LeaveRequest) => {
                    const emp = employees.find((e: Employee) => e.id === r.employeeId);
                    return (
                      <li key={r.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-text-hi text-sm font-semibold truncate">{emp ? fullName(emp) : r.employeeId}</div>
                          <div className="text-text-low text-xs">{fmtDate(r.startDate)} → {fmtDate(r.endDate)} · {r.days}d</div>
                        </div>
                        <Badge tone="magenta">{r.type}</Badge>
                      </li>
                    );
                  })}
                </ul>
              )
            }
          </Card>
        )}

        <Card className="mod-timeoff">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="eyebrow text-acc-magenta">Your time off</div>
              <h3>Balances &amp; upcoming</h3>
            </div>
            <Link to="/time-off" className="text-xs text-brand-orange hover:underline">Manage →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {balances.filter(b => b.accrued > 0).slice(0, 4).map(b => {
              const remaining = b.accrued - b.used;
              return (
                <div key={b.type} className="p-3 rounded-md bg-bg-elevated border border-stroke">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-text-low">{b.type}</div>
                  <div className="font-serif text-2xl text-text-hi">{remaining}<span className="text-sm text-text-low">/{b.accrued}</span></div>
                </div>
              );
            })}
          </div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-text-low mb-2">Recent requests</div>
          {myRequests.length === 0
            ? <p className="text-text-low text-sm">No requests yet.</p>
            : (
              <ul className="space-y-2">
                {myRequests.slice(0, 3).map(r => (
                  <li key={r.id} className="flex items-center justify-between text-sm">
                    <span className="text-text-mid">{fmtDate(r.startDate)} · {r.days}d · {r.type}</span>
                    <Badge tone={r.status === 'approved' ? 'green' : r.status === 'rejected' ? 'red' : 'magenta'}>{r.status}</Badge>
                  </li>
                ))}
              </ul>
            )
          }
        </Card>
      </div>

      {/* Recently joined */}
      <Card className="mt-6 mod-people">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="eyebrow text-acc-green">Welcome to the nest</div>
            <h3>Recently joined Hoopoe</h3>
          </div>
          <Link to="/people" className="text-xs text-brand-orange hover:underline">Directory →</Link>
        </div>
        <ul className="grid md:grid-cols-3 gap-4">
          {[...employees]
            .sort((a, b) => b.startDate.localeCompare(a.startDate))
            .slice(0, 3)
            .map(e => (
              <li key={e.id} className="p-4 rounded-md bg-bg-elevated border border-stroke flex items-center gap-3">
                <div className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-gradient-to-br from-acc-green/70 to-acc-cyan/70 text-bg-deep font-black">
                  {e.firstName[0]}{e.lastName[0]}
                </div>
                <div className="min-w-0">
                  <div className="text-text-hi text-sm font-semibold truncate">{fullName(e)}</div>
                  <div className="text-text-low text-xs truncate">{e.jobTitle} · joined {fmtRel(e.startDate)}</div>
                </div>
              </li>
            ))}
        </ul>
      </Card>
    </PageContainer>
  );
}

function KpiCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent: string }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-text-low">{label}</div>
          <div className="font-serif text-4xl font-black text-text-hi mt-1">{value}</div>
        </div>
        <div className={accent}>{icon}</div>
      </div>
    </Card>
  );
}
