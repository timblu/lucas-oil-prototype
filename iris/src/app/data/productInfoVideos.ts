export type ProductInfoVideoTopic =
  | "Network"
  | "Internet"
  | "Ethernet"
  | "Transport"
  | "Security"
  | "Industries"
  | "Support";

export type ProductInfoVideo = {
  id: string;
  title: string;
  description: string;
  topic: ProductInfoVideoTopic;
};

export const PRODUCT_INFO_VIDEOS: ProductInfoVideo[] = [
  {
    id: "network-overview",
    title: "The IRIS Network: 5,000+ Route Miles Across Tennessee & Beyond",
    description:
      "How a carrier's carrier fiber backbone reaches over 250 communities in Tennessee, Alabama, Georgia, Kentucky, and Virginia.",
    topic: "Network",
  },
  {
    id: "dia",
    title: "Dedicated Internet Access (DIA): 10 Mbps to 100 Gbps",
    description:
      "Where DIA fits, how diverse core access points work, and the path to national CDN peering and carrier hotels.",
    topic: "Internet",
  },
  {
    id: "carrier-ethernet",
    title: "Carrier Ethernet Explained: E-Line, E-LAN & E-Tree",
    description:
      "Private Layer 2 services over a protected Ethernet ring, with Ethernet NNI options for cell towers and remote locations.",
    topic: "Ethernet",
  },
  {
    id: "wavelengths",
    title: "Wavelength Transport: 1G to 400G with Route Diversity",
    description:
      "Lit services for new POPs, colocation facilities, data centers, and cell sites, with protected and encrypted wave options.",
    topic: "Transport",
  },
  {
    id: "nashville-atlanta",
    title: "Nashville to Atlanta Route: 10G, 100G & 400G Waves",
    description:
      "A walkthrough of the new Ciena 6500 route with a direct path to Atlanta data centers and cloud on-ramps.",
    topic: "Transport",
  },
  {
    id: "dark-fiber",
    title: "Dark Fiber Leases & IRUs: Build Your Network on IRIS Routes",
    description:
      "When to choose dark fiber, how lease and IRU options work, and how it reaches underserved rural markets.",
    topic: "Transport",
  },
  {
    id: "ddos",
    title: "DDoS Protection: Blackholing vs. Scrubbing",
    description:
      "Choosing between blackhole and scrubbing protection for ISPs, including rural markets and different budgets.",
    topic: "Security",
  },
  {
    id: "business-broadband",
    title: "Business Broadband Internet: 1 Gbps in Select Tennessee Markets",
    description:
      "Positioning broadband business internet for Nashville, Knoxville, and Oak Ridge locations where DIA isn't an option.",
    topic: "Internet",
  },
  {
    id: "business-voice",
    title: "Hosted Voice & Work-from-Anywhere Solutions",
    description:
      "Flexible business phone service with advanced PBX functionality, desktop phones, and mobile apps for distributed teams.",
    topic: "Internet",
  },
  {
    id: "industry-solutions",
    title: "Selling to Education, Healthcare, Government & Financial Services",
    description:
      "Talking points and use cases for the industries IRIS serves, from telemedicine connectivity to public-sector security.",
    topic: "Industries",
  },
  {
    id: "network-assessment",
    title: "Quoting Custom Solutions & Network Assessments",
    description:
      "How to gather requirements, request an assessment, and work with the IRIS team on a tailored design.",
    topic: "Support",
  },
  {
    id: "local-support",
    title: "24/7 Local Support: NOC Monitoring & Escalations",
    description:
      "How the IRIS Network Operations Center and local technicians support your customers, and when to escalate.",
    topic: "Support",
  },
];

const TOPIC_GRADIENTS: Record<ProductInfoVideoTopic, string> = {
  Network: "from-brand-dark via-primary to-blue",
  Internet: "from-primary to-brand-accent",
  Ethernet: "from-brand-dark to-blue",
  Transport: "from-brand-accent to-brand-coral",
  Security: "from-brand-dark via-brand-accent to-brand-coral",
  Industries: "from-blue-dark to-primary",
  Support: "from-primary via-brand-accent to-brand-coral",
};

export function productInfoVideoGradient(topic: ProductInfoVideoTopic) {
  return TOPIC_GRADIENTS[topic];
}
