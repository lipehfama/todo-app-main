import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon-32x32.png",
        "robots.txt",
        "icon-192x192.png",
        "icon-512x512.png",
      ],
      manifest: {
        name: "Todo App",
        short_name: "Todo",
        description: "A responsive todo app for creating and managing tasks.",
        theme_color: "#3a7bfd",
        background_color: "#fafafa",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,webp}"],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
