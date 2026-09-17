import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

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
}: DashboardSummaryCardProps) {
  const className =
    "h-full w-full text-left bg-card border border-border rounded-xl px-5 py-5 hover:shadow-md hover:border-[#999]/40 transition-all group flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2";

  const body = (
    <>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {label}
          </div>
          <div
            className={`text-2xl truncate ${
              attention
                ? "font-bold text-[#111]"
                : "font-semibold text-foreground"
            }`}
          >
            {primary}
          </div>
          <div className="text-sm text-muted-foreground mt-1 leading-snug">
            {supporting}
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-1 text-xs font-medium text-[#111] group-hover:underline">
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
      <a href={href} className={className}>
        {body}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {body}
    </button>
  );
}
