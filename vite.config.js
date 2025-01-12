import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    esModule: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'query-vendor': ['@tanstack/react-query', '@tanstack/query-core'],
          'icons': ['lucide-react'],
          'charts': ['d3', 'recharts']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to 1000 kB
  },
  // Add production-specific configuration
  mode: 'production',
  optimize: true,
  minify: true,
  removeDebug: true
})
