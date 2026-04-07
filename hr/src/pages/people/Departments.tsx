import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Building2, Plus } from 'lucide-react';
import { listDepartments, listEmployees, createDepartment } from '@/mock/api';
import { Button, Card, Input, Spinner } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { fullName } from '@/lib/format';
import { Link } from 'react-router-dom';

export default function Departments() {
  const qc = useQueryClient();
  const { data: departments = [], isLoading } = useQuery({ queryKey: ['departments'], queryFn: listDepartments });
  const { data: employees = [] } = useQuery({ queryKey: ['employees'], queryFn: listEmployees });
  const [name, setName] = useState('');
  const create = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['departments'] }); setName(''); },
  });

  return (
    <PageContainer title="Departments" subtitle="Organize your team structure" module="people">
      <Card className="mb-6">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="label">New department name</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Data & Analytics" />
          </div>
          <Button onClick={() => name && create.mutate(name)} disabled={!name || create.isPending}>
            <Plus size={16} /> Add
          </Button>
        </div>
      </Card>

      {isLoading ? <Spinner /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map(d => {
            const members = employees.filter(e => e.departmentId === d.id);
            const head = employees.find(e => e.id === d.headId);
            return (
              <Card key={d.id} className="mod-people">
                <div className="flex items-start gap-3 mb-3">
                  <div className="inline-flex w-10 h-10 items-center justify-center rounded-md bg-acc-green/15 text-acc-green">
                    <Building2 size={18} />
                  </div>
                  <div className="flex-1">
                    <h3>{d.name}</h3>
                    <p className="text-text-low text-xs">{members.length} {members.length === 1 ? 'member' : 'members'}</p>
                  </div>
                </div>
                {head && (
                  <div className="mb-3 text-xs text-text-mid">
                    Led by <Link to={`/people/${head.id}`} className="text-text-hi hover:text-brand-orange font-semibold">{fullName(head)}</Link>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {members.slice(0, 5).map(m => (
                    <Link key={m.id} to={`/people/${m.id}`} title={fullName(m)}
                      className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-gradient-to-br from-acc-green/70 to-acc-cyan/70 text-bg-deep text-[11px] font-black hover:ring-2 hover:ring-brand-orange transition">
                      {m.firstName[0]}{m.lastName[0]}
                    </Link>
                  ))}
                  {members.length > 5 && <span className="text-xs text-text-low self-center">+{members.length - 5}</span>}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
