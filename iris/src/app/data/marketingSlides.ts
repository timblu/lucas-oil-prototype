export type MarketingSlideKind =
  | "new-product"
  | "promotion"
  | "training"
  | "catalog"
  | "orders"
  | "resources";

/** Portal views the carousel can deep-link into (no new pages). */
export type MarketingNavView =
  | "catalog"
  | "orders"
  | "invoices"
  | "knowledge-hub"
  | "product-videos"
  | "marketing-collateral"
  | "account";

export type MarketingSlideAction =
  | { type: "nav"; view: MarketingNavView }
  | { type: "product"; productId: string }
  | { type: "external"; url: string };

export type MarketingSlideIcon =
  | "network"
  | "orders"
  | "route"
  | "training"
  | "collateral"
  | "knowledge"
  | "assessment";

export type MarketingSlide = {
  id: string;
  kind: MarketingSlideKind;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  action: MarketingSlideAction;
  theme: "primary" | "dark" | "neutral";
  /** Decorative icon shown on the brand-gradient visual panel. */
  icon: MarketingSlideIcon;
};

export const MARKETING_SLIDES: MarketingSlide[] = [
  {
    id: "service-catalog",
    kind: "catalog",
    badge: "Resource Center",
    title: "IRIS service catalog — pricing & availability",
    description:
      "Look up item numbers, billing units, partner pricing, and availability across business internet, carrier Ethernet, dedicated internet access, transport, and DDoS protection.",
    ctaLabel: "Browse catalog",
    action: { type: "nav", view: "catalog" },
    theme: "primary",
    icon: "network",
  },
  {
    id: "order-tracking",
    kind: "orders",
    badge: "Order status",
    title: "Track open orders & deliveries",
    description:
      "View PO history, shipment progress, and carrier tracking for every order on your account. SO-10042 is out for delivery to Reno today.",
    ctaLabel: "View your orders",
    action: { type: "nav", view: "orders" },
    theme: "dark",
    icon: "orders",
  },
  {
    id: "nashville-atlanta-waves",
    kind: "new-product",
    badge: "New route",
    title: "Nashville to Atlanta waves now available",
    description:
      "10G and 100G circuits, with up to 400G possible, on the new IRIS route powered by the Ciena 6500 optical platform. A direct path to Atlanta data centers and cloud on-ramps. Circuits are limited, so check availability before you quote.",
    ctaLabel: "View service",
    action: { type: "product", productId: "10203" },
    theme: "dark",
    icon: "route",
  },
  {
    id: "partner-training",
    kind: "training",
    badge: "Partner training",
    title: "IRIS service training videos",
    description:
      "Short modules on dedicated internet, carrier Ethernet, wavelengths, dark fiber, and DDoS protection, so your team can position the right IRIS service for each customer.",
    ctaLabel: "Watch product videos",
    action: { type: "nav", view: "product-videos" },
    theme: "dark",
    icon: "training",
  },
  {
    id: "marketing-collateral",
    kind: "promotion",
    badge: "Marketing",
    title: "Service guides, capability statements & booth graphics",
    description:
      "Download the 2026 service catalog, network capability statement, brand standards, and trade-show artwork. Request printed copies shipped to your distributor account.",
    ctaLabel: "View marketing collateral",
    action: { type: "nav", view: "marketing-collateral" },
    theme: "primary",
    icon: "collateral",
  },
  {
    id: "knowledge-hub",
    kind: "resources",
    badge: "Technical resources",
    title: "Specs, bulletins & service briefs",
    description:
      "Route and capacity updates, service briefs, and network FAQs — everything your sales and support teams need to talk about the IRIS network in one place.",
    ctaLabel: "Open knowledge hub",
    action: { type: "nav", view: "knowledge-hub" },
    theme: "neutral",
    icon: "knowledge",
  },
  {
    id: "network-assessment",
    kind: "promotion",
    badge: "Partner program",
    title: "Network assessments for your customers",
    description:
      "IRIS designs custom solutions for enterprise, healthcare, education, government, and financial services accounts, starting with a network assessment. Questions? Contact your rep.",
    ctaLabel: "Contact your rep",
    action: { type: "nav", view: "account" },
    theme: "dark",
    icon: "assessment",
  },
];
