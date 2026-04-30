import { useState } from 'react';
import { Copy, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { environmentList } from '../engine/environments';
import type { EnvironmentKey } from '../engine/types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

type SavedEnv = { id: string; name: string; type: EnvironmentKey; createdAt: string; agents: number; events: number };

export function Environments() {
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState<SavedEnv[]>([
    { id: 'env-1', name: 'Morning Junction Baseline', type: 'traffic', createdAt: new Date().toISOString(), agents: 28, events: 342 },
    { id: 'env-2', name: 'Factory Belt A', type: 'factory', createdAt: new Date().toISOString(), agents: 21, events: 184 }
  ]);
  const duplicate = (env: SavedEnv) => setItems([{ ...env, id: crypto.randomUUID(), name: `${env.name} Copy` }, ...items]);
  return (
    <Page title="Environments" action={<Button variant="primary" onClick={() => setModal(true)}><Plus size={16} /> New Environment</Button>}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((env) => <Card key={env.id}>
          <div className="h-32 rounded-md border border-white/10 bg-ink" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="mt-4 flex items-start justify-between"><div><div className="font-medium">{env.name}</div><div className="mt-1 text-xs text-muted">{new Date(env.createdAt).toLocaleDateString()}</div></div><span className="rounded border border-white/10 px-2 py-1 text-xs">{env.type}</span></div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted"><div>{env.agents} agents</div><div>{env.events} events</div></div>
          <div className="mt-4 grid grid-cols-3 gap-2"><Link to="/dashboard"><Button className="w-full">Open</Button></Link><Button onClick={() => duplicate(env)}><Copy size={15} /></Button><Button variant="danger" onClick={() => setItems(items.filter((item) => item.id !== env.id))}><Trash2 size={15} /></Button></div>
        </Card>)}
      </div>
      {modal && <div className="fixed inset-0 grid place-items-center bg-black/70 p-6"><Card className="w-full max-w-md"><h2 className="text-xl font-medium">New Environment</h2><input className="mt-4 w-full rounded-md border border-white/10 bg-ink px-3 py-2" placeholder="Environment name" /><select className="mt-3 w-full rounded-md border border-white/10 bg-ink px-3 py-2">{environmentList.map((env) => <option key={env.key}>{env.name}</option>)}</select><div className="mt-4 flex gap-2"><Button variant="primary" onClick={() => setModal(false)}>Create</Button><Button onClick={() => setModal(false)}>Cancel</Button></div></Card></div>}
    </Page>
  );
}

export function Page({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return <div className="min-h-screen bg-ink p-6 text-stone-100"><div className="mx-auto max-w-7xl"><div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-medium">{title}</h1>{action}</div>{children}</div></div>;
}
