export function drawAnomaly(ctx: CanvasRenderingContext2D, epicenter: { x: number; y: number } | null, timer: number) {
  if (!epicenter) return;
  const pulse = (Math.sin(timer * Math.PI * 4) + 1) / 2;
  ctx.strokeStyle = `rgba(226,75,74,${0.35 + pulse * 0.35})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(epicenter.x, epicenter.y, 38 + pulse * 36, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(226,75,74,0.18)';
  ctx.beginPath();
  ctx.arc(epicenter.x, epicenter.y, 80, 0, Math.PI * 2);
  ctx.fill();
}
