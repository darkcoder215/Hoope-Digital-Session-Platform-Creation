import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import {
  listAllPendingLeave, listEmployees, listPendingApprovalsFor, reviewLeaveRequest,
} from '@/mock/api';
import { Avatar, Badge, Button, Card, EmptyState, Spinner } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { fmtDate, fullName } from '@/lib/format';

export default function Approvals() {
  const { user, hasRole } = useAuth();
  const qc = useQueryClient();
  if (!user) return null;

  const { data: pending = [], isLoading } = useQuery({
    queryKey: ['approvals', user.id, user.role],
    queryFn: () => hasRole('hr_admin') ? listAllPendingLeave() : listPendingApprovalsFor(user.id),
  });
  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: listEmployees });

  const review = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: 'approved'|'rejected' }) =>
      reviewLeaveRequest(id, decision, user.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['approvals'] });
      qc.invalidateQueries({ queryKey: ['my-lr'] });
      qc.invalidateQueries({ queryKey: ['pending-mine'] });
      qc.invalidateQueries({ queryKey: ['bal'] });
    },
  });

  return (
    <PageContainer title="Approvals" subtitle="Review time-off requests from your team" module="timeoff">
      {isLoading ? <Spinner /> : pending.length === 0 ? (
        <Card><EmptyState title="All caught up" hint="No pending requests right now." /></Card>
      ) : (
        <div className="space-y-3">
          {pending.map(r => {
            const emp = employees.find(e => e.id === r.employeeId);
            return (
              <Card key={r.id} className="mod-timeoff flex items-center gap-4 flex-wrap">
                <Avatar name={emp ? fullName(emp) : '?'} size={44} />
                <div className="flex-1 min-w-[180px]">
                  <div className="text-text-hi font-semibold">{emp ? fullName(emp) : r.employeeId}</div>
                  <div className="text-text-low text-xs">{emp?.jobTitle}</div>
                </div>
                <div className="text-sm">
                  <div className="text-text-hi">{fmtDate(r.startDate)} → {fmtDate(r.endDate)}</div>
                  <div className="text-text-low text-xs">{r.days} day{r.days>1?'s':''} · {r.reason ?? 'No reason provided'}</div>
                </div>
                <Badge tone="magenta">{r.type}</Badge>
                <div className="flex gap-2 ml-auto">
                  <Button variant="ghost" onClick={() => review.mutate({ id: r.id, decision: 'rejected' })}><X size={16}/> Reject</Button>
                  <Button onClick={() => review.mutate({ id: r.id, decision: 'approved' })}><Check size={16}/> Approve</Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
