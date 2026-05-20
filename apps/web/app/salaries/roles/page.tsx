export default function SalaryByRolePage() {
  const roles = [
    { role: "Software Engineer", avg: "₹18L", range: "₹8L – ₹45L", openings: 1240, yoe: "0-8 years" },
    { role: "Senior Software Engineer", avg: "₹32L", range: "₹20L – ₹65L", openings: 890, yoe: "4-10 years" },
    { role: "Product Manager", avg: "₹24L", range: "₹12L – ₹55L", openings: 420, yoe: "2-8 years" },
    { role: "Data Scientist", avg: "₹20L", range: "₹10L – ₹45L", openings: 680, yoe: "1-7 years" },
    { role: "Frontend Developer", avg: "₹14L", range: "₹6L – ₹30L", openings: 950, yoe: "0-6 years" },
    { role: "Backend Developer", avg: "₹16L", range: "₹7L – ₹35L", openings: 870, yoe: "0-7 years" },
    { role: "DevOps Engineer", avg: "₹19L", range: "₹9L – ₹40L", openings: 390, yoe: "2-8 years" },
    { role: "Engineering Manager", avg: "₹48L", range: "₹30L – ₹90L", openings: 180, yoe: "8+ years" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Salaries</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Salaries by Role</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Browse compensation data organized by job role across India.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((r) => (
            <div key={r.role} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{r.role}</h3>
                  <p className="text-sm text-gray-500 mt-1">{r.yoe} experience · {r.openings} openings</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-700">{r.avg}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.range}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}