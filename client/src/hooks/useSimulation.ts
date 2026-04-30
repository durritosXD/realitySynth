import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDatasetStore } from '../store/datasetStore';
import { useSimulationStore } from '../store/simulationStore';

export function useSimulation() {
  const tick = useSimulationStore((state) => state.tick);
  const snapshot = useSimulationStore((state) => state.snapshot);
  const addEvents = useDatasetStore((state) => state.addEvents);

  useEffect(() => {
    let raf = 0;
    let previousLogLength = snapshot.log.length;
    const loop = () => {
      const next = tick();
      if (next.log.length > previousLogLength) {
        addEvents(next.log.slice(0, next.log.length - previousLogLength));
      }
      previousLogLength = next.log.length;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [addEvents, tick]);

  useEffect(() => {
    const socket = io();
    socket.emit('join-simulation', snapshot.environment.key);
    const interval = window.setInterval(() => socket.emit('simulation-state', { environmentId: snapshot.environment.key, state: snapshot }), 1000);
    return () => {
      window.clearInterval(interval);
      socket.disconnect();
    };
  }, [snapshot]);
}
