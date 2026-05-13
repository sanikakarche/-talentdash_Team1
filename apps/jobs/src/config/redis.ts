export {
  checkRedisHealth,
  closeAllConnections,
  getQueueConnection,
  getSubscriberConnection,
  getWorkerConnection,
} from "../lib/connection.js";

import { getEnv } from "../lib/env.js";
import { getQueueConnection } from "../lib/connection.js";

export async function getRedis() {
  return getQueueConnection(getEnv().REDIS_URL);
}
