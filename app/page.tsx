import { SITE_URL } from "@/lib/site";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { CategoryTiles } from "@/components/home/category-tiles";
import { Featured } from "@/components/home/featured";
import { Editorial } from "@/components/home/editorial";
import { Values } from "@/components/home/values";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Rosée Atelier",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    {
      "@type": "WebSite",
      name: "Rosée — Botanical Apothecary",
      url: SITE_URL,
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Marquee />
      <CategoryTiles />
      <Featured />
      <Editorial />
      <NewArrivals />
      <Values />
      <Testimonials />
      <Newsletter />
    </>
  );
}
