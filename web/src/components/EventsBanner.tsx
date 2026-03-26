import { useEffect, useState } from "react";
import type { BannerSlide } from "../data/eventsContent";
import { publicUrl } from "../lib/publicUrl";

type EventsBannerProps = {
  slides: BannerSlide[];
};

const INTERVAL_MS = 4000;

/**
 * Carrusel de banners 4000×1200 con puntos y rotación automática.
 */
export default function EventsBanner({ slides }: EventsBannerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className="vl-events-banner" role="region" aria-label="Eventos destacados">
      {slides.map((slide, i) => (
        <article
          key={slide.file}
          className={
            "vl-events-banner__slide" +
            (i === index ? " vl-events-banner__slide--active" : "")
          }
          aria-hidden={i !== index}
        >
          <img
            className="vl-events-banner__img"
            src={publicUrl("events", slide.file)}
            alt={slide.alt}
            width={4000}
            height={1200}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={i === 0 ? "high" : undefined}
          />
          <div className="vl-events-banner__grad" aria-hidden />
        </article>
      ))}
      <div className="vl-events-banner__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={
              "vl-events-banner__dot" + (i === index ? " vl-events-banner__dot--active" : "")
            }
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
