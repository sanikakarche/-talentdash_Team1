import { Worker } from "bullmq";

import { createLogger } from "../lib/logger.js";

import { createRedisConnection } from "../lib/redis.js";

import { runWorkplaceRanking } from "../jobs/workplace-ranking.js";

import { QUEUE_NAMES } from "../types/queue.js";

const logger = createLogger("talentdash-jobs", {
  component: "workplace-ranking-worker",
});

export function createWorkplaceRankingWorker(): Worker {
  const worker = new Worker(
    QUEUE_NAMES.WORKPLACE_RANKING,

    async (job) => {
      logger.info("Workplace ranking started", {
        jobId: job.id,
      });

      await runWorkplaceRanking();

      logger.info("Workplace ranking completed", {
        jobId: job.id,
      });
    },

    {
      connection: createRedisConnection(),

      prefix: "talentdash",
    },
  );

  worker.on("ready", () => {
    logger.info("Workplace ranking worker ready");
  });

  worker.on("active", (job) => {
    logger.info("Workplace ranking worker active", {
      jobId: job.id,
    });
  });

  worker.on("completed", (job) => {
    logger.info("Workplace ranking worker completed", {
      jobId: job.id,
    });
  });

  worker.on("failed", (_, error) => {
    logger.error("Workplace ranking worker failed", {
      error,
    });

    console.error(error);
  });

  return worker;
}