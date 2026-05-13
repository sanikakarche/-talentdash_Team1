/*
  Warnings:

  - Added the required column `confidenceScore` to the `SalaryAggregate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalaryAggregate" ADD COLUMN     "confidenceScore" DOUBLE PRECISION NOT NULL;
