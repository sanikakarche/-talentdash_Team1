import { createLogger } from "../lib/logger.js";

const logger = createLogger("talentdash-jobs", {
  component: "sitemap-generator-job",
});

export async function runSitemapGeneration(): Promise<void> {
  logger.info("Starting sitemap generation");

  /**
   * TEMP MOCK
   */

  const sitemapPages = [
    "/companies/google",
    "/companies/amazon",
    "/salaries/software-engineer",
  ];

  logger.info("Sitemap pages generated", {
    count: sitemapPages.length,
  });

  logger.info("Sitemap generation completed");
}