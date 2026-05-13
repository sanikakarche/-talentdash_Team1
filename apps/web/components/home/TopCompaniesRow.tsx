import Image from "next/image";

type Company = {
  name: string;

  slug: string;

  logo: string;

  compensation: string;

  trend: string;
};

type Props = {
  companies: Company[];
};

export function TopCompaniesRow({
  companies,
}: Props) {
  return (
    <section className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
            Companies
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            Top Paying Companies
          </h2>
        </div>

        <a
          href="/companies"
          className="text-sm font-medium text-green-700 hover:text-green-800"
        >
          View all companies →
        </a>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {companies.map(
          (company) => (
            <a
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="min-w-[240px] rounded-card border border-gray-200 bg-white p-5 transition hover:border-green-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  <Image
                    src={
                      company.logo
                    }
                    alt={
                      company.name
                    }
                    fill
                    className="object-contain p-2"
                    sizes="56px"
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {
                      company.name
                    }
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Avg Total Comp
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold tracking-tight text-gray-900">
                    {
                      company.compensation
                    }
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  ↑{" "}
                  {
                    company.trend
                  }
                </span>
              </div>
            </a>
          ),
        )}
      </div>
    </section>
  );
}