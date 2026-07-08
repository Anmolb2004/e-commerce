"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "./types";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, TAX_RATE } from "./utils";

interface CartLine {
  productId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.productId === product.id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === product.id
                  ? { ...l, quantity: Math.min(l.quantity + quantity, 10) }
                  : l
              ),
            };
          }
          return { lines: [...state.lines, { productId: product.id, quantity }] };
        }),
      remove: (productId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.productId !== productId)
              : state.lines.map((l) =>
                  l.productId === productId ? { ...l, quantity: Math.min(quantity, 10) } : l
                ),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "rosee-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function cartTotals(subtotal: number) {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return { shipping, tax, total: subtotal + shipping + tax };
}
