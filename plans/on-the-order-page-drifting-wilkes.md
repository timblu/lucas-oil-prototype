# Plan: Shipping Transit Detail on Order Detail Page

## Context
The Order Detail page currently shows a 5-step progress stepper (Received → Picked → Shipping → Out for Delivery → Delivered) and carrier/tracking number metadata, but gives no sense of *where* the shipment physically is or what has happened in transit. The user wants to see in-transit detail — the kind of event history you'd see on a UPS/FedEx tracking page.

## What's changing
**File:** `src/app/App.tsx` — `OrderDetail` component only.

No new files needed. All changes are additive (new type, new mock data, new UI block inside the existing tracking card).

---

## Implementation Steps

### 1. Add `TrackingEvent` type (near other interfaces, ~line 64)
```ts
interface TrackingEvent {
  timestamp: string;   // e.g. "03/20/26 2:14 AM"
  location: string;    // e.g. "Memphis, TN"
  description: string; // e.g. "Arrived at UPS hub"
  done: boolean;       // false = scheduled/pending event
}
```

### 2. Add mock tracking events map (near ORDERS/ORDER_ITEMS seed data)
Keyed by order ID. Each order gets a realistic event list matching its current status. Orders not yet shipped (Received/Picked) get minimal events. Active/delivered orders get a full timeline.

Example for SO-10042 ("Out for Delivery"):
```ts
const TRACKING_EVENTS: Record<string, TrackingEvent[]> = {
  "SO-10042": [
    { timestamp: "03/21/26 6:02 AM", location: "Reno, NV", description: "Out for delivery", done: true },
    { timestamp: "03/20/26 11:45 PM", location: "Reno, NV", description: "Arrived at local facility", done: true },
    { timestamp: "03/20/26 3:12 AM", location: "Salt Lake City, UT", description: "Departed UPS hub", done: true },
    { timestamp: "03/19/26 9:30 PM", location: "Salt Lake City, UT", description: "Arrived at UPS hub", done: true },
    { timestamp: "03/19/26 2:00 PM", location: "Corona, CA", description: "Shipment picked up", done: true },
  ],
  // ... other orders with appropriate events
};
```

### 3. Add transit detail section inside the tracking card in `OrderDetail`
Below the existing stepper, add a collapsible or always-visible event timeline. The timeline renders newest event first (top), with:
- A vertical connector line on the left
- Filled dot (done) or hollow dot (pending) per event
- Timestamp + location in muted text
- Description in foreground text

Mockup structure:
```
| ● 03/21/26 6:02 AM · Reno, NV
|   Out for delivery
| ● 03/20/26 11:45 PM · Reno, NV  
|   Arrived at local facility
| ○ 03/22/26 (est.) · Reno, NV
|   Delivered  ← pending
```

Uses only CSS variables from the design system:
- `text-foreground`, `text-muted-foreground`, `border-border`, `bg-[#111]` for done dots, `bg-card border-border` for pending dots.

If no tracking events exist for the order (e.g. status is "Received"), show a simple muted message: *"Tracking updates will appear once the shipment is picked up."*

---

## Verification
1. Open the app, sign in, navigate to Orders
2. Click SO-10042 ("Out for Delivery") — should show full 5-event timeline
3. Click SO-10043 ("Shipping") — should show a 3-event timeline
4. Click SO-10046 ("Received") — should show the "no tracking yet" message
5. Click SO-10041 ("Delivered") — should show a complete timeline with all events done
