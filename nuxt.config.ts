import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', 'nuxt-icon'],
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
        },
    },
    components: [
        {
            path: '~/components/app',
            pathPrefix: false,
        },
        {
            path: '~/components/ui',
            pathPrefix: false,
        },
    ],
    css: ['~/assets/css/tailwind.css'],
    imports: {
        dirs: ['app/composables', 'app/utils'],
    },
    vite: {
        plugins: [tailwindcss()],
    },
    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },
});
