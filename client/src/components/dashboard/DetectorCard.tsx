import { ConfidenceBar } from '../ui/ConfidenceBar';
import { StatusDot } from '../ui/StatusDot';
import type { DetectorReading } from '../../engine/types';

export function DetectorCard({ detector, onThreshold }: { detector: DetectorReading; onThreshold: (value: number) => void }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{detector.name}</div>
        <StatusDot status={detector.status} />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-2xl font-medium">{Math.round(detector.confidence * 100)}%</span>
        <span className="text-xs text-muted">alert {Math.round(detector.threshold * 100)}%</span>
      </div>
      <div className="mt-2"><ConfidenceBar value={detector.confidence} /></div>
      <input aria-label={`${detector.name} threshold`} className="mt-3 w-full accent-primary" min={40} max={95} type="range" value={Math.round(detector.threshold * 100)} onChange={(event) => onThreshold(Number(event.target.value) / 100)} />
    </div>
  );
}
