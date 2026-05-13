type HeatmapRow = {
  role: string;

  readonly salaries: readonly {
    city: string;

    value: string;

    level:
      | 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800;
  }[];
};

type Props = {
  rows: readonly HeatmapRow[];
};

function getHeatColor(
  level: number,
) {
  return `bg-green-${level}`;
}

export function SalaryHeatmapPreview({
  rows,
}: Props) {
  return (
    <section className="rounded-card border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
            Salary Intelligence
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            Salary Heatmap
          </h2>
        </div>

        <a
          href="/salaries/heatmap"
          className="text-sm font-medium text-green-700 hover:text-green-800"
        >
          View full heatmap →
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Role
              </th>

              {rows[0]?.salaries.map(
                (salary) => (
                  <th
                    key={
                      salary.city
                    }
                    className="px-4 py-3 text-center text-sm font-semibold text-gray-700"
                  >
                    {salary.city}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.role}
                className="border-t border-gray-100"
              >
                <td className="sticky left-0 whitespace-nowrap bg-white px-4 py-4 text-sm font-semibold text-gray-900">
                  {row.role}
                </td>

                {row.salaries.map(
                  (
                    salary,
                    index,
                  ) => (
                    <td
                      key={
                        index
                      }
                      className={`px-4 py-4 text-center text-sm font-semibold text-gray-900 ${getHeatColor(
                        salary.level,
                      )}`}
                    >
                      {
                        salary.value
                      }
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm text-gray-500">
          Lower
        </span>

        <div className="flex h-3 flex-1 overflow-hidden rounded-full">
          <div className="flex-1 bg-green-100" />
          <div className="flex-1 bg-green-200" />
          <div className="flex-1 bg-green-300" />
          <div className="flex-1 bg-green-400" />
          <div className="flex-1 bg-green-500" />
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-green-700" />
          <div className="flex-1 bg-green-800" />
        </div>

        <span className="text-sm text-gray-500">
          Higher
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Darker colors indicate
        higher compensation
        levels.
      </p>
    </section>
  );
}
