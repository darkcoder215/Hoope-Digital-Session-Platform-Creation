import { db, nextId } from './db';
import type {
  Candidate, Department, Employee, Job, LeaveBalance, LeaveRequest, PipelineStage, AttendanceEntry,
} from '@/types';

const delay = <T,>(v: T, ms = 120): Promise<T> =>
  new Promise(r => setTimeout(() => r(v), ms));

// ---------- Employees ----------
export const listEmployees = () => delay([...db.employees]);
export const getEmployee = (id: string) => delay(db.employees.find(e => e.id === id));
export const createEmployee = (e: Omit<Employee, 'id'>) => {
  const n: Employee = { ...e, id: nextId('e') };
  db.employees.push(n);
  // seed balances
  (['annual','sick','unpaid','parental','compassionate'] as const).forEach(type => {
    db.leaveBalances.push({ employeeId: n.id, type, accrued: type==='annual'?25:type==='sick'?10:type==='parental'?90:type==='compassionate'?5:0, used: 0 });
  });
  return delay(n);
};
export const updateEmployee = (id: string, patch: Partial<Employee>) => {
  const i = db.employees.findIndex(e => e.id === id);
  if (i === -1) return delay(undefined);
  db.employees[i] = { ...db.employees[i], ...patch };
  return delay(db.employees[i]);
};

// ---------- Departments ----------
export const listDepartments = () => delay([...db.departments]);
export const createDepartment = (name: string) => {
  const d: Department = { id: nextId('d'), name };
  db.departments.push(d);
  return delay(d);
};

// ---------- Leave ----------
export const listLeaveRequests = () => delay([...db.leaveRequests]);
export const listMyLeaveRequests = (employeeId: string) =>
  delay(db.leaveRequests.filter(l => l.employeeId === employeeId));
export const listPendingApprovalsFor = (managerId: string) => {
  const reports = db.employees.filter(e => e.managerId === managerId).map(e => e.id);
  return delay(db.leaveRequests.filter(l => l.status === 'pending' && reports.includes(l.employeeId)));
};
export const listAllPendingLeave = () =>
  delay(db.leaveRequests.filter(l => l.status === 'pending'));

export const createLeaveRequest = (r: Omit<LeaveRequest, 'id' | 'status'>) => {
  const n: LeaveRequest = { ...r, id: nextId('lr'), status: 'pending' };
  db.leaveRequests.push(n);
  return delay(n);
};
export const reviewLeaveRequest = (id: string, decision: 'approved' | 'rejected', reviewerId: string) => {
  const i = db.leaveRequests.findIndex(l => l.id === id);
  if (i === -1) return delay(undefined);
  db.leaveRequests[i] = {
    ...db.leaveRequests[i],
    status: decision,
    reviewedBy: reviewerId,
    reviewedAt: new Date().toISOString(),
  };
  // update balance if approved
  if (decision === 'approved') {
    const lr = db.leaveRequests[i];
    const bal = db.leaveBalances.find(b => b.employeeId === lr.employeeId && b.type === lr.type);
    if (bal) bal.used += lr.days;
  }
  return delay(db.leaveRequests[i]);
};
export const listBalances = (employeeId: string): Promise<LeaveBalance[]> =>
  delay(db.leaveBalances.filter(b => b.employeeId === employeeId));

// ---------- Attendance ----------
export const listAttendance = (employeeId?: string) =>
  delay(employeeId ? db.attendance.filter(a => a.employeeId === employeeId) : [...db.attendance]);
export const clockIn = (employeeId: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const existing = db.attendance.find(a => a.employeeId === employeeId && a.date === today);
  if (existing && !existing.clockIn) { existing.clockIn = new Date().toISOString(); return delay(existing); }
  if (!existing) {
    const a: AttendanceEntry = { id: nextId('a'), employeeId, date: today, clockIn: new Date().toISOString() };
    db.attendance.push(a);
    return delay(a);
  }
  return delay(existing);
};
export const clockOut = (employeeId: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const entry = db.attendance.find(a => a.employeeId === employeeId && a.date === today);
  if (entry) entry.clockOut = new Date().toISOString();
  return delay(entry);
};

// ---------- Jobs ----------
export const listJobs = () => delay([...db.jobs]);
export const getJob = (id: string) => delay(db.jobs.find(j => j.id === id));
export const createJob = (j: Omit<Job, 'id' | 'postedAt' | 'status'>) => {
  const n: Job = { ...j, id: nextId('j'), postedAt: new Date().toISOString().slice(0, 10), status: 'open' };
  db.jobs.push(n);
  return delay(n);
};
export const closeJob = (id: string) => {
  const j = db.jobs.find(x => x.id === id);
  if (j) j.status = 'closed';
  return delay(j);
};

// ---------- Candidates ----------
export const listCandidates = (jobId?: string) =>
  delay(jobId ? db.candidates.filter(c => c.jobId === jobId) : [...db.candidates]);
export const moveCandidate = (id: string, stage: PipelineStage) => {
  const c = db.candidates.find(x => x.id === id);
  if (c) c.stage = stage;
  return delay(c);
};
