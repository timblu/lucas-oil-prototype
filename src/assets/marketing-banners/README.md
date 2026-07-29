# Marketing banner assets

Hero carousel uses **two layers per slide**: a shared industrial background plus a product image on the right. Copy and CTAs are HTML in the app.

## Shared background

| File | Spec |
|------|------|
| `industrial-gears-bg.jpg` | ~2400×900 (16:6), JPG/WebP, machinery/industrial scene, **no product**, blue grade optional (CSS tint applied in app) |

Replace this file to change the scene for all slides, or set a per-slide `backgroundKey` in `marketingSlides.ts`.

## Product layers (per slide)

Transparent **PNG** preferred (~800–1200px tall, padding around product). Register new files in `src/app/data/marketingBannerImages.ts`.

| Slide (id) | Current file | Suggested drop-in name |
|------------|--------------|-------------------------|
| `catalog-2026` | `catalog-cover.jpg` | `product-catalog.png` |
| `new-synthetic-5w30` | `pdf-page-22.jpg` (placeholder) | `product-synthetic-5w30.png` |
| `spring-counter-display` | `oil-stabilizer-hero.png` | `product-oil-stabilizer.png` |
| `additive-training` | `fuel-treatment-hero.png` | `product-fuel-treatment.png` |
| `hi-perf-line-sheet` | `pdf-page-23.jpg` (placeholder) | `product-hi-perf.png` |

## Single composite (alternative)

If you export one **text-free** banner per slide (~2400×700), keep the left ~55% clear for copy and set `imageLayout: "background"` with only `backgroundKey` in slide data (no `productKey`).
