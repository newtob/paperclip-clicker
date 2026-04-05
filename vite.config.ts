import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  esbuild: {
    target: 'esnext',
    // Prevent esbuild from reading tsconfig's ES2025 target which it doesn't support
    tsconfigRaw: {
      compilerOptions: {
        target: 'ESNext',
      },
    },
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
});
