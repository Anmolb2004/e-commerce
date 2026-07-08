"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/lib/products";
import type { Product, SortKey } from "@/lib/types";
import { useLockBody } from "@/lib/hooks";
import { ProductCard } from "./product-card";
import { FilterPanel, PRICE_OPTIONS, RATING_OPTIONS } from "./filter-panel";
import { SortMenu, SORT_OPTIONS } from "./sort-menu";
import { Button } from "@/components/ui/button";

export interface Filters {
  categories: string[];
  brands: string[];
  price: string;
  rating: string;
  inStockOnly: boolean;
  sort: SortKey;
}

const CATEGORY_NAMES = CATEGORIES.map((c) => c.name as string);
const SORT_KEYS = SORT_OPTIONS.map((o) => o.key);

function applyFilters(filters: Filters, query: string): Product[] {
  const q = query.trim().toLowerCase();
  const priceOpt = PRICE_OPTIONS.find((o) => o.key === filters.price);
  const minRating = filters.rating ? parseFloat(filters.rating) : 0;

  const result = PRODUCTS.filter((p) => {
    if (filters.categories.length && !filters.categories.includes(p.category))
      return false;
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
    if (priceOpt && "min" in priceOpt) {
      if (p.price < priceOpt.min || p.price >= priceOpt.max) return false;
    }
    if (p.rating < minRating) return false;
    if (filters.inStockOnly && !p.inStock) return false;
    if (q) {
      const haystack = [p.name, p.brand, p.category, p.tagline, ...p.tags]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "newest":
      return result.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "popular":
      return result.sort((a, b) => b.popularity - a.popularity);
    case "rating":
      return result.sort((a, b) => b.rating - a.rating);
    default:
      return result;
  }
}

export function ShopClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const [query, setQuery] = useState(sp.get("q") ?? "");
  const [sheetOpen, setSheetOpen] = useState(false);
  useLockBody(sheetOpen);

  // URL is the single source of truth for filters — shareable and back-button friendly.
  const filters: Filters = useMemo(() => {
    const sort = sp.get("sort") as SortKey | null;
    return {
      categories: (sp.get("category")?.split(",") ?? []).filter((c) =>
        CATEGORY_NAMES.includes(c)
      ),
      brands: (sp.get("brand")?.split(",") ?? []).filter((b) =>
        (BRANDS as readonly string[]).includes(b)
      ),
      price: PRICE_OPTIONS.some((o) => o.key === sp.get("price"))
        ? sp.get("price")!
        : "",
      rating: RATING_OPTIONS.some((o) => o.key === sp.get("rating"))
        ? sp.get("rating")!
        : "",
      inStockOnly: sp.get("stock") === "in",
      sort: sort && SORT_KEYS.includes(sort) ? sort : "featured",
    };
  }, [sp]);

  const patch = (updates: Partial<Record<string, string | null>>) => {
    const p = new URLSearchParams(sp.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) p.set(key, value);
      else p.delete(key);
    }
    router.replace(`/shop${p.size ? `?${p}` : ""}`, { scroll: false });
  };

  const toggleList = (key: "category" | "brand", current: string[], value: string) => {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    patch({ [key]: next.join(",") || null });
  };

  const products = useMemo(() => applyFilters(filters, query), [filters, query]);

  const activeChips: { label: string; clear: () => void }[] = [
    ...filters.categories.map((c) => ({
      label: c,
      clear: () => toggleList("category", filters.categories, c),
    })),
    ...filters.brands.map((b) => ({
      label: b,
      clear: () => toggleList("brand", filters.brands, b),
    })),
    ...(filters.price
      ? [
          {
            label: PRICE_OPTIONS.find((o) => o.key === filters.price)!.label,
            clear: () => patch({ price: null }),
          },
        ]
      : []),
    ...(filters.rating
      ? [
          {
            label: `${filters.rating}★ & up`,
            clear: () => patch({ rating: null }),
          },
        ]
      : []),
    ...(filters.inStockOnly
      ? [{ label: "In stock", clear: () => patch({ stock: null }) }]
      : []),
  ];

  const filterProps = {
    filters,
    toggleCategory: (c: string) => toggleList("category", filters.categories, c),
    toggleBrand: (b: string) => toggleList("brand", filters.brands, b),
    setPrice: (price: string) => patch({ price: price || null }),
    setRating: (rating: string) => patch({ rating: rating || null }),
    toggleStock: () => patch({ stock: filters.inStockOnly ? null : "in" }),
  };

  const heading =
    filters.categories.length === 1 ? filters.categories[0] : "All objects";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 md:pt-14 lg:px-8">
      {/* Page head */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.22em] text-rose">
          The shop
        </p>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="font-display text-5xl tracking-tight md:text-6xl">
            {heading}
          </h1>
          <p className="text-sm text-mute" aria-live="polite">
            {products.length} of {PRODUCTS.length} pieces
          </p>
        </div>
      </motion.div>

      {/* Toolbar */}
      <div className="sticky top-16 z-30 -mx-4 mt-8 border-b border-line bg-cream/85 px-4 py-3.5 backdrop-blur-xl sm:-mx-6 sm:px-6 md:top-[72px] lg:-mx-8 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search candles, serums, rose…"
              aria-label="Search products"
              className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-10 text-sm outline-none transition-colors placeholder:text-mute/70 focus:border-ink"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-mute transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setSheetOpen(true)}
              className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium tracking-tight transition-colors hover:border-ink/40 lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeChips.length > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-rose text-[11px] font-semibold text-cream">
                  {activeChips.length}
                </span>
              )}
            </button>
            <SortMenu value={filters.sort} onChange={(sort) => patch({ sort: sort === "featured" ? null : sort })} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-40 max-h-[calc(100dvh-12rem)] overflow-y-auto pb-8 pr-2">
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        {/* Grid */}
        <div className="lg:col-span-3">
          {/* Active chips */}
          <AnimatePresence>
            {activeChips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-7 flex flex-wrap items-center gap-2">
                  {activeChips.map((chip) => (
                    <button
                      key={chip.label}
                      onClick={chip.clear}
                      className="group flex cursor-pointer items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-cream transition-colors hover:bg-rose-deep"
                    >
                      {chip.label}
                      <X size={12} className="opacity-60 group-hover:opacity-100" />
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setQuery("");
                      router.replace("/shop", { scroll: false });
                    }}
                    className="cursor-pointer px-2 text-[13px] font-medium text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-line bg-surface/60 px-8 py-24 text-center"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-cream-deep text-ink-soft">
                <PackageSearch size={26} strokeWidth={1.5} />
              </span>
              <p className="mt-6 font-display text-2xl tracking-tight">
                Nothing matches — yet
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute">
                Try loosening a filter or two, or search for something else.
                Good things hide in unexpected collections.
              </p>
              <Button
                variant="outline"
                className="mt-7"
                onClick={() => {
                  setQuery("");
                  router.replace("/shop", { scroll: false });
                }}
              >
                Reset everything
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6"
            >
              <AnimatePresence mode="popLayout">
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard product={p} priority={i < 6} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-[2px] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
              className="fixed inset-x-0 bottom-0 z-[71] max-h-[86dvh] overflow-y-auto rounded-t-[2rem] bg-cream lg:hidden"
              role="dialog"
              aria-label="Filters"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-cream px-6 py-4">
                <h2 className="font-display text-2xl tracking-tight">Filters</h2>
                <button
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close filters"
                  className="cursor-pointer rounded-full p-2 transition-colors hover:bg-ink/5"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="px-6 py-7">
                <FilterPanel {...filterProps} />
              </div>
              <div className="sticky bottom-0 border-t border-line bg-cream px-6 py-4">
                <Button size="lg" className="w-full" onClick={() => setSheetOpen(false)}>
                  Show {products.length} piece{products.length === 1 ? "" : "s"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
