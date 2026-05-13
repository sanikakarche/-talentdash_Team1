import { Worker } from "bullmq";

import { createLogger } from "../lib/logger.js";

import { createRedisConnection } from "../lib/redis.js";

import { runJobScraper } from "../jobs/job-scraper.js";

import { QUEUE_NAMES } from "../types/queue.js";

const logger = createLogger("talentdash-jobs", {
  component: "job-scraper-worker",
});

export function createJobScraperWorker(): Worker {
  const worker = new Worker(
    QUEUE_NAMES.JOB_SCRAPING,

    async (job) => {
      logger.info("Job scraper started", {
        jobId: job.id,
      });

      await runJobScraper();

      logger.info("Job scraper completed", {
        jobId: job.id,
      });
    },

    {
      connection: createRedisConnection(),

      prefix: "talentdash",
    },
  );

  worker.on("ready", () => {
    logger.info("Job scraper worker ready");
  });

  worker.on("active", (job) => {
    logger.info("Job scraper worker active", {
      jobId: job.id,
    });
  });

  worker.on("completed", (job) => {
    logger.info("Job scraper worker completed", {
      jobId: job.id,
    });
  });

  worker.on("failed", (_, error) => {
    logger.error("Job scraper worker failed", {
      error,
    });

    console.error(error);
  });

  return worker;
}