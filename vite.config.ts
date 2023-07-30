import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/client",
  build: { outDir: "../../dist/src/client" },
  plugins: [react()],
  server: {
    port: process.env.NODE_ENV === "production" ? 3000 : 3001,
  },
});
