import { useRef, useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Sparkles, 
  Clock, 
  Percent, 
  Coins, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { motion } from "motion/react";

interface Plan {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  profitShare: string;
  monthlyShare?: string;
  principal: string;
  isCustomLayout?: boolean;
  layoutType: "grid" | "vertical" | "classic";
  badges?: string[];
  actionLabel?: string;
}

interface InvestmentPlansProps {
  onSelectPlan: (amount: number) => void;
}

export default function InvestmentPlans({ onSelectPlan }: InvestmentPlansProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);

  const plans: Plan[] = [
    {
      id: "plan-1",
      title: "INVEST WITH PURPOSE GROW WITH CONFIDENCE",
      subtitle: "40days - 10% Returns",
      period: "40 Days",
      profitShare: "10%",
      principal: "1,00,000",
      layoutType: "classic",
      actionLabel: "For More Details"
    },
    {
      id: "plan-2",
      title: "SMART INVESTMENTS, STRONGER FUTURES",
      subtitle: "8 months - 82% Returns",
      period: "8 Months",
      profitShare: "82%",
      monthlyShare: "10.25%",
      principal: "1,00,000",
      layoutType: "grid",
      actionLabel: "Get Standard Investor Card"
    },
    {
      id: "plan-3",
      title: "SMART INVEST FOR A SECURE TOMORROW",
      subtitle: "5 Months - 50% Returns",
      period: "5 months",
      profitShare: "50%",
      monthlyShare: "10%",
      principal: "1,00,000 (Minimum)",
      layoutType: "vertical",
      badges: ["Easy Exit", "Free Financial Awareness", "Exclusive Membership"],
      actionLabel: "For More Details"
    }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveCard(index);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: "smooth"
      });
      setActiveCard(index);
    }
  };

  const handleApply = (principalStr: string) => {
    const num = parseInt(principalStr.replace(/[^0-9]/g, ""), 10) || 100000;
    onSelectPlan(num);
    const element = document.getElementById("lead-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300" id="plans-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-full">
              Exclusive Capital Offers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              Estuscia Official Investment Plans
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              Explore our structured high-grade capital reserves models designed strictly to align with your return timeline. Tap on a plan to prefill the application.
            </p>
          </div>
          
          {/* Controls for desktop carousel */}
          <div className="flex items-center gap-2 mt-6 md:mt-0">
            <button
              onClick={() => scrollTo(Math.max(0, activeCard - 1))}
              disabled={activeCard === 0}
              className="p-3.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-755 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
              aria-label="Previous Offer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollTo(Math.min(plans.length - 1, activeCard + 1))}
              disabled={activeCard === plans.length - 1}
              className="p-3.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-755 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
              aria-label="Next Offer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container with cards */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 scrollbar-none pb-6 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {plans.map((plan, idx) => (
            <div 
              key={plan.id}
              className="min-w-full md:min-w-[460px] lg:min-w-[500px] xl:min-w-[540px] snap-center shrink-0"
              id={`investment-card-${plan.id}`}
            >
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative h-full bg-white dark:bg-slate-950 rounded-[40px] border-2 border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-lg flex flex-col justify-between overflow-hidden"
              >
                {/* Visual coordinate grid lines background to match the physical poster design */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03]" 
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Sparkling vector star graphics from the actual posters */}
                <div className="absolute top-6 left-6 text-sky-400 dark:text-sky-500 opacity-60 pointer-events-none">
                  <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 L55 35 L90 25 L65 45 L100 50 L65 55 L90 75 L55 65 L50 100 L45 65 L10 75 L35 55 L0 50 L35 45 L10 25 L45 35 Z" />
                  </svg>
                </div>
                <div className="absolute bottom-16 right-6 text-yellow-400/80 dark:text-yellow-500/80 pointer-events-none">
                  <svg width="28" height="28" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0 L55 35 L90 25 L65 45 L100 50 L65 55 L90 75 L55 65 L50 100 L45 65 L10 75 L35 55 L0 50 L35 45 L10 25 L45 35 Z" />
                  </svg>
                </div>

                {/* Card Content */}
                <div className="relative z-10 space-y-6 flex-1">
                  
                  {/* Brand Tagline Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                        {plan.title}
                      </h3>
                      {/* Dashed Outline Badge */}
                      <div className="inline-block mt-3.5 px-4.5 py-1.5 border-2 border-dashed border-sky-400/70 dark:border-sky-500/50 rounded-full text-xs font-extrabold text-blue-600 dark:text-sky-400 bg-sky-50/20">
                        {plan.subtitle}
                      </div>
                    </div>
                    <span className="text-sm font-black tracking-widest text-slate-300 dark:text-slate-700 font-sans shrink-0 uppercase">
                      ESTUSCIA
                    </span>
                  </div>

                  {/* Poster Blueprint Content Layouts */}
                  
                  {/* Classic layout (Plan 1) */}
                  {plan.layoutType === "classic" && (
                    <div className="space-y-4 pt-4">
                      {/* Big Principal Block */}
                      <div className="bg-gradient-to-br from-blue-500 to-sky-500 dark:from-blue-600 dark:to-sky-600 text-white rounded-3xl p-5 shadow-xs border border-blue-400/30">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-85 block mb-1">Principal Investment</span>
                        <span className="text-3xl sm:text-4xl font-black font-mono text-yellow-300 tracking-tight">
                          ₹{plan.principal}
                        </span>
                      </div>
                      
                      {/* Period & Profit side-by-side */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-750 dark:to-blue-850 text-white rounded-2xl p-4 border border-blue-500/20">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-0.5">Investment Period</span>
                          <span className="text-lg sm:text-xl font-bold font-mono text-yellow-300">
                            {plan.period}
                          </span>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-750 dark:to-blue-850 text-white rounded-2xl p-4 border border-blue-500/20">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-0.5">Profit share</span>
                          <span className="text-lg sm:text-xl font-bold font-mono text-yellow-300">
                            {plan.profitShare}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Grid layout (Plan 2) */}
                  {plan.layoutType === "grid" && (
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {/* Principal */}
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-750 dark:to-blue-850 text-white rounded-2xl p-4 border border-blue-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-0.5">Principal Investment</span>
                        <span className="text-lg sm:text-xl font-bold font-mono text-yellow-300">
                          ₹{plan.principal}
                        </span>
                      </div>
                      {/* Period */}
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-750 dark:to-blue-850 text-white rounded-2xl p-4 border border-blue-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-0.5">Investment Period</span>
                        <span className="text-lg sm:text-xl font-bold font-mono text-yellow-300">
                          {plan.period}
                        </span>
                      </div>
                      {/* Profit Share */}
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-750 dark:to-blue-850 text-white rounded-2xl p-4 border border-blue-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-0.5">Profit Share</span>
                        <span className="text-lg sm:text-xl font-bold font-mono text-yellow-300">
                          {plan.profitShare}
                        </span>
                      </div>
                      {/* Monthly Share */}
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-750 dark:to-blue-850 text-white rounded-2xl p-4 border border-blue-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-0.5">Monthly Share</span>
                        <span className="text-lg sm:text-xl font-bold font-mono text-yellow-300">
                          {plan.monthlyShare}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Vertical layout (Plan 3) */}
                  {plan.layoutType === "vertical" && (
                    <div className="flex gap-4 pt-4">
                      {/* Side label matching poster */}
                      <div className="w-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-center p-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest [writing-mode:vertical-lr] transform rotate-180">
                          ESTUSCIA INVESTMENT PLANS
                        </span>
                      </div>
                      
                      {/* Main elements list */}
                      <div className="flex-1 space-y-2.5">
                        <div className="bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-700 dark:to-sky-700 text-white rounded-xl px-4 py-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-85">Principal Investment</span>
                          <span className="text-sm font-bold font-mono text-yellow-300">₹{plan.principal}</span>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-700 dark:to-sky-700 text-white rounded-xl px-4 py-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-85">Investment Period</span>
                          <span className="text-sm font-bold font-mono text-yellow-300">{plan.period}</span>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-700 dark:to-sky-700 text-white rounded-xl px-4 py-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-85">Profit Share</span>
                          <span className="text-sm font-bold font-mono text-yellow-300">{plan.profitShare}</span>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-700 dark:to-sky-700 text-white rounded-xl px-4 py-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-85">Monthly Share</span>
                          <span className="text-sm font-bold font-mono text-yellow-300">{plan.monthlyShare}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Plan features/badges from posters */}
                  {plan.badges && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {plan.badges.map((badge) => (
                        <span 
                          key={badge}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 rounded-full uppercase tracking-wider"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Contact/Verification Footer of Poster inside the card */}
                  <div className="pt-5 border-t border-slate-150 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                        <span className="font-mono text-slate-700 dark:text-slate-300">+91 7907 046 955</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                        <span className="font-mono text-slate-700 dark:text-slate-300 text-[10px]">estusciagroup@gmail.com</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">HiLITE Business Park</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                        <span>Corporate Verified</span>
                      </span>
                    </div>
                  </div>

                </div>

                {/* Apply/Interactive Action Button */}
                <div className="mt-8">
                  <button
                    onClick={() => handleApply(plan.principal)}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs uppercase tracking-wider font-extrabold rounded-2xl transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2 border border-slate-900 dark:border-transparent"
                  >
                    <span>{plan.actionLabel || "For More Details"}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

              </motion.div>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {plans.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeCard === idx ? 'w-8 bg-sky-600 dark:bg-sky-400' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
