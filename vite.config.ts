import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { sri } from 'vite-plugin-sri3';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
  plugins: [tailwindcss(), sri()],
});
