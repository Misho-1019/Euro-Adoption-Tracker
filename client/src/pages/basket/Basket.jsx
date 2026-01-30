import React from "react";

const mockMeta = {
  exchangeRate: "1.95583",
  roundingPolicy: "HALF_UP",
};

const mockBasket = {
  items: [
    {
      id: 1,
      name: "Milk 1L",
      unit: "l",
      qty: "2",
      unitPriceBgn: "2.10",
      unitPriceEurExact: "1.0730",
      unitPriceEurDisplay: "1.07",
      lineTotalBgn: "4.20",
      lineTotalEurExact: "2.1460",
      lineTotalEurDisplay: "2.14",
    },
    {
      id: 2,
      name: "Bread White",
      unit: "pcs",
      qty: "1",
      unitPriceBgn: "1.80",
      unitPriceEurExact: "0.9206",
      unitPriceEurDisplay: "0.92",
      lineTotalBgn: "1.80",
      lineTotalEurExact: "0.9206",
      lineTotalEurDisplay: "0.92",
    },
  ],
  totals: {
    totalBgn: "6.00",
    totalEurExact: "3.0666",
    totalEurDisplay: "3.06",
    roundingImpact: "-0.0066",
  },
};

function Badge({ tone = "slate", children }) {
  const base = "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium";
  const tones = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    yellow: "border-[rgba(255,214,23,0.35)] bg-[rgba(255,214,23,0.2)] text-slate-800",
    green: "border-green-200 bg-green-50 text-green-700",
  };
  return <span className={`${base} ${tones[tone] || tones.slate}`}>{children}</span>;
}

function SummaryCard({ label, value, highlight }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className={`mt-1 text-xl font-semibold ${highlight ? "text-[#003399]" : "text-slate-900"}`}>
        {value}
      </div>
    </div>
  );
}

export default function Basket() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 border-t-4 border-[#FFD617] pt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold text-[#003399]">Basket quote</h1>
            <Badge tone="yellow">EU pricing</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Calculate basket totals using official exchange rate and rounding rules.
          </p>
        </div>

        {/* Context bar */}
        <div className="mb-6 rounded-2xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
            <span>Exchange rate:</span>
            <span className="font-semibold text-[#003399]">{mockMeta.exchangeRate}</span>
            <span>•</span>
            <span>Rounding:</span>
            <span className="font-medium">{mockMeta.roundingPolicy}</span>
          </div>
        </div>

        {/* Basket table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100 text-left text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Unit price (BGN)</th>
                <th className="px-4 py-3">Unit price (EUR)</th>
                <th className="px-4 py-3">Line total (EUR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockBasket.items.map((i) => (
                <tr key={i.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {i.name}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{i.qty}</td>
                  <td className="px-4 py-3 text-slate-800">{i.unitPriceBgn}</td>
                  <td className="px-4 py-3 font-medium text-[#003399]">
                    {i.unitPriceEurDisplay}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#003399]">
                    {i.lineTotalEurDisplay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Total (BGN)" value={mockBasket.totals.totalBgn} />
          <SummaryCard label="Total (EUR exact)" value={mockBasket.totals.totalEurExact} />
          <SummaryCard
            label="Total (EUR display)"
            value={mockBasket.totals.totalEurDisplay}
            highlight
          />
          <SummaryCard
            label="Rounding impact (EUR)"
            value={mockBasket.totals.roundingImpact}
          />
        </div>

        {/* Rounding note */}
        <div className="mt-6 rounded-2xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            The rounding impact shows the difference between exact EUR totals and
            displayable EUR values, as required by EU regulations.
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Clear basket
          </button>
          <button className="rounded-lg bg-[#003399] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Recalculate
          </button>
        </div>
      </div>
    </div>
  );
}
