import "dotenv/config";

import { getEnv } from "./lib/env.js";
import { createLogger } from "./lib/logger.js";
import { createRedisConnection } from "./lib/redis.js";

import { initializeScheduler } from "./scheduler/index.js";

import { createSalaryAggregatorWorker } from "./workers/salary-aggregator.worker.js";
import { createPageRegenerationWorker } from "./workers/page-regeneration.worker.js";
import { createAIEnrichmentWorker } from "./workers/ai-enrichment.worker.js";
import { createSitemapGeneratorWorker } from "./workers/sitemap-generator.worker.js";
import { createWorkplaceRankingWorker } from "./workers/workplace-ranking.worker.js";
import { createJobScraperWorker } from "./workers/job-scraper.worker.js";
import { createDeduplicationWorker } from "./workers/deduplication.worker.js";

const logger = createLogger("talentdash-jobs", {
  component: "server",
});

async function main(): Promise<void> {
  try {
    logger.info("Starting TalentDash Jobs Service", {
      nodeVersion: process.version,
      pid: process.pid,
    });

    /**
     * VALIDATE ENV
     */

    const env = getEnv();

    logger.info("Environment validated", {
      nodeEnv: env.NODE_ENV,
      logLevel: env.LOG_LEVEL,
      port: env.PORT,
    });

    /**
     * CREATE REDIS CONNECTION
     */

    const redis = createRedisConnection();

    const pong = await redis.ping();

    logger.info("Redis ping success", {
      response: pong,
    });

    /**
     * START WORKERS
     */

    createSalaryAggregatorWorker();

    createPageRegenerationWorker();

    createAIEnrichmentWorker();

    createSitemapGeneratorWorker();

    createWorkplaceRankingWorker();

    createJobScraperWorker();

    createDeduplicationWorker();

    logger.info("Salary aggregator worker started");

    logger.info("Page regeneration worker started");

    logger.info("AI enrichment worker started");

    logger.info("Sitemap generator worker started");

    logger.info("Workplace ranking worker started");

    logger.info("Job scraper worker started");

    logger.info("Deduplication worker started");

    /**
     * START SCHEDULER
     */

    await initializeScheduler();

    logger.info("Scheduler initialized");

    /**
     * GRACEFUL SHUTDOWN
     */

    process.on("SIGTERM", async () => {
      logger.info("SIGTERM received, shutting down jobs service");

      await redis.quit();

      process.exit(0);
    });

    process.on("SIGINT", async () => {
      logger.info("SIGINT received, shutting down jobs service");

      await redis.quit();

      process.exit(0);
    });

    /**
     * SERVICE READY
     */

    logger.info("Jobs runtime booted successfully");
  } catch (error) {
    console.error("FULL STARTUP ERROR:");

    console.error(error);

    process.exit(1);
  }
}

main();