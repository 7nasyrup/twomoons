import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: "Behind the blue moon",
        name: "青い月の裏側で - Behind the Blue Moon Demo",
        icons: [
          {
            src: "icon.jpg",
            sizes: "192x192 512x512",
            type: "image/jpeg",
            purpose: "any maskable"
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
    strictPort: true,
    open: true
  }
});
