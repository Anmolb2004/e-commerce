"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { Rating } from "@/components/ui/rating";
import { FadeIn } from "@/components/ui/motion";

/** Plausible, deterministic star distribution derived from the average. */
function distribution(rating: number): number[] {
  const five = Math.min(88, Math.max(45, Math.round((rating - 3.6) * 62)));
  const rest = 100 - five;
  const four = Math.round(rest * 0.62);
  const three = Math.round(rest * 0.24);
  const two = Math.round(rest * 0.1);
  const one = rest - four - three - two;
  return [five, four, three, two, one];
}

export function Reviews({ product }: { product: Product }) {
  const dist = distribution(product.rating);

  return (
    <section id="reviews" className="mt-24 scroll-mt-28">
      <FadeIn>
        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.22em] text-rose">
          Reviews
        </p>
        <h2 className="font-display text-4xl tracking-tight md:text-5xl">
          What people say
        </h2>
      </FadeIn>

      <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-16">
        {/* Aggregate */}
        <FadeIn delay={0.1}>
          <div className="rounded-[2rem] border border-line bg-surface p-8 lg:sticky lg:top-28">
            <div className="flex items-end gap-3">
              <span className="font-display text-6xl leading-none tracking-tight">
                {product.rating}
              </span>
              <div className="pb-1">
                <Rating value={product.rating} size={15} />
                <p className="mt-1 text-[13px] text-mute">
                  {product.reviewCount} verified reviews
                </p>
              </div>
            </div>
            <div className="mt-7 space-y-2.5">
              {dist.map((pct, i) => (
                <div key={i} className="flex items-center gap-3 text-[13px]">
                  <span className="w-6 shrink-0 text-right tabular-nums text-ink-soft">
                    {5 - i}★
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-deep">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: 0.15 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full rounded-full bg-gold"
                    />
                  </div>
                  <span className="w-9 shrink-0 tabular-nums text-mute">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Individual reviews */}
        <div className="space-y-5 lg:col-span-2">
          {product.reviews.map((review, i) => (
            <FadeIn key={review.author} delay={0.08 * i}>
              <article className="rounded-2xl border border-line bg-surface p-7 transition-shadow duration-300 hover:shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-blush font-display text-lg text-rose-deep">
                      {review.author[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold tracking-tight">
                        {review.author}
                      </p>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-mute">
                        <BadgeCheck size={13} className="text-pine" />
                        Verified purchase
                      </p>
                    </div>
                  </div>
                  <time className="text-xs text-mute" dateTime={review.date}>
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <div className="mt-4">
                  <Rating value={review.rating} size={13} />
                  <h3 className="mt-2.5 font-display text-lg tracking-tight">
                    {review.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
                    {review.body}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
