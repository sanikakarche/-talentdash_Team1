export default function OffersPage() {
  const offers = [
    { role: "SDE-2", company: "Amazon", base: "₹28L", bonus: "₹4L", equity: "₹8L", total: "₹40L", yoe: "3 years", negotiated: true },
    { role: "Senior Engineer", company: "Google", base: "₹40L", bonus: "₹8L", equity: "₹20L", total: "₹68L", yoe: "5 years", negotiated: true },
    { role: "Product Manager", company: "Microsoft", base: "₹32L", bonus: "₹6L", equity: "₹12L", total: "₹50L", yoe: "4 years", negotiated: false },
    { role: "Data Scientist", company: "Flipkart", base: "₹22L", bonus: "₹3L", equity: "₹5L", total: "₹30L", yoe: "2 years", negotiated: true },
    { role: "Frontend Developer", company: "Swiggy", base: "₹18L", bonus: "₹2L", equity: "₹4L", total: "₹24L", yoe: "2 years", negotiated: false },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Offers</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Offers & Negotiations</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Real compensation offers shared anonymously by professionals. Know your worth before you negotiate.</p>
          <div className="mt-6 flex gap-6">
            <div className="bg-green-50 rounded-xl px-6 py-4">
              <p className="text-2xl font-bold text-green-700">63%</p>
              <p className="text-sm text-gray-600">negotiate successfully</p>
            </div>
            <div className="bg-green-50 rounded-xl px-6 py-4">
              <p className="text-2xl font-bold text-green-700">₹42L</p>
              <p className="text-sm text-gray-600">median SDE-2 offer</p>
            </div>
            <div className="bg-green-50 rounded-xl px-6 py-4">
              <p className="text-2xl font-bold text-green-700">18%</p>
              <p className="text-sm text-gray-600">avg hike negotiated</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Offers</h2>
        <div className="flex flex-col gap-4">
          {offers.map((offer) => (
            <div key={offer.role + offer.company} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{offer.role}</h3>
                  <p className="text-sm text-gray-500 mt-1">{offer.company} · {offer.yoe} experience</p>
                  {offer.negotiated && (
                    <span className="mt-2 inline-block text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">Negotiated</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-700">{offer.total}</p>
                  <p className="text-xs text-gray-500">Total Comp</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-500">Base</p>
                  <p className="font-semibold text-gray-900">{offer.base}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bonus</p>
                  <p className="font-semibold text-gray-900">{offer.bonus}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Equity</p>
                  <p className="font-semibold text-gray-900">{offer.equity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}