import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/shop-client";
import { ShopSkeleton } from "@/components/shop/shop-skeleton";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse small-batch candles, botanical skincare, fragrance and objects for the home. Filter by collection, maker, price and rating.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}
