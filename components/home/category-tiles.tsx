import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";

export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:px-8">
      <SectionHeading
        eyebrow="The collections"
        title="Six ways to slow down"
        link={{ href: "/shop", label: "Browse everything" }}
      />
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <StaggerItem key={cat.name}>
            <Link
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative block overflow-hidden rounded-2xl shadow-soft ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="relative aspect-[4/5] sm:aspect-[4/3]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] saturate-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/5 sm:from-ink/70 sm:via-ink/10 sm:to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3.5 sm:p-6">
                <div>
                  <h3 className="font-display text-[1.35rem] leading-none tracking-tight text-cream sm:text-2xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-cream/85 sm:text-[13px] sm:text-cream/75">
                    {cat.blurb}
                  </p>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream/20 text-cream backdrop-blur-md transition-all duration-300 group-hover:bg-cream group-hover:text-ink sm:size-10">
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
