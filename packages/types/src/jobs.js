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
];
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
];
// ---------------------------------------------------------------------------
// Payload schemas — every queue has a validated payload
// ---------------------------------------------------------------------------
export const SalaryAggregationPayloadSchema = z.object({
    region: z.string().optional(),
    forceFullRecompute: z.boolean().default(false),
    triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});
export const CompanyStatsPayloadSchema = z.object({
    companyId: z.string().optional(),
    region: z.string().optional(),
    triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});
export const RankingRecomputePayloadSchema = z.object({
    category: z
        .enum(["OVERALL", "WLB", "BEST_PAYING", "MILLENNIALS", "GEN_Z", "MOST_LOVED"])
        .optional(),
    region: z.string().optional(),
    year: z.number().int().optional(),
    month: z.number().int().min(1).max(12).optional(),
    triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});
export const SearchIndexingPayloadSchema = z.object({
    entityType: z
        .enum(["company", "role", "location", "forum-thread", "all"])
        .default("all"),
    incremental: z.boolean().default(true),
    region: z.string().optional(),
    triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});
export const SitemapGenerationPayloadSchema = z.object({
    region: z.string().optional(),
    sitemapType: z
        .enum(["companies", "salaries", "reviews", "jobs", "forum", "all"])
        .default("all"),
    triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});
export const PageRegenerationPayloadSchema = z.object({
    pageType: z.string(),
    slug: z.string(),
    region: z.string(),
    priority: z.number().int().min(1).max(10).default(5),
    triggeredBy: z.enum(["job", "manual", "event"]).default("job"),
});
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
export const HeatmapRecomputePayloadSchema = z.object({
    region: z.string().optional(),
    role: z.string().optional(),
    triggeredBy: z.enum(["cron", "manual", "event"]).default("cron"),
});
export const QUEUE_PAYLOAD_SCHEMAS = {
    "salary-aggregation": SalaryAggregationPayloadSchema,
    "company-stats": CompanyStatsPayloadSchema,
    "ranking-recompute": RankingRecomputePayloadSchema,
    "search-indexing": SearchIndexingPayloadSchema,
    "sitemap-generation": SitemapGenerationPayloadSchema,
    "page-regeneration": PageRegenerationPayloadSchema,
    "ai-enrichment": AIEnrichmentPayloadSchema,
    "heatmap-recompute": HeatmapRecomputePayloadSchema,
};
//# sourceMappingURL=jobs.js.map