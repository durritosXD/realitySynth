import { create } from 'zustand';
import { WorldEngine } from '../engine/WorldEngine';
import type { AnomalyType, EnvironmentKey, WorldSnapshot } from '../engine/types';

type SimulationState = {
  engine: WorldEngine;
  snapshot: WorldSnapshot;
  compareMode: boolean;
  replayMode: boolean;
  scrubTime: number;
  setEnvironment: (key: EnvironmentKey) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  inject: (type: AnomalyType) => void;
  schedule: (type: AnomalyType, time: number) => void;
  tick: () => WorldSnapshot;
  setThreshold: (detectorId: string, threshold: number) => void;
  toggleCompare: () => void;
  setReplay: (enabled: boolean) => void;
  setScrubTime: (time: number) => void;
};

const engine = new WorldEngine('traffic');

export const useSimulationStore = create<SimulationState>((set, get) => ({
  engine,
  snapshot: engine.snapshot,
  compareMode: false,
  replayMode: false,
  scrubTime: 0,
  setEnvironment: (key) => {
    get().engine.setEnvironment(key);
    set({ snapshot: { ...get().engine.snapshot } });
  },
  play: () => {
    get().engine.play();
    set({ snapshot: { ...get().engine.snapshot } });
  },
  pause: () => {
    get().engine.pause();
    set({ snapshot: { ...get().engine.snapshot } });
  },
  reset: () => {
    get().engine.reset();
    set({ snapshot: { ...get().engine.snapshot }, scrubTime: 0 });
  },
  setSpeed: (speed) => {
    get().engine.setSpeed(speed);
    set({ snapshot: { ...get().engine.snapshot } });
  },
  inject: (type) => {
    get().engine.injectAnomaly(type);
    set({ snapshot: { ...get().engine.snapshot } });
  },
  schedule: (type, time) => {
    get().engine.scheduleAnomaly(type, time);
    set({ snapshot: { ...get().engine.snapshot } });
  },
  tick: () => {
    const snapshot = get().engine.tick();
    set({ snapshot: { ...snapshot, agents: [...snapshot.agents], log: [...snapshot.log] } });
    return snapshot;
  },
  setThreshold: (detectorId, threshold) => {
    get().engine.setDetectorThreshold(detectorId, threshold);
    set({ snapshot: { ...get().engine.snapshot } });
  },
  toggleCompare: () => set((state) => ({ compareMode: !state.compareMode })),
  setReplay: (enabled) => set({ replayMode: enabled }),
  setScrubTime: (time) => set({ scrubTime: time })
}));
