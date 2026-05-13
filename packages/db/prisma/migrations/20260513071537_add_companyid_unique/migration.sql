/*
  Warnings:

  - You are about to drop the column `companyId` on the `SalaryAggregate` table. All the data in the column will be lost.
  - You are about to drop the column `confidenceScore` on the `SalaryAggregate` table. All the data in the column will be lost.
  - You are about to drop the column `confidenceScore` on the `SalaryHeatmap` table. All the data in the column will be lost.
  - You are about to drop the column `p25Total` on the `SalaryHeatmap` table. All the data in the column will be lost.
  - You are about to drop the column `p75Total` on the `SalaryHeatmap` table. All the data in the column will be lost.
  - You are about to drop the column `sampleCount` on the `SalaryHeatmap` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[role,level,location,region]` on the table `SalaryAggregate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SalaryAggregate" DROP CONSTRAINT "SalaryAggregate_companyId_fkey";

-- DropIndex
DROP INDEX "PageGenerationJob_pageType_slug_region_key";

-- DropIndex
DROP INDEX "SalaryAggregate_companyId_idx";

-- DropIndex
DROP INDEX "SalaryAggregate_location_region_idx";

-- DropIndex
DROP INDEX "SalaryAggregate_role_level_companyId_location_region_key";

-- DropIndex
DROP INDEX "SalaryAggregate_role_region_idx";

-- DropIndex
DROP INDEX "SalaryHeatmap_location_region_idx";

-- DropIndex
DROP INDEX "SalaryHeatmap_role_region_idx";

-- AlterTable
ALTER TABLE "SalaryAggregate" DROP COLUMN "companyId",
DROP COLUMN "confidenceScore",
ALTER COLUMN "level" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SalaryHeatmap" DROP COLUMN "confidenceScore",
DROP COLUMN "p25Total",
DROP COLUMN "p75Total",
DROP COLUMN "sampleCount";

-- CreateIndex
CREATE UNIQUE INDEX "SalaryAggregate_role_level_location_region_key" ON "SalaryAggregate"("role", "level", "location", "region");
