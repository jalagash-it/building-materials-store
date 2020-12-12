<template>
    <div class="block block-product-columns d-lg-block d-none">
        <div class="container">
            <div class="row">
                <div v-for="(column, index) in columns" :key="index" class="col">
                    <BlockHeader :title="column.title" />

                    <div class="block-product-columns__column">
                        <div v-for="product in column.products" :key="product.id" class="block-product-columns__item">
                            <ProductCard :product="product" layout="horizontal" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { BlockProductColumnsItem } from '~/interfaces/components'
import BlockHeader from '~/components/shared/block-header.vue'
import ProductCard from '~/components/shared/product-card.vue'

@Component({
    components: { BlockHeader, ProductCard }
})
export default class BlockProductColumns extends Vue {
    @Prop({ type: Array, default: () => [] }) readonly columns!: BlockProductColumnsItem[]
}

</script>
