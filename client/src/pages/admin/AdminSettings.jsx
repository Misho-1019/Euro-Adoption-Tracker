import React from "react";

const mockSettings = {
  dualPricingEnabled: true,
  dualPricingStart: "2025-01-01",
  dualPricingEnd: "2026-12-31",
  roundingPolicy: "HALF_UP",
};

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

function SectionCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export default function AdminSettins() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 border-t-4 border-[#FFD617] pt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold text-[#003399]">Settings</h1>
            <Badge tone="yellow">EU regulation</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            System-wide configuration affecting pricing, compliance, and analytics.
          </p>
        </div>

        {/* Info banner */}
        <div className="mb-6 rounded-2xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">
            These settings are based on EU euro adoption requirements. Changes apply
            immediately across the system.
          </p>
        </div>

        <div className="space-y-6">
          {/* Dual pricing section */}
          <SectionCard title="Dual pricing">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-700">
                  Enable dual pricing
                </div>
                <p className="text-sm text-slate-500">
                  Display prices in both BGN and EUR during the transition period.
                </p>
              </div>
              <Badge tone={mockSettings.dualPricingEnabled ? "green" : "slate"}>
                {mockSettings.dualPricingEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Start date
                </label>
                <input
                  type="date"
                  value={mockSettings.dualPricingStart}
                  disabled
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  End date
                </label>
                <input
                  type="date"
                  value={mockSettings.dualPricingEnd}
                  disabled
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="rounded-xl bg-[rgba(255,214,23,0.15)] p-3 text-sm text-slate-700">
              During this period, missing EUR prices will be flagged as compliance
              issues.
            </div>
          </SectionCard>

          {/* Rounding section */}
          <SectionCard title="Rounding policy">
            <div>
              <label className="text-sm font-medium text-slate-700">
                EUR rounding method
              </label>
              <select
                disabled
                value={mockSettings.roundingPolicy}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm"
              >
                <option>HALF_UP</option>
              </select>
              <p className="mt-2 text-sm text-slate-500">
                Applied when converting BGN to displayable EUR values.
              </p>
            </div>

            <div className="rounded-xl border-l-4 border-[#FFD617] bg-white p-3 text-sm text-slate-700">
              The rounding policy affects basket totals, analytics averages, and
              compliance checks.
            </div>
          </SectionCard>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Reset
          </button>
          <button className="rounded-lg bg-[#003399] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
