import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Staging configuration for subdirectory deployment
// Use this if deploying to a subdirectory instead of root
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/staging/', // Change this to match your subdirectory path
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'https://quezonbukidnon.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist-staging',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
