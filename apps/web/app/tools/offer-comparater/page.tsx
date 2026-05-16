export default function OfferComparatorPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Career Tools</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Offer Comparator</h1>
        <p className="mt-4 text-lg text-gray-600">Compare two job offers side by side.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {["Offer A", "Offer B"].map((offer) => (
            <div key={offer} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="font-bold text-gray-900 text-lg">{offer}</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" placeholder="Company name" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary</label>
                <input type="number" placeholder="e.g. 1200000" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
                <input type="number" placeholder="e.g. 100000" className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700">
          Compare Offers
        </button>
      </div>
    </main>
  );
}