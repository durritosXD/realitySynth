import { useState } from 'react';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Page } from './Environments';

type Model = { name: string; target: string; sensitivity: string; latency: number; enabled: boolean };
const defaults: Model[] = [
  { name: 'AccidentDetect-v1', target: 'collision', sensitivity: 'high', latency: 0.3, enabled: true },
  { name: 'FlowMonitor-v2', target: 'congestion', sensitivity: 'medium', latency: 0.8, enabled: true },
  { name: 'AnomalyScore-v1', target: 'general', sensitivity: 'medium', latency: 0.5, enabled: true }
];

export function Models() {
  const [models, setModels] = useState(defaults);
  const [modal, setModal] = useState(false);
  return (
    <Page title="Models" action={<Button variant="primary" onClick={() => setModal(true)}><Plus size={16} /> Add Model</Button>}>
      <div className="grid gap-4 md:grid-cols-3">{models.map((model, index) => <Card key={model.name}>
        <div className="flex items-center justify-between"><div><div className="font-medium">{model.name}</div><div className="mt-1 text-sm text-muted">target: {model.target}</div></div><SlidersHorizontal className="text-model" /></div>
        <label className="mt-5 block text-sm text-muted">Sensitivity</label><select className="mt-2 w-full rounded-md border border-white/10 bg-ink px-3 py-2" value={model.sensitivity} onChange={(event) => setModels(models.map((m, i) => i === index ? { ...m, sensitivity: event.target.value } : m))}><option>low</option><option>medium</option><option>high</option></select>
        <label className="mt-4 block text-sm text-muted">Latency {model.latency.toFixed(1)}s</label><input className="w-full accent-primary" type="range" min={0.1} max={2} step={0.1} value={model.latency} onChange={(event) => setModels(models.map((m, i) => i === index ? { ...m, latency: Number(event.target.value) } : m))} />
        <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={model.enabled} onChange={(event) => setModels(models.map((m, i) => i === index ? { ...m, enabled: event.target.checked } : m))} className="accent-primary" /> Enabled</label>
        <Button className="mt-4 w-full">Edit</Button>
      </Card>)}</div>
      {modal && <div className="fixed inset-0 grid place-items-center bg-black/70 p-6"><Card className="w-full max-w-md"><h2 className="text-xl font-medium">Add Model</h2><input className="mt-4 w-full rounded-md border border-white/10 bg-ink px-3 py-2" placeholder="Model name" /><input className="mt-3 w-full rounded-md border border-white/10 bg-ink px-3 py-2" placeholder="Detection target" /><div className="mt-4 flex gap-2"><Button variant="primary" onClick={() => setModal(false)}>Create</Button><Button onClick={() => setModal(false)}>Cancel</Button></div></Card></div>}
    </Page>
  );
}
