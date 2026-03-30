import type { EventCard } from "../data/eventsContent";
import { publicUrl } from "../lib/publicUrl";

type EventCardsRowProps = {
  cards: EventCard[];
  /** Si true, la cuarta tarjeta solo aparece desde breakpoint desktop (lg). */
  hideFourthOnNarrow?: boolean;
  /** En fila: en viewport estrecho solo se muestran 2 tarjetas (menos altura por texto). */
  limitMobileToTwoCards?: boolean;
  /** Modo cuadrícula (página /events) vs fila con scroll horizontal (home). */
  layout?: "row" | "grid";
};

function cardImageSrc(card: EventCard): string {
  const remote = card.imageUrl?.trim();
  if (remote) return remote;
  if (card.imageFile) return publicUrl("events", card.imageFile);
  return "/media/hero-bg.jpg";
}

/**
 * Tarjetas de evento con imagen cuadrada y copy.
 * Con `href`, toda la tarjeta enlaza a MandalaTickets (nueva pestaña).
 */
export default function EventCardsRow({
  cards,
  hideFourthOnNarrow = false,
  limitMobileToTwoCards = false,
  layout = "row",
}: EventCardsRowProps) {
  const listClass =
    layout === "grid"
      ? "vl-event-cards vl-event-cards--grid"
      : "vl-event-cards vl-event-cards--row hide-scrollbar" +
        (limitMobileToTwoCards ? " vl-event-cards--mobile-two" : "");

  return (
    <div className={listClass} role="list" aria-label="Próximos eventos">
      {cards.map((card, idx) => {
        const hideFourth = hideFourthOnNarrow && idx === 3;
        const key = card.cardKey ?? `${card.title}-${card.dateLabel}`;
        const inner = (
          <>
            <div className="vl-event-card__media">
              <img
                className="vl-event-card__img"
                src={cardImageSrc(card)}
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
          </>
        );

        return (
          <article
            key={key}
            className={
              "vl-event-card" + (hideFourth ? " vl-event-card--xl-only" : "")
            }
            role="listitem"
          >
            {card.href ? (
              <a
                className="vl-event-card__link"
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            ) : (
              inner
            )}
          </article>
        );
      })}
    </div>
  );
}
