# Sistema de diseño — referencia consolidada (manual + Stitch)

Documento de apoyo para implementación. **No sustituye al manual de marca.**

## Jerarquía obligatoria

1. **`Brandbook.md`** (raíz del repo) — colores HEX, tipografías oficiales, proporción 40/30/20/10, logo, tono, do/don’t.
2. **`SKILL.md`** (esta skill) — checklist operativo derivado del manual.
3. **`Assets/DESIGN.md`** (export Stitch, «Nocturnal Sanctuary») — patrones de UI, ritmo visual y tokens *adicionales* solo cuando **no contradigan** 1 ni 2.

Si Stitch y el manual discrepan, **gana el manual** (y esta skill).

---

## Comparativa: qué aporta cada fuente

| Tema | Manual / Brandbook | Stitch (`DESIGN.md`) | Cómo usarlo |
|------|--------------------|----------------------|-------------|
| Narrativa | Santuario en la jungla, misticismo culto, sin lujo vacío | Misma línea («sanctuary», jungla al anochecer, editorial) | Refuerzo; copy y concepto siguen `Brandbook.md` §2–3. |
| Color base | HEX canónicos lámina 34 (`--vl-earth`, `--vl-sand`, `--vl-burgundy`, `--vl-forest`); fondos carbón + champagne | Primarios alineados (`#6D4B27` tierra, cremas/champagne, borgoña `#331515`); superficies tipo `#131313`, capas anidadas | **Mapear siempre a tokens `--vl-*`**. Valores extra de Stitch (p. ej. `#edbe90`, `#9c8e83`, `#c9c8a8`) son *opcionales* como acentos derivados si mantienen contraste y la proporción del manual. |
| Tipografía | **Calvino** + **Avenir Next** (fallbacks documentados en manual) | **Newsreader** + **Work Sans** en el mockup | En código: **objetivo manual**; fuentes de Stitch son **aproximación visual** hasta licencias. Mantener: display en mayúsculas, tracking amplio, UI fina. |
| Trazos | Hairlines **`1px`**, marcos y divisores en héroes/secciones | «No-line rule»: evitar 1px para *delimitar secciones*; preferir cambio de superficie | **Compatible:** usar **capas de superficie** entre bloques (como Stitch) **y** reservar **1px** donde el manual pide marco editorial o línea a ancho completo (`Brandbook.md` §8.1). No sustituir marcos de marca por “solo sombras”. |
| Radios | **Dual:** editorial **0** o mínimo; storytelling **24–48px**, paneles **~40–60px**, pills **9999px** | Tarjetas muy redondeadas (`~3rem`), evitar esquinas mínimas en storytelling | En secciones tipo “club / inmersivo”, Stitch valida el rango grande del manual. Donde el manual pida **modo filo**, **no** imponer `rounded-xl` global. |
| Layout / hero | Márgenes amplios; **centrado o dos columnas** (título / marco) | Prefiere tipografía **alineada** con negativo dramático; desaconseja hero centrado genérico | **Gana el manual:** centrado y dos columnas siguen permitidos. Stitch aporta **variante** (asimetría, offset de imagen) cuando encaje con la sección. |
| Profundidad | Capas, textura, sombras muy suaves | “Tonal layering”; sombra suave 48px @ ~8% si hace falta flotación | Alineado; evitar sombras duras y plantillas genéricas. |
| Efectos | Grano, texturas orgánicas, transiciones lentas | Glassmorphism (blur + opacidad), gradientes sutiles en CTA, máscara “jungle” | Opcionales si no compiten con claridad ni accesibilidad; coherente con “lujo de autenticidad”. |
| Anti-patrones | Sin bordes gruesos, sin radio “medio genérico” en todo | Sin blanco puro, sin azul link genérico, sin neón / lens flare / púrpura chillón | Unir criterios en implementación. |

---

## Tokens sugeridos (mapeo mental Stitch → marca)

Usar en CSS/JS los nombres **`--vl-*`** del Brandbook. La tabla siguiente relaciona conceptos Stitch con esos tokens (y extensiones opcionales).

| Rol (Stitch / UI) | Preferencia de implementación |
|-------------------|----------------------------------|
| Fondo base oscuro | `--vl-night` o rango manual `#0A0A0A`–`#121212` (textura aparte). |
| Tierra / contenedor cálido | `--vl-earth` |
| Arena / alto contraste / titulares claros | `--vl-sand` |
| Borgoña / profundidad | `--vl-burgundy` |
| Acento hover / detalle | `--vl-forest` |
| Texto champagne sobre oscuro | `--vl-champagne` o rampa manual `#C5B391`–`#E8E2D0` según contraste |
| Superficie anidada (capas) | Nuevos tokens opcionales tipo `--vl-surface`, `--vl-surface-low` derivados de `--vl-night` con ligera variación de luminancia — **sin** sustituir la proporción 40/30/20/10 en superficies de marca. |

Colores adicionales citados solo en Stitch (`#edbe90`, `#efbab8`, `#131313`, `#9c8e83`, etc.): **referencia visual**; si se adoptan, documentarlos en `:root` con nombres claros (`--vl-*`) y comprobar contraste (WCAG) en textos y CTAs.

---

## Patrones UI útiles de Stitch (condicionados)

- **Jerarquía de superficies:** alternar planos oscuros en lugar de líneas entre secciones grandes; combinar con hairlines del manual donde el diseño lo pida.
- **CTA:** sólidos cálidos sobre fondo oscuro; gradientes muy sutiles opcionales (no competir con tipografía principal).
- **Navegación flotante:** barra con blur y opacidad, anclaje inferior o superior según mockup final — validar con marketing.
- **Listas:** separación por espacio o tinte alterno, evitando divisores pesados (alineado con “no genérico”).
- **Imágenes en tarjetas:** overlay ligero o blend hacia “noche” para unificar mood — coherente con fotografía baja clave del manual.
- **Máscara orgánica (“jungle”):** componente distintivo opcional; no sustituye isotipo ni reglas de logo.

---

## Fotografía y logo aprobados (Marketing)

Ubicación: **`Assets/`** en la raíz del repositorio.

| Archivo | Uso |
|---------|-----|
| `logo-blanco-vagalume.png` | Logo claro sobre fondos oscuros (confirmar variantes con el equipo si se necesita versión oscura). |
| `1.jpg` … `7.jpg` | Fotografía aprobada para web; preferir estas antes que stock o capturas no autorizadas. |

**Nota:** Criterios de redes (B&W, celulares) en `Brandbook.md`; el sitio sigue el espíritu de la guía.

---

## Pantalla Stitch de referencia

- **Fuente local (recomendada):** carpeta `Assets/stitch-export/` — contiene `code.html`, `screen.png` y `DESIGN.md` (mismo contenido que al descomprimir `Assets/stitch_vagalume_beach_club_tulum.zip`). Úsalo como base de implementación sin depender de API ni MCP.
- Proyecto Stitch: *Vagalume Beach Club — Tulum*; pantalla guía: *Minimalist with Brand Photos*. Alinear tokens y tipografía al **manual**; el HTML exportado es **punto de partida**, no fuente de verdad cromática ni tipográfica.

---

*Última consolidación: alineación entre `Brandbook.md`, `SKILL.md` y export Stitch (`Assets/stitch-export/DESIGN.md` o `Assets/DESIGN.md`).*
