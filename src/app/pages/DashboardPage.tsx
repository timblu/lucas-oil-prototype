import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Download,
  Droplets,
  Package,
  Phone,
  Receipt,
  Search,
} from "lucide-react";
import searchDeco from "../../assets/figma/search-deco.svg";
import featuredGears from "../../assets/figma/featured-gears.png";
import featuredResources from "../../assets/figma/featured-resources.png";
import { Card } from "../components/shared/Card";
import { DashboardSummaryCard } from "../components/shared/DashboardSummaryCard";
import { PromoCard } from "../components/shared/PromoCard";
import {
  OrderTrackingBanner,
  stepsFromOrderStatus,
} from "../components/shared/OrderTrackingBanner";
import { StatusBadge } from "../components/shared/StatusBadge";
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
    <div className="pb-16">
      {/* Search — Figma 129:89; 80px top offset inside Main */}
      <section className="w-full px-4 sm:px-[120px] pt-20">
        <div className="relative mx-auto max-w-page overflow-hidden rounded-lg p-10">
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(-84deg, #0045bd 0%, #ad002e 100%)",
            }}
            aria-hidden
          />
          <img
            src={searchDeco}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-[3%] top-[17%] h-[96%] w-auto max-w-[22%] opacity-50"
          />

          <div className="relative z-10 flex flex-col gap-10">
            <h2 className="text-2xl font-semibold tracking-[-1px] text-white">
              Hello! What can I help you find?
            </h2>
            <form
              className="flex h-[50px] w-full items-center justify-between overflow-hidden rounded-lg border border-white pl-4 pr-1"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Search size={16} className="shrink-0 text-white" />
                <label className="sr-only" htmlFor="dashboard-search">
                  Search invoices, orders, products
                </label>
                <input
                  id="dashboard-search"
                  type="search"
                  placeholder="Search invoices, orders, products...."
                  className="w-full bg-transparent text-xs font-normal text-white placeholder:text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                aria-label="Submit search"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white text-primary"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-page space-y-20 px-4 sm:px-[120px] pt-20">
        {/* Account summary — Figma 432:9259 */}
        <section className="flex flex-col gap-6">
          <h2 className="text-[22px] font-semibold text-foreground">Account</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardSummaryCard
              label="Invoices"
              primary={
                invoiceSummary.amountDue === 0
                  ? "$0 Due"
                  : `${fmtShort(invoiceSummary.amountDue)} Due`
              }
              supporting={invoiceSupporting}
              footer="View Invoices"
              attention={invoiceSummary.hasPastDue}
              icon={<Receipt />}
              onClick={() => navigate(ROUTES.invoices)}
            />
            <DashboardSummaryCard
              label="Orders"
              primary={`${ordersSummary.activeCount} Active`}
              supporting={ordersSupporting}
              footer="View Orders"
              icon={<Package />}
              onClick={() => navigate(ROUTES.orders)}
            />
            <DashboardSummaryCard
              label="Your rep"
              primary={DISTRIBUTOR_ACCOUNT.repName}
              supporting={DISTRIBUTOR_ACCOUNT.repPhone}
              footer="Send Email"
              as="a"
              href={`mailto:${DISTRIBUTOR_ACCOUNT.repEmail}`}
              icon={<Phone />}
            />
          </div>
        </section>

        {/* Featured cards — Figma 296:4073 */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PromoCard
            title="Knowledge Hub"
            description="Product specs, training, and technical resources."
            cta="Open Hub"
            icon={<BookOpen />}
            image={featuredGears}
            onClick={() => navigate(ROUTES.knowledgeHub)}
          />
          <PromoCard
            title="Catalog"
            description="Browse our catalog and product information."
            cta="View Catalog"
            icon={<Droplets />}
            image={featuredGears}
            onClick={() => navigate(ROUTES.catalog)}
          />
          <PromoCard
            title="Resources"
            description="Download catalogs and marketing material."
            cta="View Downloads"
            icon={<Download />}
            image={featuredResources}
            onClick={() => navigate(ROUTES.marketingCollateral)}
          />
        </section>

        {/* Recent Orders & Invoices — Figma 432:9255 */}
        <section className="flex flex-col gap-6">
          <h2 className="text-[22px] font-semibold text-foreground">
            Recent Orders & Invoices
          </h2>

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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden border-border-default">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h3 className="text-sm font-semibold text-foreground">Orders</h3>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.orders)}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  View All <ChevronRight size={12} />
                </button>
              </div>
              <div className="divide-y divide-border">
                {recentOrders.map((o) => (
                  <button
                    key={o.id + o.status + o.total}
                    type="button"
                    onClick={() => navigate(ROUTES.order(o.id))}
                    className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-muted/40"
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
                    <span className="shrink-0 pl-3 font-mono text-sm font-semibold text-foreground">
                      {fmtShort(o.total)}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="overflow-hidden border-border-default">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Invoices
                </h3>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.invoices)}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  View All <ChevronRight size={12} />
                </button>
              </div>
              <div className="divide-y divide-border">
                {recentInvoices.map((inv) => (
                  <button
                    key={inv.id}
                    type="button"
                    onClick={() => navigate(ROUTES.invoice(inv.id))}
                    className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-muted/40"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-sm font-medium text-foreground">
                        {inv.invoiceNumber}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <StatusBadge status={inv.status} />
                        <span className="text-xs text-muted-foreground">
                          Due {inv.dueDate}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 pl-3 font-mono text-sm font-semibold text-foreground">
                      {fmtShort(inv.total)}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
