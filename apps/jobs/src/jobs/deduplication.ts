import { createLogger } from "../lib/logger.js";

const logger = createLogger("talentdash-jobs", {
  component: "deduplication-job",
});

export async function runDeduplication(): Promise<void> {
  logger.info("Starting deduplication");

  /**
   * TEMP MOCK DATA
   */

  const salaries = [
    {
      company: "Google",
      role: "Software Engineer",
      salary: 3200000,
    },

    {
      company: "Google",
      role: "Software Engineer",
      salary: 3200000,
    },

    {
      company: "Amazon",
      role: "Frontend Engineer",
      salary: 2400000,
    },
  ];

  const unique = Array.from(
    new Map(
      salaries.map((item) => [
        `${item.company}-${item.role}-${item.salary}`,
        item,
      ]),
    ).values(),
  );

  logger.info("Deduplication completed", {
    before: salaries.length,
    after: unique.length,
    removed: salaries.length - unique.length,
  });
}