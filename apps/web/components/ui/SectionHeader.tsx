import Link from "next/link";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-600">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-3 text-base leading-7 text-gray-600">
            {subtitle}
          </p>
        ) : null}
      </div>

      {ctaLabel && ctaHref ? (
        <Link
          href={ctaHref}
          className="inline-flex items-center text-sm font-semibold text-green-600 transition-colors hover:text-green-700"
        >
          {ctaLabel}
          <span className="ml-1">→</span>
        </Link>
      ) : null}
    </div>
  );
}