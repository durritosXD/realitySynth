import type { DetectionLogEntry } from '../engine/types';

export function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function exportJson(events: DetectionLogEntry[], environment: string) {
  const alerts = events.filter((event) => event.isAlert).length;
  download('realitysynth-dataset.json', JSON.stringify({
    exportedAt: new Date().toISOString(),
    environment,
    totalEvents: events.length,
    alerts,
    events: events.map((event) => ({
      t: event.timestamp,
      env: event.environmentType,
      anomaly: event.anomalyType,
      detector: event.detectorId,
      confidence: event.confidence,
      alert: event.isAlert,
      agents: event.agentCount,
      epicenter: event.epicenter
    }))
  }, null, 2), 'application/json');
}

export function exportCsv(events: DetectionLogEntry[]) {
  const header = 'timestamp,environment,anomaly_type,detector,confidence,is_alert,agent_count,epicenter_x,epicenter_y';
  const rows = events.map((event) => [
    event.timestamp,
    event.environmentType,
    event.anomalyType ?? '',
    event.detectorId,
    event.confidence,
    event.isAlert,
    event.agentCount,
    event.epicenter?.x ?? '',
    event.epicenter?.y ?? ''
  ].map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','));
  download('realitysynth-dataset.csv', [header, ...rows].join('\n'), 'text/csv');
}
