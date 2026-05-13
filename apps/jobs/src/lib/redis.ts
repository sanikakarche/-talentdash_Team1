import IORedis from "ioredis";

import { getEnv } from "./env.js";
import { createLogger } from "./logger.js";

const logger = createLogger("talentdash-jobs", {
  component: "redis",
});

export function createRedisConnection(): IORedis {
  const env = getEnv();

  const redis = new IORedis(env.REDIS_URL, {
    maxRetriesPerRequest: null,

    enableReadyCheck: false,

    lazyConnect: false,

    family: 4,
  });

  redis.on("connect", () => {
    logger.info("Redis connected");
  });

  redis.on("ready", () => {
    logger.info("Redis ready");
  });

  redis.on("error", (error) => {
    logger.error("Redis connection error", {
      message: error.message,
      stack: error.stack,
    });

    console.error(error);
  });

  redis.on("close", () => {
    logger.warn("Redis connection closed");
  });

  redis.on("reconnecting", () => {
    logger.warn("Redis reconnecting");
  });

  return redis;
}