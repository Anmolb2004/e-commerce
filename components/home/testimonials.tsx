import { SectionHeading } from "@/components/ui/section-heading";
import { Rating } from "@/components/ui/rating";
import { Stagger, StaggerItem } from "@/components/ui/motion";

const QUOTES = [
  {
    quote:
      "The bergamot candle made my apartment feel like a place someone interesting lives. I've bought four as gifts and kept two.",
    author: "Maya R.",
    context: "Bergamot & Cedar Candle",
  },
  {
    quote:
      "Three months on the rose serum and my skin has simply stopped arguing with me. Nothing else changed. It's the serum.",
    author: "Sofia L.",
    context: "Damask Rose Recovery Serum",
  },
  {
    quote:
      "Ordered a gift box on a Tuesday, it arrived Thursday wrapped like a small ceremony. The recipient cried, in the good way.",
    author: "Isabel R.",
    context: "The Rosée Gift Box",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <SectionHeading eyebrow="Kind words" title="Letters from the shelf" />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {QUOTES.map((q) => (
          <StaggerItem key={q.author} className="h-full">
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift">
              <Rating value={5} size={14} />
              <blockquote className="mt-5 flex-1 font-display text-[19px] leading-snug tracking-tight text-ink">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-semibold tracking-tight">{q.author}</p>
                <p className="mt-0.5 text-[13px] text-mute">on the {q.context}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
