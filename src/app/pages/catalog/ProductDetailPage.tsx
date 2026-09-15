import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ChevronRight, Package } from "lucide-react";
import { Card } from "../../components/shared/Card";
import { InvBadge } from "../../components/shared/InvBadge";
import { PRODUCTS } from "../../data/products";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const p = PRODUCTS.find((x) => x.id === productId);

  if (!p) return <Navigate to={ROUTES.catalog} replace />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button
          onClick={() => navigate(ROUTES.catalog)}
          className="hover:text-foreground transition-colors"
        >
          Resource Center
        </button>
        <ChevronRight size={13} />
        <span className="text-foreground font-medium">Item #{p.id}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`rounded-xl h-64 bg-gradient-to-br ${p.colorClass} flex items-center justify-center`}
        >
          <Package size={72} className="text-white/60" />
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {p.category}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {p.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: "Item #", value: p.id, mono: true },
              { label: "Case Qty", value: p.caseQty },
              {
                label: "Price",
                value: fmt(p.price),
                mono: true,
                highlight: true,
              },
              {
                label: "Inventory",
                value: (
                  <InvBadge inv={p.inventory} count={p.inventoryCount} />
                ),
              },
            ].map((field) => (
              <div
                key={field.label}
                className="bg-muted/40 rounded-lg px-4 py-3"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {field.label}
                </div>
                {typeof field.value === "string" ? (
                  <div
                    className={`text-sm font-semibold ${field.mono ? "mono" : ""} ${field.highlight ? "text-[#111] text-lg" : "text-foreground"}`}
                  >
                    {field.value}
                  </div>
                ) : (
                  field.value
                )}
              </div>
            ))}
          </div>

          <Card className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Description
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {p.description}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
