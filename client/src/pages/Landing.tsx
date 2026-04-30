import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const agents = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0008, vy: (Math.random() - 0.5) * 0.0008, c: ['#1D9E75', '#378ADD', '#534AB7', '#BA7517'][Math.floor(Math.random() * 4)] }));
    let raf = 0;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctx.fillStyle = '#0f0f0e'; ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      for (let x = 0; x < rect.width; x += 44) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, rect.height); ctx.stroke(); }
      for (let y = 0; y < rect.height; y += 44) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(rect.width, y); ctx.stroke(); }
      for (const a of agents) {
        a.x = (a.x + a.vx + 1) % 1; a.y = (a.y + a.vy + 1) % 1;
        ctx.fillStyle = a.c; ctx.beginPath(); ctx.arc(a.x * rect.width, a.y * rect.height, 4, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

export function Landing() {
  const [demo, setDemo] = useState(false);
  return (
    <div className="bg-ink text-stone-100">
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <HeroCanvas />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
          <h1 className="max-w-3xl text-5xl font-medium leading-tight md:text-7xl">Train AI on worlds that don't exist yet</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">RealitySynth generates realistic synthetic environments to test detection models - no real-world data required.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth/register"><Button variant="primary">Start Simulating <ArrowRight size={16} /></Button></Link>
            <Button onClick={() => setDemo(true)}><PlayCircle size={16} /> Watch Demo</Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {['Used to generate 2.4M synthetic training events', '12 environment templates', 'Real-time AI model evaluation'].map((item) => <div key={item} className="rounded-lg border border-white/10 bg-surface p-4 text-center text-sm">{item}</div>)}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-medium">How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{['Generate World - choose an environment template', 'Inject Anomaly - drop in events like accidents or equipment failures', 'Test Your AI - watch models respond and log labeled data'].map((text) => <Card key={text}>{text}</Card>)}</div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-medium">Use Cases</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">{['Smart Cities', 'Retail/Education', 'Manufacturing', 'Disaster Response'].map((title) => <Card key={title}><div className="font-medium">{title}</div><p className="mt-3 text-sm text-muted">Synthetic scenarios for detection, monitoring, and response evaluation.</p></Card>)}</div>
      </section>
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-muted">RealitySynth - Synthetic worlds for AI safety, testing, and training.</footer>
      {demo && <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"><div className="w-full max-w-xl rounded-lg border border-white/10 bg-surface p-5"><button className="float-right" onClick={() => setDemo(false)}><X /></button><h3 className="text-xl font-medium">Simulation loop</h3><div className="mt-5 h-56 rounded-lg bg-ink p-6"><div className="h-full animate-pulse rounded border border-primary/40 bg-primary/10" /></div><p className="mt-4 text-sm text-muted">A world is generated, an event is injected, detectors score the frame stream, and every result becomes exportable training data.</p></div></div>}
    </div>
  );
}
