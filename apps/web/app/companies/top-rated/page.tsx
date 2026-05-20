export default function TopRatedCompaniesPage() {
  const companies = [
    { rank: 1, name: "Google", rating: 4.4, recommend: 89, reviews: "12K", industry: "Technology" },
    { rank: 2, name: "Microsoft", rating: 4.3, recommend: 87, reviews: "15K", industry: "Technology" },
    { rank: 3, name: "Flipkart", rating: 4.0, recommend: 78, reviews: "8K", industry: "E-commerce" },
    { rank: 4, name: "Swiggy", rating: 3.9, recommend: 74, reviews: "4K", industry: "Food Tech" },
    { rank: 5, name: "Amazon", rating: 3.8, recommend: 71, reviews: "22K", industry: "E-commerce" },
  ];
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Companies</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Top Rated Companies</h1>
          <p className="mt-4 text-lg text-gray-600">The highest rated workplaces based on verified employee reviews.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {companies.map((c) => (
            <div key={c.name} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <div className="text-3xl font-bold text-gray-200 w-10">#{c.rank}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.industry} · {c.reviews} reviews</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-700">{c.rating} ★</p>
                  <p className="text-sm text-gray-500">{c.recommend}% recommend</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
