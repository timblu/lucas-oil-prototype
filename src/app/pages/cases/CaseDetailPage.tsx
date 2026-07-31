import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  Hash,
  MessageCircle,
  Send,
  Tag,
  User,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { CASES, INITIAL_MESSAGES } from "../../data/cases";
import type { Message } from "../../types";
import { ROUTES } from "../../routes";

export default function CaseDetailPage() {
  const navigate = useNavigate();
  const { caseId } = useParams<{ caseId: string }>();
  const c = CASES.find((x) => x.id === caseId);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!c) return <Navigate to={ROUTES.cases} replace />;

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: "you",
        timestamp: "now",
        body: text,
      },
    ]);
    setDraft("");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const isActive = c.status === "Open" || c.status === "In Progress";

  const caseFields = [
    {
      label: "Date Opened",
      value: c.lastUpdated,
      mono: true,
      icon: <Calendar size={14} />,
    },
    {
      label: "Category",
      value:
        caseId === "CS-2039" ? "Order Issue — Quantity" : "Order Issue",
      icon: <Tag size={14} />,
    },
    {
      label: "Contact",
      value: "J. Miller — Reno WD",
      icon: <User size={14} />,
    },
    {
      label: "Case Owner",
      value: "A. Reyes (Lucas Support)",
      icon: <MessageCircle size={14} />,
    },
    {
      label: "Related Order",
      value: caseId === "CS-2039" ? "SO-10042" : "—",
      mono: true,
      icon: <Hash size={14} />,
    },
    {
      label: "Last Updated",
      value: c.lastUpdated,
      mono: true,
      icon: <Clock size={14} />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title={`Case ${c.id}`}
        back="Back to Cases"
        onBack={() => navigate(ROUTES.cases)}
      />

      {/* Case header */}
      <Card className="mb-5 p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {caseId === "CS-2039"
                ? "Incorrect quantity on recent shipment"
                : c.subject}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={c.status} />
            <span className="text-xs bg-muted text-muted-foreground rounded px-2 py-0.5 font-medium">
              Priority: Medium
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-border pt-5">
          {caseFields.map((f) => (
            <div
              key={f.label}
              className="relative bg-muted/40 rounded-lg px-4 py-3 min-w-0"
            >
              <div className="absolute top-3 right-3 text-muted-foreground/40">
                {f.icon}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 pr-6">
                {f.label}
              </div>
              <div
                className={`text-sm font-medium text-foreground ${f.mono ? "mono" : ""}`}
              >
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Description */}
      <Card className="mb-5 p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Description
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {caseId === "CS-2039"
            ? "Received PO-8834 (SO-10042). Hi-Perf 10W-30 case count was short by 3 — packing slip shows 10 cases but only 7 arrived. Please advise on a credit or reship."
            : c.subject}
        </p>
      </Card>

      {/* Messaging */}
      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-[#111]" />
            <h2 className="font-semibold text-sm">Messaging</h2>
          </div>
        </div>

        {/* Message thread */}
        <div className="px-5 py-4 space-y-3 max-h-72 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] ${msg.sender === "you" ? "items-end" : "items-start"} flex flex-col gap-1`}
              >
                <div className="text-xs text-muted-foreground">
                  {msg.sender === "agent"
                    ? `Agent · ${msg.agentName} — ${msg.timestamp}`
                    : `You · J. Miller — ${msg.timestamp}`}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "you"
                      ? "bg-blue text-blue-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.body}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Compose */}
        {isActive ? (
          <div className="px-5 pb-4 border-t border-border pt-4">
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Post a message to the agent handling your case…"
                rows={1}
                className="flex-1 bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40 transition"
              />
              <button
                onClick={sendMessage}
                disabled={!draft.trim()}
                className="flex items-center gap-1.5 bg-blue hover:bg-blue-dark disabled:opacity-40 text-blue-foreground px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shrink-0"
              >
                <Send size={14} /> Send
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        ) : (
          <div className="px-5 pb-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center italic">
              This case is {c.status.toLowerCase()} — messaging is no longer
              available.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
