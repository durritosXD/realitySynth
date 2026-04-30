import { useSimulationStore } from '../store/simulationStore';

export function useDetectors() {
  return useSimulationStore((state) => ({
    detectors: state.snapshot.detectors,
    setThreshold: state.setThreshold
  }));
}
