import type { Metadata } from "next";

type Region =
  | "in"
  | "us"
  | "uk"
  | undefined;

type MetadataOptions = {
  title: string;

  description: string;

  path: string;

  region?: Region;

  ogImage?: string;

  ogType?:
    | "website"
    | "article"
    | "profile";

  noIndex?: boolean;

  keywords?: string[];
};

const SITE_URL =
  "https://talentdash.com";

function stripRegionPrefix(
  path: string,
) {
  return path.replace(
    /^\/(in|us|uk)/,
    "",
  );
}

export function buildMetadata({
  title,
  description,
  path,
  region,
  ogImage = "/og/default.png",
  ogType = "website",
  noIndex = false,
  keywords = [],
}: MetadataOptions): Metadata {
  const cleanPath =
    stripRegionPrefix(path);

  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  const regionalPath = region
    ? `/${region}${cleanPath}`
    : cleanPath;

  return {
    title,

    description,

    keywords,

    alternates: {
      canonical: canonicalUrl,

      languages: {
        "x-default":
          canonicalUrl,

        en: canonicalUrl,

        "en-IN": `${SITE_URL}/in${cleanPath}`,

        "en-US": `${SITE_URL}/us${cleanPath}`,

        "en-GB": `${SITE_URL}/uk${cleanPath}`,
      },
    },

    openGraph: {
      title,

      description,

      url: `${SITE_URL}${regionalPath}`,

      siteName:
        "TalentDash",

      type: ogType,

      images: [
        {
          url: ogImage,

          width: 1200,

          height: 630,

          alt: title,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title,

      description,

      images: [ogImage],
    },

    robots: {
      index: !noIndex,

      follow: !noIndex,
    },
  };
}