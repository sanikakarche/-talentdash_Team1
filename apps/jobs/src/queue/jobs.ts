import { Queue } from "bullmq";

import { getEnv } from "../lib/env.js";
import { getQueueConnection } from "../lib/connection.js";

const env = getEnv();

const salaryQueue = new Queue("salary-aggregation", {
  connection: getQueueConnection(env.REDIS_URL),
});

export async function enqueueSalaryAggregationJob(): Promise<void> {
  await salaryQueue.add(
    "salary-aggregation",
    {
      triggeredAt: new Date().toISOString(),
    },
    {
      removeOnComplete: 100,
      removeOnFail: 100,
    },
  );
}