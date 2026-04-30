-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Environment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetectorModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "sensitivity" TEXT NOT NULL,
    "latencyMs" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DetectorModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetectionEvent" (
    "id" TEXT NOT NULL,
    "simulationTime" DOUBLE PRECISION NOT NULL,
    "wallTime" TIMESTAMP(3) NOT NULL,
    "environmentId" TEXT NOT NULL,
    "anomalyType" TEXT,
    "detectorId" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "isAlert" BOOLEAN NOT NULL,
    "agentCount" INTEGER NOT NULL,
    "epicenterX" DOUBLE PRECISION,
    "epicenterY" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DetectionEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Environment" ADD CONSTRAINT "Environment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetectorModel" ADD CONSTRAINT "DetectorModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetectionEvent" ADD CONSTRAINT "DetectionEvent_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetectionEvent" ADD CONSTRAINT "DetectionEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
