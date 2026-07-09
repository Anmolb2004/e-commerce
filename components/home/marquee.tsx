const ITEMS = [
  "Small-batch, always",
  "Plastic-free shipping",
  "Carbon-neutral delivery",
  "Cruelty-free formulas",
  "A seed planted per order",
  "30-day easy returns",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-pine-deep bg-pine py-4 sm:py-3.5">
      <div className="flex w-max animate-marquee gap-0 hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-8 pr-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-cream sm:text-[12.5px] sm:font-medium sm:tracking-[0.22em] sm:text-cream/85"
              >
                {item}
                <span className="text-blush">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
