import {
  REGIONS,
  REGION_CODES,
  RegionCode,
  RegionConfig,
} from "@talentdash/types";

export function getRegionFromPath(pathname: string): RegionCode {
  const segments = pathname.split("/").filter(Boolean);

  const firstSegment = segments[0] as RegionCode;

  if (REGION_CODES.includes(firstSegment)) {
    return firstSegment;
  }

  return "global";
}

export function getRegionConfig(region: RegionCode): RegionConfig {
  return REGIONS[region];
}

export function isValidRegion(region: string): boolean {
  return REGION_CODES.includes(region as RegionCode);
}

export function formatCurrency(
  amount: number,
  region: RegionCode,
  options?: Intl.NumberFormatOptions,
): string {
  const config = getRegionConfig(region);

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
}

export function buildRegionalUrl(
  region: RegionCode,
  path: string,
): string {
  if (region === "global") {
    return path;
  }

  return `/${region}${path}`;
}