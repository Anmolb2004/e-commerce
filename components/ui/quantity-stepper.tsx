"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const dims =
    size === "sm"
      ? { btn: "size-7", wrap: "h-9 px-1", num: "w-7 text-[13px]", icon: 13 }
      : { btn: "size-9", wrap: "h-11 px-1.5", num: "w-9 text-sm", icon: 15 };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface",
        dims.wrap
      )}
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-ink-soft hover:bg-cream-deep transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed",
          dims.btn
        )}
      >
        <Minus size={dims.icon} />
      </motion.button>
      <span className={cn("relative overflow-hidden text-center font-medium tabular-nums", dims.num)}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="inline-block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-ink-soft hover:bg-cream-deep transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed",
          dims.btn
        )}
      >
        <Plus size={dims.icon} />
      </motion.button>
    </div>
  );
}
