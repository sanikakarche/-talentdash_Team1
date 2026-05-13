import { JobLevel } from "@prisma/client";

import { prisma } from "@talentdash/db";

import { createLogger } from "../lib/logger.js";
import { percentile, median } from "../lib/stats.js";
import { pageRegenerationQueue } from "../queue/page-regeneration.js";

const logger = createLogger("talentdash-jobs", {
  component: "salary-aggregator-job",
});

interface SalaryGroup {
  role: string;

  level: JobLevel | null;

  location: string;

  region: string;

  salaries: number[];
}

export async function runSalaryAggregation(): Promise<void> {
  logger.info("Starting salary aggregation");

  const entries = await prisma.salaryEntry.findMany({
    where: {
      approvedAt: {
        not: null,
      },

      baseSalary: {
        gt: 0,
      },

      level: {
        not: null,
      },
    },

    select: {
      role: true,

      level: true,

      location: true,

      region: true,

      baseSalary: true,
    },
  });

  logger.info("Salary entries loaded", {
    count: entries.length,
  });

  const groups = new Map<string, SalaryGroup>();

  for (const entry of entries) {
    if (!entry.level) {
      continue;
    }

    const key = [
      entry.role,
      entry.level,
      entry.location,
      entry.region,
    ].join(":");

    const existing = groups.get(key);

    if (existing) {
      existing.salaries.push(entry.baseSalary);

      continue;
    }

    groups.set(key, {
      role: entry.role,

      level: entry.level,

      location: entry.location,

      region: entry.region,

      salaries: [entry.baseSalary],
    });
  }

  logger.info("Salary groups computed", {
    groups: groups.size,
  });

  let processed = 0;

  for (const group of Array.from(groups.values())) {
    const salaries = [...group.salaries].sort((a, b) => a - b);

    const p25 = percentile(salaries, 25);

    const p50 = median(salaries);

    const p75 = percentile(salaries, 75);

    const confidenceScore = Math.min(1, salaries.length / 25);

    await prisma.salaryAggregate.upsert({
      where: {
        role_level_location_region: {
          role: group.role,

          level: group.level ?? undefined,

          location: group.location,

          region: group.region,
        },
      },

      update: {
        sampleCount: salaries.length,

        medianBase: p50,

        medianTotal: p50,

        p25Total: p25,

        p75Total: p75,

        confidenceScore,
      },

      create: {
        role: group.role,

        level: group.level ?? undefined,

        location: group.location,

        region: group.region,

        currency: "USD",

        sampleCount: salaries.length,

        medianBase: p50,

        medianTotal: p50,

        p25Total: p25,

        p75Total: p75,

        confidenceScore,
      },
    });

    processed += 1;

        const slug = [
      group.role,
      group.level,
      group.location,
    ]
      .join("-")
      .toLowerCase()
      .replace(/\s+/g, "-");

    await pageRegenerationQueue.add(
      "page-regeneration",
      {
        pageType: "salary",
        slug,
      },
      {
        removeOnComplete: 50,
        removeOnFail: 20,
      },
    );

    logger.info("Page regeneration job queued", {
      slug,
    });
  }

  logger.info("Salary aggregation completed", {
    processed,
  });
}