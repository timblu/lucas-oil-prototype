import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";

type PromoCardProps = {
  title: string;
  description: string;
  cta: string;
  icon: ReactNode;
  /** Brand gradient fill: deep purple to cyan, or purple to magenta. */
  tone?: "dark" | "brand";
  onClick?: () => void;
  className?: string;
};

export function PromoCard({
  title,
  description,
  cta,
  icon,
  tone = "dark",
  onClick,
  className,
}: PromoCardProps) {
  const isBrand = tone === "brand";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex min-h-[240px] w-full flex-col items-start justify-between overflow-hidden rounded-xl p-6 text-left text-white shadow-xs",
        "transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isBrand ? "bg-primary" : "bg-brand-dark",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500 group-hover:scale-105",
          isBrand
            ? "bg-gradient-to-br from-primary to-brand-accent"
            : "bg-gradient-to-br from-brand-dark via-primary to-blue",
        )}
        aria-hidden
      />
      <div
        className="absolute -right-10 -top-10 size-40 rounded-full bg-brand-coral/40 blur-2xl"
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col gap-5">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/15 text-white [&_svg]:size-5">
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-xl font-semibold leading-tight text-white">
            {title}
          </h3>
          <p className="text-sm leading-5 text-white/85">{description}</p>
        </div>
      </div>

      <div className="relative z-10 mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-white">
        {cta}
        <ArrowUpRight
          size={18}
          className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </button>
  );
}
