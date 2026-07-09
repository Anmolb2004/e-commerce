import Image from "next/image";
import { EDITORIAL_IMAGES } from "@/lib/products";
import { FadeIn } from "@/components/ui/motion";

const STATS = [
  { value: "100%", label: "Botanical ingredients" },
  { value: "12k+", label: "Orders shipped plastic-free" },
  { value: "4.8", label: "Average review, 1,900+ voices" },
];

export function Editorial() {
  return (
    <section id="story" className="scroll-mt-24 bg-cream-deep max-lg:bg-cream-deep sm:bg-cream-deep/60">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <FadeIn className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-ink/5 sm:rounded-[2rem] lg:aspect-[5/6]">
            <Image
              src={EDITORIAL_IMAGES.story}
              alt="A flower stall with buckets of fresh roses"
              fill
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="object-cover saturate-[1.04]"
            />
          </div>
          <div className="glass-panel absolute -bottom-5 -right-3 rounded-2xl px-5 py-4 sm:-right-6">
            <p className="font-display text-2xl tracking-tight text-ink">Lyon, 2021</p>
            <p className="text-[13px] text-ink/70">Where it began</p>
          </div>
        </FadeIn>

        <div>
          <FadeIn>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-rose sm:font-medium">
              Our story
            </p>
            <h2 className="font-display text-[2.35rem] leading-[1.02] tracking-tight text-balance text-ink sm:text-4xl md:text-5xl">
              It started at a flower stall, with a{" "}
              <em className="text-rose max-lg:text-rose-deep">rose</em> that refused to be rushed.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-[16px] leading-relaxed text-ink/80 sm:text-ink-soft">
              Rosée began as a Saturday ritual: dew-cut damask roses from the
              Croix-Rousse market, steam-distilled in a copper pot on a kitchen
              stove. What we couldn&apos;t find — candles that burned clean,
              skincare with ingredients we could pronounce — we learned to make.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/80 sm:text-ink-soft">
              Five years on, everything we sell is still made in small batches,
              named honestly, and shipped without a gram of plastic. Slow was
              never the constraint. It was the recipe.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line/80 pt-8 sm:gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[1.75rem] tracking-tight text-ink sm:text-3xl md:text-4xl">
                    {s.value}
                  </dd>
                  <p className="mt-1.5 text-[11px] leading-snug text-ink/70 sm:text-[13px] sm:text-mute">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
