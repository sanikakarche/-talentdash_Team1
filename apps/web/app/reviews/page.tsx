export default function ReviewsPage() {
  const reviews = [
    { company: "Google", role: "Software Engineer", rating: 5, title: "Amazing work culture and growth", pros: "Great pay, smart colleagues, excellent work-life balance", cons: "Slow promotions, lots of bureaucracy", date: "May 2026" },
    { company: "Amazon", role: "SDE-2", rating: 3, title: "High pressure but good learning", pros: "Fast-paced environment, good compensation", cons: "Work-life balance is poor, on-call stress", date: "Apr 2026" },
    { company: "Microsoft", role: "Product Manager", rating: 4, title: "Great place to grow your career", pros: "Good work-life balance, smart team, great benefits", cons: "Can be slow to move, legacy systems", date: "Apr 2026" },
    { company: "Flipkart", role: "Data Scientist", rating: 4, title: "Exciting problems to solve", pros: "Interesting data problems, good team culture", cons: "Compensation below market rate", date: "Mar 2026" },
    { company: "Swiggy", role: "Frontend Developer", rating: 3, title: "Fast growth startup experience", pros: "Fast learning, good exposure", cons: "Long hours, frequent pivots", date: "Mar 2026" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Company Reviews</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Honest Workplace Reviews</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Read verified reviews from real employees across top companies.</p>
          <div className="mt-8 flex gap-4">
            <input type="text" placeholder="Search by company or role..." className="w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">Search</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div key={r.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{r.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{r.role} at {r.company} · {r.date}</p>
                </div>
                <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-green-700 font-bold">{r.rating}.0</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-700 uppercase mb-1">Pros</p>
                  <p className="text-sm text-gray-700">{r.pros}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-red-600 uppercase mb-1">Cons</p>
                  <p className="text-sm text-gray-700">{r.cons}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}