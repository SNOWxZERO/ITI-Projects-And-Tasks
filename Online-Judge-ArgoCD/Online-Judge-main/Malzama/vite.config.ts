import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext", // ✅ enables top-level await support
    outDir: "dist",   // optional: define output folder
    sourcemap: false, // optional: disable source maps for smaller build
  },
});
