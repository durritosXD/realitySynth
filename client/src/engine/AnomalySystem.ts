import type { Agent, AnomalyType } from './types';

export function applyAnomaly(agents: Agent[], type: AnomalyType, epicenter: { x: number; y: number }) {
  for (const agent of agents) {
    const dx = agent.x - epicenter.x;
    const dy = agent.y - epicenter.y;
    const distance = Math.hypot(dx, dy);
    const affected = distance < 80 || type === 'congestion' || type === 'crowd_rush';
    if (!affected) continue;
    agent.color = '#E24B4A';
    agent.state = 'affected';
    if (type === 'collision' && agent.type === 'car') {
      agent.vx = dx * 0.18;
      agent.vy = dy * 0.18;
      agent.state = 'stopped';
    }
    if (type === 'congestion') {
      agent.vx = agent.baseVx * 0.2 - dx * 0.08;
      agent.vy = agent.baseVy * 0.2 - dy * 0.08;
    }
    if (type === 'crowd_rush') {
      agent.vx = 96;
      agent.vy = (Math.random() - 0.5) * 20;
      agent.state = 'rushing';
    }
    if (type === 'equipment_fail' && (agent.type === 'machine' || distance < 110)) {
      agent.vx = 0;
      agent.vy = 0;
      agent.state = 'stopped';
    }
    if (type === 'fire') {
      const scale = 120 / Math.max(1, distance);
      agent.vx = dx * scale;
      agent.vy = dy * scale;
      agent.state = 'fleeing';
    }
  }
}

export function clearAnomaly(agents: Agent[]) {
  for (const agent of agents) {
    agent.color = agent.baseColor;
    agent.vx = agent.baseVx;
    agent.vy = agent.baseVy;
    agent.state = 'normal';
  }
}
