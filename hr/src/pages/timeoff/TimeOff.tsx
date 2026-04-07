import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CalendarPlus } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { createLeaveRequest, listBalances, listMyLeaveRequests } from '@/mock/api';
import { Badge, Button, Card, Input, Select, Spinner, Textarea } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { fmtDate } from '@/lib/format';
import type { LeaveType } from '@/types';

export default function TimeOff() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  const { data: balances = [] } = useQuery({ queryKey: ['bal', user.id], queryFn: () => listBalances(user.id) });
  const { data: requests = [], isLoading } = useQuery({ queryKey: ['my-lr', user.id], queryFn: () => listMyLeaveRequests(user.id) });

  return (
    <PageContainer
      title="Time Off"
      subtitle="Your balances and requests"
      module="timeoff"
      actions={<Button onClick={() => setOpen(true)}><CalendarPlus size={16} /> Request time off</Button>}
    >
      {/* Balances */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {balances.filter(b => b.accrued > 0).map(b => {
          const left = b.accrued - b.used;
          const pct = Math.round((b.used / b.accrued) * 100);
          return (
            <Card key={b.type} className="mod-timeoff">
              <div className="text-[10px] font-bold uppercase tracking-wider text-text-low">{b.type}</div>
              <div className="font-serif text-4xl text-text-hi mt-1">{left}<span className="text-base text-text-low"> / {b.accrued}</span></div>
              <div className="text-xs text-text-low mt-1 mb-2">{b.used} days used</div>
              <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                <div className="h-full bg-acc-magenta rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Requests */}
      <Card>
        <h3 className="mb-4">Your requests</h3>
        {isLoading ? <Spinner /> : requests.length === 0 ? (
          <p className="text-text-low text-sm">No requests yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="text-[11px] uppercase tracking-wider text-text-low text-left border-b border-stroke">
              <th className="py-2">Type</th><th>Dates</th><th>Days</th><th>Reason</th><th>Status</th>
            </tr></thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} className="border-b border-stroke/50">
                  <td className="py-3 text-text-hi capitalize font-medium">{r.type}</td>
                  <td className="text-text-mid">{fmtDate(r.startDate)} → {fmtDate(r.endDate)}</td>
                  <td className="text-text-mid">{r.days}</td>
                  <td className="text-text-low text-xs max-w-[240px] truncate">{r.reason ?? '—'}</td>
                  <td><Badge tone={r.status === 'approved' ? 'green' : r.status === 'rejected' ? 'red' : 'magenta'}>{r.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {open && <RequestDialog onClose={() => setOpen(false)} onCreated={() => { qc.invalidateQueries({ queryKey: ['my-lr', user.id] }); setOpen(false); }} />}
    </PageContainer>
  );
}

function RequestDialog({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { user } = useAuth();
  const [type, setType] = useState<LeaveType>('annual');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [reason, setReason] = useState('');

  const create = useMutation({
    mutationFn: createLeaveRequest,
    onSuccess: onCreated,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !start || !end) return;
    const days = Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000) + 1);
    create.mutate({ employeeId: user.id, type, startDate: start, endDate: end, days, reason });
  };

  return (
    <div className="fixed inset-0 bg-black/70 grid place-items-center p-4 z-50" onClick={onClose}>
      <Card className="mod-timeoff w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="mb-4">New time-off request</h3>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Type</label>
            <Select value={type} onChange={e => setType(e.target.value as LeaveType)}>
              <option value="annual">Annual</option>
              <option value="sick">Sick</option>
              <option value="parental">Parental</option>
              <option value="unpaid">Unpaid</option>
              <option value="compassionate">Compassionate</option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Start</label><Input type="date" value={start} onChange={e => setStart(e.target.value)} required /></div>
            <div><label className="label">End</label><Input type="date" value={end} onChange={e => setEnd(e.target.value)} required /></div>
          </div>
          <div>
            <label className="label">Reason (optional)</label>
            <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Short note for your manager…" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={create.isPending}>Submit request</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
