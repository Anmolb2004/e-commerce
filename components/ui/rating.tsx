import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = value >= i + 1;
        const half = !filled && value >= i + 0.5;
        return (
          <span key={i} className="relative inline-flex">
            <Star
              size={size}
              className={filled ? "fill-gold text-gold" : "fill-line text-line"}
              strokeWidth={0}
            />
            {half && (
              <StarHalf
                size={size}
                className="fill-gold text-gold absolute inset-0"
                strokeWidth={0}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
