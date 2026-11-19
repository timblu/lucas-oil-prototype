import * as React from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

import carouselBanner from "../../assets/figma/carousel-banner.png";
import carouselProduct from "../../assets/figma/carousel-product.png";
import {
  MARKETING_BANNER_IMAGES,
  type MarketingBannerImageKey,
} from "../data/marketingBannerImages";
import {
  MARKETING_SLIDES,
  type MarketingNavView,
  type MarketingSlide,
  type MarketingSlideAction,
} from "../data/marketingSlides";
import { ROUTES } from "../routes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { cn } from "./ui/utils";

const MARKETING_NAV_ROUTES: Record<MarketingNavView, string> = {
  catalog: ROUTES.catalog,
  orders: ROUTES.orders,
  invoices: ROUTES.invoices,
  "knowledge-hub": ROUTES.knowledgeHub,
  "product-videos": ROUTES.productVideos,
  "marketing-collateral": ROUTES.marketingCollateral,
  account: ROUTES.account,
};

/** Prefer Figma-exported art for the lead slide; fall back to local banners. */
const FIGMA_SLIDE_OVERRIDES: Record<
  string,
  { background?: string; product?: string }
> = {
  "new-synthetic-5w30": {
    background: carouselBanner,
    product: carouselProduct,
  },
};

function runSlideAction(
  action: MarketingSlideAction,
  onNav: (view: MarketingNavView) => void,
  onProduct: (productId: string) => void,
) {
  switch (action.type) {
    case "nav":
      onNav(action.view);
      break;
    case "product":
      onProduct(action.productId);
      break;
    case "external":
      window.open(action.url, "_blank", "noopener,noreferrer");
      break;
  }
}

function resolveBg(slide: MarketingSlide) {
  const override = FIGMA_SLIDE_OVERRIDES[slide.id]?.background;
  if (override) return override;
  const key = (slide.backgroundKey ??
    "carouselBgGears") as MarketingBannerImageKey;
  return MARKETING_BANNER_IMAGES[key];
}

function resolveProduct(slide: MarketingSlide) {
  const override = FIGMA_SLIDE_OVERRIDES[slide.id]?.product;
  if (override) return override;
  if (!slide.productKey) return undefined;
  return MARKETING_BANNER_IMAGES[slide.productKey];
}

/** Ordered to match Figma Home: Synthetic 5W-30 lead slide first. */
const ORDERED_SLIDES: MarketingSlide[] = (() => {
  const lead = MARKETING_SLIDES.find((s) => s.id === "new-synthetic-5w30");
  const rest = MARKETING_SLIDES.filter((s) => s.id !== "new-synthetic-5w30");
  return lead ? [lead, ...rest].slice(0, 4) : MARKETING_SLIDES.slice(0, 4);
})();

export function MarketingBannerCarousel() {
  const navigate = useNavigate();
  const onNav = (view: MarketingNavView) => navigate(MARKETING_NAV_ROUTES[view]);
  const onProduct = (productId: string) => navigate(ROUTES.product(productId));
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  const autoplayRef = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  );

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const plugins = React.useMemo(
    () => (reduceMotion || !playing ? undefined : [autoplayRef.current]),
    [reduceMotion, playing],
  );

  function togglePlay() {
    if (reduceMotion) return;
    if (playing) {
      autoplayRef.current.stop();
      setPlaying(false);
    } else {
      autoplayRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <section aria-label="Distributor announcements" className="w-full">
      <Carousel
        setApi={setApi}
        plugins={plugins}
        opts={{ loop: true }}
        className="relative w-full"
      >
        <CarouselContent className="ml-0">
          {ORDERED_SLIDES.map((slide) => {
            const bgSrc = resolveBg(slide);
            const productSrc = resolveProduct(slide);

            return (
              <CarouselItem key={slide.id} className="pl-0 basis-full">
                <div className="relative w-full overflow-hidden">
                  {/* Banner body — 400px content + overlays */}
                  <div className="relative h-[400px] w-full">
                    <div className="absolute inset-0 bg-foreground" aria-hidden />
                    <img
                      src={bgSrc}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 size-full object-cover"
                    />
                    {/* Blue brand wash matching Figma carousel/card/secondary */}
                    <div
                      className="absolute inset-0 bg-iris-purple/85 mix-blend-multiply"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-iris-purple/40"
                      aria-hidden
                    />

                    <div className="relative z-10 mx-auto flex h-full max-w-page items-center px-4 sm:px-0">
                      {/* Frosted banner card */}
                      <div className="flex max-w-[630px] flex-col gap-10 rounded-lg p-8 backdrop-blur-[4px]">
                        <div className="flex flex-col gap-4">
                          <span className="inline-flex h-6 items-center rounded-full border border-white/60 px-3 text-2xs font-semibold uppercase tracking-normal text-white">
                            {slide.badge}
                          </span>
                          <div className="flex flex-col gap-2">
                            <h2 className="text-[32px] font-bold leading-10 tracking-[-1px] text-white">
                              {slide.title}
                            </h2>
                            <p className="max-w-[525px] text-base font-medium leading-6 text-white">
                              {slide.description}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            runSlideAction(slide.action, onNav, onProduct)
                          }
                          className="inline-flex items-center gap-2 text-base font-medium leading-6 text-white hover:opacity-90 transition-opacity w-fit"
                        >
                          {slide.ctaLabel}
                          <ArrowRight size={16} />
                        </button>
                      </div>

                      {productSrc ? (
                        <div className="ml-auto hidden h-full items-center justify-center py-20 md:flex flex-1">
                          <div className="flex size-[240px] items-center overflow-hidden px-[34px]">
                            <img
                              src={productSrc}
                              alt={slide.imageAlt ?? slide.title}
                              className="h-full w-auto object-contain"
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Bottom control bar — matches Figma pagination */}
        <div className="flex w-full items-center justify-between bg-iris-purple-dark py-1">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause carousel" : "Play carousel"}
            className="flex h-6 w-auto items-center justify-center pl-3 text-white"
          >
            {playing && !reduceMotion ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          <div
            role="tablist"
            aria-label="Announcement slides"
            className="flex items-center gap-4"
          >
            {ORDERED_SLIDES.map((slide, index) => {
              const active = activeIndex === index;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  className="flex h-8 w-6 items-center justify-center"
                  onClick={() => api?.scrollTo(index)}
                >
                  <span
                    className={cn(
                      "rounded-full transition-all",
                      active
                        ? "h-2 w-full bg-background"
                        : "size-2 bg-white/70 hover:bg-white",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pr-3 text-white">
            <button
              type="button"
              aria-label="Previous slide"
              className="size-6 flex items-center justify-center"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="size-6 flex items-center justify-center"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </Carousel>
    </section>
  );
}
