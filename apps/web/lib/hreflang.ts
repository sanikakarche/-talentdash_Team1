import {
  REGIONS,
  RegionConfig,
} from "@talentdash/types";

const BASE_URL = "https://talentdash.com";

export function generateHreflangLinks(
  pathname: string,
) {
  return Object.values(REGIONS).map(
    (region: RegionConfig) => {
      const href =
        region.code === "global"
          ? `${BASE_URL}${pathname}`
          : `${BASE_URL}/${region.code}${pathname}`;

      return {
        rel: "alternate",
        hrefLang:
          region.code === "global"
            ? "x-default"
            : region.defaultLanguage,
        href,
      };
    },
  );
}