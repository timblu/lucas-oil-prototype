import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Package,
  Receipt,
  Search,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { ORDERS } from "../../data/orders";
import { fmtShort } from "../../lib/format";
import { ROUTES } from "../../routes";
import type { Order } from "../../types";

type SummaryFilter = "Pending" | "Open" | "Due";

type StatusFilter = "All" | SummaryFilter | Order["status"];

const STATUS_FILTER_OPTIONS: StatusFilter[] = [
  "All",
  "Pending",
  "Open",
  "Due",
  "Received",
  "Picked",
  "Shipping",
  "Out for Delivery",
  "Delivered",
];

function matchesStatusFilter(order: Order, filter: StatusFilter) {
  if (filter === "All") return true;
  if (filter === "Pending") {
    return order.status === "Received" || order.status === "Picked";
  }
  if (filter === "Open") return order.status === "Shipping";
  if (filter === "Due") return order.status === "Out for Delivery";
  return order.status === filter;
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

export default function OrdersListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const pendingOrders = ORDERS.filter(
    (o) => o.status === "Received" || o.status === "Picked",
  );
  const openOrders = ORDERS.filter((o) => o.status === "Shipping");
  const dueOrders = ORDERS.filter((o) => o.status === "Out for Delivery");

  const filtered = ORDERS.filter((o) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.po.toLowerCase().includes(q) ||
      o.shipTo.toLowerCase().includes(q);
    const matchS = matchesStatusFilter(o, statusFilter);
    return matchQ && matchS;
  });

  function toggleSummaryFilter(next: SummaryFilter) {
    setStatusFilter((current) => (current === next ? "All" : next));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Orders" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <SummaryCard
          label="Pending"
          count={pendingOrders.length}
          icon={<Package size={20} className="text-foreground" />}
          active={statusFilter === "Pending"}
          onClick={() => toggleSummaryFilter("Pending")}
        />
        <SummaryCard
          label="Open"
          count={openOrders.length}
          icon={<Receipt size={20} className="text-foreground" />}
          active={statusFilter === "Open"}
          onClick={() => toggleSummaryFilter("Open")}
        />
        <SummaryCard
          label="Due"
          count={dueOrders.length}
          icon={<AlertCircle size={20} className="text-foreground" />}
          active={statusFilter === "Due"}
          onClick={() => toggleSummaryFilter("Due")}
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
            placeholder="Search orders…"
            className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none bg-card border border-border rounded-lg pl-3 pr-8 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            {STATUS_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
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
                {["Order #", "Date", "PO #", "Ship-to", "Status", "Total"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3.5"
                    >
                      {h}
                    </th>
                  ),
                )}
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => navigate(ROUTES.order(o.id))}
                  className="hover:bg-muted/30 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-4 mono text-sm font-medium text-[#111] group-hover:text-[#333]">
                    {o.id}
                  </td>
                  <td className="px-5 py-4 mono text-sm text-foreground">
                    {o.date}
                  </td>
                  <td className="px-5 py-4 mono text-sm text-muted-foreground">
                    {o.po}
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground">
                    {o.shipTo}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-4 mono text-sm font-semibold text-foreground">
                    {fmtShort(o.total)}
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
              No orders match your search.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
