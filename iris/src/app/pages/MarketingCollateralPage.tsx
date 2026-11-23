import { useEffect, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { brand } from "../brand/brand";
import {
  BookOpen,
  Download,
  FileDown,
  Image,
  Layers,
  Mail,
  Package,
  Phone,
  Send,
  Star,
  Tag,
  X,
} from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { ROUTES } from "../routes";

const COLLATERAL = [
  {
    id: "1",
    title: "2026 Service Catalog",
    type: "PDF",
    size: "4.2 MB",
    pages: 48,
    icon: <BookOpen size={20} />,
    updated: "01/15/26",
    description:
      "Full partner service catalog for 2026 — business internet, carrier Ethernet, dedicated internet access, transport, dark fiber, and DDoS protection. Includes item numbers, billing units, and partner pricing.",
    previewColor: "bg-primary",
    previewLabel: "SERVICE CATALOG 2026",
  },
  {
    id: "2",
    title: "Carrier Solutions Sell Sheet",
    type: "PDF",
    size: "1.1 MB",
    pages: 2,
    icon: <FileDown size={20} />,
    updated: "02/03/26",
    description:
      "Two-page sell sheet for IRIS carrier-grade services: Ethernet, dedicated internet access, transport, and dark fiber. Designed for sales calls and trade events. Covers speeds from 10 Mbps to 400 Gbps, route diversity, and key differentiators.",
    previewColor: "bg-foreground",
    previewLabel: "CARRIER SOLUTIONS",
  },
  {
    id: "3",
    title: "IRIS Networks Brand Standards",
    type: "PDF",
    size: "8.7 MB",
    pages: 32,
    icon: <Star size={20} />,
    updated: "12/10/25",
    description:
      "Official brand guidelines for all distributor co-marketing use. Includes logo usage rules, color palette, typography, imagery direction, and approved tagline variations.",
    previewColor: "bg-primary",
    previewLabel: "BRAND STANDARDS",
  },
  {
    id: "4",
    title: "Network Capability Statement",
    type: "PDF",
    size: "980 KB",
    pages: 2,
    icon: <Tag size={20} />,
    updated: "03/01/26",
    description:
      "Two-page overview of the IRIS fiber network: over 5,000 route miles, 250+ communities, 24/7 monitoring, and local support. Written for government, education, healthcare, and enterprise buyers.",
    previewColor: "bg-foreground",
    previewLabel: "CAPABILITY STATEMENT",
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
      "Print-ready booth graphics package for trade shows and distributor events. Includes 10×10 and 10×20 backwall artwork, banner stands, table throws, and service spotlight panels at 300 dpi.",
    previewColor: "bg-muted",
    previewLabel: "BOOTH GRAPHICS",
  },
  {
    id: "6",
    title: "Service Brief Bundle",
    type: "ZIP",
    size: "6.3 MB",
    pages: null,
    icon: <Layers size={20} />,
    updated: "03/10/26",
    description:
      "Service briefs for the full IRIS service range, including specifications, availability notes, and service-level information for customer proposals and bids.",
    previewColor: "bg-muted",
    previewLabel: "SERVICE BRIEFS",
  },
];

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
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-xs text-muted-foreground">
                      {item.pages} pages
                    </span>
                  </>
                )}
                <span className="text-muted-foreground/40">·</span>
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

export default function MarketingCollateralPage() {
  const navigate = useNavigate();
  const [previewItem, setPreviewItem] = useState<
    (typeof COLLATERAL)[number] | null
  >(null);

  function requestCollateral(itemTitle?: string) {
    const subject = itemTitle
      ? `Order: ${itemTitle}`
      : "Marketing collateral order request";
    const body = itemTitle
      ? `I'd like to order printed copies of:\n\n- ${itemTitle}\n\nQuantity:\nShip-to address:\n`
      : "Please list the materials you need, quantities, and ship-to address.";
    window.location.href = `mailto:${brand.marketingEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title="Marketing Collateral"
        back="Back to Dashboard"
        onBack={() => navigate(ROUTES.dashboard)}
      />
      <p className="text-sm text-muted-foreground -mt-4 mb-6">
        Downloads available to your distributor account
      </p>

      <div className="bg-card border border-border rounded-xl p-5 mb-8 flex flex-col lg:flex-row lg:items-center gap-5">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-brand-dark/8 flex items-center justify-center shrink-0">
            <Package size={20} className="text-brand-dark" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-foreground">
              Order printed collateral
            </h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Files below are digital downloads. For printed catalogs, sell
              sheets, booth graphics, and signage, contact the marketing team
              or submit a request — we&apos;ll ship to your distributor
              account address.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
              <a
                href={`mailto:${brand.marketingEmail}?subject=Marketing%20collateral%20order`}
                className="flex items-center gap-1.5 text-brand-dark font-medium hover:underline"
              >
                <Mail size={14} />
                {brand.marketingEmail}
              </a>
              <span className="text-muted-foreground/40 hidden sm:inline">
                ·
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Phone size={14} />
                615-425-2300 x310
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => requestCollateral()}
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
            <div className="w-9 h-9 rounded-md bg-brand-dark/8 flex items-center justify-center text-brand-dark group-hover:bg-brand-dark/15 transition-colors shrink-0">
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
            <div className="mt-auto flex items-center gap-1 text-brand-dark text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
            requestCollateral(title);
          }}
        />
      )}
    </div>
  );
}
