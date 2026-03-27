/**
 * Utilidades para eventos normalizados desde /api/mt-venues (sin secretos en el cliente).
 */

export type MtNormalizedEvent = {
  slug: string;
  title: string;
  startIso: string;
  eventUrlEn: string;
  imageUrl: string | null;
  priority: number;
  snippet: string;
};

export type MtVenuesApiResponse = {
  venue: string;
  rowId: number;
  events: MtNormalizedEvent[];
};

/** Inicio del día local en ms (para comparar con fecha de evento). */
export function startOfLocalDayMs(d = new Date()): number {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

/** Clave YYYY-MM-DD en zona local a partir de ISO de la API. */
export function isoToLocalDateKey(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const d = new Date(t);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Si hay varios eventos el mismo día, gana el de mayor orden_prioridad.
 * Devuelve Map fechaLocal → URL en inglés de MandalaTickets.
 */
export function eventUrlsByLocalDay(events: MtNormalizedEvent[]): Map<string, string> {
  const best = new Map<string, { url: string; priority: number }>();
  for (const e of events) {
    if (!e.eventUrlEn) continue;
    const key = isoToLocalDateKey(e.startIso);
    if (!key) continue;
    const cur = best.get(key);
    if (!cur || e.priority > cur.priority) {
      best.set(key, { url: e.eventUrlEn, priority: e.priority });
    }
  }
  return new Map([...best.entries()].map(([k, v]) => [k, v.url]));
}

/** Eventos con fecha de inicio >= hoy 00:00 local, orden ascendente. */
export function filterUpcomingSorted(events: MtNormalizedEvent[]): MtNormalizedEvent[] {
  const start = startOfLocalDayMs();
  return [...events]
    .filter((e) => {
      const t = Date.parse(e.startIso);
      return !Number.isNaN(t) && t >= start;
    })
    .sort((a, b) => Date.parse(a.startIso) - Date.parse(b.startIso));
}

/** Etiqueta tipo "MAR 28 • 2026" para tarjetas. */
export function formatEventDateLabel(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const d = new Date(t);
  const s = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return s.replace(",", " •").toUpperCase();
}
