import { Link } from "react-router-dom";
import { Network } from "lucide-react";
import { cn } from "../ui/utils";
import { fmt } from "../../lib/format";
import { ROUTES } from "../../routes";
import type { Product } from "../../types";

type CatalogProductCardProps = {
  product: Product;
  className?: string;
};

export function CatalogProductCard({
  product,
  className,
}: CatalogProductCardProps) {
  return (
    <Link
      to={ROUTES.product(product.id)}
      className={cn(
        "group block bg-card border border-border-default rounded-lg overflow-hidden",
        "hover:border-border-strong/50 hover:shadow-sm transition-all",
        className,
      )}
    >
      <div
        className={cn(
          "h-40 bg-gradient-to-br flex items-center justify-center",
          product.colorClass,
        )}
      >
        <Network size={40} className="text-white/50" />
      </div>
      <div className="p-3 space-y-1">
        <p className="font-mono text-2xs text-muted-foreground">#{product.id}</p>
        <h3 className="text-sm font-semibold text-foreground leading-5 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-foreground">
          <span className="font-mono">{fmt(product.price)}</span>
          <span className="text-xs text-muted-foreground font-normal">
            {" "}
            / unit
          </span>
        </p>
      </div>
    </Link>
  );
}
