import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';
  
  process.env.NODE_ENV = process.env.NODE_ENV || mode;
  
  return {
    plugins: [react()],
    server: {
      host: 'auroville.social',
      port: 443,
      https: isDev ? {
        key: fs.readFileSync('/etc/letsencrypt/live/auroville.social/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/auroville.social/fullchain.pem'),
      } : undefined,
      proxy: isDev ? {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          }
        }
      } : undefined
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      chunkSizeWarningLimit: 500,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Core React dependencies
            if (id.includes('node_modules/react/') || 
                id.includes('node_modules/react-dom/') ||
                id.includes('node_modules/react-router-dom/')) {
              return 'react-core';
            }
            
            // UI Components and utilities
            if (id.includes('node_modules/@radix-ui/') ||
                id.includes('node_modules/@headlessui/') ||
                id.includes('node_modules/lucide-react/')) {
              return 'ui-components';
            }
            
            // Data management and utilities
            if (id.includes('node_modules/@tanstack/') ||
                id.includes('node_modules/zustand/') ||
                id.includes('node_modules/date-fns/')) {
              return 'data-utils';
            }

            // Forms and validation
            if (id.includes('node_modules/react-hook-form/') ||
                id.includes('node_modules/zod/')) {
              return 'forms';
            }

            // Split source code by feature
            if (id.includes('/src/pages/')) {
              const feature = id.split('/src/pages/')[1].split('/')[0].toLowerCase();
              return `feature-${feature}`;
            }
          }
        }
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'process.env.VITE_APP_URL': JSON.stringify(env.VITE_APP_URL)
    }
  };
});