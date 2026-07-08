"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="lg:sticky lg:top-28 lg:self-start"
    >
      <div className="relative aspect-[4/5] touch-pan-y overflow-hidden rounded-[2rem] bg-cream-deep shadow-soft">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 && index < images.length - 1)
                setIndex(index + 1);
              else if (info.offset.x > 60 && index > 0) setIndex(index - 1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[index]}
              alt={`${name} — view ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 92vw, 46vw"
              draggable={false}
              className="pointer-events-none object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Index indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-cream" : "w-1.5 bg-cream/50 hover:bg-cream/80"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${name}`}
              className={cn(
                "relative size-20 cursor-pointer overflow-hidden rounded-xl transition-all duration-300 md:size-24",
                i === index
                  ? "ring-2 ring-ink ring-offset-2 ring-offset-cream"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
