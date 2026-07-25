import { useState, useEffect } from "react";
import { HelpCircle, ArrowUpRight } from "lucide-react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Hero from "./components/home/Hero";
import ROICalculator from "./components/home/ROICalculator";
import InvestmentPlans from "./components/home/InvestmentPlans";
import Pillars from "./components/about/Pillars";
import AboutMembers from "./components/about/AboutMembers";
import LeadForm from "./components/contact/LeadForm";
import AIConsultant from "./components/common/AIConsultant";

export default function App() {
  const [prefilledAmount, setPrefilledAmount] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("estuscia-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  // Update root element classes when theme state changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("estuscia-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // When a user selects an amount in the Hero or Calculator and clicks Apply
  const handleApplyInvestment = (amount: number) => {
    setPrefilledAmount(amount);
  };

  // Safe callback after lead is submitted to trigger notification or log
  const handleLeadSuccess = () => {
    console.log("Lead successfully submitted. Tracking logged.");
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-sky-200 dark:selection:bg-sky-900 font-sans transition-colors duration-300" id="app-root">
      
      {/* 1. Standard Modular Header Navigation */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* 2. Main Page Layout Sections */}
      <main>
        {/* Hero Section containing slanted poster details */}
        <Hero onReserveClick={handleApplyInvestment} />

        {/* Dynamic Return Simulator Slider */}
        {/* <ROICalculator onApply={handleApplyInvestment} /> */}

        {/* Reintroduced & Beautified Estuscia Investment Plans Carousel/Cards */}
        {/* <InvestmentPlans onSelectPlan={handleApplyInvestment} /> */}

        {/* Pillars / Values matching poster icons */}
        <Pillars />

        {/* Beautiful Leadership Team Section */}
        <AboutMembers />

        {/* Interactive FAQ Block to answer visitor questions on the fly */}
        <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300" id="faq-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full">
                Common Queries
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Get immediate technical clarification regarding our corporate structures and investment timelines.
              </p>
            </div>

            {/* FAQ List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Q1 */}
              <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-3 hover:border-sky-300 dark:hover:border-sky-700/50 transition-colors">
                <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-sky-500 shrink-0" />
                  What is the Estuscia Inauguration Offer?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  It is a limited-time 30-day program launched by Estuscia Group to mark our group's wealth services expansion. We offer a flat 50% split on short-term high-yield commercial allocations to build institutional trust.
                </p>
              </div>

              {/* Q2 */}
              <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-3 hover:border-sky-300 dark:hover:border-sky-700/50 transition-colors">
                <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-sky-500 shrink-0" />
                  Is there any risk to my capital?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  Estuscia mitigates sector risk by investing strictly across high-grade capital reserves, commercial bridge accounts, and assets backed by hard contracts. However, all investments carry market horizons, and we operate under strict risk-limits.
                </p>
              </div>

              {/* Q3 */}
              <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-3 hover:border-sky-300 dark:hover:border-sky-700/50 transition-colors">
                <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-sky-500 shrink-0" />
                  How is the return profit calculated and paid?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  Our profit share structure is a straight 50% split on principal. An investment of ₹10,000 earns an additional ₹5,000, and is fully liquidated back to your bank on the 30th calendar day.
                </p>
              </div>

              {/* Q4 */}
              <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-3 hover:border-sky-300 dark:hover:border-sky-700/50 transition-colors">
                <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-sky-500 shrink-0" />
                  How do I start and what are the dates?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  Our slots are strictly open between **June 20** and **July 10, 2026**. Simply reserve a slot with your chosen amount via the simulator, fill out the form, and our onboarding coordinator will complete your escrow setup.
                </p>
              </div>

            </div>

            {/* Support section inside FAQ */}
            <div className="text-center mt-12">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Have specific, customized financial questions? 
                <a href="#lead-form-section" className="text-blue-600 dark:text-sky-400 hover:underline font-bold ml-1.5 inline-flex items-center gap-0.5">
                  Connect with our human portfolio manager <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </p>
            </div>

          </div>
        </section>

        {/* Contact form & Admin dashboard */}
        <LeadForm prefilledAmount={prefilledAmount} onSuccess={handleLeadSuccess} />
      </main>

      {/* 3. Standard Modular Footer */}
      <Footer />

      {/* Floating Interactive AI Assistant (with server proxy to Gemini 3.5 Flash) */}
      <AIConsultant />

    </div>
  );
}
