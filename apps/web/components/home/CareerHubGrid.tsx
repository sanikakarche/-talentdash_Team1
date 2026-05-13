import {
  Gift,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";

type Props = {
  region?: string;
};

export function CareerHubGrid({
  region,
}: Props) {
  const salary =
    region === "in"
      ? "₹28.4 LPA"
      : region === "uk"
        ? "£72K"
        : "$124K";

  const city =
    region === "in"
      ? "Bangalore"
      : region === "uk"
        ? "London"
        : "San Francisco";

  return (
    <section className="grid gap-6 lg:grid-cols-[40%_60%]">
      {/* LEFT */}
      <div className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
        <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
          ✨ Most Explored
        </div>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
          Compensation
          Intelligence
        </h2>

        <p className="mt-4 text-sm leading-6 text-gray-600">
          Real compensation
          benchmarks from
          verified professionals
          across the world.
        </p>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Average salary
          </p>

          <div className="mt-2 text-5xl font-bold tracking-tight text-gray-900">
            {salary}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex h-24 items-end gap-3">
            <div className="h-10 w-10 rounded-t-xl bg-green-200" />

            <div className="h-16 w-10 rounded-t-xl bg-green-400" />

            <div className="h-24 w-10 rounded-t-xl bg-green-600" />
          </div>

          <div className="mt-3 flex justify-between text-xs font-medium text-gray-500">
            <span>
              2023
            </span>

            <span>
              2024
            </span>

            <span>
              2025
            </span>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-800">
            ↑ 18% — AI
            Engineer salaries
            in {city} this year
          </p>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-900">
            Top paying
            companies
          </p>

          <div className="mt-4 flex items-center gap-2">
            {[
              "G",
              "M",
              "A",
              "🍎",
              "+15",
            ].map(
              (item) => (
                <div
                  key={item}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-800 shadow-sm"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-900">
            Popular searches
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "SDE Salary",
              "Product Manager",
              "Data Scientist",
              "Google",
              "Microsoft",
              "Amazon",
              city,
            ].map(
              (item) => (
                <a
                  key={item}
                  href="/salaries"
                  className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-green-300 hover:text-green-700"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>

        <a
          href="/salaries"
          className="mt-8 inline-flex text-sm font-semibold text-green-700 hover:text-green-800"
        >
          Explore salaries →
        </a>
      </div>

      {/* RIGHT GRID */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* CARD 1 */}
        <div className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
            <Star className="h-6 w-6" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-900">
            Company Reviews &
            Culture
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Read honest
            reviews and
            discover real
            workplace culture.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="text-3xl font-bold text-gray-900">
              4.1★
            </div>

            <div className="text-sm text-gray-500">
              72% Recommend to
              a friend
            </div>
          </div>

          <p className="mt-5 text-sm font-medium text-gray-700">
            1.2K reviews this
            week
          </p>

          <a
            href="/reviews"
            className="mt-6 inline-flex text-sm font-semibold text-green-700"
          >
            Explore reviews →
          </a>
        </div>

        {/* CARD 2 */}
        <div className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <MessageSquare className="h-6 w-6" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-900">
            Interview
            Experiences
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Practice with real
            interview questions
            shared by
            candidates.
          </p>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Meta PM interview
              difficulty:
              Increased this
              month
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "System Design",
              "SQL",
              "Product Sense",
            ].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          <a
            href="/interviews"
            className="mt-6 inline-flex text-sm font-semibold text-green-700"
          >
            Explore interviews →
          </a>
        </div>

        {/* CARD 3 */}
        <div className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Gift className="h-6 w-6" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-900">
            Offers &
            Negotiations
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Compare real
            compensation offers
            and negotiation
            outcomes.
          </p>

          <div className="mt-6 text-3xl font-bold text-gray-900">
            ₹42 LPA
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Median SDE II offer
          </p>

          <div className="mt-5 rounded-xl bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-800">
              63% negotiate
              successfully
            </p>
          </div>

          <a
            href="/offers"
            className="mt-6 inline-flex text-sm font-semibold text-green-700"
          >
            Explore offers →
          </a>
        </div>

        {/* CARD 4 */}
        <div className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <Users className="h-6 w-6" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-gray-900">
            Community
            Discussions
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Join discussions,
            ask questions and
            learn from
            professionals.
          </p>

          <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-900">
              “Are AI engineers
              now overpaid?”
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Layoffs 2025",
              "Career Switch",
              "Remote Jobs",
            ].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          <a
            href="/forum"
            className="mt-6 inline-flex text-sm font-semibold text-green-700"
          >
            Explore discussions →
          </a>
        </div>
      </div>
    </section>
  );
}