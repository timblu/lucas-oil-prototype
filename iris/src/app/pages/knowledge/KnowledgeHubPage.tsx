import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Play,
  Search,
  Shield,
} from "lucide-react";
import { ProductInfoVideoGrid } from "../../components/ProductInfoVideoGrid";
import featuredGears from "../../../assets/figma/featured-gears.png";
import { ROUTES } from "../../routes";
import { cn } from "../../components/ui/utils";

const KNOWLEDGE_HUB_ITEMS: {
  id: string;
  title: string;
  description: string;
  cta: string;
  icon: ReactNode;
  to: string | null;
}[] = [
  {
    id: "videos",
    title: "Product Videos",
    description:
      "Product demos, how-tos, and training from the Lucas Oil YouTube channel.",
    cta: "View Videos",
    icon: <Play size={28} />,
    to: ROUTES.productVideos,
  },
  {
    id: "bulletins",
    title: "Technical Bulletins",
    description: "Application notes, OEM approvals, and formulation updates.",
    cta: "View Bulletins",
    icon: <FileText size={28} />,
    to: null,
  },
  {
    id: "training",
    title: "Distributor Training",
    description:
      "Counter sales guides, product positioning, and onboarding modules.",
    cta: "Start Training",
    icon: <BookOpen size={28} />,
    to: null,
  },
  {
    id: "sds",
    title: "SDS / Safety Data",
    description: "Searchable safety data sheets by product and SKU.",
    cta: "Browse SDS",
    icon: <Shield size={28} />,
    to: null,
  },
];

export default function KnowledgeHubPage() {
  const navigate = useNavigate();
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
      {/* Full-bleed hero */}
      <section
        aria-label="Knowledge Hub"
        className="relative w-full min-h-[320px] overflow-hidden md:min-h-[380px]"
      >
        <img
          src={featuredGears}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center scale-105 blur-[2px]"
        />
        <div
          className="absolute inset-0 bg-iris-purple-dark/70 mix-blend-multiply"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-page flex-col justify-center px-4 py-12 sm:px-10">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
            Knowledge Hub
          </h1>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-white/90">
            Product specs, training, and technical resources for your team.
          </p>

          <div className="relative mt-8 w-full max-w-xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-icon"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources, bulletins, training…"
              aria-label="Search knowledge hub resources"
              className="h-12 w-full rounded-full border-0 bg-white pl-11 pr-4 text-sm text-foreground shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-page px-4 py-10 sm:px-10">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No resources match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => item.to && navigate(item.to)}
                className={cn(
                  "flex min-h-[220px] flex-col items-start justify-between rounded-lg bg-primary p-6 text-left text-primary-foreground",
                  "transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                  !item.to && "cursor-default",
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="text-primary-foreground">{item.icon}</div>
                  <div>
                    <h2 className="text-lg font-bold leading-6">{item.title}</h2>
                    <p className="mt-2 text-sm font-medium leading-5 text-primary-foreground/90">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="mt-6 flex items-center gap-2 text-sm font-medium">
                  {item.cta}
                  <ArrowUpRight size={18} />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-page px-4 pb-12 sm:px-10">
        <ProductInfoVideoGrid
          limit={6}
          onViewAll={() => navigate(ROUTES.productVideos)}
        />
      </div>
    </>
  );
}
