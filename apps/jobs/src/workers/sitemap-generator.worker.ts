import { Worker } from "bullmq";

import { createLogger } from "../lib/logger.js";

import { createRedisConnection } from "../lib/redis.js";

import { runSitemapGeneration } from "../jobs/sitemap-generator.js";

import { QUEUE_NAMES } from "../types/queue.js";

const logger = createLogger("talentdash-jobs", {
  component: "sitemap-generator-worker",
});

export function createSitemapGeneratorWorker(): Worker {
  const worker = new Worker(
    QUEUE_NAMES.SITEMAP_GENERATION,

    async (job) => {
      logger.info("Sitemap generation started", {
        jobId: job.id,
      });

      await runSitemapGeneration();

      logger.info("Sitemap generation completed", {
        jobId: job.id,
      });
    },

    {
      connection: createRedisConnection(),

      prefix: "talentdash",
    },
  );

  worker.on("ready", () => {
    logger.info("Sitemap generator worker ready");
  });

  worker.on("active", (job) => {
    logger.info("Sitemap generator worker active", {
      jobId: job.id,
    });
  });

  worker.on("completed", (job) => {
    logger.info("Sitemap generator worker completed", {
      jobId: job.id,
    });
  });

  worker.on("failed", (_, error) => {
    logger.error("Sitemap generator worker failed", {
      error,
    });

    console.error(error);
  });

  return worker;
}