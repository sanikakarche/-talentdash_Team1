export default function JobsPage() {
  const jobs = [
    { title: "Senior Software Engineer", company: "Google", location: "Bangalore", type: "Full-time", salary: "₹40L - ₹80L", posted: "2h ago", tags: ["React", "Node.js", "GCP"] },
    { title: "Product Manager", company: "Amazon", location: "Hyderabad", type: "Full-time", salary: "₹35L - ₹65L", posted: "5h ago", tags: ["Product", "Agile", "SQL"] },
    { title: "Data Scientist", company: "Microsoft", location: "Bangalore", type: "Full-time", salary: "₹30L - ₹55L", posted: "8h ago", tags: ["Python", "ML", "Azure"] },
    { title: "Frontend Developer", company: "Flipkart", location: "Bangalore", type: "Full-time", salary: "₹18L - ₹35L", posted: "1d ago", tags: ["React", "TypeScript", "CSS"] },
    { title: "DevOps Engineer", company: "Swiggy", location: "Bangalore", type: "Full-time", salary: "₹22L - ₹40L", posted: "1d ago", tags: ["AWS", "Docker", "Kubernetes"] },
    { title: "UX Designer", company: "Zomato", location: "Delhi", type: "Full-time", salary: "₹15L - ₹28L", posted: "2d ago", tags: ["Figma", "User Research", "Prototyping"] },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Jobs</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Find Your Next Role</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Explore opportunities at top companies with verified salary ranges.</p>
          <div className="mt-8 flex gap-4">
            <input type="text" placeholder="Search by role, company or skill..." className="w-full max-w-xl rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">Search</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div key={job.title + job.company} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{job.company} · {job.location} · {job.posted}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-green-700">{job.salary}</p>
                  <p className="text-xs text-gray-500 mt-1">{job.type}</p>
                  <button className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}