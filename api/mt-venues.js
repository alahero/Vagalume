/**
 * Vercel Serverless: proxy seguro hacia MandalaTickets API v2 (venues).
 * La key solo existe en el servidor (MT_NEW_API_KEY).
 */

const MT_BASE = "https://api.mandalatickets.com/v1/info/venues";
const VAGALUME_ROW_ID = 38;

function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(s, max) {
  if (s.length <= max) return s;
  return s.slice(0, max - 3) + "...";
}

function firstGalleryUrl(galeria) {
  if (!Array.isArray(galeria)) return null;
  for (const u of galeria) {
    if (typeof u === "string" && u.trim()) return u.trim();
  }
  return null;
}

function normalizeEvent(raw) {
  const cg = raw.configuracion_general || {};
  const log = raw.logistica || {};
  const langs = Array.isArray(raw.contenido_idiomas) ? raw.contenido_idiomas : [];
  const en = langs.find((x) => x && x.idioma_abrev === "en") || langs[0] || {};
  const mm = raw.multimedia || {};
  const sliders = mm.slider_banners;

  const imageUrl =
    firstGalleryUrl(mm.galeria) ||
    (sliders && typeof sliders.desktop === "string" && sliders.desktop) ||
    (sliders && typeof sliders.mobile === "string" && sliders.mobile) ||
    null;

  let snippet = "";
  if (en.seo && typeof en.seo.descripcion === "string") {
    snippet = stripHtml(en.seo.descripcion);
  }
  if (!snippet && en.textos && typeof en.textos.descripcion_larga_1 === "string") {
    snippet = truncate(stripHtml(en.textos.descripcion_larga_1), 220);
  }
  snippet = truncate(snippet, 220);

  const eventUrlEn = typeof en.url === "string" ? en.url.trim() : "";
  const estatus = cg.estatus;
  if (estatus && estatus !== "Disponible") return null;
  if (!eventUrlEn) return null;

  return {
    slug: String(cg.nombre_corto || "").trim() || "event",
    title: String(cg.nombre_evento || "").trim() || "Event",
    startIso: String(log.fecha_inicio || ""),
    eventUrlEn,
    imageUrl,
    priority: Number(cg.orden_prioridad) || 0,
    snippet: snippet || "Vagalume Tulum — curated night on the Caribbean coast.",
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const key = process.env.MT_NEW_API_KEY;
  if (!key || typeof key !== "string") {
    return res.status(503).json({
      success: false,
      error: "MT_NEW_API_KEY no configurada en el servidor",
    });
  }

  try {
    const upstream = await fetch(MT_BASE, {
      headers: { "x-api-key": key },
    });

    if (!upstream.ok) {
      return res.status(502).json({
        success: false,
        error: "Error al obtener venues desde MandalaTickets",
      });
    }

    const data = await upstream.json();
    const venues = Array.isArray(data) ? data : [];
    const vagalume = venues.find((v) => v && Number(v.row_id) === VAGALUME_ROW_ID);

    if (!vagalume) {
      res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
      return res.status(200).json({
        venue: "VAGALUME",
        rowId: VAGALUME_ROW_ID,
        events: [],
      });
    }

    const rawEvents = Array.isArray(vagalume.eventos) ? vagalume.eventos : [];
    const events = rawEvents.map(normalizeEvent).filter(Boolean);

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({
      venue: String(vagalume.nombre || "VAGALUME"),
      rowId: VAGALUME_ROW_ID,
      events,
    });
  } catch {
    return res.status(503).json({
      success: false,
      error: "Error de red al contactar MandalaTickets",
    });
  }
};
