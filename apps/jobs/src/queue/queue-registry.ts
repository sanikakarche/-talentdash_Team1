import { Queue } from "bullmq";
import { getRedis } from "../config/redis";
import { getLogger } from "../config/logger";

/**
 * Queue Registry
 *
 * WHY: Single source of truth for all queue instances
 * WHAT: Create, register, and manage BullMQ queues
 * PATTERN: Register queues at startup, workers attach to them
 * SCALE: Supports N job types with independent concurrency
 */

export enum JobType {
  RECOMPUTE_SALARY_AGGREGATES = "recompute-salary-aggregates",
  RECOMPUTE_SALARY_HEATMAP = "recompute-salary-heatmap",
  SYNC_COMPANY_DATA = "sync-company-data",
  GENERATE_SITEMAPS = "generate-sitemaps",
}

interface QueueConfig {
  name: JobType;
  defaultJobOptions: {
    attempts: number;
    backoff: {
      type: "exponential";
      delay: number;
    };
    removeOnComplete: {
      age: number;
    };
  };
}

const queueConfigs: Record<JobType, QueueConfig> = {
  [JobType.RECOMPUTE_SALARY_AGGREGATES]: {
    name: JobType.RECOMPUTE_SALARY_AGGREGATES,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: {
        age: 3600, // 1 hour
      },
    },
  },
  [JobType.RECOMPUTE_SALARY_HEATMAP]: {
    name: JobType.RECOMPUTE_SALARY_HEATMAP,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: {
        age: 3600,
      },
    },
  },
  [JobType.SYNC_COMPANY_DATA]: {
    name: JobType.SYNC_COMPANY_DATA,
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 10000,
      },
      removeOnComplete: {
        age: 86400, // 24 hours
      },
    },
  },
  [JobType.GENERATE_SITEMAPS]: {
    name: JobType.GENERATE_SITEMAPS,
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 10000,
      },
      removeOnComplete: {
        age: 86400,
      },
    },
  },
};

class QueueRegistry {
  private queues: Map<JobType, Queue> = new Map();
  private logger = getLogger();

  async initialize(): Promise<void> {
    const redis = await getRedis();

    for (const [jobType, config] of Object.entries(queueConfigs)) {
      const queue = new Queue(config.name, {
        connection: redis,
        defaultJobOptions: config.defaultJobOptions,
      });

      this.queues.set(jobType as JobType, queue);
      this.logger.info(`Queue registered: ${jobType}`);
    }
  }

  getQueue(jobType: JobType): Queue {
    const queue = this.queues.get(jobType);
    if (!queue) {
      throw new Error(`Queue not found: ${jobType}`);
    }
    return queue;
  }

  getAllQueues(): Queue[] {
    return Array.from(this.queues.values());
  }

  async close(): Promise<void> {
    const promises = Array.from(this.queues.values()).map((queue) =>
      queue.close()
    );
    await Promise.all(promises);
    this.logger.info("All queues closed");
  }
}

let registry: QueueRegistry | null = null;

export async function initializeQueueRegistry(): Promise<QueueRegistry> {
  if (registry) {
    return registry;
  }

  registry = new QueueRegistry();
  await registry.initialize();
  return registry;
}

export function getQueueRegistry(): QueueRegistry {
  if (!registry) {
    throw new Error("Queue registry not initialized. Call initializeQueueRegistry()");
  }
  return registry;
}

export async function closeQueueRegistry(): Promise<void> {
  if (registry) {
    await registry.close();
    registry = null;
  }
}
