import { Pause, Play, RotateCcw, Save, SplitSquareHorizontal } from 'lucide-react';
import { environmentList } from '../../engine/environments';
import type { AnomalyType, EnvironmentKey, WorldSnapshot } from '../../engine/types';
import { Button } from '../ui/Button';

const presets: { name: string; env: EnvironmentKey; anomaly: AnomalyType; at: number }[] = [
  { name: 'Rush hour collision', env: 'traffic', anomaly: 'collision', at: 5 },
  { name: 'School fire drill', env: 'classroom', anomaly: 'fire', at: 7 },
  { name: 'Factory line failure', env: 'factory', anomaly: 'equipment_fail', at: 6 }
];

export function LeftSidebar({
  snapshot,
  onEnvironment,
  onPlay,
  onPause,
  onReset,
  onSpeed,
  onSchedule,
  onPreset,
  onCompare
}: {
  snapshot: WorldSnapshot;
  onEnvironment: (key: EnvironmentKey) => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeed: (speed: number) => void;
  onSchedule: (type: AnomalyType, time: number) => void;
  onPreset: (preset: { env: EnvironmentKey; anomaly: AnomalyType; at: number }) => void;
  onCompare: () => void;
}) {
  return (
    <aside className="w-full shrink-0 border-r border-white/10 bg-surface p-4 lg:w-60">
      <div className="text-xs uppercase tracking-wide text-muted">Environment</div>
      <select className="mt-2 w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-sm" value={snapshot.environment.key} onChange={(event) => onEnvironment(event.target.value as EnvironmentKey)}>
        {environmentList.map((env) => <option key={env.key} value={env.key}>{env.name}</option>)}
      </select>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <Button title="Play" onClick={onPlay}><Play size={16} /></Button>
        <Button title="Pause" onClick={onPause}><Pause size={16} /></Button>
        <Button title="Reset" onClick={onReset}><RotateCcw size={16} /></Button>
      </div>
      <div className="mt-5 text-xs uppercase tracking-wide text-muted">Speed</div>
      <div className="mt-2 grid grid-cols-3 gap-2">{[1, 2, 5].map((speed) => <Button key={speed} variant={snapshot.speed === speed ? 'primary' : 'ghost'} onClick={() => onSpeed(speed)}>{speed}x</Button>)}</div>
      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <div className="text-xs text-muted">Live agents</div>
        <div className="text-3xl font-medium">{snapshot.agents.length}</div>
      </div>
      <div className="mt-5 text-xs uppercase tracking-wide text-muted">Scenario preset</div>
      <select className="mt-2 w-full rounded-md border border-white/10 bg-ink px-3 py-2 text-sm" onChange={(event) => { const preset = presets[Number(event.target.value)]; if (preset) onPreset(preset); }} defaultValue="">
        <option value="" disabled>Select preset</option>
        {presets.map((preset, index) => <option key={preset.name} value={index}>{preset.name}</option>)}
      </select>
      <div className="mt-5 grid gap-2">
        <Button onClick={() => onSchedule('collision', 10)}>Schedule collision t=10s</Button>
        <Button onClick={onCompare}><SplitSquareHorizontal size={16} /> Compare</Button>
        <Button variant="primary"><Save size={16} /> Save Environment</Button>
      </div>
    </aside>
  );
}
