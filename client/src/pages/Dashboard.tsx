import { useSimulation } from '../hooks/useSimulation';
import { useSimulationStore } from '../store/simulationStore';
import { LeftSidebar } from '../components/dashboard/LeftSidebar';
import { RightSidebar } from '../components/dashboard/RightSidebar';
import { InjectButtons } from '../components/dashboard/InjectButtons';
import { WorldCanvas } from '../components/simulation/WorldCanvas';
import { WorldEngine } from '../engine/WorldEngine';

export function Dashboard() {
  useSimulation();
  const { snapshot, compareMode, setEnvironment, play, pause, reset, setSpeed, inject, schedule, setThreshold, toggleCompare, setReplay, replayMode, scrubTime, setScrubTime } = useSimulationStore();
  const compareEngine = new WorldEngine('factory', 520, 380);
  compareEngine.play();
  compareEngine.tick();

  return (
    <div className="min-h-screen bg-ink text-stone-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <LeftSidebar
          snapshot={snapshot}
          onEnvironment={setEnvironment}
          onPlay={play}
          onPause={pause}
          onReset={reset}
          onSpeed={setSpeed}
          onSchedule={schedule}
          onCompare={toggleCompare}
          onPreset={(preset) => { setEnvironment(preset.env); schedule(preset.anomaly, preset.at); play(); }}
        />
        <main className="relative flex-1">
          <div className="flex items-center justify-between border-b border-white/10 bg-surface px-4 py-3">
            <div><span className="font-medium">{snapshot.environment.name}</span><span className="ml-3 text-sm text-muted">t={snapshot.time.toFixed(1)}s</span></div>
            <div className="text-sm text-muted">FPS {snapshot.fps}</div>
          </div>
          {compareMode ? (
            <div className="grid h-[calc(100vh-112px)] grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
              <WorldCanvas snapshot={snapshot} compact />
              <WorldCanvas snapshot={compareEngine.snapshot} compact />
            </div>
          ) : <WorldCanvas snapshot={snapshot} />}
          <div className="absolute bottom-5 left-1/2 w-[min(760px,calc(100%-32px))] -translate-x-1/2 rounded-lg border border-white/10 bg-ink/90 p-3 shadow-2xl backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <InjectButtons onInject={inject} />
              <label className="flex items-center gap-2 text-xs text-muted">
                Replay <input type="checkbox" checked={replayMode} onChange={(event) => setReplay(event.target.checked)} className="accent-primary" />
              </label>
            </div>
            {replayMode && <input aria-label="Replay timeline" className="mt-3 w-full accent-primary" type="range" min={0} max={Math.max(1, snapshot.time)} step={0.1} value={scrubTime} onChange={(event) => setScrubTime(Number(event.target.value))} />}
          </div>
        </main>
        <RightSidebar snapshot={snapshot} onThreshold={setThreshold} />
      </div>
    </div>
  );
}
