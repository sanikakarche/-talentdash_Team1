import { UnrecoverableError, type Job, type Queue } from "bullmq";
import type { Logger } from "../lib/logger.js";
import { calculateBackoffDelay, classifyRetry, type BackoffType } from "./retry.js";

export interface DeadLetterPayload {
  originalQueue: string;
  originalJobId?: string;
  originalJobName?: string;
  failedAt: string;
  attemptsMade: number;
  failedReason: string;
  errorName: string;
  stack?: string;
  data: unknown;
}

export class ErrorHandler {
  static handleJobError(error: unknown): never {
    if (!this.shouldRetry(error)) {
      throw new UnrecoverableError(this.errorMessage(error));
    }

    throw error;
  }

  static shouldRetry(error: unknown): boolean {
    return classifyRetry(error).retryable;
  }

  static calculateBackoff(
    attemptsMade: number,
    baseDelayMs: number,
    type: BackoffType,
    err?: Error,
  ): number {
    return calculateBackoffDelay({
      attemptsMade,
      baseDelayMs,
      type,
      error: err,
    });
  }

  static isTerminalFailure(job: Job | undefined, error: Error): boolean {
    if (error instanceof UnrecoverableError) return true;
    if (!job) return false;
    return job.attemptsMade >= (job.opts.attempts ?? 1);
  }

  static async moveToDeadLetterQueue(
    dlq: Queue<DeadLetterPayload>,
    job: Job | undefined,
    error: Error,
    logger: Logger,
  ): Promise<void> {
    if (!job || !this.isTerminalFailure(job, error)) return;

    const payload: DeadLetterPayload = {
      originalQueue: job.queueName,
      originalJobId: job.id,
      originalJobName: job.name,
      failedAt: new Date().toISOString(),
      attemptsMade: job.attemptsMade,
      failedReason: error.message,
      errorName: error.name,
      stack: error.stack,
      data: job.data,
    };

    await dlq.add(`${job.queueName}:failed`, payload, {
      jobId: job.id ? `${job.queueName}:${job.id}` : undefined,
      attempts: 1,
      removeOnComplete: false,
      removeOnFail: false,
    });

    logger.error("Job moved to dead-letter queue", error, {
      queueName: job.queueName,
      jobId: job.id,
      dlqName: dlq.name,
      attemptsMade: job.attemptsMade,
    });
  }

  static errorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
  }
}
