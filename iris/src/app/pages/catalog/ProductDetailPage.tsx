import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Network, Plus } from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { InvBadge } from "../../components/shared/InvBadge";
import { Button } from "../../components/ui/button";
import { PRODUCTS } from "../../data/products";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";
import { cn } from "../../components/ui/utils";

const TABS = ["Description", "Specs", "Service Brief"] as const;

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const p = PRODUCTS.find((x) => x.id === productId);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  const [qty, setQty] = useState(1);

  if (!p) return <Navigate to={ROUTES.catalog} replace />;

  return (
    <div className="max-w-page mx-auto px-4 sm:px-10 py-8">
      <PageHeader
        title={p.name}
        breadcrumbs={[
          { label: "Catalog", to: ROUTES.catalog },
          { label: p.name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-10">
        <div
          className={cn(
            "rounded-lg h-72 md:h-[420px] bg-gradient-to-br flex items-center justify-center",
            p.colorClass,
          )}
        >
          <Network size={96} className="text-white/60" />
        </div>

        <div className="flex flex-col">
          <div className="text-2xs font-semibold uppercase tracking-wider text-label mb-1">
            {p.category}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">{p.name}</h1>
          <p className="font-mono text-sm text-muted-foreground mb-6">
            Item #{p.id}
          </p>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono text-3xl font-bold text-foreground">
              {fmt(p.price)}
            </span>
            <span className="text-sm text-muted-foreground">/ unit</span>
          </div>
          <div className="mb-6">
            <InvBadge inv={p.inventory} count={p.inventoryCount} />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-muted/50 rounded-lg px-4 py-3">
              <div className="text-2xs font-semibold uppercase text-label mb-1">
                Billing unit
              </div>
              <div className="text-sm font-semibold text-foreground">
                {p.billingUnit}
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg px-4 py-3">
              <div className="text-2xs font-semibold uppercase text-label mb-1">
                Category
              </div>
              <div className="text-sm font-semibold text-foreground">
                {p.category}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-auto">
            <label className="sr-only" htmlFor="product-qty">
              Quantity
            </label>
            <input
              id="product-qty"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="w-20 h-10 rounded-lg border border-border-default bg-card px-3 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            <Button
              className="flex-1"
              onClick={() => navigate(ROUTES.orders)}
            >
              <Plus size={16} />
              Add to Order
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-border mb-6">
        <nav className="flex gap-6" aria-label="Product details">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      <Card className="p-6">
        {tab === "Description" && (
          <p className="text-sm text-foreground leading-relaxed max-w-3xl">
            {p.description}
          </p>
        )}
        {tab === "Specs" && (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm max-w-2xl">
            <div>
              <dt className="text-2xs font-semibold uppercase text-label mb-1">
                Item #
              </dt>
              <dd className="font-mono font-medium">{p.id}</dd>
            </div>
            <div>
              <dt className="text-2xs font-semibold uppercase text-label mb-1">
                Billing unit
              </dt>
              <dd className="font-medium">{p.billingUnit}</dd>
            </div>
            <div>
              <dt className="text-2xs font-semibold uppercase text-label mb-1">
                Category
              </dt>
              <dd className="font-medium">{p.category}</dd>
            </div>
            <div>
              <dt className="text-2xs font-semibold uppercase text-label mb-1">
                Unit price
              </dt>
              <dd className="font-mono font-medium">{fmt(p.price)}</dd>
            </div>
          </dl>
        )}
        {tab === "Service Brief" && (
          <div className="text-sm text-muted-foreground">
            <p className="mb-3">
              Service brief available for Item #{p.id}.
            </p>
            <Button variant="outline" size="sm" disabled>
              Download service brief (PDF)
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
