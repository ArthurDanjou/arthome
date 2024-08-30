export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  compatibilityDate: '2024-08-21',

  // Nuxt App
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      templateParams: {
        separator: '•',
      },
    },
  },

  // Nuxt Modules
  modules: ['@nuxthub/core', '@nuxt/ui', '@vueuse/nuxt', '@nuxtjs/google-fonts', 'nuxt-auth-utils', '@nuxt/content', '@nuxthq/studio', '@nuxt/image', 'nuxt-mapbox', '@pinia/nuxt'],

  // Nuxt UI
  ui: {
    safelistColors: ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'],
  },

  // Nuxt Hub
  hub: {
    cache: true,
    analytics: true,
    blob: true,
    kv: true,
  },

  // Nuxt Icon
  icon: {
    serverBundle: 'remote',
  },

  // Nuxt Color Mode
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  // Nuxt Devtools
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },

  // Nuxt Google Fonts
  googleFonts: {
    display: 'swap',
    families: {
      'DM Sans': [400, 500, 600, 700, 800, 900],
    },
  },

  // Nitro
  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  // Nuxt Env
  runtimeConfig: {
    openWeather: {
      apiKey: '',
      lat: '',
      lon: '',
      lang: '',
      units: '',
    },
    postgres: {
      url: '',
      dir: './server/db',
    },
    public: {
      mapbox: {
        style: '',
        accessToken: '',
      },
    },
  },
})