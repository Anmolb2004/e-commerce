"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useUI } from "@/lib/ui-store";
import { useLockBody, useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Shop All", href: "/shop" },
  { label: "Candles", href: "/shop?category=Candles" },
  { label: "Skincare", href: "/shop?category=Skincare" },
  { label: "Fragrance", href: "/shop?category=Fragrance" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const mounted = useMounted();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  const { setCartOpen, setSearchOpen } = useUI();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));
  useLockBody(menuOpen);

  return (
    <>
      <div className="bg-pine-deep px-4 py-2 text-center text-[11.5px] font-medium uppercase tracking-[0.18em] text-cream/90">
        Complimentary carbon-neutral shipping over $75
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-500",
          scrolled
            ? "border-line bg-cream/85 backdrop-blur-xl"
            : "border-transparent bg-cream"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8">
          {/* Left: nav (desktop) / menu (mobile) */}
          <div className="flex flex-1 items-center">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-ml-2 cursor-pointer rounded-full p-2 transition-colors hover:bg-ink/5 lg:hidden"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative text-[13.5px] font-medium tracking-tight text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rose transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: wordmark */}
          <Link
            href="/"
            aria-label="Rosée — home"
            className="font-display text-[26px] tracking-tight md:text-[28px]"
          >
            Rosée
            <span className="text-rose">.</span>
          </Link>

          {/* Right: search + cart */}
          <div className="flex flex-1 items-center justify-end gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="cursor-pointer rounded-full p-2.5 transition-colors hover:bg-ink/5"
            >
              <Search size={19} strokeWidth={1.75} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart${mounted && count > 0 ? `, ${count} items` : ""}`}
              className="relative -mr-2 cursor-pointer rounded-full p-2.5 transition-colors hover:bg-ink/5"
            >
              <ShoppingBag size={19} strokeWidth={1.75} />
              <AnimatePresence>
                {mounted && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute right-0.5 top-0.5 flex size-[18px] items-center justify-center rounded-full bg-rose text-[10px] font-semibold text-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-cream lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <span className="font-display text-[26px] tracking-tight">
                Rosée<span className="text-rose">.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="cursor-pointer rounded-full p-2 transition-colors hover:bg-ink/5"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col justify-center gap-2 px-8"
              aria-label="Mobile"
            >
              {[{ label: "Home", href: "/" }, ...NAV].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-4xl tracking-tight text-ink transition-colors hover:text-rose"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-8 pb-10 text-sm text-mute"
            >
              Botanical apothecary — est. 2021
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
