import type { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "10087",
    name: "Business Broadband Internet 1 Gbps",
    billingUnit: "Per location, monthly",
    price: 78.5,
    inventory: "in-stock",
    description:
      "Broadband business internet for locations where dedicated internet access isn't an option, with the reliability, speed, and security of IRIS fiber at up to 1 Gbps. Available in select locations of Nashville, Knoxville, and Oak Ridge, TN. Supported 24/7 by IRIS local teams.",
    category: "Internet",
    colorClass: "from-primary to-brand-accent",
  },
  {
    id: "10091",
    name: "Carrier Ethernet (E-Line, E-LAN, E-Tree)",
    billingUnit: "Per circuit, monthly",
    price: 92.0,
    inventory: "in-stock",
    description:
      "Private Layer 2 Ethernet from 10 Mbps to 100 Gbps over a protected Ethernet ring core, monitored around the clock by the IRIS NOC. Extend your reach to remote customer locations, cell towers, and small cells with true route diversity.",
    category: "Ethernet",
    colorClass: "from-brand-dark to-blue",
  },
  {
    id: "10112",
    name: "Dedicated Internet Access (DIA)",
    billingUnit: "Per port, monthly",
    price: 134.5,
    inventory: "in-stock",
    description:
      "Carrier-grade dedicated internet from 10 Mbps up to 100 Gbps, built on diverse core access points with a faster path to national CDN peering and carrier hotels. Scales from the smallest town to the largest metro areas.",
    category: "Internet",
    colorClass: "from-blue to-primary",
  },
  {
    id: "10203",
    name: "Nashville to Atlanta Wavelength",
    billingUnit: "Per wave, monthly",
    price: 165.0,
    inventory: "low",
    inventoryCount: 6,
    description:
      "Lit wavelength service on the new Nashville-to-Atlanta fiber route, powered by the Ciena 6500 optical platform. A direct path to Atlanta data centers and cloud on-ramps with 10G and 100G circuits, and up to 400G possible. Circuits are limited.",
    category: "Transport",
    colorClass: "from-brand-accent to-brand-coral",
  },
  {
    id: "10245",
    name: "DDoS Protection: Blackholing & Scrubbing",
    billingUnit: "Per protected service, monthly",
    price: 188.0,
    inventory: "in-stock",
    description:
      "Real-time DDoS mitigation designed for ISPs in rural markets. Blackhole and scrubbing options cover multiple protection levels, use cases, and budgets to keep internet connectivity uninterrupted.",
    category: "Security",
    colorClass: "from-brand-dark to-brand-accent",
  },
  {
    id: "10312",
    name: "Dark Fiber (Lease or IRU)",
    billingUnit: "Per route, quoted",
    price: 95.75,
    inventory: "out",
    description:
      "Build your own network on IRIS routes with flexible lease and IRU options. Dark fiber lets you add capacity, reduce latency, and reach underserved rural markets without long permitting lead times or build cost overruns.",
    category: "Transport",
    colorClass: "from-primary to-blue-dark",
  },
];
