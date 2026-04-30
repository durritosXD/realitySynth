import { Router } from 'express';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';

export const eventsRouter = Router();
eventsRouter.use(requireAuth);

function whereFromQuery(req: AuthRequest) {
  const { envId, anomalyType, isAlert, startDate, endDate } = req.query;
  return {
    userId: req.user!.id,
    environmentId: typeof envId === 'string' ? envId : undefined,
    anomalyType: typeof anomalyType === 'string' && anomalyType ? anomalyType : undefined,
    isAlert: typeof isAlert === 'string' ? isAlert === 'true' : undefined,
    wallTime: startDate || endDate ? {
      gte: typeof startDate === 'string' ? new Date(startDate) : undefined,
      lte: typeof endDate === 'string' ? new Date(endDate) : undefined
    } : undefined
  };
}

eventsRouter.get('/', async (req: AuthRequest, res) => {
  const limit = Math.min(Number(req.query.limit ?? 200), 1000);
  const offset = Number(req.query.offset ?? 0);
  const events = await prisma.detectionEvent.findMany({
    where: whereFromQuery(req),
    include: { environment: { select: { name: true, type: true } } },
    orderBy: { wallTime: 'desc' },
    take: limit,
    skip: offset
  });
  res.json(events);
});

eventsRouter.post('/bulk', async (req: AuthRequest, res) => {
  const entries = Array.isArray(req.body) ? req.body : req.body.events;
  if (!Array.isArray(entries)) return res.status(400).json({ error: 'Expected an array of events' });

  const environmentIds = [...new Set(entries.map((entry) => entry.environmentId).filter(Boolean))];
  const owned = await prisma.environment.findMany({ where: { id: { in: environmentIds }, userId: req.user!.id }, select: { id: true } });
  const ownedIds = new Set(owned.map((env) => env.id));

  const data = entries.filter((entry) => ownedIds.has(entry.environmentId)).map((entry) => ({
    simulationTime: Number(entry.simulationTime ?? entry.timestamp ?? 0),
    wallTime: new Date(entry.wallTime ?? Date.now()),
    environmentId: entry.environmentId,
    anomalyType: entry.anomalyType ?? null,
    detectorId: String(entry.detectorId),
    confidence: Number(entry.confidence),
    isAlert: Boolean(entry.isAlert),
    agentCount: Number(entry.agentCount),
    epicenterX: entry.epicenter?.x ?? entry.epicenterX ?? null,
    epicenterY: entry.epicenter?.y ?? entry.epicenterY ?? null,
    userId: req.user!.id
  }));

  const result = await prisma.detectionEvent.createMany({ data });
  res.status(201).json(result);
});

eventsRouter.get('/export', async (req: AuthRequest, res) => {
  const events = await prisma.detectionEvent.findMany({
    where: whereFromQuery(req),
    include: { environment: { select: { type: true } } },
    orderBy: { wallTime: 'desc' }
  });
  const header = 'timestamp,environment,anomaly_type,detector,confidence,is_alert,agent_count,epicenter_x,epicenter_y';
  const escape = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const rows = events.map((event) => [
    event.simulationTime,
    event.environment.type,
    event.anomalyType,
    event.detectorId,
    event.confidence,
    event.isAlert,
    event.agentCount,
    event.epicenterX,
    event.epicenterY
  ].map(escape).join(','));
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="realitysynth-events.csv"');
  res.send([header, ...rows].join('\n'));
});
