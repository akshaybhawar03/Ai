"use client";
import { useState } from "react";

export default function LoanEmiCalculator() {
  const [amount, setAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [emi, setEmi] = useState<number | null>(null);

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(Number(emiValue.toFixed(2)));
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Loan EMI Calculator 🏦</h1>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Loan Amount"
          className="w-full p-2 border rounded"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          className="w-full p-2 border rounded"
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Tenure (years)"
          className="w-full p-2 border rounded"
          onChange={(e) => setTenure(Number(e.target.value))}
        />

        <button
          onClick={calculateEMI}
          className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Calculate EMI
        </button>

        {emi && (
          <div className="mt-4 text-lg font-semibold">
            Your EMI: ₹ {emi}
          </div>
        )}
      </div>
    </div>
  );
}
