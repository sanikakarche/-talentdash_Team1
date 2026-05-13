import "dotenv/config";

import { getQueue } from "../queue.js";

import { QUEUE_NAMES } from "../types/queue.js";

async function main(): Promise<void> {
  const queues = [
    QUEUE_NAMES.AI_ENRICHMENT,
    QUEUE_NAMES.SALARY_AGGREGATION,
    QUEUE_NAMES.PAGE_GENERATION,
  ];

  for (const queueName of queues) {
    const queue = getQueue(queueName);

    await queue.obliterate({
      force: true,
    });

    console.log(`Cleared queue: ${queueName}`);
  }

  process.exit(0);
}

main();