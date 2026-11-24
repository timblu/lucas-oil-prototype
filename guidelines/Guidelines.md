# Project Guidelines

## Design system

- Brand colors and Design System tokens live in `lucas-oil/styles/tokens.css` (single source of truth).
- Semantic theme mappings (background, foreground, primary, etc.) live in `lucas-oil/styles/theme.css`.
- Use Tailwind utility classes backed by theme tokens (`bg-primary`, `text-muted-foreground`, `text-nav-link`, `border-border-subtle` via `border-border`, etc.) instead of hardcoded hex.
- Prefer Design System semantic tokens for UI chrome: `text-foreground`, `text-muted-foreground`, `text-label`, `text-nav-link`, `border-border`, `border-border-default`, `bg-tracking-complete-bg`, `text-tracking-progress`.

## Layout

- Prefer responsive flexbox and grid layouts over absolute positioning.
- Page content shell: `max-w-page mx-auto` (1200px) with horizontal padding matching Figma gutters.
- Keep components focused; extract helpers when files grow large.

## Typography

- Base font: Inter (`--font-family-sans`, loaded in `lucas-oil/styles/index.css`).
- Monospace: JetBrains Mono via the `.mono` utility class or `font-mono`.
- Type scale: `--text-2xs` (11) through `--text-2xl` (22) from the Design System.
