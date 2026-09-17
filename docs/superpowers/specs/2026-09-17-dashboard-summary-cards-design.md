# Dashboard Summary Cards — Design Spec

**Date:** 2026-09-17  
**Surface:** `DashboardPage` quick-tiles strip  
**Status:** Approved for planning

## Problem

The four compact tiles (Recent Orders count, Account Snapshot, Your Rep, Billing CTA) act as navigation shortcuts. They do not surface vital distributor info at a glance, and they compete with richer sections already on the page (Active Order tracking, Recent Orders/Invoices lists).

## Goal

Replace the four tiles with **three larger static summary cards** that show the most useful at-a-glance facts a distributor should not have to dig for:

1. Open / recent invoice health  
2. Active orders snapshot  
3. Account rep contact  

## Non-goals

- Redesigning Active Order tracking, resource cards, or Recent Orders/Invoices lists  
- Extracting a shared shipment-tracking component  
- New APIs or data models  
- Dynamic “action radar” that hides cards when calm  

## Layout

- Grid: 1 column on small screens → 3 equal columns at `lg`  
- Cards are larger than the current tiles (~1.5× height): more padding, larger primary metric, room for supporting line + footer CTA cue  
- Equal card height in the row  
- Visual language stays consistent with existing dashboard cards (border, rounded corners, hover/focus)

## Card content

### 1. Invoices

| Element | Content |
|--------|---------|
| Label | Invoices |
| Primary | Total amount due across **Open** + **Past Due** invoices; if none: `$0 due` |
| Supporting | Counts (e.g. `2 open · 1 past due`); if past due exists, lead with past-due count/amount |
| Calm empty | `No open invoices` |
| Click | Navigate to invoices list (`ROUTES.invoices`) |
| Footer cue | View invoices + chevron |

**Attention:** If any invoice status is `Past Due`, apply stronger emphasis on the primary line (and past-due lead-in on supporting text). Open-only remains neutral.

**Data:** Derive from existing `INVOICES`.

### 2. Orders

| Element | Content |
|--------|---------|
| Label | Orders |
| Primary | Count of orders where status ≠ `Delivered` |
| Supporting | Most urgent active order id + status (same priority order as featured Active Order: Out for Delivery → Shipping → Picked → Received) |
| Calm empty | `0 active` / `No orders in progress` |
| Click | Navigate to orders list (`ROUTES.orders`) |
| Footer cue | View orders + chevron |

**Attention:** No alarm styling. Active Order block above owns shipment urgency.

**Data:** Derive from existing `ORDERS`.

### 3. Your rep

| Element | Content |
|--------|---------|
| Label | Your rep |
| Primary | Rep name (`DISTRIBUTOR_ACCOUNT.repName`) |
| Supporting | Phone (visible); optional email if space allows without clutter |
| Click | Primary action is `tel:` to rep phone |
| Footer cue | Call + chevron (or equivalent) |

**Attention:** Always neutral — relationship card, not status.

**Data:** `DISTRIBUTOR_ACCOUNT`.

## Interaction

- Entire card is the hit target  
- Keyboard: visible focus ring consistent with other dashboard controls  
- Hover: same light lift/shadow pattern as existing cards  
- No nested secondary buttons inside the card body  

## Implementation notes

- Change scope is limited to the quick-tiles block in `DashboardPage.tsx`  
- Prefer inline derived metrics on the page; extract a small `DashboardSummaryCard` presentational helper only if it keeps the three cards consistent without over-abstraction  
- Reuse existing formatters (`fmtShort`) and routing (`ROUTES`)  
- Demo data already includes past-due and in-flight orders — use it as-is  

## Success criteria

- Distributor can see what they owe, whether anything is past due, how many orders are active, and who to call — without opening Account, Invoices, or Orders  
- Cards do not duplicate Active Order tracking detail (steps, carrier, tracking #)  
- Strip is visually calmer and more useful than the previous four-tile nav row  
