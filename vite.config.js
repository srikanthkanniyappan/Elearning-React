import { defineConfig } from "vite";
import vercel from "vite-plugin-vercel";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: process.env.PORT,
  },
  plugins: [vercel(), react()],
  define: {
    __APP_ENV__: process.env.VITE_API_URL,
  },
});
