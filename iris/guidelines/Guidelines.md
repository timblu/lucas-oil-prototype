# Project Guidelines

## Components

- Build UI from shadcn/ui primitives in `src/app/components/ui` (Button, Card, Badge, Input, Sheet, Command, etc.). Add new primitives with `pnpm dlx shadcn@latest add <component>`.
- Compose app-specific pieces in `src/app/components/shared` on top of those primitives rather than hand-rolling styled elements.

## Design system

- IRIS brand palette lives in `src/styles/tokens.css` (single source of truth): purple `--iris-purple-*` (logo fill `#592d82`), cyan `--iris-cyan-*`, magenta, and coral.
- Semantic theme mappings (background, foreground, primary, etc.) live in `src/styles/theme.css`.
- Use Tailwind utility classes backed by theme tokens (`bg-primary`, `text-muted-foreground`, `text-iris-purple`, `border-border`, etc.) instead of hardcoded hex.
- Prefer semantic tokens for UI chrome: `text-foreground`, `text-muted-foreground`, `text-label`, `text-nav-link`, `border-border`, `border-border-default`, `bg-tracking-complete-bg`, `text-tracking-progress`.

## Layout

- Prefer responsive flexbox and grid layouts over absolute positioning.
- Page content shell: `max-w-page mx-auto` (1200px) with `px-4 sm:px-10` gutters.
- Keep components focused; extract helpers when files grow large.

## Typography

- Headings: Poppins (`font-heading`, applied to h1–h4 globally).
- Body: Open Sans (`--font-family-sans`).
- Monospace identifiers (order and invoice numbers): JetBrains Mono via the `.mono` utility or `font-mono`.
- Type scale: `--text-2xs` (11) through `--text-3xl` (28) from `tokens.css`.
