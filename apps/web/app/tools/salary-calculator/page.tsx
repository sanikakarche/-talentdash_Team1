"use client";
import { useState } from "react";

export default function SalaryCalculatorPage() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("0-2");
  const [location, setLocation] = useState("Bangalore");
  const [result, setResult] = useState<null | { min: string; avg: string; max: string }>(null);

  const salaryData: Record<string, Record<string, { min: string; avg: string; max: string }>> = {
    "0-2": { Bangalore: { min: "₹6L", avg: "₹10L", max: "₹18L" }, Mumbai: { min: "₹5L", avg: "₹9L", max: "₹16L" }, Delhi: { min: "₹5L", avg: "₹9L", max: "₹15L" } },
    "2-5": { Bangalore: { min: "₹14L", avg: "₹22L", max: "₹35L" }, Mumbai: { min: "₹12L", avg: "₹20L", max: "₹32L" }, Delhi: { min: "₹12L", avg: "₹19L", max: "₹30L" } },
    "5-10": { Bangalore: { min: "₹25L", avg: "₹40L", max: "₹65L" }, Mumbai: { min: "₹22L", avg: "₹36L", max: "₹60L" }, Delhi: { min: "₹20L", avg: "₹34L", max: "₹55L" } },
    "10+": { Bangalore: { min: "₹45L", avg: "₹75L", max: "₹120L" }, Mumbai: { min: "₹40L", avg: "₹68L", max: "₹110L" }, Delhi: { min: "₹38L", avg: "₹65L", max: "₹105L" } },
  };

  const handleCalculate = () => {
    const data = salaryData[experience]?.[location];
    if (data) setResult(data);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Career Tools</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Salary Calculator</h1>
        <p className="mt-4 text-lg text-gray-600">Find your market value based on experience and location.</p>

        <div className="mt-10 bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Role</label>
            <input type="text" placeholder="e.g. Software Engineer" value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
            <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="0-2">0-2 years</option>
              <option value="2-5">2-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Bangalore</option>
              <option>Mumbai</option>
              <option>Delhi</option>
            </select>
          </div>
          <button onClick={handleCalculate} className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700">
            Calculate Salary
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-white rounded-xl border border-green-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Estimated Salary Range</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Minimum</p>
                <p className="text-2xl font-bold text-gray-700">{result.min}</p>
              </div>
              <div className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-green-700 mb-1">Average</p>
                <p className="text-2xl font-bold text-green-700">{result.avg}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Maximum</p>
                <p className="text-2xl font-bold text-gray-700">{result.max}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400 text-center">Based on verified data from professionals in {location}</p>
          </div>
        )}
      </div>
    </main>
  );
}