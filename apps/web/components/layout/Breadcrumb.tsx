import Link from "next/link";

import {
  ChevronRight,
} from "lucide-react";

import {
  buildBreadcrumbSchema,
} from "@/lib/seo/structured-data";

type BreadcrumbItem = {
  label: string;

  href: string;
};

type BreadcrumbProps = {
  crumbs: BreadcrumbItem[];
};

export function Breadcrumb({
  crumbs,
}: BreadcrumbProps) {
  const schema =
    buildBreadcrumbSchema(
      crumbs.map(
        (crumb) => ({
          name:
            crumb.label,

          url: crumb.href,
        }),
      ),
    );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              schema,
            ),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="hidden border-b border-gray-200 bg-white md:block"
      >
        <div className="mx-auto flex max-w-7xl items-center px-4 py-3 text-sm sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-2 text-gray-500">
            {crumbs.map(
              (
                crumb,
                index,
              ) => {
                const isLast =
                  index ===
                  crumbs.length -
                    1;

                return (
                  <li
                    key={
                      crumb.href
                    }
                    className="flex items-center gap-2"
                  >
                    {!isLast ? (
                      <Link
                        href={
                          crumb.href
                        }
                        className="transition-colors hover:text-green-600"
                      >
                        {
                          crumb.label
                        }
                      </Link>
                    ) : (
                      <span className="font-medium text-gray-900">
                        {
                          crumb.label
                        }
                      </span>
                    )}

                    {!isLast && (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </li>
                );
              },
            )}
          </ol>
        </div>
      </nav>
    </>
  );
}