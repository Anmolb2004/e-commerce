"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
  };

  return (
    <section id="newsletter" className="scroll-mt-24 bg-cream-deep max-lg:bg-cream-deep sm:bg-cream-deep/60">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-28">
        <FadeIn>
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-rose sm:font-medium">
            The Sunday letter
          </p>
          <h2 className="font-display text-[2.35rem] leading-[1.02] tracking-tight text-balance text-ink sm:text-4xl md:text-5xl">
            First to know, <em className="text-rose max-lg:text-rose-deep">rarely</em> in your inbox.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/80 sm:text-ink-soft">
            One letter a month — new editions, studio notes and early access.
            No noise, ever.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-9">
          <AnimatePresence mode="wait">
            {state === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="mx-auto inline-flex items-center gap-3 rounded-full border border-pine/20 bg-pine/10 px-6 py-3.5 text-[15px] font-medium text-pine"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-pine text-cream">
                  <Check size={13} strokeWidth={3} />
                </span>
                Welcome to the list — see you Sunday.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -8 }}
                onSubmit={submit}
                className="mx-auto flex max-w-md items-center gap-2"
                noValidate
              >
                <motion.div
                  animate={state === "error" ? { x: [0, -8, 8, -5, 5, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative flex-1"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    aria-invalid={state === "error"}
                    className={cn(
                      "h-[52px] w-full rounded-full border bg-surface px-6 text-[15px] outline-none transition-colors placeholder:text-mute/70",
                      state === "error"
                        ? "border-rose"
                        : "border-line focus:border-ink"
                    )}
                  />
                  {state === "error" && (
                    <p className="absolute left-6 top-full mt-1.5 text-xs text-rose-deep">
                      Please enter a valid email address.
                    </p>
                  )}
                </motion.div>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.94 }}
                  aria-label="Subscribe"
                  className="flex size-[52px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-cream transition-colors duration-300 hover:bg-pine-deep"
                >
                  <ArrowRight size={19} />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}
