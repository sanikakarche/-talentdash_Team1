-- Salary aggregates and heatmaps are derived data. This migration clears the
-- old shape before adding company-level grouping and confidence scores.
DELETE FROM "SalaryHeatmap";
DELETE FROM "SalaryAggregate";

DROP INDEX IF EXISTS "SalaryAggregate_role_level_location_region_key";
DROP INDEX IF EXISTS "SalaryHeatmap_role_location_region_key";

ALTER TABLE "SalaryAggregate"
  ADD COLUMN "companyId" TEXT NOT NULL,
  ADD COLUMN "confidenceScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ALTER COLUMN "level" SET NOT NULL;

ALTER TABLE "SalaryHeatmap"
  ADD COLUMN "p25Total" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ADD COLUMN "p75Total" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ADD COLUMN "sampleCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "confidenceScore" DOUBLE PRECISION NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX "SalaryAggregate_role_level_companyId_location_region_key"
  ON "SalaryAggregate"("role", "level", "companyId", "location", "region");

CREATE INDEX "SalaryAggregate_companyId_idx"
  ON "SalaryAggregate"("companyId");

CREATE INDEX "SalaryAggregate_role_region_idx"
  ON "SalaryAggregate"("role", "region");

CREATE INDEX "SalaryAggregate_location_region_idx"
  ON "SalaryAggregate"("location", "region");

CREATE UNIQUE INDEX "SalaryHeatmap_role_location_region_key"
  ON "SalaryHeatmap"("role", "location", "region");

CREATE INDEX "SalaryHeatmap_role_region_idx"
  ON "SalaryHeatmap"("role", "region");

CREATE INDEX "SalaryHeatmap_location_region_idx"
  ON "SalaryHeatmap"("location", "region");

CREATE INDEX "SalaryEntry_aggregation_scan_idx"
  ON "SalaryEntry"("region", "role", "level", "companyId", "location", "approvedAt")
  WHERE "approvedAt" IS NOT NULL;

CREATE INDEX "SalaryEntry_aggregation_incremental_idx"
  ON "SalaryEntry"("approvedAt", "region", "role", "level", "companyId", "location")
  WHERE "approvedAt" IS NOT NULL;

ALTER TABLE "SalaryAggregate"
  ADD CONSTRAINT "SalaryAggregate_companyId_fkey"
  FOREIGN KEY ("companyId") REFERENCES "Company"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
