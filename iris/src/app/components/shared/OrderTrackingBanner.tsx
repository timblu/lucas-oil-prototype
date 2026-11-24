import type { ReactNode } from "react";
import { Check, ChevronRight, CalendarFold, Truck, Route } from "lucide-react";
import { cn } from "../ui/utils";

export type TrackingStepStatus = "complete" | "in-progress" | "pending";

export type TrackingStep = {
  label: string;
  status: TrackingStepStatus;
};

export type OrderTrackingBannerProps = {
  orderId: string;
  estDelivery: string;
  carrier: string;
  trackingNumber: string;
  price?: string;
  showPrice?: boolean;
  onViewDetail?: () => void;
  steps: TrackingStep[];
  className?: string;
};

function StatusIndicator({ status }: { status: TrackingStepStatus }) {
  if (status === "complete") {
    return (
      <div className="size-8 rounded-full bg-tracking-complete flex items-center justify-center shrink-0">
        <Check size={12} className="text-primary-foreground" strokeWidth={3} />
      </div>
    );
  }
  if (status === "in-progress") {
    return (
      <div className="size-8 rounded-full border-2 border-tracking-progress flex items-center justify-center shrink-0">
        <div className="size-3 rounded-full bg-tracking-progress" />
      </div>
    );
  }
  return (
    <div className="size-8 rounded-full border-2 border-dashed border-tracking-pending shrink-0" />
  );
}

function MetaField({
  icon,
  label,
  value,
  mono,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex gap-3 items-center">
      <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-icon-strong">
        {icon}
      </div>
      <div className="flex flex-col h-8 justify-between">
        <span className="text-2xs font-semibold leading-4 text-label uppercase tracking-normal">
          {label}
        </span>
        <span
          className={cn(
            "text-xs font-medium leading-4 text-foreground",
            mono && "font-mono text-sm",
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export function OrderTrackingBanner({
  orderId,
  estDelivery,
  carrier,
  trackingNumber,
  price,
  showPrice = true,
  onViewDetail,
  steps,
  className,
}: OrderTrackingBannerProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border-default rounded-xl p-6 flex flex-col gap-10 overflow-hidden shadow-xs",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex flex-1 gap-6 items-start min-w-0 flex-wrap">
          <div className="flex flex-col shrink-0">
            <span className="text-2xs font-semibold leading-4 text-muted-foreground uppercase">
              Order #
            </span>
            <span className="font-mono text-2xl font-bold leading-7 text-foreground pt-1">
              {orderId}
            </span>
          </div>
          <div className="flex gap-10 items-center pl-6 border-l border-border flex-wrap self-stretch">
            <MetaField
              icon={<CalendarFold size={16} />}
              label="Est. Delivery"
              value={estDelivery}
            />
            <MetaField
              icon={<Truck size={16} />}
              label="Carrier"
              value={carrier}
            />
            <MetaField
              icon={<Route size={16} />}
              label="Tracking #"
              value={trackingNumber}
              mono
            />
          </div>
        </div>
        {showPrice && price != null && (
          <div className="flex flex-col gap-1 items-end shrink-0">
            <span className="font-mono text-2xl font-bold leading-7 text-foreground">
              {price}
            </span>
            {onViewDetail && (
              <button
                type="button"
                onClick={onViewDetail}
                className="flex items-center gap-1 text-xs font-medium leading-4 text-primary hover:underline transition-colors"
              >
                View detail
                <ChevronRight size={12} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex items-start justify-between w-full">
          {steps.map((step, i) => (
            <div key={step.label} className="contents">
              <div className="flex flex-col gap-2 items-center w-20 shrink-0">
                <StatusIndicator status={step.status} />
                <span className="text-2xs font-medium leading-4 text-label text-center whitespace-nowrap">
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 self-start pt-4 min-w-2">
                  <div
                    className={cn(
                      "h-0.5 w-full",
                      step.status === "complete"
                        ? "bg-border-strong"
                        : "border-t-2 border-dashed border-tracking-pending bg-transparent h-0",
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Build 4-step tracking statuses from an order status string. */
export function stepsFromOrderStatus(status: string): TrackingStep[] {
  const labels = ["Received", "In Transit", "Out for Delivery", "Delivered"];
  const normalized = status.toLowerCase();
  let active = 0;
  if (normalized.includes("deliver")) active = 3;
  else if (normalized.includes("out")) active = 2;
  else if (
    normalized.includes("ship") ||
    normalized.includes("transit") ||
    normalized.includes("picked")
  )
    active = 1;
  else if (normalized.includes("receiv") || normalized.includes("process"))
    active = 0;
  else active = 1;

  return labels.map((label, i) => ({
    label,
    status:
      i < active ? "complete" : i === active ? "in-progress" : "pending",
  }));
}
