import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite copia `public/` a `dist/` automáticamente; ya no enlazamos HTML de Stitch al build.
export default defineConfig({
  plugins: [react()],
  server: {
    // En Windows, `localhost` a veces no coincide con la interfaz que usa Vite; `true` escucha en todas.
    host: true,
    port: 5173,
    strictPort: false,
  },
});
