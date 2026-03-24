import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite para desarrollo y build del sitio Vagalume
export default defineConfig({
  plugins: [react()],
});
