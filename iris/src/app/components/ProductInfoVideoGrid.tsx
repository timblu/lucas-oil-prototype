import { useEffect, useState } from "react";
import { Play, X, ChevronRight } from "lucide-react";
import {
  PRODUCT_INFO_VIDEOS,
  type ProductInfoVideo,
  productInfoVideoGradient,
} from "../data/productInfoVideos";
import { cn } from "./ui/utils";

function VideoModal({
  video,
  onClose,
}: {
  video: ProductInfoVideo;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/90 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        <div
          className={cn(
            "relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-gradient-to-br p-8 text-center text-white shadow-2xl",
            productInfoVideoGradient(video.topic),
          )}
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-white/20">
            <Play size={28} className="ml-1" fill="currentColor" />
          </div>
          <p className="max-w-md text-sm text-white/85">
            Recordings for this module are published by your IRIS rep. Contact
            them for the latest version.
          </p>
        </div>
        <p className="mt-3 text-sm font-medium text-white/90">{video.title}</p>
        <p className="mt-1 text-sm text-white/70">{video.description}</p>
      </div>
    </div>
  );
}

export function ProductInfoVideoGrid({
  limit,
  onViewAll,
}: {
  limit?: number;
  onViewAll?: () => void;
} = {}) {
  const [activeVideo, setActiveVideo] =
    useState<ProductInfoVideo | null>(null);
  const videos = limit
    ? PRODUCT_INFO_VIDEOS.slice(0, limit)
    : PRODUCT_INFO_VIDEOS;

  return (
    <section aria-label="Product information videos">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Product Information Videos
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Service overviews and training for the IRIS partner team
          </p>
        </div>
        {onViewAll ? (
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark hover:underline shrink-0"
          >
            View all videos
            <ChevronRight size={14} />
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <article
            key={video.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-[#999]/40 transition-all group"
          >
            <button
              type="button"
              onClick={() => setActiveVideo(video)}
              className="w-full text-left"
            >
              <div
                className={cn(
                  "relative flex aspect-video items-end overflow-hidden bg-gradient-to-br p-4",
                  productInfoVideoGradient(video.topic),
                )}
              >
                <div
                  className="absolute -right-8 -top-8 size-28 rounded-full bg-brand-coral/30 blur-2xl"
                  aria-hidden
                />
                <span className="relative inline-flex h-6 items-center rounded-full border border-white/60 px-3 text-2xs font-semibold uppercase text-white">
                  {video.topic}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white group-hover:bg-white/30 group-hover:scale-105 transition-all">
                    <Play size={20} className="ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-3">
                  {video.title}
                </h3>
              </div>
            </button>
          </article>
        ))}
      </div>

      {activeVideo ? (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      ) : null}
    </section>
  );
}
