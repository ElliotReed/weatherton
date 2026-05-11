import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                compassDesign: 'compass-design.html',
                barometerDesign: 'barometer-design.html',
            }
        }
    }
})