import { Zap, Flame, TrafficCone } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../ui/Button';
import type { AnomalyType } from '../../engine/types';

const injectors: { type: AnomalyType; label: string; variant: 'danger' | 'amber' | 'info'; icon: ReactNode }[] = [
  { type: 'collision', label: 'Inject: Collision', variant: 'danger', icon: <Zap size={16} /> },
  { type: 'congestion', label: 'Inject: Congestion', variant: 'amber', icon: <TrafficCone size={16} /> },
  { type: 'crowd_rush', label: 'Inject: Crowd Rush', variant: 'info', icon: <Flame size={16} /> }
];

export function InjectButtons({ onInject }: { onInject: (type: AnomalyType) => void }) {
  return <div className="flex flex-wrap gap-2">{injectors.map((item) => <Button key={item.type} variant={item.variant} onClick={() => onInject(item.type)}>{item.icon}{item.label}</Button>)}</div>;
}
