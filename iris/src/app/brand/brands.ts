export const BRAND_IDS = ["iris", "lucas"] as const;

export type BrandId = (typeof BRAND_IDS)[number];

export type Brand = {
  id: BrandId;
  /** Full company name used in copy. */
  name: string;
  /** Short label for the theme switcher. */
  switchLabel: string;
  portalLabel: string;
  supportTitle: string;
  supportAgent: string;
  repTitle: string;
  marketingEmail: string;
  repEmail: string;
  demoEmail: string;
  demoPassword: string;
};

export const BRANDS: Record<BrandId, Brand> = {
  iris: {
    id: "iris",
    name: "IRIS Networks",
    switchLabel: "IRIS",
    portalLabel: "Distributor Portal",
    supportTitle: "IRIS Networks Support",
    supportAgent: "IRIS Support",
    repTitle: "IRIS Networks Rep",
    marketingEmail: "marketing@irisnetworksusa.com",
    repEmail: "m.chen@irisnetworksusa.com",
    demoEmail: "demo@irisnetworksusa.com",
    demoPassword: "iris2026",
  },
  lucas: {
    id: "lucas",
    name: "Lucas Oil",
    switchLabel: "Lucas",
    portalLabel: "Distributor Portal",
    supportTitle: "Lucas Oil Support",
    supportAgent: "Lucas Support",
    repTitle: "Lucas Oil Rep",
    marketingEmail: "marketing@lucasoil.com",
    repEmail: "m.chen@lucasoil.com",
    demoEmail: "demo@lucasoil.com",
    demoPassword: "lucas2026",
  },
};

export const BRAND_STORAGE_KEY = "portal-brand";

export function isBrandId(value: string | null): value is BrandId {
  return value === "iris" || value === "lucas";
}
