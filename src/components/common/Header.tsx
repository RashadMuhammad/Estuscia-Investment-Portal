import { useState } from "react";
import { Star, ChevronRight, Sun, Moon, Menu, X, ShieldAlert } from "lucide-react";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          
          {/* Brand Logo - matching Estuscia font style */}
          <a href="#hero-section" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-100 dark:to-slate-200 text-white dark:text-slate-900 shadow-xs">
              <Star className="h-5 w-5 fill-yellow-400 dark:fill-yellow-500 text-yellow-400 dark:text-yellow-500" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-[0.2em] text-slate-900 dark:text-white font-sans">
              ESTUSCIA
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <a href="#plans-section" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Plans & Offers
            </a>
            <a href="#calculator-section" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              ROI Simulator
            </a>
            <a href="#pillars-section" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Our Pillars
            </a>
            <a href="#about-section" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Leadership
            </a>
            <a href="#faq-section" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              F.A.Q.
            </a>
          </nav>

          {/* Header Action Items (Theme Toggle + CTA) */}
          <div className="flex items-center gap-3">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
              aria-label="Toggle Theme"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4 text-yellow-400" />
              )}
            </button>

            {/* CTA Header Button */}
            <a 
              href="#lead-form-section"
              className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer border border-slate-900 dark:border-white"
            >
              <span>Reserve Slot</span>
              <ChevronRight className="h-4 w-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 px-4 space-y-3 shadow-lg animate-fadeIn transition-colors duration-300">
          <nav className="flex flex-col gap-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <a 
              href="#plans-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-sky-600 dark:hover:text-sky-400 py-1"
            >
              Plans & Offers
            </a>
            <a 
              href="#calculator-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-sky-600 dark:hover:text-sky-400 py-1"
            >
              ROI Simulator
            </a>
            <a 
              href="#pillars-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-sky-600 dark:hover:text-sky-400 py-1"
            >
              Our Pillars
            </a>
            <a 
              href="#about-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-sky-600 dark:hover:text-sky-400 py-1"
            >
              Leadership
            </a>
            <a 
              href="#faq-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-sky-600 dark:hover:text-sky-400 py-1"
            >
              F.A.Q.
            </a>
          </nav>
          
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <a 
              href="#lead-form-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              <span>Reserve Slot</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
