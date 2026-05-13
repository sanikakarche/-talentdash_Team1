export type RegionCode = "global" | "in" | "us" | "uk";
export interface RegionConfig {
    code: RegionCode;
    label: string;
    currency: string;
    currencySymbol: string;
    locale: string;
    countryCode: string;
    defaultLanguage: string;
    domainPath: string;
}
export declare const REGIONS: Record<RegionCode, RegionConfig>;
export declare const REGION_CODES: RegionCode[];
//# sourceMappingURL=region.d.ts.map