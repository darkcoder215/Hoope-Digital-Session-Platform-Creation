import type {
  AttendanceEntry, Candidate, Department, Employee, Job, LeaveBalance, LeaveRequest,
} from '@/types';
import * as seed from './seed';

/** In-memory singleton store. Mutations are in-place so React Query refetches pick them up. */
interface DB {
  employees: Employee[];
  departments: Department[];
  leaveRequests: LeaveRequest[];
  leaveBalances: LeaveBalance[];
  attendance: AttendanceEntry[];
  jobs: Job[];
  candidates: Candidate[];
}

export const db: DB = {
  employees: [...seed.employees],
  departments: [...seed.departments],
  leaveRequests: [...seed.leaveRequests],
  leaveBalances: [...seed.leaveBalances],
  attendance: [...seed.attendance],
  jobs: [...seed.jobs],
  candidates: [...seed.candidates],
};

export const nextId = (prefix: string) => `${prefix}${Math.random().toString(36).slice(2, 8)}`;
