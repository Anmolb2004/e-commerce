import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProduct, getRelated, PRODUCTS } from "@/lib/products";
import { Gallery } from "@/components/product/gallery";
import { ProductInfo } from "@/components/product/product-info";
import { Reviews } from "@/components/product/reviews";
import { ProductCard } from "@/components/shop/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: `${product.tagline}. ${product.description}`,
    openGraph: {
      title: `${product.name} — Rosée`,
      description: product.tagline,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-[13px] text-mute">
        <Link href="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <ChevronRight size={13} />
        <Link href="/shop" className="transition-colors hover:text-ink">
          Shop
        </Link>
        <ChevronRight size={13} />
        <Link
          href={`/shop?category=${encodeURIComponent(product.category)}`}
          className="transition-colors hover:text-ink"
        >
          {product.category}
        </Link>
        <ChevronRight size={13} />
        <span className="truncate text-ink" aria-current="page">
          {product.name}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Gallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      <Reviews product={product} />

      <section className="mt-24">
        <SectionHeading
          eyebrow="Keep browsing"
          title="You may also like"
          link={{ href: "/shop", label: "Shop everything" }}
        />
        <Stagger className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {related.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
