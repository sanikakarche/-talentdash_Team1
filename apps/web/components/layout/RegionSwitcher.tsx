"use client";

import { Globe } from "lucide-react";

import Cookies from "js-cookie";

import {
  usePathname,
  useRouter,
} from "next/navigation";

const REGIONS = [
  {
    label: "Global",
    value: "",
    flag: "🌍",
  },
  {
    label: "India",
    value: "in",
    flag: "🇮🇳",
  },
  {
    label: "United States",
    value: "us",
    flag: "🇺🇸",
  },
  {
    label: "United Kingdom",
    value: "uk",
    flag: "🇬🇧",
  },
];

export function RegionSwitcher() {
  const pathname = usePathname();

  const router = useRouter();

  function handleChange(
    value: string,
  ) {
    Cookies.set(
      "talentdash-region",
      value || "global",
      {
        expires: 365,
      },
    );

    const cleanPath =
      pathname.replace(
        /^\/(in|us|uk)/,
        "",
      );

    const nextPath = value
      ? `/${value}${cleanPath}`
      : cleanPath || "/";

    router.push(nextPath);
  }

  const activeRegion =
    REGIONS.find((region) => {
      if (!region.value) {
        return (
          !pathname.startsWith("/in") &&
          !pathname.startsWith("/us") &&
          !pathname.startsWith("/uk")
        );
      }

      return pathname.startsWith(
        `/${region.value}`,
      );
    }) || REGIONS[0];

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />

      <select
        aria-label="Select region"
        value={activeRegion.value}
        onChange={(event) =>
          handleChange(
            event.target.value,
          )
        }
        className="rounded-button border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none transition-colors focus:border-green-500"
      >
        {REGIONS.map((region) => (
          <option
            key={region.label}
            value={region.value}
          >
            {region.flag} {region.label}
          </option>
        ))}
      </select>
    </div>
  );
}