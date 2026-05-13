import { Queue } from "bullmq";

import { getEnv } from "./lib/env.js";
import { createRedisConnection } from "./lib/redis.js";
import { createLogger } from "./lib/logger.js";

import type { QueueName } from "./types/queue.js";

const logger = createLogger("talentdash-jobs", {
  component: "queue",
});

const queues = new Map<QueueName, Queue>();

export function getQueue(name: QueueName): Queue {
  const existing = queues.get(name);

  if (existing) {
    return existing;
  }

  const env = getEnv();

  const queue = new Queue(name, {
    connection: createRedisConnection(),

    prefix: "talentdash",

    defaultJobOptions: {
      attempts: 5,

      backoff: {
        type: "exponential",
        delay: 2000,
      },

      removeOnComplete: 100,

      removeOnFail: 500,
    },
  });

  queues.set(name, queue);

  logger.info("Queue initialized", {
    queueName: name,
  });

  return queue;
}