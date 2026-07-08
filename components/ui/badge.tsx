import { cn } from "@/lib/utils";

type Tone = "ink" | "rose" | "blush" | "line" | "pine";

const tones: Record<Tone, string> = {
  ink: "bg-ink text-cream",
  rose: "bg-rose text-cream",
  blush: "bg-blush text-rose-deep",
  line: "bg-cream-deep text-ink-soft",
  pine: "bg-pine text-cream",
};

export function Badge({
  tone = "ink",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
