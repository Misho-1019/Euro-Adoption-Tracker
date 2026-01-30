import React from "react";

const mockMeta = {
  totalCategories: 10,
  totalProducts: 100,
};

const mockCategories = [
  {
    id: 1,
    name: "Dairy",
    productsCount: 18,
    createdAt: "2025-06-12",
  },
  {
    id: 2,
    name: "Bakery",
    productsCount: 12,
    createdAt: "2025-06-15",
  },
  {
    id: 3,
    name: "Fruit",
    productsCount: 20,
    createdAt: "2025-07-01",
  },
  {
    id: 4,
    name: "Beverages",
    productsCount: 25,
    createdAt: "2025-07-10",
  },
  {
    id: 5,
    name: "Household",
    productsCount: 8,
    createdAt: "2025-08-02",
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

function KpiCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export default function AdminCategories() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-t-4 border-[#FFD617] pt-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-[#003399]">Categories</h1>
              <Badge tone="blue">Catalog</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              <span className="mr-2 inline-flex items-center rounded-full border border-[rgba(255,214,23,0.35)] bg-[rgba(255,214,23,0.2)] px-2 py-0.5 text-xs font-medium text-slate-800">EU catalog</span>
              Product grouping used across pricing, basket, and analytics.
            </p>
          </div>

          <button className="rounded-lg bg-[#003399] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Add category
          </button>
        </div>

        {/* KPI row */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <KpiCard label="Total categories" value={mockMeta.totalCategories} />
          <div className="rounded-2xl border border-[rgba(255,214,23,0.35)] bg-[rgba(255,214,23,0.15)] p-4 shadow-sm">
            <div className="text-xs font-medium text-slate-700">EU scope</div>
            <div className="mt-1 text-sm text-slate-800">
              Categories are used for official pricing, compliance, and analytics.
            </div>
          </div>
          <KpiCard label="Total products assigned" value={mockMeta.totalProducts} />
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-72"
          />

          <div className="flex items-center gap-2">
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
          <table className="w-full border-collapse">
            <thead className="bg-slate-100 text-left text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Created at</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockCategories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <Badge tone={c.productsCount > 0 ? "green" : "yellow"}>
                      {c.productsCount} products
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{c.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button className="text-[#003399] hover:underline">Edit</button>
                      <button className="text-slate-500 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer hint */}
        <div className="mt-6 rounded-2xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">
            Categories are used for filtering products and generating category-level
            analytics. Deleting a category does not delete products.
          </p>
        </div>
      </div>
    </div>
  );
}
