import React from "react";

/**
 * Dashboard (UI-only, mock data)
 * Purpose: one glance overview across rate, dual pricing, compliance, basket, analytics.
 * No charts for now (keeps it clean), but includes placeholders for future.
 */

const mock = {
  rate: { value: "1.95583", source: "BNB", effectiveFrom: "1999-01-01" },
  dualPricing: { enabled: true, start: "2025-01-01", end: "2026-12-31" },
  catalog: { products: 100, categories: 10, priced: 97, missingTags: 3 },
  compliance: {
    lastRun: "2026-01-28 14:05",
    checksToday: 18,
    violationsToday: 4,
    topCodes: [
      { code: "EUR_MISSING", count: 2 },
      { code: "EUR_MISMATCH", count: 1 },
      { code: "BGN_MISSING", count: 1 },
    ],
  },
  basket: {
    lastQuote: "2026-01-29 09:10",
    totalBgn: "42.80",
    totalEurDisplay: "21.89",
    roundingImpact: "-0.01",
  },
  analytics: {
    periodA: { start: "2026-01-01", end: "2026-02-01" },
    periodB: { start: "2026-03-01", end: "2026-05-01" },
    avgDisplayChangePct: "17.57",
    spikes: 2,
  },
  tasks: [
    { label: "Set prices for missing tags", tone: "yellow", value: "3 products" },
    { label: "Review spikes", tone: "blue", value: "2 flagged" },
    { label: "Check rounding config", tone: "slate", value: "HALF_UP" },
  ],
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
    red: "border-red-200 bg-red-50 text-red-700",
  };

  return <span className={`${base} ${tones[tone] || tones.slate}`}>{children}</span>;
}

