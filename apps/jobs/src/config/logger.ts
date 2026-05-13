export { createLogger, type Logger, type LogContext, type LogLevel } from "../lib/logger.js";

import { createLogger } from "../lib/logger.js";

export function getLogger() {
  return createLogger("talentdash-jobs");
}
