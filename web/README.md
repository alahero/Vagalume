# Vagalume — sitio web (React + Vite)

Shell mínimo listo para integrar el mockup aprobado en **Google Stitch**. El layout exportado desde Paper ya no está en este repo.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

- **UI actual:** `src/App.tsx` + `src/index.css` (placeholder con tokens de marca).
- **Mockup Stitch (fuente principal en repo):** `Assets/stitch-export/` — `code.html`, `screen.png`, `DESIGN.md`. Si falta la carpeta, descomprime `Assets/stitch_vagalume_beach_club_tulum.zip` ahí (`Expand-Archive` en PowerShell o tu herramienta habitual).
- **Deploy (Vite):** El build copia `Assets/stitch-export` a `dist/stitch-export` vía plugin en `vite.config.ts`. En producción usa **`/stitch-export/code.html`** o **`/stitch-export/`** (redirige a `code.html`).
- **Vercel:** Deja **Root Directory vacío** (raíz del repositorio, no `web`). El [`vercel.json`](../vercel.json) en la raíz ejecuta `npm ci --prefix web`, `npm run build --prefix web` y publica **`web/dist`**. Si en el dashboard pusiste **Root Directory = `web`**, borra ese valor o, si lo mantienes, pon **Output Directory = `dist`** (nunca `web/dist`) y no dependas del `vercel.json` de la raíz. Un **404** con deploy “Ready” casi siempre es **Output Directory** mal puesto o build que no generó `index.html` en la carpeta publicada.
- **Stitch vía API (opcional):** `npm run stitch:vagalume`, `npm run stitch:list-screens`, `npm run stitch:download-screen` con `STITCH_API_KEY` en `.env.stitch` — solo si necesitas regenerar o bajar otra pantalla desde el servicio.

## Próximo paso (3D)

Cuando el landing esté integrado, instala `@react-three/fiber` y `@react-three/drei` y monta un `<Canvas>` donde corresponda en la composición.
