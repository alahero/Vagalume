# Vagalume — Brandbook (transcripción desde manual gráfico)

Documento de referencia derivado de las exportaciones PNG del manual (`PDF to PNG/1x/`, láminas 1–45). Sirve para alinear sitio web y piezas digitales con la identidad aprobada.

**Notas del equipo (aclaraciones posteriores al análisis):**

- Licencias de tipografía (Calvino, Avenir Next): las gestiona el equipo; este documento solo define uso.
- Los paneles de las láminas 26–28 pueden verse distintos al swatch de la lámina 34 por **textura y luz** encima; los **HEX canónicos** siguen siendo los de la p.34.
- El título de la lámina «GASTRONOMIC & DRINKS» usa **Avenir Next Regular** (no una familia stencil aparte).
- La unidad **X** del manual indica área de respeto alrededor del logo; el valor en px puede afinarse manualmente en implementación.
- La regla de evitar blanco y negro en entorno se entiende orientada principalmente a **fotografía para redes sociales**; el sitio puede alinear el criterio con esa intención sin tratarlo como veto absoluto de B&W en web salvo directriz contraria.

---

## 1. Inventario de fuentes

| Fuente | Ubicación | Tipo |
|--------|-----------|------|
| Manual de marca (export) | `PDF to PNG/1x/Mesa de trabajo 1.png` … `45.png` | 45 PNG @1× |

Índice (lámina 2): Creative Direction, Personification, Communication Strategy, Visual Identity (logotipo, variaciones, isotipo, responsive, colorimetría, tipografías), Graphic Elements (texturas, ilustraciones, submarcas), Aplicaciones (graphic masters, merch).

**Precedencia:** manual de marca como fuente principal para tokens y reglas; si hay conflicto con implementaciones previas, gana el manual.

---

## 2. Núcleo de marca

**Vagalume** se posiciona como un **santuario contemporáneo en la jungla** que mezcla sofisticación, pulso orgánico de la naturaleza y espíritu de **ritmo**. Es un lugar donde talentos locales e internacionales se encuentran con una comunidad centrada en presencia, autenticidad y disfrute (lámina 11).

**Personalidad (lámina 13):** misteriosa, esotérica, apasionada y a la vez contemplativa, magnética, sofisticada, orgánica pero pulida.

**Pilares de contenido** (música, lifestyle, gastronomía; láminas 8–10 y relacionadas): la música es eje inmersivo; lifestyle cuenta la experiencia y la atmósfera; gastronomía pone protagonismo a platos y mixología con estética artística.

**Mezcla editorial aproximada (láminas 17–22, 20–22):**

- DJs ~60%
- Lugar (Place) ~20%
- Experiencia ~10%
- Gastronómico ~10%

**Concepto espacial / lugar (lámina 20):** entornos inmersivos y texturas del venue; palabras clave: sacred, timeless, elemental, authentic; minimalista pero cálido. Fotografía con texturas naturales (arena, mar, madera, piedra, vegetación) y color vivo en arquitectura y producción. Evitar «lujo brillante» vacío; privilegiar **lujo de autenticidad**.

---

## 3. Tono de voz

- **Idioma:** comunicación escrita **100% en inglés** (lámina 15).
- **Persona gramatical:** **segunda y tercera persona**.
- **Cualidades:** calmado, vibrante, culto, invitador; honra la **totalidad de la experiencia**.
- **Misticismo:** permitido, **sin** tono condescendiente ni «predicador» (lámina 15).

**Keywords de marca (lámina 14):** Connection, Tastefulness, Authenticity, Communal, Nature, Sound.

---

## 4. Estilo de comunicación

- **Mayúsculas:** uso dominante de **versalitas** en títulos, rótulos y mucho cuerpo tipo manual (especialmente con Avenir Next).
- **Tracking:** generoso en titulares finos; sensación editorial y espacio.
- **Itálica:** aparece en índice (categorías del contenido) y en listas tipo CTA/copies (lámina 23).
- **Géneros musicales citados (lámina 7):** Progressive House, Progressive Trance, Techno, Tech House, Afro House.

**CTA de referencia (lámina 23):** RESERVE, BOOK NOW, COMING SOON (en el manual aparece «COMMING»; en producción usar ortografía correcta), DISCOVER VAGALUME.

**Copies de referencia (lámina 23):** MYSTICAL NIGHTS AWAIT; A SANCTUARY OF SOUND; ENTER THE VAGALUME REALM; THE SPIRIT OF TULUM.

