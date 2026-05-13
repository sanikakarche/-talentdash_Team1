import type { Job } from "bullmq";
import type { ProcessorResult, SitemapGenerationPayload } from "@talentdash/types";
import { SitemapGenerationPayloadSchema, REGION_CODES } from "@talentdash/types";
import { db } from "@talentdash/db";
import { BaseProcessor } from "../workers/base-processor.js";
import { uploadToR2 } from "../lib/r2.js";
import type { Logger } from "../lib/logger.js";

const MAX_URLS_PER_SITEMAP = 45_000; // Below 50k limit with margin
const BASE_URL = "https://talentdash.in";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

/**
 * Generates XML sitemaps and uploads to R2 for CDN serving.
 *
 * Structure:
 *   sitemaps/sitemap-index.xml      — master index
 *   sitemaps/companies-0.xml        — company pages
 *   sitemaps/salaries-0.xml         — salary pages
 *   sitemaps/reviews-0.xml          — review pages
 *   sitemaps/jobs-0.xml             — job listing pages
 *   sitemaps/forum-0.xml            — forum thread pages
 *
 * Each sitemap is split automatically when it exceeds 45k URLs.
 * All XML is gzip-compressed for R2 storage.
 */
export class SitemapGenerationProcessor extends BaseProcessor<SitemapGenerationPayload> {
  constructor() {
    super("sitemap-generation", SitemapGenerationPayloadSchema);
  }

  protected async execute(
    payload: SitemapGenerationPayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult> {
    const sitemapTypes =
      payload.sitemapType === "all"
        ? (["companies", "salaries", "reviews", "jobs", "forum"] as const)
        : [payload.sitemapType];

    const allSitemapKeys: string[] = [];
    let processedCount = 0;
    let errorCount = 0;

    for (const type of sitemapTypes) {
      try {
        const keys = await this.generateSitemapForType(type, payload.region, logger);
        allSitemapKeys.push(...keys);
        processedCount += keys.length;
      } catch (err) {
        logger.error(`Failed to generate sitemap: ${type}`, err);
        errorCount++;
      }

      await this.reportProgress(job, ((sitemapTypes.indexOf(type) + 1) / (sitemapTypes.length + 1)) * 100);
    }

    // Generate sitemap index
    const indexXml = this.buildSitemapIndex(allSitemapKeys);
    await uploadToR2("sitemaps/sitemap-index.xml", indexXml, {
      contentType: "application/xml",
      compress: true,
    });

    await this.reportProgress(job, 100);

    logger.info("Sitemap generation complete", {
      totalSitemaps: allSitemapKeys.length,
    });

    return {
      success: errorCount === 0,
      processedCount,
      errorCount,
      duration: 0,
      metadata: { sitemapCount: allSitemapKeys.length },
    };
  }

  private async generateSitemapForType(
    type: string,
    region: string | undefined,
    logger: Logger,
  ): Promise<string[]> {
    let urls: SitemapUrl[] = [];

    switch (type) {
      case "companies":
        urls = await this.getCompanyUrls(region);
        break;
      case "salaries":
        urls = await this.getSalaryUrls(region);
        break;
      case "reviews":
        urls = await this.getReviewUrls(region);
        break;
      case "jobs":
        urls = await this.getJobUrls(region);
        break;
      case "forum":
        urls = await this.getForumUrls(region);
        break;
    }

    // Split into chunks if exceeding max
    const keys: string[] = [];
    for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
      const chunk = urls.slice(i, i + MAX_URLS_PER_SITEMAP);
      const shardIndex = Math.floor(i / MAX_URLS_PER_SITEMAP);
      const key = `sitemaps/${type}-${shardIndex}.xml`;

      const xml = this.buildSitemapXml(chunk);
      await uploadToR2(key, xml, {
        contentType: "application/xml",
        compress: true,
      });

      keys.push(key);
    }

    logger.info(`Generated ${keys.length} sitemaps for ${type} (${urls.length} URLs)`);
    return keys;
  }

  private async getCompanyUrls(region?: string): Promise<SitemapUrl[]> {
    const companies = await db.company.findMany({
      where: {
        isPublic: true,
        ...(region ? { region: { has: region } } : {}),
      },
      select: { slug: true, updatedAt: true, region: true },
    });

    return companies.flatMap((c) => {
      const regions = region ? [region] : c.region;
      return regions.map((r) => ({
        loc: `${BASE_URL}${r === "global" ? "" : `/${r}`}/company/${c.slug}`,
        lastmod: c.updatedAt.toISOString().split("T")[0],
        changefreq: "weekly",
        priority: "0.8",
      }));
    });
  }

  private async getSalaryUrls(region?: string): Promise<SitemapUrl[]> {
    const aggregates = await db.salaryAggregate.findMany({
      where: region ? { region } : {},
      select: { role: true, location: true, region: true, updatedAt: true },
    });

    return aggregates.map((a) => ({
      loc: `${BASE_URL}${a.region === "global" ? "" : `/${a.region}`}/salaries/${encodeURIComponent(a.role.toLowerCase().replace(/\s+/g, "-"))}/${encodeURIComponent(a.location.toLowerCase().replace(/\s+/g, "-"))}`,
      lastmod: a.updatedAt.toISOString().split("T")[0],
      changefreq: "daily",
      priority: "0.9",
    }));
  }

  private async getReviewUrls(region?: string): Promise<SitemapUrl[]> {
    const companies = await db.company.findMany({
      where: {
        isPublic: true,
        ...(region ? { region: { has: region } } : {}),
        stats: { totalReviews: { gt: 0 } },
      },
      select: { slug: true, updatedAt: true },
    });

    return companies.map((c) => ({
      loc: `${BASE_URL}/company/${c.slug}/reviews`,
      lastmod: c.updatedAt.toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "0.7",
    }));
  }

  private async getJobUrls(region?: string): Promise<SitemapUrl[]> {
    const jobs = await db.jobListing.findMany({
      where: {
        isActive: true,
        ...(region ? { region } : {}),
      },
      select: { slug: true, createdAt: true },
    });

    return jobs.map((j) => ({
      loc: `${BASE_URL}/jobs/${j.slug}`,
      lastmod: j.createdAt.toISOString().split("T")[0],
      changefreq: "daily",
      priority: "0.6",
    }));
  }

  private async getForumUrls(region?: string): Promise<SitemapUrl[]> {
    const threads = await db.forumThread.findMany({
      where: region ? { region } : {},
      select: { slug: true, updatedAt: true },
    });

    return threads.map((t) => ({
      loc: `${BASE_URL}/forum/${t.slug}`,
      lastmod: t.updatedAt.toISOString().split("T")[0],
      changefreq: "daily",
      priority: "0.5",
    }));
  }

  private buildSitemapXml(urls: SitemapUrl[]): string {
    const entries = urls
      .map(
        (u) =>
          `  <url>\n    <loc>${this.escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
  }

  private buildSitemapIndex(sitemapKeys: string[]): string {
    const now = new Date().toISOString().split("T")[0];
    const entries = sitemapKeys
      .map(
        (key) =>
          `  <sitemap>\n    <loc>${BASE_URL}/${key}</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`,
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>`;
  }

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }
}
