import type { EnvironmentConfig } from '../types';

export const trafficEnvironment: EnvironmentConfig = {
  key: 'traffic',
  name: 'Traffic Junction',
  backgroundType: 'intersection',
  agentTypes: [
    { type: 'car', count: 18, color: '#1D9E75', size: 14 },
    { type: 'pedestrian', count: 10, color: '#534AB7', size: 6 }
  ],
  anomalyTypes: ['collision', 'congestion', 'crowd_rush', 'fire'],
  aiDetectors: [
    { id: 'primary', name: 'AccidentDetect-v1', target: 'collision', latency: 0.3, peak: [0.88, 0.96], threshold: 0.75, enabled: true, sensitivity: 'high' },
    { id: 'secondary', name: 'FlowMonitor-v2', target: 'congestion', latency: 0.8, peak: [0.65, 0.78], threshold: 0.75, enabled: true, sensitivity: 'medium' },
    { id: 'score', name: 'AnomalyScore-v1', target: 'general', latency: 0.5, peak: [0.8, 0.92], threshold: 0.75, enabled: true, sensitivity: 'medium' }
  ]
};
