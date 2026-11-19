import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Fragment } from "react";

export type BreadcrumbCrumb = {
  label: string;
  to?: string;
};

export function AppBreadcrumbs({ items }: { items: BreadcrumbCrumb[] }) {
  if (items.length === 0) return null;

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList className="gap-1 text-xs text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {i > 0 && (
                <BreadcrumbSeparator className="[&>svg]:size-3 text-icon">
                  <ChevronRight />
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem>
                {isLast || !item.to ? (
                  <BreadcrumbPage className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.to}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
