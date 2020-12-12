<template>
    <div
        :class="[
            'mobile-header',
            {'mobile-header--sticky': stickyMode}
        ]"
    >
        <div class="mobile-header__panel">
            <div class="container">
                <div class="mobile-header__body">
                    <button
                        type="button"
                        class="mobile-header__menu-button"
                        @click="$store.commit('mobileMenu/open')"
                    >
                        <Menu18x14Svg />
                    </button>
                    <AppLink to="/" class="mobile-header__logo">
                        <!-- mobile-logo -->
                        <LogoSmallSvg />
                        <!-- mobile-logo / end -->
                    </AppLink>

                    <Search
                        ref="search"
                        location="mobile-header"
                        :class="[
                            'mobile-header__search',
                            {'mobile-header__search--open': searchIsOpen}
                        ]"
                        @close="onSearchClose"
                    />

                    <div class="mobile-header__indicators">
                        <Indicator
                            ref="searchButton"
                            location="mobile-header"
                            class="d-md-none"
                            trigger="click"
                            @buttonClick="onSearchClick"
                        >
                            <template v-slot:icon>
                                <Search20Svg />
                            </template>
                        </Indicator>

                        <Indicator
                            :to="$url.wishlist()"
                            :value="wishlist.items.length"
                            location="mobile-header"
                            class="d-sm-flex d-none"
                        >
                            <template v-slot:icon>
                                <Heart20Svg />
                            </template>
                        </Indicator>

                        <Indicator
                            :to="$url.cart()"
                            :value="$store.getters['cart/quantity']"
                            :trigger="dropcartType === 'dropdown' ? 'none' : 'click'"
                            location="mobile-header"
                            @buttonClick="onCartClick"
                        >
                            <template v-slot:icon>
                                <Cart20Svg />
                            </template>
                        </Indicator>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { RootState } from '~/store'
import { WishlistState } from '~/store/wishlist'
import { DropcartType } from '~/store/options'
import Sticky from '~/services/sticky'
import AppLink from '~/components/shared/app-link.vue'
import Search from '~/components/header/search.vue'
import Indicator from '~/components/header/indicator.vue'
import LogoSmallSvg from '~/svg/logo-small.svg'
import Menu18x14Svg from '~/svg/menu-18x14.svg'
import Search20Svg from '~/svg/search-20.svg'
import Heart20Svg from '~/svg/heart-20.svg'
import Cart20Svg from '~/svg/cart-20.svg'

type StickyMode = 'pullToShow' | 'alwaysOnTop' | false

@Component({
    components: { Indicator, Search, AppLink, Menu18x14Svg, LogoSmallSvg, Search20Svg, Heart20Svg, Cart20Svg }
})
export default class MobileHeader extends Vue {
    @Prop({ type: [String, Boolean], default: () => false }) readonly stickyMode!: StickyMode

    @State((state: RootState) => state.options.dropcartType) readonly dropcartType!: DropcartType
    @State((state: RootState) => state.wishlist) wishlist!: WishlistState

    @Ref() readonly search!: Search
    @Ref() readonly searchButton!: Indicator

    sticky: Sticky = null!

    searchIsOpen: boolean = false

    teardown: Array<() => void> = []

    mounted () {
        document.addEventListener('click', this.onGlobalClick)

        this.teardown.push(() => document.removeEventListener('click', this.onGlobalClick))

        const element = this.$el as HTMLElement

        this.sticky = new Sticky(element, {
            stuck: 'mobile-header--stuck',
            show: 'mobile-header--show'
        })

        this.sticky.start()
        this.sticky.calc(element)
    }

    beforeDestroy () {
        this.sticky.destroy()
        this.teardown.forEach(x => x())
    }

    onSearchClick () {
        this.searchIsOpen = true
        setTimeout(() => {
            this.search.focus()
        }, 0)
    }

    onSearchClose () {
        this.searchIsOpen = false
    }

    onGlobalClick (event: MouseEvent) {
        const search = this.search.$el
        const searchButton = this.searchButton.$el

        // Close search if click performed outside of component.
        if (event.target instanceof HTMLElement && !(
            search.contains(event.target) ||
            searchButton.contains(event.target)
        )) {
            this.searchIsOpen = false
        }
    }

    onCartClick () {
        if (this.$store.state.options.dropcartType === 'offcanvas') {
            this.$store.commit('offcanvasCart/open')
        }
    }
}

</script>
