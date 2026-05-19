"use client";
import { useState } from "react";

export default function HikeCalculatorPage() {
  const [current, setCurrent] = useState("");
  const [hike, setHike] = useState("");
  const [result, setResult] = useState<null | { newSalary: string; increase: string; monthly: string }>(null);

  const handleCalculate = () => {
    const currentNum = parseFloat(current);
    const hikeNum = parseFloat(hike);
    if (!currentNum || !hikeNum) return;
    const increase = (currentNum * hikeNum) / 100;
    const newSalary = currentNum + increase;
    setResult({
      newSalary: `₹${newSalary.toFixed(2)}L`,
      increase: `₹${increase.toFixed(2)}L`,
      monthly: `₹${((newSalary * 100000) / 12).toFixed(0)}`,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Career Tools</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Salary Hike Calculator</h1>
        <p className="mt-4 text-lg text-gray-600">Calculate your new salary after a hike.</p>

        <div className="mt-10 bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current CTC (in Lakhs)</label>
            <input type="number" placeholder="e.g. 8" value={current} onChange={(e) => setCurrent(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hike Percentage (%)</label>
            <input type="number" placeholder="e.g. 30" value={hike} onChange={(e) => setHike(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button onClick={handleCalculate} className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700">
            Calculate New Salary
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-white rounded-xl border border-green-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Your New Compensation</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-green-700 mb-1">New CTC</p>
                <p className="text-xl font-bold text-green-700">{result.newSalary}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Increase</p>
                <p className="text-xl font-bold text-gray-700">{result.increase}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Monthly</p>
                <p className="text-xl font-bold text-gray-700">{result.monthly}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}