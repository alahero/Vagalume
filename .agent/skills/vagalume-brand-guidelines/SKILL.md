---
name: vagalume-brand-guidelines
description: Use when implementing Vagalume (beach club, Tulum) marketing site sections, copy, layout, tokens, or UI decisions. Enforces the official brand manual distilled in Brandbook.md; typography licenses are handled separately by the team.
---

# Guía rápida — Vagalume

## Fuente de verdad

1. Leer y seguir **`Brandbook.md`** en la raíz del repositorio (transcripción completa del manual PNG en `PDF to PNG/1x/`).
2. Para patrones de código en el proyecto React/Vite, alinear también con `@.agent/rules/web-implementation.md` cuando aplique.

## Checklist de implementación

### Color

- Tokens HEX canónicos: `--vl-earth` `#6D4B27`, `--vl-sand` `#FAF9D6`, `--vl-burgundy` `#331515`, `--vl-forest` `#0A4008` (lámina 34 del manual).
- Proporción orientativa: 40% tierra, 30% arena, 20% borgoña, 10% verde (lámina 35); el verde apoya **hover** y acentos sutiles.
- Modo oscuro frecuente en manual: fondo carbón + texto champagne/crema; líneas `1px`.
- Las láminas 26–28 pueden verse distintas por **textura**; los HEX siguen siendo los de p.34.

### Tipografía

- **Calvino:** display, wordmark, editorial (Thin, Light, Bold). **Licencia:** la gestiona el equipo.
- **Avenir Next:** UI y cuerpo estilo manual (Ultra Light, Regular, Bold). «GASTRONOMIC & DRINKS» = **Avenir Next Regular** (aspecto stencil es de diseño, no otra familia obligatoria).
- Titulares tipo manual: mayúsculas, peso fino, **tracking amplio**. Wordmark VAGALUME: serif, mayúsculas, tracking generoso.

### Trazos, radios y layout

- Divisores y marcos: **hairline `1px`**.
- **Dos modos de radio:** (1) editorial/cuadrícula → **0** o casi 0; (2) storytelling → tarjetas **24–48px** (responsive con `clamp`), paneles enmarcados **~40–60px**, pills **9999px**, cajas textura **~16–24px**.
- Isotipo en **círculo**; anillo con **corte inferior** para el glow de la luciérnaga.
- Logo responsive: ~700px stack, ~500px horizontal, ~250px solo wordmark, ~100px solo isotipo (lámina 33).
- **Área de respeto 1X:** el valor en px lo define el equipo manualmente.

### Tono y copy

- **Inglés**; segunda y tercera persona; calmado, culto, invitador; místico sin condescender.
- CTAs/copies de referencia en `Brandbook.md` (corregir «COMMING» → COMING SOON en producción).

### Imagen y redes

- Regla B&W y «no celulares» en toma: pensada sobre todo para **fotos de redes**; web puede alinearse al espíritu sin dogmatismo absoluto salvo directriz nueva.

### Qué evitar

- Bordes gruesos; radio «medio genérico» en todo el sitio.
- Submarcas (Sessions, Sundaze, Disorder) al mismo nivel que la marca principal sin contexto.
- Lujo vacío «glitzy»; priorizar **autenticidad** y narrativa (lugar, textura, comunidad).

## Si falta dato

- No inventar valores que contradigan `Brandbook.md`.
- Marcar en código o en tareas lo pendiente (p. ej. tokens finales tras compra de fuentes).
