import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export function SectionHeading({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <FadeIn className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10 md:mb-14">
      <div>
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-rose sm:font-medium">
          {eyebrow}
        </p>
        <h2 className="font-display text-[2.35rem] leading-[1.02] tracking-tight text-balance text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex items-center gap-2 pb-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          {link.label}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      )}
    </FadeIn>
  );
}
