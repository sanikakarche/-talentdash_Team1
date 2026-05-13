import type { Job } from "bullmq";
import type { ProcessorResult, SearchIndexingPayload } from "@talentdash/types";
import { SearchIndexingPayloadSchema } from "@talentdash/types";
import { db } from "@talentdash/db";
import { BaseProcessor } from "../workers/base-processor.js";
import { uploadToR2 } from "../lib/r2.js";
import type { Logger } from "../lib/logger.js";

const BATCH_SIZE = 500;

interface SearchDocument {
  id: string;
  type: "company" | "role" | "location" | "forum-thread";
  title: string;
  subtitle?: string;
  description?: string;
  slug: string;
  region: string[];
  keywords: string[];
  score: number;
}

interface SearchManifest {
  version: string;
  generatedAt: string;
  totalDocuments: number;
  shards: string[];
}

/**
 * Builds search indices from database entities and uploads JSON to R2.
 *
 * The frontend loads these manifests client-side for fast, CDN-served search
 * without any request-time computation. Shards keep payloads manageable.
 */
export class SearchIndexingProcessor extends BaseProcessor<SearchIndexingPayload> {
  constructor() {
    super("search-indexing", SearchIndexingPayloadSchema);
  }

  protected async execute(
    payload: SearchIndexingPayload,
    job: Job,
    logger: Logger,
  ): Promise<ProcessorResult> {
    const version = new Date().toISOString().replace(/[:.]/g, "-");
    const documents: SearchDocument[] = [];
    let errorCount = 0;

    const entityTypes =
      payload.entityType === "all"
        ? (["company", "role", "location", "forum-thread"] as const)
        : [payload.entityType];

    let stepsDone = 0;
    const totalSteps = entityTypes.length + 1; // +1 for upload step

    for (const type of entityTypes) {
      try {
        const docs = await this.indexEntityType(type, payload.region, logger);
        documents.push(...docs);
      } catch (err) {
        logger.error(`Failed to index entity type: ${type}`, err);
        errorCount++;
      }
      stepsDone++;
      await this.reportProgress(job, (stepsDone / totalSteps) * 100);
    }

    // Shard documents (max 1000 per shard for fast client-side load)
    const SHARD_SIZE = 1000;
    const shards: string[] = [];

    for (let i = 0; i < documents.length; i += SHARD_SIZE) {
      const shardDocs = documents.slice(i, i + SHARD_SIZE);
      const shardKey = `search/v1/${version}/shard-${Math.floor(i / SHARD_SIZE)}.json`;

      await uploadToR2(shardKey, JSON.stringify(shardDocs), {
        contentType: "application/json",
        compress: true,
        metadata: { version, docCount: String(shardDocs.length) },
      });

      shards.push(shardKey);
    }

    // Upload manifest
    const manifest: SearchManifest = {
      version,
      generatedAt: new Date().toISOString(),
      totalDocuments: documents.length,
      shards,
    };

    await uploadToR2("search/v1/manifest.json", JSON.stringify(manifest), {
      contentType: "application/json",
    });

    await this.reportProgress(job, 100);

    logger.info("Search index built", {
      version,
      totalDocuments: documents.length,
      shardCount: shards.length,
    });

    return {
      success: errorCount === 0,
      processedCount: documents.length,
      errorCount,
      duration: 0,
      metadata: { version, shardCount: shards.length },
    };
  }

  private async indexEntityType(
    type: "company" | "role" | "location" | "forum-thread",
    region: string | undefined,
    logger: Logger,
  ): Promise<SearchDocument[]> {
    switch (type) {
      case "company":
        return this.indexCompanies(region, logger);
      case "role":
        return this.indexRoles(region, logger);
      case "location":
        return this.indexLocations(region, logger);
      case "forum-thread":
        return this.indexForumThreads(region, logger);
    }
  }

  private async indexCompanies(region: string | undefined, logger: Logger): Promise<SearchDocument[]> {
    const docs: SearchDocument[] = [];
    let cursor: string | undefined;

    while (true) {
      const companies = await db.company.findMany({
        where: {
          isPublic: true,
          ...(region ? { region: { has: region } } : {}),
        },
        select: {
          id: true, name: true, slug: true, description: true,
          industry: true, region: true, size: true,
          stats: { select: { totalReviews: true, overallRating: true } },
        },
        take: BATCH_SIZE,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: "asc" },
      });

      if (companies.length === 0) break;

      for (const c of companies) {
        docs.push({
          id: c.id,
          type: "company",
          title: c.name,
          subtitle: c.industry ?? undefined,
          description: c.description ?? undefined,
          slug: `/company/${c.slug}`,
          region: c.region,
          keywords: [c.name, c.industry, c.size].filter(Boolean) as string[],
          score: (c.stats?.totalReviews ?? 0) + (c.stats?.overallRating ?? 0) * 10,
        });
      }

      cursor = companies[companies.length - 1].id;
    }

    logger.info(`Indexed ${docs.length} companies`);
    return docs;
  }

  private async indexRoles(region: string | undefined, logger: Logger): Promise<SearchDocument[]> {
    const roles = await db.salaryAggregate.findMany({
      where: region ? { region } : {},
      select: { role: true, location: true, region: true, medianTotal: true, sampleCount: true },
      distinct: ["role", "location"],
    });

    const docs: SearchDocument[] = roles.map((r) => ({
      id: `role-${r.role}-${r.location}-${r.region}`,
      type: "role" as const,
      title: r.role,
      subtitle: r.location,
      slug: `/salaries/${r.role.toLowerCase().replace(/\s+/g, "-")}/${r.location.toLowerCase().replace(/\s+/g, "-")}`,
      region: [r.region],
      keywords: [r.role, r.location],
      score: r.sampleCount,
    }));

    logger.info(`Indexed ${docs.length} roles`);
    return docs;
  }

  private async indexLocations(region: string | undefined, logger: Logger): Promise<SearchDocument[]> {
    const locations = await db.salaryAggregate.findMany({
      where: region ? { region } : {},
      select: { location: true, region: true },
      distinct: ["location"],
    });

    const docs: SearchDocument[] = locations.map((l) => ({
      id: `loc-${l.location}-${l.region}`,
      type: "location" as const,
      title: l.location,
      slug: `/salaries/all/${l.location.toLowerCase().replace(/\s+/g, "-")}`,
      region: [l.region],
      keywords: [l.location],
      score: 1,
    }));

    logger.info(`Indexed ${docs.length} locations`);
    return docs;
  }

  private async indexForumThreads(region: string | undefined, logger: Logger): Promise<SearchDocument[]> {
    const docs: SearchDocument[] = [];
    let cursor: string | undefined;

    while (true) {
      const threads = await db.forumThread.findMany({
        where: region ? { region } : {},
        select: {
          id: true, title: true, slug: true, tags: true,
          region: true, upvotes: true, viewCount: true,
        },
        take: BATCH_SIZE,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: "asc" },
      });

      if (threads.length === 0) break;

      for (const t of threads) {
        docs.push({
          id: t.id,
          type: "forum-thread",
          title: t.title,
          slug: `/forum/${t.slug}`,
          region: [t.region],
          keywords: t.tags,
          score: t.upvotes + Math.floor(t.viewCount / 10),
        });
      }

      cursor = threads[threads.length - 1].id;
    }

    logger.info(`Indexed ${docs.length} forum threads`);
    return docs;
  }
}
