import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Vite copia `public/` a `dist/` automáticamente; ya no enlazamos HTML de Stitch al build.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiProxy = env.VITE_API_PROXY_TARGET || "http://127.0.0.1:3000";

  return {
    plugins: [react()],
    server: {
      // En Windows, `localhost` a veces no coincide con la interfaz que usa Vite; `true` escucha en todas.
      host: true,
      port: 5173,
      strictPort: false,
      // Redirige /api/* a `vercel dev` (p. ej. puerto 3000) para probar mt-venues en local.
      proxy: {
        "/api": {
          target: apiProxy,
          changeOrigin: true,
        },
      },
    },
  };
});
