/**
 * Copia Assets/stitch-export → web/dist/stitch-export tras el build de Vite.
 * Así el mockup estático queda en /stitch-export/code.html en el deploy.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const distDir = path.join(webRoot, "dist");
const srcDir = path.join(webRoot, "..", "Assets", "stitch-export");
const destDir = path.join(distDir, "stitch-export");

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

if (!fs.existsSync(distDir)) {
  console.error("copy-stitch-export: no existe dist/; corre vite build antes.");
  process.exit(1);
}

if (!fs.existsSync(srcDir)) {
  console.warn("copy-stitch-export: omitido, no hay carpeta:", srcDir);
  process.exit(0);
}

fs.rmSync(destDir, { recursive: true, force: true });
copyRecursive(srcDir, destDir);
console.log("copy-stitch-export: listo →", destDir);
