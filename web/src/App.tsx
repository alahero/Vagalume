import Hero3DPage from "./Hero3DPage";

/**
 * Placeholder mínimo: el diseño de producción vive en Stitch; aquí solo mantenemos el shell Vite/React.
 * Prueba del hero 3D: abre `/?hero3d=1`
 */
export default function App() {
  const showHero3d =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("hero3d");

  if (showHero3d) {
    return <Hero3DPage />;
  }

  return (
    <main className="vl-shell">
      <p className="vl-shell__eyebrow">Tulum, Mexico</p>
      <h1 className="vl-shell__title">Vagalume</h1>
      <p className="vl-shell__body">
        Marketing site shell — implement the approved Stitch mockup here when you are ready to ship.
      </p>
      <p className="vl-shell__body vl-shell__hint">
        <a href="/?hero3d=1">Ver vista previa del hero 3D (logo + luz dorada)</a>
      </p>
    </main>
  );
}
