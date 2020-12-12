<template>
    <div :class="['topbar-dropdown', {'topbar-dropdown--opened': show}]">
        <button class="topbar-dropdown__btn" type="button" @click="toggleDropdown()">
            <slot />
            <ArrowRoundedDown7x5Svg />
        </button>

        <div class="topbar-dropdown__body">
            <Menu layout="topbar" :with-icons="withIcons" :items="items" @itemClick="onItemClick" />
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { INestedLink } from '~/interfaces/menus/link'
import Menu from '~/components/header/menu.vue'
import ArrowRoundedDown7x5Svg from '~/svg/arrow-rounded-down-7x5.svg'

@Component({
    components: { ArrowRoundedDown7x5Svg, Menu }
})
export default class Dropdown extends Vue {
    @Prop({ type: Boolean, default: () => false }) readonly withIcons!: boolean
    @Prop({ type: Array, default: () => [] }) readonly items!: INestedLink[]

    show: boolean = false
    teardown: Array<() => void> = []

    mounted () {
        const onGlobalClick = (event: MouseEvent) => {
            if (this.show && event.target instanceof Node && !this.$el.contains(event.target)) {
                this.show = false
            }
        }

        document.addEventListener('click', onGlobalClick)

        this.teardown.push(() => {
            document.removeEventListener('click', onGlobalClick)
        })
    }

    beforeDestroy () {
        this.teardown.forEach(x => x())
    }

    onItemClick (item: INestedLink): void {
        this.$emit('itemClick', item)
        this.show = false
    }

    toggleDropdown (): void {
        this.show = !this.show
    }
}

</script>
