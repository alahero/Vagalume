/**
 * Hero 3D: logo con luz dorada que sigue al puntero (Three.js, sin React).
 * Comentarios en español de México para mantenimiento local.
 */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const hero = document.querySelector("[data-hero-3d]");
const canvas = document.getElementById("canvas3d");
if (!hero || !canvas || !(canvas instanceof HTMLCanvasElement)) {
  console.warn("hero-3d: falta [data-hero-3d] o #canvas3d");
} else {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 0, 9.2);

  const pointer = { x: 0, y: 0 };
  const goal = new THREE.Vector3(3, 2, 5.5);
  const mainLight = new THREE.PointLight(0xffcc80, 95, 28, 2);
  mainLight.position.copy(goal);
  scene.add(mainLight);

  const fillLight = new THREE.PointLight(0x8b6239, 28, 30, 2);
  fillLight.position.set(-5, -3, 4);
  scene.add(fillLight);

  scene.add(new THREE.AmbientLight(0xd4b896, 0.06));

  const loader = new THREE.TextureLoader();
  /* Ruta relativa al HTML (code.html), no al módulo */
  loader.load(
    "media/logo.png",
    (map) => {
      map.colorSpace = THREE.SRGBColorSpace;
      const img = map.image;
      const iw = img.naturalWidth || img.width || 1;
      const ih = img.naturalHeight || img.height || 1;
      /* Escala del emblema en escena (menor = logo más pequeño, menos solapamiento con el copy) */
      const maxW = 3.45;
      const h = maxW * (ih / iw);
      const geo = new THREE.PlaneGeometry(maxW, h);
      const mat = new THREE.MeshPhysicalMaterial({
        map,
        transparent: true,
        alphaTest: 0.08,
        metalness: 0.82,
        roughness: 0.38,
        clearcoat: 0.35,
        clearcoatRoughness: 0.4,
        emissive: new THREE.Color(0x2a1f12),
        emissiveIntensity: 0.12,
      });
      const mesh = new THREE.Mesh(geo, mat);
      /* Desplazamiento vertical: logo un poco arriba del centro óptico */
      mesh.position.y = 0.62;
      scene.add(mesh);
    },
    undefined,
    (err) => console.error("hero-3d: textura logo", err)
  );

  function onPointer(clientX, clientY) {
    const r = hero.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    pointer.x = ((clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((clientY - r.top) / r.height) * 2 + 1;
  }

  hero.addEventListener("pointermove", (e) => onPointer(e.clientX, e.clientY));
  hero.addEventListener("pointerdown", (e) => onPointer(e.clientX, e.clientY));

  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    if (w < 1 || h < 1) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(hero);
  resize();

  renderer.setAnimationLoop(() => {
    goal.set(pointer.x * 8, pointer.y * 5, 5.8);
    mainLight.position.lerp(goal, 0.11);
    renderer.render(scene, camera);
  });
}
