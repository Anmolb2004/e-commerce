import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <p className="font-display text-[7rem] leading-none tracking-tight text-line">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight">
        Lost among the botanicals
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-mute">
        The page you&apos;re looking for has wilted, moved, or never bloomed in
        the first place. The shop, however, is very much alive.
      </p>
      <div className="mt-9 flex gap-3">
        <ButtonLink href="/shop" size="lg">
          Browse the shop
        </ButtonLink>
        <ButtonLink href="/" size="lg" variant="outline">
          Go home
        </ButtonLink>
      </div>
    </div>
  );
}
