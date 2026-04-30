import type { Agent } from '../../engine/types';

export function drawAgents(ctx: CanvasRenderingContext2D, agents: Agent[]) {
  for (const agent of agents) {
    ctx.fillStyle = agent.color;
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    if (agent.type === 'car') {
      ctx.save();
      ctx.translate(agent.x, agent.y);
      if (Math.abs(agent.vy) > Math.abs(agent.vx)) ctx.rotate(Math.PI / 2);
      ctx.fillRect(-agent.size, -agent.size / 2, agent.size * 2, agent.size);
      ctx.strokeRect(-agent.size, -agent.size / 2, agent.size * 2, agent.size);
      ctx.restore();
    } else if (agent.type === 'machine') {
      ctx.fillRect(agent.x - 24, agent.y - 20, 48, 40);
      ctx.strokeRect(agent.x - 24, agent.y - 20, 48, 40);
    } else {
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, agent.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
}
