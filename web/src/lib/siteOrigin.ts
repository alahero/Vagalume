/**
 * Origen absoluto del sitio (OG, canonical, JSON-LD).
 * En Vercel define `VITE_SITE_ORIGIN` (ej. https://www.vagalumetulum.com).
 */
export function getSiteOrigin(): string {
  const env = import.meta.env.VITE_SITE_ORIGIN as string | undefined;
  if (env && /^https?:\/\//i.test(env)) {
    return env.replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "";
}
