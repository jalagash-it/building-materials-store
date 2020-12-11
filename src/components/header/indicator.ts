import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import AppLink from '~/components/shared/app-link.vue'

type Trigger = 'none' | 'click' | 'hover'

type Location = 'nav-panel' | 'mobile-header'

@Component({
    components: { AppLink }
})
export default class Indicator extends Vue {
    @Prop({ type: Number, default: () => null }) readonly value!: number | null
    @Prop({ type: String, default: () => '' }) readonly to!: string
    @Prop({ type: String, default: () => 'none' }) readonly trigger!: Trigger
    @Prop({ type: String, default: () => 'nav-panel' }) readonly location!: Location

    @Ref('dropdown') dropdownElement: HTMLElement | undefined

    isDisplay: boolean = false
    isOpen: boolean = false
    isHovered: boolean = false

    mounted () {
        if (this.dropdownElement) {
            this.dropdownElement.addEventListener('transitionend', this.onTransitionEnd)
        }

        document.addEventListener('click', this.onGlobalClick)
    }

    beforeDestroy () {
        if (this.dropdownElement) {
            this.dropdownElement.removeEventListener('transitionend', this.onTransitionEnd)
        }

        document.removeEventListener('click', this.onGlobalClick)
    }

    onMouseEnter (): void {
        this.isHovered = true

        if (this.trigger === 'hover' && this.$slots.default) {
            this.open()
        }
    }

    onMouseLeave (): void {
        this.isHovered = false

        if (this.trigger === 'hover' && this.$slots.default) {
            this.close()
        }
    }

    onClick (event: MouseEvent): void {
        this.$emit('buttonClick')

        if (this.trigger !== 'click') {
            return
        }

        if (event.cancelable) {
            event.preventDefault()
        }

        this.toggle()
    }

    onGlobalClick (event: MouseEvent): void {
        const element = this.$el

        // check that the click was outside the element
        if (!element.contains(event.target as Node)) {
            this.close()
        }
    }

    onTransitionEnd (event: TransitionEvent): void {
        const element = this.$el

        if (
            this.dropdownElement === event.target &&
            event.propertyName === 'visibility' &&
            !this.isOpen
        ) {
            this.isDisplay = false

            element.classList.remove('indicator--display')
        }
    }

    toggle (): void {
        if (this.isOpen) {
            this.close()
        } else {
            this.open()
        }
    }

    open (): void {
        this.isOpen = true
        this.isDisplay = true

        const element = this.$el as HTMLElement

        if (!this.dropdownElement) {
            return
        }

        element.classList.add('indicator--display')
        element.getBoundingClientRect() // force reflow
        element.classList.add('indicator--open')

        const dropdownTop = this.dropdownElement.getBoundingClientRect().top
        const viewportHeight = window.innerHeight
        const paddingBottom = 20

        this.dropdownElement.style.maxHeight = `${viewportHeight - dropdownTop - paddingBottom}px`

        this.$emit('open')
    }

    close (immediately = false): void {
        this.isOpen = false

        const element = this.$el as HTMLElement

        if (immediately) {
            this.isDisplay = false

            element.classList.remove('indicator--open')
            element.classList.remove('indicator--display')
        } else {
            element.classList.remove('indicator--open')
        }

        this.$emit('close')
    }
}
