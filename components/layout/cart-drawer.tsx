"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useUI } from "@/lib/ui-store";
import { useLockBody, useKey } from "@/lib/hooks";
import { PRODUCTS } from "@/lib/products";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { ButtonLink } from "@/components/ui/button";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const { lines, setQuantity, remove } = useCart();
  useLockBody(cartOpen);
  useKey("Escape", () => setCartOpen(false), cartOpen);

  const items = lines
    .map((l) => ({
      product: PRODUCTS.find((p) => p.id === l.productId)!,
      quantity: l.quantity,
    }))
    .filter((i) => i.product);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed right-0 top-0 z-[71] flex h-dvh w-full max-w-[26rem] flex-col bg-cream shadow-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-2xl tracking-tight">
                Cart
                {items.length > 0 && (
                  <span className="ml-2 text-base text-mute">
                    ({items.reduce((n, i) => n + i.quantity, 0)})
                  </span>
                )}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="cursor-pointer rounded-full p-2 transition-colors hover:bg-ink/5"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-cream-deep text-ink-soft">
                  <ShoppingBag size={24} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-display text-2xl tracking-tight">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    Slow rituals start with a single object. Browse the
                    collection to begin.
                  </p>
                </div>
                <ButtonLink
                  href="/shop"
                  onClick={() => setCartOpen(false)}
                  className="mt-2"
                >
                  Explore the shop
                </ButtonLink>
              </div>
            ) : (
              <>
                {/* Free shipping progress */}
                <div className="border-b border-line px-6 py-4">
                  <p className="mb-2.5 flex items-center gap-1.5 text-[13px] text-ink-soft">
                    {remaining > 0 ? (
                      <>
                        You&apos;re{" "}
                        <span className="font-semibold text-ink">
                          {formatPrice(remaining)}
                        </span>{" "}
                        away from free shipping
                      </>
                    ) : (
                      <>
                        <span className="flex size-4 items-center justify-center rounded-full bg-pine text-cream">
                          <Check size={10} strokeWidth={3} />
                        </span>
                        Free shipping unlocked
                      </>
                    )}
                  </p>
                  <div className="h-1 overflow-hidden rounded-full bg-cream-deep">
                    <motion.div
                      className="h-full rounded-full bg-pine"
                      initial={false}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    />
                  </div>
                </div>

                {/* Line items */}
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map(({ product, quantity }) => (
                      <motion.li
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 32, transition: { duration: 0.25 } }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="flex gap-4 py-5"
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-cream-deep"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                href={`/product/${product.slug}`}
                                onClick={() => setCartOpen(false)}
                                className="block truncate text-sm font-medium tracking-tight hover:text-rose-deep"
                              >
                                {product.name}
                              </Link>
                              <p className="mt-0.5 text-xs text-mute">
                                {product.brand}
                              </p>
                            </div>
                            <button
                              onClick={() => remove(product.id)}
                              aria-label={`Remove ${product.name}`}
                              className="cursor-pointer rounded-full p-1 text-mute transition-colors hover:bg-ink/5 hover:text-ink"
                            >
                              <X size={15} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <QuantityStepper
                              size="sm"
                              value={quantity}
                              onChange={(q) => setQuantity(product.id, q)}
                            />
                            <span className="text-sm font-semibold tabular-nums">
                              {formatPrice(product.price * quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Footer */}
                <div className="border-t border-line bg-surface px-6 py-5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-ink-soft">Subtotal</span>
                    <span className="font-display text-xl tabular-nums tracking-tight">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-mute">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <ButtonLink
                    href="/checkout"
                    size="lg"
                    onClick={() => setCartOpen(false)}
                    className="w-full"
                  >
                    Checkout
                    <ArrowRight size={17} />
                  </ButtonLink>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-3 w-full cursor-pointer text-center text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
