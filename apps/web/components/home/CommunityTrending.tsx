import Image from "next/image";

type Thread = {
  id: string;

  title: string;

  company: string;

  logo: string;

  replies: number;

  timeAgo: string;

  badge?:
    | "Hot"
    | "Trending";
};

type Props = {
  threads: Thread[];
};

export function CommunityTrending({
  threads,
}: Props) {
  return (
    <section className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
          Community
        </p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          What professionals
          are discussing
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
          Join active
          conversations around
          compensation,
          layoffs, career
          growth, remote work
          and industry trends.
        </p>
      </div>

      <div className="space-y-4">
        {threads.map(
          (thread) => (
            <a
              key={thread.id}
              href={`/forum/${thread.id}`}
              className="flex flex-col gap-4 rounded-card border border-gray-200 p-4 transition hover:border-green-300 hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gray-100 bg-white">
                  <Image
                    src={
                      thread.logo
                    }
                    alt={
                      thread.company
                    }
                    fill
                    className="object-contain p-2"
                    sizes="48px"
                  />
                </div>

                <div>
                  <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                    {
                      thread.title
                    }
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span>
                      {
                        thread
                          .replies
                      }{" "}
                      replies
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      {
                        thread.timeAgo
                      }
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      {
                        thread.company
                      }
                    </span>
                  </div>
                </div>
              </div>

              {thread.badge && (
                <div
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    thread.badge ===
                    "Hot"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {thread.badge ===
                  "Hot"
                    ? "🔥 Hot"
                    : "📈 Trending"}
                </div>
              )}
            </a>
          ),
        )}
      </div>
    </section>
  );
}