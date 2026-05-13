import { createLogger } from "../lib/logger.js";

const logger = createLogger("talentdash-jobs", {
  component: "job-scraper-job",
});

interface ScrapedJob {
  company: string;

  role: string;

  location: string;

  salary: number;
}

export async function runJobScraper(): Promise<void> {
  logger.info("Starting job scraper");

  /**
   * TEMP MOCK SCRAPER
   */

  const jobs: ScrapedJob[] = [
    {
      company: "Google",
      role: "Software Engineer",
      location: "Bangalore",
      salary: 3200000,
    },

    {
      company: "Amazon",
      role: "Frontend Engineer",
      location: "Hyderabad",
      salary: 2400000,
    },
  ];

  logger.info("Jobs scraped", {
    count: jobs.length,
    jobs,
  });

  logger.info("Job scraper completed");
}