import { REGIONS, REGION_CODES, } from "@talentdash/types";
export function getRegionFromPath(pathname) {
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    if (REGION_CODES.includes(firstSegment)) {
        return firstSegment;
    }
    return "global";
}
export function getRegionConfig(region) {
    return REGIONS[region];
}
export function isValidRegion(region) {
    return REGION_CODES.includes(region);
}
export function formatCurrency(amount, region, options) {
    const config = getRegionConfig(region);
    return new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: config.currency,
        maximumFractionDigits: 0,
        ...options,
    }).format(amount);
}
export function buildRegionalUrl(region, path) {
    if (region === "global") {
        return path;
    }
    return `/${region}${path}`;
}
//# sourceMappingURL=region.js.map