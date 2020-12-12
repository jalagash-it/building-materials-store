<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { VNode } from 'vue'

let uniqueId = 0

@Component
export default class Collapse extends Vue {
    @Prop({ type: Boolean, default: () => false }) readonly isOpen!: boolean
    @Prop({ type: String, default: () => '' }) readonly itemOpenClass!: string

    id: number = ++uniqueId

    stateIsOpen: boolean = this.isOpen

    teardown: Array<() => void> = []

    get element (): Element {
        return this.$el
    }

    get itemClasses () {
        return `${this.stateIsOpen ? this.itemOpenClass : ''} collapse-item-${this.id}`
    }

    get contentClasses () {
        return `collapse-content-${this.id}`
    }

    get item (): HTMLElement | null {
        return document.querySelector(`.collapse-item-${this.id}`)
    }

    get content (): HTMLElement | null {
        return document.querySelector(`.collapse-content-${this.id}`)
    }

    @Watch('isOpen')
    onIsOpenChange (newValue: boolean) {
        if (newValue) {
            this.open()
        } else {
            this.close()
        }
    }

    mounted () {
        if (this.content) {
            const content = this.content

            content.addEventListener('transitionend', this.onTransitionEnd)

            this.teardown.push(() => content.removeEventListener('transitionend', this.onTransitionEnd))
        }
    }

    beforeDestroy () {
        this.teardown.forEach(x => x())
    }

    toggle () {
        if (this.stateIsOpen) {
            this.close()
        } else {
            this.open()
        }
    }

    open () {
        this.stateIsOpen = true

        const item = this.item
        const content = this.content

        if (!item || !content) {
            return
        }

        const startHeight = content.getBoundingClientRect().height

        item.classList.add(this.itemOpenClass)

        const endHeight = content.getBoundingClientRect().height

        content.style.height = `${startHeight}px`
        content.getBoundingClientRect() // force reflow
        content.style.height = `${endHeight}px`
    }

    close () {
        this.stateIsOpen = false

        const item = this.item
        const content = this.content

        if (!item || !content) {
            return
        }

        const startHeight = content.getBoundingClientRect().height

        content.style.height = `${startHeight}px`

        item.classList.remove(this.itemOpenClass)

        content.getBoundingClientRect() // force reflow
        content.style.height = ''
    }

    onTransitionEnd (event: TransitionEvent) {
        if (this.content && event.propertyName === 'height') {
            this.content.style.height = ''
        }
    }

    render (): VNode | null {
        const children = this.$scopedSlots.default ? this.$scopedSlots.default({
            itemClasses: this.itemClasses,
            contentClasses: this.contentClasses,
            toggle: this.toggle
        }) || null : null

        if (children) {
            return children[0]
        }

        return null
    }
}

</script>
