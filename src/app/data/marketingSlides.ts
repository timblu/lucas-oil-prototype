import type { MarketingBannerImageKey } from "./marketingBannerImages";
import { DEFAULT_HERO_BACKGROUND_KEY } from "./marketingBannerImages";

export type MarketingSlideKind =
  | "new-product"
  | "promotion"
  | "training"
  | "catalog";

export type MarketingNavView = "catalog";

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
    badge: "Catalog",
    title: "2026 Full Product Catalog",
    description:
      "Complete distributor lineup — motor oils, gear lubes, additives, and specialty fluids. Item numbers, case quantities, and suggested retail pricing.",
    ctaLabel: "Browse catalog",
    action: { type: "nav", view: "catalog" },
    theme: "primary",
    imageLayout: "hero",
    backgroundKey: DEFAULT_HERO_BACKGROUND_KEY,
    productKey: "productCatalog",
    imageAlt: "Lucas Oil full line product catalog cover",
  },
  {
    id: "new-synthetic-5w30",
    kind: "new-product",
    badge: "New Product",
    title: "Synthetic 5W-30 Motor Oil",
    description:
      "Full synthetic formulation for modern engines. API SP / ILSAC GF-6A. Now available for March 2026 allocation — check inventory before you quote.",
    ctaLabel: "View product",
    action: { type: "product", productId: "10203" },
    theme: "dark",
    imageLayout: "hero",
    backgroundKey: DEFAULT_HERO_BACKGROUND_KEY,
    productKey: "productSynthetic5w30",
    imageAlt:
      "Lucas Oil synthetic API SP motor oil lineup from the 2026 catalog",
  },
  {
    id: "spring-counter-display",
    kind: "promotion",
    badge: "Promotion",
    title: "Spring Counter Display Program",
    description:
      "Order 4+ cases of Hi-Perf motor oil by April 15 and receive a free counter display kit. Limited to one kit per ship-to location.",
    ctaLabel: "Shop motor oil",
    action: { type: "nav", view: "catalog" },
    theme: "dark",
    imageLayout: "hero",
    backgroundKey: DEFAULT_HERO_BACKGROUND_KEY,
    productKey: "productOilStabilizer",
    imageAlt: "Lucas Oil Heavy Duty Oil Stabilizer product group",
  },
  {
    id: "additive-training",
    kind: "training",
    badge: "Product training",
    title: "Additive Counter Training — 15 min",
    description:
      "Quick module for counter staff: fuel treatments, oil supplements, and transmission conditioners. OEM callouts and typical use cases for retail accounts.",
    ctaLabel: "Explore additives",
    action: { type: "nav", view: "catalog" },
    theme: "dark",
    imageLayout: "hero",
    backgroundKey: DEFAULT_HERO_BACKGROUND_KEY,
    productKey: "productFuelTreatment",
    imageAlt: "Lucas Oil fuel treatment bottle",
  },
  {
    id: "hi-perf-line-sheet",
    kind: "catalog",
    badge: "Sell sheet",
    title: "Hi-Perf Motor Oil Line Sheet",
    description:
      "Two-page sell sheet for trade events and counter sales. Viscosity grades, API/ILSAC approvals, and key differentiators — also in Marketing Collateral below.",
    ctaLabel: "View on lucasoil.com",
    action: {
      type: "external",
      url: "https://www.lucasoil.com/catalogs/",
    },
    theme: "primary",
    imageLayout: "hero",
    backgroundKey: DEFAULT_HERO_BACKGROUND_KEY,
    productKey: "productHiPerf",
    imageAlt: "European synthetic motor oil spread from the Lucas Oil catalog",
  },
];
