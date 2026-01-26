import React from 'react';

export default function Dashboard() {
  // --- Mock Data ---
  const currentRate = {
    value: "25.30",
    pair: "CZK/EUR",
    date: "25 Jan 2026",
    trend: "stable"
  };

  const dualPricing = {
    isEnabled: true,
    status: "Mandatory Period",
    daysRemaining: 156,
    compliance: "100%"
  };

  const catalogStats = {
    totalProducts: 1420,
    totalCategories: 85,
    lastSync: "Today, 09:42"
  };

  const systemHealth = [
    { id: 1, name: "ECB Rate Sync", status: "operational", lastCheck: "09:00 AM" },
    { id: 2, name: "Price Calculator", status: "operational", lastCheck: "09:41 AM" },
    { id: 3, name: "Catalog Index", status: "warning", lastCheck: "08:15 AM", message: "High latency detected" },
    { id: 4, name: "Audit Log Service", status: "operational", lastCheck: "09:42 AM" },
    { id: 5, name: "User Auth", status: "operational", lastCheck: "09:42 AM" },
  ];

  const quickActions = [
    "Manage Exchange Rates",
    "Generate Compliance Report", 
    "System Settings"
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* --- Top Header --- */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-900 tracking-tight">
              Euro Adoption Tracker
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">
              Official Administration Dashboard
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500">Administrator</span>
            <div className="h-8 w-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-semibold">
              AD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* --- Page Title Section --- */}
        <div className="flex items-end justify-between border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Dashboard</h2>
            <p className="mt-2 text-slate-500">
              System overview and key performance indicators.
            </p>
          </div>
          <div className="text-right text-sm text-slate-400">
            Last updated: {currentRate.date}
          </div>
        </div>

        {/* --- KPI Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Exchange Rate */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Official Exchange Rate
              </p>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold text-blue-900">{currentRate.value}</span>
                <span className="ml-2 text-sm font-medium text-slate-600">{currentRate.pair}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Source: ECB (Official)
            </div>
          </div>

          {/* Card 2: Dual Pricing Status */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Dual Pricing Mode
              </p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-blue-800">
                  {dualPricing.status}
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{dualPricing.daysRemaining}</span> days remaining
            </div>
          </div>

          {/* Card 3: Products */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Total Products
              </p>
              <div className="mt-2">
                <span className="text-3xl font-bold text-slate-900">
                  {catalogStats.totalProducts.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-500">
              Active in catalog
            </div>
          </div>

          {/* Card 4: Categories */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Categories
              </p>
              <div className="mt-2">
                <span className="text-3xl font-bold text-slate-900">
                  {catalogStats.totalCategories}
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-500">
               Organized structure
            </div>
          </div>

        </div>

        {/* --- Secondary Section: Grid 2 Columns (Main + Sidebar) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: System Status (2 cols wide) */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-lg font-medium text-blue-900">System Status</h3>
              <span className="text-xs font-semibold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">
                Live Monitor
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {systemHealth.map((item) => (
                <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mr-3 ${
                      item.status === 'operational' ? 'bg-green-500' : 
                      item.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                     {item.message && (
                       <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                         {item.message}
                       </span>
                     )}
                    <span className="text-sm text-slate-400 font-mono">{item.lastCheck}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs text-slate-500 text-center">
              System health checks run every 60 seconds automatically.
            </div>
          </div>

          {/* Right Column: Quick Actions & Links (1 col wide) */}
          <div className="space-y-6">
            
            {/* Quick Actions Panel */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-4">Quick Actions</h3>
              <ul className="space-y-3">
                {quickActions.map((action, idx) => (
                  <li key={idx}>
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-900 rounded border border-slate-200 transition-colors duration-150">
                      {action}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Notice */}
            <div className="bg-blue-900 rounded-lg p-6 text-white shadow-md">
              <h3 className="text-sm font-bold uppercase tracking-wider opacity-80 mb-2">
                Compliance Notice 2026/EU
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Dual display of prices is mandatory for all consumer products until 
                <strong> July 1st, 2026</strong>. Ensure daily exchange rate synchronization.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};