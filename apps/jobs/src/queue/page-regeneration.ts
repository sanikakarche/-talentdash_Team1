import { Queue } from "bullmq";

import { getEnv } from "../lib/env.js";

import { getQueueConnection } from "../lib/connection.js";

const env = getEnv();

const connection = getQueueConnection(env.REDIS_URL);

export const pageRegenerationQueue = new Queue(
  "page-regeneration",
  {
    connection,
  },
);