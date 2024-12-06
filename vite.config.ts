import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      hmr: {
        clientPort: 443,
        host: 'auroville.social'
      },
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  };
});