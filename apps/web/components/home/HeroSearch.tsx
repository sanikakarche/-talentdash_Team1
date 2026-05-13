"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Briefcase,
  DollarSign,
  MessageSquare,
  Star,
} from "lucide-react";

const tabs = [
  {
    key: "salaries",
    label: "Salaries",
    icon: DollarSign,
    placeholder:
      "Search salaries by role or company",
  },

  {
    key: "reviews",
    label: "Reviews",
    icon: Star,
    placeholder:
      "Search company reviews",
  },

  {
    key: "interviews",
    label: "Interviews",
    icon: MessageSquare,
    placeholder:
      "Search interview questions",
  },

  {
    key: "forum",
    label: "Forum",
    icon: Briefcase,
    placeholder:
      "Search discussions and threads",
  },
];

const locations = [
  "All Locations",
  "Remote",
  "New York",
  "San Francisco",
  "Bangalore",
  "London",
];

const experiences = [
  "0-2 years",
  "2-5 years",
  "5-10 years",
  "10+ years",
];

type Props = {
  region?: string;
};

export function HeroSearch({
  region,
}: Props) {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState("salaries");

  const [query, setQuery] =
    useState("");

  const [location, setLocation] =
    useState("All Locations");

  const [experience, setExperience] =
    useState("0-2 years");

  const currentTab =
    tabs.find(
      (tab) =>
        tab.key === activeTab,
    )!;

  function handleSearch() {
    const prefix = region
      ? `/${region}`
      : "";

    const params =
      new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    if (
      location !==
      "All Locations"
    ) {
      params.set(
        "location",
        location,
      );
    }

    if (
      activeTab ===
      "salaries"
    ) {
      params.set(
        "experience",
        experience,
      );
    }

    let basePath = "";

    switch (activeTab) {
      case "salaries":
        basePath = `${prefix}/salaries`;
        break;

      case "reviews":
        basePath = `${prefix}/reviews`;
        break;

      case "interviews":
        basePath = `${prefix}/interviews`;
        break;

      case "forum":
        basePath = `${prefix}/forum`;
        break;

      default:
        basePath = prefix;
    }

    router.push(
      `${basePath}?${params.toString()}`,
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl rounded-card border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const isActive =
            activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(
                  tab.key,
                )
              }
              className={`inline-flex items-center gap-2 rounded-button px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-4 w-4" />

              {tab.label}

              {isActive && (
                <span className="ml-1 h-1.5 w-1.5 rounded-full bg-green-600" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Search
          </label>

          <input
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value,
              )
            }
            placeholder={
              currentTab.placeholder
            }
            className="w-full rounded-button border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div className="w-full lg:w-56">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Location
          </label>

          <select
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value,
              )
            }
            className="w-full rounded-button border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            {locations.map(
              (item) => (
                <option
                  key={item}
                >
                  {item}
                </option>
              ),
            )}
          </select>
        </div>

        {activeTab ===
          "salaries" && (
          <div className="w-full lg:w-56">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Experience
            </label>

            <select
              value={
                experience
              }
              onChange={(e) =>
                setExperience(
                  e.target
                    .value,
                )
              }
              className="w-full rounded-button border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              {experiences.map(
                (item) => (
                  <option
                    key={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </div>
        )}

        <div className="flex items-end">
          <button
            onClick={
              handleSearch
            }
            className="w-full rounded-button bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 lg:w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}