import { ShieldCheck, ArrowRight, Lock, Building2, Zap } from "lucide-react";

interface HeroProps {
  onReserveClick: (amount: number) => void;
}

export default function Hero({ onReserveClick }: HeroProps) {
  const handleGetStarted = () => {
    onReserveClick(100000);
    const element = document.getElementById("lead-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#fafbfc] dark:bg-slate-950 py-16 md:py-24 lg:py-28 transition-colors duration-300" id="hero-section">
      
      {/* Blueprint Grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          transform: 'skewY(-4deg) scale(1.1)'
        }}
      />

      {/* Blue Sparkle Star Vector (top-left) */}
      <div className="absolute top-12 left-6 md:left-20 text-sky-400 dark:text-sky-500 opacity-80 pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 35 L90 25 L65 45 L100 50 L65 55 L90 75 L55 65 L50 100 L45 65 L10 75 L35 55 L0 50 L35 45 L10 25 L45 35 Z" />
        </svg>
      </div>

      {/* Gold Sparkle Star Vector (top-right) */}
      <div className="absolute top-16 right-6 md:right-20 text-sky-400 dark:text-sky-500 opacity-70 pointer-events-none">
        <svg width="44" height="44" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 35 L90 25 L65 45 L100 50 L65 55 L90 75 L55 65 L50 100 L45 65 L10 75 L35 55 L0 50 L35 45 L10 25 L45 35 Z" />
        </svg>
      </div>

      {/* Soft Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
        
        {/* Top Centered Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/40 px-5 py-2 text-xs md:text-sm font-bold text-sky-700 dark:text-sky-300 shadow-2xs">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          Verified Estuscia Capital Portfolios
        </div>

        {/* Main Centered Title */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] uppercase">
            INVEST WITH <span className="text-sky-600 dark:text-sky-400 bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">PURPOSE</span> <br />
            GROW WITH <span className="text-sky-500 dark:text-sky-400 bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">CONFIDENCE</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Deploy capital across hard contract-backed commercial accounts. Experience institutional wealth creation with fixed returns from 10% to 82%.
          </p>
        </div>

        {/* Value Bullets */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 max-w-2xl mx-auto">
          <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2 shadow-2xs">
            <Lock className="h-4 w-4 text-sky-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Escrow Backed</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2 shadow-2xs">
            <Building2 className="h-4 w-4 text-sky-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Hard Contracts</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2 shadow-2xs">
            <Zap className="h-4 w-4 text-sky-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Fixed Yield Returns</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={handleGetStarted}
            className="px-9 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5"
          >
            <span>Inquire & Start Allocation</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

