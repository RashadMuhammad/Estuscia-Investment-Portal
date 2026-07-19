import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { LeadSubmission } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory lead storage
const leadsList: LeadSubmission[] = [
  {
    id: "lead-1",
    fullName: "Arun Kumar",
    email: "arun.kumar@gmail.com",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    investmentAmount: 50000,
    notes: "Interested in the 50% profit share inauguration offer.",
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    status: "new"
  },
  {
    id: "lead-2",
    fullName: "Priya Sharma",
    email: "priya.sharma@outlook.com",
    phone: "+91 99112 23344",
    investmentAmount: 10000,
    notes: "Want to try with minimum investment first.",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: "contacted"
  }
];

// Initialize Gemini SDK with telemetry headers
const geminiApiKey = process.env.GEMINI_API_KEY || "";
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Warning: GEMINI_API_KEY is not set. AI Advisor will operate in fallback mock mode.");
}

// 1. API: Get all leads (for the simple admin lead tracker)
app.get("/api/leads", (req, res) => {
  res.json(leadsList);
});

// 2. API: Submit a new lead
app.post("/api/leads", (req, res) => {
  const { fullName, email, phone, whatsapp, investmentAmount, notes } = req.body;

  if (!fullName || !email || !phone || !investmentAmount) {
    return res.status(400).json({ error: "Missing required fields: fullName, email, phone, and investmentAmount are required." });
  }

  const newLead: LeadSubmission = {
    id: `lead-${Date.now()}`,
    fullName,
    email,
    phone,
    whatsapp: whatsapp || undefined,
    investmentAmount: Number(investmentAmount),
    notes: notes || "",
    createdAt: new Date().toISOString(),
    status: "new"
  };

  leadsList.unshift(newLead);
  res.status(201).json({ success: true, lead: newLead });
});

// 3. API: Update lead status
app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["new", "contacted", "approved"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  const leadIndex = leadsList.findIndex(l => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: "Lead not found." });
  }

  leadsList[leadIndex].status = status;
  res.json({ success: true, lead: leadsList[leadIndex] });
});

// 4. API: Delete lead
app.delete("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const index = leadsList.findIndex(l => l.id === id);
  if (index !== -1) {
    leadsList.splice(index, 1);
    return res.json({ success: true });
  }
  res.status(404).json({ error: "Lead not found" });
});

// 5. API: Chat with Gemini AI Advisor
app.post("/api/gemini/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!ai) {
    // Elegant fallback if API key is missing
    return res.json({
      text: `Hello! Thank you for inquiring about Estuscia Group. I am operating in offline mode right now as the backend key is being configured. \n\nTo answer your question directly based on our official prospectus: Estuscia Group is currently accepting limited slots for our **Inauguration Offer** (June 20 - July 10). We offer a fixed **50% profit share** on a **30-day investment lock-in** (minimum investment ₹10,000). \n\nFor personalized onboarding, please give us a call at **+91 7907 046 955** or email us at **estusciagroup@gmail.com**. You can also submit the inquiry form right here on our page!`
    });
  }

  try {
    const systemInstruction = `You are an elite, highly professional Wealth Management Assistant for Estuscia Group.
Your goal is to guide prospective investors who visit the official Estuscia Investment Web Portal.
Be extremely polite, formal, objective, confident, and professional. Do not use slang, excessive exclamation points, or emojis unless they are highly polished (like a standard professional handshake, checkmark, or arrow).

Core Information about Estuscia Group & the Active Investment Plan:
- Company Name: Estuscia Group
- Tagline: Secure Your Future with Smart Investment
- Offer Name: Inauguration Offer
- Offer Duration/Active period: 30 Days lock-in term.
- Slots Availability: Open from June 20, 2026 to July 10, 2026. Slots are highly limited!
- Minimum Investment Amount: ₹10,000 (INR). Investors can choose higher levels (e.g. ₹50,000, ₹100,000, ₹500,000, etc.) for larger returns.
- Investment Period/Lock-in: 30 Days.
- Profit Share Structure: Flat 50% Return. This means that if an investor puts in ₹10,000, they receive an additional ₹5,000 in profits, yielding a total return of ₹15,000 in 30 days. No hidden fees or management costs.
- Core Pillars:
  1. Transparent Process: Delivering consistent returns with high security.
  2. Trusted Partner: Estuscia Group is your committed partner in wealth creation.
  3. Committed to Your Finance Growth: We offer responsive support and weekly progress reports on portfolio returns.
- Contact Details:
  - Phone Support: +91 7907 046 955
  - Email Address: estusciagroup@gmail.com

Instructions:
- Address the user respectfully.
- Answer queries accurately and help them calculate potential returns! If they mention an amount, multiply it by 0.50 to show their profit, and add it to show their total payback in 30 days.
- Keep responses compact, clean, structured with bullet points where necessary, and direct. Avoid repeating paragraphs.
- Keep the tone trustworthy, emphasizing transparency.
- Suggest filling out the Lead Inquiry Form directly on the website if they are ready to reserve a slot.`;

    // Reconstruct the chat history in the format expected by GoogleGenAI
    // The format is: contents: [{ role: 'user'|'model', parts: [{ text: '...' }] }]
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Append the current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const responseText = response.text || "I apologize, but I could not formulate a response. Please reach out directly to +91 7907 046 955.";
    res.json({ text: responseText });

  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Failed to query Gemini API",
      text: "I am experiencing some connectivity issues with my advanced AI core. However, I can confirm that our 30-day investment program offers a fixed 50% profit share on investments starting from ₹10,000. Please reach out to our team at +91 7907 046 955 or estusciagroup@gmail.com."
    });
  }
});

// Vite Integration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Estuscia Server] Running on http://localhost:${PORT}`);
  });
}

start();
