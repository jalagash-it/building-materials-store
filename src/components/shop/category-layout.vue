<template>
    <div>
        <div v-if="columns > 3" class="container">
            <div class="block">
                <slot name="productsView" />
            </div>

            <slot name="sidebar" />
        </div>

        <div v-if="columns <= 3" class="container">
            <div :class="`shop-layout shop-layout--sidebar--${sidebarPosition}`">
                <div v-if="sidebarPosition === 'start'" class="shop-layout__sidebar">
                    <slot name="sidebar" />
                </div>

                <div class="shop-layout__content">
                    <div class="block">
                        <slot name="productsView" />
                    </div>
                </div>

                <div v-if="sidebarPosition === 'end'" class="shop-layout__sidebar">
                    <slot name="sidebar" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'

export type CategoryLayoutColumns = 3 | 4 | 5;
export type CategoryLayoutSidebarPosition = 'start' | 'end';

@Component
export default class CategoryLayout extends Vue {
    @Prop({ type: Number, default: () => 3 }) readonly columns!: CategoryLayoutColumns
    @Prop({ type: String, default: () => 'start' }) readonly sidebarPosition!: CategoryLayoutSidebarPosition
}

</script>
