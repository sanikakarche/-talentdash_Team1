import { RegionCode, RegionConfig } from "@talentdash/types";
export declare function getRegionFromPath(pathname: string): RegionCode;
export declare function getRegionConfig(region: RegionCode): RegionConfig;
export declare function isValidRegion(region: string): boolean;
export declare function formatCurrency(amount: number, region: RegionCode, options?: Intl.NumberFormatOptions): string;
export declare function buildRegionalUrl(region: RegionCode, path: string): string;
//# sourceMappingURL=region.d.ts.map