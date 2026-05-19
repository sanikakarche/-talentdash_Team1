export default function ForumPage() {
  const threads = [
    { title: "Amazon SDE-2 salary hike 2026 — What are you expecting?", company: "Amazon", replies: 190, views: "12K", timeAgo: "1h ago", badge: "Hot", category: "Compensation" },
    { title: "Is remote work slowly disappearing in big tech?", company: "Meta", replies: 142, views: "9K", timeAgo: "3h ago", badge: "Trending", category: "Work Culture" },
    { title: "Best cities for AI engineers in 2026?", company: "Google", replies: 88, views: "6K", timeAgo: "5h ago", badge: "Trending", category: "Career" },
    { title: "Should freshers still target FAANG companies?", company: "Microsoft", replies: 76, views: "5K", timeAgo: "8h ago", badge: "", category: "Career" },
    { title: "Tech layoffs vs AI hiring boom discussion", company: "Apple", replies: 112, views: "7K", timeAgo: "10h ago", badge: "", category: "Industry" },
    { title: "How to negotiate a 40% hike when switching jobs?", company: "Flipkart", replies: 64, views: "4K", timeAgo: "12h ago", badge: "", category: "Compensation" },
  ];

  const categories = ["All", "Compensation", "Career", "Work Culture", "Industry", "Interviews"];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Community</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Community Forum</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Join discussions with professionals on compensation, careers and workplace topics.</p>
          <div className="mt-8 flex gap-4">
            <input type="text" placeholder="Search discussions..." className="w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">Search</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button key={cat} className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-700 transition-colors">
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {threads.map((t) => (
            <div key={t.title} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">{t.category}</span>
                    {t.badge && <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">{t.badge}</span>}
                  </div>
                  <h3 className="font-semibold text-gray-900">{t.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{t.company} · {t.timeAgo}</p>
                </div>
                <div className="text-right text-sm text-gray-500 shrink-0">
                  <p className="font-semibold text-gray-700">{t.replies} replies</p>
                  <p>{t.views} views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}