**Fotografía / redes (lámina 16, interpretación acordada):** evitar blanco y negro en **alrededores y ambiente** en la medida de lo posible; evitar **celulares visibles** en la toma. Enfocado a **contenido social**; web puede seguir el espíritu de la regla sin dogmatismo absoluto salvo nueva directriz.

**Lineamientos DJ / formato (ej. láminas 17–18):** biografía, fecha, warm-ups, tags; formatos PNG / carrusel / reels según slide; retratos tipo press kit donde aplique.

---

## 5. Tokens de color

### 5.1 HEX canónicos (lámina 34)

| Token sugerido | HEX | RGB | Notas |
|----------------|-----|-----|--------|
| `--vl-earth` | `#6D4B27` | 109, 75, 39 | Marrón tierra |
| `--vl-sand` | `#FAF9D6` | 250, 249, 214 | Arena / crema |
| `--vl-burgundy` | `#331515` | 50, 19, 19 | Borgoña profundo |
| `--vl-forest` | `#0A4008` | 10, 64, 8 | Verde bosque |

Los paneles texturizados (láminas 26–28) son la misma base cromática; la percepción cambia por **textura, iluminación y overlay**.

### 5.2 Proporción de uso (lámina 35)

- **40%** tierra / ocre dominante (alineado con `--vl-earth` y superficies cálidas).
- **30%** crema (`--vl-sand`) — títulos, botones, zonas de alto contraste.
- **20%** borgoña (`--vl-burgundy`) — detalle, profundidad, ilustración.
- **10%** verde (`--vl-forest`) — acentos sutiles, **hover**, detalles de soporte.

### 5.3 Modo oscuro «nocturno» (múltiples láminas)

Muchas páginas usan fondo **carbón/negro texturizado** y texto **champagne / crema** (evitar blanco puro donde el manual usa pergamino). Referencias útiles:

- Fondo: `#0A0A0A`–`#121212` + textura o grano.
- Texto / bordes sobre oscuro: `#C5B391`–`#D4C5A1`–`#E8E2D0` según contraste.
- Reglas: `1px`, a veces con opacidad suave.

### 5.4 Submarcas (lámina 41)

**Vagalume Sessions**, **Sundaze**, **Disorder** tienen estéticas propias; reservarlas a **eventos / microsecciones**, no sustituir la UI base de Vagalume principal.

---

## 6. Sistema tipográfico

**Primaria (display, wordmark, editorial de lujo):** **Calvino** — serif de alto contraste; pesos citados en manual: **Thin, Light, Bold** (lámina 36). Uso frecuente en **mayúsculas**.

**Secundaria (UI, rótulos, cuerpo estilo manual):** **Avenir Next** — **Ultra Light, Regular, Bold** (lámina 37). El título «GASTRONOMIC & DRINKS» (lámina 10) usa **Avenir Next Regular**; el aspecto «stencil» o cortes en las formas es **tratamiento visual del layout**, no otra familia obligatoria.

**Fallbacks web (si no hay licencia aún):**

- Display: Cormorant Garamond, Cinzel, Bodoni Moda (aproximar alto contraste).
- UI: Nunito Sans, Montserrat, Work Sans (pesos light/thin como aproximación a Ultra Light).

**Composición:**

- Titulares de sección tipo manual: sans **extrafino**, **MAYÚSCULAS**, **tracking amplio** (orden típico `0.2em`–`0.35em`, ajustar por tamaño).
- Wordmark «VAGALUME»: **serif**, mayúsculas, tracking generoso.
- Para **legibilidad web** en párrafos largos se puede usar oración normal; mantener versalitas en nav, labels y CTAs si se busca fidelidad al manual.

---

## 7. Efectos visuales y movimiento

- **Grano / noise** tipo película sobre gradientes y fondos.
- **Texturas orgánicas:** arena, humo, tela, ondas, «fluid» (láminas 3, 24, 38, 39).
- Lámina 39 nombra referencias: **noise**, **torn paper**, **plastic** como capas o acabados.
- **Fotografía:** baja clave, contraste alto; color vivo en ambiente cuando aplique (coherente con regla social sobre B&W).
- **Collages / masters (láminas 4–5, 42):** duotono, grain, light leaks, overlays analógicos.
- **Motion sugerido:** transiciones lentas, fundidos, parallax leve en texturas; hovers discretos; `--vl-forest` o brillo sutil acorde a «luciernaga» sin caricatura.

