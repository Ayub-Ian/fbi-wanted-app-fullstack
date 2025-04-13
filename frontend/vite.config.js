import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    cors: {
      origin: "http://localhost:3030",
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "/src") }],
  },
});
