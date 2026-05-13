import { createLogger } from "../lib/logger.js";

const logger = createLogger("talentdash-jobs", {
  component: "page-regenerator",
});

export async function regeneratePage(
  pageType: string,
  slug: string,
): Promise<void> {
  logger.info("Regenerating page", {
    pageType,
    slug,
  });

  /**
   * FUTURE:
   * - trigger Next.js revalidateTag()
   * - purge CDN
   * - rebuild ISR cache
   * - invalidate Redis cache
   */

  await new Promise((resolve) => setTimeout(resolve, 500));

  logger.info("Page regenerated", {
    pageType,
    slug,
  });
}