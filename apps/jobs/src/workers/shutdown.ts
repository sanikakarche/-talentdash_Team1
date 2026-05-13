import type { Queue, QueueEvents, Worker } from "bullmq";
import { createLogger } from "../lib/logger.js";

const logger = createLogger("talentdash-jobs", { component: "shutdown-manager" });

type Closable = {
  name: string;
  close: () => Promise<unknown>;
};

export class ShutdownManager {
  private static workers: Set<Worker> = new Set();
  private static resources: Set<Closable> = new Set();
  private static shuttingDown = false;
  private static hooksInstalled = false;
  private static shutdownPromise: Promise<void> | null = null;

  static registerWorker(worker: Worker): void {
    this.workers.add(worker);
  }

  static unregisterWorker(worker: Worker): void {
    this.workers.delete(worker);
  }

  static registerQueue(queue: Queue): void {
    this.resources.add(queue);
  }

  static registerQueueEvents(events: QueueEvents): void {
    this.resources.add(events);
  }

  static isShuttingDown(): boolean {
    return this.shuttingDown;
  }

  static async gracefulShutdown(): Promise<void> {
    if (this.shutdownPromise) return this.shutdownPromise;
    this.shuttingDown = true;
    this.shutdownPromise = this.drain();
    return this.shutdownPromise;
  }

  private static async drain(): Promise<void> {

    logger.info("Graceful shutdown initiated", {
      activeWorkers: this.workers.size,
      resources: this.resources.size,
    });

    await Promise.allSettled(
      Array.from(this.workers).map(async (worker) => {
        try {
          await worker.close();
          this.unregisterWorker(worker);
          logger.info("Worker stopped", { workerName: worker.name });
        } catch (err) {
          logger.error("Error stopping worker", err, { workerName: worker.name });
        }
      }),
    );

    await Promise.allSettled(
      Array.from(this.resources).map(async (resource) => {
        try {
          await resource.close();
          this.resources.delete(resource);
          logger.info("Worker runtime resource closed", { resourceName: resource.name });
        } catch (err) {
          logger.error("Error closing worker runtime resource", err, {
            resourceName: resource.name,
          });
        }
      }),
    );

    logger.info("Worker runtime shutdown complete");
  }

  static setupHooks(onShutdownComplete?: () => Promise<void>): void {
    if (this.hooksInstalled) return;
    this.hooksInstalled = true;

    const handler = async (signal: string) => {
      logger.info(`Received ${signal}`);
      await this.gracefulShutdown();
      if (onShutdownComplete) {
        await onShutdownComplete();
      }
      process.exit(0);
    };

    process.once("SIGTERM", () => handler("SIGTERM"));
    process.once("SIGINT", () => handler("SIGINT"));
  }
}
