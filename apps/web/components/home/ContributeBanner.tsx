export function ContributeBanner() {
  return (
    <section className="overflow-hidden rounded-card border border-green-100 bg-green-50">
      <div className="flex flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            Contribute
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Add your salary &
            unlock all insights
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Help thousands of
            professionals make
            smarter career
            decisions by sharing
            your compensation
            anonymously.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[
                "A",
                "S",
                "R",
                "K",
              ].map(
                (item) => (
                  <div
                    key={item}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-green-600 text-sm font-semibold text-white"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>

            <p className="text-sm font-medium text-gray-700">
              Join 85K+
              professionals
              contributing data
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/contribute/salary"
            className="inline-flex items-center justify-center rounded-button bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Add your salary
          </a>

          <a
            href="/reviews/write"
            className="inline-flex items-center justify-center rounded-button border border-green-200 bg-white px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
          >
            Write a review
          </a>
        </div>
      </div>
    </section>
  );
}