import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, FileText, Layers, Play, Search } from "lucide-react";
import { ProductInfoVideoGrid } from "../../components/ProductInfoVideoGrid";
import { MARKETING_BANNER_IMAGES } from "../../data/marketingBannerImages";
import { ROUTES } from "../../routes";

const KNOWLEDGE_HUB_ITEMS: {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  to: string | null;
}[] = [
  {
    id: "videos",
    title: "Product Videos",
    description:
      "Product demos, how-tos, and training from the Lucas Oil YouTube channel.",
    icon: <Play size={20} />,
    to: ROUTES.productVideos,
  },
  {
    id: "bulletins",
    title: "Technical Bulletins",
    description: "Application notes, OEM approvals, and formulation updates.",
    icon: <FileText size={20} />,
    to: null,
  },
  {
    id: "training",
    title: "Distributor Training",
    description:
      "Counter sales guides, product positioning, and onboarding modules.",
    icon: <BookOpen size={20} />,
    to: null,
  },
  {
    id: "sds",
    title: "SDS / Safety Data",
    description: "Searchable safety data sheets by product and SKU.",
    icon: <Layers size={20} />,
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
            onClick={() => navigate(ROUTES.dashboard)}
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
                onClick={() => item.to && navigate(item.to)}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <ProductInfoVideoGrid
          limit={6}
          onViewAll={() => navigate(ROUTES.productVideos)}
        />
      </div>
    </>
  );
}
