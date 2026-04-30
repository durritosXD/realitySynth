import { Router } from 'express';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';

export const environmentsRouter = Router();
environmentsRouter.use(requireAuth);

environmentsRouter.get('/', async (req: AuthRequest, res) => {
  const environments = await prisma.environment.findMany({
    where: { userId: req.user!.id },
    include: { _count: { select: { events: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(environments);
});

environmentsRouter.post('/', async (req: AuthRequest, res) => {
  const { name, type, config } = req.body as { name?: string; type?: string; config?: unknown };
  if (!name || !type) return res.status(400).json({ error: 'name and type are required' });
  const environment = await prisma.environment.create({
    data: { name, type, config: (config as object) ?? {}, userId: req.user!.id }
  });
  res.status(201).json(environment);
});

environmentsRouter.get('/:id', async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  const environment = await prisma.environment.findFirst({
    where: { id, userId: req.user!.id },
    include: { events: { orderBy: { wallTime: 'desc' }, take: 200 } }
  });
  if (!environment) return res.status(404).json({ error: 'Environment not found' });
  res.json(environment);
});

environmentsRouter.delete('/:id', async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  await prisma.environment.deleteMany({ where: { id, userId: req.user!.id } });
  res.status(204).send();
});
