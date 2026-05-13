import IORedis from "ioredis";

import { getEnv } from "../lib/env.js";

const globalForRedis =
  globalThis as typeof globalThis & {
    redis?: IORedis;
  };

export function getRedisConnection(): IORedis {
  if (globalForRedis.redis) {
    return globalForRedis.redis;
  }

  const env = getEnv();

  const redis = new IORedis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,

    retryStrategy(times) {
      return Math.min(times * 250, 3000);
    },
  });

  globalForRedis.redis = redis;

  return redis;
}