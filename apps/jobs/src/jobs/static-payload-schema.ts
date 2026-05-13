import { z } from "zod";

const PageMetaSchema = z.object({
  version: z.literal(1),
  generatedAt: z.string(),
  pageType: z.enum(["company", "salary", "ranking"]),
  slug: z.string(),
  region: z.string(),
  source: z.literal("talentdash-jobs"),
});

const CompanySummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  logoUrl: z.string().nullable(),
  coverImageUrl: z.string().nullable(),
  website: z.string().nullable(),
  industry: z.string().nullable(),
  size: z.string().nullable(),
  headquarters: z.string().nullable(),
  country: z.string().nullable(),
  region: z.array(z.string()),
  foundedYear: z.number().nullable(),
  employeeCount: z.number().nullable(),
  aiSummary: z.string().nullable(),
  isVerified: z.boolean(),
  updatedAt: z.string(),
});

const CompanyStatsSchema = z.object({
  overallRating: z.number().nullable(),
  workLifeRating: z.number().nullable(),
  cultureRating: z.number().nullable(),
  compensationRating: z.number().nullable(),
  growthRating: z.number().nullable(),
  totalReviews: z.number(),
  totalSalaries: z.number(),
  totalInterviews: z.number(),
  recommendPercent: z.number().nullable(),
});

const SalaryAggregateSchema = z.object({
  role: z.string(),
  level: z.string(),
  companyId: z.string(),
  companySlug: z.string(),
  companyName: z.string(),
  location: z.string(),
  region: z.string(),
  currency: z.string(),
  medianBase: z.number(),
  medianTotal: z.number(),
  p25Total: z.number(),
  p75Total: z.number(),
  sampleCount: z.number(),
  confidenceScore: z.number(),
  updatedAt: z.string(),
});

const RankingEntrySchema = z.object({
  category: z.string(),
  rank: z.number(),
  score: z.number(),
  region: z.string(),
  year: z.number(),
  month: z.number(),
  methodology: z.string().nullable(),
  company: CompanySummarySchema.pick({
    id: true,
    slug: true,
    name: true,
    logoUrl: true,
    industry: true,
    region: true,
    isVerified: true,
    updatedAt: true,
  }),
});

export const CompanyPagePayloadSchema = z.object({
  meta: PageMetaSchema.extend({ pageType: z.literal("company") }),
  company: CompanySummarySchema,
  stats: CompanyStatsSchema.nullable(),
  salaries: z.array(SalaryAggregateSchema),
  rankings: z.array(RankingEntrySchema),
});

export const SalaryPagePayloadSchema = z.object({
  meta: PageMetaSchema.extend({ pageType: z.literal("salary") }),
  role: z.string(),
  location: z.string(),
  region: z.string(),
  aggregates: z.array(SalaryAggregateSchema),
});

export const RankingPagePayloadSchema = z.object({
  meta: PageMetaSchema.extend({ pageType: z.literal("ranking") }),
  category: z.string(),
  region: z.string(),
  rankings: z.array(RankingEntrySchema),
});

export const StaticPagePayloadSchema = z.union([
  CompanyPagePayloadSchema,
  SalaryPagePayloadSchema,
  RankingPagePayloadSchema,
]);

export type CompanyPagePayload = z.infer<typeof CompanyPagePayloadSchema>;
export type SalaryPagePayload = z.infer<typeof SalaryPagePayloadSchema>;
export type RankingPagePayload = z.infer<typeof RankingPagePayloadSchema>;
export type StaticPagePayload = z.infer<typeof StaticPagePayloadSchema>;
