import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { authRouter } from './routes/auth.js';
import { environmentsRouter } from './routes/environments.js';
import { eventsRouter } from './routes/events.js';
import { modelsRouter } from './routes/models.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'RealitySynth API' }));
app.use('/api/auth', authRouter);
app.use('/api/environments', environmentsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/models', modelsRouter);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: clientOrigin, credentials: true } });

io.on('connection', (socket) => {
  socket.on('join-simulation', (environmentId: string) => socket.join(`env:${environmentId}`));
  socket.on('simulation-state', (payload: { environmentId?: string; state: unknown }) => {
    if (payload.environmentId) socket.to(`env:${payload.environmentId}`).emit('simulation-state', payload.state);
  });
});

server.listen(port, () => {
  console.log(`RealitySynth API listening on http://localhost:${port}`);
});
