<template>
    <div :class="`block block-products block-products--layout--${layout}`">
        <div class="container">
            <BlockHeader :title="title" />

            <div class="block-products__body">
                <div v-if="featuredProduct && layout === 'large-first'" class="block-products__featured">
                    <div class="block-products__featured-item">
                        <ProductCard :product="featuredProduct" />
                    </div>
                </div>

                <div class="block-products__list">
                    <div v-for="product in products.slice(0, 6)" :key="product.id" class="block-products__list-item">
                        <ProductCard :product="product" />
                    </div>
                </div>

                <div v-if="featuredProduct && layout === 'large-last'" class="block-products__featured">
                    <div class="block-products__featured-item">
                        <ProductCard :product="featuredProduct" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProduct } from '~/interfaces/product'
import BlockHeader from '~/components/shared/block-header.vue'
import ProductCard from '~/components/shared/product-card.vue'

type BlockProductsLayout = 'large-first' | 'large-last';

@Component({
    components: { BlockHeader, ProductCard }
})
export default class BlockProducts extends Vue {
    @Prop({ type: String, required: true }) readonly title!: string
    @Prop({ type: String, default: () => 'large-first' }) readonly layout!: BlockProductsLayout
    @Prop({ type: Object, default: () => undefined }) readonly featuredProduct!: IProduct
    @Prop({ type: Array, default: () => [] }) readonly products!: IProduct[]
}

</script>
