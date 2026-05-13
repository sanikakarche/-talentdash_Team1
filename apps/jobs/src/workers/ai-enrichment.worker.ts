import { Worker } from "bullmq";

import { createLogger } from "../lib/logger.js";

import { createRedisConnection } from "../lib/redis.js";

import { runAIEnrichment } from "../jobs/ai-enrichment.js";

import { QUEUE_NAMES } from "../types/queue.js";

const logger = createLogger("talentdash-jobs", {
  component: "ai-enrichment-worker",
});

export function createAIEnrichmentWorker(): Worker {
  const worker = new Worker(
    QUEUE_NAMES.AI_ENRICHMENT,

    async (job) => {
      logger.info("AI enrichment job started", {
        jobId: job.id,
        data: job.data,
      });

      await runAIEnrichment();

      logger.info("AI enrichment job completed", {
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
    logger.info("AI enrichment worker ready");
  });

  worker.on("active", (job) => {
    logger.info("AI enrichment worker active", {
      jobId: job.id,
    });
  });

  worker.on("completed", (job) => {
    logger.info("AI enrichment worker completed", {
      jobId: job.id,
    });
  });

  worker.on("failed", (job, error) => {
    logger.error("AI enrichment worker failed", {
      jobId: job?.id,
      error,
    });

    console.error(error);
  });

  worker.on("error", (error) => {
    logger.error("AI enrichment worker error", {
      error,
    });

    console.error(error);
  });

  return worker;
}