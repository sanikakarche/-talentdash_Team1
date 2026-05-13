import {
  revalidateTag,
} from "next/cache";

import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
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

  const body =
    await request.json();

  const tags =
    body.tags as string[];

  for (const tag of tags) {
    revalidateTag(tag, {});
  }

  return Response.json({
    revalidated: true,
    tags,
  });
}