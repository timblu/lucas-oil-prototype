# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **Vite + React 18 + TypeScript** SPA (Lucas Oil B2B Distributor Portal). It is frontend-only: all data is mocked in React state, so there is **no backend, database, or env var setup** required.

### Services
- **Vite dev server** (primary): `pnpm dev` serves the SPA at `http://localhost:5173`. Scripts are in `package.json` (`dev`, `build`, `start`).
- **Express static server** (optional production): `pnpm start` runs `server.js` after `pnpm build`.

### Non-obvious notes
- Package manager is **pnpm** (despite `README.md` saying `npm i`). Use `pnpm`.
- `pnpm install` may print a warning that build scripts for `@tailwindcss/oxide` and `esbuild` were ignored. This is safe to ignore — the Vite dev server, esbuild transforms, and Tailwind all work without approving those build scripts. Do **not** run `pnpm approve-builds` (interactive).
- There is **no lint and no test setup** (no ESLint/Prettier/Vitest/Jest config or scripts). Do not expect `pnpm lint`/`pnpm test` to exist.
- Login is mocked and pre-filled with `demo@lucasoil.com` / `lucas2026`; just submit the form to reach the dashboard.
- Navigation uses **React Router** (`src/app/router.tsx`). Top nav: Orders · Invoices · Resource Center, with Account and Sign out on the right.
- The **Account** page (`src/app/pages/AccountPage.tsx`) has 3 sections: Account Info, Contacts, and Financial.
