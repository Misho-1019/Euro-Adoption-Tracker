import React from "react";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function AdminRate() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[#003399]">Exchange Rate</h1>
        <p className="mt-2 text-slate-500">
          Official BGN to EUR fixed exchange rate used across the system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left column: Current status */}
        <div className="space-y-6 md:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Current rate
              </h3>
              <span className="rounded-full border border-[rgba(255,214,23,0.35)] bg-[rgba(255,214,23,0.2)] px-2 py-0.5 text-xs font-medium text-slate-800">
                EU fixed rate
              </span>
            </div>

            <div className="mb-2 flex items-end justify-between">
              <span className="text-4xl font-bold text-[#003399]">1.95583</span>
            </div>
            <div className="mb-6 text-sm text-slate-500">BGN per 1 EUR</div>

            <div className="space-y-3 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className="flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <CheckCircleIcon className="mr-1 h-3.5 w-3.5" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Effective from</span>
                <span className="font-medium text-slate-900">Jan 1, 1999</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Source</span>
                <span className="font-medium text-slate-900">BNB</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start">
              <ArrowPathIcon className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-[#003399]" />
              <p className="text-sm text-blue-900">
                This rate is used immediately in all EUR calculations (prices,
                basket totals, compliance checks, and analytics).
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Read-only details */}
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h3 className="font-semibold text-slate-900">Details</h3>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-xl border-l-4 border-[#FFD617] border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-700">
                  Your backend currently exposes only <span className="font-medium">GET /rate/current</span>.
                  This page is intentionally read-only.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-medium text-slate-500">Endpoint</div>
                  <div className="mt-1 font-semibold text-slate-900">/rate/current</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-medium text-slate-500">Applies to</div>
                  <div className="mt-1 text-sm text-slate-700">
                    Prices, basket quote, compliance, analytics
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-medium text-slate-500">Note</div>
                <p className="mt-1 text-sm text-slate-700">
                  If you later add admin endpoints (e.g. POST /rate), we can extend
                  this page with a controlled update form and a history list.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
              <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
