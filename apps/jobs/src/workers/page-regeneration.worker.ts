import { Worker } from "bullmq";

import { createLogger } from "../lib/logger.js";

import { createRedisConnection } from "../lib/redis.js";

import { QUEUE_NAMES } from "../types/queue.js";

const logger = createLogger("talentdash-jobs", {
  component: "page-regeneration-worker",
});

export function createPageRegenerationWorker(): Worker {
  const worker = new Worker(
    QUEUE_NAMES.PAGE_GENERATION,

    async (job) => {
      logger.info("Page regeneration job started", {
        jobId: job.id,
      });

      logger.info("Page regeneration completed", {
        jobId: job.id,
      });
    },

    {
      connection: createRedisConnection(),

      prefix: "talentdash",

      concurrency: 2,
    },
  );

  worker.on("ready", () => {
    logger.info("Page regeneration worker ready");
  });

  worker.on("failed", (_, error) => {
    logger.error("Page regeneration worker failed", {
      error,
    });

    console.error(error);
  });

  return worker;
}