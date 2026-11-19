import type { Invoice, Order } from "../types";

const ACTIVE_ORDER_PRIORITY = [
  "Out for Delivery",
  "Shipping",
  "Picked",
  "Received",
] as const;

export function getInvoiceSummary(invoices: Invoice[]) {
  const open = invoices.filter((i) => i.status === "Open");
  const pastDue = invoices.filter((i) => i.status === "Past Due");
  const amountDue = [...open, ...pastDue].reduce(
    (sum, i) => sum + i.amountDue,
    0,
  );

  return {
    amountDue,
    openCount: open.length,
    pastDueCount: pastDue.length,
    hasPastDue: pastDue.length > 0,
  };
}

export function getActiveOrdersSummary(orders: Order[]) {
  const active = orders.filter((o) => o.status !== "Delivered");

  let urgent: Order | null = null;
  for (const status of ACTIVE_ORDER_PRIORITY) {
    const match = active.find((o) => o.status === status);
    if (match) {
      urgent = match;
      break;
    }
  }

  return {
    activeCount: active.length,
    urgent,
  };
}
