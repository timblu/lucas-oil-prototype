import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { ORDERS } from "../../data/orders";
import { fmtShort } from "../../lib/format";
import { ROUTES } from "../../routes";
import type { Order } from "../../types";

type StatusFilter =
  | "All"
  | "In Progress"
  | "In Transit"
  | Order["status"];

const STATUS_FILTER_OPTIONS: StatusFilter[] = [
  "All",
  "In Progress",
  "In Transit",
  "Received",
  "Picked",
  "Shipping",
  "Out for Delivery",
  "Delivered",
];

function orderCountLabel(count: number) {
  return `${count} order${count === 1 ? "" : "s"}`;
}

function matchesStatusFilter(order: Order, filter: StatusFilter) {
  if (filter === "All") return true;
  if (filter === "In Progress") return order.status !== "Delivered";
  if (filter === "In Transit") {
    return order.status === "Shipping" || order.status === "Out for Delivery";
  }
  return order.status === filter;
}

function sumOrderTotals(orders: Order[]) {
  return orders.reduce((sum, o) => sum + o.total, 0);
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

export default function OrdersListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const inProgressOrders = ORDERS.filter((o) => o.status !== "Delivered");
  const inTransitOrders = ORDERS.filter(
    (o) => o.status === "Shipping" || o.status === "Out for Delivery",
  );
  const deliveredOrders = ORDERS.filter((o) => o.status === "Delivered");
  const totalValue = sumOrderTotals(ORDERS);
  const inProgressValue = sumOrderTotals(inProgressOrders);
  const inTransitValue = sumOrderTotals(inTransitOrders);
  const deliveredValue = sumOrderTotals(deliveredOrders);

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

  function toggleStatus(next: StatusFilter) {
    setStatusFilter((current) => (current === next ? "All" : next));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Orders" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <SummaryCard
          label="Total value"
          value={fmtShort(totalValue)}
          hint={orderCountLabel(ORDERS.length)}
          icon={<CircleDollarSign size={20} className="text-foreground" />}
          active={false}
          onClick={() => setStatusFilter("All")}
        />
        <SummaryCard
          label="In progress"
          value={fmtShort(inProgressValue)}
          hint={orderCountLabel(inProgressOrders.length)}
          icon={<Package size={20} className="text-foreground" />}
          active={statusFilter === "In Progress"}
          onClick={() => toggleStatus("In Progress")}
        />
        <SummaryCard
          label="In transit"
          value={fmtShort(inTransitValue)}
          hint={orderCountLabel(inTransitOrders.length)}
          icon={<Truck size={20} className="text-foreground" />}
          active={statusFilter === "In Transit"}
          onClick={() => toggleStatus("In Transit")}
        />
        <SummaryCard
          label="Delivered"
          value={fmtShort(deliveredValue)}
          hint={orderCountLabel(deliveredOrders.length)}
          icon={<CheckCircle2 size={20} className="text-foreground" />}
          active={statusFilter === "Delivered"}
          onClick={() => toggleStatus("Delivered")}
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
