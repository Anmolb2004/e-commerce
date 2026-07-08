"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PaymentPhase = "processing" | "success" | "declined";

const STEPS = [
  "Encrypting your details…",
  "Contacting your bank…",
  "Confirming payment…",
];

function SuccessCheck() {
  return (
    <svg viewBox="0 0 64 64" className="size-20" aria-hidden>
      <motion.circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="#2a382c"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}

export function PaymentOverlay({
  phase,
  onRetry,
}: {
  phase: PaymentPhase | null;
  onRetry: () => void;
}) {
  const [step, setStep] = useState(0);
  const [prevPhase, setPrevPhase] = useState(phase);

  // Reset the step counter whenever a new processing run starts.
  if (phase !== prevPhase) {
    setPrevPhase(phase);
    if (phase === "processing") setStep(0);
  }

  useEffect(() => {
    if (phase !== "processing") return;
    const t = setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
      850
    );
    return () => clearInterval(t);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-md"
          role="alertdialog"
          aria-label="Payment status"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="w-full max-w-sm rounded-[2rem] bg-cream p-10 text-center shadow-lift"
          >
            {phase === "processing" && (
              <>
                <div className="relative mx-auto size-20">
                  <motion.span
                    className="absolute inset-0 rounded-full border-[3px] border-line border-t-rose"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="absolute inset-[26%] rounded-full bg-blush" />
                </div>
                <div className="mt-7 h-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={step}
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -18, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[15px] font-medium tracking-tight"
                    >
                      {STEPS[step]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <p className="mt-2 text-[13px] text-mute">
                  This is a simulation — nothing is charged.
                </p>
              </>
            )}

            {phase === "success" && (
              <>
                <div className="mx-auto flex size-20 items-center justify-center">
                  <SuccessCheck />
                </div>
                <p className="mt-6 font-display text-2xl tracking-tight">
                  Payment confirmed
                </p>
                <p className="mt-1.5 text-sm text-mute">
                  Preparing your order…
                </p>
              </>
            )}

            {phase === "declined" && (
              <>
                <motion.div
                  animate={{ x: [0, -10, 10, -7, 7, -3, 3, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto flex size-20 items-center justify-center rounded-full bg-rose/15 text-rose-deep"
                >
                  <ShieldAlert size={34} strokeWidth={1.75} />
                </motion.div>
                <p className="mt-6 font-display text-2xl tracking-tight">
                  Payment declined
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  Your bank declined this card (that&apos;s the demo card ending
                  in 0000). Try any other card number.
                </p>
                <Button onClick={onRetry} className="mt-7 w-full" size="lg">
                  Try a different card
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
