export const CACHE_KEYS = {
  search: (
    query: string,
    filters: string,
    region: string,
  ) =>
    `search:${query}:${filters}:${region}`,

  salaryAggregate: (
    role: string,
    level: string,
    location: string,
  ) =>
    `salary-agg:${role}:${level}:${location}`,

  salaryHeatmap: (
    role: string,
    region: string,
  ) =>
    `salary-heatmap:${role}:${region}`,

  forumTrending: (
    region: string,
  ) =>
    `forum:trending:${region}`,

  offerComparison: (
    userId: string,
    comparisonId: string,
  ) =>
    `offer-compare:${userId}:${comparisonId}`,

  toolUsage: (
    tool: string,
  ) =>
    `tool-usage:${tool}`,

  rateLimit: (
    ip: string,
    route: string,
  ) =>
    `rate-limit:${ip}:${route}`,

  // ---------------------------------------------------------------------------
  // Added for background jobs platform
  // ---------------------------------------------------------------------------

  companyStats: (
    companyId: string,
  ) =>
    `company-stats:${companyId}`,

  ranking: (
    category: string,
    region: string,
    year: number,
    month: number,
  ) =>
    `ranking:${category}:${region}:${year}:${month}`,

  searchIndex: (
    version: string,
  ) =>
    `search-index:${version}`,

  sitemapManifest: (
    region: string,
  ) =>
    `sitemap:${region}`,
} as const;