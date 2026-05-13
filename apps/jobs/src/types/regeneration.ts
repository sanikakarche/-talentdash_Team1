export interface RegenerationJobPayload {
  pageType: "salary" | "company" | "location";

  slug: string;

  revalidate?: boolean;
}