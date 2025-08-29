import { useQuery } from "@tanstack/react-query";
import { Instagram } from "lucide-react";

type IGItem = {
  id: string;
  caption: string;
  mediaType: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
};

export default function InstagramFeed({
  title = "From Instagram",
  limit = 8,
  handle = "berserk_tattoos",
  profileUrl = "https://www.instagram.com/berserk_tattoos/",
}: {
  title?: string;
  limit?: number;
  handle?: string;
  profileUrl?: string;
}) {
  const { data: items = [], isLoading } = useQuery<IGItem[]>({
    queryKey: [`/api/instagram?limit=${limit}&handle=${encodeURIComponent(handle)}`],
  });

  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-[1600px] mx-auto px-[5%]">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
            {title}
            <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
            Follow us on Instagram for the latest work, healed pieces, and behind‑the‑scenes.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-4 gap-4 opacity-70">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[rgba(242,242,242,0.05)] aspect-square animate-pulse" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.slice(0, limit).map((m) => (
              <a
                key={m.id}
                href={m.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative bg-[rgba(242,242,242,0.05)] aspect-square overflow-hidden border border-[rgba(242,242,242,0.1)]"
              >
                <img
                  src={m.mediaUrl}
                  alt={m.caption || "Instagram media"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 right-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {m.caption}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="opacity-80 mb-6">Feed unavailable. Follow us on Instagram instead.</p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#7B1113] text-[#7B1113] hover:bg-[#7B1113] hover:text-[#F2F2F2] px-6 py-3 uppercase tracking-wider transition-all duration-300"
            >
              <Instagram className="w-4 h-4" />
              Follow @{handle}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
