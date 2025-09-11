"use client";
import { useState } from "react";

export default function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState<number | null>(null);

  const calculateSIP = () => {
    const n = years * 12; // total months
    const r = rate / 100 / 12; // monthly rate
    const maturity =
      monthlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    setResult(maturity);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/finance-bg.svg')" }}
    >
      {/* Calculator Box */}
      <div className="max-w-lg w-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          SIP Calculator
        </h1>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Monthly Investment (₹)
          </label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Expected Return Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateSIP}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Maturity Value:
            </h2>
            <p className="text-2xl font-bold text-green-600">
              ₹ {result.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
