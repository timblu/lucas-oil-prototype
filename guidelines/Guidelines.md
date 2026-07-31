# Project Guidelines

## Design system

- Brand colors and spacing tokens live in `src/styles/tokens.css`.
- Semantic theme mappings (background, foreground, primary, etc.) live in `src/styles/theme.css`.
- Use Tailwind utility classes backed by theme tokens (`bg-primary`, `text-muted-foreground`, etc.) instead of hardcoded colors.

## Layout

- Prefer responsive flexbox and grid layouts over absolute positioning.
- Keep components focused; extract helpers when files grow large.

## Typography

- Base font: Inter (loaded in `src/styles/index.css`).
- Monospace: JetBrains Mono via the `.mono` utility class.
