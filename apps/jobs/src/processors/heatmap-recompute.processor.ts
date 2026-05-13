import type { Job } from "bullmq";
import type { ProcessorResult, HeatmapRecomputePayload } from "@talentdash/types";
import { HeatmapRecomputePayloadSchema, REGION_CODES } from "@talentdash/types";
import { db } from "@talentdash/db";
import { CACHE_KEYS } from "@talentdash/utils";
import { BaseProcessor } from "../workers/base-processor.js";
import { getQueueConnection } from "../lib/connection.js";
import { getEnv } from "../lib/env.js";
import { addBulkJobs } from "../queues/factory.js";
import type { Logger } from "../lib/logger.js";

const UPSERT_BATCH_SIZE = 100;

/**
 * Recomputes the SalaryHeatmap table from SalaryAggregate data.
 *
 * Replaces the original recompute-heatmap.ts with a production version:
 * - Removes direct next/cache dependency (not available in standalone worker)
 * - Batched upserts with Prisma $transaction
 * - Proper cache invalidation via ioredis
 * - Chains to page-regeneration for ISR revalidation
 */
export class HeatmapRecomputeProcessor extends BaseProcessor<HeatmapRecomputePayload> {
  constructor() {
    super("heatmap-recompute", HeatmapRecomputePayloadSchema);
  }

  protected async execute(
    payload: HeatmapRecomputePayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult> {
    const regions = payload.region ? [payload.region] : [...REGION_CODES];
    let processedCount = 0;
    let errorCount = 0;

    const cacheKeysToInvalidate: string[] = [];
    const pageRegenRegions: string[] = [];

    for (const region of regions) {
      try {
        const count = await this.recomputeForRegion(
          region,
          payload.role,
          cacheKeysToInvalidate,
          logger,
        );
        processedCount += count;
        pageRegenRegions.push(region);
      } catch (err) {
        logger.error(`Heatmap recompute failed for region: ${region}`, err);
        errorCount++;
      }

      await this.reportProgress(
        job,
        (regions.indexOf(region) + 1) / regions.length * 80,
      );
    }

    // Invalidate Redis cache
    if (cacheKeysToInvalidate.length > 0) {
      try {
        const env = getEnv();
        const conn = getQueueConnection(env.REDIS_URL);
        for (let i = 0; i < cacheKeysToInvalidate.length; i += 100) {
          await conn.del(...cacheKeysToInvalidate.slice(i, i + 100));
        }
        logger.info(`Invalidated ${cacheKeysToInvalidate.length} heatmap cache keys`);
      } catch (err) {
        logger.error("Cache invalidation failed (non-fatal)", err);
      }
    }

    // Chain page regeneration for heatmap pages
    if (pageRegenRegions.length > 0) {
      try {
        const env = getEnv();
        const conn = getQueueConnection(env.REDIS_URL);
        await addBulkJobs(
          "page-regeneration",
          pageRegenRegions.map((r) => ({
            data: {
              pageType: "heatmap",
              slug: "salary-heatmap",
              region: r,
              priority: 5,
              triggeredBy: "job" as const,
            },
          })),
          conn,
        );
      } catch (err) {
        logger.error("Failed to queue heatmap page regeneration", err);
      }
    }

    await this.reportProgress(job, 100);

    return {
      success: errorCount === 0,
      processedCount,
      errorCount,
      duration: 0,
      metadata: { regionsProcessed: regions.length },
    };
  }

  private async recomputeForRegion(
    region: string,
    role: string | undefined,
    cacheKeys: string[],
    logger: Logger,
  ): Promise<number> {
    const whereClause: Record<string, unknown> = { region };
    if (role) {
      whereClause.role = role;
    }

    const aggregates = await db.salaryAggregate.findMany({
      where: whereClause,
    });

    if (aggregates.length === 0) {
      logger.info(`No aggregates for region: ${region}`);
      return 0;
    }

    // Batch upsert into SalaryHeatmap
    for (let i = 0; i < aggregates.length; i += UPSERT_BATCH_SIZE) {
      const batch = aggregates.slice(i, i + UPSERT_BATCH_SIZE);

      await db.$transaction(
        batch.map((agg) => {
          cacheKeys.push(CACHE_KEYS.salaryHeatmap(agg.role, agg.region));

          return db.salaryHeatmap.upsert({
            where: {
              role_location_region: {
                role: agg.role,
                location: agg.location,
                region: agg.region,
              },
            },
            update: {
              medianTotal: agg.medianTotal,
              currency: agg.currency,
            },
            create: {
              role: agg.role,
              location: agg.location,
              region: agg.region,
              medianTotal: agg.medianTotal,
              currency: agg.currency,
            },
          });
        }),
      );
    }

    logger.info(`Recomputed ${aggregates.length} heatmap entries for ${region}`);
    return aggregates.length;
  }
}
