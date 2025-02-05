import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'https://auroville.social/api';
  const isProd = mode === 'production';

  return {
    base: '/',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        srcDir: 'src',
        filename: 'service-worker.js',
        strategies: 'injectManifest',
        base: isProd ? 'https://auroville.social/' : '/',
        scope: '/',
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
        },
        injectManifest: {
          injectionPoint: 'self.__WB_MANIFEST',
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 6MB
          rollupFormat: 'iife',
          swDest: 'dist/service-worker.js',
          swSrc: './src/service-worker.js',
          globDirectory: 'dist',
          globPatterns: [
            '**/*.{js,css,html,png,svg,woff2}'
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/auroville\.social\/.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'pages-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
          type: 'module',
          navigateFallback: '/index.html'
        },
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
      sourcemap: true,
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      maxThreads: 1,
      minify: true,
      // Inline critical CSS in HTML
      rollupOptions: {
        plugins: [
          {
            name: 'inline-critical-css',
            transformIndexHtml(html: string): string {
              const criticalCSS = fs.readFileSync('./src/critical.css', 'utf-8');
              return html.replace(
                '<!-- INJECT CRITICAL CSS HERE -->',
                `<style>${criticalCSS}</style>`
              );
            }
          }
        ],
        output: {
          assetFileNames: (info: { name?: string }): string => {
            if (info.name && /\.css$/.test(info.name)) {
              // Force CSS files to be named consistently
              return 'assets/styles.[hash].css';
            }
            return 'assets/[name].[hash][extname]';
          },
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js'
        }
      },
      // Ensure CSS is processed correctly
      css: {
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer,
            cssnano({
              preset: ['default', {
                discardComments: {
                  removeAll: true,
                },
              }],
            }),
          ],
        },
      },
    },
  };
});
