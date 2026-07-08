/**
 * Canonical site URL, resolved per environment:
 * - NEXT_PUBLIC_SITE_URL when set (custom domain)
 * - the Vercel deployment URL in preview/production
 * - localhost in development
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "Rosée — Botanical Apothecary";
