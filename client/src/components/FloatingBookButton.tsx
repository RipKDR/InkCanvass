import { ExternalLink } from "lucide-react";
import { studio } from "@/content/studio";

export default function FloatingBookButton() {
  return (
    <a
      href={studio.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed md:hidden bottom-6 right-4 z-50 inline-flex items-center gap-2 bg-[#7B1113] text-[#F2F2F2] px-5 py-3 uppercase tracking-wider text-sm shadow-xl shadow-red-900/20 rounded-full hover:bg-[#a01619] transition-colors"
      aria-label="Book Now"
    >
      Book Now
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}

