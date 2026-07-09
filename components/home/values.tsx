import { Sprout, PackageOpen, FlaskConical } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/motion";

const VALUES = [
  {
    icon: Sprout,
    title: "Grown, not synthesized",
    body: "Every formula starts in soil — rose fields in Grasse, lavender in Provence, cedar from managed forests.",
  },
  {
    icon: FlaskConical,
    title: "Made in small batches",
    body: "Nothing is warehoused for years. Candles are poured weekly; serums are bottled in editions of a thousand.",
  },
  {
    icon: PackageOpen,
    title: "Nothing to throw away",
    body: "Glass you'll reuse, paper you can plant, and not a gram of plastic — from our studio door to yours.",
  },
];

export function Values() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 md:pb-28 lg:px-8">
      <Stagger className="grid gap-5 rounded-[1.75rem] border border-line bg-gradient-to-b from-surface via-surface to-blush/25 p-7 shadow-soft sm:rounded-[2rem] sm:p-10 sm:from-surface sm:via-surface sm:to-surface md:grid-cols-3 md:gap-10 md:p-14">
        {VALUES.map((v) => (
          <StaggerItem key={v.title}>
            <span className="flex size-12 items-center justify-center rounded-full bg-blush text-rose-deep ring-1 ring-rose/15">
              <v.icon size={21} strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 font-display text-[1.35rem] tracking-tight text-ink sm:text-[22px]">
              {v.title}
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink/80 sm:text-ink-soft">
              {v.body}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
