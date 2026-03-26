/**
 * Construye URL pública segura para archivos en `public/` (codifica cada segmento).
 */
export function publicUrl(...pathSegments: string[]): string {
  return (
    "/" +
    pathSegments
      .join("/")
      .split("/")
      .filter(Boolean)
      .map((seg) => encodeURIComponent(seg))
      .join("/")
  );
}
