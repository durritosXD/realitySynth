import { createAgents, updateAgents } from './AgentSystem';
import { applyAnomaly, clearAnomaly } from './AnomalySystem';
import { simulateDetectors } from './DetectorSimulator';
import { environments } from './environments';
import type { AnomalyType, DetectionLogEntry, DetectorConfig, EnvironmentKey, WorldSnapshot } from './types';

export class WorldEngine {
  width: number;
  height: number;
  snapshot: WorldSnapshot;
  scheduled: { time: number; type: AnomalyType; fired: boolean } | null = null;
  private logAccumulator = 0;
  private lastFrame = performance.now();
  private frameSmoothing = 60;

  constructor(environmentKey: EnvironmentKey = 'traffic', width = 900, height = 580) {
    this.width = width;
    this.height = height;
    const environment = environments[environmentKey];
    this.snapshot = {
      environment,
      agents: createAgents(environment, width, height),
      time: 0,
      fps: 60,
      running: false,
      speed: 1,
      anomalyActive: false,
      anomalyType: null,
      epicenter: null,
      anomalyTimer: 0,
      detectors: simulateDetectors(environment.aiDetectors, null, 0),
      log: []
    };
  }

  setSize(width: number, height: number) {
    if (width < 100 || height < 100) return;
    this.width = width;
    this.height = height;
  }

  setEnvironment(environmentKey: EnvironmentKey) {
    const environment = environments[environmentKey];
    this.snapshot = { ...this.snapshot, environment, agents: createAgents(environment, this.width, this.height), time: 0, anomalyActive: false, anomalyType: null, epicenter: null, log: [] };
  }

  setDetectorThreshold(detectorId: string, threshold: number) {
    this.snapshot.environment.aiDetectors = this.snapshot.environment.aiDetectors.map((detector) => detector.id === detectorId ? { ...detector, threshold } : detector);
  }

  setDetectorConfig(configs: DetectorConfig[]) {
    this.snapshot.environment.aiDetectors = configs;
  }

  play() {
    this.snapshot.running = true;
    this.lastFrame = performance.now();
  }

  pause() {
    this.snapshot.running = false;
  }

  reset() {
    this.setEnvironment(this.snapshot.environment.key);
  }

  setSpeed(speed: number) {
    this.snapshot.speed = speed;
  }

  scheduleAnomaly(type: AnomalyType, time: number) {
    this.scheduled = { type, time, fired: false };
  }

  injectAnomaly(type: AnomalyType) {
    const epicenter = {
      x: this.width / 2 + (Math.random() - 0.5) * 120,
      y: this.height / 2 + (Math.random() - 0.5) * 100
    };
    this.snapshot.anomalyActive = true;
    this.snapshot.anomalyType = type;
    this.snapshot.anomalyTimer = 0;
    this.snapshot.epicenter = epicenter;
    applyAnomaly(this.snapshot.agents, type, epicenter);
  }

  tick(now = performance.now()) {
    const rawDt = Math.min(0.05, (now - this.lastFrame) / 1000);
    this.lastFrame = now;
    this.frameSmoothing = this.frameSmoothing * 0.9 + (1 / Math.max(rawDt, 0.001)) * 0.1;
    this.snapshot.fps = Math.round(this.frameSmoothing);
    if (!this.snapshot.running) return this.snapshot;

    const dt = rawDt * this.snapshot.speed;
    this.snapshot.time += dt;
    if (this.scheduled && !this.scheduled.fired && this.snapshot.time >= this.scheduled.time) {
      this.injectAnomaly(this.scheduled.type);
      this.scheduled.fired = true;
    }
    if (this.snapshot.anomalyActive) {
      this.snapshot.anomalyTimer += dt;
      if (this.snapshot.anomalyTimer > 8) {
        clearAnomaly(this.snapshot.agents);
        this.snapshot.anomalyActive = false;
        this.snapshot.anomalyType = null;
        this.snapshot.epicenter = null;
      }
    }

    updateAgents(this.snapshot.agents, dt, this.width, this.height, this.snapshot.environment.key);
    this.snapshot.detectors = simulateDetectors(this.snapshot.environment.aiDetectors, this.snapshot.anomalyType, this.snapshot.anomalyTimer);
    this.logAccumulator += dt;
    if (this.logAccumulator > 0.5) {
      this.logAccumulator = 0;
      this.appendLogs();
    }
    return this.snapshot;
  }

  private appendLogs() {
    for (const detector of this.snapshot.detectors) {
      const entry: DetectionLogEntry = {
        timestamp: Number(this.snapshot.time.toFixed(2)),
        wallTime: new Date().toISOString(),
        environmentType: this.snapshot.environment.key,
        anomalyType: this.snapshot.anomalyType,
        detectorId: detector.name,
        confidence: Number(detector.confidence.toFixed(3)),
        isAlert: detector.isAlert,
        agentCount: this.snapshot.agents.length,
        epicenter: this.snapshot.epicenter ? { x: Number(this.snapshot.epicenter.x.toFixed(1)), y: Number(this.snapshot.epicenter.y.toFixed(1)) } : null
      };
      this.snapshot.log.unshift(entry);
    }
    this.snapshot.log = this.snapshot.log.slice(0, 400);
  }
}
