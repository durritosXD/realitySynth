import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'primary' | 'danger' | 'amber' | 'info';
  children: ReactNode;
};

const variants = {
  ghost: 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-stone-100',
  primary: 'border-primary bg-primary text-white hover:bg-primary/85',
  danger: 'border-alert/50 bg-alert/15 text-red-100 hover:bg-alert/25',
  amber: 'border-amber/50 bg-amber/15 text-amber-100 hover:bg-amber/25',
  info: 'border-info/50 bg-info/15 text-blue-100 hover:bg-info/25'
};

export function Button({ variant = 'ghost', className = '', children, ...props }: Props) {
  return <button className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${variants[variant]} ${className}`} {...props}>{children}</button>;
}
