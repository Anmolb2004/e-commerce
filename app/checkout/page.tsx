import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure demo checkout — no real payments are processed.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
