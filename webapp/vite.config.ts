import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: { target: 'esnext' },
    exclude: ['snarkjs'],
  },
  plugins: [
    react(),
    nodePolyfills({
          globals: {
            Buffer: true
          },
        }),
  ],
})
