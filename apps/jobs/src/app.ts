import type IORedis from "ioredis";
import type { QueueName } from "@talentdash/types";
import { initializeAllQueues } from "./queues/factory.js";
import { WorkerManager } from "./workers/manager.js";
import { registerSchedules } from "./scheduler.js";
import { createLogger } from "./lib/logger.js";

// Processor imports
import { SalaryAggregationProcessor } from "./processors/salary-aggregation.processor.js";
import { CompanyStatsProcessor } from "./processors/company-stats.processor.js";
import { RankingRecomputeProcessor } from "./processors/ranking-recompute.processor.js";
import { SearchIndexingProcessor } from "./processors/search-indexing.processor.js";
import { SitemapGenerationProcessor } from "./processors/sitemap-generation.processor.js";
import { PageRegenerationProcessor } from "./processors/page-regeneration.processor.js";
import { AIEnrichmentProcessor } from "./processors/ai-enrichment.processor.js";
import { HeatmapRecomputeProcessor } from "./processors/heatmap-recompute.processor.js";

const logger = createLogger("talentdash-jobs", { component: "app" });

/**
 * Bootstraps the entire jobs application:
 * 1. Initializes all BullMQ queues
 * 2. Registers processors with the worker manager
 * 3. Registers cron schedules
 * 4. Starts all workers
 *
 * Returns the WorkerManager for health check integration.
 */
export async function bootstrap(
  queueConnection: IORedis,
  workerConnection: IORedis,
): Promise<WorkerManager> {
  logger.info("Bootstrapping jobs application");

  // 1. Initialize queues
  initializeAllQueues(queueConnection);

  // 2. Create worker manager and register processors
  const manager = new WorkerManager(workerConnection);

  const processors: [QueueName, InstanceType<any>][] = [
    ["salary-aggregation", new SalaryAggregationProcessor()],
    ["company-stats", new CompanyStatsProcessor()],
    ["ranking-recompute", new RankingRecomputeProcessor()],
    ["search-indexing", new SearchIndexingProcessor()],
    ["sitemap-generation", new SitemapGenerationProcessor()],
    ["page-regeneration", new PageRegenerationProcessor()],
    ["ai-enrichment", new AIEnrichmentProcessor()],
    ["heatmap-recompute", new HeatmapRecomputeProcessor()],
  ];

  for (const [queueName, processor] of processors) {
    manager.register(queueName, processor);
  }

  // 3. Register cron schedules
  await registerSchedules(queueConnection);

  // 4. Start workers
  await manager.startAll();

  logger.info("Jobs application bootstrapped successfully", {
    queues: processors.length,
    workers: processors.length,
  });

  return manager;
}
