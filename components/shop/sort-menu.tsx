"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
import type { SortKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "popular", label: "Most popular" },
  { key: "rating", label: "Highest rated" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
];

export function SortMenu({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = SORT_OPTIONS.find((o) => o.key === value) ?? SORT_OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-11 cursor-pointer items-center gap-2.5 rounded-full border bg-surface px-5 text-sm font-medium tracking-tight transition-colors",
          open ? "border-ink" : "border-line hover:border-ink/40"
        )}
      >
        <ArrowUpDown size={14} className="text-mute" />
        <span className="hidden sm:inline text-mute font-normal">Sort:</span>
        {current.label}
        <ChevronDown
          size={15}
          className={cn(
            "text-mute transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] z-30 w-56 origin-top-right overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-lift"
          >
            {SORT_OPTIONS.map((o) => (
              <li key={o.key} role="option" aria-selected={o.key === value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.key);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm tracking-tight transition-colors",
                    o.key === value
                      ? "bg-cream-deep font-medium text-ink"
                      : "text-ink-soft hover:bg-cream-deep/60 hover:text-ink"
                  )}
                >
                  {o.label}
                  {o.key === value && <Check size={15} className="text-rose" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
