import React from 'react';
import { 
  Cog6ToothIcon, 
  InformationCircleIcon, 
  ShieldCheckIcon,
  CurrencyEuroIcon
} from '@heroicons/react/24/outline';

const AdminSettings = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
        <p className="mt-2 text-slate-500">Configure global parameters for Euro adoption and display compliance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Euro Adoption Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-2">
            <CurrencyEuroIcon className="w-5 h-5 text-slate-400" />
            <h3 className="font-semibold text-slate-900">Euro Adoption Settings</h3>
          </div>
          
          <div className="p-6 space-y-8 flex-1">
            
            {/* Dual Pricing Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">Dual Pricing Enabled</span>
                <span className="text-xs text-slate-500 mt-1">Show prices in both BGN and EUR</span>
              </div>
              {/* Mock Toggle Switch (Active) */}
              <button 
                type="button"
                className="bg-[#003399] relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="switch"
                aria-checked="true"
              >
                <span className="sr-only">Use setting</span>
                <span 
                  aria-hidden="true" 
                  className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                ></span>
              </button>
            </div>

            {/* Rounding Policy */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                 <span className="text-sm font-medium text-slate-900">Rounding Policy</span>
                 <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                   Active
                 </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="rounding-half-up"
                    name="rounding-policy"
                    type="radio"
                    defaultChecked
                    className="h-4 w-4 border-slate-300 text-[#003399] focus:ring-blue-500"
                  />
                  <label htmlFor="rounding-half-up" className="ml-3 block text-sm font-medium text-slate-700">
                    HALF_UP (Standard Commercial)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="rounding-half-down"
                    name="rounding-policy"
                    type="radio"
                    className="h-4 w-4 border-slate-300 text-[#003399] focus:ring-blue-500"
                  />
                  <label htmlFor="rounding-half-down" className="ml-3 block text-sm font-medium text-slate-700">
                    HALF_DOWN
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="rounding-down"
                    name="rounding-policy"
                    type="radio"
                    className="h-4 w-4 border-slate-300 text-[#003399] focus:ring-blue-500"
                  />
                  <label htmlFor="rounding-down" className="ml-3 block text-sm font-medium text-slate-700">
                    DOWN (Truncate)
                  </label>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-100 flex items-start">
              <InformationCircleIcon className="w-5 h-5 text-blue-700 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                Rounding policies strictly follow the mathematical rules defined in the official Euro adoption methodology. Changing this may result in small price variances across the catalog.
              </p>
            </div>

          </div>
        </div>

        {/* Card 2: Compliance & Display Rules */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-2">
            <ShieldCheckIcon className="w-5 h-5 text-slate-400" />
            <h3 className="font-semibold text-slate-900">Compliance & Display Rules</h3>
          </div>
          
          <div className="p-6 space-y-6 flex-1">
            
             {/* Enforce Display */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="enforce-display"
                  name="enforce-display"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300 text-[#003399] focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="enforce-display" className="font-medium text-slate-700">Enforce EUR display on all price tags</label>
                <p className="text-slate-500 text-xs mt-1">If unchecked, EUR prices may be hidden for legacy layouts.</p>
              </div>
            </div>

             {/* Highlight Deltas */}
             <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="highlight-deltas"
                  name="highlight-deltas"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#003399] focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="highlight-deltas" className="font-medium text-slate-700">Highlight rounding deltas</label>
                <p className="text-slate-500 text-xs mt-1">Visually flag prices where the rounded EUR conversion differs significantly from the exact mathematical value.</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Threshold Input */}
            <div className="space-y-2">
               <label htmlFor="delta-threshold" className="block text-sm font-medium text-slate-700">
                 Rounding delta warning threshold (EUR)
               </label>
               <div className="relative rounded-md shadow-sm max-w-[140px]">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-500 sm:text-sm">€</span>
                  </div>
                  <input
                    type="text"
                    name="delta-threshold"
                    id="delta-threshold"
                    className="block w-full rounded-md border-slate-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2"
                    placeholder="0.01"
                    defaultValue="0.01"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-slate-500 sm:text-sm">EUR</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
            System last checked for compliance verification: Today, 09:00 AM
          </div>
        </div>

      </div>

      {/* Action Row */}
      <div className="pt-4 flex items-center justify-end space-x-4 border-t border-slate-200">
        <button
          type="button"
          className="px-6 py-2.5 border border-slate-300 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Discard Changes
        </button>
        <button
          type="button"
          className="px-6 py-2.5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#003399] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Save Settings
        </button>
      </div>

    </div>
  );
};

export default AdminSettings;
