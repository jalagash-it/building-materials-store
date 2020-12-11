<template>
    <div
        :class="[
            'mobilemenu',
            {'mobilemenu--open': isOpen}
        ]"
    >
        <div class="mobilemenu__backdrop" @click="$store.commit('mobileMenu/close')" />
        <div class="mobilemenu__body">
            <div class="mobilemenu__header">
                <div class="mobilemenu__title">
                    Menu
                </div>
                <button type="button" class="mobilemenu__close" @click="$store.commit('mobileMenu/close')">
                    <Cross20Svg />
                </button>
            </div>
            <div class="mobilemenu__content">
                <MobileLinks :links="links" @itemClick="onItemClick" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { RootState } from '~/store'
import { IMobileMenu, IMobileMenuLink } from '~/interfaces/menus/mobile-menu'
import MobileLinks from '~/components/mobile/mobile-links.vue'
import dataMobileMenu from '~/data/mobileMenu'
import dataShopCurrencies from '~/data/shopCurrencies'
import dataLanguages from '~/data/languages'
import Cross20Svg from '~/svg/cross-20.svg'

@Component({
    components: { MobileLinks, Cross20Svg }
})
export default class MobileMenu extends Vue {
    @State((state: RootState) => state.mobileMenu.isOpen) isOpen!: boolean

    bodyWidth: number = 0

    links: IMobileMenu = [
        ...dataMobileMenu,
        {
            type: 'button',
            title: 'Currency',
            children: dataShopCurrencies.map((currency) => {
                return {
                    type: 'button',
                    title: `${currency.symbol} ${currency.name}`,
                    data: {
                        type: 'currency',
                        currency
                    }
                }
            })
        },
        {
            type: 'button',
            title: 'Language',
            children: dataLanguages.map((language) => {
                return {
                    type: 'button',
                    title: language.name,
                    data: {
                        type: 'language',
                        language
                    }
                }
            })
        }
    ]

    @Watch('isOpen')
    onIsOpenChange (newValue: boolean) {
        if (newValue) {
            this.open()
        } else {
            this.close()
        }
    }

    open () {
        this.hideScrollbar()
    }

    close () {
        this.showScrollbar()
    }

    hideScrollbar () {
        this.bodyWidth = document.body.clientWidth

        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${document.body.clientWidth - this.bodyWidth}px`
    }

    showScrollbar () {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }

    onItemClick (item: IMobileMenuLink) {
        this.$store.commit('mobileMenu/close')

        if (item.data && item.data.type === 'currency') {
            this.$store.commit('currency/set', item.data.currency)
        }
        if (item.data && item.data.type === 'language') {
            const fullPath = this.$route.fullPath
            const re = new RegExp('^/(' + dataLanguages.map(x => x.locale).join('|') + ')(/|$)')
            const path = fullPath.replace(re, '/')

            this.$router.push(`/${item.data.language.locale}${path}`)
        }
    }
}

</script>
