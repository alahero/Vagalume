import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * Plano con logo; misma lógica que la vista previa pero embebido en el hero principal.
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
      <pointLight position={[-5, -3, 4]} intensity={28} distance={30} decay={2} color="#8b6239" />
      <ambientLight intensity={0.06} color="#d4b896" />
    </>
  );
}

type HeroLogoCanvasProps = {
  /** Contenedor con altura definida (el canvas llena el área). */
  className?: string;
};

/**
 * Canvas 3D del hero: logo con luz dorada que sigue al puntero.
 * Sin plano de fondo opaco: la foto del hero se ve a través del WebGL (alpha).
 */
export default function HeroLogoCanvas({ className }: HeroLogoCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        className="vl-hero__canvas"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9.2], fov: 40, near: 0.1, far: 50 }}
        dpr={[1, 2]}
        onCreated={({ gl, scene }) => {
          // Fondo transparente para no tapar la imagen detrás del canvas
          scene.background = null;
          gl.setClearColor(0x000000, 0);
        }}
      >
        <GoldenFollowLight />
        <Suspense fallback={null}>
          <LogoMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
