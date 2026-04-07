import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Employee, Role } from '@/types';
import { db } from '@/mock/db';

interface AuthCtx {
  user: Employee | null;
  login: (email: string) => boolean;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
}

const Ctx = createContext<AuthCtx | null>(null);
const STORAGE_KEY = 'hoopoe_hr_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Employee | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const id = JSON.parse(raw) as string;
      return db.employees.find(e => e.id === id) ?? null;
    } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user.id));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = (email: string) => {
    const found = db.employees.find(e => e.email.toLowerCase() === email.toLowerCase());
    if (!found) return false;
    setUser(found);
    return true;
  };
  const logout = () => setUser(null);
  const hasRole = (...roles: Role[]) => !!user && roles.includes(user.role);

  return <Ctx.Provider value={{ user, login, logout, hasRole }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be inside AuthProvider');
  return c;
}
