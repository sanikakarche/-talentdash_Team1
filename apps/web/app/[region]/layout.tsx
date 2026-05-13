import type { ReactNode } from "react";

type RegionLayoutProps = {
  children: ReactNode;
  params: Promise<{
    region: string;
  }>;
};

export default async function RegionLayout({
  children,
}: RegionLayoutProps) {
  return <>{children}</>;
}