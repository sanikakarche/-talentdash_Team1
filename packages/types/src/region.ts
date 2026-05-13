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

export const REGIONS: Record<RegionCode, RegionConfig> = {
  global: {
    code: "global",
    label: "Global",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    countryCode: "GLOBAL",
    defaultLanguage: "en",
    domainPath: "",
  },

  in: {
    code: "in",
    label: "India",
    currency: "INR",
    currencySymbol: "₹",
    locale: "en-IN",
    countryCode: "IN",
    defaultLanguage: "en-IN",
    domainPath: "/in",
  },

  us: {
    code: "us",
    label: "United States",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    countryCode: "US",
    defaultLanguage: "en-US",
    domainPath: "/us",
  },

  uk: {
    code: "uk",
    label: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    countryCode: "GB",
    defaultLanguage: "en-GB",
    domainPath: "/uk",
  },
};

export const REGION_CODES = Object.keys(REGIONS) as RegionCode[];