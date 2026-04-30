export function StatusDot({ status }: { status: 'green' | 'amber' | 'red' }) {
  const color = status === 'green' ? 'bg-primary' : status === 'amber' ? 'bg-amber' : 'bg-alert';
  return <span className={`h-2 w-2 rounded-full ${color} ${status === 'red' ? 'animate-pulse' : ''}`} />;
}
