export default function SalariesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Salary Intelligence</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Explore Salaries</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Real compensation data from verified professionals across top companies and roles.
          </p>
          <div className="mt-8 flex gap-4">
            <input
              type="text"
              placeholder="Search by role, company or location..."
              className="w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Roles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { role: "Software Engineer", avg: "$145K", range: "$110K – $210K" },
            { role: "Product Manager", avg: "$138K", range: "$105K – $195K" },
            { role: "Data Scientist", avg: "$132K", range: "$100K – $185K" },
            { role: "Frontend Developer", avg: "$125K", range: "$95K – $175K" },
            { role: "DevOps Engineer", avg: "$140K", range: "$108K – $200K" },
            { role: "UX Designer", avg: "$110K", range: "$85K – $155K" },
          ].map((item) => (
            <div key={item.role} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">{item.role}</h3>
              <p className="mt-2 text-2xl font-bold text-green-700">{item.avg}</p>
              <p className="mt-1 text-sm text-gray-500">{item.range}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}