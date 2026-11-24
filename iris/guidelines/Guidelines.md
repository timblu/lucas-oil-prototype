# Project Guidelines

## Components

- Build UI from shadcn/ui primitives in `src/app/components/ui` (Button, Card, Badge, Input, Sheet, Command, etc.). Add new primitives with `pnpm dlx shadcn@latest add <component>`.
- Compose app-specific pieces in `src/app/components/shared` on top of those primitives rather than hand-rolling styled elements.

## Brands

- This is a single-brand fork (IRIS Networks). There is no runtime brand switch and no per-brand state in the app.
- Company copy, contacts, and demo sign-in come from `src/app/brand/brand.ts`. Import `brand` directly; do not add context providers for it.
- Logo comes from `src/app/components/shared/BrandLogo.tsx`. Color comes from semantic tokens in `src/styles/theme.css`. Use `bg-primary`, `bg-brand-dark`, `bg-brand-soft`, `text-heading`, and `to-brand-accent` so the markup restyles when the tokens change.
- To fork for another company, follow the table in `README.md`.

## Design system

- Raw scales live in `src/styles/tokens.css`: IRIS purple (`#592d82`), cyan, magenta, and coral, plus shared neutrals.
- Semantic theme mappings (background, foreground, primary, etc.) live in `src/styles/theme.css`.
- Use Tailwind utility classes backed by theme tokens (`bg-primary`, `text-muted-foreground`, `text-iris-purple`, `border-border`, etc.) instead of hardcoded hex.
- Prefer semantic tokens for UI chrome: `text-foreground`, `text-muted-foreground`, `text-label`, `text-nav-link`, `border-border`, `border-border-default`, `bg-tracking-complete-bg`, `text-tracking-progress`.

## Layout

- Prefer responsive flexbox and grid layouts over absolute positioning.
- Page content shell: `max-w-page mx-auto` (1200px) with `px-4 sm:px-10` gutters.
- Keep components focused; extract helpers when files grow large.

## Typography

- Headings are Poppins and body text is Open Sans. Both are set through `--font-family-heading` and `--font-family-sans` in `tokens.css`, and loaded from the Google Fonts import in `src/styles/index.css`.
- Monospace identifiers (order and invoice numbers): JetBrains Mono via the `.mono` utility or `font-mono`.
- Type scale: `--text-2xs` (11) through `--text-3xl` (28) from `tokens.css`.
