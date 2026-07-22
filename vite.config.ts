import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
	  "@store": path.resolve(__dirname, "./src/store/index.ts"),
	  "@types": path.resolve(__dirname, "./src/types/index.ts"),
	  "@layout": path.resolve(__dirname, "./src/layout"),
	  "@routes": path.resolve(__dirname, "./src/routes"),
    },
  },
});