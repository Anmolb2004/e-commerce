"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "light" | "rose";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-pine-deep disabled:hover:bg-ink",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-cream text-ink hover:bg-white",
  rose: "bg-rose text-cream hover:bg-rose-deep",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-[52px] px-8 text-[15px] gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium tracking-tight cursor-pointer select-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);
Button.displayName = "Button";