function Card({ title, right, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="text-sm font-semibold text-slate-800">{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, emphasize }) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div
        className={`mt-1 text-2xl font-semibold ${
          emphasize ? "text-[#003399]" : "text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 border-t-4 border-[#FFD617] pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold text-[#003399]">Dashboard</h1>
            <Badge tone="yellow">EU overview</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            One-glance monitoring for rate, pricing, compliance, basket totals, and
            analytics.
          </p>
        </div>

        {/* Top KPI row */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Exchange rate" right={<Badge tone="blue">/rate/current</Badge>}>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-bold text-[#003399]">
                {mock.rate.value}
              </div>
              <div className="text-sm text-slate-500">BGN per 1 EUR</div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span>Source:</span>
              <span className="font-medium text-slate-900">{mock.rate.source}</span>
              <span className="text-slate-400">•</span>
              <span>Effective:</span>
              <span className="font-medium text-slate-900">
                {mock.rate.effectiveFrom}
              </span>
            </div>
          </Card>

          <Card
            title="Dual pricing"
            right={<Badge tone={mock.dualPricing.enabled ? "yellow" : "slate"}>{mock.dualPricing.enabled ? "Enabled" : "Disabled"}</Badge>}
          >
            <Stat
              label="Period"
              value={`${mock.dualPricing.start} – ${mock.dualPricing.end}`}
            />
            <div className="mt-3 text-xs text-slate-500">
              During this period, price tags should show both BGN and EUR.
            </div>
          </Card>

          <Card title="Catalog health" right={<Badge tone="blue">/products</Badge>}>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Products" value={mock.catalog.products} emphasize />
              <Stat label="Categories" value={mock.catalog.categories} />
              <Stat label="Priced" value={mock.catalog.priced} />
              <Stat label="Missing tags" value={mock.catalog.missingTags} />
            </div>
          </Card>

          <Card title="Compliance today" right={<Badge tone="yellow">/compliance/check</Badge>}>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Checks" value={mock.compliance.checksToday} emphasize />
              <Stat label="Violations" value={mock.compliance.violationsToday} />
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Last run: {mock.compliance.lastRun}
            </div>
          </Card>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Tasks */}
          <div className="lg:col-span-1 space-y-6">
            <Card title="Action items" right={<Badge tone="yellow">Priority</Badge>}>
              <div className="space-y-3">
                {mock.tasks.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">{t.label}</div>
                      <div className="text-xs text-slate-500">Suggested next step</div>
                    </div>
                    <Badge tone={t.tone}>{t.value}</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-3 text-sm text-slate-700">
                Tip: keep prices updated regularly to improve analytics reliability.
              </div>
            </Card>

            <Card title="Compliance codes" right={<Badge tone="slate">Today</Badge>}>
              <div className="space-y-2">
                {mock.compliance.topCodes.map((c) => (
                  <div key={c.code} className="flex items-center justify-between">
                    <div className="text-sm text-slate-700">{c.code}</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {c.count}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-end">
                <button className="rounded-lg bg-[#003399] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  Open compliance
                </button>
              </div>
            </Card>
          </div>

          {/* Middle: Basket + Analytics */}
          <div className="lg:col-span-1 space-y-6">
            <Card title="Latest basket quote" right={<Badge tone="blue">/basket/quote</Badge>}>
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Total (BGN)" value={mock.basket.totalBgn} />
                <Stat label="Total (EUR display)" value={mock.basket.totalEurDisplay} emphasize />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Rounding impact</span>
                <span className="font-medium text-slate-900">
                  {mock.basket.roundingImpact}
                </span>
              </div>
              <div className="mt-3 text-xs text-slate-500">Last quote: {mock.basket.lastQuote}</div>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  View basket
                </button>
                <button className="rounded-lg bg-[#003399] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  New quote
                </button>
              </div>
            </Card>

            <Card title="Analytics snapshot" right={<Badge tone="blue">/analytics/summary</Badge>}>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="yellow">Period A</Badge>
                  <span className="font-medium">{mock.analytics.periodA.start}</span>
                  <span className="text-slate-400">–</span>
                  <span className="font-medium">{mock.analytics.periodA.end}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge tone="yellow">Period B</Badge>
                  <span className="font-medium">{mock.analytics.periodB.start}</span>
                  <span className="text-slate-400">–</span>
                  <span className="font-medium">{mock.analytics.periodB.end}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Stat label="Avg change (display %)" value={mock.analytics.avgDisplayChangePct} emphasize />
                <Stat label="Spikes flagged" value={mock.analytics.spikes} />
              </div>

              <div className="mt-4 flex items-center justify-end">
                <button className="rounded-lg bg-[#003399] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                  Open analytics
                </button>
              </div>
            </Card>
          </div>

          {/* Right: Quick links */}
          <div className="lg:col-span-1 space-y-6">
            <Card title="Quick actions" right={<Badge tone="yellow">EU</Badge>}>
              <div className="grid grid-cols-1 gap-3">
                <button className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50">
                  <div className="text-sm font-semibold text-slate-900">Add product</div>
                  <div className="mt-1 text-sm text-slate-500">POST /products</div>
                </button>
                <button className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50">
                  <div className="text-sm font-semibold text-slate-900">Create category</div>
                  <div className="mt-1 text-sm text-slate-500">POST /categories</div>
                </button>
                <button className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50">
                  <div className="text-sm font-semibold text-slate-900">Adjust settings</div>
                  <div className="mt-1 text-sm text-slate-500">PUT /settings/:key</div>
                </button>
                <button className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:bg-slate-50">
                  <div className="text-sm font-semibold text-slate-900">Run compliance check</div>
                  <div className="mt-1 text-sm text-slate-500">POST /compliance/check</div>
                </button>
              </div>

              <div className="mt-4 rounded-xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-3 text-sm text-slate-700">
                You can keep this dashboard minimal now and add charts later when real data flows in.
              </div>
            </Card>

            <Card title="System status" right={<Badge tone="green">OK</Badge>}>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">API</span>
                  <span className="font-medium text-slate-900">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Dual pricing</span>
                  <span className="font-medium text-slate-900">
                    {mock.dualPricing.enabled ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Rounding</span>
                  <span className="font-medium text-slate-900">HALF_UP</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
