import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Search } from "lucide-react";
import { PageHeader } from "../../components/shared/PageHeader";
import { InvBadge } from "../../components/shared/InvBadge";
import { PRODUCTS } from "../../data/products";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";

export default function CatalogPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
  ];
  const filtered = PRODUCTS.filter((p) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.includes(q) ||
      p.category.toLowerCase().includes(q);
    const matchC = catFilter === "All" || p.category === catFilter;
    return matchQ && matchC;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Route stays /catalog internally; content model remains product-grid-only
          this pass (Phase 1 minimum viable) pending confirmation of SDS sheets/
          videos/docs content types — see PRD Section 6. */}
      <PageHeader title="Resource Center" />

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources…"
            className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                catFilter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(ROUTES.product(p.id))}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-[#555]/25 transition-all text-left group"
          >
            <div
              className={`h-28 bg-gradient-to-br ${p.colorClass} flex items-center justify-center relative`}
            >
              <Package size={32} className="text-white/70" />
              {p.inventory === "out" && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-xs font-bold bg-black/50 px-2 py-0.5 rounded">
                    OUT
                  </span>
                </div>
              )}
              {p.inventory === "low" && (
                <div className="absolute top-1.5 right-1.5">
                  <span className="text-[#333] text-xs font-bold bg-white/80 px-1.5 py-0.5 rounded">
                    LOW
                  </span>
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="mono text-xs text-muted-foreground mb-0.5">
                #{p.id}
              </div>
              <div className="text-xs font-semibold text-foreground leading-tight group-hover:text-[#111] transition-colors line-clamp-2">
                {p.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                case: {p.caseQty.replace(" / case", "")}
              </div>
              <div className="mono text-sm font-bold text-foreground mt-1.5">
                {fmt(p.price)}
              </div>
              <div className="mt-1.5">
                <InvBadge inv={p.inventory} count={p.inventoryCount} />
              </div>
            </div>
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No products match your search.
        </div>
      )}
    </div>
  );
}
