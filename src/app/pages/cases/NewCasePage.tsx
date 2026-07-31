import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Package, Paperclip, Search, X } from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { ORDERS } from "../../data/orders";
import type { Order } from "../../types";
import { ROUTES } from "../../routes";

interface NewCaseLocationState {
  preselectedOrderId?: string;
  prefilledSubject?: string;
  prefilledCategory?: string;
  prefilledDescription?: string;
  backTo?: string;
}

const CATEGORIES = [
  "Order Issue",
  "Shipping Damage",
  "Missing Item",
  "Wrong Shipment",
  "Return Authorization",
  "Product Question",
  "Billing / Invoice",
  "Marketing Collateral",
  "Other",
];

export default function NewCasePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as NewCaseLocationState;
  const backTo = state.backTo ?? ROUTES.cases;

  const [subject, setSubject] = useState(state.prefilledSubject ?? "");
  const [category, setCategory] = useState(
    state.prefilledCategory ?? "Order Issue",
  );
  const [description, setDescription] = useState(
    state.prefilledDescription ?? "",
  );
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderQuery, setOrderQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    state.preselectedOrderId
      ? (ORDERS.find((o) => o.id === state.preselectedOrderId) ?? null)
      : null,
  );
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);

  const filteredOrders = ORDERS.filter((o) => {
    const q = orderQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.po.toLowerCase().includes(q) ||
      o.shipTo.toLowerCase().includes(q) ||
      o.date.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setOrderDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.files?.[0]?.name ?? "");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!subject.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate(ROUTES.cases);
    }, 800);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title="New Case"
        back="Back to Cases"
        onBack={() => navigate(backTo)}
      />

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Subject <span className="text-[#111]">*</span>
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of your issue…"
              required
              className="w-full bg-input-background border border-border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-input-background border border-border rounded-lg px-3.5 py-2.5 text-sm pr-9 focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40 transition cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          <div ref={orderRef} className="relative">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Related Order{" "}
              <span className="text-muted-foreground/60 font-normal normal-case">
                (optional)
              </span>
            </label>
            {selectedOrder ? (
              <div className="flex items-center justify-between bg-blue-light border border-blue/20 rounded-lg px-3.5 py-2.5">
                <div className="flex items-center gap-3">
                  <Package size={14} className="text-blue shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {selectedOrder.id}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {selectedOrder.po} · {selectedOrder.shipTo} ·{" "}
                      {selectedOrder.date}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrder(null);
                    setOrderQuery("");
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors ml-2 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <input
                    value={orderQuery}
                    onChange={(e) => {
                      setOrderQuery(e.target.value);
                      setOrderDropdownOpen(true);
                    }}
                    onFocus={() => setOrderDropdownOpen(true)}
                    placeholder="Search by order #, PO, or ship-to…"
                    className="w-full bg-input-background border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40 transition"
                  />
                </div>
                {orderDropdownOpen && filteredOrders.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    {filteredOrders.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => {
                          setSelectedOrder(o);
                          setOrderQuery("");
                          setOrderDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-muted transition-colors"
                      >
                        <Package
                          size={14}
                          className="text-muted-foreground shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-foreground">
                            {o.id}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2 truncate">
                            {o.po} · {o.shipTo}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {o.date}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {orderDropdownOpen &&
                  orderQuery.length > 0 &&
                  filteredOrders.length === 0 && (
                    <div className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg px-3.5 py-3 text-sm text-muted-foreground">
                      No orders match "{orderQuery}"
                    </div>
                  )}
              </>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail — include order numbers, item numbers, or lot numbers if applicable…"
              rows={5}
              className="w-full bg-input-background border border-border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Attachment{" "}
              <span className="text-muted-foreground/60 font-normal normal-case">
                (optional)
              </span>
            </label>
            <div
              className="border border-dashed border-border rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-[#555]/40 hover:bg-[#111]/3 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Paperclip size={16} className="text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">
                {fileName || "Choose file…"}
              </span>
              {fileName && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName("");
                  }}
                  className="ml-auto text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleFile}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={!subject.trim() || submitting}
              className="flex items-center gap-2 bg-primary hover:bg-[var(--primary-dark)] disabled:opacity-50 text-primary-foreground font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : null}
              Submit Case
            </button>
            <button
              type="button"
              onClick={() => navigate(backTo)}
              className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
