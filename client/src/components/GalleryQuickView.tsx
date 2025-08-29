import { useState } from "react";
import type { GalleryItem, Artist } from "@shared/schema";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function useGalleryQuickView({ items, artists }: { items: GalleryItem[]; artists: Artist[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<GalleryItem | null>(null);

  const openItem = (item: GalleryItem) => {
    setActive(item);
    setOpen(true);
  };

  const QuickView = open && active ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="sr-only">{active.title}</DialogTitle>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square bg-[rgba(242,242,242,0.05)] overflow-hidden">
            <img
              src={active.imageUrl}
              alt={active.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <h3 className="font-cinzel text-2xl mb-2">{active.title}</h3>
            <p className="opacity-70 mb-4">{active.style}</p>
            {active.description && (
              <p className="opacity-80 leading-relaxed mb-6">{active.description}</p>
            )}
            <div className="flex gap-3">
              {(() => {
                const artist = artists.find((a) => a.id === active.artistId);
                return artist ? (
                  <Link href={`/artists/${artist.id}`}>
                    <Button variant="outline">View Artist</Button>
                  </Link>
                ) : null;
              })()}
              <Link href="/booking">
                <Button className="bg-[#7B1113] hover:bg-[#a01619] text-[#F2F2F2]">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ) : null;

  return { openItem, QuickView };
}

