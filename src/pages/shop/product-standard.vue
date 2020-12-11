<template>
    <ShopPageProduct :product="product" layout="standard" />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { IProduct } from '~/interfaces/product'
import shopApi from '~/api/shop'
import ShopPageProduct from '~/components/shop/shop-page-product.vue'

@Component({
    components: { ShopPageProduct },
    async asyncData (): Promise<{ product: IProduct }> {
        return {
            product: await shopApi.getProductBySlug('brandix-screwdriver-screw1500acc')
        }
    }
})
export default class Page extends Vue {
    product: IProduct = null!
}

</script>
