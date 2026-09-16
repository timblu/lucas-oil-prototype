import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Check,
  ChevronRight,
  CreditCard,
  Download,
  Package,
  Phone,
  Receipt,
  Truck,
} from "lucide-react";
import { Card } from "../components/shared/Card";
import { StatusBadge } from "../components/shared/StatusBadge";
import { MARKETING_BANNER_IMAGES } from "../data/marketingBannerImages";
import {
  ACCOUNT_SNAPSHOT,
  CREDIT_MEMOS,
  CUSTOMER_CONTACTS,
  DISTRIBUTOR_ACCOUNT,
} from "../data/account";
import { ORDERS } from "../data/orders";
import { INVOICES } from "../data/invoices";
import { fmtShort } from "../lib/format";
import { ROUTES } from "../routes";

function DashboardResourceCard({
  title,
  description,
  cta,
  icon,
  image,
  imagePosition = "center",
  onClick,
}: {
  title: string;
  description: string;
  cta: string;
  icon: ReactNode;
  image: string;
  imagePosition?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl text-left min-h-[240px] flex flex-col justify-end group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111]/30 focus-visible:ring-offset-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        style={{ objectPosition: imagePosition }}
      />
      <div
        className="absolute inset-0 bg-[#0a1628]/40 mix-blend-multiply"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/25"
        aria-hidden
      />
      <div
        className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden
      />

      <div className="absolute top-6 left-6 z-10 w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-white/25 group-hover:scale-105 transition-all duration-300">
        {icon}
      </div>

      <div className="relative z-10 p-6 flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-white/75 mt-1 leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        <span className="flex items-center gap-1.5 text-sm font-medium text-white mt-1 w-fit rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 group-hover:bg-white group-hover:text-[#111] transition-all duration-300">
          {cta}
          <ChevronRight
            size={16}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </span>
      </div>
    </button>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const recentOrders = ORDERS.slice(0, 3);
  const recentInvoices = INVOICES.slice(0, 3);

  const featuredOrder =
    ORDERS.find((o) => o.status === "Out for Delivery") ??
    ORDERS.find((o) => o.status === "Shipping") ??
    ORDERS.find((o) => o.status === "Picked") ??
    ORDERS.find((o) => o.status === "Received") ??
    ORDERS[0];

  const steps = [
    "Received",
    "Picked",
    "Shipping",
    "Out for Delivery",
    "Delivered",
  ] as const;
  const stepIdx = Math.max(
    0,
    steps.indexOf(featuredOrder.status as (typeof steps)[number]),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome,{" "}
          <span className="text-[#111]">{DISTRIBUTOR_ACCOUNT.shortName}</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Monday, March 25, 2026
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardResourceCard
          title="Knowledge Hub"
          description="Product specs, training, and technical resources"
          cta="Open hub"
          icon={<BookOpen size={22} />}
          image={MARKETING_BANNER_IMAGES.carouselBgGears}
          onClick={() => navigate(ROUTES.knowledgeHub)}
        />
        <DashboardResourceCard
          title="Resource Center"
          description="Browse the full lineup, pricing, and inventory levels"
          cta="Browse resources"
          icon={<Package size={22} />}
          image={MARKETING_BANNER_IMAGES.productCatalog}
          imagePosition="top center"
          onClick={() => navigate(ROUTES.catalog)}
        />
        <DashboardResourceCard
          title="Marketing Collateral"
          description="Catalogs, line sheets, brand assets, and booth graphics"
          cta="View downloads"
          icon={<Download size={22} />}
          image={MARKETING_BANNER_IMAGES.productHiPerf}
          onClick={() => navigate(ROUTES.marketingCollateral)}
        />
      </div>

      {/* Featured active order */}
      <button
        onClick={() => navigate(ROUTES.order(featuredOrder.id))}
        className="w-full text-left bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-[#999]/40 transition-all group"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Active Order
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="mono text-xl font-bold text-foreground">
                {featuredOrder.id}
              </span>
              <StatusBadge status={featuredOrder.status} />
            </div>
            <div className="mono text-sm text-muted-foreground mt-1">
              {featuredOrder.po} · {featuredOrder.shipTo} ·{" "}
              {featuredOrder.date}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="mono text-2xl font-bold text-foreground">
              {fmtShort(featuredOrder.total)}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 justify-end group-hover:text-foreground transition-colors">
              View detail <ChevronRight size={12} />
            </div>
          </div>
        </div>

        {/* Tracking step + info */}
        <div className="border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Step indicator */}
          <div className="relative flex-1">
            <div className="absolute top-4 left-0 right-0 h-px bg-muted mx-4" />
            <div
              className="absolute top-4 left-0 h-px bg-[#555] mx-4 transition-all"
              style={{
                right: `${((steps.length - 1 - stepIdx) / (steps.length - 1)) * 100}%`,
              }}
            />
            <div className="relative flex justify-between">
              {steps.map((s, i) => {
                const done = i < stepIdx;
                const active = i === stepIdx;
                return (
                  <div
                    key={s}
                    className="flex flex-col items-center gap-1.5 w-14"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors ${
                        done
                          ? "bg-[#111] border-[#111]"
                          : active
                            ? "bg-card border-[#555]"
                            : "bg-card border-muted"
                      }`}
                    >
                      {done ? (
                        <Check size={13} className="text-white" />
                      ) : active ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#555]" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-muted" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-medium text-center leading-tight ${active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/50"}`}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tracking details */}
          <div className="sm:pl-6 sm:border-l border-border flex items-center gap-4 text-sm shrink-0">
            <div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                Carrier
              </div>
              <div className="font-medium text-foreground">UPS</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                Tracking #
              </div>
              <div className="mono text-xs font-medium text-foreground">
                1Z999AA10123456784
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                Est. Delivery
              </div>
              <div className="mono text-sm font-semibold text-foreground">
                03/22/26
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Quick tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => navigate(ROUTES.orders)}
          className="bg-card border border-border rounded-xl px-5 py-4 text-left hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
            <Truck size={20} className="text-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              Recent Orders
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {ORDERS.length}
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate(ROUTES.account)}
          className="bg-card border border-border rounded-xl px-5 py-4 text-left hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
            <CreditCard size={20} className="text-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              Account Snapshot
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {fmtShort(ACCOUNT_SNAPSHOT.availableCredit)}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              available of {fmtShort(ACCOUNT_SNAPSHOT.totalCreditLine)} ·{" "}
              {CREDIT_MEMOS.length} memos · {CUSTOMER_CONTACTS.length} contacts
            </div>
          </div>
        </button>

        <a
          href={`tel:${DISTRIBUTOR_ACCOUNT.repPhone.replace(/\s/g, "")}`}
          className="bg-card border border-border rounded-xl px-5 py-4 text-left hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
            <Phone size={20} className="text-foreground" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              Your Rep
            </div>
            <div className="text-base font-semibold text-foreground truncate">
              {DISTRIBUTOR_ACCOUNT.repName}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {DISTRIBUTOR_ACCOUNT.repPhone}
            </div>
          </div>
        </a>
        <button
          onClick={() => navigate(ROUTES.invoices)}
          className="bg-primary text-primary-foreground rounded-xl px-5 py-4 text-left hover:bg-[var(--primary-dark)] transition-all group flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/25 transition-colors">
            <Receipt size={20} className="text-primary-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wider mb-0.5">
              Billing
            </div>
            <div className="text-base font-semibold text-primary-foreground">
              View Invoices
            </div>
          </div>
        </button>
      </div>

      {/* Recent Orders + Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-base">Recent Orders</h2>
            <button
              onClick={() => navigate(ROUTES.orders)}
              className="text-xs text-[#111] hover:underline font-medium flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => navigate(ROUTES.order(o.id))}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-muted/40 transition-colors text-left group"
              >
                <div>
                  <div className="mono text-sm font-medium text-foreground group-hover:text-[#111] transition-colors">
                    {o.id}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {o.po} · {o.shipTo}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={o.status} />
                  <span className="mono text-sm font-semibold text-foreground">
                    {fmtShort(o.total)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-base">Recent Invoices</h2>
            <button
              onClick={() => navigate(ROUTES.invoices)}
              className="text-xs text-[#111] hover:underline font-medium flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-border">
            {recentInvoices.map((inv) => (
              <button
                key={inv.id}
                onClick={() => navigate(ROUTES.invoice(inv.id))}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-muted/40 transition-colors text-left group"
              >
                <div>
                  <div className="mono text-sm font-medium text-foreground group-hover:text-[#111] transition-colors">
                    {inv.invoiceNumber}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {inv.orderId} · {inv.dueDate}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={inv.status} />
                  <span className="mono text-sm font-semibold text-foreground">
                    {fmtShort(inv.total)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
