// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  extends: [
    './layers/dashboard'
  ],

  typescript: {
    strict: true,
    typeCheck: true
  },

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Inter', provider: 'google' }
    ]
  },

  nitro: {
    preset: 'cloudflare-pages',
    logLevel: 'verbose',
    output: {
      dir: 'dist'
    },
    experimental: {
      wasm: false
    }
  },
})