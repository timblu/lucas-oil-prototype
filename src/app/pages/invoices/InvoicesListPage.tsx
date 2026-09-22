import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Receipt,
  Search,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { INVOICES } from "../../data/invoices";
import { fmtShort } from "../../lib/format";
import { ROUTES } from "../../routes";
import type { Invoice } from "../../types";

type SummaryFilter = "Pending" | "Open" | "Past Due";

type StatusFilter = "All" | SummaryFilter | "Paid";

function matchesStatusFilter(invoice: Invoice, filter: StatusFilter) {
  if (filter === "All") return true;
  if (filter === "Pending") {
    return invoice.status === "Open" || invoice.status === "Past Due";
  }
  return invoice.status === filter;
}

function SummaryCard({
  label,
  count,
  icon,
  active,
  onClick,
}: {
  label: string;
  count: number;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`bg-card border rounded-xl px-5 py-4 text-left hover:shadow-md transition-all group flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111]/30 ${
        active ? "border-[#111] shadow-sm" : "border-border"
      }`}
    >
      <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="mono text-2xl font-semibold text-foreground tracking-tight">
          {count}
        </div>
      </div>
    </button>
  );
}

export default function InvoicesListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const pendingInvoices = INVOICES.filter(
    (inv) => inv.status === "Open" || inv.status === "Past Due",
  );
  const openInvoices = INVOICES.filter((inv) => inv.status === "Open");
  const pastDueInvoices = INVOICES.filter((inv) => inv.status === "Past Due");

  const filtered = INVOICES.filter((inv) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.orderId.toLowerCase().includes(q) ||
      inv.poNumber.toLowerCase().includes(q);
    const matchS = matchesStatusFilter(inv, statusFilter);
    return matchQ && matchS;
  });

  function toggleSummaryFilter(next: SummaryFilter) {
    setStatusFilter((current) => (current === next ? "All" : next));
  }

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Invoices" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <SummaryCard
          label="Pending"
          count={pendingInvoices.length}
          icon={<Clock size={20} className="text-foreground" />}
          active={statusFilter === "Pending"}
          onClick={() => toggleSummaryFilter("Pending")}
        />
        <SummaryCard
          label="Open"
          count={openInvoices.length}
          icon={<Receipt size={20} className="text-foreground" />}
          active={statusFilter === "Open"}
          onClick={() => toggleSummaryFilter("Open")}
        />
        <SummaryCard
          label="Past Due"
          count={pastDueInvoices.length}
          icon={<AlertCircle size={20} className="text-foreground" />}
          active={statusFilter === "Past Due"}
          onClick={() => toggleSummaryFilter("Past Due")}
        />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoices…"
            className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none bg-card border border-border rounded-lg pl-3 pr-8 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            {(["All", "Pending", "Open", "Past Due", "Paid"] as const).map(
              (s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ),
            )}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Invoice #",
                  "Date",
                  "Related Order / PO",
                  "Amount",
                  "Status",
                  "Due Date",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3.5"
                  >
                    {h}
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  onClick={() => navigate(ROUTES.invoice(inv.id))}
                  className="hover:bg-muted/30 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-4 mono text-sm font-medium text-[#111] group-hover:text-[#333]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-5 py-4 mono text-sm text-foreground">
                    {inv.invoiceDate}
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(ROUTES.order(inv.orderId));
                      }}
                      className="mono text-[#111] hover:underline"
                    >
                      {inv.orderId}
                    </button>
                    <span className="text-muted-foreground"> · {inv.poNumber}</span>
                  </td>
                  <td className="px-5 py-4 mono text-sm font-semibold text-foreground">
                    {fmtShort(inv.total)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-5 py-4 mono text-sm text-muted-foreground">
                    {inv.dueDate}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    <ChevronRight
                      size={15}
                      className="opacity-30 group-hover:opacity-80 transition-opacity"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No invoices match your search.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
