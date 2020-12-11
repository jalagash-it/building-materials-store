<template>
    <!-- .megamenu -->
    <div
        :class="[
            'megamenu',
            {'megamenu--departments': location === 'departments'}
        ]"
    >
        <div
            class="megamenu__body"
            :style="bodyStyles"
        >
            <div class="row">
                <div
                    v-for="(column, index) in menu.columns"
                    :key="index"
                    :class="`col-${column.size}`"
                >
                    <MegamenuLinks :links="column.links" />
                </div>
            </div>
        </div>
    </div>
    <!-- .megamenu / end -->
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IMegamenu } from '~/interfaces/menus/megamenu'
import MegamenuLinks from '~/components/header/megamenu-links.vue'

type Location = 'nav-panel' | 'departments';

@Component({
    components: { MegamenuLinks }
})
export default class Megamenu extends Vue {
    @Prop({ type: String, default: () => 'nav-panel' }) readonly location!: Location
    @Prop({ type: Object, default: () => null }) readonly menu!: IMegamenu

    get image () {
        if (!this.menu || !this.menu.image) {
            return null
        }

        if (typeof this.menu.image === 'string') {
            return this.menu.image
        }

        const direction = this.$store.getters['locale/language'].direction as keyof IMegamenu['image']

        return this.menu.image[direction]
    }

    get bodyStyles () {
        const image = this.image

        if (image) {
            return {
                backgroundImage: `url('${this.$url.img(image)}')`
            }
        }

        return {}
    }
}

</script>
