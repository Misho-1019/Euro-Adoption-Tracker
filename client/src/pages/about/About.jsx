import React from 'react';
import { 
  GlobeEuropeAfricaIcon, 
  ScaleIcon, 
  CalculatorIcon, 
  ShieldCheckIcon,
  BookOpenIcon,
  InformationCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      
      {/* Page Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-[#003399] sm:text-4xl">About & Methodology</h1>
        <p className="mt-4 text-lg text-slate-600">
          Understanding the global context of currency transitions, the specific requirements for Bulgaria's Euro adoption, and the mathematical precision used in this tracker.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* 1. Global Context */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-[#003399]">
              <GlobeEuropeAfricaIcon className="w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wide">The Global Context</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Currency transitions are defining economic moments that reshape how value is perceived across entire regions. 
              Historically, the shift to a common currency brings significant long-term benefits but presents immediate challenges for consumer confidence.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong className="text-slate-900">Inflation Perception:</strong> Without clear communication, consumers often fear that conversions effectively hide price increases.</li>
              <li><strong className="text-slate-900">Consumer Trust:</strong> Transparency is the only currency that matters during the transition period.</li>
              <li><strong className="text-slate-900">Compliance:</strong> Regulators must ensure that businesses convert prices fairly and accurately.</li>
            </ul>
          </section>

          {/* 2. Why Dual Pricing */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-[#003399]">
              <ScaleIcon className="w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wide">Why Dual Pricing Exists</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Dual pricing—displaying prices in both the national legacy currency and the Euro—is the primary mechanism to bridge the gap between two economic eras. Its goal is not just compliance, but cognitive ease.
            </p>
            
            {/* Yellow Callout: Key Takeaway */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-start space-x-3">
              <LightBulbIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-yellow-800 uppercase">Key Takeaway</h4>
                <p className="text-sm text-yellow-900 mt-1">
                  Dual pricing reduces confusion, prevents unfair rounding practices by retailers, and supports direct comparability of value for everyday consumers.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Bulgaria Focus */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Bulgaria & The Fixed Rate</h2>
            <p className="text-slate-700 leading-relaxed">
              For Bulgaria, the transition is unique due to the Currency Board arrangement. The Bulgarian Lev (BGN) has been pegged to the Deutsche Mark and subsequently the Euro for decades. This tracker uses the official fixed conversion rate:
            </p>
            <div className="bg-slate-100 p-4 rounded-lg text-center font-mono text-xl font-semibold text-slate-900 tracking-wider border border-slate-200">
              1 EUR = 1.95583 BGN
            </div>
            <p className="text-slate-700 leading-relaxed">
              This system provides a centralized tool for retailers to audit their catalogs and for regulators to spot-check compliance across thousands of products instantly.
            </p>
          </section>

          {/* 4. Methodology */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-[#003399]">
              <CalculatorIcon className="w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wide">Methodology</h2>
            </div>
            
            <p className="text-slate-700 leading-relaxed">
              All calculations in this system follow the strict mathematical rules aligned with official conversion and rounding conventions.
            </p>

            <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-slate-300 shadow-sm overflow-x-auto">
              <div className="space-y-2">
                <p className="text-slate-400">// Conversion Logic</p>
                <p>const <span className="text-blue-400">OFFICIAL_RATE</span> = 1.95583;</p>
                <p>let <span className="text-emerald-400">exactEur</span> = priceBgn / <span className="text-blue-400">OFFICIAL_RATE</span>;</p>
                <p className="text-slate-400 mt-4">// Rounding (Policy: HALF_UP)</p>
                <p>let <span className="text-purple-400">displayEur</span> = roundTo2Decimals(<span className="text-emerald-400">exactEur</span>);</p>
              </div>
            </div>

            {/* Blue Callout: Methodology Note */}
            <div className="bg-blue-50 border-l-4 border-[#003399] p-4 rounded-r-lg flex items-start space-x-3">
              <InformationCircleIcon className="w-6 h-6 text-[#003399] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-blue-900 uppercase">Methodology Note</h4>
                <p className="text-sm text-blue-800 mt-1">
                  The system stores prices in BGN (base) and calculates EUR dynamically. This ensures that the original price integrity is preserved and prevents "drift" from repeated conversions.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Rounding & Display */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Rounding & Delta</h2>
            <p className="text-slate-700 leading-relaxed">
              <strong>Exact vs. Display:</strong> While the display price is rounded to two decimal places for consumer convenience (e.g., €1.23), the <span className="italic">exact</span> mathematical value might be 1.2267...
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Rounding Delta:</strong> The system calculates the absolute difference between the rounded display price and the exact value. A high delta signals a potential "hidden" price increase or decrease due to rounding artifacts.
            </p>
          </section>

          {/* 6. Compliance Checks */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-[#003399]">
              <ShieldCheckIcon className="w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wide">Compliance Checks</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              The tracker automatically flags products that may violate fair pricing guidelines. Common violation codes included in the system:
            </p>
            <ul className="grid gap-3">
              <li className="flex items-start bg-white border border-slate-200 p-3 rounded-lg shadow-sm font-mono text-sm text-slate-600">
                <span className="font-bold text-red-600 mr-3">RULE_01</span>
                Incorrect exchange rate used (deviation {'>'} 0.01%)
              </li>
              <li className="flex items-start bg-white border border-slate-200 p-3 rounded-lg shadow-sm font-mono text-sm text-slate-600">
                <span className="font-bold text-red-600 mr-3">RULE_02</span>
                Display price rounding error (HALF_UP not applied)
              </li>
              <li className="flex items-start bg-white border border-slate-200 p-3 rounded-lg shadow-sm font-mono text-sm text-slate-600">
                <span className="font-bold text-red-600 mr-3">WARN_01</span>
                Price significantly higher than category average
              </li>
            </ul>
          </section>
          
           {/* 7. Data & Limits */}
           <section className="pt-8 border-t border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 uppercase mb-2">Data & Limitations</h4>
              <ul className="text-sm text-slate-500 space-y-1">
                 <li>• System is currently running in DEMO mode with placeholder data.</li>
                 <li>• Prices shown are snapshots and may not reflect real-time market fluctuations.</li>
                 <li>• The "Audit Trail" feature is conceptual for this version.</li>
                 <li>• This tool does not constitute legal or financial advice.</li>
              </ul>
           </section>

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Key Terms Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <div className="flex items-center space-x-2 mb-6 text-slate-900 border-b border-slate-100 pb-4">
               <BookOpenIcon className="w-5 h-5 text-slate-400" />
               <h3 className="font-bold text-lg">Key Terms</h3>
            </div>
            
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-bold text-[#003399]">Dual Display</dt>
                <dd className="text-sm text-slate-600 mt-1">
                  The requirement to show prices in both the legacy currency and the new currency simultaneously.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-[#003399]">Fixed Rate</dt>
                <dd className="text-sm text-slate-600 mt-1">
                   The official conversion rate used by this system (1 EUR = 1.95583 BGN).
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-[#003399]">Base Currency</dt>
                <dd className="text-sm text-slate-600 mt-1">
                  The currency in which the price is originally set and stored (BGN).
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-[#003399]">Adoption Period</dt>
                <dd className="text-sm text-slate-600 mt-1">
                   The timeframe where both currencies are legal tender, typically 1 month after adoption day.
                </dd>
              </div>
            </dl>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
