import type { MarketingBannerImageKey } from "./marketingBannerImages";

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

export type MarketingSlideImageLayout = "hero" | "background";

export type MarketingSlide = {
  id: string;
  kind: MarketingSlideKind;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  action: MarketingSlideAction;
  theme: "primary" | "dark" | "neutral";
  imageLayout?: MarketingSlideImageLayout;
  backgroundKey?: MarketingBannerImageKey;
  productKey?: MarketingBannerImageKey;
  /** Alt text for the product layer (hero layout). */
  imageAlt?: string;
  backgroundPosition?: string;
};

export const MARKETING_SLIDES: MarketingSlide[] = [
  {
    id: "catalog-2026",
    kind: "catalog",
    badge: "Resource Center",
    title: "2026 Full Line — pricing & inventory",
    description:
      "Look up item numbers, case quantities, distributor pricing, and real-time stock levels across motor oils, gear lubes, additives, and specialty fluids.",
    ctaLabel: "Browse resources",
    action: { type: "nav", view: "catalog" },
    theme: "primary",
    imageLayout: "hero",
    backgroundKey: "carouselBgGears",
    productKey: "productCatalog",
    imageAlt: "Lucas Oil full line product catalog cover",
  },
  {
    id: "shipment-tracking",
    kind: "orders",
    badge: "Order status",
    title: "Track open orders & deliveries",
    description:
      "View PO history, shipment progress, and carrier tracking for every order on your account. SO-10042 is out for delivery to Reno today.",
    ctaLabel: "View your orders",
    action: { type: "nav", view: "orders" },
    theme: "dark",
    imageLayout: "hero",
    backgroundKey: "carouselBgMachinery",
    productKey: "productOilStabilizer",
    imageAlt: "Lucas Oil Heavy Duty Oil Stabilizer product group",
  },
  {
    id: "new-synthetic-5w30",
    kind: "new-product",
    badge: "New product",
    title: "Synthetic 5W-30 now in stock",
    description:
      "API SP / ILSAC GF-6A full synthetic for modern passenger-car and light-truck applications. Check case pricing and availability before you quote your accounts.",
    ctaLabel: "View product details",
    action: { type: "product", productId: "10203" },
    theme: "dark",
    imageLayout: "hero",
    backgroundKey: "carouselBgOilPour",
    productKey: "productSynthetic5w30",
    imageAlt:
      "Lucas Oil synthetic API SP motor oil lineup from the 2026 catalog",
  },
  {
    id: "additive-training",
    kind: "training",
    badge: "Product training",
    title: "Counter staff training videos",
    description:
      "15-minute modules on fuel treatments, oil supplements, and transmission conditioners — OEM callouts and typical retail use cases your team can share at the counter.",
    ctaLabel: "Watch product videos",
    action: { type: "nav", view: "product-videos" },
    theme: "dark",
    imageLayout: "hero",
    backgroundKey: "carouselBgFuelPump",
    productKey: "productFuelTreatment",
    imageAlt: "Lucas Oil fuel treatment bottle",
  },
  {
    id: "marketing-collateral",
    kind: "promotion",
    badge: "Marketing",
    title: "Sell sheets, catalogs & booth graphics",
    description:
      "Download the 2026 catalog PDF, Hi-Perf line sheet, brand standards, and trade-show artwork. Request printed copies shipped to your distributor account.",
    ctaLabel: "View marketing collateral",
    action: { type: "nav", view: "marketing-collateral" },
    theme: "primary",
    imageLayout: "hero",
    backgroundKey: "carouselBgOilPour",
    productKey: "productHiPerf",
    imageAlt: "European synthetic motor oil spread from the Lucas Oil catalog",
  },
  {
    id: "knowledge-hub",
    kind: "resources",
    badge: "Technical resources",
    title: "Specs, bulletins & SDS lookup",
    description:
      "Application notes, OEM approvals, formulation updates, and safety data sheets — everything your inside sales and warehouse teams need in one place.",
    ctaLabel: "Open knowledge hub",
    action: { type: "nav", view: "knowledge-hub" },
    theme: "neutral",
    imageLayout: "hero",
    backgroundKey: "carouselBgGears",
    productKey: "productOilStabilizer",
    imageAlt: "Lucas Oil Heavy Duty Oil Stabilizer product group",
  },
  {
    id: "spring-counter-display",
    kind: "promotion",
    badge: "Spring program",
    title: "Free counter display — order by April 15",
    description:
      "Order 4+ cases of Hi-Perf motor oil and receive a counter display kit at no charge. One kit per ship-to. Questions? Contact your Lucas Oil rep.",
    ctaLabel: "Contact your rep",
    action: { type: "nav", view: "account" },
    theme: "dark",
    imageLayout: "hero",
    backgroundKey: "carouselBgMachinery",
    productKey: "productOilStabilizer",
    imageAlt: "Lucas Oil Hi-Perf motor oil counter display",
  },
];
