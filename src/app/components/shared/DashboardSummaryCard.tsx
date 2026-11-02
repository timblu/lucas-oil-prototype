import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
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
  as = "button",
  onClick,
  href,
  className,
}: DashboardSummaryCardProps) {
  const classes = cn(
    "h-full w-full text-left bg-card border border-border-default rounded-lg p-4",
    "hover:border-border-strong/40 hover:shadow-sm transition-all group",
    "flex flex-col gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    className,
  );

  const body = (
    <>
      <div className="flex gap-4 items-start w-full">
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-medium uppercase leading-normal text-label">
              {label}
            </p>
            <div className="text-2xl font-bold leading-[30px] truncate text-foreground">
              {primary}
            </div>
          </div>
          <p className="text-base font-medium leading-[18px] text-muted-foreground">
            {supporting}
          </p>
        </div>
        <div className="size-6 shrink-0 text-icon [&_svg]:size-6">{icon}</div>
      </div>
      <div className="flex items-center gap-1 text-[13px] font-normal leading-normal text-primary group-hover:underline">
        {footer}
        <ChevronRight
          size={12}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </div>
    </>
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
