export declare const CACHE_KEYS: {
    readonly search: (query: string, filters: string, region: string) => string;
    readonly salaryAggregate: (role: string, level: string, location: string) => string;
    readonly salaryHeatmap: (role: string, region: string) => string;
    readonly forumTrending: (region: string) => string;
    readonly offerComparison: (userId: string, comparisonId: string) => string;
    readonly toolUsage: (tool: string) => string;
    readonly rateLimit: (ip: string, route: string) => string;
    readonly companyStats: (companyId: string) => string;
    readonly ranking: (category: string, region: string, year: number, month: number) => string;
    readonly searchIndex: (version: string) => string;
    readonly sitemapManifest: (region: string) => string;
};
//# sourceMappingURL=cache-keys.d.ts.map