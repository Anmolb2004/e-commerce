"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useUI } from "@/lib/ui-store";
import { useLockBody } from "@/lib/hooks";
import { searchProducts, BESTSELLERS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useLockBody(searchOpen);

  const results = searchProducts(query).slice(0, 8);

  // Global shortcuts: ⌘K / Ctrl+K opens, Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  // Clear the previous query whenever the overlay reopens.
  const [prevOpen, setPrevOpen] = useState(searchOpen);
  if (searchOpen !== prevOpen) {
    setPrevOpen(searchOpen);
    if (searchOpen) setQuery("");
  }

  useEffect(() => {
    if (searchOpen) {
      // Wait a beat for the mount animation before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  const go = (slug: string) => {
    setSearchOpen(false);
    router.push(`/product/${slug}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-cream/92 backdrop-blur-2xl"
          role="dialog"
          aria-label="Search"
        >
          <div className="mx-auto max-w-3xl px-4 pb-24 pt-20 sm:px-6 md:pt-28">
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 border-b-2 border-ink pb-4">
                <Search size={26} strokeWidth={1.5} className="shrink-0 text-ink-soft" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && results[0]) go(results[0].slug);
                  }}
                  placeholder="Search the apothecary…"
                  aria-label="Search products"
                  className="w-full bg-transparent font-display text-3xl tracking-tight outline-none placeholder:text-mute/60 md:text-4xl"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="shrink-0 cursor-pointer rounded-full border border-line p-2.5 transition-colors hover:bg-ink hover:text-cream"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-mute">
                {query
                  ? `${results.length} result${results.length === 1 ? "" : "s"}`
                  : "Type to search · esc to close"}
              </p>
            </motion.div>

            {/* Results */}
            <div className="mt-8">
              {query && results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center"
                >
                  <p className="font-display text-2xl tracking-tight">
                    Nothing found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-2 text-sm text-mute">
                    Try &ldquo;candle&rdquo;, &ldquo;serum&rdquo; or &ldquo;rose&rdquo; —
                    or browse the full collection.
                  </p>
                </motion.div>
              )}

              {query && results.length > 0 && (
                <ul className="divide-y divide-line">
                  {results.map((p, i) => (
                    <motion.li
                      key={p.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        onClick={() => go(p.slug)}
                        className="group flex w-full cursor-pointer items-center gap-5 py-4 text-left"
                      >
                        <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="64px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium tracking-tight group-hover:text-rose-deep">
                            {p.name}
                          </span>
                          <span className="mt-0.5 block text-[13px] text-mute">
                            {p.category} · {p.brand}
                          </span>
                        </span>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatPrice(p.price)}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="text-mute opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}

              {!query && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-mute">
                    Popular right now
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {BESTSELLERS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => go(p.slug)}
                        className="cursor-pointer rounded-full border border-line bg-surface px-4 py-2 text-sm tracking-tight transition-all duration-300 hover:border-ink hover:bg-ink hover:text-cream"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
