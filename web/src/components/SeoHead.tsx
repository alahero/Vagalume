import { useEffect } from "react";
import { getSiteOrigin } from "../lib/siteOrigin";

const DEFAULT_OG_PATH = "/og-default.jpg";

type SeoHeadProps = {
  title: string;
  description: string;
  /** Ruta para canonical y og:url (ej. "/" o "/events"). */
  path: string;
  ogImagePath?: string;
  /** Evita indexación (páginas de error, borradores). */
  noIndex?: boolean;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const sel = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(sel) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  const sel = `link[rel="${rel}"]`;
  let el = document.head.querySelector(sel) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, json: object) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(json);
  document.head.appendChild(script);
}

/**
 * Actualiza título, meta, Open Graph, Twitter y JSON-LD (NightClub) en el documento.
 */
export default function SeoHead({
  title,
  description,
  path,
  ogImagePath = DEFAULT_OG_PATH,
  noIndex = false,
}: SeoHeadProps) {
  useEffect(() => {
    const origin = getSiteOrigin();
    const pathNorm = path.startsWith("/") ? path : `/${path}`;
    const pageUrl = origin ? `${origin}${pathNorm}` : pathNorm;
    const imageUrl = origin ? `${origin}${ogImagePath}` : ogImagePath;

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", pageUrl);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    if (!noIndex) {
      upsertJsonLd("vl-schema-nightclub", {
        "@context": "https://schema.org",
        "@type": "NightClub",
        name: "Vagalume",
        alternateName: "Vagalume Tulum",
        description:
          "Beach club and night sanctuary in Tulum. Curated sound, cuisine, and ritual energy on the Caribbean coast.",
        url: origin ? `${origin}/` : undefined,
        image: imageUrl || undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tulum",
          addressRegion: "Quintana Roo",
          addressCountry: "MX",
        },
        sameAs: ["https://www.instagram.com/vagalume_tulum/"],
      });
    } else {
      const el = document.getElementById("vl-schema-nightclub");
      el?.remove();
    }
  }, [title, description, path, ogImagePath, noIndex]);

  return null;
}
