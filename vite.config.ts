import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'static/dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          heroui: ['@heroui/react', 'framer-motion'],
        },
      },
    },
  },
});