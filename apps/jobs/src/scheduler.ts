import type IORedis from "ioredis";
import { QUEUE_REGISTRY } from "./queues/registry.js";
import { getQueue } from "./queues/factory.js";
import { createLogger } from "./lib/logger.js";

const logger = createLogger("talentdash-jobs", { component: "scheduler" });

/**
 * Registers all cron-based repeatable jobs with BullMQ.
 *
 * BullMQ's repeatable jobs use Redis to track the next execution time,
 * so even if the worker restarts, cron schedules are preserved.
 *
 * Schedule overview:
 *   salary-aggregation:    0 * /6 * * *     (every 6 hours)
 *   company-stats:         0 * /4 * * *     (every 4 hours)
 *   ranking-recompute:     0 2 * * *       (daily at 2 AM UTC)
 *   search-indexing:       0 * /2 * * *     (every 2 hours)
 *   sitemap-generation:    0 3 * * *       (daily at 3 AM UTC)
 *   heatmap-recompute:     30 * /6 * * *    (every 6 hours at :30)
 */
export async function registerSchedules(connection: IORedis): Promise<void> {
  const cronQueues = QUEUE_REGISTRY.filter((q) => q.cron);

  logger.info(`Registering ${cronQueues.length} cron schedules`);

  for (const config of cronQueues) {
    const queue = getQueue(config.name, connection);

    // Remove existing repeatable jobs to prevent duplicates on restart
    const existingRepeatables = await queue.getRepeatableJobs();
    for (const repeatable of existingRepeatables) {
      await queue.removeRepeatableByKey(repeatable.key);
    }

    // Register the new repeatable job
    await queue.add(
      config.name,
      { triggeredBy: "cron" } as any,
      {
        repeat: {
          pattern: config.cron!,
        },
        jobId: `cron:${config.name}`,
      },
    );

    logger.info(`Scheduled [${config.name}]: ${config.cron} (${config.cronDescription ?? ""})`);
  }

  logger.info("All cron schedules registered");
}
