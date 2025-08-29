export default function Testimonials() {
  const items = [
    {
      quote:
        "Incredible attention to detail. The healed result looks even better than day one.",
      author: "Sam R.",
    },
    {
      quote:
        "Professional from start to finish. Consultation made me feel totally confident.",
      author: "Mia T.",
    },
    {
      quote:
        "Best studio experience I’ve had. Clean, calm, and seriously talented artists.",
      author: "Jordan K.",
    },
  ];

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-[clamp(2.5rem,6vw,4rem)] font-normal mb-6 relative inline-block">
            Client Stories
            <span className="absolute bottom-[-0.5rem] left-1/2 transform -translate-x-1/2 w-[60px] h-[3px] bg-[#7B1113]"></span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto leading-relaxed">
            What clients say about their Berserk experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <figure
              key={i}
              className="p-8 bg-[rgba(242,242,242,0.02)] border border-[rgba(242,242,242,0.1)] hover:border-[#7B1113] transition-colors"
            >
              <blockquote className="italic opacity-90 leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6 opacity-70">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

