export default function InterviewsByRolePage() {
  const roles = [
    { role: "Software Engineer", questions: 1240, companies: 180, topTopic: "DSA + System Design" },
    { role: "Senior Software Engineer", questions: 890, companies: 140, topTopic: "System Design + Leadership" },
    { role: "Product Manager", questions: 620, companies: 95, topTopic: "Product Sense + Analytics" },
    { role: "Data Scientist", questions: 480, companies: 75, topTopic: "ML + Statistics + SQL" },
    { role: "Frontend Developer", questions: 560, companies: 110, topTopic: "React + CSS + Performance" },
    { role: "DevOps Engineer", questions: 320, companies: 65, topTopic: "AWS + Docker + CI/CD" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Interviews</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Interviews by Role</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Filter interview experiences and questions by job role.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((r) => (
            <div key={r.role} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-bold text-gray-900 text-lg">{r.role}</h3>
              <p className="text-sm text-gray-500 mt-1">{r.companies} companies · {r.questions} questions</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full">Top: {r.topTopic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}