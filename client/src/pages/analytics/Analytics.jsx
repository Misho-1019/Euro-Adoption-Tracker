import React from 'react';

export default function Analytics() {
    // Mock data for the comparison table
    const comparisonData = [
        { id: 1, name: 'White Bread (Standard)', category: 'Food Staples', priceA: '0.74', priceB: '0.75', change: '+1.35%', trend: 'up' },
        { id: 2, name: 'Cow Milk 3%', category: 'Dairy', priceA: '1.43', priceB: '1.43', change: '0.00%', trend: 'stable' },
        { id: 3, name: 'Euro-Super 95', category: 'Fuels', priceA: '1.32', priceB: '1.38', change: '+4.54%', trend: 'up' },
        { id: 4, name: 'Natural Gas', category: 'Energy', priceA: '0.59', priceB: '0.56', change: '-5.08%', trend: 'down' },
        { id: 5, name: 'Eggs (size M)', category: 'Food Staples', priceA: '2.51', priceB: '2.55', change: '+1.59%', trend: 'up' },
    ];

    return (
        <div className="space-y-8 font-sans text-slate-900">
            
            {/* Page Header */}
            <div className="mb-4 border-b border-slate-200 pb-4">
                <h1 className="text-3xl font-bold text-[#003399]">Analytics Overview</h1>
                <p className="mt-2 text-slate-600">Compare price evolution and monitor rounding compliance between periods.</p>
            </div>

            {/* Filter Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Comparison Filters</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
                        <select className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#003399]">
                            <option>All Categories</option>
                            <option>Food Staples</option>
                            <option>Energy & Fuels</option>
                            <option>Services</option>
                        </select>
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Period A (Baseline)</label>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Jan 2025" className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#003399]" />
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Period B (Current)</label>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Jan 2026" className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#003399]" />
                        </div>
                    </div>

                    <div className="md:col-span-1 flex items-end">
                        <button className="w-full h-10 bg-[#003399] hover:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-sm transition-colors">
                            Run Comparison
                        </button>
                    </div>
                </div>
            </div>

            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Metric 1 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. Price Change</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">+0.48%</h3>
                        </div>
                        <div className="bg-green-100 p-1.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-xs text-slate-500">Stability verified across periods.</span>
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. Rounding Impact</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">
                                €0.003
                                <span className="text-sm font-normal text-slate-400 ml-1">/ unit</span>
                            </h3>
                        </div>
                        <div className="bg-[#FFD617]/20 p-1.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-xs text-yellow-800 bg-[#FFD617]/10 px-2 py-0.5 rounded font-medium">Within tolerance</span>
                    </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Analyzed Products</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">142</h3>
                        </div>
                        <div className="bg-blue-50 p-1.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#003399]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className="text-xs text-slate-500">Data coverage: 98.4%</span>
                    </div>
                </div>

            </div>

            {/* Results Table Section */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <h3 className="font-bold text-slate-800">Comparison Summary</h3>
                    <div className="flex gap-2 text-xs">
                        <button
                          type="button"
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                        >
                          Download Report
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-semibold w-1/3">Product Name</th>
                                <th className="px-6 py-3 font-semibold text-right">Period A (EUR)</th>
                                <th className="px-6 py-3 font-semibold text-right">Period B (EUR)</th>
                                <th className="px-6 py-3 font-semibold text-right">Diff. %</th>
                                <th className="px-6 py-3 font-semibold text-center w-24">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {comparisonData.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-3">
                                        <div className="font-medium text-slate-900">{row.name}</div>
                                        <div className="text-xs text-slate-500">{row.category}</div>
                                    </td>
                                    <td className="px-6 py-3 text-right text-slate-500 tabular-nums">{row.priceA}</td>
                                    <td className="px-6 py-3 text-right text-slate-900 font-medium tabular-nums">{row.priceB}</td>
                                    <td className={`px-6 py-3 text-right font-medium tabular-nums ${row.trend === 'up' ? 'text-red-600' : row.trend === 'down' ? 'text-green-600' : 'text-slate-500'}`}>
                                        {row.change}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold 
                                            ${row.trend === 'up' ? 'bg-red-50 text-red-600' : 
                                              row.trend === 'down' ? 'bg-green-50 text-green-600' : 
                                              'bg-slate-100 text-slate-500'}`}>
                                            {row.trend === 'up' ? '↑' : row.trend === 'down' ? '↓' : '—'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
                    <strong>Methodology Note:</strong> Comparisons are based on the monthly average price converted at the fixed exchange rate. 
                    Price differences may reflect market inflation rather than currency conversion effects.
                </div>
            </div>

        </div>
    );
};