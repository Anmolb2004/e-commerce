"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { EDITORIAL_IMAGES, getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { easeOutExpo } from "@/components/ui/motion";

const parent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const child = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOutExpo } },
};
/** Headline stays fully opaque — opacity fade reads as washed-out on mobile. */
const headline = {
  hidden: { opacity: 1, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutExpo } },
};

export function Hero() {
  const featured = getProduct("damask-rose-recovery-serum")!;

  return (
    <section className="relative max-lg:bg-cream">
      {/* Decorative washes — isolated so floating cards aren't clipped */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[38%] right-[-22%] size-[24rem] rounded-full bg-blush/55 blur-3xl lg:-top-40 lg:right-[-10%] lg:size-[42rem] lg:bg-blush/50" />
        <div className="absolute right-[-12%] bottom-8 size-[20rem] rounded-full bg-rose/15 blur-3xl lg:hidden" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-20 pt-10 sm:px-6 sm:gap-12 sm:pb-24 md:pb-28 md:pt-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-32 lg:pt-20">
        {/* Copy */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate="visible"
          className="relative z-10 lg:max-w-xl lg:py-4 xl:max-w-[34rem]"
        >
          <motion.p
            variants={child}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-soft"
          >
            <Sparkles size={13} className="text-rose" />
            Botanical apothecary — est. 2021
          </motion.p>
          <motion.h1
            variants={headline}
            className="hero-headline font-display text-[clamp(2.75rem,11vw,5.4rem)] leading-[0.98] tracking-tight text-balance text-ink"
          >
            Rituals for the{" "}
            <em className="text-rose max-lg:text-rose-deep">everyday</em>, gathered
            slowly.
          </motion.h1>
          <motion.p
            variants={child}
            className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-soft"
          >
            Small-batch candles, botanical skincare and fragrance — composed
            from plants we can name, for moments you&apos;ll want to keep.
          </motion.p>
          <motion.div variants={child} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/shop" size="lg">
              Shop the collection
              <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink href="/#bestsellers" size="lg" variant="outline">
              Bestsellers
            </ButtonLink>
          </motion.div>
          <motion.div variants={child} className="mt-10 flex items-center gap-3">
            <Rating value={4.8} size={15} />
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-ink">4.8</span> from 1,900+
              reviews
            </p>
          </motion.div>
        </motion.div>

        {/* Imagery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.15 }}
          className="relative z-10 mx-auto w-full max-w-[540px] overflow-visible pl-2 pr-2 pb-10 sm:pl-4 sm:pr-4 sm:pb-12 lg:mx-0 lg:max-w-none lg:justify-self-end lg:pl-8 lg:pr-0 lg:pb-14 xl:pl-10"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-ink/5 sm:rounded-[2rem] lg:aspect-[4/5.2] lg:shadow-[0_20px_50px_-18px_rgb(33_30_24_/_0.22)]">
            <Image
              src={EDITORIAL_IMAGES.hero}
              alt="Amber glass serum bottle beside eucalyptus stems"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 540px"
              className="object-cover saturate-[1.03] contrast-[1.02]"
            />
          </div>

          {/* Floating glass product card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 0.7 }}
            className="absolute bottom-0 left-0 z-20 max-w-[min(100%,20rem)] animate-float sm:max-w-[22rem] lg:-left-6 lg:max-w-[24rem] xl:-left-8"
          >
            <Link
              href={`/product/${featured.slug}`}
              className="glass-panel flex items-center gap-3.5 rounded-2xl p-3 pr-5 transition-transform duration-300 hover:scale-[1.03] sm:gap-4 sm:p-3.5 sm:pr-6"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl sm:size-16">
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-rose-deep">
                  Most loved
                </span>
                <span className="block text-sm font-medium leading-snug tracking-tight text-ink lg:text-[15px]">
                  {featured.name}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-ink">
                  {formatPrice(featured.price)}
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Floating chip */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 0.9 }}
            className="glass-panel absolute -top-3 right-2 z-20 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11.5px] font-medium tracking-tight text-ink sm:-top-4 sm:right-6 sm:px-4 sm:text-[12px] lg:right-8"
          >
            <Leaf size={13} className="text-pine" strokeWidth={2} />
            100% botanical, always
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
