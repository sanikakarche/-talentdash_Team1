export default function CompareCompaniesPage() {
  const companies = [
    { name: "Google", rating: 4.4, avg: "₹45L", wlb: "4.5", growth: "4.2", culture: "4.6", recommend: 89 },
    { name: "Amazon", rating: 3.8, avg: "₹32L", wlb: "3.2", growth: "4.0", culture: "3.5", recommend: 71 },
    { name: "Microsoft", rating: 4.3, avg: "₹38L", wlb: "4.3", growth: "4.1", culture: "4.4", recommend: 87 },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Companies</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Compare Companies</h1>
          <p className="mt-4 text-lg text-gray-600">Side-by-side comparison of salaries, ratings and culture.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Metric</th>
                {companies.map((c) => (
                  <th key={c.name} className="text-center px-6 py-4 font-semibold text-gray-700">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Overall Rating", key: "rating" },
                { label: "Avg CTC", key: "avg" },
                { label: "Work-Life Balance", key: "wlb" },
                { label: "Career Growth", key: "growth" },
                { label: "Culture", key: "culture" },
                { label: "Recommend %", key: "recommend" },
              ].map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 font-medium text-gray-700">{row.label}</td>
                  {companies.map((c) => (
                    <td key={c.name} className="px-6 py-4 text-center font-semibold text-green-700">
                      {c[row.key as keyof typeof c]}
                      {row.key === "recommend" ? "%" : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}