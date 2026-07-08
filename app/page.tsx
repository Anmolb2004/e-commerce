import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { CategoryTiles } from "@/components/home/category-tiles";
import { Featured } from "@/components/home/featured";
import { Editorial } from "@/components/home/editorial";
import { Values } from "@/components/home/values";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
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
