import { useState, useRef, useEffect } from "react";
import imgLucasOil from "../imports/Logo/lucas-oil-badge.png";
import imgLucasOil2x from "../imports/Logo/lucas-oil-badge@2x.png";
import { MarketingBannerCarousel } from "./components/MarketingBannerCarousel";
import { MARKETING_BANNER_IMAGES } from "./data/marketingBannerImages";
import {
  Search,
  Package,
  FileText,
  Phone,
  ChevronRight,
  ArrowLeft,
  Paperclip,
  Send,
  Plus,
  Truck,
  Check,
  Clock,
  AlertCircle,
  Filter,
  X,
  User,
  MessageCircle,
  LayoutGrid,
  ChevronDown,
  Download,
  FileDown,
  Image,
  BookOpen,
  Tag,
  ShoppingBag,
  MapPin,
  Calendar,
  Hash,
  Star,
  Layers,
  ChevronLeft,
  Info,
  Mail,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type View =
  | "login"
  | "dashboard"
  | "orders"
  | "order-detail"
  | "catalog"
  | "product-detail"
  | "cases"
  | "new-case"
  | "case-detail"
  | "account"
  | "tracking"
  | "knowledge-hub"
  | "marketing-collateral";

interface Order {
  id: string;
  date: string;
  po: string;
  shipTo: string;
  status:
    | "Received"
    | "Picked"
    | "Shipping"
    | "Out for Delivery"
    | "Delivered";
  total: number;
}

interface OrderItem {
  itemNum: string;
  description: string;
  qty: number;
  unitPrice: number;
}

interface TrackingEvent {
  timestamp: string;
  location: string;
  description: string;
  done: boolean;
}

interface Product {
  id: string;
  name: string;
  caseQty: string;
  price: number;
  inventory: "in-stock" | "low" | "out";
  inventoryCount?: number;
  description: string;
  category: string;
  colorClass: string;
}

interface Case {
  id: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  lastUpdated: string;
  orderId?: string;
}

interface Message {
  id: string;
  sender: "agent" | "you";
  agentName?: string;
  timestamp: string;
  body: string;
}

// ─── Seed Data ─────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
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
  },
  {
    id: "SO-10043",
    date: "03/18/26",
    po: "PO-8840",
    shipTo: "Tampa WD",
    status: "Shipping",
    total: 980,
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
];

const ORDER_ITEMS: OrderItem[] = [
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
];

