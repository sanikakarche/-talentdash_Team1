export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Companies</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Browse Companies</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Explore reviews, salaries and culture at top companies.</p>
          <div className="mt-8 flex gap-4">
            <input type="text" placeholder="Search companies..." className="w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">Search</button>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Google", rating: "4.4", reviews: "12K", avg: "$248K" },
            { name: "Meta", rating: "4.2", reviews: "8K", avg: "$262K" },
            { name: "Amazon", rating: "3.8", reviews: "22K", avg: "$221K" },
            { name: "Apple", rating: "4.3", reviews: "10K", avg: "$244K" },
            { name: "Microsoft", rating: "4.3", reviews: "15K", avg: "$212K" },
            { name: "Netflix", rating: "4.1", reviews: "4K", avg: "$310K" },
          ].map((c) => (
            <div key={c.name} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 text-lg">{c.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{c.reviews} reviews</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-green-700 font-semibold">⭐ {c.rating}</span>
                <span className="text-gray-700 font-bold">{c.avg} avg</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}