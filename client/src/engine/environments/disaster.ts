import type { EnvironmentConfig } from '../types';

export const disasterEnvironment: EnvironmentConfig = {
  key: 'disaster',
  name: 'Disaster Zone',
  backgroundType: 'openspace',
  agentTypes: [
    { type: 'civilian', count: 26, color: '#BA7517', size: 7 },
    { type: 'responder', count: 6, color: '#1D9E75', size: 8 }
  ],
  anomalyTypes: ['fire', 'crowd_rush', 'congestion'],
  aiDetectors: [
    { id: 'primary', name: 'HazardDetect-v1', target: 'fire', latency: 0.3, peak: [0.88, 0.96], threshold: 0.75, enabled: true, sensitivity: 'high' },
    { id: 'secondary', name: 'EvacFlow-v2', target: 'crowd_rush', latency: 0.8, peak: [0.65, 0.78], threshold: 0.75, enabled: true, sensitivity: 'medium' },
    { id: 'score', name: 'AnomalyScore-v1', target: 'general', latency: 0.5, peak: [0.8, 0.92], threshold: 0.75, enabled: true, sensitivity: 'medium' }
  ]
};
