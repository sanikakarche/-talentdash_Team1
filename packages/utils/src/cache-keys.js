export const CACHE_KEYS = {
    search: (query, filters, region) => `search:${query}:${filters}:${region}`,
    salaryAggregate: (role, level, location) => `salary-agg:${role}:${level}:${location}`,
    salaryHeatmap: (role, region) => `salary-heatmap:${role}:${region}`,
    forumTrending: (region) => `forum:trending:${region}`,
    offerComparison: (userId, comparisonId) => `offer-compare:${userId}:${comparisonId}`,
    toolUsage: (tool) => `tool-usage:${tool}`,
    rateLimit: (ip, route) => `rate-limit:${ip}:${route}`,
    // ---------------------------------------------------------------------------
    // Added for background jobs platform
    // ---------------------------------------------------------------------------
    companyStats: (companyId) => `company-stats:${companyId}`,
    ranking: (category, region, year, month) => `ranking:${category}:${region}:${year}:${month}`,
    searchIndex: (version) => `search-index:${version}`,
    sitemapManifest: (region) => `sitemap:${region}`,
};
//# sourceMappingURL=cache-keys.js.map