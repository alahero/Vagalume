/** Nombres de archivo bajo `public/events/` (copiados desde Assets). */

export type EventCard = {
  /** Clave estable para React cuando el origen es la API (slug). */
  cardKey?: string;
  dateLabel: string;
  title: string;
  /** Archivo bajo `public/events/` (contenido estático). */
  imageFile?: string;
  /** URL absoluta de imagen (API Mandala). */
  imageUrl?: string | null;
  imageAlt: string;
  /** Página del evento en MandalaTickets (inglés). */
  href?: string;
  /** Capa hover (burgundy | earth) */
  tint?: "burgundy" | "earth";
};

export const EVENT_CARDS: EventCard[] = [
  {
    dateLabel: "MAR – APR • 2026",
    title: "SINNER",
    imageFile: "VAGALUME-SINNER-MAR-ABR (26).jpeg",
    imageAlt: "Sinner at Vagalume — spring series",
    tint: "burgundy",
  },
  {
    dateLabel: "APR 03 • 2026",
    title: "MIUL × DISORDER",
    imageFile: "Vagalume_1080 X 1080_MIUL_ABR03 (3).jpg",
    imageAlt: "MIUL with Disorder at Vagalume",
    tint: "earth",
  },
  {
    dateLabel: "MAR 28 • 2026",
    title: "SINNER",
    imageFile: "SINNER_28MARCH_4a5 (3).jpg",
    imageAlt: "Sinner — Marwan, Vite, Rene at Vagalume Tulum",
    tint: "burgundy",
  },
  {
    dateLabel: "TULUM • 2026",
    title: "PENDULUM",
    imageFile: "pendelum-portada (4).jpeg",
    imageAlt: "Pendulum at Vagalume Tulum",
    tint: "earth",
  },
  {
    dateLabel: "MAR 29 • 2026",
    title: "MAXI DEGRASSI",
    imageFile: "Maxi Degrassi - March 29th (2).jpg",
    imageAlt: "Maxi Degrassi — State of Flow crew at Vagalume",
    tint: "burgundy",
  },
  {
    dateLabel: "MAR 27 • 2026",
    title: "NIDO CLOSING",
    imageFile: "260327_NIDO-VAGALUME-POST (2).jpg",
    imageAlt: "Nido closing — Igor Marijuan, Bodaishin, Sorä at Vagalume",
    tint: "earth",
  },
];
