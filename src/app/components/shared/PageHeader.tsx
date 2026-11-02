import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import {
  AppBreadcrumbs,
  type BreadcrumbCrumb,
} from "./AppBreadcrumbs";

export function PageHeader({
  title,
  breadcrumbs,
  back,
  onBack,
  action,
  description,
}: {
  title: string;
  breadcrumbs?: BreadcrumbCrumb[];
  back?: string;
  onBack?: () => void;
  action?: ReactNode;
  description?: string;
}) {
  const crumbs: BreadcrumbCrumb[] | undefined =
    breadcrumbs ??
    (back && onBack
      ? [
          { label: back, to: undefined },
          { label: title },
        ]
      : undefined);

  return (
    <div className="mb-6">
      {crumbs && crumbs.length > 0 && !back ? (
        <AppBreadcrumbs items={crumbs} />
      ) : null}
      {back && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-3 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          {back}
        </button>
      ) : null}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-foreground">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action ? (
          <div className="flex items-center gap-2 shrink-0">{action}</div>
        ) : null}
      </div>
    </div>
  );
}
