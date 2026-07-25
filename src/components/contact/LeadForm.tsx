import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, ShieldAlert, Phone, Mail, MessageSquareCode, Trash2, CheckCircle, RefreshCw, Lock, Eye, EyeOff } from "lucide-react";
import { LeadSubmission } from "../../types";

interface LeadFormProps {
  prefilledAmount: number | null;
  onSuccess: () => void;
}

export default function LeadForm({ prefilledAmount, onSuccess }: LeadFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [amount, setAmount] = useState<string>("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Admin / Founder View States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Sync pre-filled amount from slider
  useEffect(() => {
    if (prefilledAmount !== null) {
      setAmount(String(prefilledAmount));
      // Scroll to form smoothly
      const element = document.getElementById("lead-form-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [prefilledAmount]);

  // Handle phone sync
  useEffect(() => {
    if (sameAsPhone) {
      setWhatsapp(phone);
    }
  }, [phone, sameAsPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const investmentAmount = Number(amount);
    if (isNaN(investmentAmount) || investmentAmount < 10000) {
      setError("The minimum investment amount is ₹10,000 for the Inauguration Offer.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          whatsapp: whatsapp || undefined,
          investmentAmount,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit lead. Please try again.");
      }

      setSubmitted(true);
      onSuccess();
      
      // Fetch latest leads if admin panel is logged in
      if (isAuthorized) {
        fetchLeads();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    // Simple password check for demonstration (free-tier admin panel)
    if (adminPassword.trim().toLowerCase() === "estuscia2026") {
      setIsAuthorized(true);
      fetchLeads();
    } else {
      setAdminError("Invalid Admin Access Code. Enter 'estuscia2026' to evaluate.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: "new" | "contacted" | "approved") => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to remove this investor inquiry?")) return;
    try {
      const response = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const handleResetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setWhatsapp("");
    setSameAsPhone(true);
    setAmount("");
    setNotes("");
    setSubmitted(false);
    setError(null);
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300" id="lead-form-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Program Details & Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-full">Secure a Slot</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
                Submit Capital Inquiry
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Complete our secure application form to reserve your allocation. Once submitted, an Estuscia Portfolio Officer will contact you within 4 business hours to finalize documents.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Direct Contact Details</h3>
              
              {/* Phone Channel */}
              <a 
                href="tel:+917907046955"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-100 dark:border-slate-800"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase block">Phone Support</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">+91 7907 046 955</span>
                </div>
              </a>

              {/* Email Channel */}
              <a 
                href="mailto:estusciagroup@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-100 dark:border-slate-800"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase block">Official Email</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">estusciagroup@gmail.com</span>
                </div>
              </a>
            </div>

            {/* Note regarding safety */}
            <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-950/15 border border-yellow-100 dark:border-yellow-900/30 text-xs text-yellow-800 dark:text-yellow-300 flex gap-3">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <div>
                <strong>Important Notice:</strong> Estuscia Group operates in absolute regulatory compliance. We will never ask for bank secrets, OTPs, or passwords. All transfers are securely processed via verified escrow channels.
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Submission Form / Success State */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-850/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative transition-colors">
            
            {submitted ? (
              /* Success State */
              <div className="text-center py-12 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-2">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Application Success!
                </h3>
                <div className="max-w-md mx-auto text-slate-600 dark:text-slate-300 text-sm space-y-3 leading-relaxed">
                  <p>
                    Thank you <strong className="text-slate-800 dark:text-white">{fullName}</strong>! Your inauguration offer slot has been securely registered.
                  </p>
                  <p className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300">
                    Registered Value: <strong>₹{Number(amount).toLocaleString()}</strong> <br />
                    Expected Return: <strong>₹{(Number(amount) * 1.5).toLocaleString()}</strong> in 30 days.
                  </p>
                  <p>
                    A portfolio supervisor will contact you shortly at <strong className="text-slate-800 dark:text-white">{phone}</strong>.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer border border-transparent dark:border-slate-700"
                  >
                    Register Another Account
                  </button>
                </div>
              </div>
            ) : (
              /* Regular Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-hidden rounded-xl px-4 py-3 text-sm dark:text-white"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. arun.kumar@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-hidden rounded-xl px-4 py-3 text-sm dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-hidden rounded-xl px-4 py-3 text-sm font-mono dark:text-white"
                    />
                  </div>

                  {/* Investment Amount */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Intended Investment (₹)</label>
                    <input
                      type="number"
                      required
                      min={10000}
                      placeholder="Min ₹10,000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-hidden rounded-xl px-4 py-3 text-sm font-mono font-bold text-blue-600 dark:text-blue-400"
                    />
                  </div>
                </div>

                {/* WhatsApp Checkbox */}
                {/* <div className="flex items-center gap-2.5 py-1">
                  <input
                    type="checkbox"
                    id="same-phone"
                    checked={sameAsPhone}
                    onChange={(e) => setSameAsPhone(e.target.checked)}
                    className="h-4 w-4 text-sky-500 focus:ring-sky-400 border-slate-200 dark:border-slate-700 rounded-sm cursor-pointer"
                  />
                  <label htmlFor="same-phone" className="text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer">
                    WhatsApp is the same as my mobile number
                  </label>
                </div> */}

                {/* WhatsApp custom input (if unchecked) */}
                {!sameAsPhone && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="WhatsApp contact number"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-hidden rounded-xl px-4 py-3 text-sm font-mono dark:text-white"
                    />
                  </div>
                )}

                {/* Notes/Comments */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Questions or Preferences (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Specify special onboarding preferences or specific inquiries..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-hidden rounded-xl px-4 py-3 text-sm dark:text-white"
                  />
                </div>

                {/* Submit Feedback Error */}
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 text-xs text-red-600 dark:text-red-400 rounded-xl">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 transition-all shadow-md cursor-pointer disabled:bg-slate-400"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Verifying and lodging application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Official Allocation Request</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Founder Dashboard Access Link */}
            <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400 dark:text-slate-500">Estuscia Group Private Portal</span>
              <button
                onClick={() => {
                  setIsAdminOpen(!isAdminOpen);
                  setAdminError(null);
                }}
                className="flex items-center gap-1.5 font-bold text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer"
              >
                <Lock className="h-3.5 w-3.5" />
                Inquiries Dashboard (Toggles Admin Panel)
              </button>
            </div>

            {/* Admin Password Gate */}
            {isAdminOpen && !isAuthorized && (
              <form onSubmit={handleAdminLogin} className="mt-4 p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Lodge Management Panel</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-sm font-mono">CODE: estuscia2026</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Enter Access Key to evaluate leads..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-hidden text-white"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer"
                  >
                    Unlock
                  </button>
                </div>
                {adminError && (
                  <p className="text-[11px] text-red-400 font-medium">{adminError}</p>
                )}
              </form>
            )}

            {/* Authorized Admin Dashboard */}
            {isAdminOpen && isAuthorized && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Active Investor Leads ({leads.length})</span>
                  </div>
                  <button 
                    onClick={fetchLeads}
                    disabled={refreshing}
                    className="p-1 hover:bg-slate-800 rounded-md transition-colors"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                  {leads.length === 0 ? (
                    <p className="text-center text-slate-500 text-xs py-4">No submissions received yet.</p>
                  ) : (
                    leads.map((lead) => (
                      <div key={lead.id} className="p-3 rounded-xl bg-slate-800 border border-slate-700/60 space-y-2 text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-100">{lead.fullName}</h4>
                            <p className="text-[10px] text-slate-400 font-mono">{lead.email} | {lead.phone}</p>
                          </div>
                          <span className="text-xs font-extrabold text-sky-400 font-mono">
                            ₹{lead.investmentAmount.toLocaleString()}
                          </span>
                        </div>

                        {lead.notes && (
                          <p className="text-[11px] text-slate-300 italic bg-slate-900/40 p-2 rounded-md">
                            &ldquo;{lead.notes}&rdquo;
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-slate-700/40 text-[10px]">
                          <span className="text-slate-400">{new Date(lead.createdAt).toLocaleString()}</span>
                          
                          <div className="flex items-center gap-2">
                            {/* Status controls */}
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                              className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-1.5 py-0.5"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="approved">Approved</option>
                            </select>

                            {/* Delete button */}
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1 text-red-400 hover:bg-red-500/15 rounded-md"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
