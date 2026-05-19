"use client";
import { useState } from "react";

export default function TaxCalculatorPage() {
  const [ctc, setCtc] = useState("");
  const [regime, setRegime] = useState("new");
  const [result, setResult] = useState<null | { tax: string; inHand: string; monthly: string; effective: string }>(null);

  const handleCalculate = () => {
    const income = parseFloat(ctc) * 100000;
    if (!income) return;
    let tax = 0;
    if (regime === "new") {
      if (income <= 300000) tax = 0;
      else if (income <= 600000) tax = (income - 300000) * 0.05;
      else if (income <= 900000) tax = 15000 + (income - 600000) * 0.10;
      else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
      else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.20;
      else tax = 150000 + (income - 1500000) * 0.30;
    } else {
      if (income <= 250000) tax = 0;
      else if (income <= 500000) tax = (income - 250000) * 0.05;
      else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.20;
      else tax = 112500 + (income - 1000000) * 0.30;
    }
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const inHand = income - totalTax;
    setResult({
      tax: `₹${Math.round(totalTax).toLocaleString()}`,
      inHand: `₹${Math.round(inHand).toLocaleString()}`,
      monthly: `₹${Math.round(inHand / 12).toLocaleString()}`,
      effective: `${((totalTax / income) * 100).toFixed(1)}%`,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">Career Tools</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Tax Calculator</h1>
        <p className="mt-4 text-lg text-gray-600">Estimate your in-hand salary after Indian income tax.</p>
        <div className="mt-10 bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual CTC (in Lakhs)</label>
            <input type="number" placeholder="e.g. 15" value={ctc} onChange={(e) => setCtc(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Regime</label>
            <select value={regime} onChange={(e) => setRegime(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="new">New Tax Regime</option>
              <option value="old">Old Tax Regime</option>
            </select>
          </div>
          <button onClick={handleCalculate} className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700">Calculate Tax</button>
        </div>
        {result && (
          <div className="mt-6 bg-white rounded-xl border border-green-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tax Breakdown</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-green-700 mb-1">In-Hand Annual</p>
                <p className="text-xl font-bold text-green-700">{result.inHand}</p>
              </div>
              <div className="text-center bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-green-700 mb-1">Monthly Take-Home</p>
                <p className="text-xl font-bold text-green-700">{result.monthly}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Total Tax</p>
                <p className="text-xl font-bold text-gray-700">{result.tax}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Effective Rate</p>
                <p className="text-xl font-bold text-gray-700">{result.effective}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}