import { Vue, Component } from 'vue-property-decorator'
import { INav, INavLink } from '~/interfaces/menus/nav'
import departments from '~/services/departments'
import AppLink from '~/components/shared/app-link.vue'
import Menu from '~/components/header/menu.vue'
import Megamenu from '~/components/header/megamenu.vue'
import Menu18x14Svg from '~/svg/menu-18x14.svg'
import ArrowRoundedDown9x6Svg from '~/svg/arrow-rounded-down-9x6.svg'
import ArrowRoundedRight6x9Svg from '~/svg/arrow-rounded-right-6x9.svg'
import dataHeaderDepartments from '~/data/headerDepartments'

@Component({
    components: { AppLink, Megamenu, Menu, Menu18x14Svg, ArrowRoundedDown9x6Svg, ArrowRoundedRight6x9Svg }
})
export default class Departments extends Vue {
    hoveredItem: INavLink | null = null
    items: INav = dataHeaderDepartments
    isOpen: boolean = false
    isTransition: boolean = false
    fixed: boolean = false
    sticky: boolean = false

    get itemElements () {
        return this.$refs.items as HTMLDivElement[] || []
    }

    get submenuElements () {
        return this.$refs.submenus as HTMLDivElement[] || []
    }

    mounted () {
        departments.watch(this.onSetArea)

        const content = this.$refs.content as HTMLElement

        content.addEventListener('transitionend', this.onTransitionEnd)
        document.addEventListener('click', this.onGlobalClick)
    }

    // noinspection JSUnusedGlobalSymbols
    beforeDestroy () {
        departments.unwatch(this.onSetArea)

        const content = this.$refs.content as HTMLElement

        content.removeEventListener('transitionend', this.onTransitionEnd)
        document.removeEventListener('click', this.onGlobalClick)
    }

    onClickButton (): void {
        if (this.isOpen) {
            this.closeMenu()
        } else {
            this.openMenu()
        }
    }

    onGlobalClick (event: MouseEvent): void {
        const element = this.$el

        if (!element.contains(event.target as HTMLElement)) {
            this.closeMenu()
        }
    }

    onItemMouseEnter (item: INavLink): void {
        this.closeSubmenu()
        this.hoveredItem = item
        this.openSubmenu()
    }

    onMouseLeave (): void {
        this.closeSubmenu()
        this.hoveredItem = null
    }

    onSetArea (element: Element | null): void {
        if (element !== null) {
            this.fix()
        } else {
            this.unfix()
        }

        this.$emit('onSetArea', element)
    }

    onTransitionEnd (event: TransitionEvent): void {
        const content = this.$refs.content as HTMLElement

        if (event.propertyName === 'height' && event.target === content) {
            this.isTransition = false
        }
    }

    openMenu (): void {
        if (this.fixed) {
            return
        }

        this.isOpen = true
        this.isTransition = true

        const element = this.$el as HTMLElement
        const content = this.$refs.content as HTMLElement
        const startHeight = content.getBoundingClientRect().height

        element.classList.add('departments--transition')
        element.classList.add('departments--open')

        const documentHeight = document.documentElement.clientHeight
        const paddingBottom = 20
        const contentRect = content.getBoundingClientRect()
        const endHeight = Math.min(contentRect.height, documentHeight - paddingBottom - contentRect.top)

        content.style.height = `${startHeight}px`
        content.getBoundingClientRect() // force reflow
        content.style.maxHeight = `${endHeight}px`
        content.style.height = `${endHeight}px`
    }

    closeMenu (immediately = false): void {
        if (this.fixed) {
            return
        }

        this.isOpen = false

        const root = this.$el as HTMLElement
        const content = this.$refs.content as HTMLElement

        if (immediately) {
            content.style.transitionDuration = '0s'
            content.style.height = ''
            content.style.maxHeight = ''

            content.getBoundingClientRect() // force reflow

            root.classList.remove('departments--open')
            root.classList.remove('departments--fixed')

            content.style.transitionDuration = ''
        } else {
            this.isTransition = true

            const startHeight = content.getBoundingClientRect().height

            content.style.height = `${startHeight}px`

            root.classList.add('departments--transition')
            root.classList.remove('departments--open')
            root.classList.remove('departments--fixed')

            content.getBoundingClientRect() // force reflow
            content.style.height = ''
            content.style.maxHeight = ''
        }
    }

    fix (): void {
        if (this.sticky) {
            return
        }

        this.isOpen = true
        this.fixed = true

        if (!departments.element) {
            return
        }

        const area = departments.element
        const root = this.$el as HTMLElement
        const content = this.$refs.content as HTMLElement

        const areaRect = area.getBoundingClientRect()
        const areaBottom = areaRect.top + areaRect.height + window.scrollY

        root.classList.remove('departments--transition')
        root.classList.add('departments--fixed', 'departments--open')

        const height = areaBottom - (content.getBoundingClientRect().top + window.scrollY)

        content.style.height = `${height}px`
        content.style.maxHeight = `${height}px`
        content.getBoundingClientRect() // force reflow
    }

    unfix (): void {
        this.fixed = false

        const root = this.$el as HTMLElement

        root.classList.remove('departments--fixed')

        this.closeMenu(true)
    }

    setStickyState (state: boolean): void {
        this.sticky = state

        if (this.sticky) {
            this.unfix()
        } else if (departments.element) {
            this.fix()
        }
    }

    openSubmenu (): void {
        if (!this.hoveredItem || !this.hoveredItem.submenu) {
            return
        }

        const body = this.$refs.body as HTMLElement
        const container = this.$refs.container as HTMLElement
        const item = this.getCurrentItemElement()
        const submenu = this.getCurrentSubmenuElement()

        if (!submenu || !item) {
            return
        }

        submenu.classList.add('departments__submenu--open')

        const documentHeight = document.documentElement.clientHeight
        const paddingBottom = 20

        if (this.hoveredItem.submenu.type === 'megamenu') {
            const submenuTop = submenu.getBoundingClientRect().top
            submenu.style.maxHeight = `${documentHeight - submenuTop - paddingBottom}px`
        }

        if (this.hoveredItem.submenu.type === 'menu') {
            const maxHeight = documentHeight - paddingBottom - Math.min(
                paddingBottom,
                body.getBoundingClientRect().top
            )

            submenu.style.maxHeight = `${maxHeight}px`

            const submenuHeight = submenu.getBoundingClientRect().height
            const itemTop = item.getBoundingClientRect().top
            const containerTop = container.getBoundingClientRect().top
            const top = Math.min(itemTop, documentHeight - paddingBottom - submenuHeight) - containerTop

            submenu.style.top = `${top}px`
        }
    }

    closeSubmenu (): void {
        const submenu = this.getCurrentSubmenuElement()

        if (submenu) {
            submenu.classList.remove('departments__submenu--open')
        }
    }

    getCurrentItemElement (): HTMLDivElement | null {
        if (!this.hoveredItem) {
            return null
        }

        const index = this.items.indexOf(this.hoveredItem)

        if (index === -1 || !this.itemElements[index]) {
            return null
        }

        return this.itemElements[index]
    }

    getCurrentSubmenuElement (): HTMLDivElement | null {
        if (!this.hoveredItem) {
            return null
        }

        const index = this.items.filter(x => x.submenu).indexOf(this.hoveredItem)

        if (index === -1 || !this.submenuElements[index]) {
            return null
        }

        return this.submenuElements[index]
    }
}
