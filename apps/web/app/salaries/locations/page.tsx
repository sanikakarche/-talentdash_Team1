export default function SalaryByLocationPage() {
  const locations = [
    { city: "Bangalore", avg: "₹22L", topRole: "Software Engineer", companies: 2400, growth: "+12%" },
    { city: "Mumbai", avg: "₹19L", topRole: "Product Manager", companies: 1800, growth: "+9%" },
    { city: "Delhi NCR", avg: "₹18L", topRole: "Data Scientist", companies: 1600, growth: "+11%" },
    { city: "Hyderabad", avg: "₹17L", topRole: "Software Engineer", companies: 1400, growth: "+14%" },
    { city: "Pune", avg: "₹15L", topRole: "Backend Developer", companies: 980, growth: "+8%" },
    { city: "Chennai", avg: "₹14L", topRole: "Software Engineer", companies: 860, growth: "+7%" },
    { city: "Kolkata", avg: "₹10L", topRole: "Frontend Developer", companies: 420, growth: "+5%" },
    { city: "Ahmedabad", avg: "₹9L", topRole: "Full Stack Developer", companies: 310, growth: "+6%" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Salaries</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Salaries by Location</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">See how compensation varies across cities in India.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((l) => (
            <div key={l.city} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{l.city}</h3>
                  <p className="text-sm text-gray-500 mt-1">{l.companies} companies</p>
                </div>
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">{l.growth}</span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-500">Top role</p>
                  <p className="text-sm font-medium text-gray-700">{l.topRole}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Avg CTC</p>
                  <p className="text-xl font-bold text-green-700">{l.avg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}