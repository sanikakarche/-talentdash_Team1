"use client";

import { useRegionContext } from "@/components/RegionProvider";

export function useRegion() {
  return useRegionContext();
}