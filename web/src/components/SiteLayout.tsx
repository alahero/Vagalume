import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHomeSectionNav, type HomeNavId } from "../hooks/useHomeSectionNav";
import FabCalendar from "./FabCalendar";

/** Menú digital (misma URL que la sección cuisine en home). */
const SIDEBAR_MENU_URL = "https://mandalagroup.menu/tulum/vagalume/";
/** Perfil público; actualizar si el handle oficial cambia. */
const SIDEBAR_INSTAGRAM_URL = "https://www.instagram.com/vagalumetulum/";
/** Lista usada en el embed del home; sustituir por perfil de artista/venue si aplica. */
const SIDEBAR_SPOTIFY_URL = "https://open.spotify.com/playlist/37i9dQZF1DX9pP7cC2liKw";

/** Enlaces legales / contacto en MandalaTickets (inglés). */
const MT_TERMS_URL = "https://mandalatickets.com/info/terminos/en";
const MT_PRIVACY_URL = "https://mandalatickets.com/info/privacidad/en";
const MT_FAQS_URL = "https://mandalatickets.com/info/faqs/en";
const MT_CONTACT_URL = "https://mandalatickets.com/info/contactanos/en";

export type NavVariant = "home" | "events";

type SiteLayoutProps = {
  children: ReactNode;
  navVariant: NavVariant;
};

/**
 * Shell compartido: top nav, sidebar desktop, drawer móvil, main, FAB y footer.
 */
