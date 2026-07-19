import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, RefreshCw, Bot, AlertTriangle, ArrowUpRight, HelpCircle } from "lucide-react";
import { ChatMessage } from "../../types";

export default function AIConsultant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const feedRef = useRef<HTMLDivElement>(null);

  // Initialize messages if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: "Welcome to Estuscia Group! I am your **AI Wealth Consultant**.\n\nI can answer any questions you have regarding our **30-Day Inauguration Offer** (June 20 - July 10), which features a flat **50% profit share** starting from ₹10,000.\n\nAsk me anything, or give me an investment amount (e.g. *Calculate ₹50,000*) and I will compute your payback instantly!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [messages.length]);

  // Scroll feed to bottom
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setError(null);
    const userMessageId = `user-${Date.now()}`;
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: "user",
      text: text,
      timestamp: timestampStr
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setLoading(true);

    try {
      // Package conversation history for contextual memory
      const chatHistory = messages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: chatHistory
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to contact wealth consultant.");
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      setError("AI model response timed out. Standard program rates apply.");
      // Fallback response inside the chat
      const fallbackMsg: ChatMessage = {
        id: `fallback-${Date.now()}`,
        role: "model",
        text: `My apologies, but my intelligence core is experiencing high capacity. Let me confirm the official details: \n\n- **Inauguration Offer**: 30-Day term, 50% Profit Share, minimum ₹10,000. \n- **Contact Channel**: +91 7907 046 955 or estusciagroup@gmail.com.\n\nPlease feel free to leave an inquiry in our form and our human advisor will call you shortly!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatMessageText = (text: string) => {
    // Simple markdown support (bold, list bullets, etc.)
    return text.split('\n').map((line, i) => {
      let content = line;
      
      // Handle Bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-extrabold text-slate-900 dark:text-white">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      // Check if line is bullet list item
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      
      return (
        <p key={i} className={`text-slate-700 dark:text-slate-300 leading-relaxed ${isBullet ? "pl-4 py-0.5 relative before:content-['•'] before:absolute before:left-1 before:text-blue-500" : "py-1"}`}>
          {isBullet ? parts.slice(1) : (parts.length > 0 ? parts : line)}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Chat Trigger Bubble */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group border border-transparent dark:border-slate-700"
          id="ai-consultant-bubble"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageSquare className="h-6 w-6" />
              <span className="absolute top-[-3px] right-[-3px] flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-[9px] font-bold text-white items-center justify-center">AI</span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Sidebar/Drawer Chat Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-[340px] sm:w-[380px] h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-40 flex flex-col overflow-hidden animate-fadeIn"
          id="ai-consultant-panel"
        >
          {/* Header */}
          <div className="p-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 dark:border-slate-900">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold tracking-tight">Estuscia AI Assistant</h4>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Wealth Specialist</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-800 dark:hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div 
            ref={feedRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/70"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                {msg.role === "model" && (
                  <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ES
                  </div>
                )}

                <div className="space-y-1">
                  <div className={`p-3 rounded-2xl text-xs shadow-xs ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none font-medium" 
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none"
                  }`}>
                    {formatMessageText(msg.text)}
                  </div>
                  <span className={`text-[9px] text-slate-400 dark:text-slate-500 block font-mono ${msg.role === "user" ? "text-right" : ""}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 text-[10px] font-bold animate-pulse">
                  ES
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl rounded-tl-none shadow-xs text-xs flex items-center gap-1 text-slate-400 dark:text-slate-500">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span>Advisor is computing returns...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-2 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900/30 rounded-xl text-[10px] flex gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Quick Suggestions (Only shows if there's no custom conversation yet or as a utility) */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button 
              onClick={() => handleSuggestionClick("Tell me about Estuscia Group")}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200/60 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <HelpCircle className="h-3 w-3 text-sky-500" />
              Company Info
            </button>
            <button 
              onClick={() => handleSuggestionClick("Calculate returns for ₹100,000")}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200/60 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <ArrowUpRight className="h-3 w-3 text-emerald-500" />
              Calculate ₹1,00,000
            </button>
            <button 
              onClick={() => handleSuggestionClick("How safe is my investment?")}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200/60 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-yellow-500" />
              Risk Mitigation
            </button>
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Type your wealth query..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(inputValue);
              }}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:outline-hidden rounded-xl px-3 py-2 text-xs dark:text-white"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={loading || !inputValue.trim()}
              className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center shrink-0 cursor-pointer disabled:bg-slate-300 transition-colors border border-transparent dark:border-slate-700"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
