import type { Job } from "bullmq";
import type { z } from "zod";
import type { ProcessorResult } from "@talentdash/types";
import type { Logger } from "../lib/logger.js";

export interface WorkerExecutionContext {
  job: Job;
  logger: Logger;
  signal: AbortSignal;
}

export interface WorkerExecutionPolicy {
  idempotencyKey?: string;
  maxBatchSize?: number;
  memorySafe?: boolean;
}

export interface WorkerRuntimeHooks<TPayload = unknown> {
  onStart?: (payload: TPayload, context: WorkerExecutionContext) => Promise<void> | void;
  onComplete?: (
    result: ProcessorResult,
    payload: TPayload,
    context: WorkerExecutionContext,
  ) => Promise<void> | void;
  onFailed?: (
    error: unknown,
    payload: TPayload | undefined,
    context: WorkerExecutionContext,
  ) => Promise<void> | void;
}

export interface WorkerMetricsHooks {
  onJobStarted?: (event: WorkerMetricEvent) => Promise<void> | void;
  onJobCompleted?: (event: WorkerMetricEvent) => Promise<void> | void;
  onJobFailed?: (event: WorkerMetricEvent) => Promise<void> | void;
  onJobStalled?: (event: WorkerMetricEvent) => Promise<void> | void;
  onQueueWaiting?: (event: QueueMetricEvent) => Promise<void> | void;
  onQueueActive?: (event: QueueMetricEvent) => Promise<void> | void;
  onQueueDrained?: (event: QueueMetricEvent) => Promise<void> | void;
}

export interface WorkerMetricEvent {
  queueName: string;
  workerName: string;
  jobId?: string;
  jobName?: string;
  attemptNumber?: number;
  attemptsMade?: number;
  duration?: number;
  failedReason?: string;
}

export interface QueueMetricEvent {
  queueName: string;
  jobId?: string;
}

export interface RuntimeProcessor<TPayload = unknown> {
  readonly name: string;
  readonly schema?: z.ZodType<TPayload>;
  readonly policy?: WorkerExecutionPolicy;
  execute?: (
    payload: TPayload,
    job: Job,
    logger: Logger,
    signal?: AbortSignal,
  ) => Promise<ProcessorResult>;
  process?: (job: Job) => Promise<ProcessorResult>;
  getIdempotencyKey?: (payload: TPayload, job: Job) => string;
  sanitizePayload?: (payload: TPayload) => Record<string, unknown>;
  hooks?: WorkerRuntimeHooks<TPayload>;
}

/**
 * Base class for new workers.
 *
 * Business code supplies a schema plus an idempotent execute method. The shared
 * runtime owns validation, logging, retry classification, metrics, and shutdown.
 */
export abstract class BaseWorker<TPayload> implements RuntimeProcessor<TPayload> {
  public readonly name: string;
  public readonly schema: z.ZodType<TPayload>;
  public readonly policy?: WorkerExecutionPolicy;
  public readonly hooks?: WorkerRuntimeHooks<TPayload>;

  constructor(
    name: string,
    schema: z.ZodType<TPayload>,
    hooks?: WorkerRuntimeHooks<TPayload>,
    policy?: WorkerExecutionPolicy,
  ) {
    this.name = name;
    this.schema = schema;
    this.hooks = hooks;
    this.policy = policy;
  }

  abstract execute(
    payload: TPayload,
    job: Job,
    logger: Logger,
    signal?: AbortSignal,
  ): Promise<ProcessorResult>;

  protected async reportProgress(job: Job, progress: number): Promise<void> {
    const clamped = Math.min(100, Math.max(0, Math.round(progress)));
    await job.updateProgress(clamped);
  }

  public sanitizePayload(payload: TPayload): Record<string, unknown> {
    return payload as Record<string, unknown>;
  }

  public getIdempotencyKey(_payload: TPayload, job: Job): string {
    return `${job.queueName}:${job.name}:${job.id ?? "unknown"}`;
  }
}
