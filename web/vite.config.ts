import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Copia Assets/stitch-export a dist/stitch-export al cerrar el bundle (fiable en Vercel). */
function stitchExportToDist() {
  return {
    name: 'stitch-export-to-dist',
    closeBundle() {
      const src = path.resolve(__dirname, '../Assets/stitch-export');
      const dest = path.resolve(__dirname, 'dist/stitch-export');
      if (!fs.existsSync(src)) {
        console.warn('stitch-export-to-dist: no existe la carpeta fuente:', src);
        return;
      }
      fs.rmSync(dest, { recursive: true, force: true });
      fs.cpSync(src, dest, { recursive: true });
      console.log('stitch-export-to-dist: copiado a', dest);
    },
  };
}

// Configuración de Vite para desarrollo y build del sitio Vagalume
export default defineConfig({
  plugins: [react(), stitchExportToDist()],
});
