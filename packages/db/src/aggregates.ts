/**
 * Salary aggregation is intentionally owned by apps/jobs.
 *
 * This package exports the legacy symbol so old imports fail closed instead of
 * silently performing expensive request-time work.
 */
export async function recomputeSalaryAggregates(): Promise<never> {
  throw new Error(
    "Salary aggregation must run through the jobs salary-aggregation queue, not request-time DB helpers.",
  );
}
