import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { CardContent } from "../ui/card";
import { cn } from "../ui/utils";

type DashboardSummaryCardProps = {
  label: string;
  primary: ReactNode;
  supporting: string;
  footer: string;
  icon: ReactNode;
  attention?: boolean;
  as?: "button" | "a";
  onClick?: () => void;
  href?: string;
  className?: string;
};

export function DashboardSummaryCard({
  label,
  primary,
  supporting,
  footer,
  icon,
  attention = false,
  as = "button",
  onClick,
  href,
  className,
}: DashboardSummaryCardProps) {
  const classes = cn(
    "group flex h-full w-full cursor-pointer flex-col rounded-xl border bg-card text-left text-card-foreground shadow-xs transition-all",
    "hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
    attention && "border-brand-coral/50",
    className,
  );

  const body = (
    <CardContent className="flex h-full flex-col gap-6 p-5">
      <div className="flex w-full items-start gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-2xs font-semibold uppercase tracking-wider text-label">
            {label}
          </p>
          <div
            className={cn(
              "truncate font-heading text-2xl font-semibold leading-tight",
              attention ? "text-brand-coral-strong" : "text-iris-purple-dark",
            )}
          >
            {primary}
          </div>
          <p className="text-sm leading-5 text-muted-foreground">{supporting}</p>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-iris-purple-50 text-iris-purple [&_svg]:size-5">
          {icon}
        </div>
      </div>
      <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary">
        {footer}
        <ChevronRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </div>
    </CardContent>
  );

  if (as === "a") {
    return (
      <a href={href} className={classes}>
        {body}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {body}
    </button>
  );
}
