export function InvBadge({ inv, count }: { inv: string; count?: number }) {
  if (inv === "in-stock")
    return (
      <span className="text-xs font-medium text-[#333]">
        In Stock {count ? `(${count})` : ""}
      </span>
    );
  if (inv === "low")
    return (
      <span className="text-xs font-medium text-[#555] italic">
        Low — {count} left
      </span>
    );
  return (
    <span className="text-xs font-medium text-[#777] line-through">
      Out of Stock
    </span>
  );
}
