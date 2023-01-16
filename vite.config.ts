import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import linaria from '@linaria/vite';
import dts from 'vite-plugin-dts';



// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    react(),
    linaria(),
    dts(),
  ],

  assetsInclude: [
    '**/*.gltf',
    '**/*.glb',
  ],
});
