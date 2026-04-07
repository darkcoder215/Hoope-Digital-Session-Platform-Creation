import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Clock, LogIn, LogOut } from 'lucide-react';
import { format, parseISO, differenceInMinutes } from 'date-fns';
import { useAuth } from '@/lib/auth';
import { clockIn, clockOut, listAttendance } from '@/mock/api';
import { Badge, Button, Card, Spinner } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';

export default function Attendance() {
  const { user } = useAuth();
  const qc = useQueryClient();
  if (!user) return null;

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['att', user.id],
    queryFn: () => listAttendance(user.id),
  });

  const today = new Date().toISOString().slice(0, 10);
  const todayEntry = entries.find(e => e.date === today);
  const isClockedIn = !!todayEntry?.clockIn && !todayEntry?.clockOut;

  const mIn = useMutation({ mutationFn: () => clockIn(user.id), onSuccess: () => qc.invalidateQueries({ queryKey: ['att', user.id] }) });
  const mOut = useMutation({ mutationFn: () => clockOut(user.id), onSuccess: () => qc.invalidateQueries({ queryKey: ['att', user.id] }) });

  return (
    <PageContainer title="Attendance" subtitle="Clock in, clock out, see your log" module="attendance">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        {/* Clock widget */}
        <Card className="mod-attendance">
          <div className="eyebrow text-acc-cyan">Today</div>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-acc-cyan" size={28} />
            <div className="font-serif text-4xl text-text-hi">{format(new Date(), 'HH:mm')}</div>
          </div>
          <div className="text-text-low text-sm mb-6">{format(new Date(), 'EEEE, MMMM d, yyyy')}</div>

          {todayEntry?.clockIn && (
            <div className="text-sm text-text-mid mb-1">
              Clocked in at <span className="text-text-hi font-semibold">{format(parseISO(todayEntry.clockIn), 'HH:mm')}</span>
            </div>
          )}
          {todayEntry?.clockOut && (
            <div className="text-sm text-text-mid mb-4">
              Clocked out at <span className="text-text-hi font-semibold">{format(parseISO(todayEntry.clockOut), 'HH:mm')}</span>
              {' · '}{Math.floor(differenceInMinutes(parseISO(todayEntry.clockOut), parseISO(todayEntry.clockIn!)) / 60)}h total
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={() => mIn.mutate()} disabled={!!todayEntry?.clockIn}>
              <LogIn size={16} /> Clock in
            </Button>
            <Button variant="ghost" onClick={() => mOut.mutate()} disabled={!isClockedIn}>
              <LogOut size={16} /> Clock out
            </Button>
          </div>
        </Card>

        {/* Log */}
        <Card>
          <h3 className="mb-4">Recent entries</h3>
          {isLoading ? <Spinner /> : entries.length === 0 ? (
            <p className="text-text-low text-sm">No entries yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead><tr className="text-[11px] uppercase tracking-wider text-text-low text-left border-b border-stroke">
                <th className="py-2">Date</th><th>Clock in</th><th>Clock out</th><th>Hours</th><th>Status</th>
              </tr></thead>
              <tbody>
                {[...entries].sort((a,b) => b.date.localeCompare(a.date)).map(e => {
                  const hours = e.clockIn && e.clockOut
                    ? (differenceInMinutes(parseISO(e.clockOut), parseISO(e.clockIn)) / 60).toFixed(1)
                    : '—';
                  return (
                    <tr key={e.id} className="border-b border-stroke/50">
                      <td className="py-2 text-text-mid">{format(parseISO(e.date), 'EEE, MMM d')}</td>
                      <td className="text-text-hi font-mono">{e.clockIn ? format(parseISO(e.clockIn), 'HH:mm') : '—'}</td>
                      <td className="text-text-hi font-mono">{e.clockOut ? format(parseISO(e.clockOut), 'HH:mm') : '—'}</td>
                      <td className="text-text-mid">{hours}</td>
                      <td><Badge tone={e.clockOut ? 'green' : 'cyan'}>{e.clockOut ? 'complete' : 'active'}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
