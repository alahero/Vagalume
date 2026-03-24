/**
 * Banner rotativo de eventos: cambia de slide cada 4 s y sincroniza indicadores.
 * Comentarios en español de México para mantenimiento local.
 */
const root = document.querySelector("[data-events-banner]");
if (!root) {
  console.warn("events-banner: falta [data-events-banner]");
} else {
  const slides = root.querySelectorAll(".events-banner__slide");
  const dots = root.querySelectorAll(".events-banner__dot");
  if (slides.length === 0) {
    console.warn("events-banner: no hay .events-banner__slide");
  } else {
    let index = 0;
    const intervalMs = 4000;

    function show(i) {
      const n = slides.length;
      const idx = ((i % n) + n) % n;
      slides.forEach((slide, j) => {
        const on = j === idx;
        slide.classList.toggle("opacity-100", on);
        slide.classList.toggle("opacity-0", !on);
        slide.classList.toggle("z-10", on);
        slide.classList.toggle("z-0", !on);
        slide.classList.toggle("pointer-events-none", !on);
        slide.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach((dot, j) => {
        const on = j === idx;
        dot.classList.toggle("bg-sand", on);
        dot.classList.toggle("bg-white/20", !on);
        if (on) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      index = idx;
    }

    show(0);

    dots.forEach((dot, j) => {
      dot.addEventListener("click", () => show(j));
    });

    setInterval(() => {
      show(index + 1);
    }, intervalMs);
  }
}
