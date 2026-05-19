export default function SalaryHeatmapPage() {
  const rows = [
    { role: "Software Engineer", bangalore: "₹18L", mumbai: "₹16L", delhi: "₹17L", hyderabad: "₹16L", pune: "₹15L" },
    { role: "Product Manager", bangalore: "₹24L", mumbai: "₹22L", delhi: "₹21L", hyderabad: "₹20L", pune: "₹19L" },
    { role: "Data Scientist", bangalore: "₹20L", mumbai: "₹18L", delhi: "₹17L", hyderabad: "₹17L", pune: "₹16L" },
    { role: "Frontend Developer", bangalore: "₹14L", mumbai: "₹13L", delhi: "₹12L", hyderabad: "₹12L", pune: "₹11L" },
    { role: "DevOps Engineer", bangalore: "₹19L", mumbai: "₹17L", delhi: "₹16L", hyderabad: "₹16L", pune: "₹15L" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Salary Intelligence</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Salary Heatmap</h1>
          <p className="mt-4 text-lg text-gray-600">Compare compensation across cities and roles in India.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Role</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Bangalore</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Mumbai</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Delhi NCR</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Hyderabad</th>
                  <th className="text-center px-6 py-4 font-semibold text-gray-700">Pune</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.role} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.role}</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-700">{row.bangalore}</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">{row.mumbai}</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">{row.delhi}</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-500">{row.hyderabad}</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-500">{row.pune}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500">Darker green = higher compensation. Data from verified professionals.</p>
          </div>
        </div>
      </div>
    </main>
  );
}