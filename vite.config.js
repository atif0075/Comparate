import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    Components({
      dirs: ["./src/components", "./src/Iconify"],
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
    },
  },
});
