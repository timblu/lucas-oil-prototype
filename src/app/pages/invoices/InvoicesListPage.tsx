import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Receipt,
  Search,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { INVOICES } from "../../data/invoices";
import { fmtShort } from "../../lib/format";
import { ROUTES } from "../../routes";

type StatusFilter = "All" | "Paid" | "Open" | "Past Due";

function invoiceCountLabel(count: number) {
  return `${count} invoice${count === 1 ? "" : "s"}`;
}

function SummaryCard({
  label,
  value,
  hint,
  icon,
  active,
  onClick,
}: {
  label: string;
  value: string;
  hint: string;
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
          {value}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>
      </div>
    </button>
  );
}

export default function InvoicesListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const openInvoices = INVOICES.filter((inv) => inv.status === "Open");
  const pastDueInvoices = INVOICES.filter((inv) => inv.status === "Past Due");
  const paidInvoices = INVOICES.filter((inv) => inv.status === "Paid");
  const outstandingAmount = INVOICES.reduce((sum, inv) => sum + inv.amountDue, 0);
  const openAmount = openInvoices.reduce((sum, inv) => sum + inv.amountDue, 0);
  const pastDueAmount = pastDueInvoices.reduce(
    (sum, inv) => sum + inv.amountDue,
    0,
  );
  const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.total, 0);

  const filtered = INVOICES.filter((inv) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.orderId.toLowerCase().includes(q) ||
      inv.poNumber.toLowerCase().includes(q);
    const matchS = statusFilter === "All" || inv.status === statusFilter;
    return matchQ && matchS;
  });

  function toggleStatus(next: StatusFilter) {
    setStatusFilter((current) => (current === next ? "All" : next));
  }

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Invoices" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <SummaryCard
          label="Outstanding"
          value={fmtShort(outstandingAmount)}
          hint={invoiceCountLabel(openInvoices.length + pastDueInvoices.length)}
          icon={<CircleDollarSign size={20} className="text-foreground" />}
          active={false}
          onClick={() => setStatusFilter("All")}
        />
        <SummaryCard
          label="Open"
          value={fmtShort(openAmount)}
          hint={invoiceCountLabel(openInvoices.length)}
          icon={<Receipt size={20} className="text-foreground" />}
          active={statusFilter === "Open"}
          onClick={() => toggleStatus("Open")}
        />
        <SummaryCard
          label="Past Due"
          value={fmtShort(pastDueAmount)}
          hint={invoiceCountLabel(pastDueInvoices.length)}
          icon={<AlertCircle size={20} className="text-foreground" />}
          active={statusFilter === "Past Due"}
          onClick={() => toggleStatus("Past Due")}
        />
        <SummaryCard
          label="Paid"
          value={fmtShort(paidAmount)}
          hint={invoiceCountLabel(paidInvoices.length)}
          icon={<CheckCircle2 size={20} className="text-foreground" />}
          active={statusFilter === "Paid"}
          onClick={() => toggleStatus("Paid")}
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
            {(["All", "Paid", "Open", "Past Due"] as const).map((s) => (
              <option key={s}>{s}</option>
            ))}
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
