export const CACHE_TAGS = {
  company: (slug: string) =>
    `company:${slug}`,

  salary: (
    role: string,
    location: string,
    region: string,
  ) =>
    `salary:${role}:${location}:${region}`,

  review: (companyId: string) =>
    `review:${companyId}`,

  forum: (threadId: string) =>
    `forum:${threadId}`,

  ranking: (
    category: string,
    region: string,
  ) =>
    `ranking:${category}:${region}`,

  heatmap: (
    role: string,
    region: string,
  ) =>
    `heatmap:${role}:${region}`,
} as const;