---

## 8. Patrones UI/CX para web

### 8.1 Trazos y líneas

- Divisores y marcos: **hairline** → **`1px`** (en pantallas muy densas valorar `0.5px` solo si se renderiza bien).
- Líneas a **ancho completo** en héroes y secciones (láminas 1, 3, 25).
- Marcos de contenido en pilares: borde fino color champagne sobre fondo oscuro.

### 8.2 Border radius — sistema dual (ambos son marca)

1. **Modo editorial / construcción de logo / rejillas:** esquinas **0** o mínimas; geometría limpia (láminas 29, 41).
2. **Modo inmersivo / storytelling:**
   - Tarjetas e imágenes (related brands, moodboard): radio **grande** — referencia **24px–48px** según viewport; p. ej. `clamp(1.25rem, 3vw, 3rem)`.
   - Paneles de texto enmarcados a la derecha: **muy redondeados** en esquinas visibles (~**40px–60px** en desktop).
   - Barras tipo «color proportion»: **pill** → `border-radius: 9999px`.
   - Cajas de textura (lámina 39): radio **moderado** ~**16px–24px** y borde fino.
   - Isotipo: **círculo**; anillo del logo con **interrupción inferior** para líneas de «glow» (láminas 25–26).

### 8.3 Sombras

Sombras **muy suaves** en fotos sobre fondos oscuros (lámina 6); priorizar profundidad por **capas y textura**, no sombras duras.

### 8.4 Iconografía recurrente

- **Diamante vertical** (a veces con punto central) como viñeta en listas (láminas 8–10, 17–23).
- Ilustraciones Tulum (ojo/serpientes, mano, tótem) — línea orgánica, mezcla trazo grueso y detalle fino (lámina 40); usar como **acento**, no como set denso de iconos UI.

### 8.5 Logo responsive (lámina 33)

| Ancho de contenedor (referencia manual) | Tratamiento |
|----------------------------------------|-------------|
| Hasta ~700px (máximo ilustrado) | Isotipo **arriba** del wordmark (stack). |
| ~500px | Isotipo **izquierda** + wordmark. |
| ~250px | Solo **wordmark**. |
| ~100px (mínimo) | Solo **isotipo** en círculo. |

### 8.6 Área de respeto

El manual usa **1X** alrededor del bloque de logo (láminas 29, 32). **X** es unidad modular del PDF; el equipo ajusta el valor en px en implementación.

### 8.7 Grid y ritmo

Márgenes amplios; composiciones **centradas** o **dos columnas** (título izquierda / cuerpo en marco derecho) como en pilares de contenido. La proporción 40/30/20/10 aplica a **superficie y acento**, no solo a planos de color plano.

---

## 9. Do / Don’t

### Do

- Usar **Calvino + Avenir Next** (o fallbacks acordados) y la **paleta HEX** de la lámina 34 con la **proporción** de la 35.
- Superponer **noise** sutil y fondos **orgánicos** en lugar de grises planos.
- Mantener **1px** en reglas y marcos; alternar **modo filo** y **modo tarjeta** según tipo de sección.
- Copy en **inglés**, tono calmado e invitador; CTAs alineados a lámina 23 (ortografía corregida).
- Respetar **breakpoints del logo** (lámina 33) y el criterio de **área de respeto** que el equipo fije con X.

### Don’t

- Depender de **B&W** para fotos de **ambiente/redes** si se busca adherencia estricta a la lámina 16 (contexto social).
- **Bordes gruesos** o radio «genérico medio» (p. ej. 8px en todo) que contradiga el lenguaje (o **cero** o **grande/pill**).
- Mezclar submarcas al mismo nivel jerárquico que el logo principal sin contexto de evento.
- Caer en **promo genérico de club**; privilegiar narrativa y autenticidad frente a «lujo brillante» vacío (lámina 20).

---

## 10. Preguntas abiertas / seguimiento

1. **Fallbacks:** hasta tener licencias finales, documentar en código qué familia sustituye a Calvino y Avenir Next en cada peso.
2. **Stencil / display:** si en el futuro se formaliza otra familia para titulares especiales, actualizar esta guía.
3. **Excepciones B&W:** si marketing confirma uso puntual de B&W en web (p. ej. retratos), documentarlo aquí para alinear con la regla social.

---

*Última actualización: transcripción y aclaraciones de equipo consolidadas para implementación en `web/` y piezas digitales de Vagalume.*
