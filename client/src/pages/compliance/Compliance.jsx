import React from "react";

/**
 * Compliance page (UI-only, mock data)
 * Purpose: Check displayed prices against EU dual pricing & rounding rules
 * Yellow system used for attention/violations (not actions)
 */

const mockMeta = {
  exchangeRate: "1.95583",
  roundingPolicy: "HALF_UP",
  dualPricingEnabled: true,
};

const mockCheck = {
  product: { id: 3, name: "Apples", unit: "kg", category: "Fruit" },
  input: { displayedBgn: "1.55", displayedEur: null },
  expectedEur: "0.79",
  violations: [
    { code: "EUR_MISSING", message: "EUR price is required during dual pricing period" },
  ],
};

function Badge({ tone = "slate", children }) {
  const base = "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium";
  const tones = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    yellow: "border-[rgba(255,214,23,0.35)] bg-[rgba(255,214,23,0.2)] text-slate-800",
    green: "border-green-200 bg-green-50 text-green-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };
  return <span className={`${base} ${tones[tone] || tones.slate}`}>{children}</span>;
}

function SectionCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export default function Compliance() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 border-t-4 border-[#FFD617] pt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold text-[#003399]">Compliance check</h1>
            <Badge tone="yellow">EU rules</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Validate displayed prices against EU dual pricing and rounding requirements.
          </p>
        </div>

        {/* Context banner */}
        <div className="mb-6 rounded-2xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
            <span>Exchange rate:</span>
            <span className="font-semibold text-[#003399]">{mockMeta.exchangeRate}</span>
            <span>•</span>
            <span>Rounding:</span>
            <span className="font-medium">{mockMeta.roundingPolicy}</span>
            {mockMeta.dualPricingEnabled && (
              <Badge tone="yellow">Dual pricing active</Badge>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Input section */}
          <SectionCard title="Input">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Product</label>
                <input
                  disabled
                  value={`${mockCheck.product.name} (${mockCheck.product.unit})`}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Category</label>
                <input
                  disabled
                  value={mockCheck.product.category}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Displayed BGN</label>
                <input
                  disabled
                  value={mockCheck.input.displayedBgn}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Displayed EUR</label>
                <input
                  disabled
                  value={mockCheck.input.displayedEur ?? "-"}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </SectionCard>

          {/* Result section */}
          <SectionCard title="Result">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-600">Expected EUR:</span>
              <span className="text-lg font-semibold text-[#003399]">
                {mockCheck.expectedEur}
              </span>
            </div>

            {mockCheck.violations.length === 0 ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                No compliance issues detected.
              </div>
            ) : (
              <div className="space-y-2">
                {mockCheck.violations.map((v) => (
                  <div
                    key={v.code}
                    className="rounded-xl border-l-4 border-[#FFD617] bg-white p-3 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Badge tone="yellow">{v.code}</Badge>
                      <span className="font-medium text-slate-800">Violation</span>
                    </div>
                    <p className="mt-1 text-slate-700">{v.message}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Clear
          </button>
          <button className="rounded-lg bg-[#003399] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Check again
          </button>
        </div>
      </div>
    </div>
  );
}
