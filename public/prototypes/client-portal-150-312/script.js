/**
 * Client Portal Dashboard prototype (Figma node 150:312)
 * Mock data mirrored from src/app/data/{account,orders,invoices}.ts
 * and marketing slides / dashboard summary helpers.
 */

const DATA = {
  account: {
    shortName: "Reno WD",
    legalName: "Reno Wholesale Distributors",
    accountNumber: "WD-2941",
    repName: "Marcus Chen",
    repPhone: "800-342-2512 x204",
    repEmail: "m.chen@lucasoil.com",
  },
  orders: [
    {
      id: "SO-10041",
      date: "03/14/26",
      po: "PO-8821",
      shipTo: "Dallas WD",
      status: "Delivered",
      total: 4210,
    },
    {
      id: "SO-10042",
      date: "03/16/26",
      po: "PO-8834",
      shipTo: "Reno WD",
      status: "Out for Delivery",
      total: 1875,
      estDelivery: "03/22/26",
    },
    {
      id: "SO-10043",
      date: "03/18/26",
      po: "PO-8840",
      shipTo: "Tampa WD",
      status: "Shipping",
      total: 980,
      estDelivery: "03/22/26",
    },
    {
      id: "SO-10044",
      date: "03/19/26",
      po: "PO-8855",
      shipTo: "Boise WD",
      status: "Delivered",
      total: 2340,
    },
    {
      id: "SO-10045",
      date: "03/22/26",
      po: "PO-8861",
      shipTo: "Denver WD",
      status: "Picked",
      total: 7105,
    },
    {
      id: "SO-10046",
      date: "03/24/26",
      po: "PO-8870",
      shipTo: "Omaha WD",
      status: "Received",
      total: 540,
    },
  ],
  shipments: {
    "SO-10042": {
      carrier: "UPS",
      trackingNumber: "1Z999AA10123456784",
    },
  },
  invoices: [
    {
      id: "INV-20041",
      invoiceNumber: "INV-20041",
      dueDate: "04/13/26",
      orderId: "SO-10041",
      status: "Paid",
      total: 2281.0,
      amountDue: 0,
    },
    {
      id: "INV-20042",
      invoiceNumber: "INV-20042",
      dueDate: "04/15/26",
      orderId: "SO-10042",
      status: "Open",
      total: 1464.0,
      amountDue: 809.5,
    },
    {
      id: "INV-20043",
      invoiceNumber: "INV-20043",
      dueDate: "04/17/26",
      orderId: "SO-10043",
      status: "Open",
      total: 621.4,
      amountDue: 621.4,
    },
    {
      id: "INV-20044",
      invoiceNumber: "INV-20044",
      dueDate: "03/14/26",
      orderId: "SO-10044",
      status: "Past Due",
      total: 2912.5,
      amountDue: 2600.5,
    },
  ],
  slides: [
    {
      id: "new-synthetic-5w30",
      badge: "New product",
      title: "Synthetic 5W-30 Now In Stock",
      description:
        "API SP / ILSAC GF-6A full synthetic for modern passenger-car and light-truck applications. Check case pricing and availability before you quote your accounts.",
      ctaLabel: "Learn More",
      background: "assets/carousel-bg.jpg",
      product: "assets/product-hero.png",
      productAlt: "Lucas Oil synthetic motor oil lineup",
    },
    {
      id: "shipment-tracking",
      badge: "Order status",
      title: "Track open orders & deliveries",
      description:
        "View PO history, shipment progress, and carrier tracking for every order on your account. SO-10042 is out for delivery to Reno today.",
      ctaLabel: "View your orders",
      background: "assets/knowledge-hub.jpg",
      product: "assets/product-hero.png",
      productAlt: "Lucas Oil product group",
    },
    {
      id: "catalog-2026",
      badge: "Resource Center",
      title: "2026 Full Line — pricing & inventory",
      description:
        "Look up item numbers, case quantities, distributor pricing, and real-time stock levels across motor oils, gear lubes, additives, and specialty fluids.",
      ctaLabel: "Browse resources",
      background: "assets/knowledge-hub.jpg",
      product: "assets/catalog.jpg",
      productAlt: "Lucas Oil full line product catalog cover",
    },
    {
      id: "marketing-collateral",
      badge: "Marketing",
      title: "Sell sheets, catalogs & booth graphics",
      description:
        "Download the 2026 catalog PDF, Hi-Perf line sheet, brand standards, and trade-show artwork.",
      ctaLabel: "View marketing collateral",
      background: "assets/carousel-bg.jpg",
      product: "assets/marketing.jpg",
      productAlt: "Lucas Oil marketing collateral",
    },
  ],
  resources: [
    {
      title: "Knowledge Hub",
      description: "Product specs, training, and technical resources",
      cta: "Open Hub",
      image: "assets/knowledge-hub.jpg",
      variant: "image",
    },
    {
      title: "Catalog",
      description: "Browse the full lineup, pricing, and inventory levels",
      cta: "View Catalog",
      image: "assets/catalog.jpg",
      variant: "image",
      imagePosition: "top center",
    },
    {
      title: "Marketing Collateral",
      description: "Catalogs, line sheets, brand assets, and booth graphics",
      cta: "View Downloads",
      image: null,
      variant: "solid",
    },
  ],
};

