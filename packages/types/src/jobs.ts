import { z } from "zod";

// ---------------------------------------------------------------------------
// Queue names — single source of truth
// ---------------------------------------------------------------------------

export const QUEUE_NAMES = [
  "salary-aggregation",
  "company-stats",
  "ranking-recompute",
  "search-indexing",
  "sitemap-generation",
  "page-regeneration",
  "ai-enrichment",
  "heatmap-recompute",
] as const;

export type QueueName = (typeof QUEUE_NAMES)[number];

// ---------------------------------------------------------------------------
// Job statuses
// ---------------------------------------------------------------------------

export const JOB_STATUSES = [
  "waiting",
  "active",
  "completed",
  "failed",
  "delayed",
  "stalled",
] as const;

export type JobStatusType = (typeof JOB_STATUSES)[number];

// ---------------------------------------------------------------------------
// Payload schemas — every queue has a validated payload
// ---------------------------------------------------------------------------

export const SalaryAggregationPayloadSchema = z.object({
  region: z.string().optional(),
  role: z.string().optional(),
  location: z.string().optional(),
  companyId: z.string().optional(),
  changedSince: z.coerce.date().optional(),
  forceFullRecompute: z.boolean().default(false),
  triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});

export type SalaryAggregationPayload = z.infer<
  typeof SalaryAggregationPayloadSchema
>;

export const CompanyStatsPayloadSchema = z.object({
  companyId: z.string().optional(),
  region: z.string().optional(),
  triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});

export type CompanyStatsPayload = z.infer<
  typeof CompanyStatsPayloadSchema
>;

export const RankingRecomputePayloadSchema = z.object({
  category: z
    .enum([
      "OVERALL",
      "WLB",
      "BEST_PAYING",
      "MILLENNIALS",
      "GEN_Z",
      "MOST_LOVED",
    ])
    .optional(),
  region: z.string().optional(),
  year: z.number().int().optional(),
  month: z.number().int().min(1).max(12).optional(),
  triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});

export type RankingRecomputePayload = z.infer<
  typeof RankingRecomputePayloadSchema
>;

export const SearchIndexingPayloadSchema = z.object({
  entityType: z
    .enum(["company", "role", "location", "forum-thread", "all"])
    .default("all"),
  incremental: z.boolean().default(true),
  region: z.string().optional(),
  triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});

export type SearchIndexingPayload = z.infer<
  typeof SearchIndexingPayloadSchema
>;

export const SitemapGenerationPayloadSchema = z.object({
  region: z.string().optional(),
  sitemapType: z
    .enum([
      "companies",
      "salaries",
      "reviews",
      "jobs",
      "forum",
      "all",
    ])
    .default("all"),
  triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});

export type SitemapGenerationPayload = z.infer<
  typeof SitemapGenerationPayloadSchema
>;

export const PageRegenerationPayloadSchema = z.object({
  pageType: z.string(),
  slug: z.string(),
  region: z.string(),
  priority: z.number().int().min(1).max(10).default(5),
  triggeredBy: z.enum(["job", "manual", "event"]).default("job"),
});

export type PageRegenerationPayload = z.infer<
  typeof PageRegenerationPayloadSchema
>;

export const AIEnrichmentPayloadSchema = z.object({
  entityType: z.enum(["company", "review", "job-listing"]),
  entityId: z.string(),
  enrichmentType: z.enum([
    "summary-generation",
    "sentiment-analysis",
    "skill-extraction",
  ]),
  forceReprocess: z.boolean().default(false),
  triggeredBy: z.enum(["cron", "manual", "event"]).default("event"),
});

export type AIEnrichmentPayload = z.infer<
  typeof AIEnrichmentPayloadSchema
>;

export const HeatmapRecomputePayloadSchema = z.object({
  region: z.string().optional(),
  role: z.string().optional(),
  triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});

export type HeatmapRecomputePayload = z.infer<
  typeof HeatmapRecomputePayloadSchema
>;

// ---------------------------------------------------------------------------
// Payload type map — maps queue names to their payload types
// ---------------------------------------------------------------------------

export interface QueuePayloadMap {
  "salary-aggregation": SalaryAggregationPayload;
  "company-stats": CompanyStatsPayload;
  "ranking-recompute": RankingRecomputePayload;
  "search-indexing": SearchIndexingPayload;
  "sitemap-generation": SitemapGenerationPayload;
  "page-regeneration": PageRegenerationPayload;
  "ai-enrichment": AIEnrichmentPayload;
  "heatmap-recompute": HeatmapRecomputePayload;
}

export const QUEUE_PAYLOAD_SCHEMAS: Record<
  QueueName,
  z.ZodType
> = {
  "salary-aggregation": SalaryAggregationPayloadSchema,
  "company-stats": CompanyStatsPayloadSchema,
  "ranking-recompute": RankingRecomputePayloadSchema,
  "search-indexing": SearchIndexingPayloadSchema,
  "sitemap-generation": SitemapGenerationPayloadSchema,
  "page-regeneration": PageRegenerationPayloadSchema,
  "ai-enrichment": AIEnrichmentPayloadSchema,
  "heatmap-recompute": HeatmapRecomputePayloadSchema,
};

// ---------------------------------------------------------------------------
// Processor result
// ---------------------------------------------------------------------------

export interface ProcessorResult {
  success: boolean;
  processedCount: number;
  errorCount: number;
  duration: number;
  metadata?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Queue configuration
// ---------------------------------------------------------------------------

export interface QueueConfig {
  name: QueueName;
  concurrency: number;
  maxRetries: number;
  backoffType: "exponential" | "fixed";
  backoffDelay: number;
  removeOnComplete: number | boolean;
  removeOnFail: number | boolean;
  rateLimiter?: {
    max: number;
    duration: number;
  };
  cron?: string;
  cronDescription?: string;
}