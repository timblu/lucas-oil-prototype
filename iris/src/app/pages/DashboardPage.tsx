import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarFold,
  ChevronRight,
  Download,
  Network,
  Package,
  Phone,
  Receipt,
} from "lucide-react";
import { brand } from "../brand/brand";
import { Card } from "../components/shared/Card";
import { DashboardSummaryCard } from "../components/shared/DashboardSummaryCard";
import { PromoCard } from "../components/shared/PromoCard";
import {
  OrderTrackingBanner,
  stepsFromOrderStatus,
} from "../components/shared/OrderTrackingBanner";
import { StatusBadge } from "../components/shared/StatusBadge";
import { Button } from "../components/ui/button";
import { DISTRIBUTOR_ACCOUNT } from "../data/account";
import { ORDERS } from "../data/orders";
import { INVOICES } from "../data/invoices";
import {
  getActiveOrdersSummary,
  getInvoiceSummary,
} from "../lib/dashboardSummary";
import { fmtShort } from "../lib/format";
import { ROUTES } from "../routes";

function mapOrderStatusLabel(status: string) {
  if (status === "Shipping") return "In-Transit";
  return status;
}

function SectionHeading({
  id,
  title,
  action,
}: {
  id: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 id={id} className="text-xl font-semibold">
        {title}
      </h2>
      {action}
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const recentOrders = ORDERS.slice(0, 4);
  const recentInvoices = INVOICES.slice(0, 4);

  const invoiceSummary = getInvoiceSummary(INVOICES);
  const ordersSummary = getActiveOrdersSummary(ORDERS);

  const invoiceSupporting = invoiceSummary.hasPastDue
    ? `${invoiceSummary.pastDueCount} Past Due · ${invoiceSummary.openCount} Open`
    : invoiceSummary.openCount > 0
      ? `${invoiceSummary.openCount} Open`
      : "No open invoices";

  const ordersSupporting = ordersSummary.urgent
    ? `${ordersSummary.urgent.id} · ${ordersSummary.urgent.status}`
    : "No orders in progress";

  const featuredOrder =
    ORDERS.find((o) => o.status === "Out for Delivery") ??
    ORDERS.find((o) => o.status === "Shipping") ??
    ORDERS.find((o) => o.status === "Picked") ??
    ORDERS.find((o) => o.status === "Received") ??
    ORDERS[0];

  return (
    <div className="mx-auto max-w-page space-y-10 px-4 pb-16 pt-8 sm:px-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">
          {DISTRIBUTOR_ACCOUNT.legalName} · Account {DISTRIBUTOR_ACCOUNT.accountNumber}
        </p>
        <h1>Welcome back, {DISTRIBUTOR_ACCOUNT.primaryContact}</h1>
      </header>

      <section aria-labelledby="summary-heading" className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <h2 id="summary-heading" className="sr-only">
          Account summary
        </h2>
        <DashboardSummaryCard
          label="Invoices"
          primary={
            invoiceSummary.amountDue === 0
              ? "$0 Due"
              : `${fmtShort(invoiceSummary.amountDue)} Due`
          }
          supporting={invoiceSupporting}
          footer="View invoices"
          attention={invoiceSummary.hasPastDue}
          icon={<Receipt />}
          onClick={() => navigate(ROUTES.invoices)}
        />
        <DashboardSummaryCard
          label="Orders"
          primary={`${ordersSummary.activeCount} Active`}
          supporting={ordersSupporting}
          footer="View orders"
          icon={<Package />}
          onClick={() => navigate(ROUTES.orders)}
        />
        <DashboardSummaryCard
          label="Your rep"
          primary={DISTRIBUTOR_ACCOUNT.repName}
          supporting={DISTRIBUTOR_ACCOUNT.repPhone}
          footer="Send email"
          as="a"
          href={`mailto:${brand.repEmail}`}
          icon={<Phone />}
        />
      </section>

      <section aria-labelledby="tracking-heading" className="flex flex-col gap-4">
        <SectionHeading id="tracking-heading" title="Track your order" />
        <OrderTrackingBanner
          orderId={featuredOrder.id}
          estDelivery="Mon, April 23"
          carrier="UPS"
          trackingNumber="1Z999AA10123456784"
          price={fmtShort(featuredOrder.total)}
          showPrice
          onViewDetail={() => navigate(ROUTES.order(featuredOrder.id))}
          steps={stepsFromOrderStatus(featuredOrder.status)}
        />
      </section>

      <section aria-labelledby="activity-heading" className="flex flex-col gap-4">
        <SectionHeading id="activity-heading" title="Recent orders & invoices" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-base font-semibold">Orders</h3>
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => navigate(ROUTES.orders)}
              >
                View all <ChevronRight />
              </Button>
            </div>
            <ul className="divide-y">
              {recentOrders.map((o) => (
                <li key={o.id + o.status + o.total}>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.order(o.id))}
                    className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-sm font-medium text-foreground">
                        {o.id}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <StatusBadge status={mapOrderStatusLabel(o.status)} />
                        <span className="text-xs text-muted-foreground">
                          Est. Mon, April 23 · {o.shipTo}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-sm font-semibold text-foreground">
                      {fmtShort(o.total)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-base font-semibold">Invoices</h3>
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => navigate(ROUTES.invoices)}
              >
                View all <ChevronRight />
              </Button>
            </div>
            <ul className="divide-y">
              {recentInvoices.map((inv) => (
                <li key={inv.id}>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.invoice(inv.id))}
                    className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-sm font-medium text-foreground">
                        {inv.invoiceNumber}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <StatusBadge status={inv.status} />
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CalendarFold size={12} />
                          Due {inv.dueDate}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-sm font-semibold text-foreground">
                      {fmtShort(inv.total)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section aria-labelledby="resources-heading" className="flex flex-col gap-4">
        <h2 id="resources-heading" className="sr-only">
          Resources
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PromoCard
            title="Knowledge Hub"
            description="Service specs, partner training, and network resources."
            cta="Open hub"
            icon={<BookOpen />}
            onClick={() => navigate(ROUTES.knowledgeHub)}
          />
          <PromoCard
            title="Catalog"
            description="Browse IRIS internet, Ethernet, transport, and security services."
            cta="View catalog"
            icon={<Network />}
            tone="brand"
            onClick={() => navigate(ROUTES.catalog)}
          />
          <PromoCard
            title="Resources"
            description="Download service guides and marketing material."
            cta="View downloads"
            icon={<Download />}
            onClick={() => navigate(ROUTES.marketingCollateral)}
          />
        </div>
      </section>
    </div>
  );
}
