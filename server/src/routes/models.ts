import { Router } from 'express';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';

export const modelsRouter = Router();
modelsRouter.use(requireAuth);

modelsRouter.get('/', async (req: AuthRequest, res) => {
  res.json(await prisma.detectorModel.findMany({ where: { userId: req.user!.id }, orderBy: { name: 'asc' } }));
});

modelsRouter.post('/', async (req: AuthRequest, res) => {
  const { name, target, sensitivity, latencyMs, enabled } = req.body;
  if (!name || !target || !sensitivity || latencyMs === undefined) return res.status(400).json({ error: 'Missing model fields' });
  const model = await prisma.detectorModel.create({
    data: { name, target, sensitivity, latencyMs: Number(latencyMs), enabled: enabled ?? true, userId: req.user!.id }
  });
  res.status(201).json(model);
});

modelsRouter.put('/:id', async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  const exists = await prisma.detectorModel.findFirst({ where: { id, userId: req.user!.id } });
  if (!exists) return res.status(404).json({ error: 'Model not found' });
  const { name, target, sensitivity, latencyMs, enabled } = req.body;
  const model = await prisma.detectorModel.update({
    where: { id },
    data: { name, target, sensitivity, latencyMs: latencyMs === undefined ? undefined : Number(latencyMs), enabled }
  });
  res.json(model);
});

modelsRouter.delete('/:id', async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  await prisma.detectorModel.deleteMany({ where: { id, userId: req.user!.id } });
  res.status(204).send();
});
