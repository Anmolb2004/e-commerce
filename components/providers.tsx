"use client";

import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster
        position="bottom-right"
        gap={10}
        toastOptions={{
          style: {
            background: "#fbfaf7",
            border: "1px solid #e2dbcc",
            color: "#211e18",
            borderRadius: "14px",
            boxShadow: "0 12px 40px -12px rgb(33 30 24 / 0.18)",
            fontFamily: "var(--font-inter)",
          },
        }}
      />
    </MotionConfig>
  );
}
