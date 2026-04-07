import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const fmtDate = (iso?: string) => iso ? format(parseISO(iso), 'MMM d, yyyy') : '—';
export const fmtShort = (iso?: string) => iso ? format(parseISO(iso), 'MMM d') : '—';
export const fmtRel = (iso?: string) => iso ? formatDistanceToNow(parseISO(iso), { addSuffix: true }) : '—';
export const fmtTime = (iso?: string) => iso ? format(parseISO(iso), 'HH:mm') : '—';
export const initials = (first: string, last: string) => (first[0] ?? '').toUpperCase() + (last[0] ?? '').toUpperCase();
export const fullName = (e: { firstName: string; lastName: string }) => `${e.firstName} ${e.lastName}`;
