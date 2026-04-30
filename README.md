# RealitySynth

RealitySynth is a full-stack synthetic simulation platform for training and testing AI detection systems. It generates procedural environments, injects anomalies, simulates detector confidence, and exports labeled detection events as JSON or CSV.

## Stack

- React, TypeScript, Vite, Tailwind CSS
- Zustand state management
- HTML5 Canvas simulation viewport
- Node.js, Express, Socket.io
- PostgreSQL, Prisma ORM
- JWT authentication

## Local Setup

```bash
cd realitysynth
npm install
copy .env.example .env
docker compose up -d postgres
npm run prisma:migrate
npm run dev
```

Client: `http://localhost:5173`

API: `http://localhost:4000/api/health`

## Environment Variables

```env
DATABASE_URL="postgresql://realitysynth:realitysynth@localhost:5432/realitysynth?schema=public"
JWT_SECRET="change-me-in-production"
PORT=4000
CLIENT_ORIGIN="http://localhost:5173"
```

## Main Routes

- `/` landing page
- `/dashboard` live simulation dashboard
- `/environments` saved environment management
- `/datasets` detection log table and exports
- `/models` detector configuration
- `/settings` user settings
- `/auth/login` and `/auth/register`

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/environments`
- `POST /api/environments`
- `GET /api/environments/:id`
- `DELETE /api/environments/:id`
- `GET /api/events`
- `POST /api/events/bulk`
- `GET /api/events/export`
- `GET /api/models`
- `POST /api/models`
- `PUT /api/models/:id`
- `DELETE /api/models/:id`

## Simulation Notes

`client/src/engine/WorldEngine.ts` owns the real-time simulation loop. It creates agents from environment configs, updates movement rules, injects anomalies, computes detector confidence with per-model latency, logs synthetic detection events, supports scheduled anomalies, and exposes snapshots consumed by the dashboard canvas.

Dataset export produces the requested JSON shape and CSV columns from the dashboard and datasets page.
