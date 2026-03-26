import type { EventCard } from "../data/eventsContent";
import { publicUrl } from "../lib/publicUrl";

type EventCardsRowProps = {
  cards: EventCard[];
  /** Si true, la cuarta tarjeta solo aparece en viewport ancho (xl). */
  hideFourthOnNarrow?: boolean;
  /** Modo cuadrícula (página /events) vs fila con scroll horizontal (home). */
  layout?: "row" | "grid";
};

/**
 * Tarjetas de evento con imagen cuadrada y copy.
 */
export default function EventCardsRow({
  cards,
  hideFourthOnNarrow = false,
  layout = "row",
}: EventCardsRowProps) {
  const listClass =
    layout === "grid"
      ? "vl-event-cards vl-event-cards--grid"
      : "vl-event-cards vl-event-cards--row hide-scrollbar";

  return (
    <div className={listClass} role="list" aria-label="Próximos eventos">
      {cards.map((card, idx) => {
        const hideFourth = hideFourthOnNarrow && idx === 3;
        return (
          <article
            key={card.title + card.dateLabel}
            className={
              "vl-event-card" +
              (hideFourth ? " vl-event-card--xl-only" : "")
            }
            role="listitem"
          >
            <div className="vl-event-card__media">
              <img
                className="vl-event-card__img"
                src={publicUrl("events", card.imageFile)}
                alt={card.imageAlt}
                width={1080}
                height={1080}
                loading="lazy"
                decoding="async"
              />
              <div
                className={
                  "vl-event-card__tint" +
                  (card.tint === "earth" ? " vl-event-card__tint--earth" : "")
                }
                aria-hidden
              />
            </div>
            <div className="vl-event-card__body">
              <span className="vl-event-card__date">{card.dateLabel}</span>
              <h3 className="vl-event-card__title">{card.title}</h3>
              <p className="vl-event-card__text">{card.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
