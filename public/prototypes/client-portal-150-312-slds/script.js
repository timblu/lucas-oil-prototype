/**
 * Client Portal Dashboard — SLDS prototype (Figma node 150:312)
 * Mock data mirrored from client-portal-150-312; renderers emit SLDS classes.
 */

const ASSET = "../client-portal-150-312/assets";
const ICON_UTILITY =
  "assets/icons/utility-sprite/svg/symbols.svg";

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
      background: `${ASSET}/carousel-bg.jpg`,
      product: `${ASSET}/product-hero.png`,
      productAlt: "Lucas Oil synthetic motor oil lineup",
    },
    {
      id: "shipment-tracking",
      badge: "Order status",
      title: "Track open orders & deliveries",
      description:
        "View PO history, shipment progress, and carrier tracking for every order on your account. SO-10042 is out for delivery to Reno today.",
      ctaLabel: "View your orders",
      background: `${ASSET}/knowledge-hub.jpg`,
      product: `${ASSET}/product-hero.png`,
      productAlt: "Lucas Oil product group",
    },
    {
      id: "catalog-2026",
      badge: "Resource Center",
      title: "2026 Full Line — pricing & inventory",
      description:
        "Look up item numbers, case quantities, distributor pricing, and real-time stock levels across motor oils, gear lubes, additives, and specialty fluids.",
      ctaLabel: "Browse resources",
      background: `${ASSET}/knowledge-hub.jpg`,
      product: `${ASSET}/catalog.jpg`,
      productAlt: "Lucas Oil full line product catalog cover",
    },
    {
      id: "marketing-collateral",
      badge: "Marketing",
      title: "Sell sheets, catalogs & booth graphics",
      description:
        "Download the 2026 catalog PDF, Hi-Perf line sheet, brand standards, and trade-show artwork.",
      ctaLabel: "View marketing collateral",
      background: `${ASSET}/carousel-bg.jpg`,
      product: `${ASSET}/marketing.jpg`,
      productAlt: "Lucas Oil marketing collateral",
    },
  ],
  resources: [
    {
      title: "Knowledge Hub",
      description: "Product specs, training, and technical resources",
      cta: "Open Hub",
      image: `${ASSET}/knowledge-hub.jpg`,
      variant: "image",
    },
    {
      title: "Catalog",
      description: "Browse the full lineup, pricing, and inventory levels",
      cta: "View Catalog",
      image: `${ASSET}/catalog.jpg`,
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
  if (status === "Out for Delivery") return "slds-badge slds-theme_success";
  if (status === "Shipping") return "slds-badge slds-theme_info";
  return "slds-badge";
}

function invoiceBadgeClass(status) {
  if (status === "Past Due") return "slds-badge slds-theme_error";
  if (status === "Open") return "slds-badge slds-theme_warning";
  if (status === "Paid") return "slds-badge slds-theme_success";
  return "slds-badge";
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
  const panel = document.getElementById("carousel-panel");

  bg.src = slide.background;
  badge.textContent = slide.badge;
  title.textContent = slide.title;
  desc.textContent = slide.description;
  cta.textContent = slide.ctaLabel;
  product.src = slide.product;
  product.alt = slide.productAlt;
  panel.setAttribute(
    "aria-label",
    `${index + 1} of ${DATA.slides.length}`,
  );

  document.querySelectorAll(".slds-carousel__indicator-action").forEach((btn, i) => {
    const active = i === index;
    btn.classList.toggle("slds-is-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
    btn.tabIndex = active ? 0 : -1;
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

function setPlayButtonIcon(symbol) {
  const btn = document.getElementById("carousel-play");
  const use = btn.querySelector("use");
  if (use) use.setAttribute("href", `${ICON_UTILITY}#${symbol}`);
}

function toggleAutoplay() {
  autoplay = !autoplay;
  const btn = document.getElementById("carousel-play");
  btn.setAttribute("aria-label", autoplay ? "Pause carousel" : "Play carousel");
  setPlayButtonIcon(autoplay ? "pause" : "play");
  if (autoplay) startAutoplay();
  else stopAutoplay();
}

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
  const labels = document.getElementById("tracker-labels");
  row.innerHTML = "";
  labels.innerHTML = "";

  const progressPct =
    TRACKER_STEPS.length <= 1
      ? 0
      : Math.round((currentIdx / (TRACKER_STEPS.length - 1)) * 100);
  const bar = document.getElementById("tracker-bar");
  const barValue = document.getElementById("tracker-bar-value");
  bar.setAttribute("aria-valuenow", String(progressPct));
  barValue.style.width = `${progressPct}%`;
  barValue.querySelector(".slds-assistive-text").textContent =
    `Progress: ${progressPct}%`;

  TRACKER_STEPS.forEach((step, i) => {
    const li = document.createElement("li");
    li.className = "slds-progress__item";

    if (i < currentIdx) {
      li.classList.add("slds-is-completed");
    } else if (i === currentIdx) {
      li.classList.add("slds-is-active");
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "slds-button slds-progress__marker";
    if (i < currentIdx) {
      button.className =
        "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon";
      button.title = `${step} - Completed`;
      button.innerHTML = `<svg class="slds-button__icon" aria-hidden="true"><use href="${ICON_UTILITY}#success"></use></svg><span class="slds-assistive-text">${step} - Completed</span>`;
    } else if (i === currentIdx) {
      button.title = `${step} - Active`;
      button.innerHTML = `<span class="slds-assistive-text">${step} - Active</span>`;
    } else {
      button.title = step;
      button.innerHTML = `<span class="slds-assistive-text">${step}</span>`;
    }

    li.appendChild(button);
    row.appendChild(li);

    const labelCol = document.createElement("div");
    labelCol.className =
      "slds-col" +
      (i === 0
        ? " slds-text-align_left"
        : i === TRACKER_STEPS.length - 1
          ? " slds-text-align_right"
          : " slds-text-align_center");
    const label = document.createElement("span");
    label.className = "slds-text-body_small";
    if (i === currentIdx) label.classList.add("slds-text-title_bold");
    if (i > currentIdx) label.classList.add("slds-text-color_weak");
    label.textContent = step;
    labelCol.appendChild(label);
    labels.appendChild(labelCol);
  });
}

function renderOrdersList() {
  const list = document.getElementById("orders-list");
  const recent = DATA.orders.filter((o) => o.status !== "Delivered").slice(0, 4);
  const rows = recent.length ? recent : DATA.orders.slice(0, 4);

  list.innerHTML = rows
    .map(
      (o) => `
    <li class="slds-item">
      <a href="#" class="portal-list-link js-placeholder" aria-label="Order ${o.id}">
        <div>
          <p class="slds-text-title_bold">${o.id}</p>
          <p class="slds-text-body_small slds-text-color_weak">${o.estDelivery ? `Est. ${o.estDelivery}` : o.date} · ${o.shipTo}</p>
        </div>
        <span class="${orderBadgeClass(o.status)}">${o.status}</span>
      </a>
    </li>`,
    )
    .join("");
}

function renderInvoicesList() {
  const list = document.getElementById("invoices-list");
  const sorted = [...DATA.invoices].sort((a, b) => {
    const rank = (s) =>
      s === "Past Due" ? 0 : s === "Open" ? 1 : s === "Paid" ? 3 : 2;
    return rank(a.status) - rank(b.status);
  });
  const rows = sorted.slice(0, 4);

  list.innerHTML = rows
    .map(
      (inv) => `
    <li class="slds-item">
      <a href="#" class="portal-list-link js-placeholder" aria-label="Invoice ${inv.invoiceNumber}">
        <div>
          <p class="slds-text-title_bold">${inv.invoiceNumber}</p>
          <div class="slds-m-top_xx-small">
            <span class="${invoiceBadgeClass(inv.status)}">${invoiceBadgeLabel(inv.status)}</span>
            ${
              inv.status !== "Paid"
                ? `<span class="slds-text-body_small slds-text-color_weak slds-m-left_x-small">Due ${inv.dueDate}</span>`
                : ""
            }
          </div>
        </div>
        <p class="slds-text-title_bold">${fmtShort(inv.amountDue || inv.total)}</p>
      </a>
    </li>`,
    )
    .join("");
}

function resourceIconSymbol(title) {
  if (title.includes("Knowledge")) return "knowledge_base";
  if (title.includes("Catalog")) return "product";
  return "download";
}

function renderResources() {
  const grid = document.getElementById("resource-grid");
  grid.innerHTML = DATA.resources
    .map((r) => {
      const symbol = resourceIconSymbol(r.title);
      const media =
        r.variant === "image" && r.image
          ? `<div class="portal-resource-card__media">
              <img src="${r.image}" alt=""${r.imagePosition ? ` style="object-position: ${r.imagePosition}"` : ""} />
            </div>`
          : "";
      const solidClass =
        r.variant === "solid" ? " portal-resource-card--solid" : "";

      return `
      <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3 slds-m-bottom_small">
        <a href="#" class="slds-card slds-text-link_reset js-placeholder${solidClass}">
          ${media}
          <div class="slds-card__header slds-grid">
            <header class="slds-media slds-media_center slds-has-flexi-truncate">
              <div class="slds-media__figure">
                <span class="slds-icon_container slds-icon-utility-${symbol}">
                  <svg class="slds-icon slds-icon-text-default slds-icon_small" aria-hidden="true">
                    <use href="${ICON_UTILITY}#${symbol}"></use>
                  </svg>
                </span>
              </div>
              <div class="slds-media__body">
                <h2 class="slds-card__header-title">
                  <span class="slds-text-heading_small">${r.title}</span>
                </h2>
              </div>
            </header>
          </div>
          <div class="slds-card__body slds-card__body_inner">
            <p class="slds-text-body_regular slds-text-color_weak">${r.description}</p>
          </div>
          <footer class="slds-card__footer">${r.cta}</footer>
        </a>
      </div>`;
    })
    .join("");
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
        `<li class="slds-carousel__indicator" role="presentation">
          <button
            type="button"
            id="carousel-indicator-${i}"
            class="slds-carousel__indicator-action${i === 0 ? " slds-is-active" : ""}"
            data-index="${i}"
            aria-selected="${i === 0 ? "true" : "false"}"
            tabindex="${i === 0 ? "0" : "-1"}"
            role="tab"
            title="Slide ${i + 1}"
          >
            <span class="slds-assistive-text">Slide ${i + 1}</span>
          </button>
        </li>`,
    )
    .join("");
  dots.querySelectorAll(".slds-carousel__indicator-action").forEach((dot) => {
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

  document.getElementById("carousel-prev").addEventListener("click", () => {
    goToSlide(slideIndex - 1);
    startAutoplay();
  });
  document.getElementById("carousel-next").addEventListener("click", () => {
    goToSlide(slideIndex + 1);
    startAutoplay();
  });
  document
    .getElementById("carousel-play")
    .addEventListener("click", toggleAutoplay);

  bindPlaceholders();
});
