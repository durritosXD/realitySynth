# RealitySynth 🧪

RealitySynth is a sophisticated full-stack synthetic simulation platform designed for training, testing, and benchmarking AI detection systems. It allows users to generate complex procedural environments, inject controlled anomalies, and evaluate how various detector models respond in real-time.

![RealitySynth Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Key Features

- **Procedural Environments**: Simulate diverse scenarios including Traffic, Factory floors, Classrooms, and Disaster zones.
- **Real-time Physics Engine**: Custom-built HTML5 Canvas engine (`WorldEngine.ts`) managing agent behaviors, collisions, and movement.
- **Anomaly Injection**: Manually or programmatically inject anomalies (e.g., speed violations, zone intrusions, cluster formations) to test detector sensitivity.
- **Detector Benchmarking**: Run multiple AI detector configurations simultaneously and compare their confidence scores and latency.
- **Data Export**: Generate high-fidelity synthetic datasets in JSON or CSV formats for downstream ML training.
- **Full-Stack Persistence**: Save environments, detector models, and simulation logs to a PostgreSQL database.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **State Management**: Zustand
- **Visualization**: HTML5 Canvas API
- **Backend**: Node.js, Express, Socket.io (for future real-time sync)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based secure access
- **Infrastructure**: Docker Compose for easy deployment

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Docker (for database)

### Installation

1. **Clone and Install**:
   ```bash
   git clone https://github.com/durritosXD/realitySynth.git
   cd realitysynth
   npm run install:all
   ```

2. **Environment Setup**:
   ```bash
   copy .env.example .env
   ```

3. **Start Database**:
   ```bash
   docker compose up -d postgres
   ```

4. **Initialize Database Schema**:
   ```bash
   npm run prisma:migrate
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

- **Client**: `http://localhost:5173`
- **Server**: `http://localhost:4000`

## 🏗️ Architecture

RealitySynth follows a decoupled architecture:

- **`client/`**: Contains the React frontend and the core simulation engine.
  - `src/engine/`: The heartbeat of the app.
    - `WorldEngine.ts`: Manages the main simulation loop.
    - `AgentSystem.ts`: Handles agent lifecycle and physics.
    - `DetectorSimulator.ts`: Logic for simulating AI model outputs.
- **`server/`**: Express API providing persistence and auth.
  - `src/routes/`: API endpoints for environments, models, and events.
  - `src/prisma/`: Database schema and migrations.

## 📊 Dataset Structure

Exported logs contain detailed telemetry:
```json
{
  "timestamp": 45.2,
  "environmentType": "traffic",
  "anomalyType": "overspeed",
  "detectorId": "YOLO-v8-Custom",
  "confidence": 0.942,
  "isAlert": true,
  "agentCount": 42
}
```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Created with ❤️ by the RealitySynth Team.
