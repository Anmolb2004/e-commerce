import { BESTSELLERS } from "@/lib/products";
import { ProductCard } from "@/components/shop/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";

export function Featured() {
  const products = [...BESTSELLERS]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <section
      id="bestsellers"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 md:pb-28 lg:px-8"
    >
      <SectionHeading
        eyebrow="Most loved"
        title="The pieces people return for"
        link={{ href: "/shop?sort=popular", label: "Shop bestsellers" }}
      />
      <Stagger className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {products.map((p) => (
          <StaggerItem key={p.id}>
            <ProductCard product={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
