# Web Implementation Rule

Apply this rule to all `*.html`, `*.css`, and `*.js` files.

## Goal
Implement sections with semantic structure, reusable tokens, and mobile-first behavior.

## Do This
- Use semantic layout blocks: `header`, `main`, `section`, `footer`.
- Define design tokens in `:root` and consume them through variables.
- Name CSS classes with predictable section scopes (`hero__title`, `events__item`).
- Build mobile-first styles first, then add larger breakpoints.
- Keep interaction logic in JavaScript files, not inline handlers.

## Avoid This
- Avoid inline style attributes for production code.
- Avoid generic class names like `.box` or `.title`.
- Avoid hardcoded colors and spacing values repeated across files.

## Preferred Pattern

```html
<main>
  <section class="hero" id="home">
    <p class="hero__eyebrow">Tulum Beach Club</p>
    <h1 class="hero__title">Vagalume</h1>
    <a class="hero__cta" href="#reservations">Reserve Table</a>
  </section>
</main>
```

```css
:root {
  --bg-900: #0b0a0a;
  --surface-700: #1a1411;
  --accent-500: #d35b1f;
  --text-100: #f7f0e6;
  --text-300: #d9c8b3;
  --space-2: 8px;
  --space-4: 16px;
  --space-8: 32px;
}

body {
  margin: 0;
  background: var(--bg-900);
  color: var(--text-100);
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
}

.hero {
  padding: var(--space-8) var(--space-4);
}

.hero__title {
  margin: 0 0 var(--space-4);
  font-size: clamp(40px, 12vw, 88px);
}

@media (min-width: 768px) {
  .hero {
    padding: 96px 48px;
  }
}
```

```js
const menuButton = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");

menuButton?.addEventListener("click", () => {
  const isOpen = menuPanel?.getAttribute("data-open") === "true";
  menuPanel?.setAttribute("data-open", String(!isOpen));
});
```
