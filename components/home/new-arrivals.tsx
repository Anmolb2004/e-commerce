import { NEW_ARRIVALS } from "@/lib/products";
import { ProductCard } from "@/components/shop/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/motion";

export function NewArrivals() {
  const products = NEW_ARRIVALS.slice(0, 6);

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Just arrived"
          title="New from the studio"
          link={{ href: "/shop?sort=newest", label: "See all new arrivals" }}
        />
      </div>
      <FadeIn>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:gap-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {products.map((p) => (
            <div
              key={p.id}
              className="w-[68vw] shrink-0 snap-start sm:w-[38vw] lg:w-[calc((80rem-8rem)/4)]"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
