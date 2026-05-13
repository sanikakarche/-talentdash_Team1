import "dotenv/config";

import { getQueue } from "../queue.js";

import { QUEUE_NAMES } from "../types/queue.js";

async function main(): Promise<void> {
  const queue = getQueue(
    QUEUE_NAMES.SITEMAP_GENERATION,
  );

  const job = await queue.add(
    "sitemap-generation",
    {
      triggeredBy: "manual-test",
    },
  );

  console.log("Sitemap job queued:", job.id);

  process.exit(0);
}

main();