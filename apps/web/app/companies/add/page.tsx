export default function AddCompanyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Companies</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Add a Company</h1>
        <p className="mt-4 text-lg text-gray-600">Help others by adding a company to our database.</p>
        <div className="mt-10 bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input type="text" placeholder="e.g. Razorpay" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Technology</option>
              <option>E-commerce</option>
              <option>Fintech</option>
              <option>Food Tech</option>
              <option>IT Services</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
            <input type="text" placeholder="e.g. https://razorpay.com" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700">Submit Company</button>
        </div>
      </div>
    </main>
  );
}
