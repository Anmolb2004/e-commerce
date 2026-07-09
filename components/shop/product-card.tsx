"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { useUI } from "@/lib/ui-store";
import { formatPrice, discountPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const add = useCart((s) => s.add);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const [justAdded, setJustAdded] = useState(false);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (justAdded) return;
    add(product);
    setJustAdded(true);
    toast.success("Added to your cart", {
      description: product.name,
      action: { label: "View cart", onClick: () => setCartOpen(true) },
    });
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block outline-offset-4"
      aria-label={product.name}
    >
      <div className="relative overflow-hidden rounded-2xl bg-cream-deep">
        <div className="relative aspect-[4/5]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] max-lg:saturate-[1.04] max-lg:contrast-[1.02]",
              product.images[1] && "lg:group-hover:opacity-0",
              !product.inStock && "opacity-60 saturate-[0.7]"
            )}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="hidden object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100 lg:block"
            />
          )}
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {!product.inStock && <Badge tone="line">Sold out</Badge>}
          {product.inStock && product.compareAtPrice && (
            <Badge tone="rose">
              −{discountPercent(product.price, product.compareAtPrice)}%
            </Badge>
          )}
          {product.inStock && product.isNew && <Badge tone="pine">New</Badge>}
          {product.inStock && product.isBestseller && (
            <Badge tone="blush">Bestseller</Badge>
          )}
        </div>

        {/* Quick add — always visible on touch, hover bar on desktop */}
        {product.inStock && (
          <motion.button
            onClick={quickAdd}
            whileTap={{ scale: 0.88 }}
            aria-label={`Add ${product.name} to cart`}
            className={cn(
              "absolute bottom-3 right-3 flex size-10 cursor-pointer items-center justify-center rounded-full shadow-soft backdrop-blur-md transition-colors duration-300 lg:hidden",
              justAdded ? "bg-pine text-cream" : "bg-cream/90 text-ink"
            )}
          >
            {justAdded ? <Check size={17} /> : <Plus size={17} />}
          </motion.button>
        )}
        {product.inStock && (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-3 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 lg:block">
            <button
              onClick={quickAdd}
              className={cn(
                "pointer-events-auto flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium backdrop-blur-md transition-colors duration-300",
                justAdded
                  ? "bg-pine text-cream"
                  : "bg-cream/85 text-ink hover:bg-ink hover:text-cream"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} /> Added
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} /> Add to cart
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="mt-4 space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
          {product.brand}
        </p>
        <h3 className="font-medium leading-snug tracking-tight transition-colors duration-300 group-hover:text-rose-deep">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[13px] text-mute line-through tabular-nums">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 pt-0.5">
          <Rating value={product.rating} size={12} />
          <span className="text-xs text-mute">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
}
