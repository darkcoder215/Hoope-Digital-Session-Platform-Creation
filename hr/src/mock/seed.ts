import type {
  Candidate, Department, Employee, Job, LeaveBalance, LeaveRequest, AttendanceEntry,
} from '@/types';

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const daysFromNow = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return iso(d); };

export const departments: Department[] = [
  { id: 'd1', name: 'Engineering', headId: 'e2' },
  { id: 'd2', name: 'Product & Design', headId: 'e3' },
  { id: 'd3', name: 'Sales & Partnerships', headId: 'e4' },
  { id: 'd4', name: 'Marketing', headId: 'e5' },
  { id: 'd5', name: 'People & Operations', headId: 'e6' },
  { id: 'd6', name: 'Customer Success', headId: 'e7' },
];

// 3 seeded login accounts + a realistic org
export const employees: Employee[] = [
  // Executive / HR
  { id: 'e1', firstName: 'Mohammad', lastName: 'Omara', email: 'mohammad.omara@hoopoe.digital', jobTitle: 'Chief Executive Officer', departmentId: 'd5', office: 'Amsterdam', startDate: '2019-03-01', employmentType: 'full_time', role: 'hr_admin', status: 'active' },
  { id: 'e6', firstName: 'Hoda', lastName: 'El-Sayed', email: 'hoda@hoopoe.digital', jobTitle: 'People Operations Lead', departmentId: 'd5', managerId: 'e1', office: 'Cairo', startDate: '2020-06-15', employmentType: 'full_time', role: 'hr_admin', status: 'active' },

  // Department heads (managers)
  { id: 'e2', firstName: 'Omar', lastName: 'Hassan', email: 'omar@hoopoe.digital', jobTitle: 'VP of Engineering', departmentId: 'd1', managerId: 'e1', office: 'Cairo', startDate: '2019-09-10', employmentType: 'full_time', role: 'manager', status: 'active' },
  { id: 'e3', firstName: 'Sara', lastName: 'Van Dijk', email: 'sara@hoopoe.digital', jobTitle: 'Head of Product', departmentId: 'd2', managerId: 'e1', office: 'Amsterdam', startDate: '2021-02-01', employmentType: 'full_time', role: 'manager', status: 'active' },
  { id: 'e4', firstName: 'Khalid', lastName: 'Al-Otaibi', email: 'khalid@hoopoe.digital', jobTitle: 'Director of Sales, MENA', departmentId: 'd3', managerId: 'e1', office: 'Riyadh', startDate: '2022-04-20', employmentType: 'full_time', role: 'manager', status: 'active' },
  { id: 'e5', firstName: 'Yasmin', lastName: 'Farah', email: 'yasmin@hoopoe.digital', jobTitle: 'Head of Marketing', departmentId: 'd4', managerId: 'e1', office: 'Dubai', startDate: '2021-08-05', employmentType: 'full_time', role: 'manager', status: 'active' },
  { id: 'e7', firstName: 'Nour', lastName: 'Rashid', email: 'nour@hoopoe.digital', jobTitle: 'Customer Success Lead', departmentId: 'd6', managerId: 'e1', office: 'Doha', startDate: '2022-01-12', employmentType: 'full_time', role: 'manager', status: 'active' },

  // Engineering IC
  { id: 'e10', firstName: 'Lina', lastName: 'Mahmoud', email: 'lina@hoopoe.digital', jobTitle: 'Senior Frontend Engineer', departmentId: 'd1', managerId: 'e2', office: 'Cairo', startDate: '2022-05-01', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e11', firstName: 'Ahmed', lastName: 'Kamal', email: 'ahmed.k@hoopoe.digital', jobTitle: 'Backend Engineer', departmentId: 'd1', managerId: 'e2', office: 'Cairo', startDate: '2023-01-15', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e12', firstName: 'Priya', lastName: 'Kaur', email: 'priya@hoopoe.digital', jobTitle: 'DevOps Engineer', departmentId: 'd1', managerId: 'e2', office: 'Amsterdam', startDate: '2023-07-01', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e13', firstName: 'Tarek', lastName: 'Ibrahim', email: 'tarek@hoopoe.digital', jobTitle: 'ML Engineer', departmentId: 'd1', managerId: 'e2', office: 'Cairo', startDate: '2024-02-10', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e14', firstName: 'Jana', lastName: 'Saleh', email: 'jana@hoopoe.digital', jobTitle: 'QA Engineer', departmentId: 'd1', managerId: 'e2', office: 'Cairo', startDate: '2024-04-20', employmentType: 'full_time', role: 'employee', status: 'on_leave' },

  // Product & Design
  { id: 'e20', firstName: 'Marco', lastName: 'Rossi', email: 'marco@hoopoe.digital', jobTitle: 'Senior Product Designer', departmentId: 'd2', managerId: 'e3', office: 'Amsterdam', startDate: '2022-11-01', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e21', firstName: 'Leila', lastName: 'Naccache', email: 'leila@hoopoe.digital', jobTitle: 'Product Manager', departmentId: 'd2', managerId: 'e3', office: 'Dubai', startDate: '2023-03-15', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e22', firstName: 'Mina', lastName: 'George', email: 'mina@hoopoe.digital', jobTitle: 'UX Researcher', departmentId: 'd2', managerId: 'e3', office: 'Cairo', startDate: '2024-01-08', employmentType: 'full_time', role: 'employee', status: 'active' },

  // Sales
  { id: 'e30', firstName: 'Fahad', lastName: 'Al-Sulaiman', email: 'fahad@hoopoe.digital', jobTitle: 'Enterprise Account Exec', departmentId: 'd3', managerId: 'e4', office: 'Riyadh', startDate: '2022-09-01', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e31', firstName: 'Rania', lastName: 'Bahaa', email: 'rania@hoopoe.digital', jobTitle: 'Partnerships Manager', departmentId: 'd3', managerId: 'e4', office: 'Dubai', startDate: '2023-05-10', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e32', firstName: 'Hamad', lastName: 'Al-Thani', email: 'hamad@hoopoe.digital', jobTitle: 'Sales Development Rep', departmentId: 'd3', managerId: 'e4', office: 'Doha', startDate: '2024-03-01', employmentType: 'full_time', role: 'employee', status: 'active' },

  // Marketing
  { id: 'e40', firstName: 'Dana', lastName: 'Khoury', email: 'dana@hoopoe.digital', jobTitle: 'Content Lead', departmentId: 'd4', managerId: 'e5', office: 'Dubai', startDate: '2023-02-20', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e41', firstName: 'Basel', lastName: 'Qasim', email: 'basel@hoopoe.digital', jobTitle: 'Brand Designer', departmentId: 'd4', managerId: 'e5', office: 'Amsterdam', startDate: '2023-10-01', employmentType: 'part_time', role: 'employee', status: 'active' },

  // People & Ops
  { id: 'e50', firstName: 'Huda', lastName: 'Mansour', email: 'huda@hoopoe.digital', jobTitle: 'People Ops Specialist', departmentId: 'd5', managerId: 'e6', office: 'Cairo', startDate: '2023-06-01', employmentType: 'full_time', role: 'employee', status: 'active' },

  // CS
  { id: 'e60', firstName: 'Karim', lastName: 'Fouad', email: 'karim@hoopoe.digital', jobTitle: 'Customer Success Manager', departmentId: 'd6', managerId: 'e7', office: 'Doha', startDate: '2023-09-15', employmentType: 'full_time', role: 'employee', status: 'active' },
  { id: 'e61', firstName: 'Ines', lastName: 'Haddad', email: 'ines@hoopoe.digital', jobTitle: 'Support Engineer', departmentId: 'd6', managerId: 'e7', office: 'Dubai', startDate: '2024-05-20', employmentType: 'full_time', role: 'employee', status: 'active' },
];

// Leave balances — everybody gets annual + sick
export const leaveBalances: LeaveBalance[] = employees.flatMap(e => [
  { employeeId: e.id, type: 'annual', accrued: 25, used: Math.floor(Math.random() * 10) },
  { employeeId: e.id, type: 'sick', accrued: 10, used: Math.floor(Math.random() * 4) },
  { employeeId: e.id, type: 'unpaid', accrued: 0, used: 0 },
  { employeeId: e.id, type: 'parental', accrued: 90, used: 0 },
  { employeeId: e.id, type: 'compassionate', accrued: 5, used: 0 },
]);

export const leaveRequests: LeaveRequest[] = [
  { id: 'lr1', employeeId: 'e10', type: 'annual', startDate: daysFromNow(7), endDate: daysFromNow(11), days: 5, status: 'pending', reason: 'Family trip' },
  { id: 'lr2', employeeId: 'e11', type: 'sick', startDate: daysFromNow(-2), endDate: daysFromNow(-1), days: 2, status: 'approved', reason: 'Flu', reviewedBy: 'e2', reviewedAt: daysFromNow(-2) },
  { id: 'lr3', employeeId: 'e13', type: 'annual', startDate: daysFromNow(14), endDate: daysFromNow(18), days: 5, status: 'pending', reason: 'Wedding' },
  { id: 'lr4', employeeId: 'e20', type: 'annual', startDate: daysFromNow(30), endDate: daysFromNow(44), days: 10, status: 'pending', reason: 'Summer vacation' },
  { id: 'lr5', employeeId: 'e14', type: 'sick', startDate: daysFromNow(-5), endDate: daysFromNow(5), days: 10, status: 'approved', reason: 'Surgery recovery', reviewedBy: 'e2', reviewedAt: daysFromNow(-6) },
  { id: 'lr6', employeeId: 'e30', type: 'annual', startDate: daysFromNow(3), endDate: daysFromNow(4), days: 2, status: 'pending' },
  { id: 'lr7', employeeId: 'e50', type: 'annual', startDate: daysFromNow(21), endDate: daysFromNow(25), days: 5, status: 'pending', reason: 'Personal' },
  { id: 'lr8', employeeId: 'e40', type: 'annual', startDate: daysFromNow(-10), endDate: daysFromNow(-7), days: 4, status: 'approved', reviewedBy: 'e5', reviewedAt: daysFromNow(-12) },
];

// Attendance — today entries for ~10 employees
export const attendance: AttendanceEntry[] = employees.slice(0, 10).map((e, i) => ({
  id: `a${i}`, employeeId: e.id, date: iso(today),
  clockIn: new Date(today.setHours(9, i % 20, 0, 0)).toISOString(),
}));

export const jobs: Job[] = [
  { id: 'j1', title: 'Staff Frontend Engineer', departmentId: 'd1', office: 'Cairo', status: 'open', postedAt: daysFromNow(-14), employmentType: 'full_time', description: 'Lead frontend architecture for Hoopoe Marketplace and Ad Manager. Deep React/TypeScript. Design-system mindset.' },
  { id: 'j2', title: 'Product Designer, Instant Apps', departmentId: 'd2', office: 'Amsterdam', status: 'open', postedAt: daysFromNow(-7), employmentType: 'full_time', description: 'Design location-intelligent Wi-Fi apps that appear on connect. Strong motion + interaction skills.' },
  { id: 'j3', title: 'Enterprise AE, UAE', departmentId: 'd3', office: 'Dubai', status: 'open', postedAt: daysFromNow(-21), employmentType: 'full_time', description: 'Own the UAE enterprise pipeline — malls, airports, transit. 5+ years SaaS sales.' },
  { id: 'j4', title: 'Data / BI Analyst', departmentId: 'd1', office: 'Cairo', status: 'open', postedAt: daysFromNow(-4), employmentType: 'full_time', description: 'Work on the Wi-Fi BI dashboards: footfall, dwell, DPI. SQL + Python + dashboards.' },
];

const names = [
  'Aisha Rahman', 'Mostafa Nabil', 'Lucas Meyer', 'Hassan Ali', 'Maya Fischer',
  'Kareem Adel', 'Sophia Chen', 'Youssef Magdy', 'Noor Haddad', 'Imran Qureshi',
  'Fatima Sayed', 'Daniel Berg', 'Salma Gaber', 'Omar Jaber', 'Layla Darwish',
  'Bassem Saad', 'Nadia Farouk', 'Ziad Hamdy', 'Elena Popescu', 'Rafael Santos',
];
const stages: Candidate['stage'][] = ['applied', 'applied', 'applied', 'screen', 'screen', 'interview', 'interview', 'offer'];

export const candidates: Candidate[] = jobs.flatMap((j, ji) =>
  names.slice(ji * 5, ji * 5 + 5).map((n, i) => ({
    id: `c${j.id}-${i}`,
    jobId: j.id,
    name: n,
    email: n.toLowerCase().replace(' ', '.') + '@gmail.com',
    stage: stages[(ji + i) % stages.length],
    rating: (((ji + i) % 5) + 1) as Candidate['rating'],
    notes: i === 0 ? 'Strong portfolio, fast-track' : undefined,
    appliedAt: daysFromNow(-(i * 2 + ji * 3)),
  }))
);
