export default function AddSalaryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Contribute</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Add Your Salary</h1>
        <p className="mt-4 text-lg text-gray-600">Share your compensation anonymously and help thousands make better career decisions.</p>
        <div className="mt-10 bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input type="text" placeholder="e.g. Google" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input type="text" placeholder="e.g. SDE-2" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Base Salary (₹L)</label>
              <input type="number" placeholder="e.g. 20" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total CTC (₹L)</label>
              <input type="number" placeholder="e.g. 28" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Delhi NCR</option>
                <option>Hyderabad</option>
                <option>Pune</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>0-2 years</option>
                <option>2-5 years</option>
                <option>5-10 years</option>
                <option>10+ years</option>
              </select>
            </div>
          </div>
          <button className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700">Submit Salary Anonymously</button>
          <p className="text-xs text-center text-gray-400">Your identity is never shared. All data is anonymous.</p>
        </div>
      </div>
    </main>
  );
}