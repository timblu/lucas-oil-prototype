import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";

type PromoCardProps = {
  title: string;
  description: string;
  cta: string;
  icon: ReactNode;
  image?: string;
  /** Solid brand fill instead of a photo overlay. */
  tone?: "photo" | "brand";
  onClick?: () => void;
  className?: string;
};

export function PromoCard({
  title,
  description,
  cta,
  icon,
  image,
  tone = "photo",
  onClick,
  className,
}: PromoCardProps) {
  const isBrand = tone === "brand" || !image;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex min-h-[240px] w-full flex-col items-start justify-between overflow-hidden rounded-xl p-6 text-left text-white shadow-xs",
        "transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isBrand ? "bg-iris-purple" : "bg-iris-purple-dark",
        className,
      )}
    >
      {!isBrand && image ? (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
      <div
        className={cn(
          "absolute inset-0",
          isBrand
            ? "bg-gradient-to-br from-iris-purple to-iris-magenta"
            : "bg-gradient-to-t from-iris-purple-dark via-iris-purple-dark/70 to-iris-purple-dark/20",
        )}
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
