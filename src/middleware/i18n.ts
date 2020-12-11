import VueI18n from 'vue-i18n'
import { Context } from '@nuxt/types'
import dataLanguages from '../data/languages'

export default function ({ isHMR, app, store, route, params, error, redirect }: Context) {
    if (!app.i18n) {
        return
    }

    const i18n = app.i18n as VueI18n.I18nOptions
    const defaultLocale = i18n.fallbackLocale
    // If middleware is called from hot module replacement, ignore it
    if (isHMR) { return }
    // Get locale from params
    const locale = params.lang || defaultLocale
    if (!dataLanguages.find(x => x.locale === locale)) {
        return error({ message: 'This page could not be found.', statusCode: 404 })
    }
    // Set locale
    store.commit('locale/set', locale)

    i18n.locale = store.state.locale.current
    // If route is /<defaultLocale>/... -> redirect to /...

    if (locale === defaultLocale && new RegExp('^/' + defaultLocale + '(/|$)').test(route.fullPath)) {
        const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
        const re = new RegExp(toReplace)

        return redirect(
            route.fullPath.replace(re, '/')
        )
    }
}
