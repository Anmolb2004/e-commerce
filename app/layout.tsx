import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchOverlay } from "@/components/layout/search-overlay";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rosee.example.com"),
  title: {
    default: "Rosée — Botanical Apothecary",
    template: "%s — Rosée",
  },
  description:
    "Small-batch candles, botanical skincare and fragrance, composed for the quiet rituals of the everyday. Plastic-free shipping, carbon-neutral delivery.",
  keywords: ["apothecary", "candles", "skincare", "fragrance", "botanical"],
  openGraph: {
    title: "Rosée — Botanical Apothecary",
    description:
      "Small-batch candles, botanical skincare and fragrance, composed for the quiet rituals of the everyday.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </Providers>
      </body>
    </html>
  );
}
