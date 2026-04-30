import type { EnvironmentConfig } from '../types';

export const classroomEnvironment: EnvironmentConfig = {
  key: 'classroom',
  name: 'Classroom',
  backgroundType: 'grid',
  agentTypes: [
    { type: 'student', count: 24, color: '#534AB7', size: 7 },
    { type: 'teacher', count: 1, color: '#378ADD', size: 10 }
  ],
  anomalyTypes: ['crowd_rush', 'fire', 'congestion'],
  aiDetectors: [
    { id: 'primary', name: 'AttentionGuard-v1', target: 'crowd_rush', latency: 0.3, peak: [0.88, 0.96], threshold: 0.75, enabled: true, sensitivity: 'high' },
    { id: 'secondary', name: 'RoomFlow-v2', target: 'congestion', latency: 0.8, peak: [0.65, 0.78], threshold: 0.75, enabled: true, sensitivity: 'medium' },
    { id: 'score', name: 'AnomalyScore-v1', target: 'general', latency: 0.5, peak: [0.8, 0.92], threshold: 0.75, enabled: true, sensitivity: 'medium' }
  ]
};
