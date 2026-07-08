"use client";

import { cloneElement, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, CreditCard, ShoppingBag, Info, ChevronLeft } from "lucide-react";
import { useCart, cartTotals } from "@/lib/cart-store";
import { PRODUCTS } from "@/lib/products";
import type { Order } from "@/lib/types";
import { formatPrice, cn, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";
import { Button, ButtonLink } from "@/components/ui/button";
import { PaymentOverlay, type PaymentPhase } from "./payment-overlay";

interface FormState {
  email: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const INITIAL: FormState = {
  email: "",
  name: "",
  address: "",
  city: "",
  zip: "",
  country: "United States",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.12em] text-mute"
      >
        {label}
      </label>
      {cloneElement(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${id}-error` : undefined,
      })}
      {error && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-[12.5px] text-rose-deep"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const inputClass = (hasError?: string) =>
  cn(
    "h-12 w-full rounded-xl border bg-surface px-4 text-[15px] tracking-tight outline-none transition-colors placeholder:text-mute/60",
    hasError ? "border-rose" : "border-line focus:border-ink"
  );

function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3.5">
      <span className="flex size-8 items-center justify-center rounded-full bg-ink font-display text-[13px] text-cream">
        {n}
      </span>
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
    </div>
  );
}

export function CheckoutClient() {
  const router = useRouter();
  const mounted = useMounted();
  const { lines, clear } = useCart();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [phase, setPhase] = useState<PaymentPhase | null>(null);
  const [failureMessage, setFailureMessage] = useState<string | undefined>();

  const items = lines
    .map((l) => ({
      product: PRODUCTS.find((p) => p.id === l.productId)!,
      quantity: l.quantity,
    }))
    .filter((i) => i.product);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const { shipping, tax, total } = cartTotals(subtotal);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (key === "cardNumber") value = formatCardNumber(value);
    if (key === "expiry") value = formatExpiry(value);
    if (key === "cvc") value = value.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (form.name.trim().length < 2) next.name = "Enter the name on the order.";
    if (form.address.trim().length < 4) next.address = "Enter a street address.";
    if (form.city.trim().length < 2) next.city = "Enter a city.";
    if (form.zip.trim().length < 3) next.zip = "Enter a postal code.";
    if (form.cardNumber.replace(/\s/g, "").length !== 16)
      next.cardNumber = "Card number must be 16 digits.";
    const [mm] = form.expiry.split("/");
    if (form.expiry.length !== 5 || +mm < 1 || +mm > 12)
      next.expiry = "Use MM/YY format.";
    if (form.cvc.length < 3) next.cvc = "3–4 digits.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      document.querySelector("[data-error]")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setPhase("processing");
    const cardDigits = form.cardNumber.replace(/\s/g, "");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          cardLast4: cardDigits.slice(-4),
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();

      if (!data.ok) {
        // Card declines get the friendly demo copy; other API errors
        // (out of stock, validation) surface their real message.
        setFailureMessage(
          data.code === "card_declined" ? undefined : data.message
        );
        setPhase("declined");
        return;
      }

      const order: Order = {
        id: data.orderId,
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          image: i.product.images[0],
          price: i.product.price,
          quantity: i.quantity,
        })),
        subtotal,
        shipping,
        tax,
        total,
        email: form.email,
        name: form.name,
        address: form.address,
        city: `${form.city}, ${form.zip}`,
        country: form.country,
        placedAt: new Date().toISOString(),
        estimatedDelivery: data.estimatedDelivery,
      };

      const stored = JSON.parse(localStorage.getItem("rosee-orders") ?? "{}");
      stored[order.id] = order;
      localStorage.setItem("rosee-orders", JSON.stringify(stored));

      setPhase("success");
      setTimeout(() => {
        clear();
        router.push(`/order/${order.id}`);
      }, 1500);
    } catch {
      setFailureMessage(
        "We couldn't reach the payment service. Check your connection and try again."
      );
      setPhase("declined");
    }
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="skeleton h-12 w-72 rounded-2xl" />
        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-14 rounded-xl" />
            ))}
          </div>
          <div className="skeleton h-80 rounded-[2rem] lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (items.length === 0 && phase === null) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-28 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-cream-deep text-ink-soft">
          <ShoppingBag size={24} strokeWidth={1.5} />
        </span>
        <h1 className="mt-6 font-display text-3xl tracking-tight">
          Nothing to check out
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-mute">
          Your cart is empty. Wander the shop — the bergamot candle is a good
          place to start.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-8">
          Browse the collection
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
      >
        <ChevronLeft size={16} /> Continue shopping
      </Link>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h1 className="font-display text-5xl tracking-tight">Checkout</h1>
        <p className="inline-flex items-center gap-1.5 text-[13px] text-mute">
          <Lock size={13} /> Demo checkout — no real payment is processed
        </p>
      </div>

      <form onSubmit={placeOrder} noValidate className="mt-10 grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Form */}
        <div className="space-y-12 lg:col-span-3">
          <section>
            <SectionTitle n="01" title="Contact" />
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                data-error={errors.email ? "" : undefined}
                className={inputClass(errors.email)}
              />
            </Field>
          </section>

          <section>
            <SectionTitle n="02" title="Delivery" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Full name" error={errors.name}>
                  <input
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={set("name")}
                    data-error={errors.name ? "" : undefined}
                    className={inputClass(errors.name)}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Street address" error={errors.address}>
                  <input
                    autoComplete="street-address"
                    placeholder="12 Rue des Roses"
                    value={form.address}
                    onChange={set("address")}
                    data-error={errors.address ? "" : undefined}
                    className={inputClass(errors.address)}
                  />
                </Field>
              </div>
              <Field label="City" error={errors.city}>
                <input
                  autoComplete="address-level2"
                  placeholder="Lyon"
                  value={form.city}
                  onChange={set("city")}
                  data-error={errors.city ? "" : undefined}
                  className={inputClass(errors.city)}
                />
              </Field>
              <Field label="Postal code" error={errors.zip}>
                <input
                  autoComplete="postal-code"
                  placeholder="69001"
                  value={form.zip}
                  onChange={set("zip")}
                  data-error={errors.zip ? "" : undefined}
                  className={inputClass(errors.zip)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Country">
                  <input
                    autoComplete="country-name"
                    value={form.country}
                    onChange={set("country")}
                    className={inputClass()}
                  />
                </Field>
              </div>
            </div>
          </section>

          <section>
            <SectionTitle n="03" title="Payment" />
            <div className="rounded-[1.5rem] border border-line bg-surface p-6 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-medium tracking-tight">
                  <CreditCard size={17} className="text-rose-deep" />
                  Card payment
                </span>
                <span className="rounded-full bg-blush px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-rose-deep">
                  Mock gateway
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Card number" error={errors.cardNumber}>
                    <input
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                      value={form.cardNumber}
                      onChange={set("cardNumber")}
                      data-error={errors.cardNumber ? "" : undefined}
                      className={cn(inputClass(errors.cardNumber), "tabular-nums")}
                    />
                  </Field>
                </div>
                <Field label="Expiry" error={errors.expiry}>
                  <input
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="12/28"
                    value={form.expiry}
                    onChange={set("expiry")}
                    data-error={errors.expiry ? "" : undefined}
                    className={cn(inputClass(errors.expiry), "tabular-nums")}
                  />
                </Field>
                <Field label="CVC" error={errors.cvc}>
                  <input
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    value={form.cvc}
                    onChange={set("cvc")}
                    data-error={errors.cvc ? "" : undefined}
                    className={cn(inputClass(errors.cvc), "tabular-nums")}
                  />
                </Field>
              </div>
              <p className="mt-5 flex items-start gap-2 rounded-xl bg-cream px-4 py-3 text-[13px] leading-relaxed text-ink-soft">
                <Info size={15} className="mt-0.5 shrink-0 text-rose-deep" />
                <span>
                  Any details work in this demo. Use a card ending in{" "}
                  <strong className="font-semibold">0000</strong> to see a
                  declined payment.
                </span>
              </p>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-2">
          <div className="rounded-[2rem] border border-line bg-surface p-7 shadow-soft lg:sticky lg:top-28">
            <h2 className="font-display text-2xl tracking-tight">
              Order summary
            </h2>
            <ul className="mt-6 space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-4">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute -right-0 -top-0 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-cream">
                      {quantity}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block truncate font-medium tracking-tight">
                      {product.name}
                    </span>
                    <span className="text-mute">{product.brand}</span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {formatPrice(product.price * quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-7 space-y-2.5 border-t border-line pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd className="tabular-nums">
                  {shipping === 0 ? (
                    <span className="font-medium text-pine">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Tax (8%)</dt>
                <dd className="tabular-nums">{formatPrice(tax)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-3.5">
                <dt className="font-medium">Total</dt>
                <dd className="font-display text-2xl tracking-tight tabular-nums">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            {shipping > 0 && (
              <p className="mt-4 rounded-xl bg-cream px-4 py-3 text-[13px] text-ink-soft">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for
                free shipping.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={phase === "processing"}
            >
              <Lock size={16} />
              Pay {formatPrice(total)}
            </Button>
            <p className="mt-3.5 text-center text-[12px] leading-relaxed text-mute">
              Simulated transaction · Encrypted in theory, delightful in
              practice
            </p>
          </div>
        </aside>
      </form>

      <PaymentOverlay
        phase={phase}
        message={failureMessage}
        onRetry={() => setPhase(null)}
      />
    </div>
  );
}
