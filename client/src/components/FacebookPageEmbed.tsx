export default function FacebookPageEmbed({
  pageUrl = "https://www.facebook.com/BerserkTattoo/",
  height = 560,
}: {
  pageUrl?: string;
  height?: number;
}) {
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    pageUrl
  )}&tabs=timeline&width=500&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] p-4">
        <iframe
          title="Facebook Page"
          src={src}
          width="100%"
          height={height}
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}

