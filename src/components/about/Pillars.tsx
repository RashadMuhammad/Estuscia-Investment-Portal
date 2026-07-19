import { useState } from "react";
import { Handshake, ShieldCheck, TrendingUp, ChevronDown, Check } from "lucide-react";

export default function Pillars() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillarsData = [
    {
      id: 1,
      title: "Transparent Process",
      tagline: "Consistent results through open book asset operations.",
      icon: Handshake,
      color: "from-blue-500 to-sky-500",
      details: [
        "No hidden margins or entry/exit penalties of any type.",
        "Weekly portfolio performance reporting uploaded to your dashboard.",
        "Verified deployment in high-liquidity short-term corporate paper.",
        "Secure returns backed by real, cash-flowing company contracts."
      ]
    },
    {
      id: 2,
      title: "Your Trusted Partner",
      tagline: "Committed to structuring safety and strategic wealth creation.",
      icon: ShieldCheck,
      color: "from-sky-400 to-blue-500",
      details: [
        "Risk mitigation frameworks designed by sector specialists.",
        "Capital isolation procedures ensuring safety of principal.",
        "Regulated escrow channels used for all inbound and outbound transactions.",
        "Strict compliance checks and multi-signature authorization."
      ]
    },
    {
      id: 3,
      title: "Committed to Financial Growth",
      tagline: "Accelerating your capital with dedicated active management.",
      icon: TrendingUp,
      color: "from-blue-600 to-sky-500",
      details: [
        "A focused 50% profit-sharing split designed for mutual gain.",
        "Direct access to your dedicated account coordinator via WhatsApp or phone.",
        "Automated payout distribution on the 30th day directly to your registered bank account.",
        "Priority queue slots for all future high-yield series offers."
      ]
    }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 transition-colors duration-300" id="pillars-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-full">Core Principles</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
            Why Capital Partners Choose Estuscia
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Our foundations are built on solid integrity, modern risk management, and shared upside models.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillarsData.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            const isOpen = activePillar === idx;

            return (
              <div 
                key={pillar.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/85 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Circle */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-sm mb-6`}>
                    <IconComponent className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                    {idx === 0 ? "Consistent Results" : idx === 1 ? "Wealth Creation" : "Finance Growth"}
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                    {pillar.tagline}
                  </p>

                  {/* Expandable items with smooth height */}
                  <div className={`mt-5 space-y-3 transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                      {pillar.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-normal">
                          <span className="h-4 w-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/60">
                  <button
                    onClick={() => setActivePillar(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>{isOpen ? "Hide Core Details" : "Explore Core Details"}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
