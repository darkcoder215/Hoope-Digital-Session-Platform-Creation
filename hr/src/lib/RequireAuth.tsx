import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './auth';
import type { Role } from '@/types';

export function RequireAuth({ children, roles }: { children: ReactNode; roles?: Role[] }) {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="p-10 text-text-mid">
        <h1 className="text-text-hi">Access denied</h1>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }
  return <>{children}</>;
}
