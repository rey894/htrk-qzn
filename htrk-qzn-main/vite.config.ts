import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import viteCompression from "vite-plugin-compression";

const manualChunks = (id: string) => {
  const normalizedId = id.replace(/\\/g, "/");
  if (!normalizedId.includes("/node_modules/")) return undefined;

  if (normalizedId.includes("/node_modules/react/") || normalizedId.includes("/node_modules/react-dom/")) {
    return "vendor-react";
  }
  if (normalizedId.includes("/node_modules/react-router") || normalizedId.includes("/node_modules/@remix-run/")) {
    return "vendor-router";
  }
  if (normalizedId.includes("/node_modules/@tanstack/react-query/")) {
    return "vendor-query";
  }
  if (normalizedId.includes("/node_modules/@supabase/")) {
    return "vendor-supabase";
  }
  if (
    normalizedId.includes("/node_modules/leaflet/") ||
    normalizedId.includes("/node_modules/react-leaflet/") ||
    normalizedId.includes("/node_modules/mapbox-gl/")
  ) {
    return "vendor-maps";
  }
  if (normalizedId.includes("/node_modules/recharts/")) {
    return "vendor-charts";
  }
  if (normalizedId.includes("/node_modules/react-quill/") || normalizedId.includes("/node_modules/quill/")) {
    return "vendor-editor";
  }
  if (normalizedId.includes("/node_modules/@radix-ui/")) {
    return "vendor-radix";
  }
  if (normalizedId.includes("/node_modules/lucide-react/")) {
    return "vendor-icons";
  }

  return undefined;
};

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
    // Allow temporary tunnel domains for remote preview/testing (e.g., localtunnel/ngrok/cloudflare).
    allowedHosts: ['.loca.lt', '.ngrok-free.app', '.ngrok.io', '.trycloudflare.com'],
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
        manualChunks,
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
