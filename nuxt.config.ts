// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@sidebase/nuxt-auth'],
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    auth: {
        globalAppMiddleware: true,
    },
    runtimeConfig: {
        public: {
            deploymentUrl: process.env.DEPLOYMENT_URL,
        },
    },
    alias: {
        // https://github.com/prisma/prisma/issues/12504
        '.prisma/client/index-browser':
            './node_modules/.prisma/client/index-browser.js',
    },
});
