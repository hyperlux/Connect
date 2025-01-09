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
      rollupOptions: {
        input: {
          main: './public/index.html'
        },
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
          // Prevent source file references in production
          sourcemapIgnore: true,
          sourcemapExcludeSources: true
        }
      },
      // Don't copy public directory
      copyPublicDir: true,
      // Prevent source file access in production
      manifest: false,
      // Minify production code
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
  };
});
