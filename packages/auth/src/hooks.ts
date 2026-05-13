"use client";

import { useUser as useClerkUser } from "@clerk/nextjs";

import {
  hasPermission,
} from "./rbac";

import type {
  Permission,
  UserRole,
} from "./types";

export function useUser() {
  return useClerkUser();
}

export function useRole(): UserRole {
  const { user } =
    useClerkUser();

  return (
    (user?.publicMetadata
      ?.role as UserRole) ??
    "PUBLIC"
  );
}

export function usePermission(
  permission: Permission,
) {
  const role = useRole();

  return hasPermission(
    role,
    permission,
  );
}

export function useIsEmployer() {
  const role = useRole();

  return role === "EMPLOYER";
}