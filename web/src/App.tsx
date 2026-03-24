import { VagalumeLandingDesktop } from './components/paper/VagalumeLandingDesktop';
import { VagalumeLandingMobile } from './components/paper/VagalumeLandingMobile';

/**
 * Muestra el layout mobile por defecto en viewport angosto y desktop en pantallas anchas.
 * Para 3D: envuelve una sección con <Canvas> de react-three/fiber sin reemplazar todo el árbol.
 */
export default function App() {
  return (
    <>
      <div className="vagalume-desktop-only">
        <VagalumeLandingDesktop />
      </div>
      <div className="vagalume-mobile-only">
        <VagalumeLandingMobile />
      </div>
    </>
  );
}
