import type { BackgroundType } from '../../engine/types';

export function drawBackground(ctx: CanvasRenderingContext2D, type: BackgroundType, width: number, height: number, time: number) {
  ctx.fillStyle = '#0f0f0e';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
  if (type === 'intersection') drawIntersection(ctx, width, height);
  if (type === 'grid') drawClassroom(ctx, width, height);
  if (type === 'floor') drawFactory(ctx, width, height, time);
  if (type === 'openspace') drawOpenSpace(ctx, width, height);
}

function drawIntersection(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = '#2c2c2a';
  ctx.fillRect(0, height / 2 - 44, width, 88);
  ctx.fillRect(width / 2 - 44, 0, 88, height);
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.setLineDash([14, 16]);
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height); ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  for (const [x, y, w, h] of [[width / 2 - 90, height / 2 - 72, 36, 8], [width / 2 + 54, height / 2 + 64, 36, 8], [width / 2 - 72, height / 2 + 54, 8, 36], [width / 2 + 64, height / 2 - 90, 8, 36]]) {
    for (let i = 0; i < 5; i += 1) ctx.strokeRect(x + (w > h ? i * 8 : 0), y + (h > w ? i * 8 : 0), w > h ? 4 : w, h > w ? 4 : h);
  }
}

function drawClassroom(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = '#1a1a18';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#dddbd2';
  ctx.fillRect(width / 2 - 210, 24, 420, 20);
  ctx.fillStyle = '#2c2c2a';
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 6; col += 1) ctx.fillRect(width / 2 - 242 + col * 88, height / 2 - 116 + row * 62, 44, 30);
  }
}

function drawFactory(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  ctx.fillStyle = '#151513';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#34342f';
  ctx.fillRect(width / 2 - 260, height / 2 - 8, 520, 16);
  ctx.fillStyle = '#BA7517';
  for (let i = 0; i < 12; i += 1) ctx.fillRect(width / 2 - 250 + ((i * 48 + time * 40) % 520), height / 2 - 5, 8, 10);
}

function drawOpenSpace(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = '#171717';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(186,117,23,0.18)';
  ctx.fillRect(width * 0.12, height * 0.18, 120, 90);
  ctx.fillStyle = 'rgba(55,138,221,0.15)';
  ctx.fillRect(width * 0.72, height * 0.62, 130, 80);
}
