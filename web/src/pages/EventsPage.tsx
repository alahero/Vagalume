import { useMemo } from "react";
import EventCardsRow from "../components/EventCardsRow";
import SeoHead from "../components/SeoHead";
import { EVENT_CARDS } from "../data/eventsContent";
import { useVagalumeMtEvents } from "../hooks/useVagalumeEvents";
import { mtEventToEventCard } from "../lib/mapMtEventToCard";

/**
 * Página dedicada a eventos (lista completa en cuadrícula).
 */
export default function EventsPage() {
  const { upcomingSorted, loading, fetchFailed } = useVagalumeMtEvents();

  const gridCards = useMemo(() => {
    if (loading) return EVENT_CARDS;
    if (fetchFailed || upcomingSorted.length === 0) return EVENT_CARDS;
    return upcomingSorted.map((e, i) => mtEventToEventCard(e, i));
  }, [loading, fetchFailed, upcomingSorted]);

  return (
    <>
      <SeoHead
        title="Upcoming Events | Vagalume Tulum"
        description="Full Vagalume Tulum lineup: DJ sets, live rituals, and seasonal series. Plan your night and book via MandalaTickets."
        path="/events"
      />
      <section id="page-top" className="vl-section vl-section--events-intro">
        <div className="vl-events-intro">
          <span className="vl-eyebrow">Seasonal Series</span>
          <h1 className="vl-events-h1">
            Upcoming <span className="vl-events-h1-accent">Events</span>
          </h1>
          <p className="vl-events-lead">
            Lineup y curaduría alineados con la energía nocturna de Vagalume Tulum.
          </p>
        </div>
      </section>

      <section id="events" className="vl-section vl-section--events-page">
        <div className="vl-event-cards-wrap vl-event-cards-wrap--page">
          <EventCardsRow cards={gridCards} layout="grid" />
        </div>
      </section>
    </>
  );
}
