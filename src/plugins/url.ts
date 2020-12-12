import VueI18n from 'vue-i18n'
import { Context, Plugin } from '@nuxt/types'
import { IProduct } from '~/interfaces/product'
import { IUserAddress } from '~/interfaces/address'
import { IOrder } from '~/interfaces/order'
import { ICategory, IShopCategory } from '~/interfaces/category'

function make (context: Context) {
    return {
        home () {
            return '/'
        },
        category (category: ICategory) {
            if (category.type === 'shop') {
                return context.$url.shopCategory(category)
            }

            return ''
        },
        blogCategory () {
            return ''
        },
        shopCategory (category: IShopCategory) {
            return `/shop/catalog/${category.slug}`
        },
        catalog () {
            return '/shop/catalog'
        },
        product (product: Pick<IProduct, 'slug'>) {
            return `/shop/products/${product.slug}`
        },
        cart () {
            return '/shop/cart'
        },
        checkout () {
            return '/checkout'
        },
        wishlist () {
            return '/shop/wishlist'
        },
        trackOrder () {
            return '/shop/track-order'
        },
        signIn () {
            return '/account'
        },
        signUp () {
            return '/account'
        },
        signOut () {
            return '/account'
        },
        account () {
            return '/account'
        },
        accountDashboard () {
            return '/account/dashboard'
        },
        accountProfile () {
            return '/account/profile'
        },
        accountOrders () {
            return '/account/orders'
        },
        accountOrder (order: Pick<IOrder, 'id'>) {
            return `/account/orders/${order.id}`
        },
        accountAddresses () {
            return '/account/addresses'
        },
        accountAddress (address: Pick<IUserAddress, 'id'>) {
            return `/account/addresses/${address.id}`
        },
        accountPassword () {
            return '/account/password'
        },
        lang (path: string) {
            const locale = context.store.state.locale.current

            if (path[0] !== '/') {
                path = `/${path}`
            }

            if (!context.app.i18n) {
                return path
            }

            const i18n = context.app.i18n as VueI18n.I18nOptions

            if (locale === i18n.fallbackLocale) {
                return path
            }

            return `/${locale}${path}`
        },
        isExternal (path: string): boolean {
            return /^(https?:)?\/\//.test(path)
        },
        anyLink (path: string) {
            return context.$url.isExternal(path) ? path : this.base(context.$url.lang(path))
        },
        blog () {
            return '/blog/category-classic'
        },
        blogPost () {
            return '/blog/post-classic'
        },
        about () {
            return '/site/about-us'
        },
        contacts () {
            return '/site/contact-us'
        },
        terms () {
            return '/site/terms'
        },
        base (url: string) {
            if (url[0] === '/') {
                return context.base + url.substr(1)
            }

            return url
        },
        img (url: string) {
            return this.base(url)
        }
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $url: ReturnType<typeof make> & Context
    }
}

declare module '@nuxt/types' {
    interface Context {
        $url: ReturnType<typeof make> & Context
    }
}

const plugin: Plugin = (context, inject) => {
    inject('url', make(context))
}

export default plugin
