export default function InterviewQuestionsPage() {
  const questions = [
    { company: "Google", role: "SDE-2", difficulty: "Hard", type: "DSA", question: "Find the longest substring without repeating characters.", asked: "2 weeks ago" },
    { company: "Amazon", role: "SDE-1", difficulty: "Medium", type: "System Design", question: "Design a URL shortener like bit.ly.", asked: "1 week ago" },
    { company: "Microsoft", role: "SDE-2", difficulty: "Medium", type: "DSA", question: "Given a binary tree, find the maximum path sum.", asked: "3 days ago" },
    { company: "Flipkart", role: "SDE-1", difficulty: "Easy", type: "DSA", question: "Reverse a linked list iteratively and recursively.", asked: "5 days ago" },
    { company: "Meta", role: "Senior SDE", difficulty: "Hard", type: "System Design", question: "Design Facebook's news feed system.", asked: "1 week ago" },
    { company: "Swiggy", role: "SDE-1", difficulty: "Medium", type: "Behavioral", question: "Tell me about a time you handled a production incident.", asked: "2 days ago" },
  ];

  const difficultyColor: Record<string, string> = {
    Easy: "text-green-700 bg-green-50",
    Medium: "text-yellow-700 bg-yellow-50",
    Hard: "text-red-700 bg-red-50",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Interviews</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Interview Questions</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Real questions asked at top companies, shared by candidates.</p>
          <div className="mt-8 flex gap-4">
            <input type="text" placeholder="Search questions..." className="w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">Search</button>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full">{q.type}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
                  </div>
                  <p className="font-semibold text-gray-900">{q.question}</p>
                  <p className="mt-2 text-sm text-gray-500">{q.company} · {q.role} · {q.asked}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}