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
- **Vercel:** En el proyecto pon **Root Directory = `web`** (el `vercel.json` de la raíz del repo se eliminó para evitar `cd web` cuando el cwd ya es `web/`). Aplica solo `web/vercel.json`. Si ves **404**, revisa que la salida sea `dist` y la URL **`/stitch-export/...`**.
- **Stitch vía API (opcional):** `npm run stitch:vagalume`, `npm run stitch:list-screens`, `npm run stitch:download-screen` con `STITCH_API_KEY` en `.env.stitch` — solo si necesitas regenerar o bajar otra pantalla desde el servicio.

## Próximo paso (3D)

Cuando el landing esté integrado, instala `@react-three/fiber` y `@react-three/drei` y monta un `<Canvas>` donde corresponda en la composición.
