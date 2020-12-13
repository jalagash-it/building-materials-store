import { Plugin } from '@nuxt/types'

import http from '~/services/httpClient';

declare module 'vue/types/vue' {
    interface Vue {
        $http: typeof http
    }
}

const plugin: Plugin = (_context, inject) => {
    inject('price', http)
}

export default plugin
