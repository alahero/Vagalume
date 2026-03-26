import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Secciones de la landing enlazadas desde la topnav (orden documental). */
export const HOME_NAV_IDS = ["events", "experience", "playlist", "cuisine", "location"] as const;

export type HomeNavId = (typeof HOME_NAV_IDS)[number];

/** Convierte rem del `:root` a px */
function remToPx(rem: number): number {
  const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return rem * rootPx;
}

/** Línea base bajo la nav (alineada con scroll-padding-top + margen). */
function activationLineBasePx(): number {
  const isMd = window.matchMedia("(min-width: 768px)").matches;
  return Math.round((isMd ? remToPx(6) : remToPx(5.5)) + 12);
}

/** Última sección cuyo borde superior ya pasó la línea dada. */
function computeActiveAtLine(linePx: number): HomeNavId | null {
  let current: HomeNavId | null = null;
  for (const id of HOME_NAV_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= linePx) {
      current = id;
    }
  }
  return current;
}

/**
 * En `/`, expone qué sección debería verse como activa en la nav según scroll.
 * Fuera de home siempre devuelve null.
 */
export function useHomeSectionNav(): HomeNavId | null {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState<HomeNavId | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null);
      return;
    }

    const lastScrollY = { current: window.scrollY };
    /* Subiendo: línea más “alta” en viewport para no alternar en el borde entre dos secciones. */
    const scrollDir = { current: "down" as "up" | "down" };
    let scrollRaf = 0;

    const recompute = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      const delta = y - prev;
      /* Umbral bajo para scroll lento; evita flip-flop con ruido de trackpad (~1px). */
      if (delta > 4) scrollDir.current = "down";
      else if (delta < -4) scrollDir.current = "up";
      lastScrollY.current = y;

      const base = activationLineBasePx();
      const line = scrollDir.current === "up" ? base - 52 : base;
      const next = computeActiveAtLine(line);
      setActiveId((prevId) => (prevId === next ? prevId : next));
    };

    const scheduleScrollRecompute = () => {
      if (scrollRaf !== 0) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        recompute();
      });
    };

    /* Nunca forzar el id del hash aquí: choca con scroll suave (un frame dice “events”, otro “experience”). */
    const onHashChange = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(recompute);
      });
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", scheduleScrollRecompute, { passive: true });
    window.addEventListener("resize", recompute);

    lastScrollY.current = window.scrollY;
    requestAnimationFrame(() => {
      requestAnimationFrame(recompute);
    });

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", scheduleScrollRecompute);
      window.removeEventListener("resize", recompute);
      if (scrollRaf !== 0) cancelAnimationFrame(scrollRaf);
    };
  }, [pathname]);

  return pathname === "/" ? activeId : null;
}
