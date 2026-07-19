import { Users, Linkedin, Mail, Shield, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function AboutMembers() {
  const members = [
    {
      name: "Rashad Muhammad",
      role: "Founder & Managing Director",
      bio: "Leading Estuscia Group's strategic vision and global wealth operations. Committed to structuring secure, high-yield commercial capital opportunities and expanding our institutional-grade private placements.",
      initials: "RM",
      color: "from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500",
      accent: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
      linkedin: "#",
      email: "rashad007muhammad@gmail.com"
    },
    {
      name: "Marcus Vance",
      role: "Chief Investment Officer (CIO)",
      bio: "An institutional risk expert with over 12 years of expertise across commercial bridge accounts and capital allocation. Marcus supervises our algorithmic risk-mitigation portfolios and high-liquidity assets.",
      initials: "MV",
      color: "from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500",
      accent: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400",
      linkedin: "#",
      email: "marcus.vance@estuscia.com"
    },
    {
      name: "Elena Rostova",
      role: "Head of Compliance & Escrow Operations",
      bio: "Ensures absolute regulatory alignment, multi-signature escrow protocol checks, and capital isolation practices. Elena protects our private portfolios with stringent compliance standards.",
      initials: "ER",
      color: "from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500",
      accent: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400",
      linkedin: "#",
      email: "elena.rostova@estuscia.com"
    },
    {
      name: "Devon Lane",
      role: "Senior Investor Relations Officer",
      bio: "Dedicated to guiding your investment onboarding and account setup. Devon handles custom allocations, publishes weekly reporting metrics, and is available for portfolio consultations.",
      initials: "DL",
      color: "from-blue-500 to-sky-400 dark:from-blue-400 dark:to-sky-300",
      accent: "bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-300",
      linkedin: "#",
      email: "devon.lane@estuscia.com"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300" id="about-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full">
            <Users className="h-3.5 w-3.5" />
            Leadership Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Meet the Minds Behind Estuscia Group
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Our multi-disciplinary team brings together elite finance structuring, rigorous compliance operations, and institutional-grade portfolio risk-limits.
          </p>
        </div>

        {/* Corporate Trust Banner */}
        <div className="mb-16 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800 dark:border-slate-800/80 relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] text-slate-800/20 dark:text-slate-900 pointer-events-none scale-150">
            <Shield className="h-40 w-40" />
          </div>
          <div className="relative z-1 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center justify-center md:justify-start gap-1">
                <Award className="h-4 w-4" />
                Guiding Principles of Management
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Fiduciary Responsibility & Capital Security
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Estuscia partners with premier custody banks and utilizes isolated escrow channels. Under the leadership of <strong>Rashad Muhammad</strong>, our firm operates with maximum asset auditability and pre-set volatility cut-offs.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="text-center bg-white/10 dark:bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                <div className="text-lg font-black text-yellow-400">100%</div>
                <div className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Asset Audit</div>
              </div>
              <div className="text-center bg-white/10 dark:bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                <div className="text-lg font-black text-sky-400">0%</div>
                <div className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Hidden Fees</div>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, idx) => {
            return (
              <div
                key={idx}
                className="group flex flex-col bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/70 hover:border-sky-300 dark:hover:border-sky-700/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Header Profile Glow */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${member.color}`} />

                {/* Team Member Visual Avatar */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} text-white font-black tracking-widest text-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105`}>
                    {member.initials}
                  </div>
                  
                  {/* Badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${member.accent}`}>
                    {idx === 0 ? "Founder" : "Advisor"}
                  </span>
                </div>

                {/* Name & Title */}
                <div className="space-y-1">
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-200/60 dark:bg-slate-700/50 my-4" />

                {/* Bio Description */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed flex-grow">
                  {member.bio}
                </p>

                {/* Contact Channels / Social Connect */}
                <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/30 flex items-center gap-3 text-slate-400 dark:text-slate-500">
                  <a
                    href={member.linkedin}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
                    title="LinkedIn Portfolio"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
                    title="Direct Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest font-mono ml-auto flex items-center gap-0.5">
                    <Sparkles className="h-2.5 w-2.5 text-yellow-500" />
                    Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
