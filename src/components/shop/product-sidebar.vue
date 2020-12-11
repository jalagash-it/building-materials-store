<template>
    <div class="block block-sidebar">
        <div class="block-sidebar__item">
            <WidgetCategories :categories="categories" location="shop" />
        </div>
        <div class="block-sidebar__item d-none d-lg-block">
            <WidgetProducts title="Latest Products" :products="latestProducts" />
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { ICategory } from '~/interfaces/category'
import { IProduct } from '~/interfaces/product'
import shopApi from '~/api/shop'
import WidgetCategories from '~/components/widgets/widget-categories.vue'
import WidgetProducts from '~/components/widgets/widget-products.vue'

@Component({
    components: { WidgetCategories, WidgetProducts }
})
export default class ProductSidebar extends Vue {
    categories: ICategory[] = []
    latestProducts: IProduct[] = []

    mounted () {
        shopApi.getCategories({ depth: 1 }).then((categories) => {
            this.categories = categories
        })
        shopApi.getLatestProducts({ limit: 5 }).then((result) => {
            this.latestProducts = result
        })
    }
}

</script>
