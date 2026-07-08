"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <h1 className="font-display text-4xl tracking-tight">
        Something spilled in the studio
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-mute">
        An unexpected error occurred. Take a breath — then try again.
      </p>
      <Button size="lg" className="mt-9" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
