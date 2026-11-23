import { Check } from "lucide-react";
import { cn } from "../ui/utils";

/** Status chips aligned to Home Figma (Delivered green, Past Due orange, etc.). */
export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  let styles =
    "bg-transparent text-muted-foreground ring-1 ring-border-default";
  let showCheck = false;

  if (normalized === "delivered" || normalized === "paid" || normalized === "resolved") {
    styles = "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200";
    showCheck = true;
  } else if (
    normalized === "out for delivery" ||
    normalized === "open" ||
    normalized === "in progress"
  ) {
    styles = "bg-primary/10 text-primary ring-1 ring-primary/30";
  } else if (normalized === "past due") {
    styles = "bg-orange-50 text-orange-800 ring-1 ring-orange-200";
  } else if (
    normalized.includes("transit") ||
    normalized === "shipping" ||
    normalized === "received" ||
    normalized === "picked"
  ) {
    styles = "bg-transparent text-muted-foreground ring-1 ring-border-default";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-2xs font-semibold tracking-wide",
        styles,
      )}
    >
      {showCheck ? <Check size={10} strokeWidth={3} /> : null}
      {status}
    </span>
  );
}
