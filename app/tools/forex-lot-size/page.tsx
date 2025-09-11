"use client";
import { useState } from "react";

export default function ForexLotSizeCalculator() {
  const [balance, setBalance] = useState("");
  const [risk, setRisk] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [pipValue, setPipValue] = useState("10"); // default $10 per pip
  const [lotSize, setLotSize] = useState<number | null>(null);

  const calculateLotSize = () => {
    const bal = parseFloat(balance);
    const r = parseFloat(risk);
    const sl = parseFloat(stopLoss);
    const pip = parseFloat(pipValue);

    if (!bal || !r || !sl || !pip) return;

    const riskAmount = bal * (r / 100);
    const size = riskAmount / (sl * pip);
    setLotSize(size);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Forex Lot Size Calculator</h2>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Account Balance ($)"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Risk % per Trade"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Stop Loss (pips)"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Pip Value ($)"
          value={pipValue}
          onChange={(e) => setPipValue(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={calculateLotSize}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Calculate Lot Size
        </button>

        {lotSize !== null && (
          <p className="mt-4 text-lg font-semibold">
            Lot Size: {lotSize.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}
