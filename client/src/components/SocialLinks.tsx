import { ExternalLink, Facebook, Instagram, Mail, Phone } from "lucide-react";

type Item = { label: string; url: string };

export default function SocialLinks({
  items,
  className = "",
}: {
  items: Item[];
  className?: string;
}) {
  const IconFor = (label: string) => {
    const key = label.toLowerCase();
    if (key.includes("instagram")) return <Instagram className="w-4 h-4" />;
    if (key.includes("facebook")) return <Facebook className="w-4 h-4" />;
    if (key.includes("email") || key.includes("mail")) return <Mail className="w-4 h-4" />;
    if (key.includes("phone") || key.includes("call") || key.includes("tel")) return <Phone className="w-4 h-4" />;
    return <ExternalLink className="w-4 h-4" />;
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((s) => (
        <a
          key={`${s.label}-${s.url}`}
          href={s.url.startsWith("http") || s.url.startsWith("mailto:") || s.url.startsWith("tel:") ? s.url : `https://${s.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-wider border border-[rgba(242,242,242,0.2)] hover:border-[#7B1113] hover:text-[#7B1113] transition-colors"
        >
          {IconFor(s.label)}
          <span>{s.label}</span>
        </a>
      ))}
    </div>
  );
}

