import type { Job } from "bullmq";
import type { z } from "zod";
import type { ProcessorResult } from "@talentdash/types";
import { createLogger, type Logger } from "../lib/logger.js";
import { FatalError, isRetryable } from "../lib/errors.js";

/**
 * Abstract base processor that all job processors extend.
 *
 * Provides:
 * - Zod-validated job data parsing
 * - Structured logging with job context injected
 * - Automatic duration timing
 * - Error classification (retryable vs fatal)
 * - Progress reporting
 * - Heartbeat to prevent BullMQ stall detection
 *
 * Subclasses implement `execute()` with their specific business logic.
 */
export abstract class BaseProcessor<TPayload> {
  protected readonly logger: Logger;
  protected readonly processorName: string;
  private readonly payloadSchema: z.ZodType<TPayload>;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;

  constructor(processorName: string, payloadSchema: z.ZodType<TPayload>) {
    this.processorName = processorName;
    this.payloadSchema = payloadSchema;
    this.logger = createLogger("talentdash-jobs", { processor: processorName });
  }

  /**
   * Entry point called by BullMQ Worker.
   * Handles validation, timing, error classification, and lifecycle hooks.
   */
  async process(job: Job): Promise<ProcessorResult> {
    const jobLogger = this.logger.child({
      jobId: job.id,
      jobName: job.name,
      queueName: job.queueName,
      attemptNumber: job.attemptsMade + 1,
    });

    const timer = jobLogger.startTimer(`${this.processorName}:process`);

    // Start heartbeat to prevent stall detection on long jobs
    this.startHeartbeat(job);

    try {
      // 1. Validate payload
      const parseResult = this.payloadSchema.safeParse(job.data);
      if (!parseResult.success) {
        const errors = parseResult.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ");

        throw new FatalError(
          `Invalid job payload: ${errors}`,
          "INVALID_PAYLOAD",
          { jobId: job.id, jobName: job.name },
        );
      }

      const payload = parseResult.data;

      jobLogger.info("Job started", { payload: this.sanitizePayload(payload) });

      // 2. Execute business logic
      const result = await this.execute(payload, job, jobLogger);

      // 3. Lifecycle hook
      await this.onComplete(result, job, jobLogger);

      const duration = timer.done({
        processedCount: result.processedCount,
        errorCount: result.errorCount,
      });

      return { ...result, duration };
    } catch (error) {
      const duration = Math.round(performance.now());

      jobLogger.error(
        `Job failed (attempt ${job.attemptsMade + 1})`,
        error,
        { retryable: isRetryable(error) },
      );

      await this.onFailed(error, job, jobLogger);

      // FatalError → mark as unrecoverable so BullMQ doesn't retry
      if (error instanceof FatalError) {
        // By throwing with an `UnrecoverableError`-like pattern,
        // the worker manager can detect and skip retries.
        throw error;
      }

      throw error;
    } finally {
      this.stopHeartbeat();
    }
  }

  /**
   * Core business logic — implemented by each processor.
   */
  protected abstract execute(
    payload: TPayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult>;

  /**
   * Called after successful execution. Override for post-processing.
   */
  protected async onComplete(
    _result: ProcessorResult,
    _job: Job,
    _logger: Logger,
  ): Promise<void> {
    // Default: no-op. Override in subclass if needed.
  }

  /**
   * Called after failed execution. Override for cleanup.
   */
  protected async onFailed(
    _error: unknown,
    _job: Job,
    _logger: Logger,
  ): Promise<void> {
    // Default: no-op. Override in subclass for cleanup.
  }

  /**
   * Reports progress to BullMQ (0–100).
   */
  protected async reportProgress(job: Job, progress: number): Promise<void> {
    await job.updateProgress(Math.min(100, Math.max(0, Math.round(progress))));
  }

  /**
   * Removes sensitive fields from payload before logging.
   * Override in subclasses that handle sensitive data.
   */
  protected sanitizePayload(payload: TPayload): Record<string, unknown> {
    return payload as Record<string, unknown>;
  }

  /**
   * BullMQ marks jobs as stalled if the worker doesn't process events
   * within the stall interval (default 30s). For long-running jobs,
   * we send periodic progress updates to prevent false stall detection.
   */
  private startHeartbeat(job: Job): void {
    this.heartbeatInterval = setInterval(async () => {
      try {
        // Any progress update resets the stall timer
        await job.updateProgress(job.progress as number);
      } catch {
        // Ignore heartbeat errors — job may have been removed
      }
    }, 15_000); // Every 15s, well within 30s stall interval
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}
