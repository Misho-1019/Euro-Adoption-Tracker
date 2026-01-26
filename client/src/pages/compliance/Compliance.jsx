import React from 'react';

const Compliance = () => {
  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* Page Header */}
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-[#003399]">Compliance Checker</h1>
        <p className="mt-2 text-slate-600">Validate dual-display price tags against official usage rules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-lg font-bold text-slate-800">Check Price Tag</h2>
            <span className="bg-[#FFD617] text-blue-900 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
              Official Check
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Category</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent bg-white">
                <option>Consumer Goods (General)</option>
                <option>Food & Beverages</option>
                <option>Fuel</option>
                <option>Services</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price (BGN)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    defaultValue="12.50" 
                    className="w-full pl-4 pr-12 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent font-medium text-slate-900" 
                  />
                  <span className="absolute right-3 top-2 text-slate-400 text-sm font-medium">BGN</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Display Price (EUR)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    defaultValue="6.45" 
                    className="w-full pl-4 pr-12 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399] focus:border-transparent font-medium text-slate-900" 
                  />
                  <span className="absolute right-3 top-2 text-slate-400 text-sm font-medium">EUR</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-[#003399]">Note:</span> Compliance is checked against the official fixed rate of <strong>1.95583</strong> and standard rounding rules (mathematical rounding to 2 decimal places).
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-[#003399] hover:bg-blue-800 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-blue-900/10 transition-all active:scale-[0.98]">
              Check Compliance
            </button>
            <button className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
              Reset
            </button>
          </div>
        </div>


        {/* Right Column: Results */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          
          {/* Status Header - Neutral Bg, Red Accents */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-1.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-red-800">Non-Compliant</h2>
            </div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest border border-red-200 px-2 py-1 rounded-md bg-white">
              Violations Found
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-8 flex-1">
            
            {/* Calculation Block */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Expected Calculation</h3>
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Official Conversion</span>
                  <code className="text-sm bg-white px-2 py-0.5 rounded-md border border-slate-100 text-slate-700">12.50 / 1.95583 = 6.39114...</code>
                </div>
                <div className="flex justify-between items-baseline border-t border-slate-100 pt-2">
                  <span className="text-sm font-medium text-slate-700">Correct Display Price</span>
                  <span className="text-2xl font-bold text-[#003399]">6.39 <span className="text-sm font-normal text-slate-500">EUR</span></span>
                </div>
              </div>
            </div>

            {/* Violations List */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Detected Violations</h3>
              <div className="space-y-3">
                
                {/* Violation Item 1 */}
                <div className="flex gap-3 items-start p-3 rounded-lg bg-red-50/50 border border-red-100">
                  <span className="shrink-0 font-mono text-xs font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded-md">ERR-PC-01</span>
                  <div>
                    <p className="text-sm font-bold text-red-900">Incorrect Rounding</p>
                    <p className="text-xs text-red-800/80 mt-0.5">
                      The displayed EUR price (6.45) deviates from the mathematically rounded official price (6.39).
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold uppercase text-white bg-red-600 px-2 py-0.5 rounded-full ml-auto">Major</span>
                </div>

                {/* Violation Item 2 */}
                <div className="flex gap-3 items-start p-3 rounded-lg bg-yellow-50/50 border border-yellow-100">
                  <span className="shrink-0 font-mono text-xs font-bold text-yellow-700 bg-yellow-100 px-1.5 py-0.5 rounded-md">WARN-DS-04</span>
                  <div>
                    <p className="text-sm font-bold text-yellow-900">Price Display Format</p>
                    <p className="text-xs text-yellow-800/80 mt-0.5">
                      Ensure the EUR price font size is not larger than the BGN price.
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold uppercase text-yellow-700 bg-[#FFD617] px-2 py-0.5 rounded-full ml-auto">Minor</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Compliance;
