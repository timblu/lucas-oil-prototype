# IRIS Networks Distributor Portal

A single-brand copy of the distributor portal, built on shadcn/ui (Vite + React + Tailwind v4). The original prototype at the repository root is unchanged.

This copy is branded for IRIS Networks. To make a new brand, fork this folder and change the brand files listed below. There is no runtime theme switcher.

## Running the code

This folder is its own pnpm project (`pnpm-workspace.yaml` here keeps it out of the root workspace).

```bash
pnpm install
pnpm dev        # http://localhost:5173 by default; use --port 5174 to run beside the root app
pnpm build      # production build to dist/
pnpm start      # serve dist/ via server.js (run pnpm build first)
```

Demo login is pre-filled from `src/app/brand/brand.ts`: `demo@irisnetworksusa.com` / `iris2026`.

## Forking for another brand

Each file below holds one kind of brand value. Change them in this order.

| What | Where |
| --- | --- |
| Company name, support copy, rep and marketing contacts, demo sign-in | `src/app/brand/brand.ts` |
| Logo (header, sign-in) | `src/assets/logo/` SVGs, imported in `src/app/components/shared/BrandLogo.tsx` |
| Favicon | `public/favicon.svg` |
| Browser title and description | `index.html` |
| Raw color scales | `src/styles/tokens.css` |
| Semantic roles (primary, brand-dark, brand-soft, heading, accent, chart, sidebar) | `:root` in `src/styles/theme.css` |
| Font families and Google Fonts import | `--font-family-*` in `src/styles/tokens.css`, `@import` in `src/styles/index.css` |
| Account and rep details shown in the portal | `src/app/data/account.ts` |
| Service catalog, marketing slides, and video copy (brand gradients, no photos) | `src/app/data/` |

Components read colors and fonts only from semantic tokens, so they need no changes when the tokens change.

## Structure

- `components.json` configures shadcn/ui. Primitives live in `src/app/components/ui`; add new ones with `pnpm dlx shadcn@latest add <component>`.
- Brand tokens are in `src/styles/tokens.css`. Semantic mappings used by Tailwind are in `src/styles/theme.css`.
- Shared, app-specific components are in `src/app/components/shared` and build on the shadcn primitives.
- Mock data is in `src/app/data`.
