export const CACHE_HEADERS = {
  company: {
    "Cache-Control":
      "public, max-age=86400, s-maxage=86400",
  },

  salary: {
    "Cache-Control":
      "public, max-age=43200, s-maxage=43200",
  },

  review: {
    "Cache-Control":
      "public, max-age=43200",
  },

  interview: {
    "Cache-Control":
      "public, max-age=86400",
  },

  jobs: {
    "Cache-Control":
      "public, max-age=7200",
  },

  forum: {
    "Cache-Control":
      "public, max-age=1800, stale-while-revalidate=3600",
  },

  workplace: {
    "Cache-Control":
      "public, max-age=86400",
  },

  heatmap: {
    "Cache-Control":
      "public, max-age=43200",
  },

  tools: {
    "Cache-Control":
      "public, max-age=604800",
  },

  homepage: {
    "Cache-Control":
      "public, s-maxage=3600",
  },

  search: {
    "Cache-Control":
      "no-store",
  },

  admin: {
    "Cache-Control":
      "no-store, private",
  },

  api: {
    "Cache-Control":
      "no-store",
  },
} as const;