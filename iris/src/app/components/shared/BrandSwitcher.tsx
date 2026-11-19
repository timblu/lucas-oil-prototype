import { BRAND_IDS } from "../../brand/brands";
import { useBrand } from "../../brand/BrandContext";
import { cn } from "../ui/utils";

/** Switches the active brand. Colors, type, logo, and copy follow. */
export function BrandSwitcher({ className }: { className?: string }) {
  const { brand, setBrandId } = useBrand();

  return (
    <div
      role="group"
      aria-label="Brand"
      className={cn(
        "inline-flex items-center rounded-lg border bg-muted p-0.5",
        className,
      )}
    >
      {BRAND_IDS.map((id) => {
        const selected = brand.id === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={selected}
            onClick={() => setBrandId(id)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
              selected
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {id === "iris" ? "IRIS" : "Lucas"}
          </button>
        );
      })}
    </div>
  );
}
