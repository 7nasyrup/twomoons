import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: "LUNA_REVERSE",
        name: "青い月の裏側で - Behind the Blue Moon Demo",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#030712",
        background_color: "#030712",
        orientation: "landscape"
      }
    })
  ],
  server: {
    port: 5174,
    open: true
  }
});
