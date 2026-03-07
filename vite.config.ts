import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: false }]],
      },
    }),
    tailwindcss(),
  ],

  server: {
    historyApiFallback: true,
  },

  preview: {
    historyApiFallback: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',

    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd'],
          vendor: ['zustand', 'react-dnd'],
        },
      },
    },
  },

  esbuild: {
    drop: ['console', 'debugger'],
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'antd'],
  },
});
