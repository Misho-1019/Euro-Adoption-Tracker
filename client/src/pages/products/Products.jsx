import React, { useState } from "react";

const mockMeta = {
  asOf: "2026-01-16 10:35",
  exchangeRate: "1.95583",
  dualPricing: { enabled: true, start: "2025-01-01", end: "2026-12-31" },
};

const mockKpis = [
  { label: "Products", value: "100" },
  { label: "Categories", value: "10" },
  { label: "Missing price tags", value: "3" },
  { label: "Avg rounding delta (EUR)", value: "-0.00" },
];

const mockProducts = [
  {
    id: 1,
    name: "Milk 1L",
    unit: "l",
    category: "Dairy",
    priceBgn: "2.10",
    priceEur: "1.07",
    effectiveFrom: "2026-01-16",
    status: "OK",
  },
  {
    id: 2,
    name: "Bread White",
    unit: "pcs",
    category: "Bakery",
    priceBgn: "1.80",
    priceEur: "0.92",
    effectiveFrom: "2026-01-16",
    status: "OK",
  },
  {
    id: 3,
    name: "Apples",
    unit: "kg",
    category: "Fruit",
    priceBgn: null,
    priceEur: null,
    effectiveFrom: null,
    status: "MISSING",
  },
  {
    id: 4,
    name: "Mineral Water 1.5L",
    unit: "l",
    category: "Beverages",
    priceBgn: "1.20",
    priceEur: "0.61",
    effectiveFrom: "2026-01-10",
    status: "OK",
  },
  {
    id: 5,
    name: "Eggs (10 pack)",
    unit: "pcs",
    category: "Dairy",
    priceBgn: "4.99",
    priceEur: "2.55",
    effectiveFrom: "2026-01-14",
    status: "OK",
  },
];

// UI-only mock for GET /products/:id/prices
const mockHistory = {
  product: { id: 1, name: "Milk 1L", unit: "l", category: "Dairy" },
  rows: [
    {
      id: 101,
      effectiveFrom: "2026-01-16T23:00:40.473Z",
      priceBgn: "2.10",
      rateBgnPerEur: "1.95583",
      priceEurExact: "1.0730",
      priceEurDisplay: "1.07",
      roundingPolicy: "HALF_UP",
    },
    {
      id: 99,
      effectiveFrom: "2026-01-01T00:00:00.000Z",
      priceBgn: "1.99",
      rateBgnPerEur: "1.95583",
      priceEurExact: "1.0176",
      priceEurDisplay: "1.02",
      roundingPolicy: "HALF_UP",
    },
    {
      id: 88,
      effectiveFrom: "2025-12-01T00:00:00.000Z",
      priceBgn: "1.85",
      rateBgnPerEur: "1.95583",
      priceEurExact: "0.9458",
      priceEurDisplay: "0.95",
      roundingPolicy: "HALF_UP",
    },
  ],
};

function displayOrDash(value) {
  return value == null || value === "" ? "-" : String(value);
}

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

  return (
    <span className={`${base} ${tones[tone] || tones.slate}`}>{children}</span>
  );
}

function KpiCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-4 py-3">
        <div className="h-4 w-44 rounded bg-slate-100" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-10 rounded bg-slate-100" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-24 rounded bg-slate-100" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 rounded bg-slate-100" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 rounded bg-slate-100" />
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 rounded bg-slate-100" />
      </td>
      <td className="px-4 py-3">
        <div className="h-6 w-20 rounded bg-slate-100" />
      </td>
      <td className="px-4 py-3">
        <div className="h-6 w-24 rounded bg-slate-100" />
      </td>
    </tr>
  );
}

function PriceHistoryModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop (click closes) */}
      <button
        aria-label="Close price history"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40"
      />

      {/* Panel */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900">
                Price history
              </h3>
              <Badge tone="blue">/products/:id/prices</Badge>
              <Badge tone="yellow">EU pricing</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {mockHistory.product.name} ({mockHistory.product.unit}) •{" "}
              {mockHistory.product.category}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Context strip */}
          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-3 text-sm text-slate-700">
            <span className="font-medium text-slate-800">Note:</span>
            <span>
              EUR display values follow the rounding policy saved with each price
              snapshot.
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full border-collapse">
              <thead className="bg-slate-100 text-left text-sm text-slate-600">
                <tr>
                  <th className="px-4 py-3">Effective from</th>
                  <th className="px-4 py-3">BGN</th>
                  <th className="px-4 py-3">Rate</th>
                  <th className="px-4 py-3">EUR exact</th>
                  <th className="px-4 py-3">EUR display</th>
                  <th className="px-4 py-3">Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {mockHistory.rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">
                      {r.effectiveFrom}
                    </td>
                    <td className="px-4 py-3 text-slate-800">{r.priceBgn}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {r.rateBgnPerEur}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{r.priceEurExact}</td>
                    <td className="px-4 py-3 font-medium text-[#003399]">
                      {r.priceEurDisplay}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone="slate">{r.roundingPolicy}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Export CSV
          </button>
          <button className="rounded-lg bg-[#003399] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Set new price
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  // Allowed dynamic behavior: only open/close the modal.
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-6 md:p-8">
        {/* Top bar */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-semibold text-[#003399]">Products</h1>
              <Badge tone="blue">Catalog</Badge>
              {mockMeta.dualPricing.enabled ? (
                <Badge tone="yellow">Dual pricing enabled</Badge>
              ) : (
                <Badge tone="slate">Dual pricing disabled</Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Current prices in BGN and EUR (dual pricing). Built for a clean
              financial UI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Export CSV
            </button>
            <button className="rounded-lg bg-[#003399] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              Add product
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-700">
                Exchange rate:
              </span>
              <span className="text-sm font-semibold text-[#003399]">
                {mockMeta.exchangeRate} BGN/EUR
              </span>
              <span className="text-sm text-slate-500">As of {mockMeta.asOf}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span>Dual period:</span>
              <span className="font-medium text-slate-800">
                {mockMeta.dualPricing.start}
              </span>
              <span>-</span>
              <span className="font-medium text-slate-800">
                {mockMeta.dualPricing.end}
              </span>
            </div>
          </div>
        </div>

        {/* KPI row */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mockKpis.map((k) => (
            <KpiCard key={k.label} label={k.label} value={k.value} />
          ))}
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Category</span>
              <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
                <option>All categories</option>
                <option>Dairy</option>
                <option>Bakery</option>
                <option>Fruit</option>
                <option>Beverages</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Status</span>
              <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
                <option>All</option>
                <option>OK</option>
                <option>Missing</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-72"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              Clear
            </button>
            <button className="rounded-lg bg-[#003399] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              Apply
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-sm font-semibold text-slate-800">Product list</div>
              <Badge tone="slate">Showing 1-5</Badge>
              <Badge tone="yellow">3 need price tags</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                Columns
              </button>
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                Density
              </button>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead className="bg-slate-100 text-left text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price (BGN)</th>
                <th className="px-4 py-3">Price (EUR)</th>
                <th className="px-4 py-3">Effective from</th>
                <th className="px-4 py-3">Tag status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {mockProducts.map((p) => {
                const hasEur = p.priceEur != null;
                const statusTone = p.status === "OK" ? "green" : "yellow";

                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{p.name}</span>
                        {p.status !== "OK" && <Badge tone="yellow">Needs price</Badge>}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-700">{p.unit}</td>
                    <td className="px-4 py-3 text-slate-700">{p.category}</td>

                    <td className="px-4 py-3 text-slate-800">
                      {displayOrDash(p.priceBgn)}
                    </td>

                    <td className="px-4 py-3 font-medium text-[#003399]">
                      {displayOrDash(p.priceEur)}
                      {!hasEur && (
                        <span className="ml-2 rounded-full bg-[rgba(255,214,23,0.2)] px-2 py-0.5 text-xs font-medium text-slate-800">
                          No EUR
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {displayOrDash(p.effectiveFrom)}
                    </td>

                    <td className="px-4 py-3">
                      <Badge tone={statusTone}>
                        {p.status === "OK" ? "OK" : "Missing"}
                      </Badge>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-3">
                        <button className="text-[#003399] hover:underline">
                          Set price
                        </button>
                        <button
                          onClick={() => setIsHistoryOpen(true)}
                          className="text-slate-500 hover:underline"
                        >
                          History
                        </button>
                        <button className="text-slate-500 hover:underline">
                          Check
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* A couple of skeleton rows to show loading state styling (UI-only) */}
              <SkeletonRow />
              <SkeletonRow />
            </tbody>
          </table>
        </div>

        {/* Footer / help */}
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Tip</div>
            <p className="mt-1 text-sm text-slate-600">
              Use <span className="font-medium text-[#003399]">Set price</span> to
              create a new price snapshot. The EUR value should match rounding
              policy.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Next steps</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Connect category dropdown to /categories</li>
              <li>Wire the table to GET /products with pagination</li>
              <li>Open a modal for PUT /products/:id/price</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Support</div>
            <p className="mt-1 text-sm text-slate-600">
              Price tags that are missing EUR during dual pricing should be flagged
              in compliance checks.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <PriceHistoryModal
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}