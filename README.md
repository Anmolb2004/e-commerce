# Rosée — Botanical Apothecary

A premium e-commerce concept store built as a design-first engineering exercise.
Small-batch candles, botanical skincare and fragrance — with an editorial visual
identity, obsessive micro-interactions, and a fully simulated checkout.

**Live demo:** deploy in one command (see [Deployment](#deployment)) — runs entirely on free tiers.

---

## Trying the store

1. Browse the catalog (`/shop`) — filter by collection, maker, price, rating and
   availability; sort six ways; search instantly. Filters live in the URL, so
   every view is shareable and back-button friendly.
2. Open any product, pick a quantity, add to cart — the drawer tracks your
   progress toward free shipping.
3. Check out. **Any card details work.** Use a card ending in **`0000`**
   (e.g. `4242 4242 4242 0000`) to see a declined payment; anything else
   confirms and lands on an order-confirmation page.
4. `⌘K` / `Ctrl+K` opens instant search from anywhere.

No real payment is processed anywhere. Orders are stored in `localStorage`.

## Stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19, TypeScript)       |
| Styling    | Tailwind CSS v4 — custom design tokens, no UI kit   |
| Motion     | Framer Motion (`MotionConfig reducedMotion="user"`) |
| State      | Zustand (cart persisted to `localStorage`)          |
| Toasts     | Sonner                                              |
| Icons      | Lucide                                              |
| Backend    | Next.js Route Handlers (`/api/*`)                   |
| Fonts      | Fraunces (display) + Inter (text) via `next/font`   |

## Design system

The identity is a warm apothecary palette defined as Tailwind v4 tokens in
[`app/globals.css`](app/globals.css): `cream` surfaces, `ink` text, deep `pine`
green, terracotta `rose` accent — paired with Fraunces, a serif with real
italics, for editorial headlines. Spacing follows an 8-px rhythm; radii, soft
shadows and motion curves (`cubic-bezier(0.16, 1, 0.3, 1)`) are consistent
across every component.

Micro-interactions, everywhere:

- staggered hero entrance, floating glass product card
- product cards: crossfade to second image, slide-up quick-add that morphs to "Added ✓"
- animated cart badge, spring-physics cart drawer, free-shipping progress bar
- animated quantity stepper, filter checkboxes, toggle switch, sort dropdown
- payment overlay: encrypted → bank → confirm steps, SVG check-draw on success,
  shake on decline
- skeleton loaders, empty states, 404, animated review-distribution bars
- scrolling marquee, ⌘K search overlay with staggered results

Fully responsive from 320 px to ultrawide (content is capped at `max-w-7xl`).
All motion respects `prefers-reduced-motion`.

## Backend

Products live in a typed in-memory catalog ([`lib/products.ts`](lib/products.ts))
exposed through real route handlers:

- `GET /api/products` — filtering (`category`, `brand`, `q`, `minPrice`,
  `maxPrice`, `inStock`) and sorting (`sort=newest|price-asc|price-desc|popular|rating`)
- `POST /api/checkout` — validates the cart server-side, simulates gateway
  latency, declines cards ending `0000` with a `402`, otherwise returns an
  order id + delivery estimate

The storefront renders products from the server (SSG for all 20 product pages
via `generateStaticParams`), so the catalog is crawlable; the API is the
integration surface a real client/app would use.

## Structure

```
app/                    routes (home, shop, product/[slug], checkout, order/[id], api/*)
components/
  home/                 hero, marquee, categories, featured, editorial, values, …
  shop/                 shop client (URL-driven filters), filter panel, sort, cards
  product/              gallery, buy panel, reviews
  checkout/             checkout form, payment overlay, order confirmation
  layout/               header, footer, cart drawer, ⌘K search overlay
  ui/                   button, badge, rating, stepper, accordion, motion primitives
lib/                    catalog + search, cart store, ui store, hooks, utils, types
```

Other niceties: JSON-LD product schema, Open Graph metadata, `sitemap.xml`,
`robots.txt`, route-level loading skeletons, error boundary, image optimization
via `next/image` (all photography from Unsplash).

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm run build && npm start` for a production build.

## Deployment

Deploys free on Vercel — no environment variables, no database, nothing to configure:

```bash
npx vercel login   # once
npx vercel --prod
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new)
(framework auto-detected). Netlify's Next.js runtime works equally well.

---

_Rosée is a fictional brand created for the Rose Bud technical assignment.
Checkout is fully simulated — no payments, no charges, and sadly, no candles._
