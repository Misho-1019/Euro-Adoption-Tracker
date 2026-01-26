import React from 'react';
import { 
  ShieldCheckIcon, 
  ScaleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  InformationCircleIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

export default function ComplianceRules() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-[#003399] sm:text-4xl">Compliance Rules & Error Codes</h1>
          <span className="inline-flex items-center rounded-full bg-[#FFD617] px-2.5 py-0.5 text-xs font-bold text-slate-900 shadow-sm">
            Reference
          </span>
        </div>
        <p className="mt-4 text-lg text-slate-600">
          Official reference for pricing standards, conversion methodologies, and error code definitions used by the Euro Adoption Tracker.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* 1. Overview */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center space-x-2 text-[#003399] mb-4">
              <ShieldCheckIcon className="w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wide">Overview</h2>
            </div>
            <p className="text-slate-700 mb-4">
              During the Euro adoption process, strict adherence to pricing rules is mandated to ensure <strong>consumer protection</strong>, maintain <strong>transparency</strong>, and guarantee <strong>fairness</strong> in the marketplace.
            </p>
            <p className="text-slate-700">
              These rules prevent "hidden" inflation where prices might be rounded up excessively during conversion, and ensure that customers can easily compare values between the legacy currency (BGN) and the new Euro pricing.
            </p>
          </section>

          {/* 2. Dual Pricing Rules */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">Dual Pricing Rules</h2>
            <p className="text-slate-700">
              Retailers are required to display prices in both currencies throughout the transition period. Key requirements include:
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#003399] mt-2 mr-3"></div>
                <span className="text-slate-700 text-sm"><strong>Simultaneous Display:</strong> Both the final price in BGN and EUR must be clearly visible.</span>
              </li>
              <li className="flex items-start">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#003399] mt-2 mr-3"></div>
                <span className="text-slate-700 text-sm"><strong>Equal Visibility:</strong> The EUR price should be legible and easily distinguishable from the BGN price.</span>
              </li>
              <li className="flex items-start">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#003399] mt-2 mr-3"></div>
                <span className="text-slate-700 text-sm"><strong>Clarity:</strong> No other currencies should be displayed to avoid customer confusion.</span>
              </li>
              <li className="flex items-start">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#003399] mt-2 mr-3"></div>
                <span className="text-slate-700 text-sm"><strong>Unambiguous Labels:</strong> Currency symbols or codes (BGN/лв, EUR/€) must be clearly stated.</span>
              </li>
            </ul>
          </section>

          {/* 3. Conversion & Rounding Rules */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">Conversion & Rounding</h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-start space-x-3">
                <ScaleIcon className="w-5 h-5 text-slate-500 mt-0.5" />
                <div>
                   <h3 className="text-sm font-bold text-slate-900 uppercase">Fixed Conversion Rate</h3>
                   <p className="text-sm text-slate-600 mt-1">
                     All conversions must use the official rate strictly: <span className="font-mono text-[#003399] font-bold">1 EUR = 1.95583 BGN</span>. Using abbreviated rates (e.g., 1.95 or 1.96) is not compliant.
                   </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ScaleIcon className="w-5 h-5 text-slate-500 mt-0.5" />
                <div>
                   <h3 className="text-sm font-bold text-slate-900 uppercase">Rounding Policy</h3>
                   <p className="text-sm text-slate-600 mt-1">
                     Display prices in Euro must be rounded to two decimal places using the standard mathematical rule (HALF_UP). The third decimal digit determines the rounding: if it is 5 or greater, round up; otherwise, round down.
                   </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Common Compliance Violations */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">Common Compliance Violations</h2>
            <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200 text-sm">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-red-600">ERR_RATE_01</td>
                    <td className="px-6 py-4 font-medium text-slate-900">Incorrect Rate</td>
                    <td className="px-6 py-4 text-slate-600">
                      Conversion performed with a rate other than 1.95583.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-red-600">ERR_ROUND_02</td>
                    <td className="px-6 py-4 font-medium text-slate-900">Rounding Error</td>
                    <td className="px-6 py-4 text-slate-600">
                      EUR display price calculated incorrectly (e.g. truncated instead of rounded).
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-red-600">ERR_MISSING_03</td>
                    <td className="px-6 py-4 font-medium text-slate-900">Missing Price</td>
                    <td className="px-6 py-4 text-slate-600">
                      One of the mandatory currency prices (BGN or EUR) is absent.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-amber-600">WARN_FMT_01</td>
                    <td className="px-6 py-4 font-medium text-slate-900">Format Issue</td>
                    <td className="px-6 py-4 text-slate-600">
                      Currency symbol or formatting is not standard (e.g., missing decimals).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Important Notes */}
           <section className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
             <div className="flex items-start">
               <InformationCircleIcon className="w-6 h-6 text-yellow-600 mt-0.5 mr-3 shrink-0" />
               <div className="space-y-2">
                 <h3 className="text-base font-bold text-yellow-900">Important Notes & Limitations</h3>
                 <p className="text-sm text-yellow-800">
                   This documentation and the associated software tools are intended for illustrative and educational purposes to demonstrate compliance checking logic.
                 </p>
                 <p className="text-sm text-yellow-800">
                   <strong>Disclaimer:</strong> This content does not constitute official legal advice. Businesses should always consult strict regulatory guidelines published by national authorities.
                 </p>
               </div>
             </div>
           </section>

        </div>

        {/* Sidebar Column: Severity Levels */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <div className="flex items-center space-x-2 mb-6 text-slate-900 border-b border-slate-100 pb-4">
               <DocumentCheckIcon className="w-5 h-5 text-slate-400" />
               <h3 className="font-bold text-lg">Severity Levels</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <XCircleIcon className="w-6 h-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-red-700 uppercase tracking-wide">Error (Critical)</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Indicates a fundamental breach of conversion rules (e.g., wrong rate). These must be corrected immediately to avoid regulatory risk.
                  </p>
                </div>
              </div>

               <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-amber-700 uppercase tracking-wide">Warning</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Indicates a potential issue with presentation or consistency (e.g., confusing formatting). These should be reviewed but may not be strictly illegal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};