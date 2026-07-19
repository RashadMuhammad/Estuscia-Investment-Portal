import { useState } from "react";
import { DollarSign, ShieldCheck, HelpCircle, ArrowRight, TrendingUp, Info } from "lucide-react";

interface ROICalculatorProps {
  onApply: (amount: number) => void;
}

export default function ROICalculator({ onApply }: ROICalculatorProps) {
  const [amount, setAmount] = useState<number>(25000);

  // Constants based on the poster:
  const profitShareRate = 0.50; // 50% Profit Share
  const lockInDays = 30; // 30 Days

  const profitEarned = amount * profitShareRate;
  const totalPayback = amount + profitEarned;

  const presets = [10000, 25000, 50000, 100000, 250000, 500000];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300" id="calculator-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-full">Interactive Tools</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
            Estuscia ROI Simulator
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Calculate your short-term wealth expansion. Put in your custom investment amount to see how our flat 50% profit-sharing structure multiplies your return.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Inputs & Presets */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label htmlFor="investment-slider" className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Select Investment Principal
                </label>
                <div className="flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 font-semibold bg-sky-50 dark:bg-sky-950/50 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Min: ₹10,000
                </div>
              </div>

              {/* Display of raw amount */}
              <div className="relative mb-6">
                <div className="flex items-baseline gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 shadow-xs transition-colors">
                  <span className="text-2xl font-black text-slate-400 dark:text-slate-500">₹</span>
                  <input 
                    type="number" 
                    min={10000} 
                    max={10000000}
                    value={amount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAmount(val);
                    }}
                    className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white w-full focus:outline-hidden font-mono bg-transparent"
                  />
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2 mb-8">
                <input 
                  id="investment-slider"
                  type="range" 
                  min={10000} 
                  max={1000000} 
                  step={5000}
                  value={amount < 10000 ? 10000 : amount > 1000000 ? 1000000 : amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono">
                  <span>₹10,000</span>
                  <span>₹5,000,000 (Expanded range)</span>
                </div>
              </div>

              {/* Presets Grid */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Quick Select Levels</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all duration-200 cursor-pointer ${
                        amount === preset 
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs" 
                          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      ₹{preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Note box */}
            <div className="bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100/50 dark:border-sky-900/30 p-4 rounded-2xl flex items-start gap-3 mt-4 text-xs text-slate-600 dark:text-slate-300">
              <Info className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 dark:text-white block mb-0.5">How this works:</strong>
                Our team distributes funds across short-term secured portfolios with institutional grade yield-hedging. Under the Inauguration Offer, exactly 50% of the total earned revenues are allocated back to you.
              </div>
            </div>
          </div>

          {/* Right Panel: The Receipts & Computations */}
          <div className="lg:col-span-5 bg-[#fafbfc] dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-colors">
            
            {/* Watermark brand icon */}
            <div className="absolute right-[-20px] bottom-[-20px] text-slate-100 dark:text-slate-800/15 pointer-events-none scale-150">
              <svg width="200" height="200" fill="currentColor" viewBox="0 0 100 100">
                <path d="M50 0 L55 35 L90 25 L65 45 L100 50 L65 55 L90 75 L55 65 L50 100 L45 65 L10 75 L35 55 L0 50 L35 45 L10 25 L45 35 Z" />
              </svg>
            </div>

            <div className="relative z-1 space-y-6">
              <div className="border-b border-dashed border-slate-200 dark:border-slate-700 pb-4">
                <span className="text-xs font-bold text-sky-500 dark:text-sky-400 uppercase tracking-widest font-mono">Investment Prospectus</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Inauguration Program</h3>
              </div>

              {/* Data breakdowns */}
              <div className="space-y-4">
                
                {/* Row 1: Principal */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Principal Investment</span>
                  <span className="text-lg font-bold text-slate-800 dark:text-white font-mono">₹{amount.toLocaleString()}</span>
                </div>

                {/* Row 2: Lock-in */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Maturity Period</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full font-mono">30 Days</span>
                </div>

                {/* Row 3: Return rate */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Split Share Rate</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full font-mono">50% Fixed</span>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />

                {/* Row 4: Net Profit Earned */}
                <div className="flex justify-between items-center py-1 bg-yellow-50/60 dark:bg-yellow-950/15 p-3 rounded-xl border border-yellow-100 dark:border-yellow-900/40">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Estimated Profit</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">At lock-in maturity</span>
                  </div>
                  <span className="text-xl font-black text-slate-800 dark:text-white font-mono">
                    + ₹{profitEarned.toLocaleString()}
                  </span>
                </div>

                {/* Row 5: Total Return Payback */}
                <div className="flex justify-between items-center py-3 bg-blue-600 text-white p-4 rounded-xl shadow-xs">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">Total Payback</span>
                    <span className="text-[10px] text-blue-200">Principal + Profit</span>
                  </div>
                  <span className="text-2xl font-black font-mono">
                    ₹{totalPayback.toLocaleString()}
                  </span>
                </div>

              </div>
            </div>

            {/* Application Action */}
            <div className="mt-8 relative z-1">
              <button
                onClick={() => onApply(amount)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold py-4 px-6 transition-all shadow-md group hover:-translate-y-0.5 cursor-pointer border border-transparent dark:border-slate-700"
              >
                <span>Reserve Slots For This Amount</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-2.5">
                *The 50% returns are backed by short term commercial portfolio security. Past performances do not guarantee identical horizons, but Estuscia commits to 50% split.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
