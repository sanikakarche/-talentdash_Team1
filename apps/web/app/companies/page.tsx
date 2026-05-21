export default function CompaniesPage() {
  const companies = [
    { name: "Google", slug: "google", industry: "Technology", rating: 4.4, reviews: "12K", avg: "₹45L", employees: "150K+", recommend: 89 },
    { name: "Microsoft", slug: "microsoft", industry: "Technology", rating: 4.3, reviews: "15K", avg: "₹38L", employees: "220K+", recommend: 87 },
    { name: "Amazon", slug: "amazon", industry: "E-commerce", rating: 3.8, reviews: "22K", avg: "₹32L", employees: "500K+", recommend: 71 },
    { name: "Flipkart", slug: "flipkart", industry: "E-commerce", rating: 4.0, reviews: "8K", avg: "₹28L", employees: "30K+", recommend: 78 },
    { name: "Swiggy", slug: "swiggy", industry: "Food Tech", rating: 3.9, reviews: "4K", avg: "₹22L", employees: "5K+", recommend: 74 },
    { name: "Zomato", slug: "zomato", industry: "Food Tech", rating: 3.7, reviews: "3K", avg: "₹20L", employees: "4K+", recommend: 69 },
    { name: "Infosys", slug: "infosys", industry: "IT Services", rating: 3.6, reviews: "30K", avg: "₹8L", employees: "300K+", recommend: 65 },
    { name: "TCS", slug: "tcs", industry: "IT Services", rating: 3.5, reviews: "45K", avg: "₹7L", employees: "600K+", recommend: 62 },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Companies</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Browse Companies</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Explore salaries, reviews and culture at top companies in India.</p>
          <div className="mt-8 flex gap-4">
            <input type="text" placeholder="Search companies..." className="w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">Search</button>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((c) => (
            <a key={c.name} href={`/companies/${c.slug}`} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow block">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{c.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{c.industry} · {c.employees}</p>
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-lg text-center">
                  <p className="font-bold text-green-700">{c.rating}</p>
                  <p className="text-yellow-400 text-xs">★★★★</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-500">Avg CTC</p>
                  <p className="font-bold text-gray-900 text-sm">{c.avg}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Reviews</p>
                  <p className="font-bold text-gray-900 text-sm">{c.reviews}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Recommend</p>
                  <p className="font-bold text-green-700 text-sm">{c.recommend}%</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}