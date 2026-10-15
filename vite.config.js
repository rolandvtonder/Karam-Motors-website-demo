import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/* A multi-page build: each section is its own HTML page with a real URL
   (/stock/, /sell/ …), so any static host serves it with no rewrite rules.
   Add a page here and in its folder's index.html. */
const page = (path) => resolve(import.meta.dirname, path)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        home: page('index.html'),
        stock: page('stock/index.html'),
        sell: page('sell/index.html'),
        finance: page('finance/index.html'),
        story: page('story/index.html'),
        contact: page('contact/index.html'),
      },
    },
  },
})
