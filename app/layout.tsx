import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
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
    siteName: "Rosée",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosée — Botanical Apothecary",
    description:
      "Small-batch candles, botanical skincare and fragrance, composed for the quiet rituals of the everyday.",
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </Providers>
      </body>
    </html>
  );
}
