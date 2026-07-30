/**
 * Banner art for hero carousel (background + product layers).
 *
 * Replace files under src/assets/marketing-banners/ and update imports here.
 * See src/assets/marketing-banners/README.md for dimensions and naming.
 */
import catalogCover from "../../assets/marketing-banners/catalog-cover.jpg";
import carouselBgFuelPump from "../../assets/marketing-banners/carousel-bg-fuel-pump.jpg";
import carouselBgGears from "../../assets/marketing-banners/carousel-bg-gears.jpg";
import carouselBgMachinery from "../../assets/marketing-banners/carousel-bg-machinery.jpg";
import carouselBgOilPour from "../../assets/marketing-banners/carousel-bg-oil-pour.jpg";
import fuelTreatmentHero from "../../assets/marketing-banners/fuel-treatment-hero.png";
import oilStabilizerHero from "../../assets/marketing-banners/oil-stabilizer-hero.png";
import syntheticMotorOilSpread from "../../assets/marketing-banners/pdf-page-22.jpg";
import hiPerfSpread from "../../assets/marketing-banners/pdf-page-23.jpg";

export const MARKETING_BANNER_IMAGES = {
  carouselBgGears,
  carouselBgMachinery,
  carouselBgOilPour,
  carouselBgFuelPump,
  productCatalog: catalogCover,
  productSynthetic5w30: syntheticMotorOilSpread,
  productOilStabilizer: oilStabilizerHero,
  productFuelTreatment: fuelTreatmentHero,
  productHiPerf: hiPerfSpread,
} as const;

export type MarketingBannerImageKey = keyof typeof MARKETING_BANNER_IMAGES;

export const DEFAULT_HERO_BACKGROUND_KEY: MarketingBannerImageKey =
  "carouselBgGears";
