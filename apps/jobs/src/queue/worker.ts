import { Worker } from "bullmq";

import { createLogger } from "../lib/logger.js";
import { getRedisConnection } from "./connection.js";

const logger = createLogger("talentdash-jobs", {
  component: "queue-worker",
});

export function createQueueWorker<T>(
  queueName: string,
  processor: (payload: T) => Promise<void>,
) {
  return new Worker(
    queueName,

    async (job) => {
      logger.info("Processing job", {
        queue: queueName,
        jobId: job.id,
      });

      await processor(job.data);

      logger.info("Job completed", {
        queue: queueName,
        jobId: job.id,
      });
    },

    {
      connection: getRedisConnection(),

      concurrency: 5,
    },
  );
}