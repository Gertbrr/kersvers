// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: "utf-8",
      title: "KersVers",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Lilita One": [400, 700],
      "Libre Franklin": [400, 700],
    },
  },
  runtimeConfig: {
    public: { apiKeyOpenai: "" },
  },
});
