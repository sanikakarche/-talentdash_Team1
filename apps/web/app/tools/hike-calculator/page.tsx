export default function HikeCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Career Tools</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Salary Hike Calculator</h1>
        <p className="mt-4 text-lg text-gray-600">Calculate your salary hike percentage and new CTC.</p>
        <div className="mt-10 bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Salary (₹)</label>
            <input type="number" placeholder="e.g. 800000" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hike Percentage (%)</label>
            <input type="number" placeholder="e.g. 30" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700">
            Calculate New Salary
          </button>
        </div>
      </div>
    </main>
  );
}