import React from 'react';

export default function Basket() {
  // Mock data for basket items
  const basketItems = [
    { id: 1, name: 'White Bread (Standard)', category: 'Food Staples', unit: 'Loaf (500g)', qty: 2, priceBgn: 1.45, priceEur: 0.74136 },
    { id: 2, name: 'Cow Milk 3%', category: 'Dairy', unit: '1 Liter', qty: 4, priceBgn: 2.80, priceEur: 1.43160 },
    { id: 3, name: 'Sunflower Oil', category: 'Cooking Essentials', unit: '1 Liter', qty: 1, priceBgn: 3.20, priceEur: 1.63612 },
    { id: 4, name: 'White Cheese (Bulgarian)', category: 'Dairy', unit: '1 kg', qty: 1, priceBgn: 14.50, priceEur: 7.41372 },
    { id: 5, name: 'Eggs (size M)', category: 'Food Staples', unit: 'Pack (10)', qty: 2, priceBgn: 4.90, priceEur: 2.50532 },
  ];

  // Mock totals (hardcoded for display as requested, but logic implies these values)
  const subtotalBgn = '36.00';
  const subtotalEurBox = '18.40652'; // Exact conversion
  const totalEurDisplay = '18.41'; // Rounded
  const roundingDelta = '+0.00348'; // Difference

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* Page Header */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-[#003399]">Basket Quote</h1>
          <span className="bg-[#FFD617] text-blue-900 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            Draft
          </span>
        </div>
        <p className="mt-2 text-slate-600">Compose a product basket and preview the official exchange calculation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Basket Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003399] text-sm shadow-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button className="w-full sm:w-auto bg-[#003399] hover:bg-blue-800 text-white px-5 py-2 rounded-xl font-medium shadow-sm flex items-center justify-center gap-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Unit</th>
                    <th className="px-6 py-4 font-semibold w-24">Qty</th>
                    <th className="px-6 py-4 font-semibold text-right">Price (BGN)</th>
                    <th className="px-6 py-4 font-semibold text-right">EUR (Exact)</th>
                    <th className="px-6 py-4 font-semibold text-center w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {basketItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{item.unit}</td>
                      <td className="px-6 py-4">
                        <input 
                          type="number" 
                          defaultValue={item.qty} 
                          className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-center focus:outline-none focus:border-[#003399] focus:ring-1 focus:ring-[#003399]"
                        />
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-700">
                        {(item.priceBgn * item.qty).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-500 font-mono">
                        {(item.priceEur * item.qty).toFixed(5)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-slate-400 hover:text-red-500 transition-colors p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Empty state placeholder / Footer */}
            <div className="px-6 py-4 border-t border-slate-100 text-xs text-slate-400 text-center">
              Add more products to see how the basket total is calculated.
            </div>
          </div>
        </div>

        {/* Right Column: Summary Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-[#003399] mb-6">Quote Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Subtotal (BGN)</span>
                <span className="font-medium text-slate-900">{subtotalBgn} BGN</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Official Rate Conversion</span>
                <span className="font-mono text-slate-500 text-xs">÷ 1.95583</span>
              </div>

              <div className="flex justify-between items-center text-sm pb-4 border-b border-slate-100">
                <span className="text-slate-500">Exact Value (EUR)</span>
                <span className="font-mono text-slate-700">{subtotalEurBox}</span>
              </div>

              {/* Rounding Delta Highlight */}
              <div className="bg-[#FFD617]/10 rounded-xl p-4 border border-[#FFD617]/30">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-yellow-700 uppercase tracking-wide">Rounding Delta</span>
                  <span className="text-xs font-mono font-bold text-yellow-700">{roundingDelta}</span>
                </div>
                <p className="text-xs text-yellow-800/80 leading-relaxed">
                  Difference between exact mathematical conversion and the final display price due to 2-decimal rounding standards.
                </p>
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-semibold text-slate-700">Total Payable</span>
                <span className="text-3xl font-bold text-[#003399]">{totalEurDisplay} <span className="text-sm font-normal text-slate-500">EUR</span></span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-[#003399] hover:bg-blue-800 text-white py-3 rounded-xl font-semibold shadow-md shadow-blue-900/10 transition-all active:scale-[0.98]">
                Generate Quote
              </button>
              <button className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 py-3 rounded-xl font-medium transition-colors">
                Reset Basket
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};