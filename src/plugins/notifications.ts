import Vue from 'vue'
import Notifications from 'vue-notification'
import { Plugin } from '@nuxt/types'

Vue.use(Notifications)

const plugin: Plugin = (_context, inject) => {
    inject('notify', Vue.notify)
}

export default plugin
