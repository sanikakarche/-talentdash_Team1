import IORedis from "ioredis";
import type { RedisOptions } from "ioredis";

import { createLogger } from "./logger.js";

const logger = createLogger("talentdash-jobs", { component: "redis-connection" });

function parseRedisUrl(url: string): RedisOptions {
  const parsed = new URL(url);
  const options: RedisOptions = {
    host: parsed.hostname,
    port: parseInt(parsed.port || "6379", 10),
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    db: parsed.pathname ? parseInt(parsed.pathname.slice(1), 10) || 0 : 0,
  };

  if (parsed.protocol === "rediss:") {
    options.tls = { rejectUnauthorized: true };
  }

  return options;
}

function getBaseOptions(redisUrl: string, connectionName: string): RedisOptions {
  const parsed = parseRedisUrl(redisUrl);
  return {
    ...parsed,
    connectionName,
    enableOfflineQueue: false,
    retryStrategy(times: number): number | null {
      if (times > 20) {
        logger.fatal("Redis connection failed after 20 retries");
        return null;
      }
      const delay = Math.min(times * 500, 20_000);
      logger.warn(`Redis reconnecting in ${delay}ms`, { attempt: times });
      return delay;
    },
    connectTimeout: 10_000,
    keepAlive: 30_000,
    lazyConnect: false,
    maxRetriesPerRequest: null,
  };
}

interface ConnectionPool {
  queue: IORedis | null;
  worker: IORedis | null;
  subscriber: IORedis | null;
}

const pool: ConnectionPool = { queue: null, worker: null, subscriber: null };

export function getQueueConnection(redisUrl: string): IORedis {
  if (pool.queue) return pool.queue;
  const conn = new IORedis(getBaseOptions(redisUrl, "talentdash-jobs:queue"));
  conn.on("connect", () => logger.info("Queue Redis connected"));
  conn.on("error", (err) => logger.error("Queue Redis error", err));
  pool.queue = conn;
  return conn;
}

export function getWorkerConnection(redisUrl: string): IORedis {
  if (pool.worker) return pool.worker;
  const conn = new IORedis(getBaseOptions(redisUrl, "talentdash-jobs:worker"));
  conn.on("connect", () => logger.info("Worker Redis connected"));
  conn.on("error", (err) => logger.error("Worker Redis error", err));
  pool.worker = conn;
  return conn;
}

export function getSubscriberConnection(redisUrl: string): IORedis {
  if (pool.subscriber) return pool.subscriber;
  const conn = new IORedis(getBaseOptions(redisUrl, "talentdash-jobs:subscriber"));
  conn.on("connect", () => logger.info("Subscriber Redis connected"));
  conn.on("error", (err) => logger.error("Subscriber Redis error", err));
  pool.subscriber = conn;
  return conn;
}

export async function checkRedisHealth(redisUrl: string): Promise<boolean> {
  try {
    const conn = getQueueConnection(redisUrl);
    return (await conn.ping()) === "PONG";
  } catch {
    return false;
  }
}

export async function closeAllConnections(): Promise<void> {
  const conns = [pool.queue, pool.worker, pool.subscriber].filter(Boolean) as IORedis[];
  logger.info(`Closing ${conns.length} Redis connections`);
  await Promise.allSettled(conns.map((c) => c.quit()));
  pool.queue = null;
  pool.worker = null;
  pool.subscriber = null;
  logger.info("All Redis connections closed");
}
