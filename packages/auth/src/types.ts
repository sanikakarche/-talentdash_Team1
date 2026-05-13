export type UserRole =
  | "ADMIN"
  | "MODERATOR"
  | "EMPLOYER"
  | "CONTRIBUTOR"
  | "USER"
  | "PUBLIC";

export type Permission =
  | "admin:access"
  | "moderation:access"
  | "employer:access"
  | "dashboard:access"
  | "content:submit";