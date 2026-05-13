import type {
  Permission,
  UserRole,
} from "./types";

export const ROLE_HIERARCHY: Record<
  UserRole,
  number
> = {
  PUBLIC: 0,
  USER: 1,
  CONTRIBUTOR: 2,
  EMPLOYER: 3,
  MODERATOR: 4,
  ADMIN: 5,
};

export const ROLE_PERMISSIONS: Record<
  UserRole,
  Permission[]
> = {
  PUBLIC: [],

  USER: [
    "dashboard:access",
  ],

  CONTRIBUTOR: [
    "dashboard:access",
    "content:submit",
  ],

  EMPLOYER: [
    "dashboard:access",
    "employer:access",
  ],

  MODERATOR: [
    "dashboard:access",
    "moderation:access",
  ],

  ADMIN: [
    "admin:access",
    "moderation:access",
    "employer:access",
    "dashboard:access",
    "content:submit",
  ],
};

export function hasPermission(
  role: UserRole,
  permission: Permission,
): boolean {
  return ROLE_PERMISSIONS[
    role
  ]?.includes(permission);
}

export function hasRoleLevel(
  currentRole: UserRole,
  requiredRole: UserRole,
): boolean {
  return (
    ROLE_HIERARCHY[currentRole] >=
    ROLE_HIERARCHY[requiredRole]
  );
}