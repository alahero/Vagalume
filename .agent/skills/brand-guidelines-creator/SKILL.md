---
name: brand-guidelines-creator
description: Use when the user asks to analyze a brandbook PDF, Instagram export, or Coming Soon website files to generate brand guidelines. This skill extracts tone of voice, communication style, color palette, typography, visual effects, and reusable web guidance from local source assets.
---

# Mission Statement

Generate a source-backed brand guideline from local files and produce reusable outputs that guide future website sections.

## Step-by-Step Instructions

1. Identify source paths.
   - Ask for the exact workspace paths of the brandbook PDF, Instagram export, and Coming Soon files.
   - Confirm that all sources are local and readable.

2. Build a source inventory.
   - Record source type, path, and capture date.
   - Prioritize sources in this order: brandbook, official website files, social content.

3. Extract factual brand signals.
   - Parse textual guidance from the PDF.
   - Inspect CSS and assets from Coming Soon files.
   - Sample captions and visuals from Instagram exports.
   - Separate observed facts from interpretation.

4. Resolve conflicts with explicit precedence.
   - Prefer brandbook definitions over website implementation details.
   - Prefer website implementation details over social media style drift.
   - Flag unresolved conflicts instead of guessing.

5. Generate guideline outputs.
   - Write tone of voice principles.
   - Write communication style patterns.
   - Define color palette tokens with HEX values.
   - Define typography system with fallback fonts.
   - Define visual effects and interaction style.
   - Define do and do-not examples for copy and UI.

6. Package for reuse.
   - Produce compact guidance suitable for an on-demand skill.
   - Keep root summaries concise and move larger details to references.

7. Validate before delivery.
   - Verify every key claim against at least one source.
   - Mark unsupported claims as pending data.

## Output Format

Return results in this structure:

1. Source Inventory
2. Brand Core Summary
3. Tone Of Voice
4. Communication Style
5. Color Palette Tokens
6. Typography System
7. Visual Effects And Motion
8. UI/CX Patterns For Web Sections
9. Do / Do-Not Examples
10. Open Questions

## Examples

Example prompt 1:
"Analyze these files and generate Fenomeno brand guidelines for website implementation."

Expected action:
- Run the full extraction workflow.
- Return the 10-section output.
- Flag missing data explicitly.

Example prompt 2:
"Update the brand palette using the new Coming Soon assets and keep tone rules unchanged."

Expected action:
- Re-run only source inventory, extraction, conflict resolution, and output sections tied to color/effects.
- Preserve unchanged sections and report diffs.

## Error Handling

- Stop and request path clarification if any source path is missing.
- Continue with partial analysis if one source is unreadable, then label confidence by section.
- Avoid fabricating values when extraction fails.
