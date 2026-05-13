import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import {
  DEFAULT_ROLE,
} from "./constants";

import {
  hasRoleLevel,
} from "./rbac";

import type { UserRole } from "./types";

export async function getUser() {
  return currentUser();
}

export async function getCurrentRole(): Promise<UserRole> {
  const { sessionClaims } =
    await auth();

  const metadata =
    (sessionClaims?.metadata ??
      {}) as {
      role?: UserRole;
    };

  return (
    metadata.role ??
    DEFAULT_ROLE
  );
}

export async function requireRole(
  requiredRole: UserRole,
) {
  const role =
    await getCurrentRole();

  const allowed =
    hasRoleLevel(
      role,
      requiredRole,
    );

  if (!allowed) {
    throw new Error(
      "Unauthorized",
    );
  }

  return role;
}