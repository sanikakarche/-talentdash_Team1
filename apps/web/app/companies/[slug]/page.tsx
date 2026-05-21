type Props = { params: { slug: string } };

const companyData: Record<string, {
  name: string; industry: string; rating: number;
  avg: string; employees: string; recommend: number;
  about: string; reviews: { title: string; role: string; rating: number; pros: string; cons: string }[];
  salaries: { role: string; avg: string; range: string }[];
}> = {
  google: {
    name: "Google", industry: "Technology", rating: 4.4,
    avg: "₹45L", employees: "150K+", recommend: 89,
    about: "Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, and AI.",
    reviews: [
      { title: "Great place to grow", role: "Software Engineer", rating: 5, pros: "Amazing pay, smart colleagues, great perks", cons: "Slow promotions, lots of process" },
      { title: "Good but competitive", role: "Product Manager", rating: 4, pros: "Excellent WLB, great food", cons: "Hard to get promoted" },
    ],
    salaries: [
      { role: "Software Engineer L3", avg: "₹28L", range: "₹22L – ₹35L" },
      { role: "Software Engineer L4", avg: "₹45L", range: "₹35L – ₹60L" },
      { role: "Product Manager", avg: "₹52L", range: "₹40L – ₹70L" },
    ],
  },
  amazon: {
    name: "Amazon", industry: "E-commerce", rating: 3.8,
    avg: "₹32L", employees: "500K+", recommend: 71,
    about: "Amazon is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and AI.",
    reviews: [
      { title: "High pressure but good learning", role: "SDE-2", rating: 3, pros: "Fast learning, good pay", cons: "Poor WLB, on-call stress" },
      { title: "Intense but rewarding", role: "TPM", rating: 4, pros: "Great compensation, career growth", cons: "Long hours, frequent reorgs" },
    ],
    salaries: [
      { role: "SDE-1", avg: "₹22L", range: "₹18L – ₹28L" },
      { role: "SDE-2", avg: "₹38L", range: "₹30L – ₹50L" },
      { role: "Senior SDE", avg: "₹65L", range: "₹50L – ₹85L" },
    ],
  },
  microsoft: {
    name: "Microsoft", industry: "Technology", rating: 4.3,
    avg: "₹38L", employees: "220K+", recommend: 87,
    about: "Microsoft Corporation is an American multinational technology company producing computer software, consumer electronics, and cloud services.",
    reviews: [
      { title: "Great WLB and culture", role: "SDE-2", rating: 4, pros: "Good WLB, smart team, great benefits", cons: "Slow pace, legacy systems" },
    ],
    salaries: [
      { role: "SDE-1", avg: "₹20L", range: "₹16L – ₹26L" },
      { role: "SDE-2", avg: "₹35L", range: "₹28L – ₹45L" },
      { role: "Principal SDE", avg: "₹70L", range: "₹55L – ₹90L" },
    ],
  },
};

export default function CompanyDetailPage({ params }: Props) {
  const company = companyData[params.slug];

  if (!company) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Company not found</h1>
          <a href="/companies" className="mt-4 inline-block text-green-700 hover:underline">Browse all companies</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{company.name}</h1>
              <p className="mt-2 text-gray-500">{company.industry} · {company.employees} employees</p>
              <p className="mt-4 text-gray-600 max-w-2xl">{company.about}</p>
            </div>
            <div className="text-center bg-green-50 rounded-xl px-6 py-4">
              <p className="text-3xl font-bold text-green-700">{company.rating}</p>
              <p className="text-yellow-400">★★★★</p>
              <p className="text-sm text-gray-500 mt-1">{company.recommend}% recommend</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <div className="bg-gray-50 rounded-xl px-6 py-3">
              <p className="text-xs text-gray-500">Avg CTC</p>
              <p className="font-bold text-gray-900">{company.avg}</p>
            </div>
            <div className="bg-gray-50 rounded-xl px-6 py-3">
              <p className="text-xs text-gray-500">Employees</p>
              <p className="font-bold text-gray-900">{company.employees}</p>
            </div>
            <div className="bg-gray-50 rounded-xl px-6 py-3">
              <p className="text-xs text-gray-500">Recommend</p>
              <p className="font-bold text-green-700">{company.recommend}%</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Salaries</h2>
          <div className="flex flex-col gap-3">
            {company.salaries.map((s) => (
              <div key={s.role} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">{s.role}</p>
                <p className="text-xl font-bold text-green-700 mt-1">{s.avg}</p>
                <p className="text-sm text-gray-500">{s.range}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
          <div className="flex flex-col gap-3">
            {company.reviews.map((r) => (
              <div key={r.title} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{r.title}</p>
                    <p className="text-sm text-gray-500">{r.role}</p>
                  </div>
                  <span className="text-green-700 font-bold">{r.rating}.0 ★</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-green-50 rounded-lg p-2">
                    <p className="text-xs font-semibold text-green-700">Pros</p>
                    <p className="text-xs text-gray-600 mt-1">{r.pros}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-2">
                    <p className="text-xs font-semibold text-red-600">Cons</p>
                    <p className="text-xs text-gray-600 mt-1">{r.cons}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}