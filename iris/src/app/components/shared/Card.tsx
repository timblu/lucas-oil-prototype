import type { ReactNode } from "react";
import { Card as UiCard } from "../ui/card";
import { cn } from "../ui/utils";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <UiCard className={cn("gap-0 py-0 shadow-xs", className)}>{children}</UiCard>
  );
}
