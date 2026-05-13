import { z } from "zod";
export declare const QUEUE_NAMES: readonly ["salary-aggregation", "company-stats", "ranking-recompute", "search-indexing", "sitemap-generation", "page-regeneration", "ai-enrichment", "heatmap-recompute"];
export type QueueName = (typeof QUEUE_NAMES)[number];
export declare const JOB_STATUSES: readonly ["waiting", "active", "completed", "failed", "delayed", "stalled"];
export type JobStatusType = (typeof JOB_STATUSES)[number];
export declare const SalaryAggregationPayloadSchema: z.ZodObject<{
    region: z.ZodOptional<z.ZodString>;
    forceFullRecompute: z.ZodDefault<z.ZodBoolean>;
    triggeredBy: z.ZodDefault<z.ZodEnum<{
        cron: "cron";
        manual: "manual";
        event: "event";
    }>>;
}, z.core.$strip>;
export type SalaryAggregationPayload = z.infer<typeof SalaryAggregationPayloadSchema>;
export declare const CompanyStatsPayloadSchema: z.ZodObject<{
    companyId: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    triggeredBy: z.ZodDefault<z.ZodEnum<{
        cron: "cron";
        manual: "manual";
        event: "event";
    }>>;
}, z.core.$strip>;
export type CompanyStatsPayload = z.infer<typeof CompanyStatsPayloadSchema>;
export declare const RankingRecomputePayloadSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<{
        OVERALL: "OVERALL";
        WLB: "WLB";
        BEST_PAYING: "BEST_PAYING";
        MILLENNIALS: "MILLENNIALS";
        GEN_Z: "GEN_Z";
        MOST_LOVED: "MOST_LOVED";
    }>>;
    region: z.ZodOptional<z.ZodString>;
    year: z.ZodOptional<z.ZodNumber>;
    month: z.ZodOptional<z.ZodNumber>;
    triggeredBy: z.ZodDefault<z.ZodEnum<{
        cron: "cron";
        manual: "manual";
        event: "event";
    }>>;
}, z.core.$strip>;
export type RankingRecomputePayload = z.infer<typeof RankingRecomputePayloadSchema>;
export declare const SearchIndexingPayloadSchema: z.ZodObject<{
    entityType: z.ZodDefault<z.ZodEnum<{
        company: "company";
        role: "role";
        location: "location";
        "forum-thread": "forum-thread";
        all: "all";
    }>>;
    incremental: z.ZodDefault<z.ZodBoolean>;
    region: z.ZodOptional<z.ZodString>;
    triggeredBy: z.ZodDefault<z.ZodEnum<{
        cron: "cron";
        manual: "manual";
        event: "event";
    }>>;
}, z.core.$strip>;
export type SearchIndexingPayload = z.infer<typeof SearchIndexingPayloadSchema>;
export declare const SitemapGenerationPayloadSchema: z.ZodObject<{
    region: z.ZodOptional<z.ZodString>;
    sitemapType: z.ZodDefault<z.ZodEnum<{
        all: "all";
        companies: "companies";
        salaries: "salaries";
        reviews: "reviews";
        jobs: "jobs";
        forum: "forum";
    }>>;
    triggeredBy: z.ZodDefault<z.ZodEnum<{
        cron: "cron";
        manual: "manual";
        event: "event";
    }>>;
}, z.core.$strip>;
export type SitemapGenerationPayload = z.infer<typeof SitemapGenerationPayloadSchema>;
export declare const PageRegenerationPayloadSchema: z.ZodObject<{
    pageType: z.ZodString;
    slug: z.ZodString;
    region: z.ZodString;
    priority: z.ZodDefault<z.ZodNumber>;
    triggeredBy: z.ZodDefault<z.ZodEnum<{
        manual: "manual";
        event: "event";
        job: "job";
    }>>;
}, z.core.$strip>;
export type PageRegenerationPayload = z.infer<typeof PageRegenerationPayloadSchema>;
export declare const AIEnrichmentPayloadSchema: z.ZodObject<{
    entityType: z.ZodEnum<{
        company: "company";
        review: "review";
        "job-listing": "job-listing";
    }>;
    entityId: z.ZodString;
    enrichmentType: z.ZodEnum<{
        "summary-generation": "summary-generation";
        "sentiment-analysis": "sentiment-analysis";
        "skill-extraction": "skill-extraction";
    }>;
    forceReprocess: z.ZodDefault<z.ZodBoolean>;
    triggeredBy: z.ZodDefault<z.ZodEnum<{
        cron: "cron";
        manual: "manual";
        event: "event";
    }>>;
}, z.core.$strip>;
export type AIEnrichmentPayload = z.infer<typeof AIEnrichmentPayloadSchema>;
export declare const HeatmapRecomputePayloadSchema: z.ZodObject<{
    region: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    triggeredBy: z.ZodDefault<z.ZodEnum<{
        cron: "cron";
        manual: "manual";
        event: "event";
    }>>;
}, z.core.$strip>;
export type HeatmapRecomputePayload = z.infer<typeof HeatmapRecomputePayloadSchema>;
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
export declare const QUEUE_PAYLOAD_SCHEMAS: Record<QueueName, z.ZodType>;
export interface ProcessorResult {
    success: boolean;
    processedCount: number;
    errorCount: number;
    duration: number;
    metadata?: Record<string, unknown>;
}
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
//# sourceMappingURL=jobs.d.ts.map