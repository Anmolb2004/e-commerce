"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PackageX, MapPin, Mail, CalendarClock } from "lucide-react";
import type { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useMounted } from "@/lib/hooks";
import { ButtonLink } from "@/components/ui/button";

function ConfirmCheck() {
  return (
    <svg viewBox="0 0 64 64" className="size-full" aria-hidden>
      <motion.circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="#2a382c"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      />
      <motion.path
        d="M20 33.5 L28.5 42 L44 24.5"
        fill="none"
        stroke="#2a382c"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}

export function OrderClient({ id }: { id: string }) {
  const mounted = useMounted();

  // Orders live in localStorage for this demo; read once the client mounts.
  const order = useMemo<Order | null | undefined>(() => {
    if (!mounted) return undefined;
    try {
      const stored = JSON.parse(localStorage.getItem("rosee-orders") ?? "{}");
      return stored[id] ?? null;
    } catch {
      return null;
    }
  }, [mounted, id]);

  // Loading
  if (order === undefined) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <div className="skeleton mx-auto size-20 rounded-full" />
        <div className="skeleton mx-auto mt-6 h-10 w-64 rounded-2xl" />
        <div className="skeleton mt-10 h-96 rounded-[2rem]" />
      </div>
    );
  }

  // Unknown order
  if (order === null) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-28 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-cream-deep text-ink-soft">
          <PackageX size={24} strokeWidth={1.5} />
        </span>
        <h1 className="mt-6 font-display text-3xl tracking-tight">
          We can&apos;t find that order
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-mute">
          Orders in this demo live in your browser. This one may belong to
          another device — or another timeline.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-8">
          Back to the shop
        </ButtonLink>
      </div>
    );
  }

  const delivery = new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-14 sm:px-6">
      {/* Confirmation header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mx-auto size-20"
        >
          <ConfirmCheck />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mt-6 font-display text-4xl tracking-tight md:text-5xl">
            Merci, {order.name.split(" ")[0]}.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Your order is confirmed and will be wrapped by hand this week.
            Order number{" "}
            <span className="font-semibold text-ink">{order.id}</span>
          </p>
        </motion.div>
      </div>

      {/* Details card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft"
      >
        {/* Meta strip */}
        <div className="grid gap-4 border-b border-line bg-cream-deep/40 p-6 sm:grid-cols-3 sm:gap-2">
          {[
            { icon: CalendarClock, label: "Arriving by", value: delivery },
            {
              icon: MapPin,
              label: "Ship to",
              value: `${order.address}, ${order.city}`,
            },
            { icon: Mail, label: "Receipt sent to", value: order.email },
          ].map((meta) => (
            <div key={meta.label} className="flex items-start gap-3">
              <meta.icon size={16} className="mt-0.5 shrink-0 text-rose-deep" />
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-mute">
                  {meta.label}
                </p>
                <p className="mt-0.5 truncate text-[13.5px] font-medium tracking-tight">
                  {meta.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Items */}
        <ul className="divide-y divide-line px-6">
          {order.items.map((item) => (
            <li key={item.productId} className="flex items-center gap-4 py-5">
              <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium tracking-tight">
                  {item.name}
                </span>
                <span className="text-[13px] text-mute">
                  Qty {item.quantity}
                </span>
              </span>
              <span className="text-sm font-semibold tabular-nums">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <dl className="space-y-2.5 border-t border-line p-6 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Shipping</dt>
            <dd className="tabular-nums">
              {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Tax</dt>
            <dd className="tabular-nums">{formatPrice(order.tax)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-line pt-3.5">
            <dt className="font-medium">Total paid</dt>
            <dd className="font-display text-2xl tracking-tight tabular-nums">
              {formatPrice(order.total)}
            </dd>
          </div>
        </dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <ButtonLink href="/shop" size="lg">
          Continue shopping
        </ButtonLink>
        <ButtonLink href="/" size="lg" variant="outline">
          Back home
        </ButtonLink>
      </motion.div>
      <p className="mt-8 text-center text-[12px] text-mute">
        This is a simulated order — nothing was charged, and sadly no candle is
        actually on its way.
      </p>
    </div>
  );
}
