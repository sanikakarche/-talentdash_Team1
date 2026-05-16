export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Career Tools</p>
          <h1 className="mt-4 text-5xl font-bold text-gray-900">Powerful Tools</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">Make smarter career decisions using our free tools.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Salary Calculator", desc: "Find your market value", href: "/tools/salary-calculator", usage: "1.2M+ used" },
            { name: "Salary Hike Calculator", desc: "Calculate your hike %", href: "/tools/hike-calculator", usage: "840K+ used" },
            { name: "Equity Calculator", desc: "Value your stock options", href: "/tools/equity-calculator", usage: "520K+ used" },
            { name: "Offer Comparator", desc: "Compare job offers", href: "/tools/offer-comparator", usage: "410K+ used" },
            { name: "Resume Analyzer", desc: "AI-powered resume review", href: "/tools/resume-analyzer", usage: "1.8M+ used" },
            { name: "Tax Calculator", desc: "Estimate take-home pay", href: "/tools/tax-calculator", usage: "670K+ used" },
          ].map((tool) => (
            <a key={tool.name} href={tool.href} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 text-lg">{tool.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{tool.desc}</p>
              <p className="mt-3 text-xs text-green-700 font-semibold">{tool.usage}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}