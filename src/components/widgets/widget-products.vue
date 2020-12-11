<template>
    <div class="widget-products widget">
        <h4 class="widget__title">
            {{ title }}
        </h4>
        <div class="widget-products__list">
            <div
                v-for="product in products"
                :key="product.id"
                class="widget-products__item"
            >
                <div v-if="product.images && product.images.length > 0" class="widget-products__image">
                    <div class="product-image">
                        <AppLink :to="$url.product(product)" class="product-image__body">
                            <!--suppress HtmlUnknownTarget -->
                            <img class="product-image__img" :src="$url.img(product.images[0])" alt="">
                        </AppLink>
                    </div>
                </div>
                <div class="widget-products__info">
                    <div class="widget-products__name">
                        <AppLink :to="$url.product(product)">
                            {{ product.name }}
                        </AppLink>
                    </div>
                    <div class="widget-products__prices">
                        <template v-if="product.compareAtPrice">
                            <span class="widget-products__new-price">
                                {{ $price(product.price) }}
                            </span>
                            <span class="widget-products__old-price">
                                {{ $price(product.compareAtPrice) }}
                            </span>
                        </template>
                        <template v-if="!product.compareAtPrice">
                            {{ $price(product.price) }}
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProduct } from '~/interfaces/product'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class WidgetProducts extends Vue {
    @Prop({ type: String, default: () => '' }) readonly title!: string
    @Prop({ type: Array, default: () => [] }) readonly products!: IProduct[]
}

</script>
