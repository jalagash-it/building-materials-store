<template>
    <div
        :class="[
            'block block-sidebar',
            {
                'block-sidebar--open': isOpen,
                'block-sidebar--offcanvas--always': offcanvas === 'always',
                'block-sidebar--offcanvas--mobile': offcanvas === 'mobile',
            }
        ]"
    >
        <div ref="backdrop" class="block-sidebar__backdrop" @click="$emit('closeSidebar')" />
        <div ref="body" class="block-sidebar__body">
            <div class="block-sidebar__header">
                <div class="block-sidebar__title">
                    Filters
                </div>
                <button class="block-sidebar__close" type="button" @click="$emit('closeSidebar')">
                    <Cross20Svg />
                </button>
            </div>

            <slot />
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import Cross20Svg from '~/svg/cross-20.svg'

export type CategorySidebarOffcanvas = 'always' | 'mobile';

@Component({
    components: { Cross20Svg }
})
export default class CategorySidebar extends Vue {
    @Prop({ type: Boolean, default: () => false }) readonly isOpen!: boolean
    @Prop({ type: String, default: () => 'mobile' }) readonly offcanvas!: CategorySidebarOffcanvas

    @Ref() readonly backdrop!: HTMLElement
    @Ref() readonly body!: HTMLElement

    teardown: Array<() => void> = []

    media!: MediaQueryList

    @Watch('isOpen')
    onIsOpenChange (newValue: boolean) {
        if (newValue) {
            const width = document.body.clientWidth

            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${document.body.clientWidth - width}px`
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }

    mounted () {
        this.media = matchMedia('(max-width: 991px)')

        if (this.media.addEventListener) {
            this.media.addEventListener('change', this.onMediaChange)
        } else {
            // noinspection JSDeprecatedSymbols
            this.media.addListener(this.onMediaChange)
        }

        this.teardown.push(() => {
            if (this.media.removeEventListener) {
                this.media.removeEventListener('change', this.onMediaChange)
            } else {
                // noinspection JSDeprecatedSymbols
                this.media.removeListener(this.onMediaChange)
            }
        })
    }

    beforeDestroy () {
        this.teardown.forEach(x => x())
    }

    onMediaChange () {
        if (this.offcanvas === 'mobile') {
            if (this.isOpen && !this.media.matches) {
                this.$emit('closeSidebar')
            }
            // this is necessary to avoid the transition hiding the sidebar
            if (!this.isOpen && this.media.matches && this.backdrop && this.body) {
                const backdrop = this.backdrop
                const body = this.body

                backdrop.style.transition = 'none'
                body.style.transition = 'none'

                backdrop.getBoundingClientRect() // force reflow

                backdrop.style.transition = ''
                body.style.transition = ''
            }
        }
    }
}

</script>
