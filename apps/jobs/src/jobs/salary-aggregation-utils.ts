import { Prisma } from "@prisma/client";
import { CACHE_KEYS, CACHE_TAGS } from "@talentdash/utils";

export const DEFAULT_GROUP_BATCH_SIZE = 500;
export const DEFAULT_SIDE_EFFECT_BATCH_SIZE = 100;

export interface SalaryAggregateGroupKey {
  role: string;
  level: string;
  companyId: string;
  location: string;
  region: string;
}

export interface SalaryAggregationCursor {
  role: string;
  level: string;
  companyId: string;
  location: string;
  region: string;
}

export interface SalaryAggregationFilters {
  region?: string;
  role?: string;
  location?: string;
  companyId?: string;
  changedSince?: Date;
}

export interface RevalidationTarget {
  pageType: string;
  slug: string;
  region: string;
}

export function normalizeSalaryLevel(level: string | null | undefined): string {
  return level ?? "MID";
}

export function calculateConfidenceScore(sampleCount: number): number {
  if (sampleCount <= 0) return 0;
  if (sampleCount < 3) return Number(((sampleCount / 3) * 0.25).toFixed(4));
  return Number(Math.min(1, Math.log(sampleCount + 1) / Math.log(101)).toFixed(4));
}

export function buildSalarySlug(role: string, location: string): string {
  return `${role}/${location}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function uniqueBy<T>(items: T[], keyFor: (item: T) => string): T[] {
  const seen = new Set<string>();
  const unique: T[] = [];

  for (const item of items) {
    const key = keyFor(item);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }

  return unique;
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("chunk size must be greater than zero");
  }

  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

export function cacheKeysForGroups(groups: SalaryAggregateGroupKey[]): string[] {
  const keys: string[] = [];

  for (const group of groups) {
    keys.push(CACHE_KEYS.salaryAggregate(group.role, group.level, group.location));
    keys.push(CACHE_KEYS.salaryHeatmap(group.role, group.region));
  }

  return uniqueBy(keys, (key) => key);
}

export function revalidationTargetsForGroups(
  groups: SalaryAggregateGroupKey[],
): RevalidationTarget[] {
  const targets = groups.flatMap((group) => [
    {
      pageType: "salary",
      slug: buildSalarySlug(group.role, group.location),
      region: group.region,
    },
    {
      pageType: "heatmap",
      slug: buildSalarySlug(group.role, "salary-heatmap"),
      region: group.region,
    },
  ]);

  return uniqueBy(targets, (target) =>
    `${target.pageType}:${target.slug}:${target.region}`,
  );
}

export function cacheTagsForGroups(groups: SalaryAggregateGroupKey[]): string[] {
  return uniqueBy(
    groups.flatMap((group) => [
      CACHE_TAGS.salary(group.role, group.location, group.region),
      CACHE_TAGS.heatmap(group.role, group.region),
    ]),
    (tag) => tag,
  );
}

export function salaryFilterSql(filters: SalaryAggregationFilters): Prisma.Sql {
  const clauses: Prisma.Sql[] = [
    Prisma.sql`"approvedAt" IS NOT NULL`,
    Prisma.sql`"totalComp" > 0`,
    Prisma.sql`"baseSalary" > 0`,
  ];

  if (filters.region) clauses.push(Prisma.sql`"region" = ${filters.region}`);
  if (filters.role) clauses.push(Prisma.sql`"role" = ${filters.role}`);
  if (filters.location) clauses.push(Prisma.sql`"location" = ${filters.location}`);
  if (filters.companyId) clauses.push(Prisma.sql`"companyId" = ${filters.companyId}`);
  if (filters.changedSince) {
    clauses.push(Prisma.sql`"approvedAt" >= ${filters.changedSince}`);
  }

  return Prisma.sql`WHERE ${Prisma.join(clauses, " AND ")}`;
}

export function groupCursorSql(cursor?: SalaryAggregationCursor): Prisma.Sql {
  if (!cursor) return Prisma.empty;

  return Prisma.sql`
    AND (
      "role",
      COALESCE("level"::text, 'MID'),
      "companyId",
      "location",
      "region"
    ) > (
      ${cursor.role},
      ${cursor.level},
      ${cursor.companyId},
      ${cursor.location},
      ${cursor.region}
    )
  `;
}

export function keyTupleSql(groups: SalaryAggregateGroupKey[]): Prisma.Sql {
  return Prisma.join(
    groups.map(
      (group) =>
        Prisma.sql`(${group.role}, ${group.level}, ${group.companyId}, ${group.location}, ${group.region})`,
    ),
  );
}
