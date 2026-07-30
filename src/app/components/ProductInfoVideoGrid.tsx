import { useEffect, useState } from "react";
import { ExternalLink, Play, X, ChevronRight } from "lucide-react";
import {
  PRODUCT_INFO_PLAYLIST_URL,
  PRODUCT_INFO_VIDEOS,
  type ProductInfoVideo,
  productInfoVideoEmbedUrl,
  productInfoVideoThumbnailUrl,
  productInfoVideoWatchUrl,
} from "../data/productInfoVideos";

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
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
          <iframe
            src={productInfoVideoEmbedUrl(video.id)}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-3 text-sm text-white/90 line-clamp-2">{video.title}</p>
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
            Training and demos from the Lucas Oil YouTube channel
          </p>
        </div>
        {onViewAll ? (
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111] hover:underline shrink-0"
          >
            View all videos
            <ChevronRight size={14} />
          </button>
        ) : (
          <a
            href={PRODUCT_INFO_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111] hover:underline shrink-0"
          >
            View full playlist
            <ExternalLink size={14} />
          </a>
        )}
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
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img
                  src={productInfoVideoThumbnailUrl(video.id)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/65 flex items-center justify-center text-white group-hover:bg-[#111] group-hover:scale-105 transition-all">
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
            <div className="px-4 pb-4 -mt-1">
              <a
                href={productInfoVideoWatchUrl(video.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-[#111] transition-colors inline-flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                Watch on YouTube
                <ExternalLink size={12} />
              </a>
            </div>
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
