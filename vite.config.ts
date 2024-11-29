import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'process.env.VITE_APP_URL': JSON.stringify(env.VITE_APP_URL)
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  };
});