export function ConfidenceBar({ value }: { value: number }) {
  const color = value > 0.75 ? 'bg-alert' : value > 0.45 ? 'bg-amber' : 'bg-primary';
  return <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.round(value * 100)}%` }} /></div>;
}
