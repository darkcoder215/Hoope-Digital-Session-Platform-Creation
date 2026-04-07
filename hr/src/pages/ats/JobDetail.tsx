import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DndContext, useDraggable, useDroppable, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { ArrowLeft, Star } from 'lucide-react';
import { getJob, listCandidates, listDepartments, moveCandidate } from '@/mock/api';
import { Badge, Card, Spinner } from '@/components/ui';
import { PageContainer } from '@/components/layout/PageContainer';
import { fmtDate } from '@/lib/format';
import { cx } from '@/lib/cx';
import type { Candidate, PipelineStage } from '@/types';

const STAGES: { id: PipelineStage; label: string }[] = [
  { id: 'applied', label: 'Applied' },
  { id: 'screen', label: 'Screen' },
  { id: 'interview', label: 'Interview' },
  { id: 'offer', label: 'Offer' },
  { id: 'hired', label: 'Hired' },
  { id: 'rejected', label: 'Rejected' },
];

export default function JobDetail() {
  const { id = '' } = useParams();
  const qc = useQueryClient();
  const { data: job, isLoading } = useQuery({ queryKey: ['job', id], queryFn: () => getJob(id) });
  const { data: candidates = [] } = useQuery({ queryKey: ['candidates', id], queryFn: () => listCandidates(id) });
  const { data: departments = [] } = useQuery({ queryKey: ['departments'], queryFn: listDepartments });

  const move = useMutation({
    mutationFn: ({ cid, stage }: { cid: string; stage: PipelineStage }) => moveCandidate(cid, stage),
    onMutate: async ({ cid, stage }) => {
      await qc.cancelQueries({ queryKey: ['candidates', id] });
      const prev = qc.getQueryData<Candidate[]>(['candidates', id]);
      if (prev) qc.setQueryData<Candidate[]>(['candidates', id], prev.map(c => c.id === cid ? { ...c, stage } : c));
      return { prev };
    },
    onError: (_e, _v, ctx) => { if (ctx?.prev) qc.setQueryData(['candidates', id], ctx.prev); },
    onSettled: () => qc.invalidateQueries({ queryKey: ['candidates', id] }),
  });

  const grouped = useMemo(() => {
    const g: Record<PipelineStage, Candidate[]> = { applied: [], screen: [], interview: [], offer: [], hired: [], rejected: [] };
    candidates.forEach(c => g[c.stage].push(c));
    return g;
  }, [candidates]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over) return;
    const stage = e.over.id as PipelineStage;
    const cid = String(e.active.id);
    const current = candidates.find(c => c.id === cid);
    if (current && current.stage !== stage) move.mutate({ cid, stage });
  };

  if (isLoading || !job) return <PageContainer title="Job" module="ats"><Spinner /></PageContainer>;
  const dept = departments.find(d => d.id === job.departmentId);

  return (
    <PageContainer title={job.title} subtitle={`${dept?.name ?? ''} · ${job.office}`} module="ats">
      <Link to="/jobs" className="inline-flex items-center gap-1 text-text-low hover:text-text-hi text-sm mb-4"><ArrowLeft size={14}/> All jobs</Link>
      <Card className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <div className="flex items-center gap-2 mb-2">
              <Badge tone={job.status === 'open' ? 'green' : 'red'}>{job.status}</Badge>
              <Badge tone="yellow">{job.employmentType.replace('_',' ')}</Badge>
              <span className="text-text-low text-xs">Posted {fmtDate(job.postedAt)}</span>
            </div>
            <p className="text-text-mid text-sm whitespace-pre-wrap">{job.description}</p>
          </div>
          <div className="text-right">
            <div className="eyebrow text-acc-yellow">Total candidates</div>
            <div className="font-serif text-4xl text-text-hi">{candidates.length}</div>
          </div>
        </div>
      </Card>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {STAGES.map(s => (
            <Column key={s.id} id={s.id} label={s.label} candidates={grouped[s.id]} />
          ))}
        </div>
      </DndContext>
    </PageContainer>
  );
}

function Column({ id, label, candidates }: { id: PipelineStage; label: string; candidates: Candidate[] }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={cx('rounded-lg border border-stroke bg-bg-surface/60 p-2 min-h-[300px]', isOver && 'ring-1 ring-acc-yellow/60 bg-acc-yellow/5')}>
      <div className="flex items-center justify-between px-1 py-2 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text-low">{label}</span>
        <span className="text-[10px] font-bold text-text-hi bg-white/5 px-1.5 py-0.5 rounded">{candidates.length}</span>
      </div>
      <div className="space-y-2">
        {candidates.map(c => <CandidateCard key={c.id} c={c} />)}
      </div>
    </div>
  );
}

function CandidateCard({ c }: { c: Candidate }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: c.id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cx('rounded-md border border-stroke bg-bg-elevated p-2.5 cursor-grab active:cursor-grabbing', isDragging && 'opacity-60')}
    >
      <div className="text-text-hi text-sm font-semibold truncate">{c.name}</div>
      <div className="text-text-low text-[11px] truncate mb-1">{c.email}</div>
      <div className="flex items-center gap-0.5 text-acc-yellow">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={10} fill={i < c.rating ? 'currentColor' : 'none'} />
        ))}
      </div>
    </div>
  );
}
