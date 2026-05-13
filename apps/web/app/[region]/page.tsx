import type { Metadata } from "next";

import {
  notFound,
} from "next/navigation";

import HomePage from "@/app/page";

import {
  buildMetadata,
} from "@/lib/seo/metadata";

const validRegions = [
  "in",
  "us",
  "uk",
] as const;

type Props = {
  params: Promise<{
    region: string;
  }>;
};

export async function generateStaticParams() {
  return validRegions.map(
    (region) => ({
      region,
    }),
  );
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { region } =
    await params;

  if (
    !validRegions.includes(
      region as
        | "in"
        | "us"
        | "uk",
    )
  ) {
    return {};
  }

  const regionName =
    region === "in"
      ? "India"
      : region === "us"
        ? "United States"
        : "United Kingdom";

  return buildMetadata({
    title: `TalentDash ${regionName} — Salaries, Reviews & Career Intelligence`,

    description: `Explore salaries, company reviews, interviews and career insights for professionals in ${regionName}.`,

    path: `/${region}`,

    region: region as
  | "in"
  | "us"
  | "uk",

    keywords: [
      `${regionName} salaries`,
      `${regionName} jobs`,
      `${regionName} reviews`,
      "career intelligence",
    ],
  });
}

export default async function RegionalHomePage({
  params,
}: Props) {
  const { region } =
    await params;

  if (
    !validRegions.includes(
      region as
        | "in"
        | "us"
        | "uk",
    )
  ) {
    notFound();
  }

  return <HomePage />;
}