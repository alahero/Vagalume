import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * Plano con textura del wordmark; responde a luces (metal + rugosidad suaves).
 */
function LogoMesh() {
  const map = useTexture("/media/logo.png");
  map.colorSpace = THREE.SRGBColorSpace;

  const { width, height } = useMemo(() => {
    const img = map.image as HTMLImageElement;
    const w = img.naturalWidth || img.width || 1;
    const h = img.naturalHeight || img.height || 1;
    const maxW = 3.45;
    return { width: maxW, height: maxW * (h / w) };
  }, [map]);

  return (
    <mesh position={[0, 0.62, 0]}>
      <planeGeometry args={[width, height]} />
      <meshPhysicalMaterial
        map={map}
        transparent
        alphaTest={0.08}
        metalness={0.82}
        roughness={0.38}
        clearcoat={0.35}
        clearcoatRoughness={0.4}
        emissive="#2a1f12"
        emissiveIntensity={0.12}
        toneMapped
      />
    </mesh>
  );
}

/**
 * Luz cálida principal que sigue al puntero (con suavizado) + rellenos tenues.
 */
function GoldenFollowLight() {
  const mainRef = useRef<THREE.PointLight>(null);
  const goal = useRef(new THREE.Vector3(3, 2, 5.5));

  useFrame((state) => {
    const { pointer } = state;
    goal.current.set(pointer.x * 8, pointer.y * 5, 5.8);
    mainRef.current?.position.lerp(goal.current, 0.11);
  });

  return (
    <>
      <pointLight
        ref={mainRef}
        position={[3, 2, 5.5]}
        intensity={95}
        distance={28}
        decay={2}
        color="#ffcc80"
      />
      {/* Contraluz tierra para volumen en bordes del logo */}
      <pointLight
        position={[-5, -3, 4]}
        intensity={28}
        distance={30}
        decay={2}
        color="#8b6239"
      />
      <ambientLight intensity={0.06} color="#d4b896" />
    </>
  );
}

function Backdrop() {
  return (
    <mesh position={[0, 0, -1.2]} renderOrder={-1}>
      <planeGeometry args={[24, 14]} />
      <meshBasicMaterial color="#060504" toneMapped={false} />
    </mesh>
  );
}

/**
 * Hero a pantalla completa: canvas 3D con logo iluminado por luz dorada que sigue al mouse.
 */
export default function Hero3DPage() {
  return (
    <div className="hero-3d">
      <Canvas
        id="canvas3d"
        style={{ display: "block", width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9.2], fov: 40, near: 0.1, far: 50 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0908"]} />
        <Backdrop />
        <GoldenFollowLight />
        <Suspense fallback={null}>
          <LogoMesh />
        </Suspense>
      </Canvas>
      <header className="hero-3d__chrome">
        <p className="hero-3d__label">Vista previa — hero 3D</p>
        <a className="hero-3d__link" href="/">
          Volver al inicio
        </a>
      </header>
    </div>
  );
}
