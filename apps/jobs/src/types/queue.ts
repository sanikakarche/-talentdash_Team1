export const QUEUE_NAMES = {
  PAGE_GENERATION: "page-generation",

  SALARY_AGGREGATION: "salary-aggregation",

  SITEMAP_GENERATION: "sitemap-generation",

  AI_ENRICHMENT: "ai-enrichment",

  WORKPLACE_RANKING: "workplace-ranking",

  JOB_SCRAPING: "job-scraping",

  DEDUPLICATION: "deduplication",

  FORUM_TRENDING: "forum-trending",
} as const;

export type QueueName =
  (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];