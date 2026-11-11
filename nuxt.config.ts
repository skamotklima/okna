// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  telemetry: false,

  srcDir: "app/",

  // Глобальные стили (фактически лежат в app/assets/scss)
  css: ["@/assets/scss/main.scss"],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // SMTP secrets must be supplied at runtime (NUXT_SMTP_*), not captured
    // into the build output. The contact handler also accepts legacy SMTP_*.
    smtpHost: "",
    smtpPort: 465,
    smtpSecure: true,
    smtpUser: "",
    smtpPass: "",
    smtpFrom: "",
    smtpTo: "",
    secretRegistrationCode: process.env.SECRET_REGISTRATION_CODE,
    public: {
      contactEmailDraft: false,
      apiBase: process.env.API_BASE_URL || "http://localhost:3000",
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  nitro: {
    experimental: {
      openAPI: true,
    },
    prerender: {
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
});
