# IRIS Networks Distributor Portal

Standalone copy of the distributor portal, built on shadcn/ui (Vite + React + Tailwind v4), with a switchable brand theme. The original Lucas Oil prototype at the repository root is unchanged.

The header (and the sign-in screen) has an **IRIS / Lucas** control. It swaps colors, type, logo, and company copy. IRIS is the default. `?brand=lucas` or `?brand=iris` selects a brand on load, and the choice is remembered in the browser.

## Running the code

This folder is its own pnpm project (`pnpm-workspace.yaml` here keeps it out of the root workspace).

```bash
pnpm install
pnpm dev        # http://localhost:5173 by default; use --port 5174 to run beside the root app
pnpm build      # production build to dist/
pnpm start      # serve dist/ via server.js (run pnpm build first)
```

Demo login is pre-filled and follows the active brand: `demo@irisnetworksusa.com` / `iris2026`, or `demo@lucasoil.com` / `lucas2026`.

## Structure

- `components.json` configures shadcn/ui. Primitives live in `src/app/components/ui`; add new ones with `pnpm dlx shadcn@latest add <component>`.
- Brand tokens are in `src/styles/tokens.css`. Semantic mappings used by Tailwind are in `src/styles/theme.css`.
- Shared, app-specific components are in `src/app/components/shared` and build on the shadcn primitives.
- Mock data is in `src/app/data`.
