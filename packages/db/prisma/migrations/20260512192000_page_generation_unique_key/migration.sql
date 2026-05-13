DELETE FROM "PageGenerationJob" a
USING "PageGenerationJob" b
WHERE a."id" > b."id"
  AND a."pageType" = b."pageType"
  AND a."slug" = b."slug"
  AND a."region" = b."region";

CREATE UNIQUE INDEX "PageGenerationJob_pageType_slug_region_key"
  ON "PageGenerationJob"("pageType", "slug", "region");
