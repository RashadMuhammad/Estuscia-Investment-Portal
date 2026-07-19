import { Star, Landmark, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-slate-800 dark:border-slate-900 pb-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-black tracking-widest text-white">ESTUSCIA</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Estuscia Group delivers secure, short-term return compounding under audited risk-mitigation portfolios. Empowering investors with shared upside wealth management since inauguration.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-800 dark:bg-slate-900 px-3 py-1.5 rounded-md text-sky-400">
                Established 2026
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-800 dark:bg-slate-900 px-3 py-1.5 rounded-md text-yellow-400">
                50% Fixed Share
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-800 dark:bg-slate-900 px-3 py-1.5 rounded-md text-emerald-400">
                Escrow Secured
              </span>
            </div>
          </div>

          {/* Column 2: Program slots */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Offer Slots</h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li className="flex items-center justify-between">
                <span>Start Date:</span>
                <strong className="text-slate-200">June 20, 2026</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Close Date:</span>
                <strong className="text-slate-200">July 10, 2026</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Minimum Capital:</span>
                <strong className="text-slate-200">₹10,000 INR</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Maturity Term:</span>
                <strong className="text-slate-200">30 Calendar Days</strong>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Legal Support</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-sky-400 shrink-0" />
                <a href="tel:+917907046955" className="hover:text-white transition-colors font-mono">+91 7907 046 955</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                <a href="mailto:estusciagroup@gmail.com" className="hover:text-white transition-colors font-mono">estusciagroup@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 text-xs">
                <Landmark className="h-4 w-4 text-sky-400 shrink-0" />
                <span>Estuscia Global Escrow Corp</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal disclaimer and Copyright info */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-500 gap-4">
          <div>
            <p>&copy; {new Date().getFullYear()} Estuscia Group. All private portfolios are managed with strict compliance checks. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="#hero-section" className="hover:text-white transition-colors">Privacy Charter</a>
            <span className="text-slate-800">•</span>
            <a href="#hero-section" className="hover:text-white transition-colors">Allocations Protocol</a>
            <span className="text-slate-800">•</span>
            <a href="#lead-form-section" className="hover:text-white transition-colors">Investor Login</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
