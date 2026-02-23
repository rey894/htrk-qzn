import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip", ext: ".gz" }),
    viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/', // Change to '/subfolder/' if deploying to a subdirectory
  server: {
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://quezonbukidnon.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    emptyOutDir: true,
    copyPublicDir: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/@supabase')) return 'vendor-supabase';
          return undefined;
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
