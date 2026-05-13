import type { Job } from "bullmq";
import type { ProcessorResult, RankingRecomputePayload } from "@talentdash/types";
import { RankingRecomputePayloadSchema } from "@talentdash/types";
import { db } from "@talentdash/db";
import { REGION_CODES } from "@talentdash/types";
import { BaseProcessor } from "../workers/base-processor.js";
import { getQueueConnection } from "../lib/connection.js";
import { getEnv } from "../lib/env.js";
import { addBulkJobs } from "../queues/factory.js";
import type { Logger } from "../lib/logger.js";

type RankingCategory = "OVERALL" | "WLB" | "BEST_PAYING" | "MILLENNIALS" | "GEN_Z" | "MOST_LOVED";

const ALL_CATEGORIES: RankingCategory[] = [
  "OVERALL", "WLB", "BEST_PAYING", "MILLENNIALS", "GEN_Z", "MOST_LOVED",
];

/**
 * Recomputes WorkplaceRanking for each (category, region, year, month).
 *
 * Scoring methodology:
 * - OVERALL: weighted average of all ratings + recommend% + sample size bonus
 * - WLB: workLifeRating-weighted score
 * - BEST_PAYING: median compensation from salary aggregates
 * - MILLENNIALS/GEN_Z: culture + growth weighted
 * - MOST_LOVED: overall rating + recommend% + review sentiment
 */
export class RankingRecomputeProcessor extends BaseProcessor<RankingRecomputePayload> {
  constructor() {
    super("ranking-recompute", RankingRecomputePayloadSchema);
  }

  protected async execute(
    payload: RankingRecomputePayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult> {
    const now = new Date();
    const year = payload.year ?? now.getFullYear();
    const month = payload.month ?? now.getMonth() + 1;
    const categories = payload.category ? [payload.category] : ALL_CATEGORIES;
    const regions = payload.region ? [payload.region] : REGION_CODES;

    let processedCount = 0;
    let errorCount = 0;
    const totalWork = categories.length * regions.length;

    logger.info("Starting ranking recompute", {
      year, month, categories: categories.length, regions: regions.length,
    });

    for (const category of categories) {
      for (const region of regions) {
        try {
          await this.computeRankingForCategoryRegion(
            category, region, year, month, logger,
          );
          processedCount++;
        } catch (err) {
          logger.error(`Failed ranking for ${category}/${region}`, err);
          errorCount++;
        }

        await this.reportProgress(job, (processedCount + errorCount) / totalWork * 100);
      }
    }

    // Queue page regeneration for ranking pages
    try {
      const env = getEnv();
      const conn = getQueueConnection(env.REDIS_URL);
      const pageJobs = categories.flatMap((cat) =>
        regions.map((region) => ({
          data: {
            pageType: "ranking",
            slug: cat.toLowerCase(),
            region,
            priority: 3,
            triggeredBy: "job" as const,
          },
        })),
      );
      await addBulkJobs("page-regeneration", pageJobs, conn);
    } catch (err) {
      logger.error("Failed to queue ranking page regeneration", err);
    }

    return {
      success: errorCount === 0,
      processedCount,
      errorCount,
      duration: 0,
      metadata: { year, month, categories: categories.length, regions: regions.length },
    };
  }

  private async computeRankingForCategoryRegion(
    category: RankingCategory,
    region: string,
    year: number,
    month: number,
    logger: Logger,
  ): Promise<void> {
    // Fetch all companies with stats in this region
    const companies = await db.company.findMany({
      where: {
        isPublic: true,
        ...(region !== "global" ? { region: { has: region } } : {}),
      },
      include: { stats: true },
    });

    // Score each company
    const scored = companies
      .filter((c) => c.stats && c.stats.totalReviews >= 3) // Minimum threshold
      .map((c) => ({
        companyId: c.id,
        score: this.computeScore(category, c.stats!),
      }))
      .sort((a, b) => b.score - a.score);

    // Upsert rankings with rank position
    const methodology = this.getMethodology(category);

    for (let rank = 0; rank < scored.length; rank++) {
      const entry = scored[rank];
      await db.workplaceRanking.upsert({
        where: {
          id: `${entry.companyId}-${category}-${region}-${year}-${month}`,
        },
        update: {
          rank: rank + 1,
          score: entry.score,
          methodology,
        },
        create: {
          id: `${entry.companyId}-${category}-${region}-${year}-${month}`,
          companyId: entry.companyId,
          category,
          rank: rank + 1,
          score: entry.score,
          region,
          year,
          month,
          methodology,
        },
      });
    }

    logger.info(`Ranked ${scored.length} companies for ${category}/${region}`);
  }

  private computeScore(
    category: RankingCategory,
    stats: {
      overallRating: number | null;
      workLifeRating: number | null;
      cultureRating: number | null;
      compensationRating: number | null;
      growthRating: number | null;
      recommendPercent: number | null;
      totalReviews: number;
    },
  ): number {
    const overall = stats.overallRating ?? 0;
    const wlb = stats.workLifeRating ?? 0;
    const culture = stats.cultureRating ?? 0;
    const comp = stats.compensationRating ?? 0;
    const growth = stats.growthRating ?? 0;
    const recommend = (stats.recommendPercent ?? 0) / 100;
    // Sample size confidence bonus (log scale, capped)
    const sizeBonus = Math.min(Math.log10(stats.totalReviews + 1) / 3, 0.2);

    switch (category) {
      case "OVERALL":
        return (overall * 0.3 + culture * 0.15 + comp * 0.15 + wlb * 0.1 + growth * 0.1 + recommend * 5 * 0.2) + sizeBonus;
      case "WLB":
        return (wlb * 0.5 + overall * 0.2 + culture * 0.15 + recommend * 5 * 0.15) + sizeBonus;
      case "BEST_PAYING":
        return (comp * 0.5 + overall * 0.2 + growth * 0.15 + recommend * 5 * 0.15) + sizeBonus;
      case "MILLENNIALS":
        return (culture * 0.3 + growth * 0.3 + overall * 0.2 + recommend * 5 * 0.2) + sizeBonus;
      case "GEN_Z":
        return (culture * 0.35 + wlb * 0.25 + growth * 0.2 + recommend * 5 * 0.2) + sizeBonus;
      case "MOST_LOVED":
        return (recommend * 5 * 0.4 + overall * 0.3 + culture * 0.15 + growth * 0.15) + sizeBonus;
      default:
        return overall;
    }
  }

  private getMethodology(category: RankingCategory): string {
    const descriptions: Record<RankingCategory, string> = {
      OVERALL: "Weighted: overall(30%), culture(15%), compensation(15%), WLB(10%), growth(10%), recommend%(20%) + sample confidence",
      WLB: "Weighted: WLB(50%), overall(20%), culture(15%), recommend%(15%) + sample confidence",
      BEST_PAYING: "Weighted: compensation(50%), overall(20%), growth(15%), recommend%(15%) + sample confidence",
      MILLENNIALS: "Weighted: culture(30%), growth(30%), overall(20%), recommend%(20%) + sample confidence",
      GEN_Z: "Weighted: culture(35%), WLB(25%), growth(20%), recommend%(20%) + sample confidence",
      MOST_LOVED: "Weighted: recommend%(40%), overall(30%), culture(15%), growth(15%) + sample confidence",
    };
    return descriptions[category];
  }
}
