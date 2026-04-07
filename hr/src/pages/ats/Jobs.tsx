import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Briefcase, Plus } from 'lucide-react';
import { createJob, listCandidates, listDepartments, listJobs } from '@/mock/api';
import { Badge, Button, Card, Input, Select, Spinner, Textarea } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { useAuth } from '@/lib/auth';
import { fmtDate } from '@/lib/format';
import type { EmploymentType, Office } from '@/types';

export default function Jobs() {
  const { hasRole } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data: jobs = [], isLoading } = useQuery({ queryKey: ['jobs'], queryFn: listJobs });
  const { data: candidates = [] } = useQuery({ queryKey: ['candidates'], queryFn: () => listCandidates() });
  const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: listDepartments });

  return (
    <PageContainer
      title="Recruiting"
      subtitle="Open roles and candidate pipelines"
      module="ats"
      actions={hasRole('hr_admin') ? <Button onClick={() => setOpen(true)}><Plus size={16}/> New job</Button> : undefined}
    >
      {isLoading ? <Spinner /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map(j => {
            const count = candidates.filter(c => c.jobId === j.id).length;
            const dept = departments.find(d => d.id === j.departmentId);
            return (
              <Link key={j.id} to={`/jobs/${j.id}`}>
                <Card className="mod-ats hover:ring-1 hover:ring-acc-yellow/50 transition">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="inline-flex w-10 h-10 items-center justify-center rounded-md bg-acc-yellow/15 text-acc-yellow">
                      <Briefcase size={18} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{j.title}</h3>
                      <p className="text-text-low text-xs">{dept?.name} · {j.office}</p>
                    </div>
                    <Badge tone={j.status === 'open' ? 'green' : 'red'}>{j.status}</Badge>
                  </div>
                  <p className="text-text-mid text-sm line-clamp-2 mb-3">{j.description}</p>
                  <div className="flex items-center justify-between text-xs text-text-low">
                    <span>{count} candidate{count === 1 ? '' : 's'}</span>
                    <span>Posted {fmtDate(j.postedAt)}</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
      {open && (
        <NewJobDialog
          departments={departments}
          onClose={() => setOpen(false)}
          onCreated={() => { qc.invalidateQueries({ queryKey: ['jobs'] }); setOpen(false); }}
        />
      )}
    </PageContainer>
  );
}

function NewJobDialog({ departments, onClose, onCreated }: { departments: { id: string; name: string }[]; onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [departmentId, setDepartmentId] = useState(departments[0]?.id ?? '');
  const [office, setOffice] = useState<Office>('Amsterdam');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('full_time');
  const [description, setDescription] = useState('');
  const create = useMutation({ mutationFn: createJob, onSuccess: onCreated });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !departmentId) return;
    create.mutate({ title, departmentId, office, employmentType, description });
  };
  return (
    <div className="fixed inset-0 bg-black/70 grid place-items-center p-4 z-50" onClick={onClose}>
      <Card className="mod-ats w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <h3 className="mb-4">Post a new job</h3>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="label">Title</label><Input value={title} onChange={e => setTitle(e.target.value)} required /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Department</label>
              <Select value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </Select>
            </div>
            <div>
              <label className="label">Office</label>
              <Select value={office} onChange={e => setOffice(e.target.value as Office)}>
                {(['Amsterdam','Cairo','Riyadh','Dubai','Doha'] as Office[]).map(o => <option key={o} value={o}>{o}</option>)}
              </Select>
            </div>
          </div>
          <div>
            <label className="label">Employment type</label>
            <Select value={employmentType} onChange={e => setEmploymentType(e.target.value as EmploymentType)}>
              <option value="full_time">Full time</option>
              <option value="part_time">Part time</option>
              <option value="contractor">Contractor</option>
            </Select>
          </div>
          <div><label className="label">Description</label><Textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} /></div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={create.isPending}>Create job</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
