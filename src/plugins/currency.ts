import Vue from 'vue'
import { Plugin } from '@nuxt/types'

function price (this: Vue, value: number): string {
    const symbol = this.$store.state.currency.current.symbol

    return `${symbol}${value.toFixed(2)}`
}

declare module 'vue/types/vue' {
    interface Vue {
        $price: typeof price
    }
}

const plugin: Plugin = (_context, inject) => {
    inject('price', price)
}

export default plugin
