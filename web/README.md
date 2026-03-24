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
- **Stitch (generar / listar pantallas):** `npm run stitch:vagalume` y `node scripts/stitch-list-screens.mjs` (requiere `STITCH_API_KEY` y, para listar, `STITCH_PROJECT_ID`).

## Próximo paso (3D)

Cuando el landing esté integrado, instala `@react-three/fiber` y `@react-three/drei` y monta un `<Canvas>` donde corresponda en la composición.
