# Dashboard Summary Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dashboard’s four quick tiles with three larger summary cards for invoices, active orders, and account rep.

**Architecture:** Add a small pure metrics helper for invoice/order summaries, a presentational `DashboardSummaryCard`, and swap the quick-tiles block in `DashboardPage` to a 3-column grid wired to existing demo data and routes.

**Tech Stack:** React, TypeScript, React Router, Tailwind CSS, Lucide icons, Vite (no unit-test runner in this repo — verify with `npm run build` + manual UI checks).

## Global Constraints

- Scope is limited to the quick-tiles block on `DashboardPage` (plus helpers/components it needs).
- Do not redesign Active Order, resource cards, or Recent Orders/Invoices lists.
- Do not extract shared shipment-tracking UI.
- Use existing `INVOICES`, `ORDERS`, and `DISTRIBUTOR_ACCOUNT` data as-is.
- Reuse `fmtShort` and `ROUTES`.
- Cards: larger than current tiles, equal height, 1→3 columns at `lg`.
- Past due invoices get stronger primary emphasis; orders and rep stay neutral.
- Entire card is the hit target; no nested secondary buttons.

**Spec:** `docs/superpowers/specs/2026-09-17-dashboard-summary-cards-design.md`

---

## File Structure

| File | Responsibility |
|------|----------------|
| `src/app/lib/dashboardSummary.ts` | Pure helpers: invoice due totals/counts; active orders count + most urgent order |
| `src/app/components/shared/DashboardSummaryCard.tsx` | Presentational summary card (label, primary, supporting, footer cue, attention variant) |
| `src/app/pages/DashboardPage.tsx` | Derive metrics, replace 4-tile grid with 3 summary cards; remove unused imports |

---

### Task 1: Dashboard summary metrics helpers

**Files:**
- Create: `src/app/lib/dashboardSummary.ts`
- Modify: none

**Interfaces:**
- Consumes: `Invoice` and `Order` types from `../types`
- Produces:
  - `getInvoiceSummary(invoices: Invoice[]): { amountDue: number; openCount: number; pastDueCount: number; hasPastDue: boolean }`
  - `getActiveOrdersSummary(orders: Order[]): { activeCount: number; urgent: Order | null }`

- [ ] **Step 1: Create metrics helpers**

Create `src/app/lib/dashboardSummary.ts` with:

```ts
import type { Invoice, Order } from "../types";

const ACTIVE_ORDER_PRIORITY = [
  "Out for Delivery",
  "Shipping",
  "Picked",
  "Received",
] as const;

export function getInvoiceSummary(invoices: Invoice[]) {
  const open = invoices.filter((i) => i.status === "Open");
  const pastDue = invoices.filter((i) => i.status === "Past Due");
  const amountDue = [...open, ...pastDue].reduce(
    (sum, i) => sum + i.amountDue,
    0,
  );

  return {
    amountDue,
    openCount: open.length,
    pastDueCount: pastDue.length,
    hasPastDue: pastDue.length > 0,
  };
}

export function getActiveOrdersSummary(orders: Order[]) {
  const active = orders.filter((o) => o.status !== "Delivered");

  let urgent: Order | null = null;
  for (const status of ACTIVE_ORDER_PRIORITY) {
    const match = active.find((o) => o.status === status);
    if (match) {
      urgent = match;
      break;
    }
  }

  return {
    activeCount: active.length,
    urgent,
  };
}
```

- [ ] **Step 2: Sanity-check expected demo values**

With current seed data, mentally verify (or log temporarily then remove):

- Invoices: `openCount === 2`, `pastDueCount === 1`, `amountDue === 4997.9` (1464 + 621.4 + 2912.5), `hasPastDue === true`
- Orders: `activeCount === 4`, `urgent.id === "SO-10042"`, `urgent.status === "Out for Delivery"`

- [ ] **Step 3: Commit**

```bash
git add src/app/lib/dashboardSummary.ts
git commit -m "$(cat <<'EOF'
Add dashboard invoice and order summary helpers.

EOF
)"
```

---

### Task 2: `DashboardSummaryCard` presentational component

**Files:**
- Create: `src/app/components/shared/DashboardSummaryCard.tsx`

**Interfaces:**
- Consumes: `lucide-react` `ChevronRight`; React `ReactNode`
- Produces: `DashboardSummaryCard` props:
  - `label: string`
  - `primary: ReactNode`
  - `supporting: string`
  - `footer: string`
  - `attention?: boolean` (default `false`)
  - `icon: ReactNode`
  - `as?: "button" | "a"` (default `"button"`)
  - `onClick?: () => void` (when `as === "button"`)
  - `href?: string` (when `as === "a"`)

- [ ] **Step 1: Create the card component**

Create `src/app/components/shared/DashboardSummaryCard.tsx`:

```tsx
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type DashboardSummaryCardProps = {
  label: string;
  primary: ReactNode;
  supporting: string;
  footer: string;
  icon: ReactNode;
  attention?: boolean;
  as?: "button" | "a";
  onClick?: () => void;
  href?: string;
};

export function DashboardSummaryCard({
  label,
  primary,
  supporting,
  footer,
  icon,
  attention = false,
  as = "button",
  onClick,
  href,
}: DashboardSummaryCardProps) {
  const className =
    "h-full w-full text-left bg-card border border-border rounded-xl px-5 py-5 hover:shadow-md hover:border-[#999]/40 transition-all group flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2";

  const body = (
    <>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {label}
          </div>
          <div
            className={`text-2xl font-semibold truncate ${
              attention ? "text-[#111]" : "text-foreground"
            }`}
          >
            {primary}
          </div>
          <div className="text-sm text-muted-foreground mt-1 leading-snug">
            {supporting}
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-1 text-xs font-medium text-[#111] group-hover:underline">
        {footer}
        <ChevronRight
          size={12}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </div>
    </>
  );

  if (as === "a") {
    return (
      <a href={href} className={className}>
        {body}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {body}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/shared/DashboardSummaryCard.tsx
git commit -m "$(cat <<'EOF'
Add reusable dashboard summary card.

EOF
)"
```

