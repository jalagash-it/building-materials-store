<template>
    <!-- .dropcart -->
    <client-only>
        <div
            :class="[
                'dropcart',
                `dropcart--style--${type}`,
                {'dropcart--open': isOpen}
            ]"
        >
            <div v-if="type === 'offcanvas'" class="dropcart__backdrop" @click="$store.commit('offcanvasCart/close')" />
            <div class="dropcart__body">
                <div v-if="type === 'offcanvas'" class="dropcart__header">
                    <div class="dropcart__title">
                        Shopping Cart
                    </div>
                    <button class="dropcart__close" type="button" @click="$store.commit('offcanvasCart/close')">
                        <Cross12Svg />
                    </button>
                </div>

                <div class="dropcart__products-list">
                    <div v-for="item in items" :key="item.id" class="dropcart__product">
                        <div class="product-image dropcart__product-image">
                            <AppLink :to="$url.product(item.product)" class="product-image__body">
                                <!--suppress HtmlUnknownTarget -->
                                <img class="product-image__img" :src="$url.img(item.product.images[0])" alt="">
                            </AppLink>
                        </div>
                        <div class="dropcart__product-info">
                            <div class="dropcart__product-name">
                                <AppLink :to="$url.product(item.product)">
                                    {{ item.product.name }}
                                </AppLink>
                            </div>
                            <ul v-if="item.options.length > 0" class="dropcart__product-options">
                                <li v-for="(option, index) in item.options" :key="index">
                                    {{ option.optionTitle }}: {{ option.valueTitle }}
                                </li>
                            </ul>
                            <div class="dropcart__product-meta">
                                <span class="dropcart__product-quantity">{{ item.quantity }}</span> ×
                                <span class="dropcart__product-price">{{ $price(item.price) }}</span>
                            </div>
                        </div>

                        <AsyncAction
                            v-slot:default="{ run, isLoading }"
                            :action="() => $store.dispatch('cart/remove', { itemId: item.id })"
                        >
                            <button
                                type="button"
                                :class="[
                                    'dropcart__product-remove btn btn-light btn-sm btn-svg-icon',
                                    {'btn-loading': isLoading}
                                ]"
                                @click="run"
                            >
                                <Cross10Svg />
                            </button>
                        </AsyncAction>
                    </div>
                </div>

                <div class="dropcart__totals">
                    <table>
                        <tbody>
                            <template v-if="totals.length > 0">
                                <tr>
                                    <th>Subtotal</th>
                                    <td>{{ $price(subtotal) }}</td>
                                </tr>
                                <tr v-for="(item, index) in totals" :key="index">
                                    <th>{{ item.title }}</th>
                                    <td>{{ $price(item.price) }}</td>
                                </tr>
                            </template>

                            <tr>
                                <th>Total</th>
                                <td>{{ $price(total) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="dropcart__buttons">
                    <AppLink :to="$url.cart()" class="btn btn-secondary">
                        View Cart
                    </AppLink>
                    <AppLink :to="$url.checkout()" class="btn btn-primary">
                        Checkout
                    </AppLink>
                </div>
            </div>
        </div>
    </client-only>
    <!-- .dropcart / end -->
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { RootState } from '~/store'
import { CartItem, CartTotal } from '~/interfaces/cart'
import AppLink from '~/components/shared/app-link.vue'
import AsyncAction from '~/components/shared/async-action.vue'
import Cross10Svg from '~/svg/cross-10.svg'
import Cross12Svg from '~/svg/cross-12.svg'

type Type = 'dropdown' | 'offcanvas'

@Component({
    components: { AppLink, Cross10Svg, Cross12Svg, AsyncAction }
})
export default class Dropcart extends Vue {
    @Prop({ type: String, default: () => 'dropdown' }) readonly type!: Type

    @State((state: RootState) => state.cart.items) items!: CartItem[]
    @State((state: RootState) => state.cart.subtotal) subtotal!: number
    @State((state: RootState) => state.cart.totals) totals!: CartTotal[]
    @State((state: RootState) => state.cart.total) total!: number
    @State((state: RootState) => state.offcanvasCart.isOpen) isOpen!: boolean

    bodyWidth = 0

    @Watch('isOpen') onIsOpenChange (newValue: boolean) {
        if (newValue) {
            this.open()
        } else {
            this.close()
        }
    }

    open (): void {
        this.hideScrollbar()
    }

    close (): void {
        this.showScrollbar()
    }

    hideScrollbar (): void {
        this.bodyWidth = document.body.clientWidth

        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${document.body.clientWidth - this.bodyWidth}px`
    }

    showScrollbar (): void {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }
}

</script>
