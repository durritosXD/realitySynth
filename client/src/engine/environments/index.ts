import type { EnvironmentConfig, EnvironmentKey } from '../types';
import { classroomEnvironment } from './classroom';
import { disasterEnvironment } from './disaster';
import { factoryEnvironment } from './factory';
import { trafficEnvironment } from './traffic';

export const environments: Record<EnvironmentKey, EnvironmentConfig> = {
  traffic: trafficEnvironment,
  classroom: classroomEnvironment,
  factory: factoryEnvironment,
  disaster: disasterEnvironment,
  hospital: { ...classroomEnvironment, key: 'hospital', name: 'Hospital Ward', anomalyTypes: ['fire', 'congestion', 'equipment_fail'] },
  retail: { ...disasterEnvironment, key: 'retail', name: 'Retail Store', anomalyTypes: ['congestion', 'crowd_rush', 'fire'] }
};

export const environmentList = Object.values(environments);
