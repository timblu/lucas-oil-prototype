import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

type Tone = "success" | "active" | "warning" | "neutral";

const TONE_CLASSES: Record<Tone, string> = {
  success: "border-tracking-complete/30 bg-tracking-complete-bg/60 text-tracking-complete",
  active: "border-primary/25 bg-primary/10 text-primary",
  warning: "border-brand-coral/40 bg-brand-coral/10 text-brand-coral-strong",
  neutral: "border-border-default bg-transparent text-muted-foreground",
};

function toneFor(status: string): Tone {
  const normalized = status.toLowerCase();
  if (["delivered", "paid", "resolved"].includes(normalized)) return "success";
  if (["out for delivery", "open", "in progress"].includes(normalized)) return "active";
  if (normalized === "past due") return "warning";
  return "neutral";
}

/** Status chips aligned to Home Figma (Delivered, Past Due, In Transit). */
export function StatusBadge({ status }: { status: string }) {
  const tone = toneFor(status);

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 rounded-full px-2 py-0.5 text-2xs font-semibold tracking-wide",
        TONE_CLASSES[tone],
      )}
    >
      {tone === "success" ? <Check size={10} strokeWidth={3} /> : null}
      {status}
    </Badge>
  );
}
