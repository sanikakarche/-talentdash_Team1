import type { Job } from "bullmq";

import { BaseProcessor } from "../workers/base-processor.js";

import type { Logger } from "../lib/logger.js";

import { regeneratePage } from "../regeneration/page-regenerator.js";

import type { ProcessorResult } from "@talentdash/types";

import type { RegenerationJobPayload } from "../types/regeneration.js";

export class PageRegenerationProcessor extends BaseProcessor<RegenerationJobPayload> {
  constructor() {
    super("page-regeneration", null as never);
  }

  protected async execute(
    payload: RegenerationJobPayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult> {
    logger.info("Starting page regeneration", {
      payload,
    });

    await regeneratePage(payload.pageType, payload.slug);

    await this.reportProgress(job, 100);

    logger.info("Page regeneration completed", {
      payload,
    });

    return {
      success: true,
      processedCount: 1,
      errorCount: 0,
      duration: 0,
    };
  }
}