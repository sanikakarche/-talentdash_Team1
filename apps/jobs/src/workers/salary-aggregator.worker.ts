import { Worker } from "bullmq";

import { createLogger } from "../lib/logger.js";

import { createRedisConnection } from "../lib/redis.js";

import { runSalaryAggregation } from "../jobs/salary-aggregator.js";

import { QUEUE_NAMES } from "../types/queue.js";

const logger = createLogger("talentdash-jobs", {
  component: "salary-aggregator-worker",
});

export function createSalaryAggregatorWorker(): Worker {
  const worker = new Worker(
    QUEUE_NAMES.SALARY_AGGREGATION,

    async () => {
      logger.info("Salary aggregation job started");

      await runSalaryAggregation();

      logger.info("Salary aggregation job completed");
    },

    {
      connection: createRedisConnection(),

      prefix: "talentdash",

      concurrency: 2,
    },
  );

  worker.on("ready", () => {
    logger.info("Worker ready");
  });

  worker.on("failed", (_, error) => {
    logger.error("Worker failed", {
      error,
    });

    console.error(error);
  });

  return worker;
}