<template>
    <div
        :class="[
            'menu',
            `menu--layout--${layout}`,
            {'menu--with-icons': withIcons}
        ]"
        @mouseleave="onMouseLeave"
    >
        <div class="menu__submenus-container">
            <template v-for="item in items">
                <div
                    v-if="item.children"
                    ref="submenus"
                    :key="item.url"
                    class="menu__submenu"
                >
                    <Menu :items="item.children" />
                </div>
            </template>
        </div>
        <ul class="menu__list">
            <li
                v-for="(item, index) in items"
                ref="items"
                :key="index"
                :class="[
                    'menu__item',
                    {'menu__item--hover': item === hoveredItem}
                ]"
                @mouseover="onItemMouseOver(item)"
            >
                <!-- This is a synthetic element that allows to adjust the vertical offset of the submenu using CSS. -->
                <div class="menu__item-submenu-offset" />

                <AppLink v-if="item.url" :to="item.url" class="menu__item-link" @click.native="onItemClick(item)">
                    <div v-if="item.icon" class="menu__item-icon">
                        <!--suppress HtmlUnknownTarget -->
                        <img :src="$url.img(item.icon)" alt="">
                    </div>
                    {{ item.title }}
                    <ArrowRoundedRight6x9Svg v-if="item.children" class="menu__item-arrow" />
                </AppLink>

                <button v-else type="button" class="menu__item-link" @click="onItemClick(item)">
                    <span v-if="item.icon" class="menu__item-icon">
                        <!--suppress HtmlUnknownTarget -->
                        <img :src="$url.img(item.icon)" alt="">
                    </span>
                    {{ item.title }}
                    <ArrowRoundedRight6x9Svg v-if="item.children" class="menu__item-arrow" />
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { INestedLink } from '~/interfaces/menus/link'
import AppLink from '~/components/shared/app-link.vue'
import ArrowRoundedRight6x9Svg from '~/svg/arrow-rounded-right-6x9.svg'

type Layout = 'classic' | 'topbar';

@Component({
    name: 'Menu',
    components: { AppLink, ArrowRoundedRight6x9Svg }
})
export default class Menu extends Vue {
    @Prop({ type: String, default: () => 'classic' }) readonly layout!: Layout
    @Prop({ type: Boolean, default: () => false }) readonly withIcons!: boolean
    @Prop({ type: Array, default: () => [] }) readonly items!: INestedLink[]

    hoveredItem: INestedLink | null = null

    get itemElements () {
        return this.$refs.items as HTMLDivElement[] || []
    }

    get submenuElements () {
        return this.$refs.submenus as HTMLDivElement[] || []
    }

    onItemClick (item: INestedLink) {
        this.$emit('itemClick', item)
    }

    onItemMouseOver (item: INestedLink) {
        this.closeSubmenu()
        this.hoveredItem = item
        this.openSubmenu()
    }

    onMouseLeave () {
        this.closeSubmenu()
        this.hoveredItem = null
    }

    openSubmenu () {
        if (!this.hoveredItem || !this.hoveredItem.children) {
            return
        }

        const menu = this.$el as HTMLElement
        const item = this.getCurrentItemElement()
        const submenu = this.getCurrentSubmenuElement()

        if (!item || !submenu) {
            return
        }

        const itemChildren = [].slice.call(item.children) as Element[]
        const offset = itemChildren.find(x => x.matches('.menu__item-submenu-offset')) as HTMLElement

        submenu.classList.add('menu__submenu--display')

        // calc submenu position
        const menuTop = menu.getBoundingClientRect().top
        const itemTop = offset.getBoundingClientRect().top

        const viewportHeight = window.innerHeight
        const paddingY = 20
        const maxHeight = viewportHeight - paddingY * 2

        submenu.style.maxHeight = `${maxHeight}px`

        const submenuHeight = submenu.getBoundingClientRect().height
        const position = Math.min(
            Math.max(
                itemTop - menuTop,
                0
            ),
            (viewportHeight - paddingY - submenuHeight) - menuTop
        )

        submenu.style.top = `${position}px`
        submenu.classList.add('menu__submenu--open')

        const menuRect = menu.getBoundingClientRect()
        const menuLeft = menuRect.left
        const menuWidth = menuRect.width
        const submenuWidth = submenu.getBoundingClientRect().width

        if (this.$store.getters['locale/language'].direction === 'rtl') {
            const submenuLeft = menuLeft - submenuWidth

            if (submenuLeft < 0) {
                submenu.classList.add('menu__submenu--reverse')
            }
        } else {
            const submenuRight = menuLeft + menuWidth + submenuWidth

            if (submenuRight > document.body.clientWidth) {
                submenu.classList.add('menu__submenu--reverse')
            }
        }
    }

    closeSubmenu () {
        const submenu = this.getCurrentSubmenuElement()

        if (submenu) {
            submenu.classList.remove(
                'menu__submenu--display',
                'menu__submenu--open',
                'menu__submenu--reverse'
            )
        }
    }

    getCurrentItemElement () {
        if (!this.hoveredItem) {
            return null
        }

        const index = this.items.indexOf(this.hoveredItem)

        if (index === -1 || !this.itemElements[index]) {
            return null
        }

        return this.itemElements[index]
    }

    getCurrentSubmenuElement () {
        if (!this.hoveredItem) {
            return null
        }

        const index = this.items.filter(x => x.children).indexOf(this.hoveredItem)

        if (index === -1 || !this.submenuElements[index]) {
            return null
        }

        return this.submenuElements[index]
    }
}

</script>
