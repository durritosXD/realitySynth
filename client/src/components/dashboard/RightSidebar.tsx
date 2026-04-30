import { Download } from 'lucide-react';
import type { WorldSnapshot } from '../../engine/types';
import { exportJson } from '../../utils/exporters';
import { Button } from '../ui/Button';
import { DetectionLog } from './DetectionLog';
import { DetectorCard } from './DetectorCard';

export function RightSidebar({ snapshot, onThreshold }: { snapshot: WorldSnapshot; onThreshold: (id: string, value: number) => void }) {
  return (
    <aside className="w-full shrink-0 border-l border-white/10 bg-surface p-4 lg:w-[280px]">
      <div className="mb-3 text-sm font-medium">AI Detectors</div>
      <div className="grid gap-3">{snapshot.detectors.map((detector) => <DetectorCard key={detector.detectorId} detector={detector} onThreshold={(value) => onThreshold(detector.detectorId, value)} />)}</div>
      <div className="mb-3 mt-5 text-sm font-medium">Detection Log</div>
      <DetectionLog entries={snapshot.log} />
      <Button className="mt-4 w-full" variant="primary" onClick={() => exportJson(snapshot.log, snapshot.environment.key)}><Download size={16} /> Export Dataset</Button>
    </aside>
  );
}