---

### Task 3: Wire three summary cards into `DashboardPage`

**Files:**
- Modify: `src/app/pages/DashboardPage.tsx`

**Interfaces:**
- Consumes: `getInvoiceSummary`, `getActiveOrdersSummary`, `DashboardSummaryCard`, `INVOICES`, `ORDERS`, `DISTRIBUTOR_ACCOUNT`, `fmtShort`, `ROUTES`
- Produces: Replaced quick-tiles UI only

- [ ] **Step 1: Update imports**

In `DashboardPage.tsx`:

- Remove unused: `CreditCard`, `Truck`, `ACCOUNT_SNAPSHOT`, `CREDIT_MEMOS`, `CUSTOMER_CONTACTS`
- Keep: `Phone`, `Receipt`, `Package` (already used for resource cards)
- Add:

```ts
import { DashboardSummaryCard } from "../components/shared/DashboardSummaryCard";
import {
  getActiveOrdersSummary,
  getInvoiceSummary,
} from "../lib/dashboardSummary";
```

Ensure `INVOICES` import remains; drop snapshot/memos/contacts if unused after the swap.

- [ ] **Step 2: Derive metrics inside `DashboardPage`**

After `recentInvoices` (or near other derived values), add:

```ts
const invoiceSummary = getInvoiceSummary(INVOICES);
const ordersSummary = getActiveOrdersSummary(ORDERS);

const invoiceSupporting = invoiceSummary.hasPastDue
  ? `${invoiceSummary.pastDueCount} past due · ${invoiceSummary.openCount} open`
  : invoiceSummary.openCount > 0
    ? `${invoiceSummary.openCount} open`
    : "No open invoices";

const ordersSupporting = ordersSummary.urgent
  ? `${ordersSummary.urgent.id} · ${ordersSummary.urgent.status}`
  : "No orders in progress";
```

- [ ] **Step 3: Replace the four-tile grid**

Replace the block starting at `{/* Quick tiles */}` through the closing `</div>` of that grid with:

```tsx
{/* Summary cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <DashboardSummaryCard
    label="Invoices"
    primary={
      invoiceSummary.amountDue === 0
        ? "$0 due"
        : `${fmtShort(invoiceSummary.amountDue)} due`
    }
    supporting={invoiceSupporting}
    footer="View invoices"
    attention={invoiceSummary.hasPastDue}
    icon={<Receipt size={22} className="text-foreground" />}
    onClick={() => navigate(ROUTES.invoices)}
  />
  <DashboardSummaryCard
    label="Orders"
    primary={`${ordersSummary.activeCount} active`}
    supporting={ordersSupporting}
    footer="View orders"
    icon={<Package size={22} className="text-foreground" />}
    onClick={() => navigate(ROUTES.orders)}
  />
  <DashboardSummaryCard
    label="Your rep"
    primary={DISTRIBUTOR_ACCOUNT.repName}
    supporting={DISTRIBUTOR_ACCOUNT.repPhone}
    footer="Call"
    as="a"
    href={`tel:${DISTRIBUTOR_ACCOUNT.repPhone.replace(/\s/g, "")}`}
    icon={<Phone size={22} className="text-foreground" />}
  />
</div>
```

Notes:

- Keep Active Order and Recent lists unchanged.
- Do not reintroduce the fourth Billing CTA tile.

- [ ] **Step 4: Verify build**

Run:

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 5: Manual UI check**

Run `npm run dev`, open Dashboard, confirm:

1. Three larger cards in a row on desktop (stack on mobile).
2. Invoices shows amount due via `fmtShort`, supporting includes past due, primary emphasized.
3. Orders shows `4 active` and `SO-10042 · Out for Delivery`.
4. Rep shows Marcus Chen + phone; click opens tel link.
5. Invoice/Orders cards navigate to lists.
6. Active Order block and Recent lists unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/DashboardPage.tsx
git commit -m "$(cat <<'EOF'
Replace dashboard quick tiles with three summary cards.

EOF
)"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| 3 larger static cards | Task 3 |
| Invoices amount due + open/past due supporting | Task 1 + 3 |
| Past due attention | Task 2 (`attention`) + Task 3 |
| Orders active count + urgent supporting | Task 1 + 3 |
| Orders calm (no alarm) | Task 3 (no `attention`) |
| Rep name/phone + tel | Task 3 |
| Whole-card hit target | Task 2 |
| No nested buttons | Task 2 |
| Leave Active Order / lists alone | Task 3 scope |
| Existing data only | Task 1 + 3 |

## Self-review notes

- No unit-test runner in repo; verification is build + manual UI with fixed demo expectations.
- `fmtShort(4997.9)` renders `$4,998` (rounded) — acceptable for short display; do not switch to `fmt` unless product asks for cents.
- Rep email omitted to avoid clutter (spec: optional).
