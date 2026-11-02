import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  MapPin,
} from "lucide-react";
import { Card } from "../../components/shared/Card";
import { AppBreadcrumbs } from "../../components/shared/AppBreadcrumbs";
import { StatusBadge } from "../../components/shared/StatusBadge";
import {
  OrderTrackingBanner,
  stepsFromOrderStatus,
} from "../../components/shared/OrderTrackingBanner";
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
  const events = TRACKING_EVENTS[order.id];
  const relatedInvoice = INVOICES.find((inv) => inv.orderId === order.id);

  // Figma shows all-complete for delivered demo; map from order status otherwise
  const steps =
    order.status === "Delivered"
      ? stepsFromOrderStatus("Delivered").map((s) => ({
          ...s,
          status: "complete" as const,
        }))
      : stepsFromOrderStatus(order.status);

  return (
    <div className="mx-auto max-w-page px-4 sm:px-10 py-8">
      <AppBreadcrumbs
        items={[
          { label: "Orders", to: ROUTES.orders },
          { label: order.id },
        ]}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold leading-7 text-foreground">
          {order.id}
        </h1>
        <StatusBadge status={order.status} />
      </div>

      {/* Top: tracking + activity (2/3) | order details sidebar (1/3) */}
      <div className="mb-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-8">
          <OrderTrackingBanner
            orderId={order.id}
            estDelivery="Mon, April 23"
            carrier={shipment?.carrier ?? "UPS"}
            trackingNumber={
              shipment?.trackingNumber ?? "1Z999AA10123456784"
            }
            showPrice={false}
            steps={steps}
            className="w-full"
          />

          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Shipment Activity
            </h3>
            {events ? (
              <div className="relative">
                <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
                <div className="space-y-4">
                  {events.map((ev, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div
                        className={`z-10 mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 ${
                          ev.done
                            ? "border-tracking-complete bg-tracking-complete"
                            : "border-border-default bg-card"
                        }`}
                      >
                        {idx === 0 && ev.done ? (
                          <Check
                            size={8}
                            className="text-primary-foreground"
                            strokeWidth={3}
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-foreground">
                          {ev.description}
                        </div>
                        <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {ev.timestamp}
                          {ev.location && <> · {ev.location}</>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs italic text-muted-foreground">
                Tracking updates will appear once the shipment is picked up.
              </p>
            )}
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="overflow-hidden p-5">
            <h3 className="mb-5 text-sm font-semibold text-foreground">
              Order Details
            </h3>

            <div className="mb-5 flex gap-3">
              <Calendar size={16} className="mt-0.5 shrink-0 text-icon" />
              <div>
                <div className="text-2xs font-semibold uppercase text-label">
                  Order Date
                </div>
                <div className="text-sm font-medium text-foreground">
                  {order.date}
                </div>
              </div>
            </div>

            <div className="mb-5 flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-icon" />
              <div>
                <div className="text-2xs font-semibold uppercase text-label">
                  Ship To
                </div>
                <div className="text-sm font-medium text-foreground">
                  {order.shipTo}
                </div>
                <div className="text-sm text-muted-foreground">
                  1200 Distribution Dr
                </div>
                <div className="text-sm text-muted-foreground">
                  Reno, NV 89502
                </div>
              </div>
            </div>

            <div className="mb-5 flex gap-3">
              <Building2 size={16} className="mt-0.5 shrink-0 text-icon" />
              <div>
                <div className="text-2xs font-semibold uppercase text-label">
                  Bill To
                </div>
                <div className="text-sm font-medium text-foreground">
                  Reno Wholesale (HQ)
                </div>
                <div className="text-sm text-muted-foreground">PO Box 4410</div>
                <div className="text-sm text-muted-foreground">
                  Reno, NV 89505
                </div>
              </div>
            </div>

            <div className="space-y-1.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span className="font-mono">{fmt(tax)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-mono">{fmt(shipping)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold text-foreground">
                <span>Total</span>
                <span className="font-mono text-base">{fmt(total)}</span>
              </div>
            </div>

            {relatedInvoice ? (
              <button
                type="button"
                onClick={() => navigate(ROUTES.invoice(relatedInvoice.id))}
                className="mt-5 flex w-full items-center gap-3 rounded-lg bg-primary px-4 py-3 text-left text-primary-foreground transition-opacity hover:opacity-90"
              >
                <FileText size={18} className="shrink-0" />
                <span className="font-mono text-sm font-medium">
                  {relatedInvoice.invoiceNumber}
                </span>
                <span className="ml-auto flex items-center gap-1 text-xs font-medium">
                  View Invoice <ChevronRight size={14} />
                </span>
              </button>
            ) : null}
          </Card>
        </div>
      </div>

      {/* Full-width items table */}
      <Card className="overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["Item #", "Description", "Qty", "Unit Price", "Line Total"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-2xs font-semibold uppercase tracking-wider text-label"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={item.itemNum}
                  className={i % 2 === 1 ? "bg-muted/30" : "bg-card"}
                >
                  <td className="px-5 py-3.5 font-mono text-sm text-muted-foreground">
                    {item.itemNum}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">
                    {item.description}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-sm text-foreground">
                    {item.qty}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-sm text-foreground">
                    {fmt(item.unitPrice)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-sm font-medium text-foreground">
                    {fmt(item.qty * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
