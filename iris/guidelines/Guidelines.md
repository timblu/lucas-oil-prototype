# Project Guidelines

## Components

- Build UI from shadcn/ui primitives in `src/app/components/ui` (Button, Card, Badge, Input, Sheet, Command, etc.). Add new primitives with `pnpm dlx shadcn@latest add <component>`.
- Compose app-specific pieces in `src/app/components/shared` on top of those primitives rather than hand-rolling styled elements.

## Brands

- Two brands share these screens: IRIS Networks (default) and Lucas Oil. Switch with the IRIS / Lucas control in the header, or open `?brand=iris` or `?brand=lucas`. The choice is stored in `localStorage` under `portal-brand`.
- Copy, logo, demo login, and support details come from `src/app/brand/brands.ts` via `useBrand()`.
- Color and type come from semantic tokens. `[data-brand="lucas"]` in `src/styles/theme.css` overrides the IRIS defaults on `:root`. Use `bg-primary`, `bg-brand-dark`, `bg-brand-soft`, `text-heading`, and `to-brand-accent` so both brands restyle the same markup.

## Design system

- Raw scales live in `src/styles/tokens.css`: IRIS purple (`#592d82`), cyan, magenta, and coral, plus the Lucas Oil red and blue scales.
- Semantic theme mappings (background, foreground, primary, etc.) live in `src/styles/theme.css`.
- Use Tailwind utility classes backed by theme tokens (`bg-primary`, `text-muted-foreground`, `text-iris-purple`, `border-border`, etc.) instead of hardcoded hex.
- Prefer semantic tokens for UI chrome: `text-foreground`, `text-muted-foreground`, `text-label`, `text-nav-link`, `border-border`, `border-border-default`, `bg-tracking-complete-bg`, `text-tracking-progress`.

## Layout

- Prefer responsive flexbox and grid layouts over absolute positioning.
- Page content shell: `max-w-page mx-auto` (1200px) with `px-4 sm:px-10` gutters.
- Keep components focused; extract helpers when files grow large.

## Typography

- IRIS headings are Poppins and body text is Open Sans. Lucas Oil uses Inter for both. Both are applied through `--font-family-heading` and `--font-family-sans`.
- Monospace identifiers (order and invoice numbers): JetBrains Mono via the `.mono` utility or `font-mono`.
- Type scale: `--text-2xs` (11) through `--text-3xl` (28) from `tokens.css`.
