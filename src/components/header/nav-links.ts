import { Vue, Component } from 'vue-property-decorator'
import { INav, INavLink } from '~/interfaces/menus/nav'
import Menu from '~/components/header/menu.vue'
import Megamenu from '~/components/header/megamenu.vue'
import AppLink from '~/components/shared/app-link.vue'
import ArrowRoundedDown9x6Svg from '~/svg/arrow-rounded-down-9x6.svg'
import headerNavigation from '~/data/headerNavigation'

@Component({
    components: { AppLink, Megamenu, Menu, ArrowRoundedDown9x6Svg }
})
export default class NavLinks extends Vue {
    items: INav = headerNavigation
    hoveredItem: INavLink | null = null

    get itemElements () {
        return this.$refs.items as HTMLElement[] || []
    }

    get submenuElements () {
        return this.$refs.submenus as HTMLElement[] || []
    }

    onItemMouseEnter (item: INavLink) {
        this.hoveredItem = item
        this.openSubmenu()
    }

    onItemMouseLeave (item: INavLink) {
        if (item === this.hoveredItem) {
            this.hoveredItem = null
        }
    }

    onSubmenuItemClick (item: INavLink) {
        if (item === this.hoveredItem) {
            this.hoveredItem = null
        }
    }

    openSubmenu () {
        const item = this.getItemElement(this.hoveredItem)
        const submenu = this.getSubmenuElement(this.hoveredItem)

        if (!item || !submenu || !this.hoveredItem?.submenu) {
            return
        }

        submenu.classList.add('nav-links__submenu--display')

        // calculate max height
        const submenuTop = submenu.getBoundingClientRect().top
        const viewportHeight = window.innerHeight
        const paddingBottom = 20

        submenu.style.maxHeight = `${viewportHeight - submenuTop - paddingBottom}px`
        submenu.classList.add('nav-links__submenu--open')

        // megamenu position
        if (this.hoveredItem.submenu.type === 'megamenu') {
            const container = submenu.offsetParent

            if (!container) {
                throw new Error('Submenu container is null')
            }

            const containerRect = container.getBoundingClientRect()
            const containerWidth = containerRect.width
            const megamenuWidth = submenu.getBoundingClientRect().width
            const itemRect = item.getBoundingClientRect()

            if (this.$store.getters['locale/language'].direction === 'rtl') {
                const itemPosition = containerWidth - (itemRect.left - containerRect.left + itemRect.width)
                const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth))

                submenu.style.right = `${megamenuPosition}px`
            } else {
                const itemPosition = itemRect.left - containerRect.left
                const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth))

                submenu.style.left = `${megamenuPosition}px`
            }
        }
    }

    closeSubmenu () {
        this.hoveredItem = null
    }

    getItemElement (item: INavLink | null) {
        if (!item) {
            return null
        }

        const index = this.items.indexOf(item)

        if (index === -1 || !this.itemElements[index]) {
            return null
        }

        return this.itemElements[index] as HTMLDivElement
    }

    getSubmenuElement (item: INavLink | null) {
        if (!item) {
            return null
        }

        const index = this.items.filter(x => x.submenu).indexOf(item)

        if (index === -1 || !this.submenuElements[index]) {
            return null
        }

        return this.submenuElements[index] as HTMLDivElement
    }
}
