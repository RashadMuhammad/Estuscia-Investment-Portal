import { useEffect, useState } from "react";
import { Clock, Users, Flame, Star, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onReserveClick: (amount: number) => void;
}

export default function Hero({ onReserveClick }: HeroProps) {
  // Target date: July 10, 2026
  const targetDate = new Date("2026-07-10T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isExpired: true }));
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative overflow-hidden bg-[#fafbfc] dark:bg-slate-950 py-12 md:py-20 lg:py-28 transition-colors duration-300" id="hero-section">
      {/* Decorative Grid Lines to match poster */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          transform: 'skewY(-5deg) scale(1.1)'
        }}
      />

      {/* Floating decorative elements from the poster */}
      {/* Blue Sparkle Star (top-left) */}
      <div className="absolute top-12 left-6 md:left-20 animate-pulse text-sky-400 dark:text-sky-500 opacity-80 pointer-events-none">
        <svg width="64" height="64" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 35 L90 25 L65 45 L100 50 L65 55 L90 75 L55 65 L50 100 L45 65 L10 75 L35 55 L0 50 L35 45 L10 25 L45 35 Z" />
        </svg>
      </div>

      {/* Gold Sparkle Star (bottom-right) */}
      <div className="absolute bottom-12 right-6 md:right-24 text-yellow-400 dark:text-yellow-500 opacity-90 animate-spin pointer-events-none" style={{ animationDuration: '25s' }}>
        <svg width="48" height="48" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 35 L90 25 L65 45 L100 50 L65 55 L90 75 L55 65 L50 100 L45 65 L10 75 L35 55 L0 50 L35 45 L10 25 L45 35 Z" />
        </svg>
      </div>

      {/* Giant Blue Glow Arrow (bottom-left) */}
      <div className="absolute bottom-[-40px] left-[-30px] md:left-[10%] text-sky-200/40 dark:text-sky-500/10 pointer-events-none blur-sm transform rotate-12 scale-150">
        <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 17.5l8.5-8.5H10V7h7v7h-2v-3.5L6.5 19 5 17.5z" />
        </svg>
      </div>

      {/* Abstract Ring graphic (right) */}
      <div className="absolute right-[-100px] top-[15%] w-80 h-80 rounded-full border-[32px] border-sky-400/20 dark:border-sky-500/5 border-r-yellow-400/30 blur-xs pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Offer details */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 dark:border-sky-950 bg-sky-50/50 dark:bg-sky-950/30 px-4 py-1.5 text-xs font-semibold text-sky-700 dark:text-sky-400 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping" />
              <Sparkles className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              Official Inauguration Offer
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              SECURE YOUR <span className="text-sky-600 dark:text-sky-400 bg-gradient-to-r from-sky-600 dark:from-sky-400 to-blue-700 dark:to-blue-400 bg-clip-text text-transparent">FUTURE</span> WITH <br className="hidden sm:inline" />
              SMART <span className="text-blue-700 dark:text-blue-400 bg-gradient-to-r from-blue-700 dark:from-blue-400 to-sky-500 dark:to-sky-400 bg-clip-text text-transparent">INVESTMENT</span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mx-auto lg:mx-0">
              Estuscia Group invites you to compound your capital with fully verified wealth management. 
              Enjoy transparent short-term asset growth through our limited-period launch program.
            </p>

            {/* Timers & Interactive Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Status Badge */}
              <div className="flex flex-col items-center sm:items-start bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-xs w-full sm:w-auto transition-colors">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-1">Duration Offer</span>
                <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 rounded-xl">30 Days Term</span>
              </div>

              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-4 rounded-2xl shadow-md text-white w-full sm:w-auto">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Clock className="h-4 w-4 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Slots Close In:</span>
                </div>
                
                {timeLeft.isExpired ? (
                  <span className="text-sm font-bold text-red-400">Offer Slots Filled</span>
                ) : (
                  <div className="flex items-center justify-center gap-3 font-mono">
                    <div className="text-center">
                      <span className="text-xl font-black block leading-none">{String(timeLeft.days).padStart(2, '0')}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-sans">Days</span>
                    </div>
                    <span className="text-lg font-bold text-yellow-400 animate-pulse">:</span>
                    <div className="text-center">
                      <span className="text-xl font-black block leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-sans">Hrs</span>
                    </div>
                    <span className="text-lg font-bold text-yellow-400 animate-pulse">:</span>
                    <div className="text-center">
                      <span className="text-xl font-black block leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-sans">Mins</span>
                    </div>
                    <span className="text-lg font-bold text-yellow-400 animate-pulse">:</span>
                    <div className="text-center">
                      <span className="text-xl font-black block leading-none">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-sans">Secs</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-sky-500 dark:text-sky-400" />
                Verified Investors: <strong className="text-slate-800 dark:text-slate-200">140+</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                Active Slots Reserved: <strong className="text-slate-800 dark:text-slate-200">82%</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                Target ROI: <strong className="text-slate-800 dark:text-slate-200">50% Fixed</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Key Poster Banners (Minimum Investment, Investment Period, Profit Share) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Stamp/Seal floating near banners */}
            <div className="absolute top-[-25px] right-[10%] z-10 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="relative flex items-center justify-center w-28 h-28 text-center bg-white dark:bg-slate-900 rounded-full border-2 border-dashed border-sky-400 p-2 shadow-lg transform rotate-12 transition-colors">
                <div>
                  <div className="text-[10px] font-bold text-sky-500 dark:text-sky-400 uppercase tracking-wider">Limited Slots</div>
                  <div className="text-sm font-black text-slate-800 dark:text-white">June 20</div>
                  <div className="w-8 h-0.5 bg-sky-300 dark:bg-sky-700 mx-auto my-0.5" />
                  <div className="text-sm font-black text-slate-800 dark:text-white">July 10</div>
                </div>
              </div>
            </div>

            {/* The Slanted Blue Banners matching the poster */}
            <div className="w-full max-w-sm space-y-5 transform lg:rotate-[-4deg] relative z-2">
              
              {/* Banner 1: Minimum Investment */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 p-5 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-sky-300/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-6 pointer-events-none" />
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-sky-100 font-semibold block mb-0.5">Minimum Investment</span>
                    <span className="text-3xl font-black tracking-tight flex items-center gap-1 font-mono">
                      ₹10,000
                    </span>
                  </div>
                  <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                    <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-sky-100 font-medium">
                  <span>Accessible to everyone</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded-full">Primary Level</span>
                </div>
              </div>

              {/* Banner 2: Investment Period */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-blue-400/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-6 pointer-events-none" />
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-blue-100 font-semibold block mb-0.5">Investment Period</span>
                    <span className="text-3xl font-black tracking-tight flex items-center gap-1 font-mono">
                      30 Days
                    </span>
                  </div>
                  <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-blue-100 font-medium">
                  <span>Fast liquidation timeline</span>
                  <span className="bg-white/15 px-2 py-0.5 rounded-full">Short Term</span>
                </div>
              </div>

              {/* Banner 3: Profit Share */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 p-5 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border border-sky-400/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-6 pointer-events-none" />
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-sky-100 font-semibold block mb-0.5">Profit Share</span>
                    <span className="text-4xl font-black tracking-tight flex items-center gap-1 font-mono">
                      50% <span className="text-sm font-semibold tracking-normal text-yellow-300">Flat Split</span>
                    </span>
                  </div>
                  <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                    <TrendingUp className="h-5 w-5 text-yellow-300" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-sky-100 font-medium">
                  <span>No maintenance or fee reductions</span>
                  <span className="bg-yellow-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">Max Split</span>
                </div>
              </div>

            </div>

            {/* Dynamic CTA button pointing directly below */}
            <div className="mt-6">
              <button 
                onClick={() => onReserveClick(10000)}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                Reserve Inauguration Slot
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
