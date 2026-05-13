import { Queue } from "bullmq";

import { getRedisConnection } from "./connection.js";

export const QUEUE_NAMES = {
  SALARY_AGGREGATION: "salary-aggregation",
  PAGE_GENERATION: "page-generation",
  AI_ENRICHMENT: "ai-enrichment",
  SITEMAP_GENERATION: "sitemap-generation",
} as const;

export const salaryAggregationQueue = new Queue(
  QUEUE_NAMES.SALARY_AGGREGATION,
  {
    connection: getRedisConnection(),

    defaultJobOptions: {
      attempts: 5,

      backoff: {
        type: "exponential",
        delay: 2000,
      },

      removeOnComplete: 100,

      removeOnFail: 1000,
    },
  },
);