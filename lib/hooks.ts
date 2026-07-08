"use client";

import { useEffect, useSyncExternalStore } from "react";

/** Lock body scroll while `locked` is true (drawers, overlays). */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

const emptySubscribe = () => () => {};

/** True once mounted on the client — guards persisted-store hydration. */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/** Run a handler when `key` is pressed. */
export function useKey(key: string, handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === key) handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, handler, enabled]);
}
