import "dotenv/config";

import { getQueue } from "../queue.js";

import { QUEUE_NAMES } from "../types/queue.js";

async function main(): Promise<void> {
  const queue = getQueue(
    QUEUE_NAMES.JOB_SCRAPING,
  );

  const job = await queue.add(
    "job-scraping",
    {
      triggeredBy: "manual-test",
    },
  );

  console.log("Scraper job queued:", job.id);

  process.exit(0);
}

main();