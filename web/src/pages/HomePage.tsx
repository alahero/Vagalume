import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EventCardsRow from "../components/EventCardsRow";
import EventsBanner from "../components/EventsBanner";
import HeroLogoCanvas from "../components/HeroLogoCanvas";
import SeoHead from "../components/SeoHead";
import { BANNER_SLIDES, EVENT_CARDS } from "../data/eventsContent";
import { useNearestMtEvents } from "../hooks/useVagalumeEvents";
import { mtEventToEventCard } from "../lib/mapMtEventToCard";

/**
 * Landing principal (paridad con el HTML legacy en stitch-export).
 */
export default function HomePage() {
  const [spotifyOpen, setSpotifyOpen] = useState(false);
  const { nearest, loading, fetchFailed } = useNearestMtEvents(4);

  const homeCards = useMemo(() => {
    if (loading) return EVENT_CARDS.slice(0, 4);
    if (fetchFailed || nearest.length === 0) return EVENT_CARDS.slice(0, 4);
    return nearest.map((e, i) => mtEventToEventCard(e, i));
  }, [loading, fetchFailed, nearest]);

  return (
    <>
      <SeoHead
        title="Vagalume Tulum | Beach Club & Night Sanctuary"
        description="Beach club and night sanctuary in Tulum: curated DJ nights, cuisine, playlists, and MandalaTickets reservations on the Caribbean coast."
        path="/"
      />
      <section id="page-top" className="vl-hero" data-hero-3d>
        <div className="vl-hero__bg">
          <img
            className="vl-hero__bg-img"
            src="/media/hero-bg.jpg"
            alt="Vagalume beach club in Tulum at dusk, jungle and Caribbean shoreline"
            fetchPriority="high"
          />
          <div className="vl-hero__veil" aria-hidden />
          <div className="vl-hero__grad" aria-hidden />
        </div>
        <HeroLogoCanvas className="vl-hero__canvas-wrap" />
        <div className="vl-hero__content">
          <span className="vl-hero__eyebrow">A Sanctuary of Sound</span>
          <h1 className="vl-hero__title">
            ARCHITECTS
            <br />
            <span className="vl-hero__title-italic">of the</span> SOUL
          </h1>
          <div className="vl-hero__rule" aria-hidden />
        </div>
      </section>

      <section id="events" className="vl-section vl-section--events">
        <div className="vl-section__head vl-section__head--row">
          <div>
            <span className="vl-eyebrow">Curation</span>
            <h2 className="vl-heading-2">UPCOMING RITUALS</h2>
          </div>
          <Link className="vl-btn-outline" to="/events">
            SEE ALL EVENTS
          </Link>
        </div>
        <div className="vl-events-banner-wrap">
          <EventsBanner slides={BANNER_SLIDES} />
        </div>
        <div className="vl-event-cards-wrap">
          <EventCardsRow cards={homeCards} hideFourthOnNarrow layout="row" />
        </div>
      </section>

      <section id="experience" className="vl-section vl-section--experience" aria-labelledby="experience-heading">
        <div className="vl-section__intro">
          <h2 id="experience-heading" className="vl-heading-2 vl-heading-2--center">
            WHERE THE NIGHT OPENS
          </h2>
          <div className="vl-rule vl-rule--center" />
        </div>
        <div className="vl-pillars">
          {[
            { icon: "water_drop", label: "ELEMENTAL" },
            { icon: "nights_stay", label: "NOCTURNAL" },
            { icon: "auto_awesome", label: "MYSTICAL" },
            { icon: "temple_buddhist", label: "SACRED" },
          ].map((p) => (
            <div key={p.label} className="vl-pillar">
              <span className="material-symbols-outlined vl-pillar__icon">{p.icon}</span>
              <span className="vl-pillar__label">{p.label}</span>
            </div>
          ))}
        </div>
        <p className="vl-body-narrow">
          A CONTEMPORARY JUNGLE SANCTUARY THAT BLENDS SOPHISTICATION, THE ORGANIC PULSE OF NATURE, AND THE
          SPIRIT OF RHYTHM. A PLACE WHERE LOCAL AND INTERNATIONAL TALENTS MEET WITH A COMMUNITY CENTERED IN A
          JOURNEY OF PRESENCE, AUTHENTICITY, AND ENJOYMENT.
        </p>
      </section>

      <section className="vl-section vl-section--ritual">
        <div className="vl-ritual-frame">
          <div className="vl-ritual-aspect">
            <img
              className="vl-ritual-img"
              src="/media/ritual-feature.jpg"
              alt="Sunset ritual at Vagalume beach club, guests by the shore"
              loading="lazy"
            />
            <div className="vl-ritual-grad" aria-hidden />
            <div className="vl-ritual-copy">
              <h2 className="vl-ritual-title">The Sunset Ritual</h2>
              <p className="vl-ritual-text">
                As the sun descends below the jungle canopy, Vagalume transforms. Experience a sensory
                transition led by world-class curation and the ancient pulse of Mayan heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="playlist" className="vl-section vl-section--playlist">
        <span className="material-symbols-outlined vl-playlist-icon">graphic_eq</span>
        <h3 className="vl-heading-3">AUDITORY ALCHEMY</h3>
        <p className="vl-playlist-lead">
          Where deep house meets organic vibrations. A curated frequency for the modern wanderer.
        </p>
        <div className="vl-playlist-actions">
          <a className="vl-text-link" href="#events">
            Explore Events
          </a>
          <button
            type="button"
            className="vl-text-link vl-text-link--btn"
            aria-expanded={spotifyOpen}
            aria-controls="vl-spotify-panel"
            onClick={() => setSpotifyOpen((o) => !o)}
          >
            LISTEN TO PLAYLIST
            <span className="material-symbols-outlined vl-playlist-chevron" aria-hidden>
              {spotifyOpen ? "expand_less" : "expand_more"}
            </span>
          </button>
        </div>
        <div
          id="vl-spotify-panel"
          className={"vl-spotify-panel" + (spotifyOpen ? " vl-spotify-panel--open" : "")}
          role="region"
          aria-label="Spotify playlist embed"
          aria-hidden={!spotifyOpen}
        >
          <div className="vl-spotify-panel__clip">
            <div className="vl-spotify-frame">
              <iframe
                title="Spotify playlist"
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9pP7cC2liKw?utm_source=generator"
                width="100%"
                height={352}
                style={{ border: 0, borderRadius: 12 }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="cuisine" className="vl-section vl-section--cuisine">
        <div className="vl-cuisine-frame">
          <div className="vl-cuisine-aspect">
            <img
              className="vl-cuisine-img"
              src="/media/cuisine-feature.jpg"
              alt="Coastal cuisine presentation at Vagalume Tulum"
              loading="lazy"
            />
            <div className="vl-cuisine-multiply" aria-hidden />
            <div className="vl-cuisine-veil" aria-hidden />
            <div className="vl-cuisine-copy">
              <h2 className="vl-cuisine-title">CUISINE</h2>
              <div className="vl-rule vl-rule--gold" />
              <p className="vl-cuisine-text">
                Honoring the raw essence of coastal ingredients through refined technique.
              </p>
              <a
                className="vl-cuisine-cta"
                href="https://mandalagroup.menu/tulum/vagalume/"
                target="_blank"
                rel="noopener noreferrer"
              >
                See our menu
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="vl-section vl-section--location" aria-labelledby="location-heading">
        <div className="vl-location-intro">
          <h2 id="location-heading" className="vl-heading-2">
            LOCATION
          </h2>
          <div className="vl-rule vl-rule--center" />
        </div>
        <div className="vl-map-wrap">
          <iframe
            className="vl-map"
            src="https://www.google.com/maps?cid=68158030288869776&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAEYASAB&hl=es-419&gl=MX&output=embed"
            title="Ubicación de Vagalume en Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
