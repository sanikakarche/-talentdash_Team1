import Link from "next/link";

import {
  Heart,
  Building2,
} from "lucide-react";

import { DropdownMenu } from "./DropdownMenu";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { RegionSwitcher } from "./RegionSwitcher";

const companyItems = [
  {
    label: "Browse Companies",
    href: "/companies",
  },
  {
    label: "Compare Companies",
    href: "/companies/compare",
  },
  {
    label: "Top Rated Companies",
    href: "/companies/top-rated",
  },
  {
    label: "Add a Company",
    href: "/companies/add",
  },
];

const salaryItems = [
  {
    label: "Browse Salaries",
    href: "/salaries",
  },
  {
    label: "Salary Heatmap",
    href: "/salaries/heatmap",
  },
  {
    label: "By Job Role",
    href: "/salaries/roles",
  },
  {
    label: "By Location",
    href: "/salaries/locations",
  },
  {
    label: "Add Your Salary",
    href: "/salaries/add",
  },
];

const interviewItems = [
  {
    label: "Browse Questions",
    href: "/interviews/questions",
  },
  {
    label: "By Role",
    href: "/interviews/roles",
  },
  {
    label: "By Company",
    href: "/interviews/companies",
  },
  {
    label: "Share Experience",
    href: "/interviews/share",
  },
];

const toolItems = [
  {
    label: "Salary Calculator",
    href: "/tools/salary-calculator",
  },
  {
    label: "Hike Calculator",
    href: "/tools/hike-calculator",
  },
  {
    label: "Equity Calculator",
    href: "/tools/equity-calculator",
  },
  {
    label: "Tax Calculator",
    href: "/tools/tax-calculator",
  },
  {
    label: "Offer Comparator",
    href: "/tools/offer-comparator",
  },
  {
    label: "Resume Analyzer",
    href: "/tools/resume-analyzer",
  },
];

const mobileItems = [
  {
    label: "Companies",
    href: "/companies",
  },
  {
    label: "Salaries",
    href: "/salaries",
  },
  {
    label: "Reviews",
    href: "/reviews",
  },
  {
    label: "Interviews",
    href: "/interviews",
  },
  {
    label: "Jobs",
    href: "/jobs",
  },
  {
    label: "Forum",
    href: "/forum",
  },
  {
    label: "Offers",
    href: "/offers",
  },
  {
    label: "Tools",
    href: "/tools",
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white">
                D
              </div>

              <div className="hidden sm:block">
                <p className="text-base font-bold tracking-tight text-gray-900">
                  TalentDash
                </p>

                <p className="text-xs text-gray-500">
                  Explore. Compare.
                  Grow.
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              <DropdownMenu
                label="Companies"
                items={companyItems}
              />

              <DropdownMenu
                label="Salaries"
                items={salaryItems}
              />

              <Link
                href="/reviews"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
              >
                Reviews
              </Link>

              <DropdownMenu
                label="Interviews"
                items={
                  interviewItems
                }
              />

              <Link
                href="/jobs"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
              >
                Jobs
              </Link>

              <Link
                href="/forum"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
              >
                Forum
              </Link>

              <Link
                href="/offers"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
              >
                Offers
              </Link>

              <DropdownMenu
                label="Tools"
                items={toolItems}
              />

              <Link
                href="/brands"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
              >
                Brands
              </Link>
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-button bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              Sign up
            </Link>

            <Link
              href="/contribute"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
            >
              <Heart className="h-4 w-4" />

              Contribute
            </Link>

            <Link
              href="/employer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
            >
              <Building2 className="h-4 w-4" />

              Employer
            </Link>
          </div>

          <MobileNavDrawer
            items={mobileItems}
          />
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="mx-auto flex h-12 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <RegionSwitcher />
        </div>
      </div>
    </header>
  );
}