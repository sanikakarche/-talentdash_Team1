export default function BrandsPage() {
  const brands = [
    { name: "Google", category: "Tech Giant", score: 98, known: "Search, Cloud, AI" },
    { name: "Microsoft", category: "Tech Giant", score: 95, known: "Office, Azure, Gaming" },
    { name: "Amazon", category: "E-commerce", score: 92, known: "AWS, Prime, Retail" },
    { name: "Flipkart", category: "E-commerce", score: 85, known: "India's largest marketplace" },
    { name: "Swiggy", category: "Food Tech", score: 80, known: "Food delivery, Instamart" },
    { name: "Razorpay", category: "Fintech", score: 78, known: "Payments, Banking" },
  ];
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Brands</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Top Employer Brands</h1>
          <p className="mt-4 text-lg text-gray-600">Explore top employer brands and their workplace reputation.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((b) => (
            <div key={b.name} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{b.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{b.category}</p>
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-lg">
                  <p className="font-bold text-green-700">{b.score}</p>
                  <p className="text-xs text-gray-500">score</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">{b.known}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
