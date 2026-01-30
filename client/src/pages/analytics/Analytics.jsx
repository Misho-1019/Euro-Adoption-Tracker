import React from "react";

/**
 * Analytics page (UI-only, mock data)
 * Purpose: Price dynamics, inflation comparison, rounding impact
 * Yellow = deltas / insights, Blue = authority / metrics
 */

const mockMeta = {
  periodA: { start: "2026-01-01", end: "2026-02-01" },
  periodB: { start: "2026-03-01", end: "2026-05-01" },
  exchangeRate: "1.95583",
};

const mockSummary = {
  countCompared: 23,
  avgExactChangePct: "17.57",
  avgDisplayChangePct: "17.57",
  avgRoundingDeltaEur: "-0.00",
};

const mockSpikes = [
  {
    product: "Milk 1L",
    previousPrice: "2.10",
    currentPrice: "3.20",
    changePct: "52.38",
    effectiveFrom: "2026-03-12",
  },
  {
    product: "Apples",
    previousPrice: "1.20",
    currentPrice: "1.95",
    changePct: "62.50",
    effectiveFrom: "2026-04-02",
  },
];

function Badge({ tone = "slate", children }) {
  const base =
    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium";
  const tones = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    yellow:
      "border-[rgba(255,214,23,0.35)] bg-[rgba(255,214,23,0.2)] text-slate-800",
    green: "border-green-200 bg-green-50 text-green-700",
  };
  return <span className={`${base} ${tones[tone] || tones.slate}`}>{children}</span>;
}

function MetricCard({ label, value, highlight }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div
        className={`mt-1 text-2xl font-semibold ${
          highlight ? "text-[#003399]" : "text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 border-t-4 border-[#FFD617] pt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold text-[#003399]">Analytics</h1>
            <Badge tone="yellow">EU insights</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Analyze price changes, inflation trends, and rounding effects.
          </p>
        </div>

        {/* Period selection */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="yellow">Period selection</Badge>
              <span className="text-sm text-slate-600">
                Compare two time periods for price analysis
              </span>
              <span className="text-sm text-slate-500">•</span>
              <span className="text-sm text-slate-700">Rate:</span>
              <span className="text-sm font-semibold text-[#003399]">
                {mockMeta.exchangeRate}
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Period A
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="date"
                    value={mockMeta.periodA.start}
                    disabled
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="date"
                    value={mockMeta.periodA.end}
                    disabled
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Period B
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="date"
                    value={mockMeta.periodB.start}
                    disabled
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="date"
                    value={mockMeta.periodB.end}
                    disabled
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <button className="h-10 rounded-lg bg-[#003399] px-4 text-sm font-medium text-white hover:opacity-90">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Products compared"
            value={String(mockSummary.countCompared)}
          />
          <MetricCard
            label="Avg change (exact %)"
            value={mockSummary.avgExactChangePct}
          />
          <MetricCard
            label="Avg change (display %)"
            value={mockSummary.avgDisplayChangePct}
            highlight
          />
          <MetricCard
            label="Avg rounding delta (EUR)"
            value={mockSummary.avgRoundingDeltaEur}
          />
        </div>

        {/* Spikes table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-slate-800">
                Price spikes
              </div>
              <Badge tone="yellow">Above threshold</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                Filter
              </button>
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                Export
              </button>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead className="bg-slate-100 text-left text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Previous price</th>
                <th className="px-4 py-3">Current price</th>
                <th className="px-4 py-3">Change (%)</th>
                <th className="px-4 py-3">Effective from</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockSpikes.map((s) => (
                <tr key={s.product} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {s.product}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {s.previousPrice}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{s.currentPrice}</td>
                  <td className="px-4 py-3">
                    <Badge tone="yellow">+{s.changePct}%</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{s.effectiveFrom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Insight note */}
        <div className="mt-6 rounded-2xl border-l-4 border-[#FFD617] bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            Percentage changes are calculated using both exact and display prices to
            assess rounding impact on inflation reporting.
          </p>
        </div>
      </div>
    </div>
  );
}
