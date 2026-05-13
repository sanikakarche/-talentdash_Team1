import { revalidateTag } from "next/cache";

import { prisma } from "@talentdash/db";
import { CACHE_KEYS } from "@talentdash/utils/cache-keys";
import { CACHE_TAGS } from "@talentdash/utils/cache-tags";
import { redis } from "@talentdash/utils/cache";

type ApproveSalaryInput = {
  submissionId: string;
};

export async function approveSalary({
  submissionId,
}: ApproveSalaryInput) {
  /*
   * 1. Fetch pending submission
   */
  const submission = await prisma.salaryEntry.findUnique({
    where: {
      id: submissionId,
    },
  });

  if (!submission) {
    throw new Error("Salary submission not found");
  }

  /*
   * 2. Approve salary entry
   */
  const salary = await prisma.salaryEntry.update({
    where: {
      id: submissionId,
    },
    data: {
      approvedAt: new Date(),
    },
  });

  /*
   * 3. Invalidate Redis caches.
   * Aggregate recomputation is intentionally asynchronous in apps/jobs.
   */
  await redis.del(
    CACHE_KEYS.salaryAggregate(
      salary.role,
      salary.level ?? "",
      salary.location,
    ),
  );

  /*
   * 4. Revalidate Next.js cache tags
   */
  await revalidateTag(
    CACHE_TAGS.salary(
      salary.role,
      salary.location,
      salary.region,
    ),
    {},
  );

  await revalidateTag(
    CACHE_TAGS.company(salary.companyId),
    {},
  );

  await revalidateTag(
    CACHE_TAGS.ranking(
      "salary",
      salary.region,
    ),
    {},
  );

  /*
   * 5. Return result
   */
  return salary;
}
