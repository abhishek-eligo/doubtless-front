// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [// "@nuxtjs/tailwindcss",
  "nuxt-swiper", "vuetify-nuxt-module", "nuxt-marquee", "vue3-carousel-nuxt", '@nuxt/ui', '@element-plus/nuxt', '@pinia/nuxt', '@primevue/nuxt-module'],
  plugins: [
    '~/plugins/vue3-toastify.js'
  ],
  css: [
    '~/public/fonts/fonts.css',
    "~/public/fonts/main.css",
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-icons/font/bootstrap-icons.css',
  ],
  build: {
    transpile: ['@heroicons/vue'],
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  runtimeConfig: {
    public: {
      // Here you can define any public runtime configuration
      baseURL: process.env.BASE_URL || 'http://localhost:8000/api', // Public API URL accessible on client
    },
    // Use environment variables for server configuration
    server: {
      host: '192.168.29.104',
      port: 3000,
    },
  },
  // app: {
  // }
})