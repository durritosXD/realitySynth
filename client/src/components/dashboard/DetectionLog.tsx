import type { DetectionLogEntry } from '../../engine/types';

export function DetectionLog({ entries }: { entries: DetectionLogEntry[] }) {
  return (
    <div className="h-64 overflow-y-auto rounded-lg border border-white/10 bg-black/25 p-3 font-mono text-[11px]">
      {entries.length === 0 && <div className="text-muted">waiting for detector frames...</div>}
      {entries.map((entry, index) => (
        <div key={`${entry.wallTime}-${index}`} className={`mb-1 animate-[slideIn_.22s_ease-out] ${entry.isAlert ? 'text-alert' : 'text-primary'}`}>
          <span className="text-muted">t={entry.timestamp.toFixed(2)}</span> {entry.detectorId} {(entry.confidence * 100).toFixed(1)}% {entry.anomalyType ?? 'normal'}
        </div>
      ))}
    </div>
  );
}
