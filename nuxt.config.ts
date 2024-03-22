// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    runtimeConfig: {
        public: {
        }
    },
    modules: [
        '@nuxt/image',
        '@pinia/nuxt',
        '@nuxtjs/device',
    ],
    buildModules: [
        '@nuxtjs/svg-sprite',
    ],
    device: {
        refreshOnResize: true
    },
    plugins: [
        {
            src: '@/plugins/maska.ts'
        },
    ],
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru',
            },
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                }
            ],
            meta: [
                {
                    charset: 'UTF-8'
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, user-scalable=no'
                },
            ]
        }
    },
    devtools: {
        enabled: true
    },
    css: [
        "@/assets/sass/index.sass"
    ]
})
