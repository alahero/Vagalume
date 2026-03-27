# Readme Web Developer — MT API

**Fuente única:** [`README-API-MT-v250326.md`](./README-API-MT-v250326.md) (MandalaTickets API v2 — documentación completa, 25 de marzo 2026).

Este archivo recopila **solo** lo necesario para integrar **contenidos (venues), eventos, catálogo de productos por fecha** y **health**. No reproduce aquí las secciones de órdenes ni reportes de ventas del documento maestro; para eso sigue aplicando el README completo.

---

## Tabla de contenidos

- [Servidor y base URL](#servidor-y-base-url)
- [Autenticación](#autenticación)
- [Convenciones generales](#convenciones-generales)
- [Catálogo de endpoints (extracto)](#catálogo-de-endpoints-extracto)
- [Info — Venues y eventos](#info--venues-y-eventos)
- [Productos — Catálogo por sucursal](#productos--catálogo-por-sucursal)
- [Health — Estado del servicio](#health--estado-del-servicio)
- [Venues y sucursales — IDs conocidos](#venues-y-sucursales--ids-conocidos)
- [Estructura JSON — Venue](#estructura-json--venue)
- [Estructura JSON — Evento](#estructura-json--evento)
- [Estructura JSON — Producto](#estructura-json--producto)
- [Esquema completo (árboles)](#esquema-completo-árboles)
- [Errores y códigos HTTP](#errores-y-códigos-http)
- [Diferencias con la API de contenido legacy](#diferencias-con-la-api-de-contenido-legacy)
- [Medidas y aspect ratios de multimedia](#medidas-y-aspect-ratios-de-multimedia)
- [Recursos estáticos y rutas base](#recursos-estáticos-y-rutas-base)
- [Ejemplos de código](#ejemplos-de-código)
- [Notas técnicas (filtradas)](#notas-técnicas-filtradas)
- [Changelog — Extracto relevante para este readme](#changelog--extracto-relevante-para-este-readme)

---

## Servidor y base URL

```
https://api.mandalatickets.com
```

Todos los endpoints están bajo el prefijo `/v1`. No hay ambientes de staging expuestos; esta es la URL de producción.

Adicionalmente, el endpoint `/health` está disponible sin prefijo `/v1` y sin autenticación.

---

## Autenticación

Todos los endpoints bajo `/v1` requieren el header `x-api-key` con una API key válida.

```
x-api-key: mt_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

- Las API keys tienen el prefijo `mt_live_` seguido de 64 caracteres hexadecimales.
- La key se pasa exclusivamente en el header HTTP, **no** en la URL ni en el body.
- Si la key es inválida o no se envía, la API responde con error de autenticación.
- El endpoint `/health` **no requiere autenticación**.

**Variable de entorno:**

```bash
export MT_NEW_API_KEY="mt_live_..."
```

En código: `process.env.MT_NEW_API_KEY` (Node.js) / `os.environ["MT_NEW_API_KEY"]` (Python).

> **Importante:** No exponer la API key en frontend. Usarla exclusivamente desde backend o variables de entorno servidor-lado.

### Configuración en Vercel

La API key se configura como **Environment Variable** en Vercel a nivel de Team para que esté disponible en todos los proyectos.

**Pasos:**

1. Ir a [vercel.com](https://vercel.com) → tu **Team** (no un proyecto individual).
2. **Settings** → **Environment Variables**.
3. **Add New**:
   - **Key:** `MT_NEW_API_KEY`
   - **Value:** `mt_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   - **Environments:** Production, Preview, Development
4. Marcar **Apply to all projects**.
5. **Save**.

**Uso en código (Next.js / serverless functions):**

```javascript
// Server-side only (API routes, getServerSideProps, Server Components)
const API_KEY = process.env.MT_NEW_API_KEY;

// NUNCA usar NEXT_PUBLIC_MT_NEW_API_KEY — la key no debe llegar al cliente
```

**Notas:**
- La variable se llama `MT_NEW_API_KEY` (sin prefijo `NEXT_PUBLIC_`) para que **nunca** se exponga al browser.
- Solo es accesible en server-side: API routes (`/api/*`), Server Components, `getServerSideProps`, middleware.
- Si un proyecto necesita la API key de contenido legacy además de la v2, usar `MT_CONTENT_API_KEY` como variable separada.

| Variable | API | Uso |
|---|---|---|
| `MT_NEW_API_KEY` | v2 (`api.mandalatickets.com/v1/`) | Header `x-api-key` |
| `MT_CONTENT_API_KEY` | Legacy (`mandalatickets.com/api/info_venues/`) | En URL path |

---

## Convenciones generales

- **Content-Type:** `application/json` para requests y responses.
- **Formato de fechas en parámetros:** `YYYY-MM-DD` (ej. `2026-03-25`).
- **Formato de fechas en respuestas de órdenes:** `DD/MM/YYYY HH:mm:ss` (ej. `"28/03/2026 00:00:00"`) para `fecha_visita` y `fecha_compra`. Adicionalmente, el campo `fecha` devuelve formato `YYYY-MM-DD` (ej. `"2026-03-28"`).
- **Formato de `fecha_validacion`:** `YYYY-MM-DD HH:mm:ss` (datetime completo del check-in real). Ej: `"2026-03-18 23:33:31"`.
- **Formato de `hora_check_in`:** `HH:mm:ss` (solo hora). Ej: `"23:33:31"`. Devuelve `"00:00:00"` si no se ha hecho check-in.
- **Formato de fechas en respuestas de venues/eventos:** ISO 8601 (ej. `"2026-03-28T06:00:00.000Z"`).
- **Montos:** Strings con dos decimales en órdenes (ej. `"720.00"`), numbers en productos y ventas por sucursal (ej. `60`).
- **Arrays vacíos:** Cuando no hay resultados, la API devuelve `[]` con status `200`, no un error.
- **Campos nullable:** Devuelven `null` explícitamente, nunca se omiten del JSON.
- **Duplicidad GET/POST:** Los endpoints de órdenes soportan tanto GET (parámetros en query string) como POST (parámetros en body JSON). La respuesta es idéntica.
- **Nombres de campo en órdenes:** Usan `snake_case` (ej. `order_id`, `fecha_visita`, `total_mxn`).

---

## Catálogo de endpoints (extracto)

### Info

- `GET  /v1/info/venues` — Venues con eventos, multimedia, SEO y metadata
- `POST /v1/info/venues` — Igual que GET (body vacío o `{}`)

### Productos

- `GET /v1/productos/fecha?sucursal=ID&fecha=YYYY-MM-DD` — Productos disponibles por sucursal y fecha

### Health

- `GET /health` — Estado del servicio (sin autenticación)

*(El catálogo completo de todos los endpoints está en `README-API-MT-v250326.md`.)*

---

## Info — Venues y eventos

### `GET /v1/info/venues`

Devuelve el catálogo completo de venues con sus eventos, contenido multilenguaje, multimedia, ubicación y redes sociales.

**Parámetros:** Ninguno.

**Request:**

```bash
curl -s "https://api.mandalatickets.com/v1/info/venues" \
  -H "x-api-key: $MT_NEW_API_KEY"
```

**Response:** `200 OK` — `Array<Venue>` (ver [Estructura JSON — Venue](#estructura-json--venue))

**Características:**
- Respuesta pesada (~400 KB+). Implementar caché servidor-lado con TTL de 5-15 minutos.
- Devuelve venues que tienen eventos configurados activamente. No necesariamente incluye todos los venues del sistema de órdenes.
- Idiomas disponibles: `es`, `en`, `pt`, `fr`.
- Venues devueltos en marzo 2026: MANDALA BEACH DAY (3), DCAVE (6), RAKATA (32), BONBONNIERE (37), VAGALUME (38), SRA TANAKA (54), HOUDINNI (55).

### `POST /v1/info/venues`

Idéntico al GET. Body vacío o `{}`.

```bash
curl -s -X POST "https://api.mandalatickets.com/v1/info/venues" \
  -H "x-api-key: $MT_NEW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Productos — Catálogo por sucursal

### `GET /v1/productos/fecha`

Catálogo de productos disponibles para una sucursal en una fecha específica. Incluye precios, moneda, PAX incluidos/máximos, tipo de producto y descripciones multilenguaje (es, en, pt, fr) con información operativa detallada.

**Parámetros:**

- **`sucursal`** (requerido) — ID numérico del venue.
- **`fecha`** (requerido) — Fecha de disponibilidad. Formato: `YYYY-MM-DD`.

**Request:**

```bash
# Productos de MANDALA CUN para el 28 de marzo
curl -s "https://api.mandalatickets.com/v1/productos/fecha?sucursal=1&fecha=2026-03-28" \
  -H "x-api-key: $MT_NEW_API_KEY"
```

**Response:** `200 OK` — `Array<Producto>`

```json
[
  {
    "nombre": "UNLIMITED DRINKS",
    "tipo_prd": 1,
    "pax_incluidos": 1,
    "pax_maximos": 20,
    "precio": 60,
    "moneda": "USD",
    "producto_id": 415,
    "descripcion_en": "<b>ONLINE PRICE: $60 USD</b><br>DOOR PRICE: $65 USD<br><b>Check-in: From 9:30 PM to 11:00 PM</b>...",
    "descripcion_es": "<b>PRECIO EN LÍNEA: $60 USD</b><br>PRECIO EN PUERTA: $65 USD<br><b>Check-in: De 9:30 PM a 11:00 PM</b>...",
    "descripcion_pt": "<b>PREÇO ONLINE: $60 USD</b><br>PREÇO NA PORTA: $65 USD<br><b>Check-in: Das 21h30 às 23h00</b>...",
    "descripcion_fr": "<b>PRIX EN LIGNE : $60 USD</b><br>PRIX À L'ENTRÉE : $65 USD<br><b>Check-in : De 21h30 à 23h00</b>..."
  },
  {
    "nombre": "SILVER - Spring Sounds",
    "tipo_prd": 2,
    "pax_incluidos": 5,
    "pax_maximos": 7,
    "precio": 6500,
    "moneda": "MXN",
    "producto_id": 827,
    "descripcion_en": "...",
    "descripcion_es": "...",
    "descripcion_pt": "...",
    "descripcion_fr": "..."
  }
]
```

> **Nota:** Las descripciones se muestran truncadas en el ejemplo. En la respuesta real son HTML completo con varios párrafos.

**Errores:**
- `400` — `{"success": false, "error": "Se requiere sucursal y fecha (YYYY-MM-DD)."}` si faltan parámetros.
- `500` — Si la sucursal no es numérica o no existe.

---

## Health — Estado del servicio

### `GET /health`

Endpoint de healthcheck para monitoreo. **No requiere autenticación** ni prefijo `/v1`.

**Request:**

```bash
curl -s "https://api.mandalatickets.com/health"
```

**Response:** `200 OK`

```json
{
  "status": "ok",
  "timestamp": "2026-03-25T16:39:32.315Z"
}
```

**Campos:**
- **`status`** (`string`) — Estado del servicio. Valor conocido: `"ok"`.
- **`timestamp`** (`string`) — Fecha y hora del servidor en ISO 8601.

---

## Venues y sucursales — IDs conocidos

El sistema tiene **22 venues** registrados en **6 ciudades** de **3 países**. El parámetro `sucursal` en todos los endpoints siempre es el **ID numérico**.

### Catálogo completo de venues

#### Cancún, México (CUN) — 9 venues

- **1** — MANDALA — Nightclub. Diario.
- **3** — MANDALA BEACH DAY — Day Club / Playa. Diario (11:00 AM – 5:30 PM).
- **4** — MANDALA BEACH NIGHT — Night Pool Party. Miércoles (10:00 PM – 3:00 AM).
- **6** — DCAVE — Nightclub. Jueves y Sábados (10:00 PM – 3:00 AM).
- **7** — SEÑOR FROGS — Bar / Entretenimiento.
- **9** — LA VAQUITA — Nightclub / Bar.
- **32** — RAKATA — Nightclub.
- **53** — HOUSE OF FIESTA — Nightclub / Bar.
- **60** — RESET | HRoof & DCave — Evento especial / Rooftop + D'Cave combinado.

#### Playa del Carmen, México (PDC) — 3 venues

- **10** — MANDALA — Nightclub.
- **12** — LA VAQUITA — Nightclub / Bar.
- **29** — SANTITO TUN - TUN — Bar / Nightclub.

#### Puerto Vallarta, México (PVR) — 7 venues

- **14** — MANDALA — Nightclub.
- **15** — LA SANTA — Nightclub.
- **16** — LA VAQUITA — Nightclub / Bar.
- **24** — SEÑOR FROGS RESTAURANT — Restaurante / Bar.
- **27** — CHICABAL SUNSET CLUB — Beach Club / Sunset.
- **33** — MITA SOUNDS — Evento / Festival.
- **39** — RAKATA — Nightclub.

#### Los Cabos, México (CAB) — 2 venues

- **18** — MANDALA — Nightclub.
- **20** — LA VAQUITA — Nightclub / Bar.

#### Tulum, México (TUL) — 2 venues

- **37** — BONBONNIERE — Nightclub de lujo. Miércoles a Domingo (desde 10:00 PM).
- **38** — VAGALUME — Beach Club / Festival. Variable por evento.

#### Guadalajara, México (GDL) — 1 venue

- **54** — SRA TANAKA — Restaurante / Bar japonés. Diario (1:00 PM – 1:00 AM).

#### Madrid, España (MAD) — 2 venues

- **55** — HOUDINNI — Nightclub underground. Martes a Domingo (12:00 AM – 6:00 AM).
- **56** — SALA DE DESPECHO — Bar / Entretenimiento.

### Marcas con presencia multi-ciudad

- **MANDALA** → CUN (1), PDC (10), PVR (14), CAB (18)
- **LA VAQUITA** → CUN (9), PDC (12), PVR (16), CAB (20)
- **RAKATA** → CUN (32), PVR (39)
- **SEÑOR FROGS** → CUN (7), PVR restaurant (24)

### Ciudades

- **CUN** — Cancún, Quintana Roo, México
- **PDC** — Playa del Carmen, Quintana Roo, México
- **TUL** — Tulum, Quintana Roo, México
- **PVR** — Puerto Vallarta, Jalisco, México
- **CAB** — Los Cabos, Baja California Sur, México
- **GDL** — Guadalajara, Jalisco, México
- **MAD** — Madrid, España

### IDs del sistema de contenido (`row_id` en `/v1/info/venues`)

El endpoint `/v1/info/venues` usa los mismos IDs (`row_id`) pero solo devuelve venues con eventos activos configurados en el sistema de contenido. En marzo 2026 devuelve: 6, 32, 37, 38, 54, 55. No todos los venues de órdenes/ventas tienen contenido configurado.

### IDs con productos activos (marzo 2026)

Venues que devuelven productos en `/v1/productos/fecha` para fechas de marzo 2026: 1, 3, 6, 7, 9, 10, 12, 14, 15, 16, 18, 20, 27, 29, 32, 38, 39, 53, 56.

> **Importante:** Si se consulta un endpoint de ventas/productos para un venue en un día que no opera, la API puede devolver `[]` o un error 500. Validar disponibilidad antes de consultar.

---

## Estructura JSON — Venue

Cada objeto del array devuelto por `/v1/info/venues`:

- **`nombre`** (`string`) — Nombre del venue. Ej: `"DCAVE"`, `"VAGALUME"`, `"RAKATA"`.
- **`row_id`** (`number`) — ID numérico único del venue. Ej: `6`, `38`, `32`.
- **`logo`** (`string|null`) — Nombre del archivo del logo. `null` si no tiene.
- **`metadata_contenido`** (`array[4]`) — Contenido SEO y textos por idioma (es, en, pt, fr).
- **`multimedia`** (`object`) — Imágenes y vídeos del venue.
- **`localizacion`** (`object`) — Mapa, Google Maps, tour 360°.
- **`enlaces_adicionales`** (`object`) — Menú digital y redes sociales.
- **`eventos`** (`array`) — Lista de eventos del venue.

### `metadata_contenido[]`

Array con 4 elementos, uno por idioma:

- **`idioma`** (`string`) — Nombre completo: `"ESPAÑOL"`, `"INGLÉS"`, `"PORTUGUÉS"`, `"FRANCÉS"`.
- **`idioma_abrev`** (`string`) — Código ISO: `"es"`, `"en"`, `"pt"`, `"fr"`.
- **`seo`** (`object`) — Metadatos SEO.
  - **`titulo`** (`string`) — Meta title.
  - **`descripcion`** (`string`) — Meta description.
  - **`keywords`** (`string`) — Keywords separados por coma.
- **`textos`** (`object`) — Textos de presentación.
  - **`titulo_disponibilidad`** (`string|null`) — Frase de disponibilidad. Ej: `"ABRE JUEVES Y SÁBADOS"`, `"OPEN DAILY"`. Puede ser `null`.
  - **`descripcion_corta`** (`string`) — HTML con horarios, música, dress code.
  - **`descripcion_larga`** (`string`) — HTML con descripción completa, reglas, restricciones.

### `multimedia`

- **`imagen_portada`** (`string|null`) — URL completa de la imagen de portada/thumbnail.
- **`video_portada`** (`string|null`) — URL de video de portada. Generalmente `null`.
- **`carrusel`** (`array`) — Array de URLs de imágenes (típicamente 3). Puede contener `null` en items.
- **`hero_video`** (`string|null`) — URL de video hero. Generalmente `null`.
- **`hero_imagen`** (`string|null`) — URL de imagen hero.

### `localizacion`

- **`imagen_mapa_estatica`** (`string|null`) — URL de imagen del mapa/layout del venue.
- **`iframe_google_maps`** (`string|null`) — HTML `<iframe>` completo de Google Maps. Listo para insertar.
- **`link_google_maps`** (`string|null`) — Link directo a Google Maps. Generalmente `null`.
- **`link_360`** (`string|null`) — URL de tour 360° (Panoraven).

### `enlaces_adicionales`

- **`link_menu`** (`string|null`) — URL del menú digital (`mandalagroup.menu`).
- **`redes_sociales`** (`object`) — Redes sociales del venue.
  - **`facebook`** (`string|null`) — URL de Facebook.
  - **`instagram`** (`string|null`) — URL de Instagram.
  - **`tiktok`** (`string|null`) — URL de TikTok.
  - **`whatsapp`** (`string|null`) — URL de WhatsApp API con mensaje prellenado.

---

## Estructura JSON — Evento

Cada elemento de `venue.eventos[]`:

### `configuracion_general`

- **`nombre_evento`** (`string`) — Nombre completo. Ej: `"Zens of One - March 28th"`.
- **`nombre_corto`** (`string`) — Slug/identificador URL-friendly. Ej: `"zens-of-one-march28"`.
- **`orden_prioridad`** (`number`) — Entero para ordenamiento. Mayor = más prioridad. Ej: `128`.
- **`id_evento_externo`** (`number`) — ID de sistema externo de boletos. `0` si no tiene.
- **`url_externo`** (`string|null`) — URL a sistema externo de boletos.
- **`estatus`** (`string`) — Estado del evento. Valor conocido: `"Disponible"`.

### `logistica`

- **`fecha_inicio`** (`string`) — Fecha de inicio en ISO 8601. Ej: `"2026-03-28T06:00:00.000Z"`.
- **`fecha_fin`** (`string`) — Fecha de fin en ISO 8601. Puede ser igual a inicio.
- **`hora_inicio`** (`string`) — Hora de inicio. Formato `HH:mm:ss`. Casi siempre `"00:00:00"` (no definido).
- **`hora_fin`** (`string`) — Hora de fin. Formato `HH:mm:ss`. Casi siempre `"00:00:00"` (no definido).
- **`inicio_venta`** (`string|null`) — Inicio de venta de boletos. `null` si no está definido.
- **`fin_venta`** (`string|null`) — Fin de venta de boletos. `null` si no está definido.
- **`apertura_puertas`** (`string`) — Hora de apertura. Formato `HH:mm:ss`. Casi siempre `"00:00:00"`.
- **`cierre_puertas`** (`string`) — Hora de cierre. Formato `HH:mm:ss`. Casi siempre `"00:00:00"`.

> **Nota:** Los horarios reales están dentro del HTML de `descripcion_larga_1` o `descripcion_larga_2`. Los campos de `logistica` generalmente vienen como `"00:00:00"` o `null`.

### `contenido_idiomas[]`

Array con 4 elementos, uno por idioma:

- **`idioma_abrev`** (`string`) — Código ISO: `"es"`, `"en"`, `"pt"`, `"fr"`.
- **`url`** (`string`) — URL directa a la página del evento en mandalatickets.com, localizada por idioma. Ej: `"https://mandalatickets.com/es/cancun/events/d-cave/zens-of-one-march28"`.
- **`seo`** (`object`) — Misma estructura que en venue (`titulo`, `descripcion`, `keywords`).
- **`textos`** (`object`)
  - **`descripcion_larga_1`** (`string|null`) — Descripción principal en HTML.
  - **`descripcion_larga_2`** (`string|null`) — Descripción secundaria en HTML. Usado por D'Cave, Bonbonniere, Vagalume. Puede contener line-ups, precios, dress code.

### `multimedia`

- **`galeria`** (`array`) — Array de URLs de imágenes (típicamente 3). 1000x1000px, cuadradas.
- **`mapa_evento`** (`string|null`) — URL del mapa/layout específico del evento.
- **`video_portada_url`** (`string|null`) — URL de video. Generalmente `null`.
- **`slider_banners`** (`object|null`) — Banners responsive. Puede ser `null`.
  - **`desktop`** (`string`) — Banner para escritorio (~4000x1200px).
  - **`mobile`** (`string`) — Banner para móvil (~1080x580px).

---

## Estructura JSON — Producto

Cada objeto devuelto por `/v1/productos/fecha`:

- **`nombre`** (`string`) — Nombre del producto. Ej: `"UNLIMITED DRINKS"`, `"SILVER - Spring Sounds"`.
- **`tipo_prd`** (`number`) — Tipo de producto. Valores conocidos:
  - `1` — Acceso individual / entrada general (UNLIMITED DRINKS, GENERAL ADMISSION, XCLUSIVE PASS, MADNESS TOUR)
  - `2` — Mesa / VIP / reserva grupal (SILVER, GOLD, PLATINUM, DIAMOND, BED, LOUNGE CHAIR, PINK, WHITE)
  - `3` — Tarifa local / residentes (LOCALES - RESIDENTS)
  - `4` — Paquete de celebración (Bachelorette/Bachelor Packages)
- **`pax_incluidos`** (`number`) — Personas incluidas en el precio base. Ej: `1` para entradas, `5`-`15` para mesas.
- **`pax_maximos`** (`number`) — Máximo de personas permitidas. Ej: `20` para entradas, `7`-`19` para paquetes.
- **`precio`** (`number`) — Precio del producto. Ej: `60` (USD), `6500` (MXN).
- **`moneda`** (`string`) — Moneda del precio. Valores: `"USD"`, `"MXN"`.
- **`producto_id`** (`number`) — ID interno del producto. Ej: `415`.
- **`descripcion_es`** (`string`) — Descripción del producto en español. HTML con precios, horarios de check-in, qué incluye/no incluye, políticas de cancelación.
- **`descripcion_en`** (`string`) — Descripción del producto en inglés. Mismo contenido que `descripcion_es` traducido.
- **`descripcion_pt`** (`string`) — Descripción del producto en portugués.
- **`descripcion_fr`** (`string`) — Descripción del producto en francés.

> **Nota:** Las descripciones son HTML crudo. Contienen información operativa importante: precio online vs precio en puerta, horario límite de check-in, qué incluye y qué no, restricciones de área (ej. "exclusivo para zona de barra"), política de no reembolso, y notas sobre upgrades/suplementos por DJ. Sanitizar antes de renderizar.

### Tipos de producto por venue (referencia)

**MANDALA CUN (sucursal 1):**
- tipo 1: UNLIMITED DRINKS ($60 USD), GENERAL ADMISSION ($25 USD), XCLUSIVE PASS ($110 USD), MADNESS TOUR ($99 USD)
- tipo 2: BRONZE ($5,500 MXN), SILVER ($6,500 MXN), GOLD ($8,500 MXN), PLATINUM ($12,000 MXN), DIAMOND ($24,000 MXN), BIG DIAMOND ($36,000 MXN) — todos "Spring Sounds"
- tipo 3: LOCALES - RESIDENTS ($500 MXN)
- tipo 4: Bachelorette Packages 1/2/3 ($7,500/$12,000/$15,000 MXN), Bachelor Packages 1/2/3 ($8,500/$14,000/$18,500 MXN)

**DCAVE (sucursal 6):**
- tipo 1: XCLUSIVE PASS ($110 USD), UNLIMITED DRINKS ($60 USD), GENERAL ADMISSION ($35 USD), MADNESS TOUR ($99 USD)
- tipo 2: SILVER ($11,700 MXN), GOLD ($14,400 MXN), PLATINUM ($18,000 MXN), BLACK ($33,300 MXN), DIAMOND ($36,000 MXN), STAGE ($45,000 MXN) — todos "Spring Sounds"
- tipo 3: LOCALES - RESIDENTS ($700 MXN)

**VAGALUME (sucursal 38):**
- tipo 1: GENERAL ACCESS Early Bird ($550 MXN), First Release ($800 MXN), Second Release ($1,100 MXN), Final Release ($1,400 MXN)
- tipo 2: Daytime LOUNGE CHAIR ($3,450 MXN), Daytime BED ($23,000 MXN), PINK Nighttime Restaurant ($6,900 MXN), WHITE Nighttime Party ($23,000 MXN)

---

## Esquema completo (árboles)

### Venue (info/venues)

```
Array<Venue>
└── {
    "nombre": string,
    "row_id": number,
    "logo": string | null,
    "metadata_contenido": [                     // Array[4]
      {
        "idioma": string,
        "idioma_abrev": "es" | "en" | "pt" | "fr",
        "seo": {
          "titulo": string,
          "descripcion": string,
          "keywords": string
        },
        "textos": {
          "titulo_disponibilidad": string | null,
          "descripcion_corta": string,            // HTML
          "descripcion_larga": string             // HTML
        }
      }
    ],
    "multimedia": {
      "imagen_portada": string | null,
      "video_portada": string | null,
      "carrusel": [ string | null, ... ],
      "hero_video": string | null,
      "hero_imagen": string | null
    },
    "localizacion": {
      "imagen_mapa_estatica": string | null,
      "iframe_google_maps": string | null,        // HTML <iframe>
      "link_google_maps": string | null,
      "link_360": string | null
    },
    "enlaces_adicionales": {
      "link_menu": string | null,
      "redes_sociales": {
        "facebook": string | null,
        "instagram": string | null,
        "tiktok": string | null,
        "whatsapp": string | null
      }
    },
    "eventos": [ ...Array<Evento> ]
  }
```

### Evento (dentro de venue.eventos[])

```
{
  "configuracion_general": {
    "nombre_evento": string,
    "nombre_corto": string,
    "orden_prioridad": number,
    "id_evento_externo": number,
    "url_externo": string | null,
    "estatus": string
  },
  "logistica": {
    "fecha_inicio": string,                       // ISO 8601 "YYYY-MM-DDTHH:mm:ss.sssZ"
    "fecha_fin": string,                          // ISO 8601
    "hora_inicio": string,                        // "HH:mm:ss"
    "hora_fin": string,
    "inicio_venta": string | null,
    "fin_venta": string | null,
    "apertura_puertas": string,
    "cierre_puertas": string
  },
  "contenido_idiomas": [                          // Array[4]
    {
      "idioma_abrev": "es" | "en" | "pt" | "fr",
      "url": string,                              // URL directa al evento
      "seo": {
        "titulo": string,
        "descripcion": string,
        "keywords": string
      },
      "textos": {
        "descripcion_larga_1": string | null,     // HTML
        "descripcion_larga_2": string | null      // HTML
      }
    }
  ],
  "multimedia": {
    "galeria": [ string, ... ],
    "mapa_evento": string | null,
    "video_portada_url": string | null,
    "slider_banners": {
      "desktop": string,
      "mobile": string
    } | null
  }
}
```

### Producto (productos/fecha)

```
{
  "nombre": string,
  "tipo_prd": number,                             // 1=acceso, 2=mesa/VIP, 3=local, 4=paquete
  "pax_incluidos": number,
  "pax_maximos": number,
  "precio": number,
  "moneda": "USD" | "MXN",
  "producto_id": number,
  "descripcion_es": string,                       // HTML
  "descripcion_en": string,                       // HTML
  "descripcion_pt": string,                       // HTML
  "descripcion_fr": string                        // HTML
}
```

### Health (/health)

```
{
  "status": string,                               // "ok"
  "timestamp": string                             // ISO 8601
}
```

---

## Errores y códigos HTTP

### Estructura de errores

La API usa **tres formatos de error** diferentes según el endpoint:

**Formato 1 — Autenticación y rutas (todos los endpoints):**

```json
{
  "success": false,
  "error": "Missing x-api-key header"
}
```

**Formato 2 — Endpoints de ventas y productos:**

```json
{
  "success": false,
  "error": "Mensaje descriptivo del error"
}
```

**Formato 3 — Endpoint orders/by-id:**

```json
{
  "estatus": "error",
  "mensaje": "ID inválido"
}
```

### Códigos HTTP

- **`200`** — Éxito. Si no hay resultados, devuelve `[]`.
- **`400`** — Parámetros faltantes o inválidos.
  - Ventas sin sucursal/fecha: `"Se requiere la sucursal y la fecha de venta."`
  - Sucursal sin fecha: `"Se requiere sucursal y fecha."`
  - Productos sin params: `"Se requiere sucursal y fecha (YYYY-MM-DD)."`
  - Order by-id sin id: `"El ID es requerido"`
  - Order by-id con id tipo numérico en POST: `"ID inválido"`
- **`401`** — Error de autenticación.
  - Sin header `x-api-key`: `"Missing x-api-key header"`
  - API key inválida: `"Invalid API key"`
- **`404`** — Ruta no encontrada: `"Not found"`. Se devuelve si el endpoint no existe o se omite el prefijo `/v1`.
- **`500`** — Error interno del servidor. Causas comunes:
  - Pasar el nombre del venue en lugar del ID numérico en `sucursal` (ej. `MANDALA` en vez de `1`).
  - Consultar un venue que no existe.
  - Consultar un venue en una fecha donde no tiene configuración.

### Tabla de errores conocidos por endpoint

- `/v1/ventas/agrupadas` sin params → `400: "Se requiere la sucursal y la fecha de venta."`
- `/v1/ventas/agrupadas?sucursal=MANDALA&fecha=...` → `500: "Error al obtener ventas agrupadas"`
- `/v1/ventas/sucursal` sin params → `400: "Se requiere sucursal y fecha."`
- `/v1/ventas/sucursal?sucursal=MANDALA&fecha=...` → `500: "Error al obtener ventas por sucursal"`
- `/v1/productos/fecha` sin params → `400: "Se requiere sucursal y fecha (YYYY-MM-DD)."`
- `/v1/productos/fecha?sucursal=MANDALA&fecha=...` → `500: "Error al obtener productos por sucursal y fecha"`
- `/v1/orders/by-id` sin id → `400: {"estatus": "error", "mensaje": "El ID es requerido"}`
- `/v1/orders/by-id` con ID numérico → `200: []` (no encuentra)
- `POST /v1/orders/by-id` con `{"id": 190149}` (número) → `400: "ID inválido"`

---

## Diferencias con la API de contenido legacy

Existen **dos APIs** en el ecosistema MandalaTickets:

### API v2 (este documento)

- **Base URL:** `https://api.mandalatickets.com/v1/`
- **Auth:** Header `x-api-key`
- **Funcionalidad:** Venues, eventos, órdenes, ventas, productos, health
- **Fechas en eventos:** ISO 8601 (`"2026-03-28T06:00:00.000Z"`)
- **`id_evento_externo`:** `number` (0 si no tiene)
- **`inicio_venta` / `fin_venta`:** `null` si no definido
- **`row_id` en venues:** `number`

### API de contenido legacy

- **Base URL:** `https://mandalatickets.com/api/info_venues/X-API-KEY/{API_KEY}`
- **Auth:** API key en la URL path
- **Funcionalidad:** Solo venues y eventos (contenido, SEO, multimedia)
- **Fechas en eventos:** `"YYYY-MM-DD"`
- **`id_evento_externo`:** `string|null`
- **`inicio_venta` / `fin_venta`:** `"0000-00-00 00:00:00"` si no definido
- **`row_id` en venues:** `string`
- **Venues devueltos:** MANDALA BEACH DAY (3), MANDALA BEACH NIGHT (4), DCAVE (6), BONBONNIERE (37), VAGALUME (38), SRA TANAKA (54), HOUDINNI (55) — 7 venues
- **Documentación:** `README-API-MT-CONTENT.md`

### Diferencias clave

- La API v2 devuelve `row_id` como `number`, la legacy como `string`.
- La API v2 usa `null` para campos no definidos; la legacy usa `"0000-00-00"` y `"0000-00-00 00:00:00"`.
- La API v2 usa ISO 8601 para fechas de eventos; la legacy usa `YYYY-MM-DD`.
- El set de venues puede diferir entre APIs. La v2 incluye RAKATA (32) pero puede no incluir MB DAY (3) / MB NIGHT (4) si no tienen eventos configurados.
- La API v2 tiene endpoints de órdenes, ventas y productos que la legacy no tiene.
- Ambas APIs usan API keys diferentes.

---

## Medidas y aspect ratios de multimedia

### Multimedia del venue

- **`imagen_portada`** — 1200 x 630 px (~1.9:1, estilo Open Graph). Excepción: D'Cave usa 4000x1120 (~3.57:1), Houdinni usa 1920x1080 (16:9).
- **`hero_imagen`** — 1200 x 630 px (~1.9:1). Misma medida que portada.
- **`carrusel`** — Variable. 1080x1080 (1:1) o ~1500x1000 (3:2).
- **`video_portada`** — No se usa (siempre `null`).
- **`hero_video`** — No se usa (siempre `null`).

### Multimedia del evento

- **`galeria`** — 1000 x 1000 px (1:1, cuadrado).
- **`mapa_evento`** — 1000 x 1000 px (1:1, cuadrado).
- **`slider_banners.desktop`** — 4000 x 1200 px (10:3, ~3.33:1, ultra-ancho).
- **`slider_banners.mobile`** — 1080 x 580 px (54:29, ~1.86:1).
- **`video_portada_url`** — No se usa (siempre `null`).

### Resumen rápido

```
VENUE
  imagen_portada / hero_imagen  →  1200 x 630 px   →  ~1.9:1
  carrusel (productos)          →  1:1 o 3:2

EVENTO
  galeria                       →  1000 x 1000 px   →  1:1
  mapa_evento                   →  1000 x 1000 px   →  1:1
  slider_banners.desktop        →  4000 x 1200 px   →  10:3
  slider_banners.mobile         →  1080 x 580 px    →  ~1.86:1
```

---

## Recursos estáticos y rutas base

- **Portadas/thumbnails de venues:** `https://mandalatickets.com/assets/uploads/discos/`
- **Imágenes de productos:** `https://mandalatickets.com/assets/uploads/productos/`
- **Imágenes de eventos (galería):** `https://mandalatickets.com/assets/uploads/eventos/`
- **Mapas de eventos:** `https://mandalatickets.com/assets/uploads/eventos_mapas/`
- **Banners slider:** `https://mandalatickets.com/assets/uploads/eventos_slider/`
- **Mapas estáticos de venues:** `https://mandalatickets.com/assets/img/mapa/`
- **Menús digitales:** `https://mandalagroup.menu/`
- **Tours 360°:** `https://panoraven.com/es/embed/`
- **Cupones/QR de órdenes:** `https://mandalatickets.com/coupon/MT-XXXXXX`
- **PDFs de órdenes:** `https://mandalatickets.com/pdf/MT-XXXXXX`

### Menús digitales por venue

- **Mandala Beach Day:** `https://mandalagroup.menu/cancun/mandala-beach`
- **Mandala Beach Night:** `https://mandalagroup.menu/cancun/mandala-beach-night/`
- **D'Cave:** `https://mandalagroup.menu/cancun/dcave`
- **Bonbonniere:** `https://mandalagroup.menu/tulum/bonbonniere`
- **Vagalume:** `https://mandalagroup.menu/tulum/vagalume/`
- **Sra Tanaka:** `null` (no disponible)
- **Houdinni:** `https://mandalagroup.menu/es/houdinni`

---

## Ejemplos de código

Fragmentos tomados de `README-API-MT-v250326.md` — sección **Ejemplos de código**, acotados a venues, productos y health.

### cURL — Productos disponibles

```bash
# Productos de VAGALUME para el 28 de marzo
curl -s "https://api.mandalatickets.com/v1/productos/fecha?sucursal=38&fecha=2026-03-28" \
  -H "x-api-key: $MT_NEW_API_KEY" | jq .
```

### cURL — Health check

```bash
curl -s "https://api.mandalatickets.com/health" | jq .
```

### JavaScript (fetch) — funciones útiles

```javascript
const API_KEY = process.env.MT_NEW_API_KEY;
const BASE = 'https://api.mandalatickets.com/v1';
const headers = { 'x-api-key': API_KEY };

// Productos disponibles
async function getProductos(sucursal, fecha) {
  const params = new URLSearchParams({ sucursal, fecha });
  const res = await fetch(`${BASE}/productos/fecha?${params}`, { headers });
  return res.json();
}

// Venues con eventos
async function getVenues() {
  const res = await fetch(`${BASE}/info/venues`, { headers });
  return res.json();
}

// Health check (no requiere auth)
async function checkHealth() {
  const res = await fetch('https://api.mandalatickets.com/health');
  return res.json();
}
```

### Python (requests) — venues, productos, health

```python
import requests
import os

API_KEY = os.environ.get("MT_NEW_API_KEY")
BASE = "https://api.mandalatickets.com/v1"
HEADERS = {"x-api-key": API_KEY}

# Venue IDs — Catálogo completo
VENUES = {
    # Cancún (CUN)
    "MANDALA_CUN": 1,
    "MANDALA_BEACH_DAY": 3,
    "MANDALA_BEACH_NIGHT": 4,
    "DCAVE": 6,
    "SENOR_FROGS_CUN": 7,
    "LA_VAQUITA_CUN": 9,
    "RAKATA_CUN": 32,
    "HOUSE_OF_FIESTA": 53,
    "RESET_HROOF_DCAVE": 60,
    # Playa del Carmen (PDC)
    "MANDALA_PDC": 10,
    "LA_VAQUITA_PDC": 12,
    "SANTITO_TUN_TUN": 29,
    # Puerto Vallarta (PVR)
    "MANDALA_PVR": 14,
    "LA_SANTA": 15,
    "LA_VAQUITA_PVR": 16,
    "SENOR_FROGS_RESTAURANT_PVR": 24,
    "CHICABAL_SUNSET_CLUB": 27,
    "MITA_SOUNDS": 33,
    "RAKATA_PVR": 39,
    # Los Cabos (CAB)
    "MANDALA_CAB": 18,
    "LA_VAQUITA_CAB": 20,
    # Tulum (TUL)
    "BONBONNIERE": 37,
    "VAGALUME": 38,
    # Guadalajara (GDL)
    "SRA_TANAKA": 54,
    # Madrid (MAD)
    "HOUDINNI": 55,
    "SALA_DE_DESPECHO": 56,
}

def get_productos(sucursal, fecha):
    r = requests.get(f"{BASE}/productos/fecha", headers=HEADERS, params={"sucursal": sucursal, "fecha": fecha})
    return r.json()

def get_venues():
    r = requests.get(f"{BASE}/info/venues", headers=HEADERS)
    return r.json()

def check_health():
    r = requests.get("https://api.mandalatickets.com/health")
    return r.json()
```

---

## Notas técnicas (filtradas)

Subconjunto de **Notas técnicas** del documento maestro que aplica a `/v1/info/venues`, `/v1/productos/fecha` y `/health`. El numerado original se conserva.

1. **Seguridad:** La API key no debe exponerse en frontend. Usar exclusivamente desde backend o serverless functions. La key va en el header `x-api-key`, no en la URL.

2. **Caché:** El endpoint `/v1/info/venues` es pesado (~400 KB+). Implementar caché servidor-lado con TTL de 5-15 minutos. Los endpoints de órdenes y ventas son más ligeros y pueden consultarse sin caché.

3. **Sucursal = ID numérico:** El parámetro `sucursal` en ventas y productos **siempre es el ID numérico** del venue (ej. `1`, `6`, `38`). Pasar el nombre del venue (ej. `"MANDALA"`) causa un error 500.

5. **HTML en textos:** Los campos `descripcion_corta`, `descripcion_larga`, `descripcion_larga_1` y `descripcion_larga_2` contienen HTML crudo. Sanitizar antes de renderizar para prevenir XSS (`DOMPurify` en JS, `bleach` en Python, `htmlspecialchars` en PHP).

6. **Horarios reales:** En la mayoría de eventos, `hora_inicio`, `hora_fin`, `apertura_puertas` y `cierre_puertas` vienen como `"00:00:00"` (no definidos). Los horarios reales están dentro del HTML de `descripcion_larga_1` o `descripcion_larga_2`.

13. **URLs de eventos:** Cada `contenido_idiomas[]` incluye un campo `url` con el link directo a la página del evento en mandalatickets.com, localizado por idioma. Usar este campo en lugar de construir URLs manualmente.

14. **URLs con espacios en multimedia:** Algunos nombres de archivo de multimedia contienen espacios y paréntesis (ej. `"Mesa de trabajo 1 (1).jpg"`). Las URLs ya vienen completas desde la API, pero si se reconstruyen manualmente, aplicar `encodeURIComponent()` / `urllib.parse.quote()`.

15. **Carrusel con nulls:** Algunos venues tienen su `carrusel` como `[null, null, null]`. Filtrar nulls antes de renderizar.

16. **`descripcion_larga_2`:** No ignorar este campo. Contiene información complementaria importante: line-ups, precios de boletos, dress code, políticas de check-in. Puede contener el contenido principal cuando `descripcion_larga_1` es solo un título.

17. **Orden de eventos:** Usar `orden_prioridad` para ordenar eventos. El array no viene pre-ordenado. Mayor prioridad = mostrar primero.

18. **Iframe de Google Maps:** El campo `iframe_google_maps` es HTML completo con `width="600"`, `height="450"`, `allowfullscreen`, `loading="lazy"`. Listo para insertar. Ajustar dimensiones con CSS.

19. **WhatsApp:** Los links incluyen número de teléfono (`525649802193`) y texto prellenado con el nombre del venue. Formato: `https://api.whatsapp.com/send?phone=...&text=...`

22. **Venues internacionales:** Houdinni y Sala de Despecho están en Madrid, España. Considerar zona horaria (CET/CEST) al mostrar horarios. Los venues de México están en varias zonas horarias: Cancún/PDC/Tulum (EST, UTC-5), PVR/GDL (CST, UTC-6), Los Cabos (MST, UTC-7).

24. **Marcas multi-ciudad:** MANDALA tiene 4 venues (IDs 1, 10, 14, 18), LA VAQUITA tiene 4 (IDs 9, 12, 16, 20), RAKATA tiene 2 (IDs 32, 39), SEÑOR FROGS tiene 2 (IDs 7, 24). Mismo nombre, diferente ID y ciudad. Siempre filtrar por `venue_id`, no por nombre de `venue`.

25. **Productos varían por fecha:** Los productos que devuelve `/v1/productos/fecha` y `/v1/ventas/sucursal` cambian según la fecha consultada. Por ejemplo, un venue puede tener productos "Spring Sounds" en marzo pero productos regulares en otras fechas. No asumir un catálogo estático.

26. **Venues sin contenido:** Muchos venues que existen en el sistema de órdenes/ventas (ej. SEÑOR FROGS, LA VAQUITA, LA SANTA, CHICABAL) **no aparecen en `/v1/info/venues`** porque no tienen contenido/eventos configurados en el CMS. Esto no afecta su operación en órdenes y ventas.

30. **Health check:** El endpoint `/health` no requiere autenticación ni prefijo `/v1`. Útil para monitoreo y uptime checks.

33. **Descripciones multilenguaje en productos:** El endpoint `/v1/productos/fecha` ahora incluye `descripcion_es`, `descripcion_en`, `descripcion_pt`, `descripcion_fr` con HTML detallado. Contiene precios online vs puerta, horario límite de check-in, qué incluye/no incluye, y políticas. Sanitizar antes de renderizar (misma precaución que con textos de venues/eventos).

---

## Changelog — Extracto relevante para este readme

Tomado de **Changelog — Cambios respecto a v032026** en `README-API-MT-v250326.md` (solo puntos que afectan venues, productos o health).

### Nuevo endpoint: `/health`

Health check sin autenticación. Retorna `{"status": "ok", "timestamp": "..."}`.

### Mensaje de error actualizado en `/v1/productos/fecha`

- Antes: `"Se requiere sucursal y fecha."`
- Ahora: `"Se requiere sucursal y fecha (YYYY-MM-DD)."`

### Descripciones multilenguaje en `/v1/productos/fecha` (posterior ~25 marzo)

4 campos nuevos: `descripcion_es`, `descripcion_en`, `descripcion_pt`, `descripcion_fr`. HTML con precios online/puerta, horarios de check-in, inclusiones, restricciones y políticas.

### `/v1/info/venues` — nuevo venue

MANDALA BEACH DAY (ID: 3) ahora aparece en la respuesta de venues (antes solo estaban 6 venues, ahora son 7).

---

*Documento derivado exclusivamente de `README-API-MT-v250326.md`. Cualquier discrepancia debe resolverse contra el README maestro.*
