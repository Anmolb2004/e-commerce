"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Truck, Recycle, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { useUI } from "@/lib/ui-store";
import { formatPrice, discountPercent, cn } from "@/lib/utils";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Accordion } from "@/components/ui/accordion";

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const setCartOpen = useUI((s) => s.setCartOpen);

  const addToCart = () => {
    if (added || !product.inStock) return;
    add(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setCartOpen(true);
      setAdded(false);
    }, 650);
  };

  const accordionItems = [
    {
      title: "Details",
      content: (
        <ul className="space-y-2">
          {product.details.map((d) => (
            <li key={d} className="flex items-start gap-2.5">
              <span className="mt-[9px] size-1 shrink-0 rounded-full bg-rose" />
              {d}
            </li>
          ))}
        </ul>
      ),
    },
    ...(product.ingredients
      ? [{ title: "Ingredients", content: <p>{product.ingredients}</p> }]
      : []),
    {
      title: "Shipping & returns",
      content: (
        <p>
          Ships within 2–4 business days in plastic-free packaging. Free
          carbon-neutral shipping on orders over $75. Changed your mind?
          Returns are free within 30 days — no questions, no forms, just a
          prepaid label.
        </p>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2.5">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-mute">
          {product.brand}
        </p>
        {product.isNew && <Badge tone="pine">New</Badge>}
        {product.isBestseller && <Badge tone="blush">Bestseller</Badge>}
      </div>

      <h1 className="mt-3 font-display text-4xl leading-[1.03] tracking-tight text-balance md:text-5xl">
        {product.name}
      </h1>
      <p className="mt-3 font-display text-lg italic text-ink-soft">
        {product.tagline}
      </p>

      <a
        href="#reviews"
        className="mt-4 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
      >
        <Rating value={product.rating} size={15} />
        <span>
          <span className="font-semibold text-ink">{product.rating}</span> ·{" "}
          {product.reviewCount} reviews
        </span>
      </a>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-display text-3xl tracking-tight tabular-nums">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="text-lg text-mute line-through tabular-nums">
              {formatPrice(product.compareAtPrice)}
            </span>
            <Badge tone="rose">
              Save {discountPercent(product.price, product.compareAtPrice)}%
            </Badge>
          </>
        )}
      </div>

      <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-ink-soft">
        {product.description}
      </p>

      {/* Stock status */}
      <div className="mt-6 flex items-center gap-2 text-sm">
        <span
          className={cn(
            "relative flex size-2.5 rounded-full",
            !product.inStock
              ? "bg-mute"
              : product.lowStock
                ? "bg-gold"
                : "bg-pine"
          )}
        >
          {product.inStock && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                product.lowStock ? "bg-gold" : "bg-pine"
              )}
            />
          )}
        </span>
        {!product.inStock ? (
          <span className="text-mute">Sold out — back in 2–3 weeks</span>
        ) : product.lowStock ? (
          <span className="text-ink-soft">
            Low stock — only a few pieces left
          </span>
        ) : (
          <span className="text-ink-soft">In stock, ships in 2–4 days</span>
        )}
      </div>

      {/* Buy row */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <motion.button
          onClick={addToCart}
          disabled={!product.inStock}
          whileTap={product.inStock ? { scale: 0.97 } : undefined}
          className={cn(
            "relative flex h-[52px] min-w-56 flex-1 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 text-[15px] font-medium text-cream transition-colors duration-300 sm:flex-none",
            added ? "bg-pine" : "bg-ink hover:bg-pine-deep",
            !product.inStock && "cursor-not-allowed bg-mute/40 hover:bg-mute/40"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5"
              >
                <Check size={18} /> Added to cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5"
              >
                <ShoppingBag size={18} />
                {product.inStock
                  ? `Add to cart — ${formatPrice(product.price * quantity)}`
                  : "Sold out"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Perks */}
      <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-line bg-surface p-4 text-center">
        {[
          { icon: Truck, label: "Free shipping $75+" },
          { icon: ShieldCheck, label: "30-day returns" },
          { icon: Recycle, label: "Plastic-free box" },
        ].map((perk) => (
          <div key={perk.label} className="flex flex-col items-center gap-1.5 py-1">
            <perk.icon size={17} strokeWidth={1.75} className="text-rose-deep" />
            <span className="text-[12px] leading-tight text-ink-soft">
              {perk.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Accordion items={accordionItems} />
      </div>
    </motion.div>
  );
}
