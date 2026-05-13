import type { Job } from "bullmq";
import type { ProcessorResult } from "@talentdash/types";
import { FatalError } from "../lib/errors.js";
import { createLogger, type Logger } from "../lib/logger.js";
import type { RuntimeProcessor, WorkerMetricsHooks } from "./base-worker.js";
import { ErrorHandler } from "./error-handler.js";

const HEARTBEAT_INTERVAL_MS = 15_000;

export class JobRunner {
  static createProcessor<TPayload>(
    processor: RuntimeProcessor<TPayload>,
    metrics?: WorkerMetricsHooks,
  ) {
    return async (job: Job): Promise<ProcessorResult> => {
      const baseLogger = createLogger("talentdash-jobs", {
        processor: processor.name,
      });
      const jobLogger = baseLogger.child({
        jobId: job.id,
        jobName: job.name,
        queueName: job.queueName,
        attemptNumber: job.attemptsMade + 1,
      });
      const abortController = new AbortController();
      const timer = jobLogger.startTimer(`${processor.name}:process`);
      const startedAt = performance.now();
      let payload: TPayload | undefined;

      await this.emitMetric(jobLogger, () =>
        metrics?.onJobStarted?.({
          queueName: job.queueName,
          workerName: processor.name,
          jobId: job.id,
          jobName: job.name,
          attemptNumber: job.attemptsMade + 1,
          attemptsMade: job.attemptsMade,
        }),
      );

      const heartbeat = setInterval(() => {
        job.updateProgress(job.progress as number).catch(() => undefined);
      }, HEARTBEAT_INTERVAL_MS);

      try {
        if (processor.schema) {
          const parsed = processor.schema.safeParse(job.data);
          if (!parsed.success) {
            const errors = parsed.error.issues
              .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
              .join("; ");
            throw new FatalError(`Invalid job payload: ${errors}`, "INVALID_PAYLOAD", {
              jobId: job.id,
              jobName: job.name,
              queueName: job.queueName,
            });
          }
          payload = parsed.data;
          const idempotencyKey =
            processor.getIdempotencyKey?.(payload, job) ?? processor.policy?.idempotencyKey;
          jobLogger.info("Job started", {
            payload: processor.sanitizePayload?.(payload) ?? {},
            idempotencyKey,
            maxBatchSize: processor.policy?.maxBatchSize,
            memorySafe: processor.policy?.memorySafe ?? true,
          });
          await processor.hooks?.onStart?.(payload, {
            job,
            logger: jobLogger,
            signal: abortController.signal,
          });
        } else {
          jobLogger.info("Job started");
        }

        const result = this.normalizeResult(
          await this.execute(processor, job, jobLogger, abortController.signal, payload),
        );

        if (payload !== undefined) {
          await processor.hooks?.onComplete?.(result, payload, {
            job,
            logger: jobLogger,
            signal: abortController.signal,
          });
        }

        const duration = timer.done({
          processedCount: result.processedCount,
          errorCount: result.errorCount,
        });
        const completed = { ...result, duration };

        await this.emitMetric(jobLogger, () =>
          metrics?.onJobCompleted?.({
            queueName: job.queueName,
            workerName: processor.name,
            jobId: job.id,
            jobName: job.name,
            attemptNumber: job.attemptsMade + 1,
            attemptsMade: job.attemptsMade,
            duration,
          }),
        );

        return completed;
      } catch (error) {
        abortController.abort();
        const duration = Math.round(performance.now() - startedAt);

        jobLogger.error(`Job failed (attempt ${job.attemptsMade + 1})`, error, {
          retryable: ErrorHandler.shouldRetry(error),
          duration,
        });

        await processor.hooks?.onFailed?.(error, payload, {
          job,
          logger: jobLogger,
          signal: abortController.signal,
        });

        await this.emitMetric(jobLogger, () =>
          metrics?.onJobFailed?.({
            queueName: job.queueName,
            workerName: processor.name,
            jobId: job.id,
            jobName: job.name,
            attemptNumber: job.attemptsMade + 1,
            attemptsMade: job.attemptsMade,
            duration,
            failedReason: ErrorHandler.errorMessage(error),
          }),
        );

        return ErrorHandler.handleJobError(error);
      } finally {
        clearInterval(heartbeat);
      }
    };
  }

  private static async execute<TPayload>(
    processor: RuntimeProcessor<TPayload>,
    job: Job,
    logger: ReturnType<typeof createLogger>,
    signal: AbortSignal,
    payload?: TPayload,
  ): Promise<ProcessorResult> {
    if (processor.execute && payload !== undefined) {
      return processor.execute(payload, job, logger, signal);
    }

    if (processor.process) {
      return processor.process(job);
    }

    throw new FatalError("Worker processor has no execute or process method", "INVALID_WORKER", {
      jobId: job.id,
      jobName: job.name,
      queueName: job.queueName,
    });
  }

  private static normalizeResult(result: ProcessorResult): ProcessorResult {
    return {
      success: Boolean(result.success),
      processedCount: Number.isFinite(result.processedCount) ? result.processedCount : 0,
      errorCount: Number.isFinite(result.errorCount) ? result.errorCount : 0,
      duration: Number.isFinite(result.duration) ? result.duration : 0,
      metadata: result.metadata,
    };
  }

  private static async emitMetric(
    logger: Logger,
    emit: () => Promise<void> | void | undefined,
  ): Promise<void> {
    try {
      await emit();
    } catch (error) {
      logger.warn("Worker metrics hook failed", {
        error: ErrorHandler.errorMessage(error),
      });
    }
  }
}
