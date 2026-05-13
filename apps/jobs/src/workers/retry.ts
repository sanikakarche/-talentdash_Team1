import { UnrecoverableError } from "bullmq";
import { ExternalServiceError, FatalError, RateLimitError, isRetryable } from "../lib/errors.js";

const DEFAULT_MAX_BACKOFF_MS = 15 * 60 * 1000;

export type BackoffType = "fixed" | "exponential";

export interface BackoffOptions {
  attemptsMade: number;
  baseDelayMs: number;
  type: BackoffType;
  error?: Error;
  maxDelayMs?: number;
}

export interface RetryDecision {
  retryable: boolean;
  fatal: boolean;
  reason: string;
}

export function calculateBackoffDelay({
  attemptsMade,
  baseDelayMs,
  type,
  error,
  maxDelayMs = DEFAULT_MAX_BACKOFF_MS,
}: BackoffOptions): number {
  if (error instanceof RateLimitError && error.retryAfterMs > 0) {
    return Math.min(error.retryAfterMs, maxDelayMs);
  }

  const normalizedAttempt = Math.max(0, attemptsMade - 1);
  const delay =
    type === "exponential"
      ? baseDelayMs * Math.pow(2, normalizedAttempt)
      : baseDelayMs;

  return Math.min(delay, maxDelayMs);
}

export function classifyRetry(error: unknown): RetryDecision {
  if (error instanceof UnrecoverableError) {
    return { retryable: false, fatal: true, reason: "unrecoverable" };
  }

  if (error instanceof FatalError) {
    return { retryable: false, fatal: true, reason: error.reason };
  }

  if (error instanceof ExternalServiceError) {
    return {
      retryable: error.isRetryable,
      fatal: !error.isRetryable,
      reason: error.isRetryable ? "external-service-retryable" : "external-service-fatal",
    };
  }

  if (error instanceof SyntaxError || error instanceof TypeError) {
    return { retryable: false, fatal: true, reason: "programmer-error" };
  }

  return {
    retryable: isRetryable(error),
    fatal: !isRetryable(error),
    reason: isRetryable(error) ? "retryable" : "not-retryable",
  };
}
