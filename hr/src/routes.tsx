import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { RequireAuth } from '@/lib/RequireAuth';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Directory from '@/pages/people/Directory';
import EmployeeProfile from '@/pages/people/EmployeeProfile';
import OrgChart from '@/pages/people/OrgChart';
import Departments from '@/pages/people/Departments';
import TimeOff from '@/pages/timeoff/TimeOff';
import Approvals from '@/pages/timeoff/Approvals';
import Attendance from '@/pages/attendance/Attendance';
import Jobs from '@/pages/ats/Jobs';
import JobDetail from '@/pages/ats/JobDetail';
import Settings from '@/pages/Settings';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <RequireAuth><AppShell /></RequireAuth>,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/people', element: <Directory /> },
      { path: '/people/:id', element: <EmployeeProfile /> },
      { path: '/org-chart', element: <OrgChart /> },
      { path: '/departments', element: <RequireAuth roles={['hr_admin']}><Departments /></RequireAuth> },
      { path: '/time-off', element: <TimeOff /> },
      { path: '/time-off/approvals', element: <RequireAuth roles={['manager','hr_admin']}><Approvals /></RequireAuth> },
      { path: '/attendance', element: <Attendance /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/jobs/:id', element: <JobDetail /> },
      { path: '/settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
