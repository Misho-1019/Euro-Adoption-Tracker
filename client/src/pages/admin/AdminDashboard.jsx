import React from 'react';
import { 
  BanknotesIcon, 
  CurrencyEuroIcon, 
  TagIcon,
  CalculatorIcon,
  ShoppingBagIcon,
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
  GlobeEuropeAfricaIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-slate-500">Overview of system status, exchange rates, and configuration.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Exchange Rate Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Current Exchange Rate</p>
              <h3 className="mt-2 text-2xl font-bold text-[#003399]">1.95583</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BanknotesIcon className="w-6 h-6 text-[#003399]" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500">
             <span className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full mr-2">
               Fixed Rate
             </span>
             Official BGN/EUR
          </div>
        </div>

        {/* Dual Pricing Status */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Dual Pricing</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Enabled</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TagIcon className="w-6 h-6 text-[#003399]" />
            </div>
          </div>
           <div className="mt-4 flex items-center text-xs text-slate-500">
             <span className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full mr-2">
               Active
             </span>
             Mandatory display
          </div>
        </div>

        {/* Rounding Policy */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Rounding Policy</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">HALF_UP</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <CalculatorIcon className="w-6 h-6 text-[#003399]" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">Standard commercial rounding</p>
        </div>

        {/* Catalog Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Catalog</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">1,248</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingBagIcon className="w-6 h-6 text-[#003399]" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500">
             <span className="text-slate-700 font-medium mr-1">14</span> Categories
          </div>
        </div>
      </div>

      {/* Bottom Section: Config & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Configuration Snapshot - Takes up 2 columns on large screens if desired, but 1 here to match description "list" vs "actions" */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-slate-400" />
              <h3 className="font-semibold text-slate-900">Configuration Snapshot</h3>
            </div>
            <span className="text-xs font-medium text-[#003399] bg-blue-50 px-2.5 py-1 rounded-full">v2.4.0</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Base Currency</span>
                <span className="font-medium text-slate-900 text-sm">BGN (Lev)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Target Currency</span>
                <span className="font-medium text-slate-900 text-sm">EUR (Euro)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Fiscal Region</span>
                <span className="font-medium text-slate-900 text-sm">Bulgaria (BG)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">VAT Rate</span>
                <span className="font-medium text-slate-900 text-sm">20%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">System Mode</span>
                <span className="font-medium text-slate-900 text-sm">Production</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Last Sync</span>
                <span className="font-medium text-slate-900 text-sm">2 mins ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
           <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <WrenchScrewdriverIcon className="w-5 h-5 text-slate-400" />
              <h3 className="font-semibold text-slate-900">Quick Actions</h3>
            </div>
          </div>
          <div className="p-6 flex flex-col space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors group">
              <span>Manage Exchange Rate</span>
              <CurrencyEuroIcon className="w-5 h-5 text-slate-400 group-hover:text-[#003399]" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors group">
              <span>Manage Products</span>
              <ShoppingBagIcon className="w-5 h-5 text-slate-400 group-hover:text-[#003399]" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors group">
              <span>Manage Categories</span>
              <TagIcon className="w-5 h-5 text-slate-400 group-hover:text-[#003399]" />
            </button>
             <div className="pt-2">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-[#003399] text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
                System Settings
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
