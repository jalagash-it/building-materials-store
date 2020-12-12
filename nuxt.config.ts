import { NuxtConfig } from '@nuxt/types/config'
import { NuxtOptionsHead } from '@nuxt/types/config/head'
import dataLanguages, { defaultLocale } from './src/data/languages'
import { ILanguage } from '~/interfaces/language'

const envMode = process.env.MODE as NuxtConfig['mode'] || 'universal'
const envRouterBase = process.env.ROUTER_BASE || '/'

// noinspection JSUnusedGlobalSymbols
const config: NuxtConfig = {
    env: {
        routerBase: envRouterBase
    },
    mode: envMode,
    srcDir: 'src/',
    /*
    ** Headers of the page
    */
    head: function () {
        let currentLanguage: ILanguage | null = null
        const links = []

        if (this.$store) {
            const allLanguages = this.$store.getters['locale/all']
            const defaultLanguage = this.$store.getters['locale/default']
            currentLanguage = this.$store.getters['locale/language']

            let path = this.$route.fullPath

            if (this.$route.params.lang) {
                path = path.substr(this.$route.params.lang.length + 2)
            } else {
                path = path.substr(1)
            }

            for (const language of allLanguages) {
                let langPath = path

                if (language.locale === defaultLanguage.locale) {
                    langPath = `/${langPath}`
                } else {
                    langPath = `/${language.locale}/${langPath}`
                }

                links.push({
                    rel: 'alternate',
                    hreflang: language.locale === defaultLanguage.locale ? 'x-default' : language.locale,
                    href: this.$url.img(langPath)
                })
            }
        }

        const options: NuxtOptionsHead = {
            title: process.env.npm_package_name || '',
            titleTemplate (titleChunk: string) {
                return titleChunk ? `${titleChunk} — Stroyka` : 'Stroyka'
            },
            htmlAttrs: {
                lang: currentLanguage?.locale!,
                // Value of HTML dir attribute: <html dir="...">
                dir: currentLanguage?.direction!
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: `${process.env.routerBase}favicon.png` },
                // fonts
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i' },
                ...links
            ]
        }

        return options
    } as NuxtOptionsHead,
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        '@fortawesome/fontawesome-free/css/all.min.css',
        'vue-slider-component/dist-css/vue-slider-component.css',
        '~assets/scss/swiper.scss',
        '~assets/scss/style.scss'
    ],
    router: {
        base: envRouterBase,
        middleware: 'i18n',
        extendRoutes (routes) {
            routes.slice().forEach((route) => {
                const langRoute = {
                    name: `lang-${route.name}`,
                    path: `/:lang${route.path}`,
                    component: route.component,
                    chunkName: route.chunkName ? route.chunkName.replace(/^pages\/(.+)$/, 'pages/_lang/$1') : undefined
                }

                routes.push(langRoute)
            })
        }
    },
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '~/plugins/url.ts',
        '~/plugins/currency.ts',
        '~/plugins/i18n.ts',
        { src: '~/plugins/notifications.ts', ssr: false },
        { src: '~/plugins/local-storage.ts', ssr: false }
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt'
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config) {
            if (!config.module) {
                return
            }

            const svgRule = config.module.rules.find(rule => rule.test instanceof RegExp && rule.test.test('.svg'))

            if (!svgRule) {
                return
            }

            svgRule.test = /\.(png|jpe?g|gif|webp)$/

            config.module.rules.push({
                test: /\.svg$/,
                use: [
                    'babel-loader',
                    'vue-svg-loader'
                ],
                exclude: [
                    /@fortawesome[\\/]fontawesome-free[\\/]webfonts[\\/][^\\/]+\.svg$/
                ]
            })

            config.module.rules.push({
                test: /@fortawesome[\\/]fontawesome-free[\\/]webfonts[\\/][^\\/]+\.svg$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            })
        }
    },
    generate: {
        routes () {
            const urls: string[] = []

            dataLanguages.forEach((lang) => {
                if (lang.locale !== defaultLocale) {
                    urls.push(`/${lang.locale}/`)
                }
            })

            return urls
        }
    }
}

// noinspection JSUnusedGlobalSymbols
export default config
