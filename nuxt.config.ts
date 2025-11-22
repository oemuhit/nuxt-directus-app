import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,
  /*   nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  }, */

  // SSL için devServer
  /*   devServer: {
    https: {
      key: "./server.key",
      cert: "./server.crt",
    },
  }, */

  nitro: {
    experimental: {
      websocket: true,
    },

    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    // Burası sihirli kısım: Nitro'nun cache sürücüsünü bu KV binding'e yönlendiririz
    /*     storage: {
      // 'cache' depolama alanını (useStorage('cache')) KV'ye yönlendir
      cache: {
        driver: "cloudflare-kv-binding", // Nitro'nun KV sürücüsü adı
        // Hangi binding'i kullanacağını belirtiyoruz
        binding: "NITRO_CACHE",
      },
    }, */
  },

  components: [
    {
      path: "~/components/ui",
      pathPrefix: false,
      extensions: [".vue"],
    },
    { path: "~/components", pathPrefix: false },
    { path: "~/components/block", pathPrefix: false },
    { path: "~/components/shared", pathPrefix: false },
    { path: "~/components/base", pathPrefix: false },
    { path: "~/components/forms", pathPrefix: false },
  ],

  routeRules: {
    "/proxy/example/**": { proxy: "https://tr.wikipedia.org/" },

    "/blog/**": { cache: { maxAge: 3600, swr: true } },

    // '/**': {
    // 	prerender: true,
    // },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "shadcn-nuxt",
    "@nuxt/fonts",
    "@nuxtjs/sitemap",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@vueuse/nuxt",
  ],
  /*   app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  }, */

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL as string,
      directusUrl: process.env.DIRECTUS_URL as string,
      enableVisualEditing:
        process.env.NUXT_PUBLIC_ENABLE_VISUAL_EDITING !== "false",
    },
    directusServerToken: process.env.DIRECTUS_SERVER_TOKEN,
    directusServerPublicToken: process.env.DIRECTUS_SERVER_PUBLIC_TOKEN,
  },

  // Directus Configuration
  directus: {
    rest: {
      baseUrl: process.env.DIRECTUS_URL || "http://localhost:8055",
      nuxtBaseUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
    auth: {
      enabled: true,
      enableGlobalAuthMiddleware: false, // Enable auth middleware on every page
      userFields: ["*", { contacts: ["*"] }], // Select user fields
      redirect: {
        login: "/auth/signin", // Path to redirect when login is required
        logout: "/", // Path to redirect after logout
        home: "/dashboard", // Path to redirect after successful login
        resetPassword: "/auth/reset-password", // Path to redirect for password reset
        callback: "/auth/callback", // Path to redirect after login with provider
      },
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  css: ["~/assets/tailwind.css"],

  colorMode: {
    preference: "system", // default value of $colorMode.preference
    classSuffix: "",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
  },

  icon: {
    mode: "css",
    cssLayer: "base",
  },

  // Image Configuration - https://image.nuxt.com/providers/directus
  image: {
    provider: "directus",
    directus: {
      baseURL: `${process.env.DIRECTUS_URL}/assets/`,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