/** Figma tracker steps (simplified from React 5-step model) */
const TRACKER_STEPS = [
  "Received",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

function mapOrderStatusToTracker(status) {
  if (status === "Delivered") return "Delivered";
  if (status === "Out for Delivery") return "Out for Delivery";
  if (status === "Shipping" || status === "Picked") return "In Transit";
  return "Received";
}

function fmtShort(n) {
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

function getInvoiceSummary(invoices) {
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

function getActiveOrdersSummary(orders) {
  const priority = ["Out for Delivery", "Shipping", "Picked", "Received"];
  const active = orders.filter((o) => o.status !== "Delivered");
  let urgent = null;
  for (const status of priority) {
    const match = active.find((o) => o.status === status);
    if (match) {
      urgent = match;
      break;
    }
  }
  return { activeCount: active.length, urgent };
}

function orderBadgeClass(status) {
  if (status === "Out for Delivery") return "badge badge--success";
  if (status === "Shipping") return "badge badge--shipping";
  return "badge badge--neutral";
}

function invoiceBadgeClass(status) {
  if (status === "Past Due") return "badge badge--past-due";
  if (status === "Open") return "badge badge--open";
  if (status === "Paid") return "badge badge--pending";
  return "badge badge--due";
}

function invoiceBadgeLabel(status) {
  if (status === "Open") return "Open";
  if (status === "Past Due") return "Past Due";
  if (status === "Paid") return "Paid";
  return status;
}

/* —— Carousel —— */
let slideIndex = 0;
let autoplay = true;
let autoplayTimer = null;

function renderSlide(index) {
  const slide = DATA.slides[index];
  const bg = document.getElementById("carousel-bg");
  const badge = document.getElementById("carousel-badge");
  const title = document.getElementById("carousel-title");
  const desc = document.getElementById("carousel-desc");
  const cta = document.getElementById("carousel-cta-label");
  const product = document.getElementById("carousel-product");

  bg.src = slide.background;
  badge.textContent = slide.badge;
  title.textContent = slide.title;
  desc.textContent = slide.description;
  cta.textContent = slide.ctaLabel;
  product.src = slide.product;
  product.alt = slide.productAlt;

  document.querySelectorAll(".carousel__dot").forEach((dot, i) => {
    dot.classList.toggle("is-active", i === index);
  });
}

function goToSlide(index) {
  slideIndex = (index + DATA.slides.length) % DATA.slides.length;
  renderSlide(slideIndex);
}

function startAutoplay() {
  stopAutoplay();
  if (!autoplay) return;
  autoplayTimer = window.setInterval(() => goToSlide(slideIndex + 1), 6000);
}

function stopAutoplay() {
  if (autoplayTimer) {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function toggleAutoplay() {
  autoplay = !autoplay;
  const btn = document.getElementById("carousel-play");
  btn.setAttribute("aria-label", autoplay ? "Pause carousel" : "Play carousel");
  btn.innerHTML = autoplay ? ICONS.pause : ICONS.play;
  if (autoplay) startAutoplay();
  else stopAutoplay();
}

const ICONS = {
  play:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
  pause:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="14" y="4" width="4" height="16"/><rect x="6" y="4" width="4" height="16"/></svg>',
};

/* —— Summary / lists / tracker —— */
function renderSummary() {
  const invoiceSummary = getInvoiceSummary(DATA.invoices);
  const ordersSummary = getActiveOrdersSummary(DATA.orders);

  const invoiceSupporting = invoiceSummary.hasPastDue
    ? `${invoiceSummary.pastDueCount} Past Due · ${invoiceSummary.openCount} Open`
    : invoiceSummary.openCount > 0
      ? `${invoiceSummary.openCount} Open`
      : "No open invoices";

  const ordersSupporting = ordersSummary.urgent
    ? `${ordersSummary.urgent.id} · ${ordersSummary.urgent.status}`
    : "No orders in progress";

  document.getElementById("summary-invoices-primary").textContent =
    invoiceSummary.amountDue === 0
      ? "$0 Due"
      : `${fmtShort(invoiceSummary.amountDue)} Due`;
  document.getElementById("summary-invoices-supporting").textContent =
    invoiceSupporting;

  document.getElementById("summary-orders-primary").textContent =
    `${ordersSummary.activeCount} Active`;
  document.getElementById("summary-orders-supporting").textContent =
    ordersSupporting;

  document.getElementById("summary-rep-primary").textContent =
    DATA.account.repName;
  document.getElementById("summary-rep-supporting").textContent =
    DATA.account.repPhone;
}

function renderTracking() {
  const featured =
    DATA.orders.find((o) => o.status === "Out for Delivery") ||
    DATA.orders.find((o) => o.status === "Shipping") ||
    DATA.orders.find((o) => o.status === "Picked") ||
    DATA.orders.find((o) => o.status === "Received") ||
    DATA.orders[0];

  const shipment = DATA.shipments[featured.id] || {
    carrier: "UPS",
    trackingNumber: "—",
  };

  document.getElementById("tracking-order-id").textContent = featured.id;
  document.getElementById("tracking-est").textContent =
    featured.estDelivery || featured.date;
  document.getElementById("tracking-carrier").textContent = shipment.carrier;
  document.getElementById("tracking-number").textContent =
    shipment.trackingNumber;
  document.getElementById("tracking-total").textContent = fmtShort(
    featured.total,
  );

  const current = mapOrderStatusToTracker(featured.status);
  const currentIdx = TRACKER_STEPS.indexOf(current);
  const row = document.getElementById("tracker-row");
  row.innerHTML = "";

  TRACKER_STEPS.forEach((step, i) => {
    if (i > 0) {
      const line = document.createElement("div");
      line.className =
        "tracker__line" + (i > currentIdx ? " tracker__line--pending" : "");
      row.appendChild(line);
    }

    const wrap = document.createElement("div");
    wrap.className = "tracker__step";

    const indicator = document.createElement("div");
    const label = document.createElement("p");
    label.className = "tracker__label";
    label.textContent = step;

    if (i < currentIdx) {
      indicator.className = "tracker__indicator tracker__indicator--complete";
      indicator.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
      label.classList.add("tracker__label--complete");
    } else if (i === currentIdx) {
      indicator.className = "tracker__indicator tracker__indicator--current";
      indicator.innerHTML = '<span class="tracker__dot"></span>';
      label.classList.add("tracker__label--current");
    } else {
      indicator.className = "tracker__indicator tracker__indicator--pending";
      indicator.innerHTML = '<span class="tracker__dot"></span>';
      label.classList.add("tracker__label--pending");
    }

    wrap.appendChild(indicator);
    wrap.appendChild(label);
    row.appendChild(wrap);
  });
}

function renderOrdersList() {
  const list = document.getElementById("orders-list");
  const recent = DATA.orders.filter((o) => o.status !== "Delivered").slice(0, 4);
  const rows = recent.length ? recent : DATA.orders.slice(0, 4);

  list.innerHTML = rows
    .map(
      (o) => `
    <a href="#" class="list-row js-placeholder" aria-label="Order ${o.id}">
      <div>
        <p class="list-row__id mono">${o.id}</p>
        <p class="list-row__meta">${o.estDelivery ? `Est. ${o.estDelivery}` : o.date} · ${o.shipTo}</p>
      </div>
      <div class="list-row__right">
        <span class="${orderBadgeClass(o.status)}">${o.status}</span>
      </div>
    </a>`,
    )
    .join("");
}

function renderInvoicesList() {
  const list = document.getElementById("invoices-list");
  // Prefer actionable invoices first (past due / open), then others — up to 4
  const sorted = [...DATA.invoices].sort((a, b) => {
    const rank = (s) =>
      s === "Past Due" ? 0 : s === "Open" ? 1 : s === "Paid" ? 3 : 2;
    return rank(a.status) - rank(b.status);
  });
  const rows = sorted.slice(0, 4);

  list.innerHTML = rows
    .map(
      (inv) => `
    <a href="#" class="list-row js-placeholder" aria-label="Invoice ${inv.invoiceNumber}">
      <div class="invoice-row__left">
        <p class="list-row__id mono">${inv.invoiceNumber}</p>
        <div class="invoice-row__status-line">
          <span class="${invoiceBadgeClass(inv.status)}">${invoiceBadgeLabel(inv.status)}</span>
          ${
            inv.status !== "Paid"
              ? `<p class="invoice-row__due">Due ${inv.dueDate}</p>`
              : ""
          }
        </div>
      </div>
      <div class="list-row__right">
        <p class="list-row__amount mono">${fmtShort(inv.amountDue || inv.total)}</p>
      </div>
    </a>`,
    )
    .join("");
}

function renderResources() {
  const grid = document.getElementById("resource-grid");
  grid.innerHTML = DATA.resources
    .map((r) => {
      if (r.variant === "solid") {
        return `
        <a href="#" class="resource-card resource-card--solid js-placeholder">
          <div class="resource-card__icon">${resourceIcon(r.title)}</div>
          <div class="resource-card__content">
            <div>
              <h2 class="resource-card__title">${r.title}</h2>
              <p class="resource-card__desc">${r.description}</p>
            </div>
            <span class="resource-card__cta">${r.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </span>
          </div>
        </a>`;
      }
      const pos = r.imagePosition
        ? ` style="object-position: ${r.imagePosition}"`
        : "";
      return `
      <a href="#" class="resource-card js-placeholder">
        <img class="resource-card__bg" src="${r.image}" alt=""${pos} />
        <div class="resource-card__overlay resource-card__overlay--blue" aria-hidden="true"></div>
        <div class="resource-card__icon">${resourceIcon(r.title)}</div>
        <div class="resource-card__content">
          <div>
            <h2 class="resource-card__title">${r.title}</h2>
            <p class="resource-card__desc">${r.description}</p>
          </div>
          <span class="resource-card__cta">${r.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </span>
        </div>
      </a>`;
    })
    .join("");
}

function resourceIcon(title) {
  if (title.includes("Knowledge")) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>';
  }
  if (title.includes("Catalog")) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.4s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>';
}

function bindPlaceholders() {
  document.querySelectorAll(".js-placeholder").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}

function buildDots() {
  const dots = document.getElementById("carousel-dots");
  dots.innerHTML = DATA.slides
    .map(
      (_, i) =>
        `<button type="button" class="carousel__dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`,
    )
    .join("");
  dots.querySelectorAll(".carousel__dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(Number(dot.dataset.index));
      startAutoplay();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildDots();
  renderSlide(0);
  renderSummary();
  renderTracking();
  renderOrdersList();
  renderInvoicesList();
  renderResources();
  bindPlaceholders();
  startAutoplay();

  document
    .getElementById("carousel-prev")
    .addEventListener("click", () => {
      goToSlide(slideIndex - 1);
      startAutoplay();
    });
  document
    .getElementById("carousel-next")
    .addEventListener("click", () => {
      goToSlide(slideIndex + 1);
      startAutoplay();
    });
  document
    .getElementById("carousel-play")
    .addEventListener("click", toggleAutoplay);

  // Re-bind placeholders after dynamic list renders already done;
  // resource cards are included. Dynamic list links need one more pass:
  bindPlaceholders();
});
