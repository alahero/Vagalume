/**
 * Crea o reutiliza un proyecto en Google Stitch y genera la landing Vagalume
 * usando la misma API que el servidor MCP de Stitch (Streamable HTTP + tools).
 *
 * Uso (PowerShell):
 *   $env:STITCH_API_KEY="tu_clave"
 *   node scripts/stitch-generate-vagalume.mjs
 *
 * Opcional: $env:STITCH_PROJECT_ID="<id>" para añadir pantallas a un proyecto ya creado en Stitch.
 */
import { stitch } from "@google/stitch-sdk";

if (!process.env.STITCH_API_KEY) {
  console.error("Define STITCH_API_KEY en el entorno.");
  process.exit(1);
}

const PROMPT = `
Design a single long-scroll DESKTOP marketing landing page for "VAGALUME", a beach club in Tulum, Mexico.
Tone: calm, cultured, mystical but not preachy; English copy only; second person where natural.

Brand colors (CSS):
- Earth brown: #6D4B27 (dominant warm surfaces ~40%)
- Sand cream: #FAF9D6 (headlines on dark, primary buttons ~30%)
- Deep burgundy: #331515 (depth panels ~20%)
- Forest green: #0A4008 (subtle hover, small accents ~10%)
- Night background: #0A0A0A to #121212 with subtle film grain / noise
- Champagne text on dark: #E8E2D0 and muted #C5B391; hairline rules 1px rgba(232,226,208,0.25)

Typography:
- Display: high-contrast serif like Cormorant Garamond; hero ALL CAPS with generous letter-spacing.
- UI labels: Montserrat or Work Sans, ultra-light/light, ALL CAPS, tracking 0.22em–0.32em.

Layout references (structure only):
- bonbonniere.mx: dramatic hero, BOOK NOW, events row, VIP block, editorial footer.
- mandalanightclub.com: clear section rhythm; three pillars as Sound, Place, Taste.
- confessions.com.mx: organic jungle-night mood, intimate spacing, low-key luxury (no neon club cliché).

Sections:
1) Sticky nav: VAGALUME, EXPERIENCE, EVENTS, DINING, CONTACT, BOOK NOW.
2) Hero: "ENTER THE VAGALUME REALM" / "A sanctuary of sound where the jungle meets the sea"; CTAs BOOK NOW (sand fill) and DISCOVER VAGALUME (outline).
3) Full-width 1px divider.
4) UPCOMING EXPERIENCES — three rounded cards + SEE ALL EVENTS.
5) Two columns: "MYSTICAL NIGHTS AWAIT" + framed body copy panel (48px radius, 1px champagne border).
6) Pillars with diamond bullets: SOUND, PLACE, TASTE.
7) VIP burgundy block "ELEVATE YOUR EVENING" + RESERVE.
8) Wide imagery band, two large rounded placeholders.
9) Footer: PRIVACY, TERMS, FAQ, © VAGALUME TULUM.

Accessibility: readable contrast; visible focus rings (thin sand).

One HTML page, responsive to tablet; placeholders OK for photos.
`.trim();

let projectId = process.env.STITCH_PROJECT_ID;
if (!projectId) {
  console.log("Creando proyecto…");
  const created = await stitch.createProject("Vagalume Beach Club Tulum");
  projectId = created.projectId;
  console.log("projectId:", projectId);
} else {
  console.log("Proyecto existente:", projectId);
}

console.log("Generando pantalla vía generate_screen_from_text (varios minutos; no reintentar)…");
try {
  await stitch.callTool("generate_screen_from_text", {
    projectId,
    prompt: PROMPT,
    deviceType: "DESKTOP",
    modelId: "GEMINI_3_FLASH",
  });
} catch (e) {
  console.warn("Aviso tras la llamada (a veces el SDK falla aunque Stitch haya creado la pantalla):", e?.message || e);
}

const project = stitch.project(projectId);
const screens = await project.screens();
console.log("\nPantallas en el proyecto:", screens.length);
for (const s of screens) {
  const sid = s.screenId ?? s.id;
  console.log("\nscreenId:", sid);
  console.log("HTML:", await s.getHtml());
  console.log("Screenshot:", await s.getImage());
}

console.log("\nAbre https://stitch.withgoogle.com/ para ver y editar el proyecto.");
