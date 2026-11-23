import { useState } from "react";
import { Link } from "react-router-dom";
import { Network, Search } from "lucide-react";
import { PageHeader } from "../../components/shared/PageHeader";
import { PRODUCTS } from "../../data/products";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";
import { cn } from "../../components/ui/utils";

export default function CatalogPage() {
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
    <div className="max-w-page mx-auto px-4 sm:px-10 py-8">
      <PageHeader title="Catalog" />

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-icon"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services…"
            className="w-full pl-9 pr-3 py-2 bg-card border border-border-default rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                catFilter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border-default text-muted-foreground hover:text-foreground hover:border-border-strong"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filtered.map((p) => (
          <Link
            key={p.id}
            to={ROUTES.product(p.id)}
            className={cn(
              "group block bg-card border border-border-default rounded-lg overflow-hidden",
              "hover:border-border-strong/50 hover:shadow-sm transition-all",
            )}
          >
            <div
              className={cn(
                "h-40 bg-gradient-to-br flex items-center justify-center",
                p.colorClass,
              )}
            >
              <Network size={40} className="text-white/50" />
            </div>
            <div className="p-3 space-y-1">
              <p className="font-mono text-2xs text-muted-foreground">
                #{p.id}
              </p>
              <h3 className="text-sm font-semibold text-foreground leading-5 line-clamp-2 group-hover:text-primary transition-colors">
                {p.name}
              </h3>
              <p className="text-sm font-medium text-foreground">
                <span className="font-mono">{fmt(p.price)}</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {" "}
                  / unit
                </span>
              </p>
            </div>
          </Link>
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
