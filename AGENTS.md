# Vagalume Agent Context

Build a static website for Vagalume, a beach club in Tulum, using a brand-first workflow grounded in local source assets.

## Stack And Tooling
- Use static HTML, CSS, and JavaScript as the baseline stack until a framework is selected.
- Use `npm` as the package manager when Node-based tooling is introduced.
- Treat the repository as bootstrap mode until app files are added.

## Run Commands
- Run local preview with `python -m http.server 4173`.
- Run temporary build placeholder with `powershell -Command "Write-Output 'No build step configured yet'"`.
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
