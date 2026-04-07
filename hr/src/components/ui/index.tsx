import { type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react';
import { cx } from '@/lib/cx';

// ---------- Button ----------
type BtnVariant = 'primary' | 'ghost' | 'danger';
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: BtnVariant }
export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button(
  { variant = 'primary', className, ...p }, ref,
) {
  const v = variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : 'btn-danger';
  return <button ref={ref} className={cx('btn', v, className)} {...p} />;
});

// ---------- Card ----------
export function Card({ className, children, ...p }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('card', className)} {...p}>{children}</div>;
}

// ---------- Input ----------
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...p }, ref) {
    return <input ref={ref} className={cx('input', className)} {...p} />;
  }
);

// ---------- Textarea ----------
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...p }, ref) {
    return <textarea ref={ref} className={cx('input min-h-[120px] py-2', className)} {...p} />;
  }
);

// ---------- Select ----------
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...p }, ref) {
    return <select ref={ref} className={cx('input', className)} {...p}>{children}</select>;
  }
);

// ---------- Badge ----------
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'green' | 'magenta' | 'cyan' | 'yellow' | 'orange' | 'red' | 'neutral';
}
export function Badge({ tone = 'neutral', className, children, ...p }: BadgeProps) {
  const tones: Record<string, string> = {
    green: 'bg-acc-green/15 text-acc-green border-acc-green/30',
    magenta: 'bg-acc-magenta/15 text-acc-magenta border-acc-magenta/30',
    cyan: 'bg-acc-cyan/15 text-acc-cyan border-acc-cyan/30',
    yellow: 'bg-acc-yellow/15 text-acc-yellow border-acc-yellow/30',
    orange: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    red: 'bg-acc-red/15 text-acc-red border-acc-red/30',
    neutral: 'bg-white/5 text-text-mid border-stroke',
  };
  return (
    <span className={cx('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border', tones[tone], className)} {...p}>
      {children}
    </span>
  );
}

// ---------- Avatar ----------
export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map(s => s[0]?.toUpperCase() ?? '').join('');
  const s = { width: size, height: size, fontSize: size * 0.38 };
  return (
    <div
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-brand-orange/80 to-acc-magenta/80 text-bg-deep font-black shrink-0"
      style={s}
      aria-hidden
    >{initials}</div>
  );
}

// ---------- EmptyState ----------
export function EmptyState({ title, hint, icon }: { title: string; hint?: string; icon?: React.ReactNode }) {
  return (
    <div className="py-16 text-center">
      {icon && <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-bg-surface border border-stroke mb-4 text-text-low">{icon}</div>}
      <h3 className="text-text-hi mb-1">{title}</h3>
      {hint && <p className="text-text-low text-sm">{hint}</p>}
    </div>
  );
}

// ---------- Spinner ----------
export function Spinner() {
  return (
    <div className="py-12 text-center text-text-low text-sm">Loading…</div>
  );
}
