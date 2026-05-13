import "dotenv/config";

import { getQueue } from "../queue.js";

import { QUEUE_NAMES } from "../types/queue.js";

async function main(): Promise<void> {
  const queue = getQueue(
    QUEUE_NAMES.AI_ENRICHMENT,
  );

  const job = await queue.add(
    "ai-enrichment",
    {
      triggeredBy: "manual-script",
    },
  );

  console.log("AI job queued:", job.id);

  process.exit(0);
}

main();