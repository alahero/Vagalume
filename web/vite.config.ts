import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Vite copia `public/` a `dist/` automáticamente; ya no enlazamos HTML de Stitch al build.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiProxy = env.VITE_API_PROXY_TARGET || "http://127.0.0.1:3000";

  return {
    plugins: [react()],
    server: {
      // En Windows, el navegador a veces abre `localhost` por IPv6 (`::1`) y otro dev server
      // puede estar solo en IPv4: ves otro sitio en "el mismo" puerto. Usa la URL que imprime Vite
      // o http://127.0.0.1:<puerto>/ para forzar IPv4.
      host: true,
      port: 5173,
      strictPort: false,
      // Abre el navegador en la URL de *este* proyecto al hacer `npm run dev`.
      open: true,
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