export default function SiteLayout({ children, navVariant }: SiteLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useHomeSectionNav();

  const topNavClass = (id: HomeNavId) =>
    "vl-topnav__link" + (activeSection === id ? " vl-topnav__link--active" : "");

  const drawerLinkClass = (id: HomeNavId) =>
    "vl-mobile-drawer__link" + (activeSection === id ? " vl-mobile-drawer__link--active" : "");

  /** Misma lógica que el HTML legacy: en inicio → scroll suave al hero; si no, ir a / arriba. */
  const handleBrandClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (location.pathname === "/") {
      e.preventDefault();
      document.getElementById("page-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
      const base = `${location.pathname}${location.search}`;
      window.history.replaceState(null, "", `${base}#page-top`);
      return;
    }
    e.preventDefault();
    void navigate("/");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    });
  };

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const hash = (id: string) => (navVariant === "home" ? `#${id}` : `/#${id}`);

  const upcomingEventsActive =
    location.pathname === "/events" || (location.pathname === "/" && activeSection === "events");

  return (
    <>
      <nav className="vl-topnav" aria-label="Principal">
        <div className="vl-topnav__left">
          <button
            type="button"
            className="vl-topnav__burger"
            aria-expanded={mobileOpen}
            aria-controls="vl-mobile-overlay"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span
              className={
                "material-symbols-outlined vl-topnav__burger-icon" +
                (mobileOpen ? " vl-topnav__burger-icon--hidden" : "")
              }
              aria-hidden
            >
              menu
            </span>
            <span
              className={
                "material-symbols-outlined vl-topnav__burger-icon" +
                (!mobileOpen ? " vl-topnav__burger-icon--hidden" : "")
              }
              aria-hidden
            >
              close
            </span>
          </button>
          <Link to="/" className="vl-topnav__brand" aria-label="Vagalume — inicio" onClick={handleBrandClick}>
            <img
              className="vl-topnav__logo"
              src="/media/logo.png"
              alt=""
              width={40}
              height={40}
            />
            <span className="vl-topnav__wordmark">VAGALUME</span>
          </Link>
        </div>
        <div className="vl-topnav__links">
          {navVariant === "home" ? (
            <a
              className={topNavClass("events")}
              href="#events"
              aria-current={activeSection === "events" ? "true" : undefined}
            >
              EVENTS
            </a>
          ) : null}
          <a
            className={topNavClass("experience")}
            href={hash("experience")}
            aria-current={activeSection === "experience" ? "true" : undefined}
          >
            EXPERIENCE
          </a>
          <a
            className={topNavClass("playlist")}
            href={hash("playlist")}
            aria-current={activeSection === "playlist" ? "true" : undefined}
          >
            PLAYLIST
          </a>
          <a
            className={topNavClass("cuisine")}
            href={hash("cuisine")}
            aria-current={activeSection === "cuisine" ? "true" : undefined}
          >
            CUISINE
          </a>
          <a
            className={topNavClass("location")}
            href={hash("location")}
            aria-current={activeSection === "location" ? "true" : undefined}
          >
            LOCATION
          </a>
        </div>
        <a
          className="vl-topnav__cta"
          href="https://mandalatickets.com/en/tulum/disco/Vagalume"
          target="_blank"
          rel="noopener noreferrer"
        >
          BOOK NOW
        </a>
      </nav>

      <aside className="vl-sidebar" aria-label="Accesos y enlaces">
        <div className="vl-sidebar__inner">
          <div className="vl-sidebar__top">
            <span className="vl-sidebar__mark">V</span>
            <span className="vl-sidebar__tag">TULUM SANCTUARY</span>
          </div>
          <div className="vl-sidebar__nav">
            <Link
              className={
                "vl-sidebar__item" + (upcomingEventsActive ? " vl-sidebar__item--active" : "")
              }
              to="/events"
            >
              <span className="material-symbols-outlined">event_upcoming</span>
              <span className="vl-sidebar__label">UPCOMING EVENTS</span>
            </Link>
            <a
              className="vl-sidebar__item"
              href={SIDEBAR_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined">restaurant_menu</span>
              <span className="vl-sidebar__label">OUR MENU</span>
            </a>
            <a
              className="vl-sidebar__item"
              href={SIDEBAR_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined">photo_camera</span>
              <span className="vl-sidebar__label">INSTAGRAM</span>
            </a>
            <a
              className="vl-sidebar__item"
              href={SIDEBAR_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined">audiotrack</span>
              <span className="vl-sidebar__label">SPOTIFY</span>
            </a>
          </div>
          <div className="vl-sidebar__legal">
            <a
              className="vl-sidebar__legal-link"
              href={MT_TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms &amp; Conditions
            </a>
            <a
              className="vl-sidebar__legal-link"
              href={MT_PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              className="vl-sidebar__legal-link"
              href={MT_FAQS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              FAQs
            </a>
            <a
              className="vl-sidebar__legal-link"
              href={MT_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </div>
        </div>
      </aside>

      <div
        id="vl-mobile-overlay"
        className={"vl-mobile-overlay" + (mobileOpen ? " vl-mobile-overlay--open" : "")}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="vl-mobile-overlay__backdrop"
          aria-label="Cerrar menú"
          data-mobile-nav-close
          onClick={() => setMobileOpen(false)}
        />
        <nav className="vl-mobile-drawer" aria-label="Menú móvil">
          <p className="vl-mobile-drawer__eyebrow">Tulum sanctuary</p>
          <div className="vl-mobile-drawer__section">
            {navVariant === "home" ? (
              <a
                className={drawerLinkClass("events")}
                href="#events"
                aria-current={activeSection === "events" ? "true" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                EVENTS
              </a>
            ) : null}
            <a
              className={drawerLinkClass("experience")}
              href={hash("experience")}
              aria-current={activeSection === "experience" ? "true" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              EXPERIENCE
            </a>
            <a
              className={drawerLinkClass("playlist")}
              href={hash("playlist")}
              aria-current={activeSection === "playlist" ? "true" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              PLAYLIST
            </a>
            <a
              className={drawerLinkClass("cuisine")}
              href={hash("cuisine")}
              aria-current={activeSection === "cuisine" ? "true" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              CUISINE
            </a>
            <a
              className={drawerLinkClass("location")}
              href={hash("location")}
              aria-current={activeSection === "location" ? "true" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              LOCATION
            </a>
          </div>
          <p className="vl-mobile-drawer__label">More</p>
          <div className="vl-mobile-drawer__section">
            <Link
              className={
                "vl-mobile-drawer__link" + (upcomingEventsActive ? " vl-mobile-drawer__link--active" : "")
              }
              to="/events"
              onClick={() => setMobileOpen(false)}
            >
              UPCOMING EVENTS
            </Link>
            <a
              className="vl-mobile-drawer__link"
              href={SIDEBAR_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              OUR MENU
            </a>
            <a
              className="vl-mobile-drawer__link"
              href={SIDEBAR_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              INSTAGRAM
            </a>
            <a
              className="vl-mobile-drawer__link"
              href={SIDEBAR_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              SPOTIFY
            </a>
          </div>
          <div className="vl-mobile-drawer__footer">
            <a
              className="vl-mobile-drawer__foot-link vl-mobile-drawer__foot-link--legal"
              href={MT_TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              Terms &amp; Conditions
            </a>
            <a
              className="vl-mobile-drawer__foot-link vl-mobile-drawer__foot-link--legal"
              href={MT_PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              Privacy Policy
            </a>
            <a
              className="vl-mobile-drawer__foot-link vl-mobile-drawer__foot-link--legal"
              href={MT_FAQS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              FAQs
            </a>
            <a
              className="vl-mobile-drawer__foot-link vl-mobile-drawer__foot-link--legal"
              href={MT_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </nav>
      </div>

      <main className="vl-main">{children}</main>

      <FabCalendar />

      <footer className="vl-footer">
        <div className="vl-footer__copy">
          © 2024 VAGALUME TULUM. ARCHITECTURE OF THE SOUL.
        </div>
        <div className="vl-footer__links">
          <a href="#">PRIVACY</a>
          <a href="#">MEMBERSHIP</a>
          <a href="#">PRESS</a>
          <a href="#">CAREERS</a>
        </div>
      </footer>
    </>
  );
}
