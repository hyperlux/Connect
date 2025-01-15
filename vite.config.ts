import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';

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
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'script',
        srcDir: 'src',
        filename: 'sw.js',
        strategies: 'injectManifest',
        scope: '/',
        devOptions: {
          enabled: true,
          type: 'module'
        },
        injectManifest: {
          injectionPoint: 'self.__WB_MANIFEST',
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4MB
          rollupFormat: 'iife',
          swDest: 'sw.js' // Output directly to root of build directory
        },
        manifest: {
          name: 'Auroville Connect',
          short_name: 'AuroConnect',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/favicon.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    root: '.',
    publicDir: 'public',
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
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
  };
});
