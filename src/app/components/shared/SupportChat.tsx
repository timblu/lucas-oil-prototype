import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const SUPPORT_MESSAGES = [
  {
    id: "s1",
    sender: "agent" as const,
    name: "Lucas Support",
    timestamp: "Just now",
    body: "Hi J. Miller! You're connected to Lucas Oil Distributor Support. How can I help you today?",
  },
];

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(SUPPORT_MESSAGES);
  const [draft, setDraft] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const ts = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: "you",
        name: "J. Miller",
        timestamp: ts,
        body: text,
      },
    ]);
    setAgentTyping(true);
    setTimeout(() => {
      setAgentTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "agent",
          name: "Lucas Support",
          timestamp: ts,
          body: "Thanks for reaching out. An agent will follow up shortly. For urgent order issues you can also open a Case using the Cases tab.",
        },
      ]);
    }, 1800);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-primary hover:bg-[var(--primary-dark)] text-primary-foreground shadow-lg flex items-center justify-center transition-all active:scale-95"
        style={{ width: 52, height: 52 }}
        aria-label="Open support chat"
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border-2 border-[#111] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#555]" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-[72px] right-6 z-50 w-80 bg-card border border-border rounded-xl shadow-xl flex flex-col overflow-hidden"
          style={{ maxHeight: "420px" }}
        >
          {/* Header */}
          <div className="bg-[#111] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <MessageCircle size={14} className="text-white" />
              </div>
              <div>
                <div className="text-white text-xs font-semibold leading-tight">
                  Lucas Oil Support
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#F8F8F8]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col gap-0.5 max-w-[85%]">
                  <span
                    className={`text-[10px] text-muted-foreground ${msg.sender === "you" ? "text-right" : ""}`}
                  >
                    {msg.sender === "agent" ? msg.name : "You"} ·{" "}
                    {msg.timestamp}
                  </span>
                  <div
                    className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === "you"
                        ? "bg-[#111] text-white rounded-tr-sm"
                        : "bg-white border border-border text-foreground rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {msg.body}
                  </div>
                </div>
              </div>
            ))}
            {agentTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#aaa] animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#aaa] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#aaa] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Compose */}
          <div className="px-3 py-2.5 border-t border-border bg-card flex items-end gap-2 shrink-0">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message support…"
              rows={1}
              className="flex-1 bg-[#F2F2F2] border border-border rounded-lg px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-ring/20 transition"
              style={{ minHeight: 34, maxHeight: 80 }}
            />
            <button
              onClick={send}
              disabled={!draft.trim()}
              className="w-8 h-8 rounded-lg bg-primary hover:bg-[var(--primary-dark)] disabled:opacity-40 text-primary-foreground flex items-center justify-center transition-colors shrink-0"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
