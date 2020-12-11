<template>
    <div
        :class="[
            'product-tabs',
            {'product-tabs--layout--sidebar': withSidebar}
        ]"
    >
        <div class="product-tabs__list">
            <div class="product-tabs__list-body">
                <div class="product-tabs__list-container container">
                    <button
                        v-for="tab in tabs"
                        :key="tab.key"
                        :class="[
                            'product-tabs__item',
                            {'product-tabs__item--active': current === tab.key}
                        ]"
                        type="button"
                        @click="current = tab.key"
                    >
                        {{ tab.title }}
                    </button>
                </div>
            </div>
        </div>
        <div class="product-tabs__content">
            <div
                v-for="tab in tabs"
                :key="tab.key"
                :class="[
                    'product-tabs__pane',
                    {'product-tabs__pane--active': current === tab.key}
                ]"
            >
                <component :is="tab.content" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import ProductTabDescription from '~/components/shop/product-tab-description.vue'
import ProductTabSpecification from '~/components/shop/product-tab-specification.vue'
import ProductTabReviews from '~/components/shop/product-tab-reviews.vue'

@Component
export default class ProductTabs extends Vue {
    @Prop({ type: Boolean, default: () => false }) readonly withSidebar!: boolean

    current = 'description'

    tabs = [
        { key: 'description', title: 'Description', content: ProductTabDescription },
        { key: 'specification', title: 'Specification', content: ProductTabSpecification },
        { key: 'reviews', title: 'Reviews', content: ProductTabReviews }
    ]
}

</script>
