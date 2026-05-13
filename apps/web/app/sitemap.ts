import type {
  MetadataRoute,
} from "next";

export default function sitemap():
  MetadataRoute.Sitemap {
  const sections = [
    "companies",
    "salaries",
    "reviews",
    "interviews",
    "jobs",
    "forum",
    "workplace-index",
    "tools",
  ];

  return sections.map(
    (section) => ({
      url: `https://talentdash.com/sitemap-${section}.xml`,

      lastModified:
        new Date(),

      changeFrequency:
        "daily",

      priority: 1,
    }),
  );
}