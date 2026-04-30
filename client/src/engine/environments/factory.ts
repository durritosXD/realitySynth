import type { EnvironmentConfig } from '../types';

export const factoryEnvironment: EnvironmentConfig = {
  key: 'factory',
  name: 'Factory Floor',
  backgroundType: 'floor',
  agentTypes: [
    { type: 'worker', count: 16, color: '#378ADD', size: 7 },
    { type: 'machine', count: 5, color: '#888780', size: 28 }
  ],
  anomalyTypes: ['equipment_fail', 'fire', 'congestion'],
  aiDetectors: [
    { id: 'primary', name: 'FaultDetect-v1', target: 'equipment_fail', latency: 0.3, peak: [0.88, 0.96], threshold: 0.75, enabled: true, sensitivity: 'high' },
    { id: 'secondary', name: 'LineMonitor-v2', target: 'congestion', latency: 0.8, peak: [0.65, 0.78], threshold: 0.75, enabled: true, sensitivity: 'medium' },
    { id: 'score', name: 'AnomalyScore-v1', target: 'general', latency: 0.5, peak: [0.8, 0.92], threshold: 0.75, enabled: true, sensitivity: 'medium' }
  ]
};
