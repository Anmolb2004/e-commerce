"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/lib/products";
import { cn } from "@/lib/utils";
import type { Filters } from "./shop-client";

export const PRICE_OPTIONS = [
  { key: "", label: "Any price" },
  { key: "under-30", label: "Under $30", min: 0, max: 30 },
  { key: "30-60", label: "$30 – $60", min: 30, max: 60 },
  { key: "60-100", label: "$60 – $100", min: 60, max: 100 },
  { key: "100-plus", label: "$100 & above", min: 100, max: Infinity },
] as const;

export const RATING_OPTIONS = [
  { key: "", label: "Any rating" },
  { key: "4.5", label: "4.5 & up" },
  { key: "4", label: "4.0 & up" },
  { key: "3.5", label: "3.5 & up" },
] as const;

function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-mute">
      {children}
    </p>
  );
}

function CheckRow({
  label,
  meta,
  checked,
  onChange,
}: {
  label: string;
  meta?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-[7px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={cn(
          "flex size-[18px] items-center justify-center rounded-[5px] border transition-all duration-200",
          checked
            ? "border-ink bg-ink text-cream"
            : "border-line bg-surface group-hover:border-ink/40"
        )}
      >
        <motion.span
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <Check size={11} strokeWidth={3.5} />
        </motion.span>
      </span>
      <span
        className={cn(
          "flex-1 text-sm tracking-tight transition-colors",
          checked ? "text-ink" : "text-ink-soft group-hover:text-ink"
        )}
      >
        {label}
      </span>
      {meta && <span className="text-xs tabular-nums text-mute">{meta}</span>}
    </label>
  );
}

function RadioRow({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-[7px]">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={cn(
          "flex size-[18px] items-center justify-center rounded-full border transition-all duration-200",
          checked
            ? "border-ink"
            : "border-line bg-surface group-hover:border-ink/40"
        )}
      >
        <motion.span
          initial={false}
          animate={{ scale: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="size-2.5 rounded-full bg-ink"
        />
      </span>
      <span
        className={cn(
          "text-sm tracking-tight transition-colors",
          checked ? "text-ink" : "text-ink-soft group-hover:text-ink"
        )}
      >
        {label}
      </span>
    </label>
  );
}

export function FilterPanel({
  filters,
  toggleCategory,
  toggleBrand,
  setPrice,
  setRating,
  toggleStock,
}: {
  filters: Filters;
  toggleCategory: (c: string) => void;
  toggleBrand: (b: string) => void;
  setPrice: (p: string) => void;
  setRating: (r: string) => void;
  toggleStock: () => void;
}) {
  return (
    <div className="space-y-9">
      <div>
        <GroupTitle>Collection</GroupTitle>
        {CATEGORIES.map((c) => (
          <CheckRow
            key={c.name}
            label={c.name}
            meta={String(PRODUCTS.filter((p) => p.category === c.name).length)}
            checked={filters.categories.includes(c.name)}
            onChange={() => toggleCategory(c.name)}
          />
        ))}
      </div>

      <div>
        <GroupTitle>Maker</GroupTitle>
        {BRANDS.map((b) => (
          <CheckRow
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => toggleBrand(b)}
          />
        ))}
      </div>

      <div>
        <GroupTitle>Price</GroupTitle>
        {PRICE_OPTIONS.map((o) => (
          <RadioRow
            key={o.key || "any"}
            name="price"
            label={o.label}
            checked={filters.price === o.key}
            onChange={() => setPrice(o.key)}
          />
        ))}
      </div>

      <div>
        <GroupTitle>Rating</GroupTitle>
        {RATING_OPTIONS.map((o) => (
          <RadioRow
            key={o.key || "any"}
            name="rating"
            label={o.label}
            checked={filters.rating === o.key}
            onChange={() => setRating(o.key)}
          />
        ))}
      </div>

      <div>
        <GroupTitle>Availability</GroupTitle>
        <button
          type="button"
          onClick={toggleStock}
          role="switch"
          aria-checked={filters.inStockOnly}
          className="flex w-full cursor-pointer items-center justify-between py-1"
        >
          <span className="text-sm tracking-tight text-ink-soft">
            In stock only
          </span>
          <span
            className={cn(
              "flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-300",
              filters.inStockOnly ? "bg-pine" : "bg-line"
            )}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={cn(
                "size-5 rounded-full bg-surface shadow-sm",
                filters.inStockOnly && "ml-auto"
              )}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
