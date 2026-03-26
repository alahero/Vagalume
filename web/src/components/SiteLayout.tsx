import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FabCalendar from "./FabCalendar";

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
          <a
            className="vl-topnav__link vl-topnav__link--active"
            href={navVariant === "home" ? "#events" : "/events#events"}
          >
            EVENTS
          </a>
          <a className="vl-topnav__link" href={hash("experience")}>
            EXPERIENCE
          </a>
          <a className="vl-topnav__link" href={hash("playlist")}>
            PLAYLIST
          </a>
          <a className="vl-topnav__link" href={hash("cuisine")}>
            CUISINE
          </a>
          <a className="vl-topnav__link" href={hash("location")}>
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

      <aside className="vl-sidebar" aria-label="Secciones">
        <div className="vl-sidebar__inner">
          <div className="vl-sidebar__top">
            <span className="vl-sidebar__mark">V</span>
            <span className="vl-sidebar__tag">TULUM SANCTUARY</span>
          </div>
          <div className="vl-sidebar__nav">
            <div className="vl-sidebar__item vl-sidebar__item--active">
              <span className="material-symbols-outlined">waves</span>
              <span className="vl-sidebar__label">THE CLUB</span>
            </div>
            <div className="vl-sidebar__item">
              <span className="material-symbols-outlined">spa</span>
              <span className="vl-sidebar__label">WELLNESS</span>
            </div>
            <div className="vl-sidebar__item">
              <span className="material-symbols-outlined">theater_comedy</span>
              <span className="vl-sidebar__label">CULTURE</span>
            </div>
            <div className="vl-sidebar__item">
              <span className="material-symbols-outlined">mail</span>
              <span className="vl-sidebar__label">CONTACT</span>
            </div>
          </div>
          <div className="vl-sidebar__social">
            <a className="vl-sidebar__social-link" href="#">
              <span className="material-symbols-outlined">photo_camera</span>
              INSTAGRAM
            </a>
            <a className="vl-sidebar__social-link" href="#">
              <span className="material-symbols-outlined">audiotrack</span>
              SPOTIFY
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
            <a
              href={navVariant === "home" ? "#events" : "/events#events"}
              className={
                "vl-mobile-drawer__link vl-mobile-drawer__link--active"
              }
              onClick={() => setMobileOpen(false)}
            >
              EVENTS
            </a>
            <a
              className="vl-mobile-drawer__link"
              href={hash("experience")}
              onClick={() => setMobileOpen(false)}
            >
              EXPERIENCE
            </a>
            <a
              className="vl-mobile-drawer__link"
              href={hash("playlist")}
              onClick={() => setMobileOpen(false)}
            >
              PLAYLIST
            </a>
            <a
              className="vl-mobile-drawer__link"
              href={hash("cuisine")}
              onClick={() => setMobileOpen(false)}
            >
              CUISINE
            </a>
            <a
              className="vl-mobile-drawer__link"
              href={hash("location")}
              onClick={() => setMobileOpen(false)}
            >
              LOCATION
            </a>
          </div>
          <p className="vl-mobile-drawer__label">Explore</p>
          <div className="vl-mobile-drawer__explore">
            <span className="vl-mobile-drawer__explore-item vl-mobile-drawer__explore-item--active">
              <span className="material-symbols-outlined">waves</span> THE CLUB
            </span>
            <span className="vl-mobile-drawer__explore-item">
              <span className="material-symbols-outlined">spa</span> WELLNESS
            </span>
            <span className="vl-mobile-drawer__explore-item">
              <span className="material-symbols-outlined">theater_comedy</span>{" "}
              CULTURE
            </span>
            <span className="vl-mobile-drawer__explore-item">
              <span className="material-symbols-outlined">mail</span> CONTACT
            </span>
          </div>
          <div className="vl-mobile-drawer__footer">
            <a className="vl-mobile-drawer__foot-link" href="#">
              <span className="material-symbols-outlined">photo_camera</span>
              INSTAGRAM
            </a>
            <a className="vl-mobile-drawer__foot-link" href="#">
              <span className="material-symbols-outlined">audiotrack</span>
              SPOTIFY
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
