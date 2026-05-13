import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { checkRedisHealth } from "./connection.js";
import { createLogger } from "./logger.js";

const logger = createLogger("talentdash-jobs", { component: "health" });

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  uptime: number;
  redis: boolean;
  workers: { name: string; running: boolean }[];
  timestamp: string;
}

type WorkerStateProvider = () => { name: string; running: boolean }[];

let workerStateProvider: WorkerStateProvider = () => [];
let redisUrl: string = "";

export function setHealthDependencies(
  redisUrlValue: string,
  provider: WorkerStateProvider,
): void {
  redisUrl = redisUrlValue;
  workerStateProvider = provider;
}

async function getHealthStatus(): Promise<HealthStatus> {
  const redisHealthy = redisUrl ? await checkRedisHealth(redisUrl) : false;
  const workers = workerStateProvider();
  const allWorkersRunning = workers.length > 0 && workers.every((w) => w.running);

  let status: HealthStatus["status"] = "healthy";
  if (!redisHealthy) status = "unhealthy";
  else if (!allWorkersRunning) status = "degraded";

  return {
    status,
    uptime: process.uptime(),
    redis: redisHealthy,
    workers,
    timestamp: new Date().toISOString(),
  };
}

function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  if (req.method === "GET" && req.url === "/health") {
    getHealthStatus()
      .then((health) => {
        const statusCode = health.status === "unhealthy" ? 503 : 200;
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(health));
      })
      .catch((err) => {
        logger.error("Health check failed", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "unhealthy", error: "Internal error" }));
      });
    return;
  }

  if (req.method === "GET" && req.url === "/ready") {
    getHealthStatus()
      .then((health) => {
        const code = health.status === "healthy" ? 200 : 503;
        res.writeHead(code, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ready: health.status === "healthy" }));
      })
      .catch(() => {
        res.writeHead(503, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ready: false }));
      });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
}

export function startHealthServer(port: number): ReturnType<typeof createServer> {
  const server = createServer(handleRequest);

  server.listen(port, () => {
    logger.info(`Health server listening on port ${port}`);
  });

  server.on("error", (err) => {
    logger.error("Health server error", err);
  });

  return server;
}
