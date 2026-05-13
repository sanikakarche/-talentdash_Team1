import "dotenv/config";

import { getQueue } from "../queue.js";

import { QUEUE_NAMES } from "../types/queue.js";

async function main(): Promise<void> {
  const queue = getQueue(
    QUEUE_NAMES.DEDUPLICATION,
  );

  const job = await queue.add(
    "deduplication",
    {
      triggeredBy: "manual-test",
    },
  );

  console.log("Deduplication job queued:", job.id);

  process.exit(0);
}

main();