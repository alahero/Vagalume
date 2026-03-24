# Regla de implementación web — Vagalume

Aplica a **`web/`** (React + Vite: `*.tsx`, `*.ts`, `*.css`) y a cualquier HTML/CSS/JS estático del repo.

## Objetivo

Marcado semántico, **tokens de marca** (`Brandbook.md`), mobile-first y componentes acotados por sección.

## Autoridad de diseño

- **Colores, tipografía, logo, tono y do/don’t:** `Brandbook.md` y `@.agent/skills/vagalume-brand-guidelines/SKILL.md`.
- **Mapeo Stitch + manual (sin contradicciones):** `@.agent/skills/vagalume-brand-guidelines/references/design-system.md`.
- Fuentes del mockup Stitch (p. ej. Newsreader, Work Sans) son **referencia** hasta tener **Calvino** y **Avenir Next**; usar fallbacks del manual en código.

## Qué hacer

- Bloques semánticos: `header`, `main`, `section`, `footer` (o equivalentes en React).
- Tokens en `:root` con prefijo **`--vl-`**; consumirlos con `var()` (evitar hex sueltos repetidos).
- Clases con alcance predecible por sección (`hero__title`, `events__item`).
- Estilos mobile-first; breakpoints mayores después.
- Lógica interactiva en módulos TS/JS, no atributos inline tipo `onclick`.
- **Radios:** respetar el sistema dual del manual — editorial (casi 0) vs storytelling (grandes / pill); no un solo radio “genérico” en todo el sitio.
- **Imágenes aprobadas:** priorizar `Assets/` (`1.jpg`–`7.jpg`, `logo-blanco-vagalume.png`) salvo otra directriz de marketing.

## Qué evitar

- Atributos `style=""` en producción salvo casos puntuales justificados.
- Nombres genéricos sueltos (`.box`, `.title` sin contexto).
- **Blanco puro** (`#FFFFFF`) y **azul de enlace por defecto** donde el manual pide champagne/crema.
- Clichés de “nightlife” (neón fuerte, brillos tipo lens flare) alineado a `Brandbook.md` y `design-system.md`.

## Patrón preferido

```tsx
<main>
  <section className="hero" id="home">
    <p className="hero__eyebrow">Tulum Beach Club</p>
    <h1 className="hero__title">Vagalume</h1>
    <a className="hero__cta" href="#reservations">
      Reserve Table
    </a>
  </section>
</main>
```

```css
/* Tokens alineados al Brandbook; ampliar en :root según design-system.md */
:root {
  --vl-earth: #6d4b27;
  --vl-sand: #faf9d6;
  --vl-burgundy: #331515;
  --vl-forest: #0a4008;
  --vl-night: #0a0a0a;
  --vl-champagne: #e8e2d0;
  --space-2: 8px;
  --space-4: 16px;
  --space-8: 32px;
}

body {
  margin: 0;
  background-color: var(--vl-night);
  color: var(--vl-champagne);
  /* Objetivo: Avenir Next; fallback acordado al manual hasta licencia */
  font-family: "Montserrat", system-ui, sans-serif;
}

.hero {
  padding: var(--space-8) var(--space-4);
}

.hero__title {
  margin: 0 0 var(--space-4);
  font-size: clamp(2.5rem, 12vw, 5.5rem);
  /* Objetivo: Calvino en display; Cormorant Garamond como fallback temporal */
  font-family: "Cormorant Garamond", serif;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .hero {
    padding: 96px 48px;
  }
}
```

```ts
// Patrón de UI: preferir data-* y módulos pequeños
const menuButton = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");

menuButton?.addEventListener("click", () => {
  const isOpen = menuPanel?.getAttribute("data-open") === "true";
  menuPanel?.setAttribute("data-open", String(!isOpen));
});
```

## Superficies y secciones (Stitch + manual)

- Entre secciones grandes, preferir **cambio de capa** (tonos de `--vl-night` / superficies anidadas) además de —no en lugar de— **hairlines 1px** cuando el manual pida marco o línea a ancho completo.
- Efectos tipo **glass** (blur + opacidad) opcionales para nav u overlays; no debilitar contraste de texto.
