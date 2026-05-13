import {
  revalidateTag,
} from "next/cache";

import { CACHE_TAGS }
  from "@talentdash/utils";

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      slug: string;
    }>;
  },
) {
  const secret =
    request.headers.get("x-cron-secret");

  if (
    secret !== process.env.CRON_SECRET
  ) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const { slug } =
    await context.params;

  revalidateTag(
    CACHE_TAGS.company(slug),
    {},
  );

  return Response.json({
    revalidated: true,
    slug,
  });
}