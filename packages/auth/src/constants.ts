import type { UserRole } from "./types";

export const PUBLIC_ROUTES = [
  "/",
  "/companies",
  "/salaries",
  "/reviews",
  "/interviews",
  "/jobs",
  "/forum",
  "/offers",
  "/tools",
  "/workplace-index",
];

export const PROTECTED_ROUTE_PREFIXES = {
  ADMIN: ["/admin", "/api/admin"],

  MODERATOR: [
    "/api/moderation",
  ],

  EMPLOYER: ["/employer"],

  AUTHENTICATED: [
    "/dashboard",
  ],

  CONTRIBUTOR: [
    "/api/submit",
  ],
} as const;

export const DEFAULT_ROLE: UserRole =
  "PUBLIC";