import { Queue } from "bullmq";

import { getEnv } from "../lib/env.js";
import { getQueueConnection } from "../lib/connection.js";
import { createLogger } from "../lib/logger.js";

import { RECURRING_JOBS } from "./jobs.js";

const logger = createLogger("talentdash-jobs", {
  component: "scheduler",
});

export async function initializeScheduler(): Promise<void> {
  const env = getEnv();

  const connection = getQueueConnection(env.REDIS_URL);

  for (const job of RECURRING_JOBS) {
    const queue = new Queue(job.queueName, {
      connection,
    });

    await queue.add(job.jobName, job.payload, {
      repeat: {
        pattern: job.cron,
      },

      removeOnComplete: 10,

      removeOnFail: 20,
    });

    logger.info("Recurring job registered", {
      queue: job.queueName,
      job: job.jobName,
      cron: job.cron,
    });
  }

  logger.info("Scheduler initialized");
}