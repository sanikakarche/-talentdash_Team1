import "dotenv/config";

import { getQueue } from "../queue.js";

import { QUEUE_NAMES } from "../types/queue.js";

async function main(): Promise<void> {
  const queue = getQueue(
    QUEUE_NAMES.WORKPLACE_RANKING,
  );

  const job = await queue.add(
    "workplace-ranking",
    {
      triggeredBy: "manual-test",
    },
  );

  console.log("Ranking job queued:", job.id);

  process.exit(0);
}

main();