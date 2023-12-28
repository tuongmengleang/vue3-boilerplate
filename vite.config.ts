import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [ 'vue', 'vue-router', '@vueuse/core', 'vue-i18n', 'pinia' ],
            vueTemplate: true
        }),
        Components({
            dirs: [ 'src/@core/components', 'src/@core/composables/**' ],
            dts: true
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
            '@axios': fileURLToPath(
                new URL('./src/plugins/axios', import.meta.url)
            )
        }
    }
})
