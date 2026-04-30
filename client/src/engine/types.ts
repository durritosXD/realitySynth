export type BackgroundType = 'intersection' | 'grid' | 'floor' | 'openspace';
export type EnvironmentKey = 'traffic' | 'classroom' | 'factory' | 'disaster' | 'hospital' | 'retail';
export type AnomalyType = 'collision' | 'congestion' | 'crowd_rush' | 'equipment_fail' | 'fire';
export type AgentState = 'normal' | 'stopped' | 'affected' | 'fleeing' | 'rushing';

export type Agent = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  type: string;
  color: string;
  baseColor: string;
  size: number;
  state: AgentState;
  desk?: { x: number; y: number };
  target?: { x: number; y: number };
  static?: boolean;
  lane?: 'east' | 'west' | 'north' | 'south';
};

export type DetectorConfig = {
  id: string;
  name: string;
  target: string;
  latency: number;
  peak: [number, number];
  threshold: number;
  enabled: boolean;
  sensitivity: 'low' | 'medium' | 'high';
};

export type EnvironmentConfig = {
  key: EnvironmentKey;
  name: string;
  backgroundType: BackgroundType;
  agentTypes: { type: string; count: number; color: string; size: number }[];
  anomalyTypes: AnomalyType[];
  aiDetectors: DetectorConfig[];
};

export type DetectorReading = {
  detectorId: string;
  name: string;
  confidence: number;
  isAlert: boolean;
  status: 'green' | 'amber' | 'red';
  threshold: number;
};

export type DetectionLogEntry = {
  timestamp: number;
  wallTime: string;
  environmentType: string;
  anomalyType: AnomalyType | null;
  detectorId: string;
  confidence: number;
  isAlert: boolean;
  agentCount: number;
  epicenter: { x: number; y: number } | null;
};

export type WorldSnapshot = {
  environment: EnvironmentConfig;
  agents: Agent[];
  time: number;
  fps: number;
  running: boolean;
  speed: number;
  anomalyActive: boolean;
  anomalyType: AnomalyType | null;
  epicenter: { x: number; y: number } | null;
  anomalyTimer: number;
  detectors: DetectorReading[];
  log: DetectionLogEntry[];
};
