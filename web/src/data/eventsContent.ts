/** Nombres de archivo bajo `public/events/` (copiados desde Assets). */

export type BannerSlide = { alt: string; file: string };

export const BANNER_SLIDES: BannerSlide[] = [
  {
    alt: "Nido closing at Vagalume Tulum — March 27",
    file: "260327_NIDO-VAGALUME-POST (4000x1200).png",
  },
  {
    alt: "MIUL with Disorder at Vagalume — April 3",
    file: "Vagalume_4000 X 1200_MIUL_ABR03.png",
  },
  {
    alt: "Sinner at Vagalume Tulum",
    file: "VAGALUME-SINNER-MAR-ABR (4000x1200).png",
  },
];

export type EventCard = {
  /** Clave estable para React cuando el origen es la API (slug). */
  cardKey?: string;
  dateLabel: string;
  title: string;
  body: string;
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
    body: "Bold rhythm and ritual energy for nights that refuse to whisper.",
    imageFile: "VAGALUME-SINNER-MAR-ABR (26).jpeg",
    imageAlt: "Sinner at Vagalume — spring series",
    tint: "burgundy",
  },
  {
    dateLabel: "APR 03 • 2026",
    title: "MIUL × DISORDER",
    body: "An out-of-body frequency journey with Jotadmaya and Negrinm under the Vagalume sky.",
    imageFile: "Vagalume_1080 X 1080_MIUL_ABR03 (3).jpg",
    imageAlt: "MIUL with Disorder at Vagalume",
    tint: "earth",
  },
  {
    dateLabel: "MAR 28 • 2026",
    title: "SINNER",
    body: "Marwan, Vite, and Rene guide a crimson-hazed night of deep, hypnotic groove.",
    imageFile: "SINNER_28MARCH_4a5 (3).jpg",
    imageAlt: "Sinner — Marwan, Vite, Rene at Vagalume Tulum",
    tint: "burgundy",
  },
  {
    dateLabel: "TULUM • 2026",
    title: "PENDULUM",
    body: "Arena-scale drum and bass energy, distilled into the jungle's open air.",
    imageFile: "pendelum-portada (4).jpeg",
    imageAlt: "Pendulum at Vagalume Tulum",
    tint: "earth",
  },
  {
    dateLabel: "MAR 29 • 2026",
    title: "MAXI DEGRASSI",
    body: "Melodic momentum with Javier Alei, Nacho Kahn, and Bovet — a State of Flow session.",
    imageFile: "Maxi Degrassi - March 29th (2).jpg",
    imageAlt: "Maxi Degrassi — State of Flow crew at Vagalume",
    tint: "burgundy",
  },
  {
    dateLabel: "MAR 27 • 2026",
    title: "NIDO CLOSING",
    body: "A coastal farewell with Igor Marijuan, Bodaishin, and Sorä — sky, sea, and hummingbird light.",
    imageFile: "260327_NIDO-VAGALUME-POST (2).jpg",
    imageAlt: "Nido closing — Igor Marijuan, Bodaishin, Sorä at Vagalume",
    tint: "earth",
  },
];
