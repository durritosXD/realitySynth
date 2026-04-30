import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useDatasetStore } from '../store/datasetStore';
import { exportCsv, exportJson } from '../utils/exporters';
import { Page } from './Environments';

export function Datasets() {
  const events = useDatasetStore((state) => state.events);
  const [alertOnly, setAlertOnly] = useState(false);
  const [anomaly, setAnomaly] = useState('');
  const filtered = events.filter((event) => (!alertOnly || event.isAlert) && (!anomaly || event.anomalyType === anomaly));
  const stats = useMemo(() => {
    const alerts = filtered.filter((event) => event.isAlert).length;
    const avg = filtered.reduce((sum, event) => sum + event.confidence, 0) / Math.max(1, filtered.length);
    const active = filtered.reduce<Record<string, number>>((acc, event) => ({ ...acc, [event.environmentType]: (acc[event.environmentType] ?? 0) + 1 }), {});
    return { alerts, avg, most: Object.entries(active).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'none' };
  }, [filtered]);
  return (
    <Page title="Datasets" action={<div className="flex gap-2"><Button onClick={() => exportCsv(filtered)}><Download size={16} /> CSV</Button><Button variant="primary" onClick={() => exportJson(filtered, 'filtered')}><Download size={16} /> JSON</Button></div>}>
      <div className="grid gap-4 md:grid-cols-4">{[[filtered.length, 'Total events logged'], [stats.alerts, 'Total alerts triggered'], [`${Math.round(stats.avg * 100)}%`, 'Average confidence'], [stats.most, 'Most active environment']].map(([value, label]) => <Card key={label}><div className="text-2xl font-medium">{value}</div><div className="mt-1 text-sm text-muted">{label}</div></Card>)}</div>
      <div className="my-4 flex flex-wrap gap-3"><select className="rounded-md border border-white/10 bg-surface px-3 py-2" value={anomaly} onChange={(event) => setAnomaly(event.target.value)}><option value="">All anomalies</option><option value="collision">collision</option><option value="congestion">congestion</option><option value="crowd_rush">crowd_rush</option><option value="fire">fire</option><option value="equipment_fail">equipment_fail</option></select><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={alertOnly} onChange={(event) => setAlertOnly(event.target.checked)} className="accent-primary" /> Alert only</label></div>
      <div className="overflow-hidden rounded-lg border border-white/10"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-surface text-muted"><tr>{['Timestamp', 'Environment', 'Anomaly Type', 'Detector', 'Confidence', 'Alert', 'Epicenter X', 'Epicenter Y'].map((h) => <th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody>{filtered.map((event, index) => <tr key={`${event.wallTime}-${index}`} className="border-t border-white/10"><td className="px-3 py-2">{event.timestamp}</td><td>{event.environmentType}</td><td>{event.anomalyType ?? 'normal'}</td><td>{event.detectorId}</td><td>{Math.round(event.confidence * 100)}%</td><td>{event.isAlert ? 'yes' : 'no'}</td><td>{event.epicenter?.x ?? ''}</td><td>{event.epicenter?.y ?? ''}</td></tr>)}</tbody></table></div>
    </Page>
  );
}
