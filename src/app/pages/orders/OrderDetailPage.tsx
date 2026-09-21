import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Check, ChevronRight, FileText, MapPin } from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import {
  ORDERS,
  ORDER_ITEMS,
  ORDER_SHIPMENTS,
  TRACKING_EVENTS,
} from "../../data/orders";
import { INVOICES } from "../../data/invoices";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const order = ORDERS.find((o) => o.id === orderId);

  if (!order) return <Navigate to={ROUTES.orders} replace />;

  const shipment = ORDER_SHIPMENTS[order.id];
  const items = ORDER_ITEMS;
  const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const tax = 156.0;
  const shipping = 54.0;
  const total = subtotal + tax + shipping;

  const steps = [
    "Received",
    "Picked",
    "Shipping",
    "Out for Delivery",
    "Delivered",
  ];
  const stepIdx = Math.max(0, steps.indexOf(order.status));

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title={`${order.id}  —  ${order.date}`}
        back="Back to Orders"
        onBack={() => navigate(ROUTES.orders)}
      />

      {/* Tracking card */}
      <Card className="mb-5 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
              Tracking
            </div>
            {order.status === "Received" || order.status === "Picked" ? (
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                  Tracking pending — not yet shipped
                </span>
              </div>
            ) : shipment ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">
                  {shipment.carrier}
                </span>
                {/* Plain text only — never a hyperlink (no carrier homepage link) */}
                <span className="mono text-sm font-medium text-foreground">
                  {shipment.trackingNumber}
                </span>
              </div>
            ) : null}
            {order.status !== "Received" && order.status !== "Picked" && (
              <div className="text-xs text-muted-foreground mt-1">
                Est. delivery:{" "}
                <span className="text-foreground font-medium">03/22/26</span>
              </div>
            )}
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted mx-6" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-[#111] mx-6 transition-all"
            style={{
              right: `${((steps.length - 1 - stepIdx) / (steps.length - 1)) * 100}%`,
            }}
          />
          <div className="relative flex justify-between">
            {steps.map((s, i) => {
              const done = i < stepIdx;
              const active = i === stepIdx;
              return (
                <div key={s} className="flex flex-col items-center gap-2 w-14">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors ${
                      done
                        ? "bg-[#111] border-[#555]"
                        : active
                          ? "bg-white border-[#555]"
                          : "bg-white border-muted"
                    }`}
                  >
                    {done ? (
                      <Check size={14} className="text-white" />
                    ) : active ? (
                      <div className="w-3 h-3 rounded-full bg-[#111]" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-muted" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium text-center leading-tight ${active ? "text-[#111]" : done ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transit event timeline */}
        {(() => {
          const events = TRACKING_EVENTS[order.id];
          if (!events) {
            return (
              <p className="text-xs text-muted-foreground mt-5 italic">
                Tracking updates will appear once the shipment is picked up.
              </p>
            );
          }
          return (
            <div className="mt-5 border-t border-border pt-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Shipment Activity
              </div>
              <div className="relative">
                {/* Vertical connector */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                <div className="space-y-4">
                  {events.map((ev, idx) => (
                    <div key={idx} className="flex items-start gap-4 relative">
                      <div
                        className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 shrink-0 z-10 ${
                          ev.done
                            ? "bg-[#111] border-[#111]"
                            : "bg-card border-border"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span
                            className={`text-sm font-medium ${ev.done ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {ev.description}
                          </span>
                          {!ev.done && (
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">
                              Scheduled
                            </span>
                          )}
                        </div>
                        <div className="mono text-xs text-muted-foreground mt-0.5">
                          {ev.timestamp}
                          {ev.location && <> · {ev.location}</>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </Card>

      {/* Line items */}
      <Card className="mb-5">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Items
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Item #",
                  "Description",
                  "Qty",
                  "Unit Price",
                  "Line Total",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.itemNum}>
                  <td className="px-5 py-3.5 mono text-sm text-muted-foreground">
                    {item.itemNum}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">
                    {item.description}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm text-foreground">
                    {item.qty}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm text-foreground">
                    {fmt(item.unitPrice)}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm font-medium text-foreground">
                    {fmt(item.qty * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Addresses + Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <MapPin size={12} /> Ship To
          </div>
          <div className="text-sm text-foreground leading-relaxed">
            <div className="font-semibold">Reno WD</div>
            <div className="text-muted-foreground">1200 Distribution Dr</div>
            <div className="text-muted-foreground">Reno, NV 89502</div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <FileText size={12} /> Bill To
          </div>
          <div className="text-sm text-foreground leading-relaxed">
            <div className="font-semibold">Reno WD (HQ)</div>
            <div className="text-muted-foreground">PO Box 4410</div>
            <div className="text-muted-foreground">Reno, NV 89505</div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Order Summary
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="mono">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="mono">{fmt(tax)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="mono">{fmt(shipping)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span className="mono text-[#111]">{fmt(total)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Related invoice — single link only (cardinality unconfirmed with Zach; defaulting to one) */}
      {(() => {
        const relatedInvoice = INVOICES.find((inv) => inv.orderId === order.id);
        if (!relatedInvoice) return null;
        return (
          <div className="mt-5">
            <button
              onClick={() => navigate(ROUTES.invoice(relatedInvoice.id))}
              className="w-full flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-4 hover:shadow-md hover:border-[#999]/40 transition-all text-left group"
            >
              <FileText size={16} className="text-muted-foreground shrink-0" />
              <span className="text-sm font-medium text-foreground">
                Related Invoice:{" "}
                <span className="mono text-[#111]">
                  {relatedInvoice.invoiceNumber}
                </span>
              </span>
              <ChevronRight
                size={14}
                className="text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        );
      })()}
    </div>
  );
}
