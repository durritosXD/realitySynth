import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prismaClient.js';
import { signToken } from '../middleware/auth.js';

export const authRouter = Router();

const defaultModels = [
  { name: 'AccidentDetect-v1', target: 'collision', sensitivity: 'high', latencyMs: 300 },
  { name: 'FlowMonitor-v2', target: 'congestion', sensitivity: 'medium', latencyMs: 800 },
  { name: 'AnomalyScore-v1', target: 'general', sensitivity: 'medium', latencyMs: 500 }
];

authRouter.post('/register', async (req, res) => {
  const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
  if (!email || !password || !name) return res.status(400).json({ error: 'email, password and name are required' });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hash,
      detectorModels: { create: defaultModels }
    },
    select: { id: true, email: true, name: true }
  });

  res.status(201).json({ token: signToken({ id: user.id, email: user.email }), user });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ token: signToken({ id: user.id, email: user.email }), user: { id: user.id, email: user.email, name: user.name } });
});
