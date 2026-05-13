import { createLogger } from "../lib/logger.js";

import { generateSummary } from "../ai/summary-generator";

const logger = createLogger("talentdash-jobs", {
  component: "ai-enrichment-job",
});

export async function runAIEnrichment(): Promise<void> {
  logger.info("Starting AI enrichment");

  /**
   * TEMP MOCK DATA
   */

  const reviews = [
    {
      id: "1",
      title: "Software Engineer at Google",
      content:
        "Great compensation and strong engineering culture. Work life balance depends on team.",
    },

    {
      id: "2",
      title: "Amazon SDE Experience",
      content:
        "High ownership but stressful environment. Compensation is competitive.",
    },
  ];

  for (const review of reviews) {
    const summary = await generateSummary({
      title: review.title,
      content: review.content,
    });

    logger.info("AI summary generated", {
      reviewId: review.id,
      summary,
    });
  }

  logger.info("AI enrichment completed");
}