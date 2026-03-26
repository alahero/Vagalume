# Vagalume — sitio web (React + Vite)

Aplicación de marketing en React. El build **no depende** de HTML exportados por Stitch; esos archivos viven en `legacy/stitch-exports/` solo como referencia.

## Comandos

Desde esta carpeta `web/`:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Desde la **raíz del repo** también puedes usar los mismos scripts (delegan a `web/`):

```bash
npm install --prefix web
npm run dev
```

## Estructura

- **`src/`** — Rutas `/` (landing) y `/events`, layout compartido (nav, sidebar, calendario FAB, footer), estilos con tokens `--vl-*` en `index.css`.
- **`public/media/`** — Logo, hero, imágenes editoriales (ritual, cuisine).
- **`public/events/`** — Posters y portadas de eventos (copiados desde `Assets/Events/`).

## Rutas

- `/` — Home completo (hero 3D, eventos, experience, playlist, cuisine, mapa).
- `/events` — Página dedicada con lineup extendido.
- `/?hero3d=1` — Vista previa a pantalla completa del hero 3D (misma escena que en el home).

## Deploy (Vercel)

En la raíz del repo, [`vercel.json`](../vercel.json) ejecuta `npm ci --prefix web`, `npm run build --prefix web` y publica **`web/dist`**. Si el dashboard usa **Root Directory = `web`**, el output debe ser **`dist`** (no `web/dist`).

## Stitch (opcional)

- Exports archivados: `legacy/stitch-exports/`.
- Scripts npm: `stitch:vagalume`, `stitch:list-screens`, `stitch:download-screen` (requieren `STITCH_API_KEY` en `.env.stitch` en la raíz del repo).
