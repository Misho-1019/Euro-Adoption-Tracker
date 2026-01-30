import React from "react";

/**
 * Create Product page (UI-only, mock data)
 * Intended to match: POST /products
 * Fields (assumed): name, unit, categoryId
 *
 * No API calls, no submit logic.
 */

const mockCategories = [
  { id: 1, name: "Food" },
  { id: 2, name: "Dairy" },
  { id: 3, name: "Bakery" },
  { id: 4, name: "Fruit" },
  { id: 5, name: "Beverages" },
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
    red: "border-red-200 bg-red-50 text-red-700",
  };

  return <span className={`${base} ${tones[tone] || tones.slate}`}>{children}</span>;
}

function SectionCard({ title, children, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {hint ? <Badge tone="yellow">{hint}</Badge> : null}
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

export default function AdminProducts() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 border-t-4 border-[#FFD617] pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold text-[#003399]">
              Create product
            </h1>
            <Badge tone="blue">POST /products</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Add a new product to the catalog. Pricing is set separately.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <SectionCard title="Product details" hint="EU catalog">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Product name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Milk 1L"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue=""
                />
                <p className="text-xs text-slate-500">
                  Use a clear, consumer-facing name.
                </p>
              </div>

              {/* Unit */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Unit (free text)
                </label>
                <input
                  type="text"
                  placeholder="e.g. kg, l, pcs"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue=""
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500">Common:</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    kg
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    l
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    pcs
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    g
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  If your backend later restricts units, we can convert this into a
                  dropdown.
                </p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Category
                </label>
                <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500">
                  {mockCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">
                  Categories come from <span className="font-medium">GET /categories</span>.
                </p>
              </div>

              {/* Yellow note */}
              <div className="rounded-xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-3 text-sm text-slate-700">
                After creating a product, you’ll typically set its first price. During
                dual pricing, both BGN and EUR price tags must be consistent.
              </div>
            </SectionCard>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button className="rounded-lg bg-[#003399] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                Create product
              </button>
            </div>
          </div>

          {/* Right rail / preview */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  Request preview
                </div>
                <Badge tone="yellow">Mock</Badge>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                <div className="font-semibold text-slate-800">POST /products</div>
                <pre className="mt-2 whitespace-pre-wrap leading-5 text-slate-700">
{`{
  "name": "Milk 1L",
  "unit": "l",
  "categoryId": 2
}`}
                </pre>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                <div className="font-medium text-slate-800">What happens next?</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Set first price snapshot (BGN → EUR)</li>
                  <li>Verify compliance if dual pricing is active</li>
                  <li>Track changes in analytics</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm text-blue-900">
                Tip: keep product names stable. Frequent renaming makes analytics and
                compliance audits harder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
