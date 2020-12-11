<template>
    <div class="block-header">
        <h3 class="block-header__title">
            {{ title }}
        </h3>
        <div class="block-header__divider" />

        <ul v-if="groups.length > 0" class="block-header__groups-list">
            <li v-for="(group, index) in groups" :key="index">
                <button
                    type="button"
                    :class="[
                        'block-header__group',
                        {'block-header__group--active': group.current}
                    ]"
                    @click="groupClick(group)"
                >
                    {{ group.name }}
                </button>
            </li>
        </ul>

        <div v-if="arrows" class="block-header__arrows-list">
            <button class="block-header__arrow block-header__arrow--left" type="button" @click="prev">
                <ArrowRoundedLeft7x11Svg />
            </button>
            <button class="block-header__arrow block-header__arrow--right" type="button" @click="next">
                <ArrowRoundedRight7x11Svg />
            </button>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { BlockHeaderGroup } from '~/interfaces/components'
import ArrowRoundedLeft7x11Svg from '~/svg/arrow-rounded-left-7x11.svg'
import ArrowRoundedRight7x11Svg from '~/svg/arrow-rounded-right-7x11.svg'

@Component({
    components: { ArrowRoundedLeft7x11Svg, ArrowRoundedRight7x11Svg }
})
export default class BlockHeader extends Vue {
    @Prop({ type: String, required: true }) readonly title!: string
    @Prop({ type: Boolean, default: () => false }) readonly arrows!: boolean
    @Prop({ type: Array, default: () => [] }) readonly groups!: BlockHeaderGroup[]

    @Emit() prev () { }
    @Emit() next () { }
    @Emit() groupClick (group: BlockHeaderGroup) { return group }
}

</script>
