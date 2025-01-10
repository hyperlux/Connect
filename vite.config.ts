import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'https://auroville.social/api';

  // Explicitly define environment variables for production
  const define = {
    'process.env': {
      VITE_API_URL: JSON.stringify(apiUrl),
      VITE_FRONTEND_URL: JSON.stringify(env.VITE_FRONTEND_URL || 'https://auroville.social')
    }
  };

  return {
    base: '/',
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 5173,
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      assetsInlineLimit: 0,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      maxThreads: 1,
      minify: false,
      module: true, // Enable module handling
      rollupOptions: {
        input: {
          main: './public/index.html'
        },
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        },
        external: [
          'react',
          'react-dom',
          'react-router-dom',
          'recharts',
          'lucide-react',
          'date-fns',
          'd3',
          'lodash',
          'axios',
          'zod',
          'zustand',
          'react-transition-group',
          'react-query',
          'react-icons',
          'react-hook-form',
          'react-select',
          'react-toastify',
          'react-table'
        ],
        maxParallelFileOps: 1,
        preserveEntrySignatures: 'strict'
      }
    },
  };
});
