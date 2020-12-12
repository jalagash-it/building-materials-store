import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Context } from '@nuxt/types'
import dataLanguages, { defaultLocale } from '../data/languages'

Vue.use(VueI18n)

export default ({ app, store }: Context) => {
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: store.state.locale.current,
        fallbackLocale: defaultLocale,
        messages: dataLanguages.reduce((acc, lang) => ({ ...acc, [lang.locale]: lang.messages }), {})
    })
}
