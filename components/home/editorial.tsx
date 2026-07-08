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
    <section id="story" className="scroll-mt-24 bg-cream-deep/60">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <FadeIn className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift lg:aspect-[5/6]">
            <Image
              src={EDITORIAL_IMAGES.story}
              alt="A flower stall with buckets of fresh roses"
              fill
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-2xl border border-white/50 bg-white/75 px-5 py-4 shadow-lift backdrop-blur-xl sm:-right-6">
            <p className="font-display text-2xl tracking-tight">Lyon, 2021</p>
            <p className="text-[13px] text-mute">Where it began</p>
          </div>
        </FadeIn>

        <div>
          <FadeIn>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-rose">
              Our story
            </p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
              It started at a flower stall, with a{" "}
              <em className="text-rose">rose</em> that refused to be rushed.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
              Rosée began as a Saturday ritual: dew-cut damask roses from the
              Croix-Rousse market, steam-distilled in a copper pot on a kitchen
              stove. What we couldn&apos;t find — candles that burned clean,
              skincare with ingredients we could pronounce — we learned to make.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              Five years on, everything we sell is still made in small batches,
              named honestly, and shipped without a gram of plastic. Slow was
              never the constraint. It was the recipe.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl tracking-tight md:text-4xl">
                    {s.value}
                  </dd>
                  <p className="mt-1.5 text-[13px] leading-snug text-mute">
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
