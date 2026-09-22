import * as React from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

import {
  DEFAULT_HERO_BACKGROUND_KEY,
  MARKETING_BANNER_IMAGES,
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
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Button } from "./ui/button";
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

const themeClasses: Record<
  MarketingSlide["theme"],
  {
    badge: string;
    cta: "default" | "secondary" | "outline";
    bodyOnImage: string;
  }
> = {
  primary: {
    badge: "bg-white/15 text-white border border-white/25",
    cta: "secondary",
    bodyOnImage: "text-white/90",
  },
  dark: {
    badge: "bg-white/10 text-white/90 border border-white/20",
    cta: "secondary",
    bodyOnImage: "text-white/85",
  },
  neutral: {
    badge: "bg-white/15 text-white border border-white/25",
    cta: "secondary",
    bodyOnImage: "text-white/90",
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

function BackgroundOnlyVisual({
  slide,
}: {
  slide: MarketingSlide;
}) {
  const key = slide.backgroundKey ?? DEFAULT_HERO_BACKGROUND_KEY;
  const src = MARKETING_BANNER_IMAGES[key];

  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={
          slide.backgroundPosition
            ? { objectPosition: slide.backgroundPosition }
            : undefined
        }
      />
      <div
        className="absolute inset-0 bg-[#0a1628]/55 mix-blend-multiply"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"
        aria-hidden
      />
    </>
  );
}

function HeroSlideVisual({ slide }: { slide: MarketingSlide }) {
  const bgKey = slide.backgroundKey ?? DEFAULT_HERO_BACKGROUND_KEY;
  const productKey = slide.productKey;
  const bgSrc = MARKETING_BANNER_IMAGES[bgKey];
  const productSrc = productKey
    ? MARKETING_BANNER_IMAGES[productKey]
    : undefined;

  return (
    <>
      <img
        src={bgSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: slide.backgroundPosition ?? "left center",
        }}
      />
      <div
        className="absolute inset-0 bg-[#0a1628]/55 mix-blend-multiply"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/15 md:to-transparent"
        aria-hidden
      />

      {productSrc ? (
        <img
          src={productSrc}
          alt={slide.imageAlt ?? slide.title}
          className={cn(
            "absolute z-[1] pointer-events-none object-contain",
            "hidden md:block",
            "right-4 sm:right-8 lg:right-12",
            "bottom-2 md:bottom-0",
            "max-h-[50%] sm:max-h-[70%] md:max-h-[85%]",
            "max-w-[42%] sm:max-w-[38%] md:max-w-[34%]",
          )}
        />
      ) : null}
    </>
  );
}

function SlideCopy({
  slide,
  theme,
  onNav,
  onProduct,
  showMobileProduct,
}: {
  slide: MarketingSlide;
  theme: (typeof themeClasses)[MarketingSlide["theme"]];
  onNav: (view: MarketingNavView) => void;
  onProduct: (productId: string) => void;
  showMobileProduct?: boolean;
}) {
  const isHero = (slide.imageLayout ?? "hero") === "hero";
  const productSrc =
    slide.productKey && showMobileProduct
      ? MARKETING_BANNER_IMAGES[slide.productKey]
      : undefined;

  return (
    <div
      className={cn(
        "relative z-10 flex flex-col justify-center py-8 sm:py-10 px-12 sm:px-14 text-white",
        "max-w-xl lg:max-w-2xl",
      )}
    >
      <span
        className={cn(
          "inline-block w-fit text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3",
          theme.badge,
        )}
      >
        {slide.badge}
      </span>
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
        {slide.title}
      </h2>
      <p
        className={cn(
          "mt-2 text-sm sm:text-[15px] leading-relaxed",
          isHero ? theme.bodyOnImage : "text-muted-foreground",
        )}
      >
        {slide.description}
      </p>
      <Button
        type="button"
        variant={theme.cta}
        size="lg"
        className="mt-5 min-h-11 w-fit"
        onClick={() => runSlideAction(slide.action, onNav, onProduct)}
      >
        {slide.ctaLabel}
      </Button>
      {productSrc ? (
        <img
          src={productSrc}
          alt={slide.imageAlt ?? slide.title}
          className="md:hidden mt-6 max-h-32 w-full object-contain object-left"
        />
      ) : null}
    </div>
  );
}

export function MarketingBannerCarousel() {
  const navigate = useNavigate();
  const onNav = (view: MarketingNavView) => navigate(MARKETING_NAV_ROUTES[view]);
  const onProduct = (productId: string) => navigate(ROUTES.product(productId));
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  const autoplayRef = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true }),
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
    () => (reduceMotion ? undefined : [autoplayRef.current]),
    [reduceMotion],
  );

  const pauseAutoplay = () => {
    if (!reduceMotion) autoplayRef.current.stop();
  };

  const resumeAutoplay = () => {
    if (!reduceMotion) autoplayRef.current.play();
  };

  return (
    <section
      aria-label="Distributor announcements"
      className="w-full border-b border-border"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocusCapture={pauseAutoplay}
      onBlurCapture={resumeAutoplay}
    >
      <Carousel
        setApi={setApi}
        plugins={plugins}
        opts={{ loop: true }}
        className="relative w-full"
      >
        <CarouselContent className="ml-0">
          {MARKETING_SLIDES.map((slide) => {
            const theme = themeClasses[slide.theme];
            const layout = slide.imageLayout ?? "hero";
            const isHero = layout === "hero";

            return (
              <CarouselItem key={slide.id} className="pl-0 basis-full">
                <div
                  className={cn(
                    "relative min-h-[280px] sm:min-h-[300px] md:min-h-[320px] overflow-hidden pb-10",
                    !isHero && "bg-muted",
                  )}
                >
                  {isHero ? (
                    <HeroSlideVisual slide={slide} />
                  ) : (
                    <BackgroundOnlyVisual slide={slide} />
                  )}

                  <div className="relative z-10 w-full max-w-page mx-auto">
                    <SlideCopy
                      slide={slide}
                      theme={theme}
                      onNav={onNav}
                      onProduct={onProduct}
                      showMobileProduct={isHero && !!slide.productKey}
                    />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious
          className="left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-11 border-white/30 bg-black/20 text-white hover:bg-black/35 hover:text-white disabled:opacity-40"
          variant="outline"
        />
        <CarouselNext
          className="right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-11 border-white/30 bg-black/20 text-white hover:bg-black/35 hover:text-white disabled:opacity-40"
          variant="outline"
        />

        <div
          role="tablist"
          aria-label="Announcement slides"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/25 backdrop-blur-sm px-2 py-1"
        >
          {MARKETING_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              className={cn(
                "rounded-full transition-all min-w-11 min-h-11 flex items-center justify-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
              )}
              onClick={() => api?.scrollTo(index)}
            >
              <span
                className={cn(
                  "block rounded-full transition-all",
                  activeIndex === index
                    ? "size-2.5 bg-white"
                    : "size-2 bg-white/45 hover:bg-white/70",
                )}
              />
            </button>
          ))}
        </div>
      </Carousel>
    </section>
  );
}
