import type { Job } from "bullmq";

import type {
  ProcessorResult,
  SalaryAggregationPayload,
} from "@talentdash/types";

import { SalaryAggregationPayloadSchema } from "@talentdash/types";

import { BaseProcessor } from "../workers/base-processor.js";

import type { Logger } from "../lib/logger.js";

import { runSalaryAggregation } from "../jobs/salary-aggregator.js";

export class SalaryAggregationProcessor extends BaseProcessor<SalaryAggregationPayload> {
  constructor() {
    super("salary-aggregation", SalaryAggregationPayloadSchema);
  }

  protected async execute(
    payload: SalaryAggregationPayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult> {
    const startTime = Date.now();

    logger.info("Starting salary aggregation processor", {
      payload,
    });

    await runSalaryAggregation();

    await this.reportProgress(job, 100);

    logger.info("Salary aggregation processor completed");

    return {
      success: true,
      processedCount: 1,
      errorCount: 0,
      duration: Date.now() - startTime,
      metadata: {
        queue: "salary-aggregation",
      },
    };
  }
}