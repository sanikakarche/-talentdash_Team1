import type { Metadata } from "next";

import {
  buildMetadata,
} from "@/lib/seo/metadata";

import {
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/lib/seo/structured-data";

import {
  CareerHubGrid,
} from "@/components/home/CareerHubGrid";

import {
  CommunityTrending,
} from "@/components/home/CommunityTrending";

import {
  ContributeBanner,
} from "@/components/home/ContributeBanner";

import {
  HeroSearch,
} from "@/components/home/HeroSearch";

import {
  SalaryHeatmapPreview,
} from "@/components/home/SalaryHeatmapPreview";

import {
  ToolsPreviewGrid,
} from "@/components/home/ToolsPreviewGrid";

import {
  TopCompaniesRow,
} from "@/components/home/TopCompaniesRow";

export const revalidate = 3600;

export const metadata: Metadata =
  buildMetadata({
    title:
      "TalentDash — Explore Salaries, Reviews & Career Intelligence",

    description:
      "Explore salaries, read company reviews, prepare for interviews and compare compensation across top companies worldwide.",

    path: "/",

    keywords: [
      "salary insights",
      "company reviews",
      "interview questions",
      "career intelligence",
      "tech salaries",
    ],
  });

const heatmapRows = [
  {
    role:
      "Software Engineer",

    salaries: [
      {
        city: "New York",
        value: "$182K",
        level: 800,
      },

      {
        city:
          "San Francisco",

        value: "$214K",
        level: 800,
      },

      {
        city: "London",
        value: "£96K",
        level: 500,
      },

      {
        city: "Berlin",
        value: "€88K",
        level: 400,
      },

      {
        city:
          "Singapore",

        value: "$110K",
        level: 600,
      },

      {
        city: "Sydney",
        value: "$118K",
        level: 600,
      },
    ],
  },

  {
    role:
      "Product Manager",

    salaries: [
      {
        city: "New York",
        value: "$205K",
        level: 700,
      },

      {
        city:
          "San Francisco",

        value: "$238K",
        level: 800,
      },

      {
        city: "London",
        value: "£102K",
        level: 500,
      },

      {
        city: "Berlin",
        value: "€90K",
        level: 400,
      },

      {
        city:
          "Singapore",

        value: "$124K",
        level: 600,
      },

      {
        city: "Sydney",
        value: "$127K",
        level: 600,
      },
    ],
  },

  {
    role:
      "Data Scientist",

    salaries: [
      {
        city: "New York",
        value: "$191K",
        level: 700,
      },

      {
        city:
          "San Francisco",

        value: "$226K",
        level: 800,
      },

      {
        city: "London",
        value: "£99K",
        level: 500,
      },

      {
        city: "Berlin",
        value: "€84K",
        level: 400,
      },

      {
        city:
          "Singapore",

        value: "$118K",
        level: 600,
      },

      {
        city: "Sydney",
        value: "$122K",
        level: 600,
      },
    ],
  },
] as const;

const companies = [
  {
    name: "Google",

    slug: "google",

    logo:
      "/images/companies/google.png",

    compensation:
      "$248K",

    trend: "19%",
  },

  {
    name: "Meta",

    slug: "meta",

    logo:
      "/images/companies/meta.png",

    compensation:
      "$262K",

    trend: "23%",
  },

  {
    name: "Amazon",

    slug: "amazon",

    logo:
      "/images/companies/amazon.png",

    compensation:
      "$221K",

    trend: "14%",
  },

  {
    name: "Apple",

    slug: "apple",

    logo:
      "/images/companies/apple.png",

    compensation:
      "$244K",

    trend: "17%",
  },

  {
    name: "Microsoft",

    slug: "microsoft",

    logo:
      "/images/companies/microsoft.png",

    compensation:
      "$212K",

    trend: "15%",
  },
];

const tools = [
  {
    key: "salary",
    name:
      "Salary Calculator",
    usage: "1.2M+",
    href: "/tools/salary-calculator",
  },

  {
    key: "hike",
    name:
      "Salary Hike Calculator",
    usage: "840K+",
    href: "/tools/hike-calculator",
  },

  {
    key: "equity",
    name:
      "Equity Calculator",
    usage: "520K+",
    href: "/tools/equity-calculator",
  },

  {
    key: "offers",
    name:
      "Offer Comparator",
    usage: "410K+",
    href: "/tools/offer-comparator",
  },

  {
    key: "resume",
    name:
      "Resume Analyzer",
    usage: "1.8M+",
    href: "/tools/resume-analyzer",
  },

  {
    key: "tax",
    name:
      "Tax Calculator",
    usage: "670K+",
    href: "/tools/tax-calculator",
  },
] as const;

const threads = [
  {
    id: "1",

    title:
      "Amazon SDE-2 salary hike 2026 — What are you expecting?",

    company:
      "Amazon",

    logo:
      "/images/companies/amazon.png",

    replies: 190,

    timeAgo: "1h ago",

    badge: "Hot" as const,
  },

  {
    id: "2",

    title:
      "Is remote work slowly disappearing in big tech?",

    company: "Meta",

    logo:
      "/images/companies/meta.png",

    replies: 142,

    timeAgo: "3h ago",

    badge:
      "Trending" as const,
  },

  {
    id: "3",

    title:
      "Best cities for AI engineers in 2026?",

    company: "Google",

    logo:
      "/images/companies/google.png",

    replies: 88,

    timeAgo: "5h ago",

    badge:
      "Trending" as const,
  },

  {
    id: "4",

    title:
      "Should freshers still target FAANG companies?",

    company:
      "Microsoft",

    logo:
      "/images/companies/microsoft.png",

    replies: 76,

    timeAgo: "8h ago",
  },

  {
    id: "5",

    title:
      "Tech layoffs vs AI hiring boom discussion",

    company: "Apple",

    logo:
      "/images/companies/apple.png",

    replies: 112,

    timeAgo: "10h ago",
  },
];

export default function HomePage() {
  const organizationSchema =
    buildOrganizationSchema();

  const websiteSchema =
    buildWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              organizationSchema,
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              websiteSchema,
            ),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* HERO */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Explore career intelligence
            </p>

            <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Explore. Compare.
              Grow.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Explore salaries,
              read real reviews,
              prepare for
              interviews and
              discover the right
              opportunities —
              all in one place.
            </p>

            <HeroSearch />

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-medium text-gray-500">
                Trending
                searches:
              </span>

              {[
                "Software Engineer",
                "Data Scientist",
                "Product Manager",
                "Marketing Manager",
                "Remote Jobs",
              ].map((item) => (
                <a
                  key={item}
                  href="/salaries"
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-green-300 hover:text-green-700"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "✓ Verified & Trusted",
                  "Real data. Real people.",
                ],

                [
                  "👥 10M+ Users",
                  "Across the globe",
                ],

                [
                  "🏢 500K+ Companies",
                  "Researched & reviewed",
                ],

                [
                  "🔒 100% Free",
                  "No hidden charges",
                ],
              ].map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={index}
                    className="rounded-card border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <p className="font-semibold text-gray-900">
                      {item[0]}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {item[1]}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
          <CareerHubGrid />

          <SalaryHeatmapPreview
            rows={
              heatmapRows
            }
          />

          <TopCompaniesRow
            companies={
              companies
            }
          />

          <ToolsPreviewGrid
            tools={tools}
          />

          <CommunityTrending
            threads={threads}
          />

          <ContributeBanner />
        </div>
      </main>
    </>
  );
}
