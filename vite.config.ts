import { defineConfig } from 'laravel-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig().withPlugin(vue)
/**
 * For SSL support check out the documentation
 * https://laravel-vite.innocenzi.dev/guide/configuration.html#ssl-certificates
 */
// .withLaragonCertificates();
//.withValetCertificates()
