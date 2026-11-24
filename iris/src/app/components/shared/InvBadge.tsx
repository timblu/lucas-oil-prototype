export function InvBadge({ inv, count }: { inv: string; count?: number }) {
  if (inv === "in-stock")
    return (
      <span className="text-xs font-medium text-tracking-complete">
        Available
      </span>
    );
  if (inv === "low")
    return (
      <span className="text-xs font-medium text-brand-coral-strong">
        Limited availability{count ? ` — ${count} circuits left` : ""}
      </span>
    );
  return (
    <span className="text-xs font-medium text-muted-foreground line-through">
      Unavailable
    </span>
  );
}
