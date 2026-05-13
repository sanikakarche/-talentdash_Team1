export const CACHE_TAGS = {
    company: (slug) => `company:${slug}`,
    salary: (role, location, region) => `salary:${role}:${location}:${region}`,
    review: (companyId) => `review:${companyId}`,
    forum: (threadId) => `forum:${threadId}`,
    ranking: (category, region) => `ranking:${category}:${region}`,
    heatmap: (role, region) => `heatmap:${role}:${region}`,
};
//# sourceMappingURL=cache-tags.js.map