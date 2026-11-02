import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";

type PromoCardProps = {
  title: string;
  description: string;
  cta: string;
  icon: ReactNode;
  image: string;
  onClick?: () => void;
  className?: string;
};

export function PromoCard({
  title,
  description,
  cta,
  icon,
  image,
  onClick,
  className,
}: PromoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex min-h-[240px] w-full flex-col items-start justify-between overflow-hidden rounded-lg p-6 text-left group",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
    >
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-t from-[rgba(0,46,138,0.6)] via-[rgba(2,15,59,0.25)] to-[rgba(2,15,59,0.25)]"
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col gap-6">
        <div className="flex size-8 items-center justify-center text-white [&_svg]:size-8">
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-[22px] font-bold leading-7 text-white">{title}</h3>
          <p className="text-sm font-medium leading-5 text-white">
            {description}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-auto flex items-center gap-2 text-base font-medium leading-6 text-white">
        {cta}
        <ArrowUpRight size={24} className="shrink-0" />
      </div>
    </button>
  );
}
