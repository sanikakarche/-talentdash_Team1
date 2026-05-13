import { Worker } from "bullmq";

import { createLogger } from "../lib/logger.js";

import { createRedisConnection } from "../lib/redis.js";

import { runDeduplication } from "../jobs/deduplication.js";

import { QUEUE_NAMES } from "../types/queue.js";

const logger = createLogger("talentdash-jobs", {
  component: "deduplication-worker",
});

export function createDeduplicationWorker(): Worker {
  const worker = new Worker(
    QUEUE_NAMES.DEDUPLICATION,

    async (job) => {
      logger.info("Deduplication started", {
        jobId: job.id,
      });

      await runDeduplication();

      logger.info("Deduplication completed", {
        jobId: job.id,
      });
    },

    {
      connection: createRedisConnection(),

      prefix: "talentdash",
    },
  );

  worker.on("ready", () => {
    logger.info("Deduplication worker ready");
  });

  worker.on("completed", (job) => {
    logger.info("Deduplication worker completed", {
      jobId: job.id,
    });
  });

  worker.on("failed", (_, error) => {
    logger.error("Deduplication worker failed", {
      error,
    });

    console.error(error);
  });

  return worker;
}