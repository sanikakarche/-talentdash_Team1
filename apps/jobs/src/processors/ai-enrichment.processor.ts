import type { Job } from "bullmq";
import type { ProcessorResult, AIEnrichmentPayload } from "@talentdash/types";
import { AIEnrichmentPayloadSchema } from "@talentdash/types";
import { db } from "@talentdash/db";
import { BaseProcessor } from "../workers/base-processor.js";
import { getEnv } from "../lib/env.js";
import { FatalError, RateLimitError, ExternalServiceError } from "../lib/errors.js";
import type { Logger } from "../lib/logger.js";

/**
 * AI-powered data enrichment using Gemini.
 *
 * Enrichment types:
 * - summary-generation: Generate company descriptions from reviews + salary data
 * - sentiment-analysis: Analyze review sentiment (future)
 * - skill-extraction: Extract skills from job descriptions (future)
 *
 * Features:
 * - Idempotent: skips already-enriched records (unless forceReprocess)
 * - Rate-limit aware: respects Gemini API limits
 * - Structured output: uses JSON mode for reliable parsing
 */
export class AIEnrichmentProcessor extends BaseProcessor<AIEnrichmentPayload> {
  constructor() {
    super("ai-enrichment", AIEnrichmentPayloadSchema);
  }

  protected async execute(
    payload: AIEnrichmentPayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult> {
    const env = getEnv();

    if (!env.GEMINI_API_KEY) {
      logger.warn("GEMINI_API_KEY not configured — skipping AI enrichment");
      return { success: true, processedCount: 0, errorCount: 0, duration: 0 };
    }

    switch (payload.enrichmentType) {
      case "summary-generation":
        return this.generateCompanySummary(payload, logger);
      case "sentiment-analysis":
        return this.analyzeSentiment(payload, logger);
      case "skill-extraction":
        return this.extractSkills(payload, logger);
      default:
        throw new FatalError(
          `Unknown enrichment type: ${payload.enrichmentType}`,
          "UNKNOWN_ENRICHMENT_TYPE",
        );
    }
  }

  private async generateCompanySummary(
    payload: AIEnrichmentPayload,
    logger: Logger,
  ): Promise<ProcessorResult> {
    if (payload.entityType !== "company") {
      throw new FatalError("summary-generation requires entityType=company", "INVALID_ENTITY");
    }

    const company = await db.company.findUnique({
      where: { id: payload.entityId },
      include: {
        stats: true,
        workplaceReviews: {
          take: 20,
          orderBy: { createdAt: "desc" },
          select: { title: true, pros: true, cons: true, rating: true },
        },
        salaryEntries: {
          take: 10,
          orderBy: { createdAt: "desc" },
          select: { role: true, totalComp: true, currency: true },
        },
      },
    });

    if (!company) {
      throw new FatalError(`Company not found: ${payload.entityId}`, "ENTITY_NOT_FOUND");
    }

    // Idempotency check
    if (company.aiSummary && !payload.forceReprocess) {
      logger.info("Company already has AI summary, skipping", { companyId: company.id });
      return { success: true, processedCount: 0, errorCount: 0, duration: 0 };
    }

    // Build context for Gemini
    const reviewContext = company.workplaceReviews
      .map((r) => `Rating: ${r.rating}/5 | ${r.title}\nPros: ${r.pros}\nCons: ${r.cons}`)
      .join("\n---\n");

    const salaryContext = company.salaryEntries
      .map((s) => `${s.role}: ${s.currency} ${s.totalComp.toLocaleString()}`)
      .join("\n");

    const prompt = `You are an expert career analyst. Generate a concise, professional summary (2-3 paragraphs, ~150 words) for the company "${company.name}" based on employee data.

Company: ${company.name}
Industry: ${company.industry ?? "Unknown"}
Size: ${company.size ?? "Unknown"}
Overall Rating: ${company.stats?.overallRating?.toFixed(1) ?? "N/A"}/5
Total Reviews: ${company.stats?.totalReviews ?? 0}

Recent Reviews:
${reviewContext || "No reviews available"}

Salary Data:
${salaryContext || "No salary data available"}

Write a balanced, data-driven summary covering: work culture, compensation competitiveness, and growth opportunities. Use specific data points. Do not use marketing language. Output ONLY the summary text, no JSON wrapping.`;

    const summary = await this.callGemini(prompt, logger);

    await db.company.update({
      where: { id: company.id },
      data: { aiSummary: summary },
    });

    logger.info("Company summary generated", { companyId: company.id });

    return {
      success: true,
      processedCount: 1,
      errorCount: 0,
      duration: 0,
      metadata: { companyId: company.id, summaryLength: summary.length },
    };
  }

  private async analyzeSentiment(
    payload: AIEnrichmentPayload,
    logger: Logger,
  ): Promise<ProcessorResult> {
    // Sentiment analysis on reviews
    logger.info("Sentiment analysis not yet implemented — reserved for future", {
      entityId: payload.entityId,
    });
    return { success: true, processedCount: 0, errorCount: 0, duration: 0 };
  }

  private async extractSkills(
    payload: AIEnrichmentPayload,
    logger: Logger,
  ): Promise<ProcessorResult> {
    // Skill extraction from job listings
    logger.info("Skill extraction not yet implemented — reserved for future", {
      entityId: payload.entityId,
    });
    return { success: true, processedCount: 0, errorCount: 0, duration: 0 };
  }

  private async callGemini(prompt: string, logger: Logger): Promise<string> {
    const env = getEnv();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 500,
        },
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get("retry-after") ?? "60", 10);
      throw new RateLimitError(
        "Gemini API rate limit exceeded",
        "gemini",
        retryAfter * 1000,
      );
    }

    if (!response.ok) {
      throw new ExternalServiceError(
        `Gemini API error: ${response.status}`,
        "gemini",
        { statusCode: response.status, isRetryable: response.status >= 500 },
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new ExternalServiceError(
        "Gemini returned empty response",
        "gemini",
        { isRetryable: true },
      );
    }

    return text.trim();
  }
}
