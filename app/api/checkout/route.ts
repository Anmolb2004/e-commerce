import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface CheckoutBody {
  email?: string;
  name?: string;
  cardLast4?: string;
  items?: { productId: string; quantity: number }[];
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_body", message: "Malformed request body." },
      { status: 400 }
    );
  }

  const { email, cardLast4, items } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, code: "invalid_email", message: "A valid email is required." },
      { status: 400 }
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { ok: false, code: "empty_cart", message: "The cart is empty." },
      { status: 400 }
    );
  }

  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) {
      return NextResponse.json(
        { ok: false, code: "unknown_product", message: `Unknown product ${item.productId}.` },
        { status: 400 }
      );
    }
    if (!product.inStock) {
      return NextResponse.json(
        { ok: false, code: "out_of_stock", message: `${product.name} is sold out.` },
        { status: 409 }
      );
    }
  }

  // Simulate the gateway taking its time
  await sleep(1800);

  // Demo rule: a card ending in 0000 is always declined
  if (cardLast4 === "0000") {
    return NextResponse.json(
      {
        ok: false,
        code: "card_declined",
        message: "The card was declined by the issuing bank.",
      },
      { status: 402 }
    );
  }

  const orderId = `RSE-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

  const estimatedDelivery = new Date(
    Date.now() + 6 * 24 * 60 * 60 * 1000
  ).toISOString();

  return NextResponse.json({ ok: true, orderId, estimatedDelivery });
}
