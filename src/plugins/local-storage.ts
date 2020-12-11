import createPersistedState from 'vuex-persistedstate'
import { Plugin } from '@nuxt/types'

const plugin: Plugin = ({ store }) => {
    createPersistedState({
        key: 'stroyka',
        paths: [
            'currency',
            'cart',
            'wishlist',
            'compare'
        ]
    })(store)
}

export default plugin
