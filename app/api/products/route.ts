import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/types";

/**
 * Public product API.
 *
 * GET /api/products
 *   ?category=Candles     filter by category (comma-separated for multiple)
 *   ?brand=Wildstem       filter by brand (comma-separated)
 *   ?q=rose               full-text search across name/brand/tags
 *   ?minPrice=20&maxPrice=60
 *   ?inStock=true
 *   ?sort=newest|price-asc|price-desc|popular|rating
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const categories = searchParams.get("category")?.split(",") ?? [];
  const brands = searchParams.get("brand")?.split(",") ?? [];
  const q = searchParams.get("q")?.toLowerCase() ?? "";
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const maxPrice = Number(searchParams.get("maxPrice") ?? Infinity);
  const inStock = searchParams.get("inStock") === "true";
  const sort = searchParams.get("sort");

  let result: Product[] = PRODUCTS.filter((p) => {
    if (categories.length && !categories.includes(p.category)) return false;
    if (brands.length && !brands.includes(p.brand)) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (inStock && !p.inStock) return false;
    if (q) {
      const haystack = [p.name, p.brand, p.category, ...p.tags]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  switch (sort) {
    case "newest":
      result = [...result].sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      );
      break;
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "popular":
      result = [...result].sort((a, b) => b.popularity - a.popularity);
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
  }

  return NextResponse.json({ count: result.length, products: result });
}
