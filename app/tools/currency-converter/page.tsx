"use client";
import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);

  // ✅ Currency list fetch karna
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        if (data.rates) {
          setCurrencies(Object.keys(data.rates));
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  // ✅ Conversion calculate karna
  const convertCurrency = async () => {
    try {
      const res = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );
      const data = await res.json();
      if (data.rates && data.rates[toCurrency]) {
        const converted = amount * data.rates[toCurrency];
        setResult(converted);
      }
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
<div className="max-w-lg mx-auto mt-10 rounded-2xl shadow-xl border border-gray-200 bg-white/30 backdrop-blur-lg">
  {/* Inner container with solid background for text clarity */}
  <div className="p-6 bg-white rounded-2xl relative z-10">
    <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">
      🌍 Currency Converter
    </h1>

    {/* Amount Input */}
    <div className="mb-4">
      <label className="block font-medium">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full border p-2 rounded mt-1"
      />
    </div>

    {/* From Currency */}
    <div className="mb-4">
      <label className="block font-medium">From</label>
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        className="w-full border p-2 rounded mt-1"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>

    {/* To Currency */}
    <div className="mb-4">
      <label className="block font-medium">To</label>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        className="w-full border p-2 rounded mt-1"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>

    {/* Convert Button */}
    <button
      onClick={convertCurrency}
      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
    >
      Convert
    </button>

    {/* Result */}
    {result !== null && (
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold">Converted Amount:</h2>
        <p className="text-2xl font-bold text-green-600">
          {result.toFixed(2)} {toCurrency}
        </p>
      </div>
    )}
  </div>
</div>

  );
}
