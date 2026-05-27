import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/components/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
});
