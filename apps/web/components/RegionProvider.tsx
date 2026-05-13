"use client";

import {
  createContext,
  ReactNode,
  useContext,
} from "react";

import { RegionConfig } from "@talentdash/types";

const RegionContext =
  createContext<RegionConfig | null>(null);

interface Props {
  children: ReactNode;
  value: RegionConfig;
}

export function RegionProvider({
  children,
  value,
}: Props) {
  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegionContext() {
  const context = useContext(RegionContext);

  if (!context) {
    throw new Error(
      "useRegionContext must be used inside RegionProvider",
    );
  }

  return context;
}