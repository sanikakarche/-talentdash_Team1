import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  middleware as authMiddleware,
} from "@talentdash/auth";

const PUBLIC_FILE =
  /\.(.*)$/;

const REGIONS = [
  "in",
  "us",
  "uk",
];

function getRegionFromRequest(
  request: NextRequest,
) {
  const pathname =
    request.nextUrl.pathname;

  /*
   * URL PREFIX PRIORITY
   */

  const matchedRegion =
    REGIONS.find((region) =>
      pathname.startsWith(
        `/${region}`,
      ),
    );

  if (matchedRegion) {
    return matchedRegion;
  }

  /*
   * COOKIE FALLBACK
   */

  const cookieRegion =
    request.cookies.get(
      "region",
    )?.value;

  if (
    cookieRegion &&
    REGIONS.includes(
      cookieRegion,
    )
  ) {
    return cookieRegion;
  }

  /*
   * GEO FALLBACK
   */

  const country =
    request.headers.get(
      "cf-ipcountry",
    );

  switch (country) {
    case "IN":
      return "in";

    case "US":
      return "us";

    case "GB":
      return "uk";

    default:
      return "global";
  }
}

export async function middleware(
  request: NextRequest,
) {
  const pathname =
    request.nextUrl.pathname;

  /*
   * 1. BYPASS STATIC ASSETS
   *
   * CRITICAL:
   * Must avoid middleware compute
   * for static/CDN assets.
   */

  if (
    pathname.startsWith(
      "/_next",
    ) ||
    pathname.startsWith(
      "/favicon.ico",
    ) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  /*
   * 2. REGION DETECTION
   */

  const region =
    getRegionFromRequest(
      request,
    );

  /*
   * 3. STORE REGION COOKIE
   */

  const response =
    NextResponse.next();

  response.headers.set(
    "x-region",
    region,
  );

  response.headers.set(
    "Vary",
    "x-region",
  );

  response.cookies.set(
    "region",
    region,
    {
      path: "/",
      maxAge:
        60 *
        60 *
        24 *
        30,
    },
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
  ],
};