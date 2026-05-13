/**
 * Custom error hierarchy for the jobs platform.
 *
 * BullMQ retries by default on failure. The error type signals
 * the worker framework how to handle each failure mode:
 *
 *   RetryableError  → BullMQ retries with configured backoff
 *   FatalError      → Moves straight to failed/DLQ, no retry
 *   RateLimitError  → Delays retry with exponential backoff
 *   ExternalServiceError → Captures upstream service context
 */

interface JobErrorContext {
  jobId?: string;
  jobName?: string;
  queueName?: string;
  attemptNumber?: number;
  [key: string]: unknown;
}

export class JobError extends Error {
  public readonly context: JobErrorContext;
  public readonly timestamp: string;

  constructor(message: string, context: JobErrorContext = {}) {
    super(message);
    this.name = "JobError";
    this.context = context;
    this.timestamp = new Date().toISOString();

    // Maintains proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Signals that the job should be retried by BullMQ
 * according to its configured backoff strategy.
 */
export class RetryableError extends JobError {
  public readonly maxRetries: number;

  constructor(
    message: string,
    context: JobErrorContext = {},
    maxRetries: number = 3,
  ) {
    super(message, context);
    this.name = "RetryableError";
    this.maxRetries = maxRetries;
  }
}

/**
 * Signals that the job should NOT be retried.
 * Moves directly to failed state / DLQ.
 *
 * Use for:
 * - Invalid input data that will never succeed
 * - Business logic violations
 * - Missing entity references
 */
export class FatalError extends JobError {
  public readonly reason: string;

  constructor(
    message: string,
    reason: string,
    context: JobErrorContext = {},
  ) {
    super(message, context);
    this.name = "FatalError";
    this.reason = reason;
  }
}

/**
 * Signals that an external API returned a rate limit response.
 * The worker should back off with exponential delay.
 */
export class RateLimitError extends JobError {
  public readonly retryAfterMs: number;
  public readonly provider: string;

  constructor(
    message: string,
    provider: string,
    retryAfterMs: number = 60_000,
    context: JobErrorContext = {},
  ) {
    super(message, context);
    this.name = "RateLimitError";
    this.provider = provider;
    this.retryAfterMs = retryAfterMs;
  }
}

/**
 * Wraps errors from external services (APIs, databases, storage)
 * with additional provider context for debugging.
 */
export class ExternalServiceError extends JobError {
  public readonly provider: string;
  public readonly statusCode?: number;
  public readonly isRetryable: boolean;

  constructor(
    message: string,
    provider: string,
    options: {
      statusCode?: number;
      isRetryable?: boolean;
      context?: JobErrorContext;
      cause?: Error;
    } = {},
  ) {
    super(message, options.context ?? {});
    this.name = "ExternalServiceError";
    this.provider = provider;
    this.statusCode = options.statusCode;
    this.isRetryable = options.isRetryable ?? true;

    if (options.cause) {
      this.cause = options.cause;
    }
  }
}

/**
 * Determines whether an error should trigger a retry.
 * FatalError and non-retryable ExternalServiceError skip retries.
 */
export function isRetryable(error: unknown): boolean {
  if (error instanceof FatalError) {
    return false;
  }

  if (error instanceof ExternalServiceError) {
    return error.isRetryable;
  }

  if (error instanceof RateLimitError) {
    return true;
  }

  // Default: unknown errors are retryable (transient failures)
  return true;
}

/**
 * Extracts a delay hint from an error, if present.
 * Used by the worker to apply custom backoff for rate-limited operations.
 */
export function getRetryDelay(error: unknown, attempt: number): number {
  if (error instanceof RateLimitError) {
    // Respect the API's retry-after, with exponential multiplier
    return error.retryAfterMs * Math.pow(2, attempt - 1);
  }

  // Default exponential backoff: 1s, 2s, 4s, 8s, 16s ...
  return Math.min(1000 * Math.pow(2, attempt - 1), 300_000);
}
