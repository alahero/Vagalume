import { Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Hero3DPage from "./Hero3DPage";
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";

/**
 * Rutas del sitio marketing; `?hero3d=1` conserva la vista previa del hero 3D a pantalla completa.
 * La query se lee con `window` (SPA sin SSR) para evitar condiciones de carrera con el router.
 */
export default function App() {
  const showHero3d =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("hero3d");

  if (showHero3d) {
    return <Hero3DPage />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SiteLayout navVariant="home">
            <HomePage />
          </SiteLayout>
        }
      />
      <Route
        path="/events"
        element={
          <SiteLayout navVariant="events">
            <EventsPage />
          </SiteLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
