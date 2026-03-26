import EventCardsRow from "../components/EventCardsRow";
import EventsBanner from "../components/EventsBanner";
import SeoHead from "../components/SeoHead";
import { BANNER_SLIDES, EVENT_CARDS } from "../data/eventsContent";

/**
 * Página dedicada a eventos (lista completa + banner).
 */
export default function EventsPage() {
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
        <div className="vl-events-banner-wrap">
          <EventsBanner slides={BANNER_SLIDES} />
        </div>
        <div className="vl-event-cards-wrap vl-event-cards-wrap--page">
          <EventCardsRow cards={EVENT_CARDS} layout="grid" />
        </div>
      </section>
    </>
  );
}
