import type { Agent, EnvironmentConfig } from './types';

const colors = ['#1D9E75', '#378ADD', '#888780', '#BA7517'];

export function createAgents(environment: EnvironmentConfig, width: number, height: number): Agent[] {
  const agents: Agent[] = [];
  let id = 0;
  for (const group of environment.agentTypes) {
    for (let i = 0; i < group.count; i += 1) {
      const agent = makeAgent(`${group.type}-${id++}`, group.type, group.color, group.size, i, width, height);
      agents.push(agent);
    }
  }
  return agents;
}

function makeAgent(id: string, type: string, color: string, size: number, index: number, width: number, height: number): Agent {
  if (type === 'car') {
    const lane = ['east', 'west', 'north', 'south'][index % 4] as Agent['lane'];
    const horizontal = lane === 'east' || lane === 'west';
    const speed = lane === 'east' || lane === 'south' ? 48 : -48;
    return {
      id,
      type,
      x: horizontal ? Math.random() * width : width / 2 + (lane === 'south' ? 12 : -12),
      y: horizontal ? height / 2 + (lane === 'east' ? -12 : 12) : Math.random() * height,
      vx: horizontal ? speed : 0,
      vy: horizontal ? 0 : speed,
      baseVx: horizontal ? speed : 0,
      baseVy: horizontal ? 0 : speed,
      color: colors[index % colors.length],
      baseColor: colors[index % colors.length],
      size,
      state: 'normal',
      lane
    };
  }
  if (type === 'student') {
    const col = index % 6;
    const row = Math.floor(index / 6);
    const desk = { x: width / 2 - 220 + col * 88, y: height / 2 - 100 + row * 62 };
    return { id, type, x: desk.x, y: desk.y, vx: 0, vy: 0, baseVx: 0, baseVy: 0, color, baseColor: color, size, state: 'normal', desk };
  }
  if (type === 'teacher') {
    return { id, type, x: width / 2, y: 72, vx: 34, vy: 0, baseVx: 34, baseVy: 0, color, baseColor: color, size, state: 'normal' };
  }
  if (type === 'machine') {
    const x = width / 2 - 220 + index * 110;
    return { id, type, x, y: height / 2, vx: 0, vy: 0, baseVx: 0, baseVy: 0, color, baseColor: color, size, state: 'normal', static: true };
  }
  const angle = Math.random() * Math.PI * 2;
  const speed = type === 'worker' ? 24 : 18;
  return {
    id,
    type,
    x: 60 + Math.random() * (width - 120),
    y: 70 + Math.random() * (height - 140),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    baseVx: Math.cos(angle) * speed,
    baseVy: Math.sin(angle) * speed,
    color,
    baseColor: color,
    size,
    state: 'normal'
  };
}

export function updateAgents(agents: Agent[], dt: number, width: number, height: number, envKey: string) {
  for (const agent of agents) {
    if (agent.static) continue;
    if (agent.type === 'student' && agent.desk && agent.state === 'normal') {
      agent.x = agent.desk.x + Math.sin(performance.now() / 900 + agent.size) * 1.5;
      agent.y = agent.desk.y + Math.cos(performance.now() / 1000 + agent.size) * 1.5;
      continue;
    }
    if (agent.type === 'teacher' && (agent.x < width / 2 - 150 || agent.x > width / 2 + 150)) {
      agent.vx *= -1;
      agent.baseVx *= -1;
    }
    if (agent.type === 'car' && Math.abs(agent.x - width / 2) < 42 && Math.abs(agent.y - height / 2) < 42 && agent.state === 'normal') {
      agent.x += agent.vx * dt * 0.45;
      agent.y += agent.vy * dt * 0.45;
    } else if (agent.type === 'worker' && envKey === 'factory') {
      const targetX = width / 2 - 220 + ((Number(agent.id.split('-').at(-1)) % 5) * 110);
      const dx = targetX - agent.x;
      agent.vx = Math.sign(dx) * 28;
      agent.y += (height / 2 + 88 - agent.y) * dt;
      agent.x += agent.vx * dt;
    } else {
      agent.x += agent.vx * dt;
      agent.y += agent.vy * dt;
    }
    if (agent.x < -20) agent.x = width + 20;
    if (agent.x > width + 20) agent.x = -20;
    if (agent.y < -20) agent.y = height + 20;
    if (agent.y > height + 20) agent.y = -20;
  }
}
