import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export function PageHeader({
  title,
  back,
  onBack,
  action,
}: {
  title: string;
  back?: string;
  onBack?: () => void;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {back && onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            {back}
          </button>
        )}
        {!back && (
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        )}
        {back && (
          <span className="text-muted-foreground/40 text-sm">·</span>
        )}
        {back && (
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        )}
      </div>
      {action}
    </div>
  );
}
