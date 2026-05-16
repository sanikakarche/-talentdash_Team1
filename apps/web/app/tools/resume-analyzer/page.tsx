export default function ResumeAnalyzerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Career Tools</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Resume Analyzer</h1>
        <p className="mt-4 text-lg text-gray-600">Get AI-powered feedback on your resume instantly.</p>
        <div className="mt-10 bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12">
            <p className="text-gray-500 text-sm">Drag & drop your resume here</p>
            <p className="text-gray-400 text-xs mt-2">PDF or DOCX, max 5MB</p>
            <button className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">
              Upload Resume
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}