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

The portal opens directly to the dashboard. Auth is mocked: `AuthProvider` in `src/app/auth/AuthContext.tsx` starts signed in, and the sign-in form accepts any non-empty input. Signing out returns to the sign-in form.

## Deploying

### Base path

By default the app is served from the root. To serve it from a sub-path such as `/iris-networks-portal/`, set `BASE_PATH` for that build only. Vite reads it for asset URLs, and the router uses the same value as its `basename`, so client routes keep the prefix.

```bash
BASE_PATH=/iris-networks-portal/ npm run build
```

Set it per app (for example in the one build command for this app), not as a global config var on a host that builds several apps.

### In a multi-app hub

A hub that builds and serves several prototypes from one Heroku app builds this folder with its own command and mounts `dist/` at the app's path. It does not use `server.js` or `Procfile`. The browser URL keeps the prefix, so build with `BASE_PATH` set to the mount path. For example:

```bash
npm --prefix projects/iris-networks-portal install --include=dev
BASE_PATH=/iris-networks-portal/ npm --prefix projects/iris-networks-portal run build
```

### As its own Heroku app

`Procfile` runs `server.js`, which serves `dist/` with an `index.html` fallback. The Node buildpack installs with pnpm from `pnpm-lock.yaml`, runs `build`, then starts the `web` process. Set `BASE_PATH` as a config var only if the app is served from a sub-path. `server.js` also reads it at run time.

To move this folder into its own repository with its history:

```bash
git subtree split --prefix=iris -b iris-standalone
git push <new-repo-url> iris-standalone:main
```

## Forking for another brand

Each file below holds one kind of brand value. Change them in this order.

| What | Where |
| --- | --- |
| Company name, support copy, rep and marketing contacts | `src/app/brand/brand.ts` |
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
