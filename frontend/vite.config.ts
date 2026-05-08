import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@alabuga/uikit": resolve(__dirname, "./uikit/src/index.ts"),
      "@": resolve(__dirname, "./uikit/src"),
    },
  },
  server: {
    port: 5173,
  },
});
