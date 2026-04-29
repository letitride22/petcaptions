import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'paw-icon-192.png', 'paw-icon-512.png'],
      manifest: {
        name: 'PetCaptions',
        short_name: 'PetCaptions',
        description: 'AI-powered funny captions for your pet photos',
        theme_color: '#5A3218',
        background_color: '#FFF8F3',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'paw-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'paw-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ]
})
