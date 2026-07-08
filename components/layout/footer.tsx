import Link from "next/link";
import { Leaf, Recycle, Truck } from "lucide-react";

const SHOP_LINKS = [
  { label: "Shop all", href: "/shop" },
  { label: "Candles", href: "/shop?category=Candles" },
  { label: "Skincare", href: "/shop?category=Skincare" },
  { label: "Fragrance", href: "/shop?category=Fragrance" },
  { label: "Bath & Body", href: "/shop?category=Bath+%26+Body" },
  { label: "Botanicals", href: "/shop?category=Botanicals" },
];

export function Footer() {
  return (
    <footer className="bg-pine-deep text-cream">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand statement */}
          <div className="md:col-span-5">
            <p className="font-display text-3xl leading-snug tracking-tight text-balance md:text-4xl">
              Objects and rituals for a life lived{" "}
              <em className="text-blush">slowly</em>.
            </p>
            <div className="mt-8 flex flex-col gap-3 text-sm text-cream/70">
              <span className="inline-flex items-center gap-2.5">
                <Truck size={15} strokeWidth={1.75} /> Free carbon-neutral shipping over $75
              </span>
              <span className="inline-flex items-center gap-2.5">
                <Recycle size={15} strokeWidth={1.75} /> Plastic-free, recyclable packaging
              </span>
              <span className="inline-flex items-center gap-2.5">
                <Leaf size={15} strokeWidth={1.75} /> A seed planted with every order
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:justify-items-end">
            <nav aria-label="Shop">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
                Shop
              </p>
              <ul className="space-y-2.5">
                {SHOP_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/80 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Atelier">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
                Atelier
              </p>
              <ul className="space-y-2.5 text-sm text-cream/80">
                <li>
                  <Link href="/#story" className="transition-colors hover:text-cream">
                    Our story
                  </Link>
                </li>
                <li>
                  <Link href="/#bestsellers" className="transition-colors hover:text-cream">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="/#newsletter" className="transition-colors hover:text-cream">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
                Care
              </p>
              <ul className="space-y-2.5 text-sm text-cream/80">
                <li>30-day easy returns</li>
                <li>Ships in 2–4 days</li>
                <li>hello@rosee.shop</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden
          className="mt-16 select-none text-center font-display text-[22vw] leading-[0.85] tracking-tight text-cream/[0.07] md:mt-20"
        >
          Rosée
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© 2026 Rosée Atelier. All rights reserved.</p>
          <p>A concept store — checkout is fully simulated, no real payments.</p>
        </div>
      </div>
    </footer>
  );
}
