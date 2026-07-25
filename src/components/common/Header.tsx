import { useState } from "react";
import { Star, ChevronRight, Sun, Moon, Menu, X, ShieldAlert } from "lucide-react";
import logo from "../../../assets/Images/logo.png";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 backdrop-blur-md shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">

          {/* Brand Logo - matching Estuscia font style */}
          <a href="#hero-section" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Estuscia Logo"
              className="h-20 sm:h-24 lg:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider text-slate-100">
            {/* <a href="#plans-section" className="hover:text-cyan-300 transition-colors">
              Plans & Offers
            </a> */}
            {/* <a href="#calculator-section" className="hover:text-cyan-300 transition-colors">
              ROI Simulator
            </a> */}
            <span
              onClick={() => {
                scrollToSection("pillars-section");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-cyan-300 py-1"
            >
              Our Pillars
            </span>

            <span
              onClick={() => {
                scrollToSection("about-section");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-cyan-300 py-1"
            >
              Leadership
            </span>

            <span
              onClick={() => {
                scrollToSection("faq-section");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-cyan-300 py-1"
            >
              F.A.Q.
            </span>

            <span
              onClick={() => {
                scrollToSection("lead-form-section");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-cyan-300 py-1"
            >
              Contact
            </span>
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
            <button
              onClick={() => scrollToSection("lead-form-section")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-white hover:bg-slate-100 text-blue-900 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer border border-white"
            >
              <span>Reserve Slot</span>
              <ChevronRight className="h-4 w-4" />
            </button>

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
          <nav className="flex flex-col gap-3.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            <span
              onClick={() => {
                scrollToSection("pillars-section");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-cyan-600 transition-colors py-1"
            >
              Our Pillars
            </span>

            <span
              onClick={() => {
                scrollToSection("about-section");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-cyan-600 transition-colors py-1"
            >
              Leadership
            </span>

            <span
              onClick={() => {
                scrollToSection("faq-section");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-cyan-600 transition-colors py-1"
            >
              F.A.Q.
            </span>

            <span
              onClick={() => {
                scrollToSection("lead-form-section");
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-cyan-600 transition-colors py-1"
            >
              Contact
            </span>
          </nav>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                scrollToSection("lead-form-section");
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 w-full py-3 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Reserve Slot</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
