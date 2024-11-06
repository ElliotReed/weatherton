import { defineConfig } from 'vite';

export default defineConfig({
  base: '/weatherton/',
  rollupOptions: {
    input: {
      main: 'index.html'
    }
  }
})