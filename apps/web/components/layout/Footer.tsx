import Link from "next/link";

import {
  Globe,
  Share2,
  Camera,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white">
              D
            </div>

            <div>
              <p className="text-base font-bold tracking-tight text-gray-900">
                TalentDash
              </p>

              <p className="text-xs text-gray-500">
                Explore. Compare.
                Grow.
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-6 text-gray-600">
            Real salary data,
            honest reviews,
            interview prep and
            career intelligence
            from professionals
            worldwide.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <Link
              href="https://linkedin.com"
              className="text-gray-500 transition-colors hover:text-green-600"
              aria-label="LinkedIn"
            >
              <Globe className="h-5 w-5" />
            </Link>

            <Link
              href="https://twitter.com"
              className="text-gray-500 transition-colors hover:text-green-600"
              aria-label="Twitter"
            >
              <Share2 className="h-5 w-5" />
            </Link>

            <Link
              href="https://instagram.com"
              className="text-gray-500 transition-colors hover:text-green-600"
              aria-label="Instagram"
            >
              <Camera className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
            Explore
          </h3>

          <ul className="mt-5 space-y-3">
            <FooterLink
              href="/companies"
              label="Companies"
            />

            <FooterLink
              href="/salaries"
              label="Salaries"
            />

            <FooterLink
              href="/reviews"
              label="Reviews"
            />

            <FooterLink
              href="/interviews"
              label="Interviews"
            />

            <FooterLink
              href="/jobs"
              label="Jobs"
            />
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
            Resources
          </h3>

          <ul className="mt-5 space-y-3">
            <FooterLink
              href="/forum"
              label="Forum"
            />

            <FooterLink
              href="/offers"
              label="Offers"
            />

            <FooterLink
              href="/tools"
              label="Tools"
            />

            <FooterLink
              href="/workplace-index"
              label="Workplace Index"
            />

            <FooterLink
              href="/blog"
              label="Blog"
            />
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
            Company
          </h3>

          <ul className="mt-5 space-y-3">
            <FooterLink
              href="/about"
              label="About"
            />

            <FooterLink
              href="/careers"
              label="Careers"
            />

            <FooterLink
              href="/press"
              label="Press"
            />

            <FooterLink
              href="/privacy"
              label="Privacy Policy"
            />

            <FooterLink
              href="/terms"
              label="Terms of Service"
            />
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © 2025 TalentDash.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-green-600"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-green-600"
            >
              Terms
            </Link>

            <Link
              href="/sitemap.xml"
              className="transition-colors hover:text-green-600"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  href: string;
  label: string;
};

function FooterLink({
  href,
  label,
}: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-gray-600 transition-colors hover:text-green-600"
      >
        {label}
      </Link>
    </li>
  );
}