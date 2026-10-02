/**
 * Order Details prototype (Figma node 313:321)
 */

const ORDER = {
  id: "SO-10042",
  status: "Delivered",
  trackerStatus: "Delivered",
  items: [
    {
      itemNum: "10087",
      description: "Hi-Perf 10W-30 (case)",
      qty: 10,
      unitPrice: 78.5,
    },
    {
      itemNum: "10091",
      description: "Marine Gear Lube 80W-90",
      qty: 6,
      unitPrice: 92.0,
    },
    {
      itemNum: "10112",
      description: "Fuel Treatment 32oz (24)",
      qty: 4,
      unitPrice: 134.5,
    },
  ],
  activity: [
    {
      title: "Delivered",
      meta: "03/16/26 11:15 AM · Atlanta, GA",
      checked: true,
    },
    {
      title: "Out for Delivery",
      meta: "03/16/26 8:00 AM · Atlanta, GA",
      checked: false,
    },
    {
      title: "Arrived at Destination Hub",
      meta: "03/15/26 5:30 PM · Atlanta, GA",
      checked: false,
    },
    {
      title: "In Transit",
      meta: "03/15/26 9:45 AM · Memphis, TN",
      checked: false,
    },
    {
      title: "Departed Hub",
      meta: "03/14/26 2:18 PM · Dallas, TX",
      checked: false,
    },
    {
      title: "Preparing Shipment",
      meta: "03/14/26 2:18 PM · Dallas, TX",
      checked: false,
    },
  ],
};

const TRACKER_STEPS = [
  "Received",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

function fmtMoney(n) {
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function renderTracker() {
  const currentIdx = TRACKER_STEPS.indexOf(ORDER.trackerStatus);
  const row = document.getElementById("tracker-row");
  if (!row) return;
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

    if (i <= currentIdx) {
      indicator.className = "tracker__indicator tracker__indicator--complete";
      indicator.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
      if (i === currentIdx) {
        label.classList.add("tracker__label--current");
      } else {
        label.classList.add("tracker__label--complete");
      }
    } else {
      indicator.className = "tracker__indicator tracker__indicator--pending";
      indicator.innerHTML = "";
      label.classList.add("tracker__label--pending");
    }

    wrap.appendChild(indicator);
    wrap.appendChild(label);
    row.appendChild(wrap);
  });
}

function renderActivity() {
  const list = document.getElementById("activity-list");
  if (!list) return;

  list.innerHTML = ORDER.activity
    .map(
      (ev, idx) => `
    <li class="od-activity__item${idx === ORDER.activity.length - 1 ? " od-activity__item--last" : ""}">
      <div class="od-activity__rail" aria-hidden="true">
        <span class="od-activity__dot${ev.checked ? " od-activity__dot--check" : ""}">
          ${
            ev.checked
              ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
              : ""
          }
        </span>
        <span class="od-activity__line"></span>
      </div>
      <div class="od-activity__body">
        <p class="od-activity__name">${ev.title}</p>
        <p class="od-activity__meta mono">${ev.meta}</p>
      </div>
    </li>`,
    )
    .join("");
}

function renderItems() {
  const body = document.getElementById("items-body");
  if (!body) return;

  body.innerHTML = ORDER.items
    .map((item) => {
      const lineTotal = item.qty * item.unitPrice;
      return `
      <tr>
        <td class="mono od-items__sku">${item.itemNum}</td>
        <td>${item.description}</td>
        <td class="mono">${item.qty}</td>
        <td class="mono">${fmtMoney(item.unitPrice)}</td>
        <td class="mono od-items__total">${fmtMoney(lineTotal)}</td>
      </tr>`;
    })
    .join("");
}

function bindPlaceholders() {
  document.querySelectorAll(".js-placeholder").forEach((el) => {
    el.addEventListener("click", (e) => e.preventDefault());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTracker();
  renderActivity();
  renderItems();
  bindPlaceholders();
});
