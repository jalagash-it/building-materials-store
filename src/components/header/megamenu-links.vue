<template>
    <ul
        :class="[
            'megamenu__links',
            `megamenu__links--level--${level}`
        ]"
    >
        <li
            v-for="(link, index) in links"
            :key="index"
            :class="[
                'megamenu__item',
                {'megamenu__item--with-submenu': link.children}
            ]"
        >
            <AppLink v-if="link.title" :to="link.url">
                {{ link.title }}
            </AppLink>
            <MegamenuLinks v-if="link.children" :links="link.children" :level="level + 1" />
        </li>
    </ul>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { INestedLink } from '~/interfaces/menus/link'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    name: 'MegamenuLinks',
    components: { AppLink }
})
export default class MegamenuLinks extends Vue {
    @Prop({ type: Array, default: () => [] }) readonly links!: INestedLink[]
    @Prop({ type: Number, default: () => 0 }) readonly level!: number
}

</script>
