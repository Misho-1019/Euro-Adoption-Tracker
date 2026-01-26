import React from 'react';
import { 
  BanknotesIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function AdminRate() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manage Exchange Rate</h1>
        <p className="mt-2 text-slate-500">View and update the official BGN to EUR fixed exchange rate.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Current Status (1/3 width on md) */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Current Rate</h3>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-4xl font-bold text-[#003399]">1.95583</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
              <span>BGN per 1 EUR</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Status</span>
                 <span className="flex items-center text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full text-xs">
                   <CheckCircleIcon className="w-3.5 h-3.5 mr-1" />
                   Active
                 </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Effective From</span>
                <span className="font-medium text-slate-900">Jan 1, 1999</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Source</span>
                <span className="font-medium text-slate-900">BNB</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
             <div className="flex items-start">
               <ArrowPathIcon className="w-5 h-5 text-[#003399] mt-0.5 mr-3 shrink-0" />
               <p className="text-sm text-blue-900">
                 Changes to the exchange rate are propagated immediately to all calculations in the system.
               </p>
             </div>
          </div>
        </div>

        {/* Right Column: Update Form (2/3 width on md) */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900">Set New Exchange Rate</h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Rate Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  New Exchange Rate (BGN)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <BanknotesIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="rate"
                    id="rate"
                    className="block w-full rounded-lg border-slate-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5"
                    placeholder="1.95583"
                    defaultValue="1.95583"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-slate-500 sm:text-sm">BGN</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Official fixed rate according to the Bulgarian National Bank.
                </p>
              </div>

              {/* Effective Date Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Effective Date & Time
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <CalendarIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  </div>
                  <input
                    type="datetime-local"
                    name="effective-date"
                    id="effective-date"
                    className="block w-full rounded-lg border-slate-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 text-slate-600"
                  />
                </div>
              </div>

              {/* Warning Box */}
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
                <div className="flex">
                  <div className="shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Warning: Global Impact</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>
                        Updating the exchange rate will trigger a recalculation of all Euro prices across the entire product catalog. This action cannot be undone easily.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#003399] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save New Rate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};