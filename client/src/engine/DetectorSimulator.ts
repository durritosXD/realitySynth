import type { AnomalyType, DetectorConfig, DetectorReading } from './types';

const noise = () => (Math.random() - 0.5) * 0.06;
const range = ([min, max]: [number, number]) => min + Math.random() * (max - min);

export function simulateDetectors(detectors: DetectorConfig[], anomaly: AnomalyType | null, timer: number): DetectorReading[] {
  return detectors.map((detector) => {
    if (!detector.enabled) {
      return { detectorId: detector.id, name: detector.name, confidence: 0, isAlert: false, status: 'amber', threshold: detector.threshold };
    }
    const baseline = 0.05 + Math.random() * 0.1;
    const elapsed = Math.max(0, timer - detector.latency);
    const anomalyMatch = anomaly && (detector.target === anomaly || detector.target === 'general');
    const ramp = anomalyMatch ? Math.min(1, elapsed / 1.5) : 0;
    const confidence = Math.max(0, Math.min(0.99, baseline * (1 - ramp) + range(detector.peak) * ramp + noise()));
    const isAlert = confidence > detector.threshold;
    const status = isAlert ? 'red' : confidence > 0.45 ? 'amber' : 'green';
    return { detectorId: detector.id, name: detector.name, confidence, isAlert, status, threshold: detector.threshold };
  });
}
