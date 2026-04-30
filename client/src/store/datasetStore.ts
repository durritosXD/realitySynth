import { create } from 'zustand';
import type { DetectionLogEntry } from '../engine/types';

type DatasetState = {
  events: DetectionLogEntry[];
  addEvents: (events: DetectionLogEntry[]) => void;
  clear: () => void;
};

export const useDatasetStore = create<DatasetState>((set) => ({
  events: JSON.parse(localStorage.getItem('rs_events') ?? '[]'),
  addEvents: (events) => set((state) => {
    const next = [...events, ...state.events].slice(0, 5000);
    localStorage.setItem('rs_events', JSON.stringify(next));
    return { events: next };
  }),
  clear: () => {
    localStorage.removeItem('rs_events');
    set({ events: [] });
  }
}));
