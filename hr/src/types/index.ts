export type Role = 'employee' | 'manager' | 'hr_admin';

export type Office = 'Amsterdam' | 'Cairo' | 'Riyadh' | 'Dubai' | 'Doha';

export type EmploymentType = 'full_time' | 'part_time' | 'contractor';

export type EmployeeStatus = 'active' | 'on_leave' | 'offboarded';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  jobTitle: string;
  departmentId: string;
  managerId?: string;
  office: Office;
  startDate: string; // ISO
  employmentType: EmploymentType;
  role: Role;
  status: EmployeeStatus;
  phone?: string;
  emergencyContact?: { name: string; relation: string; phone: string };
}

export interface Department {
  id: string;
  name: string;
  headId?: string;
}

export type LeaveType = 'annual' | 'sick' | 'unpaid' | 'parental' | 'compassionate';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface LeaveBalance {
  employeeId: string;
  type: LeaveType;
  accrued: number;
  used: number;
}

export interface AttendanceEntry {
  id: string;
  employeeId: string;
  date: string; // ISO date
  clockIn?: string; // ISO datetime
  clockOut?: string; // ISO datetime
}

export type PipelineStage = 'applied' | 'screen' | 'interview' | 'offer' | 'hired' | 'rejected';

export interface Job {
  id: string;
  title: string;
  departmentId: string;
  office: Office;
  status: 'open' | 'closed';
  postedAt: string;
  description: string;
  employmentType: EmploymentType;
}

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  stage: PipelineStage;
  rating: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  appliedAt: string;
}
