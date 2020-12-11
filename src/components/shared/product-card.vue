<template>
    <div
        :class="[
            'product-card', 'product-card--hidden-actions', {
                'product-card--layout--grid product-card--size--sm': layout === 'grid-sm',
                'product-card--layout--grid product-card--size--nl': layout === 'grid-nl',
                'product-card--layout--grid product-card--size--lg': layout === 'grid-lg',
                'product-card--layout--list': layout === 'list',
                'product-card--layout--horizontal': layout === 'horizontal',
            }
        ]"
    >
        <AsyncAction v-slot:default="{ run, isLoading }" :action="() => $store.dispatch('quickview/open', { productSlug: product.slug })">
            <button
                type="button"
                :class="[
                    'product-card__quickview',
                    {'product-card__quickview--preload': isLoading}
                ]"
                @click="run"
            >
                <Quickview16Svg />
            </button>
        </AsyncAction>

        <div v-if="product.badges.length" class="product-card__badges-list">
            <div v-if="product.badges.includes('sale')" class="product-card__badge product-card__badge--sale">
                Sale
            </div>
            <div v-if="product.badges.includes('hot')" class="product-card__badge product-card__badge--hot">
                Hot
            </div>
            <div v-if="product.badges.includes('new')" class="product-card__badge product-card__badge--new">
                New
            </div>
        </div>

        <div v-if="product.images && product.images.length > 0" class="product-card__image product-image">
            <AppLink :to="$url.product(product)" class="product-image__body">
                <!--suppress HtmlUnknownTarget -->
                <img class="product-image__img" :src="$url.img(product.images[0])" alt="">
            </AppLink>
        </div>

        <div class="product-card__info">
            <div class="product-card__name">
                <AppLink :to="$url.product(product)">
                    {{ product.name }}
                </AppLink>
            </div>
            <div class="product-card__rating">
                <Rating class="product-card__rating-stars" :value="product.rating" />
                <div class=" product-card__rating-legend">
                    {{ product.reviews }} Reviews
                </div>
            </div>

            <ul
                v-if="features.length"
                class="product-card__features-list"
            >
                <li v-for="(attribute, index) in features" :key="index">
                    {{ attribute.name }}: {{ attribute.values.map((x) => x.name).join(', ') }}
                </li>
            </ul>
        </div>
        <div class="product-card__actions">
            <div class="product-card__availability">
                Availability:
                <span class="text-success">In Stock</span>
            </div>

            <div v-if="product.compareAtPrice" class="product-card__prices">
                <span class="product-card__new-price">{{ $price(product.price) }}</span>
                <span class="product-card__old-price">{{ $price(product.compareAtPrice) }}</span>
            </div>

            <div v-if="!product.compareAtPrice" class="product-card__prices">
                {{ $price(product.price) }}
            </div>

            <div class="product-card__buttons">
                <AsyncAction v-slot:default="{ run, isLoading }" :action="() => $store.dispatch('cart/add', { product })">
                    <button
                        type="button"
                        :class="[
                            'btn btn-primary product-card__addtocart',
                            {'btn-loading': isLoading}
                        ]"
                        @click="run"
                    >
                        Add To Cart
                    </button>
                </AsyncAction>
                <AsyncAction v-slot:default="{ run, isLoading }" :action="() => $store.dispatch('cart/add', { product })">
                    <button
                        type="button"
                        :class="[
                            'btn btn-secondary product-card__addtocart product-card__addtocart--list',
                            {'btn-loading': isLoading}
                        ]"
                        @click="run"
                    >
                        Add To Cart
                    </button>
                </AsyncAction>

                <AsyncAction v-slot:default="{ run, isLoading }" :action="() => $store.dispatch('wishlist/add', { product })">
                    <button
                        type="button"
                        :class="[
                            'btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist',
                            {'btn-loading': isLoading}
                        ]"
                        @click="run"
                    >
                        <Wishlist16Svg />
                    </button>
                </AsyncAction>

                <AsyncAction v-slot:default="{ run, isLoading }" :action="() => $store.dispatch('compare/add', { product })">
                    <button
                        type="button"
                        :class="[
                            'btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare',
                            {'btn-loading': isLoading}
                        ]"
                        @click="run"
                    >
                        <Compare16Svg />
                    </button>
                </AsyncAction>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProduct } from '~/interfaces/product'
import AsyncAction from '~/components/shared/async-action.vue'
import AppLink from '~/components/shared/app-link.vue'
import Rating from '~/components/shared/rating.vue'
import Quickview16Svg from '~/svg/quickview-16.svg'
import Wishlist16Svg from '~/svg/wishlist-16.svg'
import Compare16Svg from '~/svg/compare-16.svg'

export type ProductCardLayout = 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal';

@Component({
    components: { AsyncAction, Quickview16Svg, AppLink, Rating, Wishlist16Svg, Compare16Svg }
})
export default class ProductCard extends Vue {
    @Prop({ type: Object, required: true }) readonly product!: IProduct
    @Prop({ type: String, default: () => undefined }) readonly layout!: ProductCardLayout

    get features () {
        return this.product.attributes.filter(x => x.featured)
    }
}

</script>
