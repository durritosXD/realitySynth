import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export type AuthRequest = Request & { user?: { id: string; email: string } };

export function signToken(user: { id: string; email: string }) {
  return jwt.sign(user, process.env.JWT_SECRET ?? 'dev-secret', { expiresIn: '7d' });
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing bearer token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret') as { id: string; email: string };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
