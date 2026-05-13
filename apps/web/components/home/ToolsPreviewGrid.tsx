import {
  Calculator,
  BadgeDollarSign,
  BarChart3,
  FileText,
  Percent,
  Scale,
} from "lucide-react";

const iconMap = {
  salary: Calculator,

  hike: Percent,

  equity: BadgeDollarSign,

  offers: Scale,

  resume: FileText,

  tax: BarChart3,
};

type Tool = {
  key:
    | "salary"
    | "hike"
    | "equity"
    | "offers"
    | "resume"
    | "tax";

  name: string;

  usage: string;

  href: string;
};

type Props = {
  tools: readonly Tool[];
};

export function ToolsPreviewGrid({
  tools,
}: Props) {
  return (
    <section className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
          Career Tools
        </p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          Powerful tools.
          Smarter career
          moves.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
          Make smarter
          compensation and
          career decisions
          using professional
          tools built from
          real-world salary
          and offer data.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon =
            iconMap[
              tool.key
            ];

          return (
            <a
              key={tool.key}
              href={tool.href}
              className="group rounded-card border border-gray-200 bg-white p-5 transition hover:border-green-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {tool.name}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {
                  tool.usage
                }{" "}
                used
              </p>

              <div className="mt-6 text-sm font-semibold text-green-700 transition group-hover:translate-x-1">
                Calculate now →
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
