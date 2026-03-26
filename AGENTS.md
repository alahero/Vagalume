# Vagalume Agent Context

Build a static website for Vagalume, a beach club in Tulum, using a brand-first workflow grounded in local source assets.

## Stack And Tooling
- Use the React + Vite app in `web/` for the marketing landing (exported from Paper, ready for future 3D via react-three/fiber).
- Use `npm` as the package manager for `web/`.
- Keep static preview available as a fallback.
- **Google Stitch MCP** (Cursor): definido en `.cursor/mcp.json`. Copia `.env.stitch.example` → `.env.stitch` en la raíz del repo y pon ahí `STITCH_API_KEY` (ese archivo está en `.gitignore`). Reinicia Cursor para cargar el servidor.

## Run Commands
- Run the Vagalume site in dev with `cd web && npm run dev`, or from repo root: `npm run dev` (script en `package.json` raíz).
- Run production build with `cd web && npm run build` and preview with `cd web && npm run preview`.
- Legacy HTML exports (solo referencia): `legacy/stitch-exports/` — sirve con `python -m http.server` desde la carpeta que contenga esos archivos si necesitas comparar visualmente; el producto es la app en `web/`.
- Run temporary test placeholder with `powershell -Command "Write-Output 'No automated tests configured yet'"`.

## Security Boundaries
- Never modify or create files in `/secrets`, `/credentials`, or any environment key-store directory.
- Never commit API keys, tokens, passwords, or raw private media exports.
- Redact personal data before moving social exports into reusable references.

## Operating Rules
- Keep root instructions concise and delegate details to rules and skills.
- Follow `@.agent/rules/web-implementation.md` for implementation patterns and quality bars.
- Trigger `@.agent/skills/brand-guidelines-creator/SKILL.md` when analyzing brandbook, Instagram exports, or Coming Soon files.
- Trigger `@.agent/skills/vagalume-brand-guidelines/SKILL.md` when implementing Vagalume sections, copy, or UI decisions.
