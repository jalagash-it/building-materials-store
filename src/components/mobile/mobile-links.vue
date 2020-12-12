<template>
    <ul :class="`mobile-links mobile-links--level--${level}`">
        <template v-for="(link, index) in links">
            <Collapse
                :key="index"
                v-slot:default="{ itemClasses, contentClasses, toggle }"
                item-open-class="mobile-links__item--open"
            >
                <li
                    v-if="link.type === 'link' || link.type === 'button'"
                    :class="[
                        'mobile-links__item',
                        itemClasses
                    ]"
                >
                    <div class="mobile-links__item-title">
                        <AppLink
                            v-if="link.type === 'link'"
                            :to="link.url"
                            class="mobile-links__item-link"
                            @click.native="onItemClick(link)"
                        >
                            {{ link.title }}
                        </AppLink>

                        <button
                            v-if="link.type === 'button'"
                            type="button"
                            class="mobile-links__item-link"
                            @click="toggle; onItemClick(link)"
                        >
                            {{ link.title }}
                        </button>

                        <button
                            v-if="link.children && link.children.length > 0"
                            class="mobile-links__item-toggle"
                            type="button"
                            @click="toggle"
                        >
                            <ArrowRoundedDown12x7Svg class="mobile-links__item-arrow" />
                        </button>
                    </div>
                    <div
                        v-if="link.children && link.children.length > 0"
                        :class="['mobile-links__item-sub-links', contentClasses]"
                    >
                        <MobileLinks :links="link.children" :level="level + 1" @itemClick="onItemClick" />
                    </div>
                </li>
            </Collapse>
            <li v-if="link.type === 'divider'" :key="index" class="mobile-links__divider" />
        </template>
    </ul>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMobileMenuLink } from '~/interfaces/menus/mobile-menu'
import AppLink from '~/components/shared/app-link.vue'
import Collapse from '~/components/shared/collapse.vue'
import ArrowRoundedDown12x7Svg from '~/svg/arrow-rounded-down-12x7.svg'

@Component({
    name: 'MobileLinks',
    components: { AppLink, Collapse, ArrowRoundedDown12x7Svg }
})
export default class MobileLinks extends Vue {
    @Prop({ type: Number, default: () => 0 }) readonly level!: number
    @Prop({ type: Array, default: () => [] }) readonly links!: IMobileMenuLink[]

    onItemClick (item: IMobileMenuLink) {
        this.$emit('itemClick', item)
    }
}

</script>
