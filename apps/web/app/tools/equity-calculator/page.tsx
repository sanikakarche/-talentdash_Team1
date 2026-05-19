"use client";
import { useState } from "react";

export default function EquityCalculatorPage() {
  const [shares, setShares] = useState("");
  const [price, setPrice] = useState("");
  const [years, setYears] = useState("4");
  const [result, setResult] = useState<null | { total: string; perYear: string; perMonth: string }>(null);

  const handleCalculate = () => {
    const s = parseFloat(shares);
    const p = parseFloat(price);
    const y = parseFloat(years);
    if (!s || !p || !y) return;
    const total = s * p;
    setResult({
      total: `$${total.toLocaleString()}`,
      perYear: `$${(total / y).toLocaleString()}`,
      perMonth: `$${Math.round(total / y / 12).toLocaleString()}`,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Career Tools</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Equity Calculator</h1>
        <p className="mt-4 text-lg text-gray-600">Estimate the value of your stock options or RSUs.</p>
        <div className="mt-10 bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Shares / RSUs</label>
            <input type="number" placeholder="e.g. 1000" value={shares} onChange={(e) => setShares(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock Price ($)</label>
            <input type="number" placeholder="e.g. 150" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vesting Period</label>
            <select value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="4">4 years</option>
            </select>
          </div>
          <button onClick={handleCalculate} className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700">Calculate Equity Value</button>
        </div>
        {result && (
          <div className="mt-6 bg-white rounded-xl border border-green-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Your Equity Value</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-green-700 mb-1">Total Value</p>
                <p className="text-xl font-bold text-green-700">{result.total}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Per Year</p>
                <p className="text-xl font-bold text-gray-700">{result.perYear}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Per Month</p>
                <p className="text-xl font-bold text-gray-700">{result.perMonth}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}