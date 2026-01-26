import React from 'react';

export default function Rate() {
    // Mock data for historical rates (showing stability)
    const rateHistory = [
        { id: 1, date: '2025-01-25', rate: '1.95583', status: 'Confirmed' },
        { id: 2, date: '2025-01-24', rate: '1.95583', status: 'Confirmed' },
        { id: 3, date: '2025-01-23', rate: '1.95583', status: 'Confirmed' },
        { id: 4, date: '2025-01-22', rate: '1.95583', status: 'Confirmed' },
        { id: 5, date: '2025-01-21', rate: '1.95583', status: 'Confirmed' },
    ];

    return (
        <div className="space-y-8 font-sans text-slate-900">
            
            {/* Page Header */}
            <div className="mb-8 border-b border-slate-200 pb-4">
                <h1 className="text-3xl font-bold text-[#003399]">Exchange Rate</h1>
                <p className="mt-2 text-slate-600">Official fixed conversion rate (BGN to EUR).</p>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Current Rate & Details (Takes up 2 cols on lg screens) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Current Official Rate Card */}
                    <div className="bg-white shadow-sm rounded-sm overflow-hidden border-t-4 border-[#003399]">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-lg font-semibold text-slate-700 uppercase tracking-wide">Current Official Rate</h2>
                                <span className="bg-[#FFD617] text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Official
                                </span>
                            </div>
                            
                            <div className="flex flex-col md:flex-row items-baseline gap-4 mt-2">
                                <span className="text-5xl md:text-6xl font-bold text-[#003399]">1.95583</span>
                                <span className="text-xl text-slate-500 font-medium">BGN / EUR</span>
                            </div>

                            <p className="mt-6 text-sm text-slate-500">
                                This rate is fixed and irrevocably established. All conversions in this system use this exact value.
                            </p>
                        </div>
                        
                        {/* Status Bar */}
                        <div className="bg-slate-50 px-8 py-3 border-t border-slate-100 flex items-center text-sm text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Active and Verified as of Jan 25, 2026</span>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="bg-white shadow-sm rounded-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-semibold text-[#003399] mb-4 border-b border-slate-100 pb-2">Rate Details</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="text-sm font-medium text-slate-500">Source Authority</div>
                                <div className="sm:col-span-2 text-sm text-slate-900 font-medium">Bulgarian National Bank / European Central Bank</div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="text-sm font-medium text-slate-500">Mechanism</div>
                                <div className="sm:col-span-2 text-sm text-slate-900">Currency Board Arrangement / ERM II</div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                <div className="text-sm font-medium text-slate-500">Rounding Policy</div>
                                <div className="sm:col-span-2 text-sm text-slate-900">Standard rounding to 2 decimals for display; full precision (5 decimals) for calculation.</div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="text-sm font-medium text-slate-500">Last Update</div>
                                <div className="sm:col-span-2 text-sm text-slate-900">Fixed Peg (No variation)</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Historical / Info Table */}
                <div className="lg:col-span-1">
                    <div className="bg-white shadow-sm rounded-sm border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h3 className="font-semibold text-slate-800">Historical Stability</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Date</th>
                                        <th className="px-6 py-3 font-medium text-right">Rate</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {rateHistory.map((row) => (
                                        <tr key={row.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-3 text-slate-600 font-medium">{row.date}</td>
                                            <td className="px-6 py-3 text-slate-900 text-right font-mono">{row.rate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-200 bg-slate-50">
                            <p className="text-xs text-center text-slate-500 italic">
                                Rate has remained unchanged since 1999.
                            </p>
                        </div>
                    </div>
                    
                    {/* Additional Info / Alert Box */}
                    <div className="mt-6 bg-blue-50 border border-blue-100 rounded-sm p-4 flex gap-3">
                        <div className="shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#003399]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-sm text-[#003399]">
                            Prices displayed in EUR across the system are calculated automatically using this fixed rate.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};