const TRACKING_EVENTS: Record<string, TrackingEvent[]> = {
  "SO-10041": [
    {
      timestamp: "03/14/26 2:18 PM",
      location: "Dallas, TX",
      description: "Delivered",
      done: true,
    },
    {
      timestamp: "03/14/26 7:45 AM",
      location: "Dallas, TX",
      description: "Out for delivery",
      done: true,
    },
    {
      timestamp: "03/14/26 2:30 AM",
      location: "Dallas, TX",
      description: "Arrived at local delivery facility",
      done: true,
    },
    {
      timestamp: "03/13/26 9:15 PM",
      location: "Fort Worth, TX",
      description: "Departed UPS hub",
      done: true,
    },
    {
      timestamp: "03/13/26 4:50 PM",
      location: "Fort Worth, TX",
      description: "Arrived at UPS hub",
      done: true,
    },
    {
      timestamp: "03/13/26 8:00 AM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
  ],
  "SO-10042": [
    {
      timestamp: "03/21/26 6:02 AM",
      location: "Reno, NV",
      description: "Out for delivery",
      done: true,
    },
    {
      timestamp: "03/21/26 1:15 AM",
      location: "Reno, NV",
      description: "Arrived at local delivery facility",
      done: true,
    },
    {
      timestamp: "03/20/26 3:12 AM",
      location: "Salt Lake City, UT",
      description: "Departed UPS hub",
      done: true,
    },
    {
      timestamp: "03/19/26 9:30 PM",
      location: "Salt Lake City, UT",
      description: "Arrived at UPS hub",
      done: true,
    },
    {
      timestamp: "03/19/26 2:00 PM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
    {
      timestamp: "03/22/26 (est.)",
      location: "Reno, NV",
      description: "Scheduled delivery",
      done: false,
    },
  ],
  "SO-10043": [
    {
      timestamp: "03/20/26 11:40 PM",
      location: "Phoenix, AZ",
      description: "Departed UPS hub — in transit to Tampa",
      done: true,
    },
    {
      timestamp: "03/20/26 3:55 PM",
      location: "Phoenix, AZ",
      description: "Arrived at UPS hub",
      done: true,
    },
    {
      timestamp: "03/19/26 10:00 AM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
    {
      timestamp: "03/22/26 (est.)",
      location: "Tampa, FL",
      description: "Scheduled delivery",
      done: false,
    },
  ],
  "SO-10044": [
    {
      timestamp: "03/19/26 3:44 PM",
      location: "Boise, ID",
      description: "Delivered",
      done: true,
    },
    {
      timestamp: "03/19/26 8:10 AM",
      location: "Boise, ID",
      description: "Out for delivery",
      done: true,
    },
    {
      timestamp: "03/19/26 12:30 AM",
      location: "Boise, ID",
      description: "Arrived at local delivery facility",
      done: true,
    },
    {
      timestamp: "03/18/26 6:20 PM",
      location: "Portland, OR",
      description: "Departed UPS hub",
      done: true,
    },
    {
      timestamp: "03/18/26 11:05 AM",
      location: "Portland, OR",
      description: "Arrived at UPS hub",
      done: true,
    },
    {
      timestamp: "03/18/26 7:00 AM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
  ],
  "SO-10045": [
    {
      timestamp: "03/23/26 8:15 AM",
      location: "Corona, CA",
      description: "Shipment picked up",
      done: true,
    },
    {
      timestamp: "03/24/26 (est.)",
      location: "Denver, CO",
      description: "Scheduled delivery",
      done: false,
    },
  ],
};

const PRODUCTS: Product[] = [
  {
    id: "10087",
    name: "Hi-Perf 10W-30 Motor Oil",
    caseQty: "12 qt / case",
    price: 78.5,
    inventory: "in-stock",
    inventoryCount: 124,
    description:
      "Lucas Oil Hi-Performance 10W-30 semi-synthetic engine oil. Recommended for passenger cars and light trucks. Meets API SN. Excellent high-temperature stability and wear protection.",
    category: "Motor Oil",
    colorClass: "from-[#D8D8D8] to-[#C0C0C0]",
  },
  {
    id: "10091",
    name: "Marine Gear Lube 80W-90",
    caseQty: "12 qt / case",
    price: 92.0,
    inventory: "in-stock",
    inventoryCount: 88,
    description:
      "Heavy-duty marine gear lubricant for stern drives, inboard/outboards, and differentials. Meets API GL-4 and GL-5 specifications. Resists water washout.",
    category: "Gear Oil",
    colorClass: "from-[#CACACA] to-[#AAAAAA]",
  },
  {
    id: "10112",
    name: "Fuel Treatment 32oz",
    caseQty: "24 bt / case",
    price: 134.5,
    inventory: "low",
    inventoryCount: 6,
    description:
      "Multi-purpose fuel treatment. Cleans injectors, carburetors, and combustion chambers. For gas and diesel engines. One bottle treats up to 100 gallons.",
    category: "Additives",
    colorClass: "from-[#D0D0D0] to-[#B8B8B8]",
  },
  {
    id: "10203",
    name: "Synthetic 5W-30 Motor Oil",
    caseQty: "6 gal / case",
    price: 165.0,
    inventory: "in-stock",
    inventoryCount: 42,
    description:
      "Full synthetic 5W-30 motor oil for modern engines requiring low-viscosity lubrication. Exceeds API SP requirements. Superior cold-weather starting.",
    category: "Motor Oil",
    colorClass: "from-[#D8D8D8] to-[#BBBBBB]",
  },
  {
    id: "10245",
    name: "Red-N-Tacky Grease",
    caseQty: "30 tub / case",
    price: 188.0,
    inventory: "in-stock",
    inventoryCount: 67,
    description:
      "Red lithium complex grease. Excellent water resistance and high-temperature performance. For bearings, U-joints, and chassis lubrication. NLGI #2 grade.",
    category: "Grease",
    colorClass: "from-[#C8C8C8] to-[#AAAAAA]",
  },
  {
    id: "10312",
    name: "Heavy Duty ATF",
    caseQty: "12 qt / case",
    price: 95.75,
    inventory: "out",
    description:
      "Automatic transmission fluid for heavy-duty trucks and performance applications. Meets Allison TES-295 and GM Dexron III/VI. Reduces heat and friction.",
    category: "Transmission",
    colorClass: "from-[#BEBEBE] to-[#A0A0A0]",
  },
];

const CASES: Case[] = [
  {
    id: "CS-2041",
    subject: "Damaged case on delivery",
    status: "Open",
    lastUpdated: "03/22/26",
    orderId: "SO-10041",
  },
  {
    id: "CS-2039",
    subject: "Missing item — short-shipped 2 cases",
    status: "In Progress",
    lastUpdated: "03/21/26",
    orderId: "SO-10042",
  },
  {
    id: "CS-2031",
    subject: "Request MSDS sheet #10245",
    status: "Resolved",
    lastUpdated: "03/18/26",
  },
  {
    id: "CS-2028",
    subject: "Wrong ship-to on last PO",
    status: "Resolved",
    lastUpdated: "03/16/26",
  },
  {
    id: "CS-2020",
    subject: "Q about case-pack breakdown",
    status: "Closed",
    lastUpdated: "03/12/26",
  },
  {
    id: "CS-2015",
    subject: "Marketing collateral request",
    status: "Open",
    lastUpdated: "03/10/26",
  },
  {
    id: "CS-2011",
    subject: "Return authorization ask",
    status: "In Progress",
    lastUpdated: "03/07/26",
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "agent",
    agentName: "A. Reyes",
    timestamp: "03/22 2:14p",
    body: "Thanks — can you confirm the lot # affected?",
  },
  {
    id: "2",
    sender: "you",
    timestamp: "03/22 3:02p",
    body: "Lot #A22-0345. Packing slip photo attached.",
  },
  {
    id: "3",
    sender: "agent",
    agentName: "A. Reyes",
    timestamp: "03/23 9:10a",
    body: "Got it — credit for 3 cases issued today.",
  },
];

const COLLATERAL = [
  {
    id: "1",
    title: "2026 Product Catalog",
    type: "PDF",
    size: "4.2 MB",
    pages: 48,
    icon: <BookOpen size={20} />,
    updated: "01/15/26",
    description:
      "Full distributor product catalog covering the complete 2026 lineup — motor oils, gear lubes, additives, and specialty fluids. Includes item numbers, case quantities, and suggested retail pricing.",
    previewColor: "bg-primary",
    previewLabel: "PRODUCT CATALOG 2026",
  },
  {
    id: "2",
    title: "Hi-Perf Motor Oil Line Sheet",
    type: "PDF",
    size: "1.1 MB",
    pages: 2,
    icon: <FileDown size={20} />,
    updated: "02/03/26",
    description:
      "Two-page sell sheet for the high-performance motor oil range. Designed for counter sales and trade events. Covers viscosity grades, approvals (API, ILSAC), and key differentiators.",
    previewColor: "bg-foreground",
    previewLabel: "HI-PERF MOTOR OIL",
  },
  {
    id: "3",
    title: "Lucas Oil Brand Standards",
    type: "PDF",
    size: "8.7 MB",
    pages: 32,
    icon: <Star size={20} />,
    updated: "12/10/25",
    description:
      "Official brand guidelines for all distributor co-marketing use. Includes logo usage rules, color palette, typography, photography direction, and approved tagline variations.",
    previewColor: "bg-primary",
    previewLabel: "BRAND STANDARDS",
  },
  {
    id: "4",
    title: "Additive Product Sell Sheet",
    type: "PDF",
    size: "980 KB",
    pages: 2,
    icon: <Tag size={20} />,
    updated: "03/01/26",
    description:
      "Counter-ready two-page overview of the additive lineup including fuel treatments, engine oil supplements, and transmission conditioners. Features OEM-approved callouts and typical use cases.",
    previewColor: "bg-foreground",
    previewLabel: "ADDITIVE LINE",
  },
  {
    id: "5",
    title: "Trade Show Booth Graphics",
    type: "ZIP",
    size: "22 MB",
    pages: null,
    icon: <Image size={20} />,
    updated: "02/20/26",
    description:
      "Print-ready booth graphics package for trade shows and distributor events. Includes 10×10 and 10×20 backwall artwork, banner stands, table throws, and product spotlight panels at 300 dpi.",
    previewColor: "bg-muted",
    previewLabel: "BOOTH GRAPHICS",
  },
  {
    id: "6",
    title: "MSDS / SDS Sheet Bundle",
    type: "ZIP",
    size: "6.3 MB",
    pages: null,
    icon: <Layers size={20} />,
    updated: "03/10/26",
    description:
      "Compliance bundle containing Safety Data Sheets for the full product range. Required for retail shelf placement and commercial accounts. Updated to GHS/HazCom 2012 format.",
    previewColor: "bg-muted",
    previewLabel: "SDS BUNDLE",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function fmtShort(n: number) {
  return (
    "$" +
    n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

// ─── Shared Components ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Received: "bg-[#E4E4E4] text-[#555] ring-1 ring-[#ccc]",
    Picked: "bg-[#E4E4E4] text-[#333] ring-1 ring-[#ccc]",
    Shipping: "bg-[#E4E4E4] text-[#111] ring-1 ring-[#ccc]",
    "Out for Delivery":
      "bg-[#111] text-white ring-1 ring-[#111]",
    Delivered: "bg-white text-[#111] ring-1 ring-[#bbb]",
    Open: "bg-[#111] text-white ring-1 ring-[#111]",
    "In Progress": "bg-[#555] text-white ring-1 ring-[#555]",
    Resolved: "bg-white text-[#111] ring-1 ring-[#bbb]",
    Closed: "bg-[#E4E4E4] text-[#777] ring-1 ring-[#ddd]",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold tracking-wide ${map[status] ?? "bg-[#E4E4E4] text-[#555]"}`}
    >
      {status}
    </span>
  );
}

function InvBadge({
  inv,
  count,
}: {
  inv: string;
  count?: number;
}) {
  if (inv === "in-stock")
    return (
      <span className="text-xs font-medium text-[#333]">
        In Stock {count ? `(${count})` : ""}
      </span>
    );
  if (inv === "low")
    return (
      <span className="text-xs font-medium text-[#555] italic">
        Low — {count} left
      </span>
    );
  return (
    <span className="text-xs font-medium text-[#777] line-through">
      Out of Stock
    </span>
  );
}

function PageHeader({
  title,
  back,
  onBack,
  action,
}: {
  title: string;
  back?: string;
  onBack?: () => void;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {back && onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            {back}
          </button>
        )}
        {!back && (
          <h1 className="text-xl font-semibold text-foreground">
            {title}
          </h1>
        )}
        {back && (
          <span className="text-muted-foreground/40 text-sm">
            ·
          </span>
        )}
        {back && (
          <h1 className="text-xl font-semibold text-foreground">
            {title}
          </h1>
        )}
      </div>
      {action}
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-card rounded-lg border border-border shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Lucas Oil Logo ───────────────────────────────────────────────────────────

function LucasOilLogo({ height = 32 }: { height?: number }) {
  const width = Math.round(height * (176 / 96));

  return (
    <img
      src={imgLucasOil}
      srcSet={`${imgLucasOil} 1x, ${imgLucasOil2x} 2x`}
      alt="Lucas Oil"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      className="block"
    />
  );
}

// ─── Top Navigation ────────────────────────────────────────────────────────────

function TopNav({
  view,
  onNav,
}: {
  view: View;
  onNav: (v: View) => void;
}) {
  const links: { label: string; view: View }[] = [
    { label: "Orders", view: "orders" },
    { label: "Catalog", view: "catalog" },
    { label: "Cases", view: "cases" },
    { label: "Account", view: "account" },
  ];
  const activeGroup = (v: View) => {
    if (v === "orders" || v === "order-detail") return "orders";
    if (v === "catalog" || v === "product-detail")
      return "catalog";
    if (
      v === "cases" ||
      v === "new-case" ||
      v === "case-detail"
    )
      return "cases";
    return v;
  };

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-[rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-6">
        <button
          onClick={() => onNav("dashboard")}
          className="flex items-center gap-1.5 mr-2 shrink-0"
        >
          <LucasOilLogo />
        </button>
        <div className="h-5 w-px bg-[rgba(0,0,0,0.12)]" />
        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const active = activeGroup(view) === l.view;
            return (
              <button
                key={l.view}
                onClick={() => onNav(l.view)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#111] text-white"
                    : "text-[#666] hover:text-[#111] hover:bg-[#F2F2F2]"
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E4E4E4] flex items-center justify-center text-xs font-semibold text-[#444]">
              JM
            </div>
            <span className="text-sm text-[#777] hidden sm:block">
              Reno WD
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("demo@lucasoil.com");
  const [password, setPassword] = useState("lucas2026");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 900);
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <LucasOilLogo height={48} />
          </div>
          <p className="text-[#888] text-sm tracking-wide uppercase">
            Distributor Portal
          </p>
        </div>

        <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-8">
          <h2 className="text-[#111] text-lg font-semibold mb-6">
            Partner Sign In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#888] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={() => {
                  if (!email) setEmail("demo@lucasoil.com");
                }}
                placeholder="you@distributor.com"
                className="w-full bg-[#EBEBEB] border border-[rgba(0,0,0,0.1)] rounded-lg px-3.5 py-2.5 text-[#111] placeholder-[#aaa] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#888]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[#555] hover:text-[#111] underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={() => {
                  if (!password) setPassword("lucas2026");
                }}
                placeholder="••••••••"
                className="w-full bg-[#EBEBEB] border border-[rgba(0,0,0,0.1)] rounded-lg px-3.5 py-2.5 text-[#111] placeholder-[#aaa] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
              />
            </div>
            <button
              type="submit"
              disabled={
                loading || !email.trim() || !password.trim()
              }
              className="w-full bg-primary hover:bg-[var(--primary-dark)] disabled:opacity-50 text-primary-foreground font-semibold py-2.5 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#aaa] text-xs mt-5 leading-relaxed">
          Need access?{" "}
          <span className="text-[#777]">
            Contact your Lucas Oil rep.
          </span>
        </p>
      </div>
    </div>
  );
}

// ─── Collateral Preview Modal ─────────────────────────────────────────────────

function CollateralPreviewModal({
  item,
  onClose,
  onRequestPrinted,
}: {
  item: (typeof COLLATERAL)[number];
  onClose: () => void;
  onRequestPrinted?: (itemTitle: string) => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isZip = item.type === "ZIP";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mock document preview */}
        <div
          className={`${item.previewColor} px-8 pt-10 pb-8 flex flex-col gap-4`}
        >
          {/* Simulated document header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div
                className={`h-2 w-16 rounded-full ${item.previewColor === "bg-muted" ? "bg-border" : "bg-primary-foreground/30"}`}
              />
              <div
                className={`h-4 w-48 rounded-full ${item.previewColor === "bg-muted" ? "bg-foreground/15" : "bg-primary-foreground/70"}`}
              />
              <div
                className={`h-2 w-32 rounded-full ${item.previewColor === "bg-muted" ? "bg-border" : "bg-primary-foreground/30"}`}
              />
            </div>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.previewColor === "bg-muted" ? "bg-border" : "bg-primary-foreground/20"}`}
            >
              {item.icon}
            </div>
          </div>
          {/* Simulated body lines */}
          <div className="space-y-1.5 pt-2">
            {[80, 95, 70, 88, 60].map((w, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${item.previewColor === "bg-muted" ? "bg-border" : "bg-primary-foreground/20"}`}
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          {/* Simulated grid of content blocks */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-14 rounded-lg ${item.previewColor === "bg-muted" ? "bg-border/60" : "bg-primary-foreground/15"}`}
              />
            ))}
          </div>
          {/* Document label badge */}
          <div className="flex items-center gap-2 pt-1">
            <span
              className={`text-xs font-semibold tracking-widest uppercase ${item.previewColor === "bg-muted" ? "text-muted-foreground" : "text-primary-foreground/60"}`}
            >
              {item.previewLabel}
            </span>
          </div>
        </div>

        {/* Info + actions */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-medium text-foreground">
                {item.title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
                  {item.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.size}
                </span>
                {item.pages && (
                  <>
                    <span className="text-muted-foreground/40">
                      ·
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.pages} pages
                    </span>
                  </>
                )}
                <span className="text-muted-foreground/40">
                  ·
                </span>
                <span className="text-xs text-muted-foreground">
                  Updated {item.updated}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button className="flex items-center gap-2 bg-primary hover:bg-[var(--primary-dark)] text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              <Download size={14} />
              {isZip ? "Download ZIP" : "Download PDF"}
            </button>
            {onRequestPrinted && (
              <button
                type="button"
                onClick={() => onRequestPrinted(item.title)}
                className="flex items-center gap-2 border border-border hover:border-[#555]/25 hover:bg-muted text-foreground text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <Send size={14} />
                Request printed copies
              </button>
            )}
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground px-4 py-2.5 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Knowledge Hub & Marketing Collateral ─────────────────────────────────────

const KNOWLEDGE_HUB_ITEMS = [
  {
    id: "catalog",
    title: "Product Catalog",
    description: "Browse SKUs, specs, and case pack details for the full lineup.",
    icon: <LayoutGrid size={20} />,
    action: "catalog" as const,
  },
  {
    id: "bulletins",
    title: "Technical Bulletins",
    description: "Application notes, OEM approvals, and formulation updates.",
    icon: <FileText size={20} />,
    action: null,
  },
  {
    id: "training",
    title: "Distributor Training",
    description: "Counter sales guides, product positioning, and onboarding modules.",
    icon: <BookOpen size={20} />,
    action: null,
  },
  {
    id: "sds",
    title: "SDS / Safety Data",
    description: "Searchable safety data sheets by product and SKU.",
    icon: <Layers size={20} />,
    action: null,
  },
];

function KnowledgeHubPage({
  onBack,
  onNav,
}: {
  onBack: () => void;
  onNav: (v: View) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = KNOWLEDGE_HUB_ITEMS.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.id.includes(q)
    );
  });

  return (
    <>
      <section
        aria-label="Knowledge Hub"
        className="relative w-full min-h-[280px] sm:min-h-[300px] md:min-h-[340px] overflow-hidden border-b border-border"
      >
        <img
          src={MARKETING_BANNER_IMAGES.productCatalog}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[#0a1628]/55 mix-blend-multiply"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25"
          aria-hidden
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col justify-center min-h-[inherit]">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors group w-fit mb-6"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to Dashboard
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl">
            Knowledge Hub
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/85 max-w-xl leading-relaxed">
            Product specs, training, and technical resources for your team.
          </p>

          <div className="relative mt-6 sm:mt-8 w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources, bulletins, training…"
              aria-label="Search knowledge hub resources"
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white text-foreground border border-white/20 rounded-xl text-sm sm:text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50 placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">
            No resources match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => item.action && onNav(item.action)}
                className="bg-card border border-border rounded-xl p-5 text-left hover:shadow-md hover:border-[#999]/40 transition-all group flex gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors text-foreground">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-foreground">
                    {item.title}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 leading-snug">
                    {item.description}
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function MarketingCollateralPage({
  onBack,
  onRequestCollateral,
}: {
  onBack: () => void;
  onRequestCollateral: (itemTitle?: string) => void;
}) {
  const [previewItem, setPreviewItem] = useState<
    (typeof COLLATERAL)[number] | null
  >(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title="Marketing Collateral"
        back="Back to Dashboard"
        onBack={onBack}
      />
      <p className="text-sm text-muted-foreground -mt-4 mb-6">
        Downloads available to your distributor account
      </p>

      <div className="bg-card border border-border rounded-xl p-5 mb-8 flex flex-col lg:flex-row lg:items-center gap-5">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[#111]/8 flex items-center justify-center shrink-0">
            <Package size={20} className="text-[#111]" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-foreground">
              Order printed collateral
            </h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Files below are digital downloads. For printed catalogs, sell
              sheets, booth graphics, and signage, contact the marketing team or
              submit a request — we&apos;ll ship to your distributor account
              address.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
              <a
                href="mailto:marketing@lucasoil.com?subject=Marketing%20collateral%20order"
                className="flex items-center gap-1.5 text-[#111] font-medium hover:underline"
              >
                <Mail size={14} />
                marketing@lucasoil.com
              </a>
              <span className="text-muted-foreground/40 hidden sm:inline">
                ·
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Phone size={14} />
                800-342-2512 x310
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onRequestCollateral()}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-[var(--primary-dark)] text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shrink-0"
        >
          <Send size={15} />
          Request collateral
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {COLLATERAL.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPreviewItem(item)}
            className="bg-card border border-border rounded-lg p-4 flex flex-col items-start gap-3 hover:border-[#555]/25 hover:shadow-sm transition-all group text-left"
          >
            <div className="w-9 h-9 rounded-md bg-[#111]/8 flex items-center justify-center text-[#111] group-hover:bg-[#111]/15 transition-colors shrink-0">
              {item.icon}
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground leading-tight">
                {item.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.type} · {item.size}
              </div>
            </div>
            <div className="mt-auto flex items-center gap-1 text-[#111] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <Download size={11} /> Preview
            </div>
          </button>
        ))}
      </div>
      {previewItem && (
        <CollateralPreviewModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
          onRequestPrinted={(title) => {
            setPreviewItem(null);
            onRequestCollateral(title);
          }}
        />
      )}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({
  onNav,
  onOrder,
  onCase,
}: {
  onNav: (v: View) => void;
  onOrder: (id: string) => void;
  onCase: (id: string) => void;
}) {
  const recentOrders = ORDERS.slice(0, 3);
  const openCases = CASES.filter(
    (c) => c.status === "Open" || c.status === "In Progress",
  ).slice(0, 3);

  const featuredOrder =
    ORDERS.find((o) => o.status === "Out for Delivery") ??
    ORDERS.find((o) => o.status === "Shipping") ??
    ORDERS.find((o) => o.status === "Picked") ??
    ORDERS.find((o) => o.status === "Received") ??
    ORDERS[0];

  const steps = [
    "Received",
    "Picked",
    "Shipping",
    "Out for Delivery",
    "Delivered",
  ] as const;
  const stepIdx = Math.max(
    0,
    steps.indexOf(
      featuredOrder.status as (typeof steps)[number],
    ),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome, <span className="text-[#111]">Reno WD</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Your distributor dashboard — Monday, March 25, 2026
        </p>
      </div>

      {/* Featured active order */}
      <button
        onClick={() => onOrder(featuredOrder.id)}
        className="w-full text-left bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-[#999]/40 transition-all group"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Active Order
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="mono text-xl font-bold text-foreground">
                {featuredOrder.id}
              </span>
              <StatusBadge status={featuredOrder.status} />
            </div>
            <div className="mono text-sm text-muted-foreground mt-1">
              {featuredOrder.po} · {featuredOrder.shipTo} ·{" "}
              {featuredOrder.date}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="mono text-2xl font-bold text-foreground">
              {fmtShort(featuredOrder.total)}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 justify-end group-hover:text-foreground transition-colors">
              View detail <ChevronRight size={12} />
            </div>
          </div>
        </div>

        {/* Tracking step + info */}
        <div className="border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Step indicator */}
          <div className="relative flex-1">
            <div className="absolute top-4 left-0 right-0 h-px bg-muted mx-4" />
            <div
              className="absolute top-4 left-0 h-px bg-[#555] mx-4 transition-all"
              style={{
                right: `${((steps.length - 1 - stepIdx) / (steps.length - 1)) * 100}%`,
              }}
            />
            <div className="relative flex justify-between">
              {steps.map((s, i) => {
                const done = i < stepIdx;
                const active = i === stepIdx;
                return (
                  <div
                    key={s}
                    className="flex flex-col items-center gap-1.5 w-14"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors ${
                        done
                          ? "bg-[#111] border-[#111]"
                          : active
                            ? "bg-card border-[#555]"
                            : "bg-card border-muted"
                      }`}
                    >
                      {done ? (
                        <Check
                          size={13}
                          className="text-white"
                        />
                      ) : active ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#555]" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-muted" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-medium text-center leading-tight ${active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/50"}`}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tracking details */}
          <div className="sm:pl-6 sm:border-l border-border flex items-center gap-4 text-sm shrink-0">
            <div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                Carrier
              </div>
              <div className="font-medium text-foreground">
                UPS
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                Tracking #
              </div>
              <div className="mono text-xs font-medium text-foreground">
                1Z999AA10123456784
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                Est. Delivery
              </div>
              <div className="mono text-sm font-semibold text-foreground">
                03/22/26
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Quick tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => onNav("orders")}
          className="bg-card border border-border rounded-xl px-5 py-4 text-left hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
            <Truck size={20} className="text-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              Recent Orders
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {ORDERS.length}
            </div>
          </div>
        </button>

        <button
          onClick={() => onNav("cases")}
          className="bg-card border border-border rounded-xl px-5 py-4 text-left hover:shadow-md transition-all group flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors">
            <FileText size={20} className="text-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              Open Cases
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {
                CASES.filter(
                  (c) =>
                    c.status === "Open" ||
                    c.status === "In Progress",
                ).length
              }
            </div>
          </div>
        </button>

        <div className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <Phone size={20} className="text-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              Contact Us
            </div>
            <div className="text-base font-semibold text-foreground">
              800-342-2512
            </div>
          </div>
        </div>
        <button
        onClick={() => onNav("new-case")}
        className="bg-primary text-primary-foreground rounded-xl px-5 py-4 text-left hover:bg-[var(--primary-dark)] transition-all group flex items-center gap-4"
      >
        <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/25 transition-colors">
          <Plus size={20} className="text-primary-foreground" />
        </div>
        <div>
          <div className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wider mb-0.5">
            Support
          </div>
          <div className="text-base font-semibold text-primary-foreground">
            Open a New Case
          </div>
        </div>
      </button>
      </div>

      

      {/* Recent Orders + Open Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-base">
              Recent Orders
            </h2>
            <button
              onClick={() => onNav("orders")}
              className="text-xs text-[#111] hover:underline font-medium flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => onOrder(o.id)}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-muted/40 transition-colors text-left group"
              >
                <div>
                  <div className="mono text-sm font-medium text-foreground group-hover:text-[#111] transition-colors">
                    {o.id}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {o.po} · {o.shipTo}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={o.status} />
                  <span className="mono text-sm font-semibold text-foreground">
                    {fmtShort(o.total)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-base">
              Open Cases
            </h2>
            <button
              onClick={() => onNav("cases")}
              className="text-xs text-[#111] hover:underline font-medium flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-border">
            {openCases.map((c) => (
              <button
                key={c.id}
                onClick={() => onCase(c.id)}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-muted/40 transition-colors text-left group"
              >
                <div>
                  <div className="mono text-sm font-medium text-foreground group-hover:text-[#111] transition-colors">
                    {c.id}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[220px]">
                    {c.subject}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={c.status} />
                  <span className="text-xs text-muted-foreground">
                    {c.lastUpdated}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onNav("knowledge-hub")}
          className="bg-card border border-border rounded-xl px-6 py-10 text-left hover:shadow-md hover:border-[#999]/40 transition-all group flex flex-col gap-4 min-h-[180px]"
        >
          <div className="w-12 h-12 rounded-xl bg-[#111]/8 flex items-center justify-center text-[#111] group-hover:bg-[#111]/15 transition-colors">
            <BookOpen size={26} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Knowledge Hub
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 leading-snug">
              Product specs, training, and technical resources
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-[#111] mt-auto">
            Open hub <ChevronRight size={16} />
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNav("marketing-collateral")}
          className="bg-card border border-border rounded-xl px-6 py-10 text-left hover:shadow-md hover:border-[#999]/40 transition-all group flex flex-col gap-4 min-h-[180px]"
        >
          <div className="w-12 h-12 rounded-xl bg-[#111]/8 flex items-center justify-center text-[#111] group-hover:bg-[#111]/15 transition-colors">
            <Download size={26} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Marketing Collateral
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 leading-snug">
              Catalogs, line sheets, brand assets, and booth graphics
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-[#111] mt-auto">
            View downloads <ChevronRight size={16} />
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Orders List ──────────────────────────────────────────────────────────────

function OrdersList({
  onOrder,
}: {
  onOrder: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = ORDERS.filter((o) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.po.toLowerCase().includes(q) ||
      o.shipTo.toLowerCase().includes(q);
    const matchS =
      statusFilter === "All" || o.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Orders" />

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders…"
            className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-card border border-border rounded-lg pl-3 pr-8 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {[
              "All",
              "Received",
              "Picked",
              "Shipping",
              "Out for Delivery",
              "Delivered",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Order #",
                  "Date",
                  "PO #",
                  "Ship-to",
                  "Status",
                  "Total",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3.5"
                  >
                    {h}
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => onOrder(o.id)}
                  className="hover:bg-muted/30 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-4 mono text-sm font-medium text-[#111] group-hover:text-[#333]">
                    {o.id}
                  </td>
                  <td className="px-5 py-4 mono text-sm text-foreground">
                    {o.date}
                  </td>
                  <td className="px-5 py-4 mono text-sm text-muted-foreground">
                    {o.po}
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground">
                    {o.shipTo}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-4 mono text-sm font-semibold text-foreground">
                    {fmtShort(o.total)}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    <ChevronRight
                      size={15}
                      className="opacity-30 group-hover:opacity-80 transition-opacity"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No orders match your search.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// ─── Tracking Placeholder ─────────────────────────────────────────────────────

function TrackingPlaceholder({
  trackingNumber,
  carrier,
  onBack,
}: {
  trackingNumber: string;
  carrier: string;
  onBack: () => void;
}) {
  const steps = [
    {
      label: "Order picked up",
      date: "Mar 18, 2026",
      done: true,
    },
    {
      label: "In transit — Cincinnati, OH",
      date: "Mar 19, 2026",
      done: true,
    },
    {
      label: "Out for delivery",
      date: "Mar 21, 2026",
      done: true,
    },
    { label: "Delivered", date: "Mar 22, 2026", done: false },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft size={16} /> Back to order
      </button>

      {/* Header card */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Shipment tracking
        </p>
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h1 className="text-xl font-medium text-foreground">
            {carrier}
          </h1>
          <span className="mono text-sm text-blue font-medium">
            {trackingNumber}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 bg-blue-light text-blue-dark text-xs font-medium px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            Out for delivery
          </span>
          <span className="text-xs text-muted-foreground">
            Est. delivery Mar 22, 2026
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-sm font-medium text-foreground mb-5">
          Tracking history
        </h2>
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 mt-0.5 shrink-0 ${
                    step.done
                      ? "bg-blue border-blue"
                      : "bg-card border-border"
                  }`}
                />
                {i < steps.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 my-1 ${step.done ? "bg-blue-muted" : "bg-border"}`}
                  />
                )}
              </div>
              <div
                className={`pb-5 ${i === steps.length - 1 ? "pb-0" : ""}`}
              >
                <p
                  className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder notice */}
      <div className="bg-muted border border-border rounded-xl px-5 py-4 flex items-start gap-3">
        <Info
          size={15}
          className="text-muted-foreground shrink-0 mt-0.5"
        />
        <p className="text-xs text-muted-foreground leading-relaxed">
          This is a placeholder tracking page. In production,
          live shipment data from {carrier} will display here.
        </p>
      </div>
    </div>
  );
}

// ─── Order Detail ─────────────────────────────────────────────────────────────

function OrderDetail({
  orderId,
  onBack,
  onTrack,
  onOpenCase,
  onCase,
}: {
  orderId: string;
  onBack: () => void;
  onTrack: () => void;
  onOpenCase: (orderId: string) => void;
  onCase: (caseId: string) => void;
}) {
  const order =
    ORDERS.find((o) => o.id === orderId) ?? ORDERS[1];
  const items = ORDER_ITEMS;
  const subtotal = items.reduce(
    (s, i) => s + i.qty * i.unitPrice,
    0,
  );
  const tax = 156.0;
  const shipping = 54.0;
  const total = subtotal + tax + shipping;

  const steps = [
    "Received",
    "Picked",
    "Shipping",
    "Out for Delivery",
    "Delivered",
  ];
  const stepIdx = Math.max(0, steps.indexOf(order.status));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title={`${order.id}  —  ${order.date}`}
        back="Back to Orders"
        onBack={onBack}
      />

      {/* Tracking card */}
      <Card className="mb-5 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
              Tracking
            </div>
            {order.status === "Received" ||
            order.status === "Picked" ? (
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                  Tracking pending — not yet shipped
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">
                  UPS
                </span>
                <button
                  onClick={onTrack}
                  className="mono text-sm text-blue font-medium underline decoration-dotted underline-offset-2 hover:text-blue-dark transition-colors"
                >
                  1Z999AA10123456784
                </button>
              </div>
            )}
            {order.status !== "Received" &&
              order.status !== "Picked" && (
                <div className="text-xs text-muted-foreground mt-1">
                  Est. delivery:{" "}
                  <span className="text-foreground font-medium">
                    03/22/26
                  </span>
                </div>
              )}
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted mx-6" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-[#111] mx-6 transition-all"
            style={{
              right: `${((steps.length - 1 - stepIdx) / (steps.length - 1)) * 100}%`,
            }}
          />
          <div className="relative flex justify-between">
            {steps.map((s, i) => {
              const done = i < stepIdx;
              const active = i === stepIdx;
              return (
                <div
                  key={s}
                  className="flex flex-col items-center gap-2 w-14"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors ${
                      done
                        ? "bg-[#111] border-[#555]"
                        : active
                          ? "bg-white border-[#555]"
                          : "bg-white border-muted"
                    }`}
                  >
                    {done ? (
                      <Check size={14} className="text-white" />
                    ) : active ? (
                      <div className="w-3 h-3 rounded-full bg-[#111]" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-muted" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium text-center leading-tight ${active ? "text-[#111]" : done ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transit event timeline */}
        {(() => {
          const events = TRACKING_EVENTS[order.id];
          if (!events) {
            return (
              <p className="text-xs text-muted-foreground mt-5 italic">
                Tracking updates will appear once the shipment
                is picked up.
              </p>
            );
          }
          return (
            <div className="mt-5 border-t border-border pt-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Shipment Activity
              </div>
              <div className="relative">
                {/* Vertical connector */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                <div className="space-y-4">
                  {events.map((ev, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 relative"
                    >
                      <div
                        className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 shrink-0 z-10 ${
                          ev.done
                            ? "bg-[#111] border-[#111]"
                            : "bg-card border-border"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span
                            className={`text-sm font-medium ${ev.done ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {ev.description}
                          </span>
                          {!ev.done && (
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">
                              Scheduled
                            </span>
                          )}
                        </div>
                        <div className="mono text-xs text-muted-foreground mt-0.5">
                          {ev.timestamp}
                          {ev.location && <> · {ev.location}</>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </Card>

      {/* Line items */}
      <Card className="mb-5">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Items
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Item #",
                  "Description",
                  "Qty",
                  "Unit Price",
                  "Line Total",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.itemNum}>
                  <td className="px-5 py-3.5 mono text-sm text-muted-foreground">
                    {item.itemNum}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">
                    {item.description}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm text-foreground">
                    {item.qty}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm text-foreground">
                    {fmt(item.unitPrice)}
                  </td>
                  <td className="px-5 py-3.5 mono text-sm font-medium text-foreground">
                    {fmt(item.qty * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Addresses + Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <MapPin size={12} /> Ship To
          </div>
          <div className="text-sm text-foreground leading-relaxed">
            <div className="font-semibold">Reno WD</div>
            <div className="text-muted-foreground">
              1200 Distribution Dr
            </div>
            <div className="text-muted-foreground">
              Reno, NV 89502
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <FileText size={12} /> Bill To
          </div>
          <div className="text-sm text-foreground leading-relaxed">
            <div className="font-semibold">Reno WD (HQ)</div>
            <div className="text-muted-foreground">
              PO Box 4410
            </div>
            <div className="text-muted-foreground">
              Reno, NV 89505
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Order Summary
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="mono">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="mono">{fmt(tax)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="mono">{fmt(shipping)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span className="mono text-[#111]">
                {fmt(total)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Linked cases */}
      {(() => {
        const linked = CASES.filter((c) => c.orderId === order.id);
        if (linked.length === 0) return null;
        return (
          <div className="mt-5">
            <Card>
              <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
                <FileText size={15} className="text-muted-foreground" />
                <h2 className="font-semibold text-sm">Support Cases</h2>
                <span className="ml-auto text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{linked.length}</span>
              </div>
              <div className="divide-y divide-border">
                {linked.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onCase(c.id)}
                    className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-muted transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{c.subject}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.id} · Updated {c.lastUpdated}</div>
                    </div>
                    <StatusBadge status={c.status} />
                    <ChevronRight size={14} className="text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        );
      })()}

      {/* Open a case for this order */}
      <div className="mt-5 flex items-center justify-between bg-card border border-border rounded-xl px-5 py-4">
        <div>
          <div className="text-sm font-medium text-foreground">Issue with this order?</div>
          <div className="text-xs text-muted-foreground mt-0.5">Open a support case and we'll link it to {order.id} automatically.</div>
        </div>
        <button
          onClick={() => onOpenCase(order.id)}
          className="flex items-center gap-2 bg-primary hover:bg-[var(--primary-dark)] text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg transition-colors shrink-0 ml-4"
        >
          <Plus size={14} /> Open a Case
        </button>
      </div>
    </div>
  );
}

// ─── Product Catalog ──────────────────────────────────────────────────────────

function Catalog({
  onProduct,
}: {
  onProduct: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
  ];
  const filtered = PRODUCTS.filter((p) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.includes(q) ||
      p.category.toLowerCase().includes(q);
    const matchC =
      catFilter === "All" || p.category === catFilter;
    return matchQ && matchC;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Product Catalog" />

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search catalog…"
            className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                catFilter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => onProduct(p.id)}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-[#555]/25 transition-all text-left group"
          >
            <div
              className={`h-28 bg-gradient-to-br ${p.colorClass} flex items-center justify-center relative`}
            >
              <Package size={32} className="text-white/70" />
              {p.inventory === "out" && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-xs font-bold bg-black/50 px-2 py-0.5 rounded">
                    OUT
                  </span>
                </div>
              )}
              {p.inventory === "low" && (
                <div className="absolute top-1.5 right-1.5">
                  <span className="text-[#333] text-xs font-bold bg-white/80 px-1.5 py-0.5 rounded">
                    LOW
                  </span>
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="mono text-xs text-muted-foreground mb-0.5">
                #{p.id}
              </div>
              <div className="text-xs font-semibold text-foreground leading-tight group-hover:text-[#111] transition-colors line-clamp-2">
                {p.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                case: {p.caseQty.replace(" / case", "")}
              </div>
              <div className="mono text-sm font-bold text-foreground mt-1.5">
                {fmt(p.price)}
              </div>
              <div className="mt-1.5">
                <InvBadge
                  inv={p.inventory}
                  count={p.inventoryCount}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No products match your search.
        </div>
      )}
    </div>
  );
}

// ─── Product Detail ───────────────────────────────────────────────────────────

function ProductDetail({
  productId,
  onBack,
}: {
  productId: string;
  onBack: () => void;
}) {
  const p =
    PRODUCTS.find((x) => x.id === productId) ?? PRODUCTS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button
          onClick={onBack}
          className="hover:text-foreground transition-colors"
        >
          Catalog
        </button>
        <ChevronRight size={13} />
        <span className="text-foreground font-medium">
          Item #{p.id}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`rounded-xl h-64 bg-gradient-to-br ${p.colorClass} flex items-center justify-center`}
        >
          <Package size={72} className="text-white/60" />
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {p.category}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {p.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: "Item #", value: p.id, mono: true },
              { label: "Case Qty", value: p.caseQty },
              {
                label: "Price",
                value: fmt(p.price),
                mono: true,
                highlight: true,
              },
              {
                label: "Inventory",
                value: (
                  <InvBadge
                    inv={p.inventory}
                    count={p.inventoryCount}
                  />
                ),
              },
            ].map((field) => (
              <div
                key={field.label}
                className="bg-muted/40 rounded-lg px-4 py-3"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {field.label}
                </div>
                {typeof field.value === "string" ? (
                  <div
                    className={`text-sm font-semibold ${field.mono ? "mono" : ""} ${field.highlight ? "text-[#111] text-lg" : "text-foreground"}`}
                  >
                    {field.value}
                  </div>
                ) : (
                  field.value
                )}
              </div>
            ))}
          </div>

          <Card className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Description
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {p.description}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Cases List ───────────────────────────────────────────────────────────────

function CasesList({
  onCase,
  onNewCase,
}: {
  onCase: (id: string) => void;
  onNewCase: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = CASES.filter((c) => {
    const q = search.toLowerCase();
    return (
      !q ||
      c.id.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title="Cases"
        action={
          <button
            onClick={onNewCase}
            className="flex items-center gap-2 bg-primary hover:bg-[var(--primary-dark)] text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={15} /> New Case
          </button>
        }
      />

      <div className="relative mb-5 max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cases…"
          className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Case #",
                  "Subject",
                  "Status",
                  "Last Updated",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3.5"
                  >
                    {h}
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onCase(c.id)}
                  className="hover:bg-muted/30 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-4 mono text-sm font-medium text-[#111] group-hover:text-[#333]">
                    {c.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground max-w-xs truncate">
                    {c.subject}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-4 mono text-sm text-muted-foreground">
                    {c.lastUpdated}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    <ChevronRight
                      size={15}
                      className="opacity-30 group-hover:opacity-80 transition-opacity"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No cases found.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// ─── New Case Form ─────────────────────────────────────────────────────────────

function NewCaseForm({
  onBack,
  onSubmit,
  preselectedOrderId,
  prefilledSubject,
  prefilledCategory,
  prefilledDescription,
}: {
  onBack: () => void;
  onSubmit: () => void;
  preselectedOrderId?: string;
  prefilledSubject?: string;
  prefilledCategory?: string;
  prefilledDescription?: string;
}) {
  const [subject, setSubject] = useState(prefilledSubject ?? "");
  const [category, setCategory] = useState(
    prefilledCategory ?? "Order Issue",
  );
  const [description, setDescription] = useState(
    prefilledDescription ?? "",
  );
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderQuery, setOrderQuery] = useState("");
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(
      preselectedOrderId
        ? (ORDERS.find((o) => o.id === preselectedOrderId) ?? null)
        : null
    );
  const [orderDropdownOpen, setOrderDropdownOpen] =
    useState(false);
  const orderRef = useRef<HTMLDivElement>(null);

  const filteredOrders = ORDERS.filter((o) => {
    const q = orderQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.po.toLowerCase().includes(q) ||
      o.shipTo.toLowerCase().includes(q) ||
      o.date.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        orderRef.current &&
        !orderRef.current.contains(e.target as Node)
      ) {
        setOrderDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.files?.[0]?.name ?? "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmit();
    }, 800);
  }

  const categories = [
    "Order Issue",
    "Shipping Damage",
    "Missing Item",
    "Wrong Shipment",
    "Return Authorization",
    "Product Question",
    "Billing / Invoice",
    "Marketing Collateral",
    "Other",
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title="New Case"
        back="Back to Cases"
        onBack={onBack}
      />

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Subject <span className="text-[#111]">*</span>
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of your issue…"
              required
              className="w-full bg-input-background border border-border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-input-background border border-border rounded-lg px-3.5 py-2.5 text-sm pr-9 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          <div ref={orderRef} className="relative">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Related Order{" "}
              <span className="text-muted-foreground/60 font-normal normal-case">
                (optional)
              </span>
            </label>
            {selectedOrder ? (
              <div className="flex items-center justify-between bg-blue-light border border-blue/20 rounded-lg px-3.5 py-2.5">
                <div className="flex items-center gap-3">
                  <Package
                    size={14}
                    className="text-blue shrink-0"
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {selectedOrder.id}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {selectedOrder.po} ·{" "}
                      {selectedOrder.shipTo} ·{" "}
                      {selectedOrder.date}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrder(null);
                    setOrderQuery("");
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors ml-2 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <input
                    value={orderQuery}
                    onChange={(e) => {
                      setOrderQuery(e.target.value);
                      setOrderDropdownOpen(true);
                    }}
                    onFocus={() => setOrderDropdownOpen(true)}
                    placeholder="Search by order #, PO, or ship-to…"
                    className="w-full bg-input-background border border-border rounded-lg pl-9 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition"
                  />
                </div>
                {orderDropdownOpen &&
                  filteredOrders.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                      {filteredOrders.map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => {
                            setSelectedOrder(o);
                            setOrderQuery("");
                            setOrderDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-muted transition-colors"
                        >
                          <Package
                            size={14}
                            className="text-muted-foreground shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-foreground">
                              {o.id}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2 truncate">
                              {o.po} · {o.shipTo}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {o.date}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                {orderDropdownOpen &&
                  orderQuery.length > 0 &&
                  filteredOrders.length === 0 && (
                    <div className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg px-3.5 py-3 text-sm text-muted-foreground">
                      No orders match "{orderQuery}"
                    </div>
                  )}
              </>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail — include order numbers, item numbers, or lot numbers if applicable…"
              rows={5}
              className="w-full bg-input-background border border-border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Attachment{" "}
              <span className="text-muted-foreground/60 font-normal normal-case">
                (optional)
              </span>
            </label>
            <div
              className="border border-dashed border-border rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-[#555]/40 hover:bg-[#111]/3 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Paperclip
                size={16}
                className="text-muted-foreground shrink-0"
              />
              <span className="text-sm text-muted-foreground">
                {fileName || "Choose file…"}
              </span>
              {fileName && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName("");
                  }}
                  className="ml-auto text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleFile}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={!subject.trim() || submitting}
              className="flex items-center gap-2 bg-primary hover:bg-[var(--primary-dark)] disabled:opacity-50 text-primary-foreground font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : null}
              Submit Case
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// ─── Case Detail ──────────────────────────────────────────────────────────────

function CaseDetail({
  caseId,
  onBack,
}: {
  caseId: string;
  onBack: () => void;
}) {
  const c = CASES.find((x) => x.id === caseId) ?? CASES[0];
  const [messages, setMessages] =
    useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: "you",
        timestamp: "now",
        body: text,
      },
    ]);
    setDraft("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const isActive =
    c.status === "Open" || c.status === "In Progress";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title={`Case ${c.id}`}
        back="Back to Cases"
        onBack={onBack}
      />

      {/* Case header */}
      <Card className="mb-5 p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {caseId === "CS-2039"
                ? "Incorrect quantity on recent shipment"
                : c.subject}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={c.status} />
            <span className="text-xs bg-muted text-muted-foreground rounded px-2 py-0.5 font-medium">
              Priority: Medium
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 border-t border-border pt-4">
          {[
            { label: "Date Opened", value: c.lastUpdated },
            {
              label: "Type / Category",
              value:
                caseId === "CS-2039"
                  ? "Order Issue — Quantity"
                  : "Order Issue",
            },
            { label: "Contact", value: "J. Miller — Reno WD" },
            {
              label: "Case Owner / Agent",
              value: "A. Reyes (Lucas Support)",
            },
            {
              label: "Related Order #",
              value: caseId === "CS-2039" ? "SO-10042" : "—",
            },
            { label: "Last Updated", value: c.lastUpdated },
          ].map((f) => (
            <div key={f.label}>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {f.label}
              </div>
              <div className="mono text-xs font-medium text-foreground">
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Description */}
      <Card className="mb-5 p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Description
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {caseId === "CS-2039"
            ? "Received PO-8834 (SO-10042). Hi-Perf 10W-30 case count was short by 3 — packing slip shows 10 cases but only 7 arrived. Please advise on a credit or reship."
            : c.subject}
        </p>
      </Card>

      {/* Messaging */}
      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-[#111]" />
            <h2 className="font-semibold text-sm">Messaging</h2>
          </div>
        </div>

        {/* Message thread */}
        <div className="px-5 py-4 space-y-3 max-h-72 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] ${msg.sender === "you" ? "items-end" : "items-start"} flex flex-col gap-1`}
              >
                <div className="text-xs text-muted-foreground">
                  {msg.sender === "agent"
                    ? `Agent · ${msg.agentName} — ${msg.timestamp}`
                    : `You · J. Miller — ${msg.timestamp}`}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "you"
                      ? "bg-blue text-blue-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.body}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Compose */}
        {isActive ? (
          <div className="px-5 pb-4 border-t border-border pt-4">
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Post a message to the agent handling your case…"
                rows={1}
                className="flex-1 bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition"
              />
              <button
                onClick={sendMessage}
                disabled={!draft.trim()}
                className="flex items-center gap-1.5 bg-blue hover:bg-blue-dark disabled:opacity-40 text-blue-foreground px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shrink-0"
              >
                <Send size={14} /> Send
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        ) : (
          <div className="px-5 pb-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center italic">
              This case is {c.status.toLowerCase()} — messaging
              is no longer available.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Support Chat Widget (Salesforce Messaging) ───────────────────────────────

const SUPPORT_MESSAGES = [
  {
    id: "s1",
    sender: "agent" as const,
    name: "Lucas Support",
    timestamp: "Just now",
    body: "Hi J. Miller! You're connected to Lucas Oil Distributor Support. How can I help you today?",
  },
];

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(SUPPORT_MESSAGES);
  const [draft, setDraft] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open)
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const ts = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: "you",
        name: "J. Miller",
        timestamp: ts,
        body: text,
      },
    ]);
    setAgentTyping(true);
    setTimeout(() => {
      setAgentTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "agent",
          name: "Lucas Support",
          timestamp: ts,
          body: "Thanks for reaching out. An agent will follow up shortly. For urgent order issues you can also open a Case using the Cases tab.",
        },
      ]);
    }, 1800);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-primary hover:bg-[var(--primary-dark)] text-primary-foreground shadow-lg flex items-center justify-center transition-all active:scale-95"
        style={{ width: 52, height: 52 }}
        aria-label="Open support chat"
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border-2 border-[#111] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#555]" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-[72px] right-6 z-50 w-80 bg-card border border-border rounded-xl shadow-xl flex flex-col overflow-hidden"
          style={{ maxHeight: "420px" }}
        >
          {/* Header */}
          <div className="bg-[#111] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <MessageCircle
                  size={14}
                  className="text-white"
                />
              </div>
              <div>
                <div className="text-white text-xs font-semibold leading-tight">
                  Lucas Oil Support
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#F8F8F8]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col gap-0.5 max-w-[85%]">
                  <span
                    className={`text-[10px] text-muted-foreground ${msg.sender === "you" ? "text-right" : ""}`}
                  >
                    {msg.sender === "agent" ? msg.name : "You"}{" "}
                    · {msg.timestamp}
                  </span>
                  <div
                    className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === "you"
                        ? "bg-[#111] text-white rounded-tr-sm"
                        : "bg-white border border-border text-foreground rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {msg.body}
                  </div>
                </div>
              </div>
            ))}
            {agentTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#aaa] animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#aaa] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#aaa] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Compose */}
          <div className="px-3 py-2.5 border-t border-border bg-card flex items-end gap-2 shrink-0">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message support…"
              rows={1}
              className="flex-1 bg-[#F2F2F2] border border-border rounded-lg px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
              style={{ minHeight: 34, maxHeight: 80 }}
            />
            <button
              onClick={send}
              disabled={!draft.trim()}
              className="w-8 h-8 rounded-lg bg-primary hover:bg-[var(--primary-dark)] disabled:opacity-40 text-primary-foreground flex items-center justify-center transition-colors shrink-0"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Account Page ─────────────────────────────────────────────────────────────

function AccountPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Account" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Distributor
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#111]/10 flex items-center justify-center">
              <User size={22} className="text-[#111]" />
            </div>
            <div>
              <div className="font-semibold text-foreground">
                Reno Wholesale Distributors
              </div>
              <div className="text-sm text-muted-foreground">
                Account #WD-2941
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { label: "Territory", value: "Western US" },
              { label: "Lucas Oil Rep", value: "Marcus Chen" },
              {
                label: "Rep Phone",
                value: "800-342-2512 x204",
              },
              {
                label: "Rep Email",
                value: "m.chen@lucasoil.com",
              },
            ].map((r) => (
              <div
                key={r.label}
                className="flex justify-between"
              >
                <span className="text-muted-foreground">
                  {r.label}
                </span>
                <span className="font-medium text-foreground mono text-xs">
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Contact
          </div>
          <div className="space-y-2 text-sm">
            {[
              { label: "Primary Contact", value: "J. Miller" },
              { label: "Email", value: "j.miller@renowo.com" },
              {
                label: "Ship-to Address",
                value: "1200 Distribution Dr, Reno NV 89502",
              },
              {
                label: "Bill-to Address",
                value: "PO Box 4410, Reno NV 89505",
              },
            ].map((r) => (
              <div
                key={r.label}
                className="flex justify-between gap-4"
              >
                <span className="text-muted-foreground shrink-0">
                  {r.label}
                </span>
                <span className="font-medium text-foreground text-xs text-right">
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/*       <Card className="p-5 sm:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Portal Information</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {[
              { label: "Platform", value: "Salesforce Experience Cloud" },
              { label: "Data Source", value: "Sage 100 → Snowflake → Salesforce" },
              { label: "Phase", value: "Phase 1 — View + Case Mgmt" },
              { label: "Access Type", value: "Invite-only (no self-serve)" },
            ].map((r) => (
              <div key={r.label} className="bg-muted/40 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">{r.label}</div>
                <div className="text-xs font-semibold text-foreground">{r.value}</div>
              </div>
            ))}
          </div>
        </Card> */}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [selectedOrder, setSelectedOrder] =
    useState<string>("SO-10042");
  const [selectedProduct, setSelectedProduct] =
    useState<string>("10087");
  const [selectedCase, setSelectedCase] =
    useState<string>("CS-2039");

  function nav(v: View) {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openOrder(id: string) {
    setSelectedOrder(id);
    nav("order-detail");
  }

  function openProduct(id: string) {
    setSelectedProduct(id);
    nav("product-detail");
  }

  function openCase(id: string) {
    setSelectedCase(id);
    nav("case-detail");
  }

  const [caseOrderId, setCaseOrderId] = useState<string | undefined>(undefined);
  const [casePrefill, setCasePrefill] = useState<
    | {
        subject?: string;
        category?: string;
        description?: string;
      }
    | undefined
  >(undefined);

  function openCaseForOrder(orderId: string) {
    setCasePrefill(undefined);
    setCaseOrderId(orderId);
    nav("new-case");
  }

  function openMarketingCollateralRequest(itemTitle?: string) {
    setCaseOrderId(undefined);
    setCasePrefill({
      subject: itemTitle
        ? `Order: ${itemTitle}`
        : "Marketing collateral order request",
      category: "Marketing Collateral",
      description: itemTitle
        ? `I'd like to order printed copies of:\n\n- ${itemTitle}\n\nQuantity:\nShip-to address:\n`
        : "Please list the materials you need, quantities, and ship-to address.",
    });
    nav("new-case");
  }

  function clearCaseFormState() {
    setCaseOrderId(undefined);
    setCasePrefill(undefined);
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  function renderView() {
    switch (view) {
      case "dashboard":
        return (
          <Dashboard
            onNav={nav}
            onOrder={openOrder}
            onCase={openCase}
          />
        );
      case "orders":
        return <OrdersList onOrder={openOrder} />;
      case "order-detail":
        return (
          <OrderDetail
            orderId={selectedOrder}
            onBack={() => nav("orders")}
            onTrack={() => nav("tracking")}
            onOpenCase={openCaseForOrder}
            onCase={openCase}
          />
        );
      case "tracking":
        return (
          <TrackingPlaceholder
            trackingNumber="1Z999AA10123456784"
            carrier="UPS"
            onBack={() => nav("order-detail")}
          />
        );
      case "catalog":
        return <Catalog onProduct={openProduct} />;
      case "product-detail":
        return (
          <ProductDetail
            productId={selectedProduct}
            onBack={() => nav("catalog")}
          />
        );
      case "cases":
        return (
          <CasesList
            onCase={openCase}
            onNewCase={() => nav("new-case")}
          />
        );
      case "new-case":
        return (
          <NewCaseForm
            onBack={() => {
              clearCaseFormState();
              nav(casePrefill ? "marketing-collateral" : "cases");
            }}
            onSubmit={() => {
              clearCaseFormState();
              nav("cases");
            }}
            preselectedOrderId={caseOrderId}
            prefilledSubject={casePrefill?.subject}
            prefilledCategory={casePrefill?.category}
            prefilledDescription={casePrefill?.description}
          />
        );
      case "case-detail":
        return (
          <CaseDetail
            caseId={selectedCase}
            onBack={() => nav("cases")}
          />
        );
      case "account":
        return <AccountPage />;
      case "knowledge-hub":
        return (
          <KnowledgeHubPage
            onBack={() => nav("dashboard")}
            onNav={nav}
          />
        );
      case "marketing-collateral":
        return (
          <MarketingCollateralPage
            onBack={() => nav("dashboard")}
            onRequestCollateral={openMarketingCollateralRequest}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav view={view} onNav={nav} />
      {view === "dashboard" ? (
        <MarketingBannerCarousel
          onNav={(v) => nav(v)}
          onProduct={openProduct}
        />
      ) : null}
      <main>{renderView()}</main>
      <SupportChat />
    </div>
  );
}