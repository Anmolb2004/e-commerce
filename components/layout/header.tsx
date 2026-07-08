"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Search, ShoppingBag, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useUI } from "@/lib/ui-store";
import { useLockBody, useMounted, useKey } from "@/lib/hooks";
import { CATEGORIES, PRODUCTS, getProduct } from "@/lib/products";
import { formatPrice, cn } from "@/lib/utils";

const NAV = [
  { label: "Bestsellers", href: "/shop?sort=popular" },
  { label: "Candles", href: "/shop?category=Candles" },
  { label: "Skincare", href: "/shop?category=Skincare" },
  { label: "Our Story", href: "/#story" },
];

const MOBILE_NAV = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Bestsellers", href: "/shop?sort=popular" },
  ...CATEGORIES.map((c) => ({
    label: c.name === "Home" ? "Home & Living" : c.name,
    href: `/shop?category=${encodeURIComponent(c.name)}`,
  })),
];

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const featured = getProduct("eau-de-rosee-no1")!;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-full border-b border-line bg-cream/98 shadow-lift backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-8 py-8 lg:grid-cols-12">
        {/* Categories */}
        <div className="lg:col-span-7">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
            Collections
          </p>
          <div className="grid grid-cols-2 gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                onClick={onNavigate}
                className="group/item flex items-center gap-3.5 rounded-xl p-2.5 transition-colors hover:bg-cream-deep/70"
              >
                <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium tracking-tight">
                    {cat.name === "Home" ? "Home & Living" : cat.name}
                  </span>
                  <span className="text-xs text-mute">
                    {PRODUCTS.filter((p) => p.category === cat.name).length} pieces
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/shop"
            onClick={onNavigate}
            className="group/all mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-rose-deep transition-colors hover:text-ink"
          >
            Shop everything
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/all:translate-x-1" />
          </Link>
        </div>

        {/* Featured */}
        <div className="hidden lg:col-span-5 lg:block">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
            Most loved
          </p>
          <Link
            href={`/product/${featured.slug}`}
            onClick={onNavigate}
            className="group/feat flex items-center gap-5 rounded-2xl border border-line bg-surface p-4 transition-shadow duration-300 hover:shadow-soft"
          >
            <span className="relative size-24 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={featured.images[0]}
                alt={featured.name}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover/feat:scale-105"
              />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-lg leading-snug tracking-tight">
                {featured.name}
              </span>
              <span className="mt-0.5 block text-[13px] italic text-mute">
                {featured.tagline}
              </span>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold">
                {formatPrice(featured.price)}
                <ArrowRight
                  size={14}
                  className="text-rose-deep transition-transform duration-300 group-hover/feat:translate-x-1"
                />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const mounted = useMounted();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  const { setCartOpen, setSearchOpen } = useUI();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));
  useLockBody(menuOpen);
  useKey("Escape", () => {
    setMenuOpen(false);
    setShopOpen(false);
  }, menuOpen || shopOpen);

  const shopActive = pathname.startsWith("/shop") || pathname.startsWith("/product");

  const openShop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopOpen(true);
  };
  const scheduleCloseShop = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 160);
  };

  return (
    <>
      <div className="bg-pine-deep px-4 py-2 text-center text-[11.5px] font-medium uppercase tracking-[0.18em] text-cream/90">
        Complimentary carbon-neutral shipping over $75
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-500",
          scrolled || shopOpen
            ? "border-line bg-cream/85 backdrop-blur-xl"
            : "border-transparent bg-cream"
        )}
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8">
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
              {/* Shop + mega menu */}
              <div onMouseEnter={openShop} onMouseLeave={scheduleCloseShop}>
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  aria-expanded={shopOpen}
                  aria-haspopup="true"
                  className={cn(
                    "group relative flex cursor-pointer items-center gap-1 py-2 text-[13.5px] font-medium tracking-tight transition-colors",
                    shopActive || shopOpen ? "text-ink" : "text-ink-soft hover:text-ink"
                  )}
                >
                  Shop
                  <ChevronDown
                    size={14}
                    className={cn(
                      "text-mute transition-transform duration-300",
                      shopOpen && "rotate-180"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px w-full origin-left bg-rose transition-transform duration-300 ease-out",
                      shopActive || shopOpen
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </button>
              </div>

              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative py-2 text-[13.5px] font-medium tracking-tight text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-rose transition-transform duration-300 ease-out group-hover:scale-x-100" />
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
          <div className="flex flex-1 items-center justify-end gap-2">
            {/* Search pill (desktop) */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="hidden h-10 cursor-pointer items-center gap-2.5 rounded-full border border-line bg-surface pl-4 pr-2 text-[13px] text-mute transition-colors hover:border-ink/40 hover:text-ink md:flex"
            >
              <Search size={15} strokeWidth={1.75} />
              Search
              <kbd className="rounded-md border border-line bg-cream px-1.5 py-0.5 font-sans text-[10.5px] font-medium tracking-wide text-mute">
                ⌘K
              </kbd>
            </button>
            {/* Search icon (mobile) */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="cursor-pointer rounded-full p-2.5 transition-colors hover:bg-ink/5 md:hidden"
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

        {/* Mega menu panel */}
        <div onMouseEnter={openShop} onMouseLeave={scheduleCloseShop}>
          <AnimatePresence>
            {shopOpen && <MegaMenu onNavigate={() => setShopOpen(false)} />}
          </AnimatePresence>
        </div>
      </header>

      {/* Dim the page under the mega menu */}
      <AnimatePresence>
        {shopOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShopOpen(false)}
            className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[1px]"
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-cream lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-4">
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
              className="flex flex-1 flex-col justify-center gap-0.5 px-8 py-6"
              aria-label="Mobile"
            >
              {MOBILE_NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 font-display text-[2rem] tracking-tight text-ink transition-colors hover:text-rose"
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
              className="shrink-0 px-8 pb-10 text-sm text-mute"
            >
              Botanical apothecary — est. 2021
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
