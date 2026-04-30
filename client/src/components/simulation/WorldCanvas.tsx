import { useEffect, useRef } from 'react';
import { drawAgents } from './AgentLayer';
import { drawAnomaly } from './AnomalyOverlay';
import { drawBackground } from './EnvironmentBackground';
import type { WorldSnapshot } from '../../engine/types';

export function WorldCanvas({ snapshot, compact = false }: { snapshot: WorldSnapshot; compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    drawBackground(ctx, snapshot.environment.backgroundType, rect.width, rect.height, snapshot.time);
    drawAgents(ctx, snapshot.agents);
    drawAnomaly(ctx, snapshot.epicenter, snapshot.anomalyTimer);
  }, [snapshot]);

  return <canvas ref={canvasRef} className={`block w-full bg-ink ${compact ? 'h-full min-h-[260px]' : 'h-[calc(100vh-108px)] min-h-[520px]'}`} />;
}
