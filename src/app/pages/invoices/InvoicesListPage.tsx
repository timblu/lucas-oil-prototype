import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { INVOICES } from "../../data/invoices";
import { fmtShort } from "../../lib/format";
import { ROUTES } from "../../routes";

export default function InvoicesListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Invoices" />

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
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-card border border-border rounded-lg pl-3 pr-8 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            {["All", "Paid", "Open", "Past Due"].map((s) => (
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
