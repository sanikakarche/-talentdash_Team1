import { prisma } from "@talentdash/db";

import { createLogger } from "../lib/logger.js";

const logger = createLogger("talentdash-jobs", {
  component: "workplace-ranking-job",
});

export async function runWorkplaceRanking(): Promise<void> {
  logger.info("Starting workplace ranking");

  const aggregates =
    await prisma.salaryAggregate.findMany();

  logger.info("Salary aggregates loaded", {
    count: aggregates.length,
  });

  const rankings = aggregates.map((item) => {
    const score =
      item.medianTotal *
      item.confidenceScore *
      Math.log10(item.sampleCount + 1);

    return {
      role: item.role,
      location: item.location,
      score,
    };
  });

  rankings.sort((a, b) => b.score - a.score);

  logger.info("Top workplace rankings computed", {
    topResults: rankings.slice(0, 10),
  });

  logger.info("Workplace ranking completed");
}