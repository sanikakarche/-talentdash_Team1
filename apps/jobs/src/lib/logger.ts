type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

interface LogContext {
  jobName?: string;
  jobId?: string;
  queueName?: string;
  attemptNumber?: number;
  region?: string;
  correlationId?: string;
  duration?: number;
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

/**
 * Structured JSON logger optimized for Cloud Run.
 *
 * Outputs newline-delimited JSON to stdout — Cloud Run's logging agent
 * automatically parses these into structured log entries in Cloud Logging.
 *
 * Cloud Run severity mapping:
 *   debug  → DEBUG
 *   info   → INFO
 *   warn   → WARNING
 *   error  → ERROR
 *   fatal  → CRITICAL
 */
class Logger {
  private readonly service: string;
  private readonly minLevel: LogLevel;
  private readonly baseContext: LogContext;

  constructor(
    service: string,
    minLevel: LogLevel = "info",
    baseContext: LogContext = {},
  ) {
    this.service = service;
    this.minLevel = minLevel;
    this.baseContext = baseContext;
  }

  /**
   * Creates a child logger with additional base context.
   * Useful for adding job-specific fields that persist across all log calls.
   */
  child(context: LogContext): Logger {
    return new Logger(this.service, this.minLevel, {
      ...this.baseContext,
      ...context,
    });
  }

  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorPayload = this.serializeError(error);
    this.log("error", message, context, errorPayload);
  }

  fatal(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorPayload = this.serializeError(error);
    this.log("fatal", message, context, errorPayload);
  }

  /**
   * Creates a timer that logs duration on completion.
   * Usage:
   *   const timer = logger.startTimer("process-batch");
   *   // ... do work ...
   *   timer.done({ processedCount: 100 });
   */
  startTimer(
    operationName: string,
    context?: LogContext,
  ): { done: (extraContext?: LogContext) => number } {
    const start = performance.now();

    return {
      done: (extraContext?: LogContext): number => {
        const duration = Math.round(performance.now() - start);
        this.info(`${operationName} completed`, {
          ...context,
          ...extraContext,
          duration,
          operation: operationName,
        });
        return duration;
      },
    };
  }

  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    errorPayload?: LogEntry["error"],
  ): void {
    if (LOG_LEVEL_PRIORITY[level] < LOG_LEVEL_PRIORITY[this.minLevel]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
    };

    const mergedContext = { ...this.baseContext, ...context };
    if (Object.keys(mergedContext).length > 0) {
      entry.context = mergedContext;
    }

    if (errorPayload) {
      entry.error = errorPayload;
    }

    // Cloud Run severity field — recognized by Cloud Logging agent
    const cloudRunEntry = {
      severity: this.mapSeverity(level),
      ...entry,
    };

    const output = JSON.stringify(cloudRunEntry);

    if (level === "error" || level === "fatal") {
      process.stderr.write(output + "\n");
    } else {
      process.stdout.write(output + "\n");
    }
  }

  private serializeError(err: Error | unknown): LogEntry["error"] | undefined {
    if (!err) {
      return undefined;
    }

    if (err instanceof Error) {
      return {
        name: err.name,
        message: err.message,
        stack: err.stack,
      };
    }

    return {
      name: "UnknownError",
      message: String(err),
    };
  }

  private mapSeverity(
    level: LogLevel,
  ): "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL" {
    switch (level) {
      case "debug":
        return "DEBUG";
      case "info":
        return "INFO";
      case "warn":
        return "WARNING";
      case "error":
        return "ERROR";
      case "fatal":
        return "CRITICAL";
    }
  }
}

/**
 * Creates a logger instance for the jobs service.
 * Reads LOG_LEVEL from environment at creation time.
 */
export function createLogger(
  service: string = "talentdash-jobs",
  context?: LogContext,
): Logger {
  const level = (process.env.LOG_LEVEL ?? "info") as LogLevel;
  return new Logger(service, level, context);
}

export type { Logger, LogLevel, LogContext };
