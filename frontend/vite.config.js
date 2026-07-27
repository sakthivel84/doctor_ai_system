import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/login': 'http://localhost:5000',
      '/register': 'http://localhost:5000',
      '/logout': 'http://localhost:5000',
      '/dashboard': 'http://localhost:5000',
      '/book': 'http://localhost:5000',
      '/chatbot': 'http://localhost:5000',
      '/symptom-checker': 'http://localhost:5000',
    }
  }
})
