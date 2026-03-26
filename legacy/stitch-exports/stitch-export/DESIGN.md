```markdown
# Design System Specification: The Nocturnal Sanctuary

## 1. Overview & Creative North Star
This design system is built upon the **"Nocturnal Sanctuary"** creative north star. It is a digital translation of the Tulum jungle at dusk—mystical, high-end, and deeply cultured. Unlike standard luxury interfaces that rely on stark minimalism or excessive gold gradients, this system finds its soul in organic depth, "low-key" lighting, and a deliberate editorial pace.

We break the "template" look by avoiding rigid, symmetrical blocks. Instead, we use **intentional asymmetry**, where text elements might overlap subtle image containers, and **extreme typography scales** create a sense of architectural hierarchy. The goal is a digital experience that feels curated and whispered, rather than shouted.

---

## 2. Colors
The palette is rooted in the earth and the night. It uses high-contrast champagne text against deep, warm neutrals to mimic starlight through a jungle canopy.

*   **Primary (`#edbe90` / `#6D4B27`):** Represents the Earth Brown and Champagne tones. Use `primary_container` for large background surfaces that need warmth.
*   **Secondary (`#c9c8a8` / `#FAF9D6`):** The Sand Cream. Reserved for high-contrast moments or soft "moonlit" UI elements.
*   **Tertiary (`#efbab8` / `#331515`):** The Deep Burgundy. Use this for moments of cultural depth, sophisticated interaction states, or "after-hours" accents.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers. 
    *   Base: `surface` (`#131313`).
    *   Nested Containers: Use `surface_container_low` for sections and `surface_container_highest` for elevated cards. 
*   **The "No-Line" Rule:** Prohibit the use of 1px solid borders for standard sectioning. Boundaries must be defined by shifts in background color (e.g., a `surface_container_low` section sitting on a `surface` background).
*   **The "Glass & Gradient" Rule:** For floating elements, use Glassmorphism. Apply `surface` at 60% opacity with a `20px` backdrop blur. Enhance CTAs with a subtle linear gradient from `primary` to `primary_container` (135° angle) to provide "visual soul."

---

## 3. Typography
Typography is the voice of this system. It balances the timeless authority of a serif with the modern clarity of a geometric sans.

*   **Display & Headlines (`newsreader`):** Always used in **ALL CAPS**. These must feature generous letter-spacing (tracking: `0.1em` to `0.2em`). This conveys a "Display Editorial" feel.
*   **Body & UI Labels (`workSans`):** Use Light weights (300-400) only. Tracking must be wide (`0.22em` to `0.32em`) to maintain the "airy" luxury feel even in dense information.
*   **Hierarchy as Identity:** Use `display-lg` for single, dramatic words or short phrases. Use `label-sm` for technical data, ensuring it is always in uppercase to maintain the sophisticated "ID card" aesthetic.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking" the surface-container tiers. A `surface_container_lowest` card placed on a `surface_container_low` section creates a natural, recessed "carved" look.
*   **Ambient Shadows:** If a floating effect is required (e.g., a primary modal), use a shadow with a `48px` blur at `8%` opacity, using the `on_background` color as the shadow tint rather than pure black.
*   **The Champagne Rule:** The user’s request for "1px champagne rules" should be treated as an **Artistic Accent**, not a structural border. Use the `outline` token (`#9c8e83`) at `1px` to underline headlines or separate very specific editorial content. 
*   **Ghost Borders:** For interactive states (like input focus), use a "Ghost Border": the `outline_variant` token at `20%` opacity. Forbid 100% opaque borders for functional containment.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary_container` with `on_primary_container` text. Large roundedness (`xl`: `3rem`). No shadow.
*   **Secondary:** Ghost style. `1px` rule using `outline` (Champagne). Text in `primary`.
*   **Tertiary:** Text-only, `label-md` scale, All Caps, with `0.32em` tracking and a custom `2px` underline offset by `8px`.

### Cards & Lists
*   **Containers:** Use `rounded-xl` (`3rem`) for all cards. 
*   **No Dividers:** Forbid divider lines in lists. Use `spacing-6` (`2rem`) to separate items, or alternating background tints between `surface_container_low` and `surface_container`.
*   **Imagery:** Images within cards should have a subtle `darken` blend mode or a `surface_container_highest` overlay at `10%` to keep the "night" mood consistent.

### Input Fields
*   **Style:** Minimalist. A single `1px` line at the bottom using `outline_variant`.
*   **Labels:** `label-sm` sitting `0.5rem` above the input, always in uppercase.
*   **States:** Error states use the `error` token (`#ffb4ab`) but should be styled as a subtle "glow" rather than a harsh red box.

### Signature Components (The "Vagalume" Extras)
*   **The "Jungle" Mask:** A component for images that uses an organic, non-geometric SVG mask to create a soft, leafy edge rather than a sharp corner.
*   **The Floating Navigation:** A glassmorphic bar using `surface_container_low` at `70%` opacity, anchored to the bottom of the viewport with `xl` rounding.

---

## 6. Do's and Don'ts

### Do
*   **Do** use extreme whitespace. If you think there is enough space, add `spacing-8` more.
*   **Do** lean into the "Champagne" text (`on_surface_variant`). It is the primary light source of the UI.
*   **Do** use asymmetrical layouts where imagery is offset from the text grid.

### Don't
*   **Don't** use pure white (`#FFFFFF`) or generic blue links.
*   **Don't** use standard "Nightlife" tropes like neon glows, lens flares, or high-saturation purples.
*   **Don't** use sharp `0px` or small `4px` corners. Everything must feel tumbled and smooth like a river stone (`28px-48px`).
*   **Don't** use centered "Hero" layouts. Prefer "Minimal Dramatic" layouts with left-aligned typography and heavy negative space on the right.

---
*Director's Final Note: We are building a sanctuary, not a website. Every pixel should feel like it was placed with the same intention as a candle in a dark room.*```