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

export function Hero() {
  const featured = getProduct("damask-rose-recovery-serum")!;

  return (
    <section className="relative overflow-hidden">
      {/* Soft radial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-blush/50 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-20">
        {/* Copy */}
        <motion.div variants={parent} initial="hidden" animate="visible">
          <motion.p
            variants={child}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-soft"
          >
            <Sparkles size={13} className="text-rose" />
            Botanical apothecary — est. 2021
          </motion.p>
          <motion.h1
            variants={child}
            className="font-display text-[clamp(2.9rem,7.5vw,5.4rem)] leading-[0.98] tracking-tight text-balance"
          >
            Rituals for the{" "}
            <em className="text-rose">everyday</em>, gathered slowly.
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
          className="relative mx-auto w-full max-w-[540px]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src={EDITORIAL_IMAGES.hero}
              alt="Amber glass serum bottle beside eucalyptus stems"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 540px"
              className="object-cover"
            />
          </div>

          {/* Floating glass product card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 0.7 }}
            className="absolute -bottom-6 -left-3 sm:-left-8 animate-float"
          >
            <Link
              href={`/product/${featured.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-white/50 bg-white/70 p-3.5 pr-6 shadow-lift backdrop-blur-xl transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative size-16 overflow-hidden rounded-xl">
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-rose-deep">
                  Most loved
                </span>
                <span className="block text-sm font-medium tracking-tight text-ink">
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
            className="absolute -top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-[12px] font-medium tracking-tight text-ink shadow-soft backdrop-blur-xl sm:right-8"
          >
            <Leaf size={13} className="text-pine" strokeWidth={2} />
            100% botanical, always
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
