import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Pour les plugins Club GSAP (SplitText, DrawSVG, etc.) si utilisés
    "process.env": {},
    global: {},
  },
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'gsap/Flip'], // Inclure Flip
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});