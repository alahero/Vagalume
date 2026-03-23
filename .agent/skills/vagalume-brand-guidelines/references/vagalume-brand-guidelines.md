# Vagalume Brand Guidelines (Source-Backed Draft)

## 1) Source Inventory

| Source | Type | Path | Status | Notes |
|---|---|---|---|---|
| Vagalume Brandbook | PDF | `PDF/VAGALUME BRANDBOOK.pdf` | Partial | PDF text extraction returned no readable text (45 pages detected). Visual/text details remain pending OCR/manual review. |
| Instagram Image 1 | JPG | `IG/484153552_1161906075393764_5021935769350005949_n.jpg` | Read | Firefly mark on iridescent background. |
| Instagram Image 2 | JPG | `IG/642644872_18080771177597939_2767363577944689543_n..jpg` | Read | Crowd photo, red neon signage and warm low-light ambience. |
| Instagram Image 3 | JPG | `IG/652773252_18565362733051924_115512650858056512_n..jpg` | Read | DJ booth, amber glow, illuminated symbol backdrop. |
| Instagram Image 4 | JPG | `IG/653388705_935782885666071_6959776844944113880_n..jpg` | Read | Red neon phrase "A JOURNEY INTO HOUSE MUSIC". |
| Instagram Image 5 | JPG | `IG/655016264_18565362763051924_8923195703906024950_n..jpg` | Read | Crowd and DJ with gold/amber light and bright sign. |
| Instagram Image 6 | JPG | `IG/655027925_935783075666052_3229466332408507067_n..jpg` | Read | Dense crowd, red wash lighting, haze. |
| Instagram Image 7 | JPG | `IG/656254829_938285228749170_7894171364815953619_n..jpg` | Read | Event lineup card style with uppercase sans typography. |
| Instagram Video Set | MP4 | `IG/*.mp4` (7 files) | Pending | Direct file reader cannot parse video binary. |

Source precedence applied: Brandbook > Website implementation (not available) > Social content.

## 2) Brand Core Summary

Vagalume presents an immersive nocturnal beach-club identity: sensual, rhythmic, and community-driven, with firefly-inspired symbolism, warm neon lighting, and house-music culture as core emotional anchors.

Confidence: **Medium** (strong social evidence, brandbook text still pending).

## 3) Tone Of Voice

- Speak with magnetic confidence.
- Keep phrases short, atmospheric, and cinematic.
- Center experience and movement over product language.
- Use invitation verbs: discover, feel, enter, dance, reserve.
- Keep exclusivity warm, never cold or arrogant.

Voice spectrum:
- Primary: intimate + electric.
- Secondary: premium + effortless.
- Avoid: corporate, playful-comic, or hyper-generic nightlife cliches.

## 4) Communication Style

- Lead with mood first, logistics second.
- Place artist names and dates in clean, high-contrast blocks.
- Keep microcopy direct: "Reserve", "Join the night", "Doors open at...".
- Use sentence case for body copy and uppercase for event labels/headlines only when needed.
- Keep each section focused on one message.

## 5) Color Palette Tokens

Derived from supplied Instagram visuals. Confirm against brandbook when OCR/manual extraction is available.

- `--bg-950: #090607` (near-black base)
- `--bg-850: #1A0F10` (deep warm shadow)
- `--accent-red-600: #B51F24` (neon red energy)
- `--accent-amber-500: #D86A1F` (warm amber glow)
- `--accent-gold-400: #F2B741` (gold highlights/signage)
- `--text-050: #F3EBDD` (warm off-white)
- `--support-cyan-300: #B8E4E2` (sparingly for deck/UI light accents)

Usage ratio:
- 70% dark neutrals
- 20% warm red/amber gradients and glows
- 10% text + selective highlight accents

## 6) Typography System

Observed style: modern sans, uppercase event typography, high contrast on dark backgrounds.

Recommended web stack:
- Display/Event: `"Montserrat", "Helvetica Neue", Arial, sans-serif` (700-800)
- Body/UI: `"Inter", "Helvetica Neue", Arial, sans-serif` (400-500)

Scale:
- Hero title: 56-92px, 700-800, tight tracking (`-0.01em` to `-0.02em`)
- Section title: 32-44px, 700
- Event headliners: 28-36px, 700 uppercase
- Event metadata: 12-14px, 500 uppercase, `0.08em` tracking
- Body copy: 16-18px, 400-500, line-height 1.5-1.7
- Fine print: 13-14px, 400, high-contrast only

## 7) Visual Effects And Motion

- Use low-key backgrounds with directional warm light blooms.
- Use restrained neon glow around key calls to action and signage motifs.
- Add subtle grain/haze overlays to preserve nightlife texture.
- Use motion blur motifs in event banners and transitions.
- Animate with slow fades and slight parallax; avoid bouncy interactions.

Motion timing:
- Standard reveal: 280-420ms, ease-out.
- Ambient loops (background): 8-16s, very low amplitude.

## 8) UI/CX Patterns For Web Sections

- **Hero**: Lead with one atmospheric headline + one primary reservation CTA + one upcoming date.
- **Events**: Present date, room/series label, and artist lineup in vertically scannable rows.
- **Reservations**: Keep flow short (party size, date, contact, confirm). Use warm reassurance copy.
- **Gallery**: Use full-bleed imagery with minimal chrome; prioritize mood continuity over quantity.
- **Music/Residency**: Highlight house-music positioning with concise manifesto-style copy.
- **Contact/Location**: Keep practical details high contrast and map/action buttons prominent.

## 9) Do / Do-Not Examples

### Copy
- Do: "Enter the night. Reserve your table."
- Do: "House rituals by the sea."
- Do-Not: "Welcome to our services page."
- Do-Not: "Best club ever!!!"

### UI
- Do: Keep dark surfaces and warm highlights with high text contrast.
- Do: Use uppercase artist blocks with clear spacing.
- Do-Not: Use bright multicolor gradients that break the warm nocturnal tone.
- Do-Not: Overload pages with cards, borders, and competing shadows.

## 10) Open Questions

1. Extract brandbook text via OCR/manual pass to confirm official mission, voice, and legal logo usage rules.
2. Review MP4 videos frame-by-frame to validate motion language, pacing, and crowd/scene transitions.
3. Confirm official font family and licensed weights from brandbook.
4. Confirm exact HEX palette tokens from official file exports.
5. Confirm if firefly symbol requires fixed clearspace, minimum size, or lockup rules.
