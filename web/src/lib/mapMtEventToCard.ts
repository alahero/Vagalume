import type { EventCard } from "../data/eventsContent";
import type { MtNormalizedEvent } from "./mtEventsHelpers";
import { formatEventDateLabel } from "./mtEventsHelpers";

/** Convierte un evento de la API MT en tarjeta de lista (enlaces a MandalaTickets). */
export function mtEventToEventCard(e: MtNormalizedEvent, idx: number): EventCard {
  return {
    cardKey: e.slug,
    dateLabel: formatEventDateLabel(e.startIso) || "—",
    title: e.title,
    imageUrl: e.imageUrl || undefined,
    imageAlt: `${e.title} — Vagalume Tulum`,
    href: e.eventUrlEn,
    tint: idx % 2 === 1 ? "earth" : "burgundy",
  };
}
