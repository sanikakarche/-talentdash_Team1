import type { Job } from "bullmq";
import type { ProcessorResult, CompanyStatsPayload } from "@talentdash/types";
import { CompanyStatsPayloadSchema } from "@talentdash/types";
import { db } from "@talentdash/db";
import { CACHE_KEYS } from "@talentdash/utils";
import { BaseProcessor } from "../workers/base-processor.js";
import { getQueueConnection } from "../lib/connection.js";
import { getEnv } from "../lib/env.js";
import type { Logger } from "../lib/logger.js";

const BATCH_SIZE = 50;

/**
 * Recomputes CompanyStats aggregates from reviews, salaries, and interviews.
 *
 * For each company:
 * - Averages ratings across all WorkplaceReview dimensions
 * - Counts total salaries and interviews
 * - Computes recommend percentage from positive reviews
 * - Atomic upsert into CompanyStats
 * - Invalidates per-company cache
 */
export class CompanyStatsProcessor extends BaseProcessor<CompanyStatsPayload> {
  constructor() {
    super("company-stats", CompanyStatsPayloadSchema);
  }

  protected async execute(
    payload: CompanyStatsPayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult> {
    let processedCount = 0;
    let errorCount = 0;

    // Determine which companies to process
    const whereClause: Record<string, unknown> = {};
    if (payload.companyId) {
      whereClause.id = payload.companyId;
    }
    if (payload.region) {
      whereClause.region = { has: payload.region };
    }

    const companies = await db.company.findMany({
      where: whereClause,
      select: { id: true, slug: true },
    });

    if (companies.length === 0) {
      logger.info("No companies to process");
      return { success: true, processedCount: 0, errorCount: 0, duration: 0 };
    }

    logger.info(`Processing stats for ${companies.length} companies`);

    const cacheKeysToInvalidate: string[] = [];

    for (let i = 0; i < companies.length; i += BATCH_SIZE) {
      const batch = companies.slice(i, i + BATCH_SIZE);

      for (const company of batch) {
        try {
          // Aggregate review ratings
          const reviewAgg = await db.workplaceReview.aggregate({
            where: { companyId: company.id },
            _avg: {
              rating: true,
              workLifeRating: true,
              cultureRating: true,
              compensationRating: true,
              growthRating: true,
            },
            _count: { id: true },
          });

          // Count salaries
          const salaryCount = await db.salaryEntry.count({
            where: { companyId: company.id },
          });

          // Count interviews
          const interviewCount = await db.interviewExperience.count({
            where: { companyId: company.id },
          });

          // Compute recommend percentage
          // Reviews with rating >= 3.5 are considered "would recommend"
          const positiveReviews = await db.workplaceReview.count({
            where: { companyId: company.id, rating: { gte: 3.5 } },
          });

          const totalReviews = reviewAgg._count.id;
          const recommendPercent =
            totalReviews > 0
              ? Math.round((positiveReviews / totalReviews) * 100)
              : null;

          await db.companyStats.upsert({
            where: { companyId: company.id },
            update: {
              overallRating: reviewAgg._avg.rating,
              workLifeRating: reviewAgg._avg.workLifeRating,
              cultureRating: reviewAgg._avg.cultureRating,
              compensationRating: reviewAgg._avg.compensationRating,
              growthRating: reviewAgg._avg.growthRating,
              totalReviews,
              totalSalaries: salaryCount,
              totalInterviews: interviewCount,
              recommendPercent,
            },
            create: {
              companyId: company.id,
              overallRating: reviewAgg._avg.rating,
              workLifeRating: reviewAgg._avg.workLifeRating,
              cultureRating: reviewAgg._avg.cultureRating,
              compensationRating: reviewAgg._avg.compensationRating,
              growthRating: reviewAgg._avg.growthRating,
              totalReviews,
              totalSalaries: salaryCount,
              totalInterviews: interviewCount,
              recommendPercent,
            },
          });

          cacheKeysToInvalidate.push(
            CACHE_KEYS.salaryAggregate(company.slug, "stats", "company"),
          );

          processedCount++;
        } catch (err) {
          logger.error(`Failed to compute stats for company ${company.id}`, err);
          errorCount++;
        }
      }

      await this.reportProgress(job, (i + batch.length) / companies.length * 100);
    }

    // Invalidate cache
    if (cacheKeysToInvalidate.length > 0) {
      try {
        const env = getEnv();
        const conn = getQueueConnection(env.REDIS_URL);
        for (let i = 0; i < cacheKeysToInvalidate.length; i += 100) {
          await conn.del(...cacheKeysToInvalidate.slice(i, i + 100));
        }
      } catch (err) {
        logger.error("Cache invalidation failed (non-fatal)", err);
      }
    }

    return {
      success: errorCount === 0,
      processedCount,
      errorCount,
      duration: 0,
      metadata: { totalCompanies: companies.length },
    };
  }
}
