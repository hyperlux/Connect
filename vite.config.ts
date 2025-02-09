import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'http://localhost:5000/api';
  const isProd = mode === 'production';

  return {
    base: '/',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Auroville Connect',
          short_name: 'AuroConnect',
          description: 'Auroville Community Platform',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          // Increase maximum file size for precaching
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
          
          // Precache specific files
          globPatterns: [
            '**/*.{js,css,html,ico,json,txt}'
          ],
          
          // Ignore large image files during precaching
          globIgnores: [
            '**/auroimgs/**',
            '**/*.{png,jpg,jpeg,svg,webp}'
          ],

          // Runtime caching configuration
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.auroville\.social\/api/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 // 24 hours
                },
                networkTimeoutSeconds: 10
              }
            },
            {
              urlPattern: /\.(png|jpg|jpeg|svg|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'image-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true,
          type: 'module'
        },
        strategies: 'generateSW',
        injectRegister: 'auto'
      })
    ],
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
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
