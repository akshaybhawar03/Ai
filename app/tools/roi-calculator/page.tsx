"use client";
import { useMemo, useState } from "react";


type NumberLike = number | string;

export default function ROICalculatorPage() {
  const [campaignCost, setCampaignCost] = useState<NumberLike>("");
  const [revenue, setRevenue] = useState<NumberLike>("");

  // Derived metrics
  const parsedCost = useMemo(() => Number(campaignCost) || 0, [campaignCost]);
  const parsedRevenue = useMemo(() => Number(revenue) || 0, [revenue]);

  const profit = useMemo(() => parsedRevenue - parsedCost, [parsedRevenue, parsedCost]);
  const roiPct = useMemo(() => {
    if (parsedCost <= 0) return 0;
    return (profit / parsedCost) * 100;
  }, [profit, parsedCost]);

  const roas = useMemo(() => {
    if (parsedCost <= 0) return 0;
    return parsedRevenue / parsedCost; // Return on Ad Spend
  }, [parsedRevenue, parsedCost]);

  const isInvalid = parsedCost < 0 || parsedRevenue < 0;

  return (
  
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-700">ROI Calculator</h1>
          <p className="text-sm text-gray-600">Marketing campaign ka ROI, Profit, aur ROAS turant dekho.</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Campaign Cost (₹)</label>
            <input
              type="number"
              min={0}
              value={campaignCost}
              onChange={(e) => setCampaignCost(e.target.value)}
              placeholder="e.g. 50000"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Revenue (₹)</label>
            <input
              type="number"
              min={0}
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="e.g. 120000"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {isInvalid && (
          <p className="text-sm text-red-600">Please enter non-negative values.</p>
        )}

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Profit" value={`₹ ${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
          <StatCard label="ROI" value={`${roiPct.toFixed(2)} %`} />
          <StatCard label="ROAS" value={`${roas.toFixed(2)}x`} />
        </div>

        {/* Quick tips */}
        <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>ROI</strong> = (Revenue − Cost) ÷ Cost × 100</li>
            <li><strong>ROAS</strong> = Revenue ÷ Ad Spend (Cost)</li>
            <li>ROI &gt; 0% ⇒ profit; ROI &lt; 0% ⇒ loss</li>
          </ul>
        </div>
      </div>
   
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-semibold text-gray-800">{value}</div>
    </div>
  );
}
