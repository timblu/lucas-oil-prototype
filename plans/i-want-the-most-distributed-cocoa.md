# Plan: Wire Design System Tokens into Portal

## Context
The user added `@make-kits/design-system-tokens` to `package.json` and wants the portal to use those colors. The kit ships a compiled `dist/style.css` with a raw color palette (`--primary/50`–`/900` reds, `--secondary/50`–`/900` blues, `--neutral/50`–`/900` warm grays, `--white`). It does **not** define semantic tokens — those live in `theme.css`. The plan is to import the kit, remap `theme.css` to reference kit palette vars, and update `App.tsx` so interactive elements use the brand red (via `bg-primary`/`text-primary`) instead of hardcoded grayscale.

## Files to Modify

### 1. `src/styles/index.css`
Add the kit import as the **first** line:
```css
@import '@make-kits/design-system-tokens/style.css';
```
Keep the existing imports (`fonts.css`, `tailwind.css`, `theme.css`) below it.

### 2. `src/styles/theme.css`
Update the `:root` block to reference DS palette tokens. Keep the `@custom-variant dark`, `.dark`, `@theme inline`, and `@layer base` blocks unchanged.

| Token | New value | DS var | Resolved hex |
|---|---|---|---|
| `--background` | `var(--neutral/50)` | neutral/50 | `#f8f7f7` |
| `--foreground` | `var(--neutral/900)` | neutral/900 | `#231f20` |
| `--card` | `var(--white)` | white | `#fff` |
| `--card-foreground` | `var(--neutral/900)` | | `#231f20` |
| `--popover` | `var(--white)` | | `#fff` |
| `--popover-foreground` | `var(--neutral/900)` | | `#231f20` |
| `--primary` | `var(--primary/600)` | primary/600 | `#d50032` |
| `--primary-foreground` | `var(--white)` | | `#fff` |
| `--secondary` | `var(--neutral/100)` | neutral/100 | `#eeeced` |
| `--secondary-foreground` | `var(--neutral/900)` | | `#231f20` |
| `--muted` | `var(--neutral/100)` | neutral/100 | `#eeeced` |
| `--muted-foreground` | `var(--neutral/500)` | neutral/500 | `#7c6e72` |
| `--accent` | `var(--neutral/100)` | neutral/100 | `#eeeced` |
| `--accent-foreground` | `var(--neutral/900)` | | `#231f20` |
| `--destructive` | `var(--primary/700)` | primary/700 | `#ad002e` |
| `--border` | `var(--neutral/200)` | neutral/200 | `#dbd6d8` (as rgba) |
| `--input-background` | `var(--neutral/100)` | | `#eeeced` |
| `--ring` | `var(--primary/600)` | | `#d50032` |

### 3. `src/app/App.tsx`
Swap hardcoded action-color classes so interactive elements pick up the brand red through the token:

- Primary buttons (`bg-[#111]`/`hover:bg-[#333]`) → `bg-primary hover:bg-[var(--primary/700)] text-primary-foreground`
- Nav active pill (`bg-[#111]`) stays — it's a deliberate dark nav treatment, not a primary action
- Status badge "Open" fill (`bg-[#111]`) stays — it's a semantic UI distinction, not a brand color
- `text-[#111]` on order IDs / links → can stay (neutral/900 equivalent is visually identical)
- Focus rings: `focus:ring-[#555]/20` → `focus:ring-primary/20`
- Send/submit button in SupportChat and CaseDetail messaging → `bg-primary`

## Verification
1. Sign in → primary buttons (Sign In, New Case, Send) appear in DS red (#d50032)
2. Background is the warm neutral/50 (#f8f7f7) instead of flat gray
3. Text renders in neutral/900 (#231f20) — a warm near-black
4. Muted text (captions, labels) reads as neutral/500 (#7c6e72)
5. Borders have the neutral/200 warm tone

---

# Plan: Featured Active Order Banner on Dashboard

## Context
The home screen currently buries order activity inside a small "Recent Orders" summary card. The user wants the most active in-progress order surfaced prominently — front and center — so distributors immediately see what's moving when they log in.

## What to Build
A full-width "featured order" banner card inserted in the `Dashboard` component, positioned **between the welcome header and the 4 quick tiles**. It should be clickable and navigate to the Order Detail page.

## Selection Logic
Pick the featured order with this priority:
1. First order with status `"Shipping"` (highest urgency — in transit)
2. Fallback to first order with status `"Picked"` (picked, not yet shipped)
3. Fallback to the most recent order by array position (if all are `"Delivered"`)

## Data to Display
- **Left column**: Order # (large, mono), PO #, Ship-to, Date
- **Right column**: Status badge, Total (large, mono)
- **Tracking row** (below, full width): Carrier (UPS), Tracking # (mono, copyable feel), Est. Delivery date
- **Tracking step indicator**: Reuse the 3-step Picked → Shipping → Delivered progress bar already in `OrderDetail` — extract it or inline a simplified version

## File to Modify
**`src/app/App.tsx`** — one change only:
- Add a `FeaturedOrder` sub-component (or inline block) inside the `Dashboard` function
- Insert it between the welcome `<div>` and the quick-tiles grid
- Use the existing `ORDERS`, `Order` type, `StatusBadge`, `Card`, `fmt`/`fmtShort` helpers, and `ChevronRight` icon — no new imports needed
- Tracking data is hardcoded to the SO-10042 detail (same as `OrderDetail`) since there's only one seed order detail dataset

## Layout Sketch
```
┌─────────────────────────────────────────────────────────────────┐
│  ACTIVE ORDER                                    [In Progress ▸] │
│  SO-10042          PO-8834 · Reno WD · 03/16/26                 │
│                                                                   │
│  ●━━━━━━━━━━━━○─────────────○   UPS  1Z999AA10123456784          │
│  Picked   Shipping      Delivered   Est. 03/22/26                │
│                                                                   │
│  Total: $1,875.00                            → View Order Detail  │
└─────────────────────────────────────────────────────────────────┘
```

## Verification
- Load the app, sign in → featured order banner appears between welcome text and the 4 tiles
- Banner shows SO-10042 (Shipping status — highest priority match in seed data)
- Clicking anywhere on the banner navigates to Order Detail for that order
- The 3-step tracker reflects the correct active step (step 2 = Shipping)
- The 4 quick tiles, Recent Orders card, and rest of dashboard are unaffected
